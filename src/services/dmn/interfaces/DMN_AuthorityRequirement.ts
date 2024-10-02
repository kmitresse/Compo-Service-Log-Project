import { ModdleElement } from "./ModdleElement";
import { DMN_DMNElementReference } from "./DMN_DMNElementReference";

export const _DMN_AuthorityRequirement: "dmn:AuthorityRequirement" =
  "dmn:AuthorityRequirement";

export interface DMN_AuthorityRequirement extends ModdleElement {
  $type: typeof _DMN_AuthorityRequirement;
  requiredAuthority?: DMN_DMNElementReference;
  requiredDecision?: DMN_DMNElementReference;
}
