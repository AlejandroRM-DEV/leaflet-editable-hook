# Leaflet Editable Hook
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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
| stopDrawing()                         |    void         | When you need to stop any ongoing drawing, without needing to know which editor is active.                                                                           |
| commitDrawing()                       |     void        | When you need to commit any ongoing drawing, without needing to know which editor is active.                                                                         |
| startPolyline(<L.LatLng> latlng, <hash> options) | L.Polyline  | Start drawing a Polyline. If latlng is given, a first point will be added. In any case, continuing on user click. If options is given, it will be passed to the Polyline class constructor. |
| startPolygon(<L.LatLng> latlng, <hash> options)  | L.Polygon   | Start drawing a Polygon. If latlng is given, a first point will be added. In any case, continuing on user click. If options is given, it will be passed to the Polygon class constructor.  |
| startMarker(<L.LatLng> latlng, <hash> options)  | L.Marker    | Start adding a Marker. If latlng is given, the Marker will be shown first at this point. In any case, it will follow the user mouse, and will have a final latlng on next click (or touch). If options is given, it will be passed to the Marker class constructor. |
| startRectangle(<L.LatLng> latlng, <hash> options) | L.Rectangle | Start drawing a Rectangle. If latlng is given, the Rectangle anchor will be added. In any case, continuing on user drag. If options is given, it will be passed to the Rectangle class constructor. |
| startCircle(<L.LatLng> latlng, <hash> options)    | L.Circle    | Start drawing a Circle. If latlng is given, the Circle anchor will be added. In any case, continuing on user drag. If options is given, it will be passed to the Circle class constructor.    |
| enableEdit(feature: L.Layer)    | void    | Enable editing, by creating an editor if not existing, and then calling enable on it.   |
| disableEdit(feature: L.Layer)    | void    | Disable editing, also remove the editor property reference.    |


| Events                 |
|------------------------|
| onCreated              |
| onEnable               |
| onDisable              |
| onEditing              |
| onDragStart            |
| onDrag                 |
| onDragEnd              |
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


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/charlieforward9"><img src="https://avatars.githubusercontent.com/u/62311337?v=4?s=100" width="100px;" alt="Charles Richardson"/><br /><sub><b>Charles Richardson</b></sub></a><br /><a href="https://github.com/AlejandroRM-DEV/leaflet-editable-hook/commits?author=charlieforward9" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/saiNaruUFL"><img src="https://avatars.githubusercontent.com/u/110858892?v=4?s=100" width="100px;" alt="saiNaruUFL"/><br /><sub><b>saiNaruUFL</b></sub></a><br /><a href="https://github.com/AlejandroRM-DEV/leaflet-editable-hook/commits?author=saiNaruUFL" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!