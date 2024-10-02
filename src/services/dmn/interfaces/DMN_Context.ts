import { ModdleElement } from "./ModdleElement";
import { DMN_ContextEntry } from "./DMN_ContextEntry";
import { DMN_type_reference_ } from "./DMN_enums";

const _DMN_Context: "dmn:Context" = "dmn:Context";

export interface DMN_Context extends ModdleElement {
  $type: typeof _DMN_Context;
  contextEntry: Array<DMN_ContextEntry>;
  typeRef: DMN_type_reference_;
}

export function Is_DMN_Context(me: ModdleElement): me is DMN_Context {
  return (
    "$type" in me &&
    me.$type === _DMN_Context &&
    "contextEntry" in me &&
    "typeRef" in me
  );
}
