import React from 'react';
import { useMap } from 'react-leaflet';

const eventHandlers = Object.freeze({
  onCreated: 'editable:created',
  onEnable: 'editable:enable',
  onDisable: 'editable:disable',
  onEditing: 'editable:editing',
  onDragstart: 'editable:dragstart',
  onDrag: 'editable:drag',
  onDragend: 'editable:dragend',
  onDrawingStart: 'editable:drawing:start',
  onDrawingEnd: 'editable:drawing:end',
  onDrawingCancel: 'editable:drawing:cancel',
  onDrawingCommit: 'editable:drawing:commit',
  onDrawingMousedown: 'editable:drawing:mousedown',
  onDrawingMouseup: 'editable:drawing:mouseup',
  onDrawingClick: 'editable:drawing:click',
  onDrawingMove: 'editable:drawing:move',
  onDrawingClicked: 'editable:drawing:clicked',
  onVertexNew: 'editable:vertex:new',
  onVertexClick: 'editable:vertex:click',
  onVertexClicked: 'editable:vertex:clicked',
  onVertexRawclick: 'editable:vertex:rawclick',
  onVertexDeleted: 'editable:vertex:deleted',
  onVertexCtrlclick: 'editable:vertex:ctrlclick',
  onVertexShiftclick: 'editable:vertex:shiftclick',
  onVertexMetakeyclick: 'editable:vertex:metakeyclick',
  onVertexAltclick: 'editable:vertex:altclick',
  onVertexContextmenu: 'editable:vertex:contextmenu',
  onVertexMousedown: 'editable:vertex:mousedown',
  onVertexDrag: 'editable:vertex:drag',
  onVertexDragstart: 'editable:vertex:dragstart',
  onVertexDragend: 'editable:vertex:dragend',
  onMiddlemarkerMousedown: 'editable:middlemarker:mousedown',
  onShapeNew: 'editable:shape:new',
  onShapeDelete: 'editable:shape:delete',
  onShapeDeleted: 'editable:shape:deleted',
});

function useLeafletEditable({ events }) {
  const map = useMap();

  React.useEffect(() => {
    Object.keys(eventHandlers).forEach((key) => {
      if (events[key]) {
        map.on(eventHandlers[key], events[key]);
      }
    });
    return () => {
      Object.keys(eventHandlers).forEach((key) => {
        if (events[key]) {
          map.off(eventHandlers[key], events[key]);
        }
      });
    };
  }, [map, events]);

  const drawing = React.useMemo(() => {
    return map.editTools.drawing();
  }, [map]);

  const stopDrawing = React.useCallback(() => {
    map.editTools.stopDrawing();
  }, [map]);

  const commitDrawing = React.useCallback(() => {
    map.editTools.commitDrawing();
  }, [map]);

  const startPolyline = React.useCallback(
    (latlng, options) => {
      return map.editTools.startPolyline(latlng, options);
    },
    [map]
  );

  const startPolygon = React.useCallback(
    (latlng, options) => {
      return map.editTools.startPolygon(latlng, options);
    },
    [map]
  );

  const startMarker = React.useCallback(
    (latlng, options) => {
      return map.editTools.startMarker(latlng, options);
    },
    [map]
  );

  const startRectangle = React.useCallback(
    (latlng, options) => {
      return map.editTools.startRectangle(latlng, options);
    },
    [map]
  );

  const startCircle = React.useCallback(
    (latlng, options) => {
      return map.editTools.startCircle(latlng, options);
    },
    [map]
  );

  const clearAll = React.useCallback(() => {
    return map.editTools.clearLayers();
  }, [map]);

  return {
    drawing,
    stopDrawing,
    commitDrawing,
    startPolyline,
    startPolygon,
    startMarker,
    startRectangle,
    startCircle,
    clearAll,
  };
}

export default useLeafletEditable;
