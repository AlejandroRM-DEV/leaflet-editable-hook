import React from 'react';
import { useMap } from 'react-leaflet';

const eventHandlers = Object.freeze({
  onDrawingClicked: 'editable:drawing:clicked',
  onVertexDrag: 'editable:vertex:drag',
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

  const startPolyline = React.useCallback(() => {
    return map.editTools.startPolyline();
  }, [map]);

  const startPolygon = React.useCallback(() => {
    return map.editTools.startPolygon();
  }, [map]);

  const startMarker = React.useCallback(() => {
    return map.editTools.startMarker();
  }, [map]);

  const startRectangle = React.useCallback(() => {
    return map.editTools.startRectangle();
  }, [map]);

  const startCircle = React.useCallback(() => {
    return map.editTools.startCircle();
  }, [map]);

  const startHole = React.useCallback(
    (editor, latlng) => {
      return map.editTools.startHole(editor, latlng);
    },
    [map]
  );

  const clearAll = React.useCallback(() => {
    return map.editTools.clearLayers();
  }, [map]);

  return {
    startPolyline,
    startPolygon,
    startMarker,
    startRectangle,
    startCircle,
    startHole,
    clearAll,
  };
}

export default useLeafletEditable;
