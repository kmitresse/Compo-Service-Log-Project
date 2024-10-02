import { DMN_UnaryTests } from "./DMN_UnaryTests";
import { DMN_type_reference_ } from "./DMN_enums";

const _DMN_ItemDefinition: "dmn:ItemDefinition" = "dmn:ItemDefinition";

export interface DMN_ItemDefinition {
  $type: typeof _DMN_ItemDefinition;
  allowedValues?: DMN_UnaryTests;
  itemComponent?: Array<DMN_ItemDefinition>;
  label: string;
  name: string;
  typeRef?: DMN_type_reference_;
}
