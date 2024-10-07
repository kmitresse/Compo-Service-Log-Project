import { ModdleElement } from "./ModdleElement";
import { Decision } from "./Decision";
import { DecisionRule } from "./DecisionRule";
import { RuleAnnotationClause } from "./RuleAnnotationClause";
import { Hit_policy } from "./enums";
import { InputClause } from "./InputClause";
import { OutputClause } from "./OutputClause";

const _DMN_DecisionTable: "dmn:DecisionTable" = "dmn:DecisionTable";

interface DecisionTable extends ModdleElement {
  $parent: Decision; // Overriding...
  $type: typeof _DMN_DecisionTable;
  annotation?: Array<RuleAnnotationClause>;
  hitPolicy?: Hit_policy;
  input?: Array<InputClause>;
  output?: Array<OutputClause>;
  outputLabel?: string;
  rule?: Array<DecisionRule>;
}

function Is_DMN_DecisionTable(me: ModdleElement): me is DecisionTable {
  return (
    "$type" in me &&
    me.$type === _DMN_DecisionTable &&
    "input" in me &&
    "output" in me &&
    "rule" in me
  );
}

export { DecisionTable, _DMN_DecisionTable, Is_DMN_DecisionTable };
