import { useCallback } from "react";
import { Polyline, Marker, Polygon, Circle, Rectangle } from "leaflet";
import { useMap } from "react-leaflet";

function useLeafletEditable() {
  const map = useMap();
  
  const drawing = useCallback(() => map.editTools.drawing(), [map]);

  const stopDrawing = useCallback(() => map.editTools.stopDrawing(), [map]);

  const commitDrawing = useCallback(
    (event) => map.editTools.commitDrawing(event),
    [map],
  );

  const startPolyline = useCallback(
    (latLng, options) => map.editTools.startPolyline(latLng, options),
    [map],
  );

  const startPolygon = useCallback(
    (latLng, options) => map.editTools.startPolygon(latLng, options),
    [map],
  );

  const startMarker = useCallback(
    (latLng, options) => map.editTools.startMarker(latLng, options),
    [map],
  );

  const startRectangle = useCallback(
    (latLng, options) => map.editTools.startRectangle(latLng, options),
    [map],
  );

  const startCircle = useCallback(
    (latLng, options) => map.editTools.startCircle(latLng, options),
    [map],
  );

  const clearAll = useCallback(() => map.editTools.clearLayers(), [map]);

  // BaseEditor related methods
  const enableEdit = useCallback(
    (feature) => {
     if (
        !feature instanceof Marker ||
        !feature instanceof Polyline ||
        !feature instanceof Polygon ||
        !feature instanceof Rectangle ||
        !feature instanceof Circle
      ) {
        console.error("Feature is not editable", feature);
      }
      feature.enableEdit();
    },
    [map],
  );

  const disableEdit = useCallback(
    (feature) => {
      if (
        !feature instanceof Marker ||
        !feature instanceof Polyline ||
        !feature instanceof Polygon ||
        !feature instanceof Rectangle ||
        !feature instanceof Circle
      ) {
        console.error("Feature is not editable", feature);
      }
      feature.disableEdit();
    },
    [map],
  );

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
    enableEdit,
    disableEdit,
  };
}

export default useLeafletEditable;
