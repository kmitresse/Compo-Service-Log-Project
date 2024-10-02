import { ModdleElement } from "./ModdleElement";
import { DMN_UnaryTests } from "./DMN_UnaryTests";
import { DMN_LiteralExpression } from "./DMN_LiteralExpression";
export const _DMN_DecisionRule: "dmn:DecisionRule" = "dmn:DecisionRule";

export interface DMN_DecisionRule extends ModdleElement {
  $type: typeof _DMN_DecisionRule;
  description: string;
  inputEntry: Array<DMN_UnaryTests>;
  outputEntry: Array<DMN_LiteralExpression>;
}
