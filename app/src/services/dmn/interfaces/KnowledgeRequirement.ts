import { ModdleElement } from "./ModdleElement";
import { ModdleElementReference } from "./ModdleElementReference";

const _DMN_KnowledgeRequirement: "dmn:KnowledgeRequirement" =
  "dmn:KnowledgeRequirement";

interface KnowledgeRequirement extends ModdleElement {
  $type: typeof _DMN_KnowledgeRequirement;
  requiredKnowledge: ModdleElementReference;
}

export { KnowledgeRequirement, _DMN_KnowledgeRequirement };
