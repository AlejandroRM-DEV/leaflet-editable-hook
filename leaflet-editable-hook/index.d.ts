import {
  Layer,
  Editable,
} from "leaflet";

export function useLeafletEditable(): Editable & {
  enableEdit: (feature: Layer) => void;
  disableEdit: (feature: Layer) => void;
};
