import { ModdleElement } from "./ModdleElement";
import { DMN_AuthorityRequirement } from "./DMN_AuthorityRequirement";
import { DMN_Context } from "./DMN_Context";
import { DMN_DecisionTable } from "./DMN_DecisionTable";
import { DMN_Definitions } from "./DMN_Definitions";
import { DMN_LiteralExpression } from "./DMN_LiteralExpression";
import { DMN_InformationRequirement } from "./DMN_InformationRequirement";
import { DMN_KnowledgeRequirement } from "./DMN_KnowledgeRequirement";
import { DMN_InformationItem } from "./DMN_InformationItem";

export const _DMN_Decision: "dmn:Decision" = "dmn:Decision";

export interface DMN_Decision extends ModdleElement {
  $parent: DMN_Definitions;
  $type: typeof _DMN_Decision;
  allowedAnswers?: string;
  authorityRequirement?: Array<DMN_AuthorityRequirement>; // Knowledge source(s)
  decisionLogic: DMN_Context | DMN_DecisionTable | DMN_LiteralExpression;
  description?: string;
  informationRequirement?: Array<DMN_InformationRequirement>; // Input data
  knowledgeRequirement?: Array<DMN_KnowledgeRequirement>; // Knowledge model(s)
  question?: string;
  variable?: DMN_InformationItem;
}

export function Is_DMN_Decision(me: ModdleElement): me is DMN_Decision {
  return "$type" in me && me.$type === _DMN_Decision && "decisionLogic" in me;
}

export function Name_of_DMN_Decision(decision: DMN_Decision): string {
  return "name" in decision ? decision.name! : decision.id;
}
