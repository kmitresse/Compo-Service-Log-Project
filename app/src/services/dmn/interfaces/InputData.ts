import { ModdleElement } from "./ModdleElement";
import { InformationItem } from "./InformationItem";

const _DMN_InputData: "dmn:InputData" = "dmn:InputData";

interface InputData extends ModdleElement {
  $type: typeof _DMN_InputData;
  name: string;
  variable?: InformationItem;
}

function Is_DMN_InputData(me: ModdleElement): me is InputData {
  return "$type" in me && me.$type === _DMN_InputData;
}

export { InputData, _DMN_InputData, Is_DMN_InputData };
