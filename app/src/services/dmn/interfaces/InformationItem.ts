import { ModdleElement } from "./ModdleElement";
import { DMN_type_reference_ } from "./enums";

const _DMN_InformationItem: "dmn:InformationItem" = "dmn:InformationItem";

interface InformationItem extends ModdleElement {
  $type: typeof _DMN_InformationItem;
  typeRef: DMN_type_reference_;
}

export { InformationItem, _DMN_InformationItem };
