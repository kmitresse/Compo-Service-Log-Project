import { UnaryTests } from "./UnaryTests";
import { DMN_type_reference_ } from "./enums";

const _DMN_ItemDefinition: "dmn:ItemDefinition" = "dmn:ItemDefinition";

interface ItemDefinition {
  $type: typeof _DMN_ItemDefinition;
  allowedValues?: UnaryTests;
  itemComponent?: Array<ItemDefinition>;
  label: string;
  name: string;
  typeRef?: DMN_type_reference_;
}

export { ItemDefinition, _DMN_ItemDefinition };
