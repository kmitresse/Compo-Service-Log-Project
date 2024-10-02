import { ModdleElement } from "./ModdleElement";
import { DMN_type_reference_ } from "./DMN_enums";

export const _DMN_InformationItem: "dmn:InformationItem" =
  "dmn:InformationItem";

export interface DMN_InformationItem extends ModdleElement {
  $type: typeof _DMN_InformationItem;
  typeRef: DMN_type_reference_;
}
