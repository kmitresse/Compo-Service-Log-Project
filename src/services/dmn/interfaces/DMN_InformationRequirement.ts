import { ModdleElement } from "./ModdleElement";
import { DMN_DMNElementReference } from "./DMN_DMNElementReference";

const _DMN_InformationRequirement: "dmn:InformationRequirement" =
  "dmn:InformationRequirement";

export interface DMN_InformationRequirement extends ModdleElement {
  $type: typeof _DMN_InformationRequirement;
  requiredDecision?: DMN_DMNElementReference;
  requiredInput?: DMN_DMNElementReference;
}

export function Is_DMN_InformationRequirement(
  me: ModdleElement
): me is DMN_InformationRequirement {
  return (
    "$type" in me &&
    me.$type === _DMN_InformationRequirement &&
    "requiredInput" in me
  );
}
