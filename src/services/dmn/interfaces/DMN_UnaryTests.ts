import { ModdleElement } from "./ModdleElement";

const _DMN_UnaryTests: "dmn:UnaryTests" = "dmn:UnaryTests";

export interface DMN_UnaryTests extends ModdleElement {
  $type: typeof _DMN_UnaryTests;
  text: string;
}

export function Is_DMN_UnaryTests(me: ModdleElement): me is DMN_UnaryTests {
  return "$type" in me && me.$type === _DMN_UnaryTests && "text" in me;
}
