import { ModdleElement } from "./ModdleElement";
import { AuthorityRequirement } from "./AuthorityRequirement";

const _DMN_KnowledgeSource: "dmn:KnowledgeSource" = "dmn:KnowledgeSource";

interface DMN_KnowledgeSource extends ModdleElement {
  $type: typeof _DMN_KnowledgeSource;
  authorityRequirement?: Array<AuthorityRequirement>;
}

export { DMN_KnowledgeSource, _DMN_KnowledgeSource };
