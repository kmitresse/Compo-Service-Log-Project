import { ModdleElement } from "./ModdleElement";

export const _DMN_DMNElementReference: "dmn:DMNElementReference" =
  "dmn:DMNElementReference";
export interface DMN_DMNElementReference extends ModdleElement {
  $type: typeof _DMN_DMNElementReference;
  href: string; // Example: "#temperature_id"
}
