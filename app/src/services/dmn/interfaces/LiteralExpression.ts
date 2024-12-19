import { ModdleElement } from "./ModdleElement";
import { DMN_type_reference_ } from "./enums";

const _DMN_LiteralExpression: "dmn:LiteralExpression" = "dmn:LiteralExpression";

interface LiteralExpression extends ModdleElement {
  $type: typeof _DMN_LiteralExpression;
  text: string;
  typeRef: DMN_type_reference_;
}

function Is_DMN_LiteralExpression(me: ModdleElement): me is LiteralExpression {
  return (
    "$type" in me &&
    me.$type === _DMN_LiteralExpression &&
    "text" in me &&
    "typeRef" in me
  );
}

export { LiteralExpression, _DMN_LiteralExpression, Is_DMN_LiteralExpression };
