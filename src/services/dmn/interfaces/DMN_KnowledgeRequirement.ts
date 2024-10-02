import { ModdleElement } from "./ModdleElement";
import { DMN_DMNElementReference } from "./DMN_DMNElementReference";

const _DMN_KnowledgeRequirement: "dmn:KnowledgeRequirement" =
  "dmn:KnowledgeRequirement";

export interface DMN_KnowledgeRequirement extends ModdleElement {
  $type: typeof _DMN_KnowledgeRequirement;
  requiredKnowledge: DMN_DMNElementReference;
}
