import { useCallback, useEffect } from "react";
import { Polyline, Marker, Polygon, Circle, Rectangle } from "leaflet";
import { useMap } from "react-leaflet";

const eventHandlers = Object.freeze({
  onCreated: "editable:created",
  onEnable: "editable:enable",
  onDisable: "editable:disable",
  onEditing: "editable:editing",
  onDragStart: "editable:dragstart",
  onDrag: "editable:drag",
  onDragEnd: "editable:dragend",
  onDrawingStart: "editable:drawing:start",
  onDrawingEnd: "editable:drawing:end",
  onDrawingCancel: "editable:drawing:cancel",
  onDrawingCommit: "editable:drawing:commit",
  onDrawingMousedown: "editable:drawing:mousedown",
  onDrawingMouseup: "editable:drawing:mouseup",
  onDrawingClick: "editable:drawing:click",
  onDrawingMove: "editable:drawing:move",
  onDrawingClicked: "editable:drawing:clicked",
  onVertexNew: "editable:vertex:new",
  onVertexClick: "editable:vertex:click",
  onVertexClicked: "editable:vertex:clicked",
  onVertexRawclick: "editable:vertex:rawclick",
  onVertexDeleted: "editable:vertex:deleted",
  onVertexCtrlclick: "editable:vertex:ctrlclick",
  onVertexShiftclick: "editable:vertex:shiftclick",
  onVertexMetakeyclick: "editable:vertex:metakeyclick",
  onVertexAltclick: "editable:vertex:altclick",
  onVertexContextmenu: "editable:vertex:contextmenu",
  onVertexMousedown: "editable:vertex:mousedown",
  onVertexDrag: "editable:vertex:drag",
  onVertexDragstart: "editable:vertex:dragstart",
  onVertexDragend: "editable:vertex:dragend",
  onMiddlemarkerMousedown: "editable:middlemarker:mousedown",
  onShapeNew: "editable:shape:new",
  onShapeDelete: "editable:shape:delete",
  onShapeDeleted: "editable:shape:deleted",
});

function useLeafletEditable({ events }) {
  const map = useMap();

  useEffect(() => {
    const keys = Object.keys(eventHandlers);
    keys.forEach((key) => {
      const handler = events[key];
      if (handler) {
        map.on(eventHandlers[key], handler);
      }
    });

    return () => {
      keys.forEach((key) => {
        const handler = events[key];
        if (handler) {
          map.off(eventHandlers[key], handler);
        }
      });
    };
  }, [map, events]);

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
        feature instanceof Marker ||
        feature instanceof Polyline ||
        feature instanceof Polygon ||
        feature instanceof Rectangle ||
        feature instanceof Circle
      ) {
        feature.enableEdit();
      } else {
        console.error("Feature is not editable", feature);
      }
    },
    [map],
  );

  const disableEdit = useCallback(
    (feature) => {
      if (
        feature instanceof Marker ||
        feature instanceof Polyline ||
        feature instanceof Polygon ||
        feature instanceof Rectangle ||
        feature instanceof Circle
      ) {
        feature.disableEdit();
      } else {
        console.error("Feature is not editable", feature);
      }
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
