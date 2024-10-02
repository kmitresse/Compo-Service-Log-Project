import { ModdleElement } from "./ModdleElement";
import { DMN_LiteralExpression } from "./DMN_LiteralExpression";
import { DMN_InformationItem } from "./DMN_InformationItem";

export const _DMN_ContextEntry: "dmn:ContextEntry" = "dmn:ContextEntry";

export interface DMN_ContextEntry extends ModdleElement {
  $type: typeof _DMN_ContextEntry;
  value: DMN_LiteralExpression;
  variable: DMN_InformationItem;
}
