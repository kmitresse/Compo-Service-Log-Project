import { ModdleElement } from "./ModdleElement";
import { ModdleElementReference } from "./ModdleElementReference";

const _DMN_AuthorityRequirement: "dmn:AuthorityRequirement" =
  "dmn:AuthorityRequirement";

interface AuthorityRequirement extends ModdleElement {
  $type: typeof _DMN_AuthorityRequirement;
  requiredAuthority?: ModdleElementReference;
  requiredDecision?: ModdleElementReference;
}

// class AuthorityRequirement extends ModdleElement {
//   readonly $type: string = "dmn:AuthorityRequirement";
//   requiredAuthority?: ModdleElementReference;
//   requiredDecision?: ModdleElementReference;
// }

export { AuthorityRequirement, _DMN_AuthorityRequirement };
