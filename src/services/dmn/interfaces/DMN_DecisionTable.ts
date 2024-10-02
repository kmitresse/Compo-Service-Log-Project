import { ModdleElement } from "./ModdleElement";
import { DMN_Decision } from "./DMN_Decision";
import { DMN_DecisionRule } from "./DMN_DecisionRule";
import { DMN_RuleAnnotationClause } from "./DMN_RuleAnnotationClause";
import { Hit_policy } from "./DMN_enums";
import { DMN_InputClause } from "./DMN_InputClause";
import { DMN_OutputClause } from "./DMN_OutputClause";

export const _DMN_DecisionTable: "dmn:DecisionTable" = "dmn:DecisionTable";

export interface DMN_DecisionTable extends ModdleElement {
  $parent: DMN_Decision; // Overriding...
  $type: typeof _DMN_DecisionTable;
  annotation?: Array<DMN_RuleAnnotationClause>;
  hitPolicy?: Hit_policy;
  input?: Array<DMN_InputClause>;
  output?: Array<DMN_OutputClause>;
  outputLabel?: string;
  rule?: Array<DMN_DecisionRule>;
}

export function Is_DMN_DecisionTable(
  me: ModdleElement
): me is DMN_DecisionTable {
  return (
    "$type" in me &&
    me.$type === _DMN_DecisionTable &&
    "input" in me &&
    "output" in me &&
    "rule" in me
  );
}
