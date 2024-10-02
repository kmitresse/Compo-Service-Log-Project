export interface ModdleElement {
  // $attrs: Object; // Unused...
  id: string;
  name?: string;
  $parent: ModdleElement | undefined;
  $type: string;
}
