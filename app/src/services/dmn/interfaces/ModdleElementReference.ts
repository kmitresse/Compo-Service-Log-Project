import { ModdleElement } from "./ModdleElement";

const _DMN_DMNElementReference: "dmn:DMNElementReference" =
  "dmn:DMNElementReference";
interface ModdleElementReference extends ModdleElement {
  $type: typeof _DMN_DMNElementReference;
  href: string; // Example: "#temperature_id"
}

export { ModdleElementReference, _DMN_DMNElementReference };
