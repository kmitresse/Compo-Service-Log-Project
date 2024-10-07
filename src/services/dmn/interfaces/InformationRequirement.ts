import { ModdleElement } from "./ModdleElement";
import { ModdleElementReference } from "./ModdleElementReference";

const _DMN_InformationRequirement: "dmn:InformationRequirement" =
  "dmn:InformationRequirement";

interface InformationRequirement extends ModdleElement {
  $type: typeof _DMN_InformationRequirement;
  requiredDecision?: ModdleElementReference;
  requiredInput?: ModdleElementReference;
}

function Is_DMN_InformationRequirement(
  me: ModdleElement
): me is InformationRequirement {
  return (
    "$type" in me &&
    me.$type === _DMN_InformationRequirement &&
    "requiredInput" in me
  );
}

export {
  InformationRequirement,
  _DMN_InformationRequirement,
  Is_DMN_InformationRequirement,
};
