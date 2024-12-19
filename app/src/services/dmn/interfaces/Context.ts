import { ModdleElement } from "./ModdleElement";
import { ContextEntry } from "./ContextEntry";
import { DMN_type_reference_ } from "./enums";

const _DMN_Context: "dmn:Context" = "dmn:Context";

interface Context extends ModdleElement {
  $type: typeof _DMN_Context;
  contextEntry: Array<ContextEntry>;
  typeRef: DMN_type_reference_;
}

function Is_DMN_Context(me: ModdleElement): me is Context {
  return (
    "$type" in me &&
    me.$type === _DMN_Context &&
    "contextEntry" in me &&
    "typeRef" in me
  );
}

// class Context extends ModdleElement {
//   readonly $type: string = "dmn:Context";
//   contextEntry: ContextEntry[] = [];
//   typeRef: DMN_type_reference_ ;
// }

export { Context, _DMN_Context, Is_DMN_Context };
