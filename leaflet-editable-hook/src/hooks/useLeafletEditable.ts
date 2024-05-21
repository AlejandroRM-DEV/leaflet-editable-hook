import { useMemo, useCallback, useEffect } from "react";
import {
  Polyline,
  Marker,
  Polygon,
  Circle,
  Rectangle,
  CircleMarker,
  LayerEvent,
  LeafletMouseEvent,
} from "leaflet";
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

// Define the types for the events object
type LeafletEditableEventHandlers = {
  onCreated?: (e: LayerEvent) => void;
  onEnable?: (e: LayerEvent) => void;
  onDisable?: (e: LayerEvent) => void;
  onEditing?: (e: LayerEvent) => void;
  onDragStart?: (e: LayerEvent) => void;
  onDrag?: (e: LayerEvent) => void;
  onDragEnd?: (e: LayerEvent) => void;
  onDrawingStart?: (e: LayerEvent) => void;
  onDrawingEnd?: (e: LayerEvent) => void;
  onDrawingCancel?: (e: LayerEvent) => void;
  onDrawingCommit?: (e: LayerEvent) => void;
  onDrawingMousedown?: (e: LayerEvent) => void;
  onDrawingMouseup?: (e: LayerEvent) => void;
  onDrawingClick?: (e: LayerEvent) => void;
  onDrawingMove?: (e: LayerEvent) => void;
  onDrawingClicked?: (e: LayerEvent) => void;
  onVertexNew?: (e: LayerEvent) => void;
  onVertexClick?: (e: LayerEvent) => void;
  onVertexClicked?: (e: LayerEvent) => void;
  onVertexRawclick?: (e: LayerEvent) => void;
  onVertexDeleted?: (e: LayerEvent) => void;
  onVertexCtrlclick?: (e: LayerEvent) => void;
  onVertexShiftclick?: (e: LayerEvent) => void;
  onVertexMetakeyclick?: (e: LayerEvent) => void;
  onVertexAltclick?: (e: LayerEvent) => void;
  onVertexContextmenu?: (e: LayerEvent) => void;
  onVertexMousedown?: (e: LayerEvent) => void;
  onVertexDrag?: (e: LayerEvent) => void;
  onVertexDragstart?: (e: LayerEvent) => void;
  onVertexDragend?: (e: LayerEvent) => void;
  onMiddlemarkerMousedown?: (e: LayerEvent) => void;
  onShapeNew?: (e: LayerEvent) => void;
  onShapeDelete?: (e: LayerEvent) => void;
  onShapeDeleted?: (e: LayerEvent) => void;
};

interface UseLeafletEditableOptions {
  events: LeafletEditableEventHandlers;
}

function useLeafletEditable({ events }: UseLeafletEditableOptions) {
  const map = useMap();

  useEffect(() => {
    const keys = Object.keys(eventHandlers) as Array<
      keyof typeof eventHandlers
    >;
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
  const drawing = useMemo(() => map.editTools.drawing(), [map]);

  const stopDrawing = useCallback(() => map.editTools.stopDrawing(), [map]);

  const commitDrawing = useCallback(
    (e: LeafletMouseEvent) => map.editTools.commitDrawing(e),
    [map],
  );

  const startPolyline = useCallback(
    (latlng, options) => map.editTools.startPolyline(latlng, options),
    [map],
  );

  const startPolygon = useCallback(
    (latlng, options) => map.editTools.startPolygon(latlng, options),
    [map],
  );

  const startMarker = useCallback(
    (latlng, options) => map.editTools.startMarker(latlng, options),
    [map],
  );

  const startRectangle = useCallback(
    (latlng, options) => map.editTools.startRectangle(latlng, options),
    [map],
  );

  const startCircle = useCallback(
    (latlng, options) => map.editTools.startCircle(latlng, options),
    [map],
  );

  const clearAll = useCallback(() => map.editTools.clearLayers(), [map]);

  // BaseEditor related methods
  const enableEditing = useCallback(
    (feature: L.Layer) => {
      if (
        feature instanceof Marker ||
        feature instanceof Polyline ||
        feature instanceof Polygon ||
        feature instanceof Rectangle ||
        feature instanceof Circle ||
        feature instanceof CircleMarker
      ) {
        //console.log(feature);
        feature.enableEdit();
      }
    },
    [map],
  );

  const disableEditing = useCallback(
    (feature: L.Layer) => {
      if (
        feature instanceof Marker ||
        feature instanceof Polyline ||
        feature instanceof Polygon ||
        feature instanceof Rectangle ||
        feature instanceof Circle
      ) {
        feature.disableEdit();
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
    enableEditing,
    disableEditing,
  };
}

export default useLeafletEditable;
