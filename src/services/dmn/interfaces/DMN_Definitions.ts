import { ModdleElement } from "./ModdleElement";
import { DMN_BusinessKnowledgeModel } from "./DMN_BusinessKnoledgeModel";
import { DMN_Decision } from "./DMN_Decision";
import { DMN_InputData } from "./DMN_InputData";
import { DMN_KnowledgeSource } from "./DMN_KnowledgSource";
import { DMN_ItemDefinition } from "./DMN_ItemDefinition";
import { DMN_type_reference_, Trace } from "./DMN_enums";

export const _DMN_Definitions: "dmn:Definitions" = "dmn:Definitions";

export interface DMN_Definitions extends ModdleElement {
  $type: typeof _DMN_Definitions;
  // artifact?: Array<ModdleElement>; // 'dmn:Association' | 'dmn:TextAnnotation'
  // dmnDI: DMNDI_DMNDI;
  drgElement: Array<
    | DMN_BusinessKnowledgeModel
    | DMN_Decision
    | DMN_InputData
    | DMN_KnowledgeSource
  >;
  itemDefinition: Array<DMN_ItemDefinition>;
}

export function _Get_type_reference_from_DMN_Definitions(
  me: DMN_Definitions,
  type_name: string | undefined
): DMN_type_reference_ | undefined {
  if (Trace)
    console.assert(
      Is_DMN_Definitions(me),
      "'_Get_type_reference_from_DMN_Definitions' >> 'Is_DMN_Definitions(me)', untrue"
    );
  if (type_name === undefined) return undefined;
  const index = me.itemDefinition.findIndex(
    (item: DMN_ItemDefinition) => item.name === type_name
  );
  return index !== -1 ? me.itemDefinition[index].typeRef : undefined;
}

export function Is_DMN_Definitions(me: ModdleElement): me is DMN_Definitions {
  return "$type" in me && me.$type === _DMN_Definitions && "drgElement" in me;
}
