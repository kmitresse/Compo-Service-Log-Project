import { ModdleElement } from "./ModdleElement";
import { UnaryTests } from "./UnaryTests";
import { LiteralExpression } from "./LiteralExpression";

const _DMN_DecisionRule: "dmn:DecisionRule" = "dmn:DecisionRule";

interface DecisionRule extends ModdleElement {
  $type: typeof _DMN_DecisionRule;
  description: string;
  inputEntry: Array<UnaryTests>;
  outputEntry: Array<LiteralExpression>;
}

export { DecisionRule, _DMN_DecisionRule };
