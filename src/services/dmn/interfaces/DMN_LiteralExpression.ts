import { ModdleElement } from "./ModdleElement";
import { DMN_type_reference_ } from "./DMN_enums";

export const _DMN_LiteralExpression: "dmn:LiteralExpression" =
  "dmn:LiteralExpression";

export interface DMN_LiteralExpression extends ModdleElement {
  $type: typeof _DMN_LiteralExpression;
  text: string;
  typeRef: DMN_type_reference_;
}

export function Is_DMN_LiteralExpression(
  me: ModdleElement
): me is DMN_LiteralExpression {
  return (
    "$type" in me &&
    me.$type === _DMN_LiteralExpression &&
    "text" in me &&
    "typeRef" in me
  );
}
