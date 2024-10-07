import { ModdleElement } from "./ModdleElement";

const _DMN_UnaryTests: "dmn:UnaryTests" = "dmn:UnaryTests";

interface UnaryTests extends ModdleElement {
  $type: typeof _DMN_UnaryTests;
  text: string;
}

function Is_DMN_UnaryTests(me: ModdleElement): me is UnaryTests {
  return "$type" in me && me.$type === _DMN_UnaryTests && "text" in me;
}

export { UnaryTests, _DMN_UnaryTests, Is_DMN_UnaryTests };
