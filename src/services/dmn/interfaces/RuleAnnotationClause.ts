import { ModdleElement } from "./ModdleElement";

const _DMN_RuleAnnotationClause: "dmn:RuleAnnotationClause" =
  "dmn:RuleAnnotationClause";

interface RuleAnnotationClause extends ModdleElement {
  $type: typeof _DMN_RuleAnnotationClause;
}

export { RuleAnnotationClause, _DMN_RuleAnnotationClause };
