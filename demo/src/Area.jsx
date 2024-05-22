import { useMap, Marker, Tooltip } from 'react-leaflet';
import { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import useLeafletEditable from 'leaflet-editable-hook';

function Area() {
  const map = useMap();
  const [area, setArea] = useState(null);

  const calculateArea = (e) => {
    const latlngs = e.layer._latlngs[0];
    if (latlngs.length > 2) {
      const first = latlngs[0];
      const polygon = turf.polygon([
        [...latlngs.map((item) => [item.lng, item.lat]), [first.lng, first.lat]],
      ]);
      const area = turf.convertArea(turf.area(polygon), 'meters', 'kilometers');
      const position = turf.centroid(polygon).geometry.coordinates;
      setArea(<AreaMarker position={[position[1], position[0]]} area={area} />);
    }
  };

  const { startPolygon } = useLeafletEditable({
    events: {
      onDrawingClicked: calculateArea,
      onVertexDrag: calculateArea,
    },
  });

  useEffect(() => {
    const polygon = startPolygon();
    return () => {
      map.removeLayer(polygon);
    };
  }, []);

  return area;
}

function AreaMarker({ position, area }) {
  return (
    <Marker
      position={position}
      icon={L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-opacity="0%">
            <title>circle-small</title>
            <path d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
            </svg>`,
        className: 'marker-icon',
        iconSize: [24, 24],
        popupAnchor: [0, -12],
      })}
    >
      <Tooltip permanent offset={[10, 0]} direction="right">
        {area.toFixed(3)} km²
      </Tooltip>
    </Marker>
  );
}

export default Area;
