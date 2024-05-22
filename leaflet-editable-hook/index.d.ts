import {
  Layer,
  LayerEventHandlerFn,
  LeafletEventHandlerFn,
  VertexEventHandlerFn,
  CancelableEventHandlerFn,
  ShapeEventHandlerFn,
  Editable,
} from "leaflet";

export interface LeafletEditableEventHandlers {
  onCreated?: LayerEventHandlerFn;
  onEnable?: LeafletEventHandlerFn;
  onDisable?: LeafletEventHandlerFn;
  onEditing?: LeafletEventHandlerFn;
  onDragStart?: LeafletEventHandlerFn;
  onDrag?: LeafletEventHandlerFn;
  onDragEnd?: LeafletEventHandlerFn;
  onDrawingStart?: LeafletEventHandlerFn;
  onDrawingEnd?: LeafletEventHandlerFn;
  onDrawingCancel?: LeafletEventHandlerFn;
  onDrawingCommit?: LeafletEventHandlerFn;
  onDrawingMousedown?: LeafletEventHandlerFn;
  onDrawingMouseup?: LeafletEventHandlerFn;
  onDrawingClick?: CancelableEventHandlerFn;
  onDrawingMove?: LeafletEventHandlerFn;
  onDrawingClicked?: LeafletEventHandlerFn;
  onVertexNew?: VertexEventHandlerFn;
  onVertexClick?: CancelableEventHandlerFn;
  onVertexClicked?: VertexEventHandlerFn;
  onVertexRawclick?: CancelableEventHandlerFn;
  onVertexDeleted?: VertexEventHandlerFn;
  onVertexCtrlclick?: VertexEventHandlerFn;
  onVertexShiftclick?: VertexEventHandlerFn;
  onVertexMetakeyclick?: VertexEventHandlerFn;
  onVertexAltclick?: VertexEventHandlerFn;
  onVertexContextmenu?: VertexEventHandlerFn;
  onVertexMousedown?: VertexEventHandlerFn;
  onVertexDrag?: VertexEventHandlerFn;
  onVertexDragstart?: VertexEventHandlerFn;
  onVertexDragend?: VertexEventHandlerFn;
  onMiddlemarkerMousedown?: VertexEventHandlerFn;
  onShapeNew?: ShapeEventHandlerFn;
  onShapeDelete?: CancelableEventHandlerFn;
  onShapeDeleted?: ShapeEventHandlerFn;
}

export interface UseLeafletEditableOptions {
  events: LeafletEditableEventHandlers;
}

export function useLeafletEditable(
  options: UseLeafletEditableOptions,
): Editable & {
  enableEdit: (feature: Layer) => void;
  disableEdit: (feature: Layer) => void;
};
