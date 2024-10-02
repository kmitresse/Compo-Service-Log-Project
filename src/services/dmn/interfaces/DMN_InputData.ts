import { ModdleElement } from "./ModdleElement";
import { DMN_InformationItem } from "./DMN_InformationItem";

export const _DMN_InputData: "dmn:InputData" = "dmn:InputData";

export interface DMN_InputData extends ModdleElement {
  $type: typeof _DMN_InputData;
  name: string;
  variable?: DMN_InformationItem;
}

export function Is_DMN_InputData(me: ModdleElement): me is DMN_InputData {
  return "$type" in me && me.$type === _DMN_InputData;
}
