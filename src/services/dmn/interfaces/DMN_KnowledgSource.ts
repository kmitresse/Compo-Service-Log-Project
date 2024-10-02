import { ModdleElement } from "./ModdleElement";
import { DMN_AuthorityRequirement } from "./DMN_AuthorityRequirement";

export const _DMN_KnowledgeSource: "dmn:KnowledgeSource" =
  "dmn:KnowledgeSource";

export interface DMN_KnowledgeSource extends ModdleElement {
  $type: typeof _DMN_KnowledgeSource;
  authorityRequirement?: Array<DMN_AuthorityRequirement>;
}
