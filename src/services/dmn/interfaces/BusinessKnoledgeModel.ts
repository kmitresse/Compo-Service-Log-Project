import { ModdleElement } from "./ModdleElement";

const _DMN_BusinessKnowledgeModel: "dmn:BusinessKnowledgeModel" =
  "dmn:BusinessKnowledgeModel";

interface DMN_BusinessKnowledgeModel extends ModdleElement {
  $type: typeof _DMN_BusinessKnowledgeModel;
}

// class BusinessKnowledgeModel extends ModdleElement {
//   readonly $type: string = "dmn:BusinessKnowledgeModel";
// }

export {
  // BusinessKnowledgeModel,
  DMN_BusinessKnowledgeModel,
  _DMN_BusinessKnowledgeModel,
};
