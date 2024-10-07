// type ModdleElement = {
//   id: string;
//   $type: string;
//   name?: string;
//   $parent?: ModdleElement;
// };

class ModdleElement {
  readonly $type: string = "dmn:ModdleElement";

  id: string = "";
  name?: string;
  $parent?: ModdleElement;

  getName(): string {
    if (!this.name) return `${this.$type}${this.id}`;
    return this.name;
  }
}

export { ModdleElement };

// export interface ModdleElement {
//   // $attrs: Object; // Unused...
//   id: string;
//   name?: string;
//   $parent: ModdleElement | undefined;
//   $type: string;
// }
