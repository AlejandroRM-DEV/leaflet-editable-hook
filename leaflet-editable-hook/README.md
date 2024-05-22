# Leaflet Editable Hook
The purpose of this hook is to provide functionality for editing features on the map, such as drawing polylines, polygons, markers, rectangles, circles, and more.

## Demo 
https://leaflet-editable-hook.vercel.app/ 

## Prerequisites
- leaflet: "^1.9.4"
- leaflet-editable: "^1.2.0"
- react-leaflet: "^4.2.1"

## Installation

Install with npm

```bash
  npm i leaflet-editable-hook
```
    
## Documentation

[See full documentation about Leaflet.Editable](https://leaflet.github.io/Leaflet.Editable/doc/api.html)

| Hook returned methods                               | Returns     | Description                                                                                                                                                           |
|---------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| drawing()                             | boolean     | Return true if any drawing action is ongoing.                                                                                                                         |
| stopDrawing()                         |             | When you need to stop any ongoing drawing, without needing to know which editor is active.                                                                           |
| commitDrawing()                       |             | When you need to commit any ongoing drawing, without needing to know which editor is active.                                                                         |
| startPolyline(<L.LatLng> latlng, <hash> options) | L.Polyline  | Start drawing a Polyline. If latlng is given, a first point will be added. In any case, continuing on user click. If options is given, it will be passed to the Polyline class constructor. |
| startPolygon(<L.LatLng> latlng, <hash> options)  | L.Polygon   | Start drawing a Polygon. If latlng is given, a first point will be added. In any case, continuing on user click. If options is given, it will be passed to the Polygon class constructor.  |
| startMarker(<L.LatLng> latlng, <hash> options)  | L.Marker    | Start adding a Marker. If latlng is given, the Marker will be shown first at this point. In any case, it will follow the user mouse, and will have a final latlng on next click (or touch). If options is given, it will be passed to the Marker class constructor. |
| startRectangle(<L.LatLng> latlng, <hash> options) | L.Rectangle | Start drawing a Rectangle. If latlng is given, the Rectangle anchor will be added. In any case, continuing on user drag. If options is given, it will be passed to the Rectangle class constructor. |
| startCircle(<L.LatLng> latlng, <hash> options)    | L.Circle    | Start drawing a Circle. If latlng is given, the Circle anchor will be added. In any case, continuing on user drag. If options is given, it will be passed to the Circle class constructor.    |


| Events                 |
|------------------------|
| onCreated              |
| onEnable               |
| onDisable              |
| onEditing              |
| onDragstart            |
| onDrag                 |
| onDragend              |
| onDrawingStart         |
| onDrawingEnd           |
| onDrawingCancel        |
| onDrawingCommit        |
| onDrawingMousedown     |
| onDrawingMouseup       |
| onDrawingClick         |
| onDrawingMove          |
| onDrawingClicked       |
| onVertexNew            |
| onVertexClick          |
| onVertexClicked        |
| onVertexRawclick       |
| onVertexDeleted        |
| onVertexCtrlclick      |
| onVertexShiftclick     |
| onVertexMetakeyclick   |
| onVertexAltclick       |
| onVertexContextmenu    |
| onVertexMousedown      |
| onVertexDrag           |
| onVertexDragstart      |
| onVertexDragend        |
| onMiddlemarkerMousedown|
| onShapeNew             |
| onShapeDelete          |
| onShapeDeleted         |


## Usage/Examples

```javascript
import { useMap, Marker, Tooltip } from 'react-leaflet';
import { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import { useLeafletEditable } from 'leaflet-editable-hook';

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
        {length.toFixed(3)} KM
      </Tooltip>
    </Marker>
  );
}

export default Ruler;
```


## License

[MIT](https://choosealicense.com/licenses/mit/)
