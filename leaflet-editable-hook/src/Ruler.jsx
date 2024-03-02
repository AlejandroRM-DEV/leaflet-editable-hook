import { useMap, Marker, Tooltip } from 'react-leaflet';
import { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import { useLeafletEditable } from './hooks';

function Ruler() {
  const map = useMap();
  const [ruler, setRuler] = useState(null);

  const onDrawingClicked = (e) => {
    const position = e.latlng;
    const latlngs = e.layer._latlngs;
    let length = 0;
    if (latlngs.length > 1) {
      const line = turf.lineString([...latlngs.map((item) => [item.lng, item.lat])]);
      length = turf.length(line, { units: 'kilometers' });
    }
    setRuler(<RulerMarker position={[position.lat, position.lng]} length={length} />);
  };

  const onVertexDrag = (e) => {
    const latlngs = e.layer._latlngs;
    let length = 0;
    if (latlngs.length > 1) {
      const line = turf.lineString([...latlngs.map((item) => [item.lng, item.lat])]);
      length = turf.length(line, { units: 'kilometers' });
    }
    setRuler(
      <RulerMarker
        position={[latlngs[latlngs.length - 1].lat, latlngs[latlngs.length - 1].lng]}
        length={length}
      />
    );
  };

  const { startPolyline } = useLeafletEditable({
    events: {
      onDrawingClicked,
      onVertexDrag,
    },
  });

  useEffect(() => {
    const polyline = startPolyline();
    return () => {
      map.removeLayer(polyline);
    };
  }, []);

  return ruler;
}

function RulerMarker({ position, length }) {
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
        {length.toFixed(3, 10)} KM
      </Tooltip>
    </Marker>
  );
}

export default Ruler;
