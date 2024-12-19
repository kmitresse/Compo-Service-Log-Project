import { ModdleElement } from "./ModdleElement";
import { DMN_BusinessKnowledgeModel } from "./BusinessKnoledgeModel";
import { Decision } from "./Decision";
import { InputData } from "./InputData";
import { DMN_KnowledgeSource } from "./KnowledgSource";
import { ItemDefinition } from "./ItemDefinition";
import { DMN_type_reference_, Trace } from "./enums";

const _DMN_Definitions: "dmn:Definitions" = "dmn:Definitions";

interface Definitions extends ModdleElement {
  $type: typeof _DMN_Definitions;
  drgElement: Array<
    DMN_BusinessKnowledgeModel | Decision | InputData | DMN_KnowledgeSource
  >;
  itemDefinition: ItemDefinition[];
}

function _Get_type_reference_from_DMN_Definitions(
  me: Definitions,
  type_name?: string,
): DMN_type_reference_ | undefined {
  if (Trace)
    console.assert(
      Is_DMN_Definitions(me),
      "'_Get_type_reference_from_DMN_Definitions' >> 'Is_DMN_Definitions(me)', untrue",
    );

  if (type_name === undefined) return undefined;
  const index = me.itemDefinition.findIndex(
    (item: ItemDefinition) => item.name === type_name,
  );
  return index !== -1 ? me.itemDefinition[index].typeRef : undefined;
}

function Is_DMN_Definitions(me: ModdleElement): me is Definitions {
  return "$type" in me && me.$type === _DMN_Definitions && "drgElement" in me;
}

export {
  _DMN_Definitions,
  Definitions,
  _Get_type_reference_from_DMN_Definitions,
  Is_DMN_Definitions,
};
