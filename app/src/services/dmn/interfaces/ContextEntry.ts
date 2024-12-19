import { ModdleElement } from "./ModdleElement";
import { LiteralExpression } from "./LiteralExpression";
import { InformationItem } from "./InformationItem";

const _DMN_ContextEntry: "dmn:ContextEntry" = "dmn:ContextEntry";

interface ContextEntry extends ModdleElement {
  $type: typeof _DMN_ContextEntry;
  value: LiteralExpression;
  variable: InformationItem;
}

// class ContextEntry extends ModdleElement {
//   readonly $type: string = "dmn:ContextEntry";
//   value: LiteralExpression = new LiteralExpression();
//   variable: InformationItem;
// }

export { ContextEntry, _DMN_ContextEntry };
