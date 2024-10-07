import { ModdleElement } from "./ModdleElement";
import { AuthorityRequirement } from "./AuthorityRequirement";
import { Context } from "./Context";
import { DecisionTable } from "./DecisionTable";
import { Definitions } from "./Definitions";
import { LiteralExpression } from "./LiteralExpression";
import { InformationRequirement } from "./InformationRequirement";
import { KnowledgeRequirement } from "./KnowledgeRequirement";
import { InformationItem } from "./InformationItem";

const _DMN_Decision: "dmn:Decision" = "dmn:Decision";

interface Decision extends ModdleElement {
  $parent: Definitions;
  $type: typeof _DMN_Decision;
  decisionLogic: Context | DecisionTable | LiteralExpression;
  allowedAnswers?: string;
  authorityRequirement?: Array<AuthorityRequirement>; // Knowledge source(s)
  description?: string;
  informationRequirement?: Array<InformationRequirement>; // Input data
  knowledgeRequirement?: Array<KnowledgeRequirement>; // Knowledge model(s)
  question?: string;
  variable?: InformationItem;
}

function Is_DMN_Decision(me: ModdleElement): me is Decision {
  return "$type" in me && me.$type === _DMN_Decision && "decisionLogic" in me;
}

function Name_of_DMN_Decision(decision: Decision): string {
  return "name" in decision ? decision.name! : decision.id;
}

export { Decision, _DMN_Decision, Is_DMN_Decision, Name_of_DMN_Decision };
