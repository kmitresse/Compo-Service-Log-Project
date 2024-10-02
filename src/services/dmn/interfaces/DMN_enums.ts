import { ModdleElement } from "./ModdleElement";

export const _DMiNer_ = "_DMiNer_";
export const FEEL_range = /^[[(\]]\d{1,}\.\.\d{1,}[[)\]]$/;
export const Trace = true; // 'false' in production mode...

export enum Drop_mode {
  FEEL = "FEEL",
  PREDICT = "PREDICT",
  TRAIN = "TRAIN",
}

export enum State_mode {
  MENU = "MENU",
  RANDOMIZE = "RANDOMIZE",
}

export enum Status_mode {
  FELT = "FELT",
  PREDICTED = "PREDICTED",
  RANDOMIZED = "RANDOMIZED",
}

export enum Hit_policy { // DMN 1.3
  ANY = "ANY",
  COLLECT = "COLLECT",
  FIRST = "FIRST",
  OUTPUT_ORDER = "OUTPUT ORDER",
  PRIORITY = "PRIORITY",
  RULE_ORDER = "RULE ORDER",
  UNIQUE = "UNIQUE",
}

export function Name_of_ModdleElement(me: ModdleElement): string {
  return "name" in me ? me.name! : me.$type + me.id;
}

// https://docs.camunda.org/manual/7.18/user-guide/dmn-engine/data-types/#supported-data-types
export enum DMN_type_reference_ {
  BOOLEAN = "boolean",
  DATE = "date",
  DOUBLE = "double",
  ENUMERATION = "enum",
  INTEGER = "integer",
  LONG = "long",
  NUMBER = "number",
  STRING = "string",
}

export function Is_DMN_type_reference_(
  type_reference: string | undefined
): type_reference is DMN_type_reference_ {
  if (type_reference === undefined) return false;
  return Object.values(DMN_type_reference_).includes(
    type_reference.toLowerCase() as DMN_type_reference_
  );
}

export type DMN_type_reference = boolean | Date | number | string;

export type TensorFlow_datum = Array<Array<0 | 1> | DMN_type_reference>;
export type TensorFlow_data = Array<TensorFlow_datum>;

/**
 * A decision service exposes one or more
 * decisions from a decision model as a reusable element, a service, which might be consumed (for example) internally by
 * another decision in the decision model, or externally by a task in a BPMN process model.
 */
const _DMN_DecisionService: "dmn:DecisionService" = "dmn:DecisionService";

const _DMN_Invocation: "dmn:Invocation" = "dmn:Invocation"; // Alternative to decision table and literal expression

// export interface DMNDI_DMNDI extends ModdleElement {
//     $type: 'dmndi:DMNDI';
//     diagrams: Array<DMNDI_DMNDiagram>;
// }

// export interface DMNDI_DMNDiagram extends ModdleElement {
//     $type: 'dmndi:DMNDiagram';
//     diagramElements: Array<ModdleElement>; // 'dmndi:DMNEdge' | 'dmndi:DMNShape'
// }

export function _Extract_enumeration_values(
  enumeration: string
): Array<string> | null;
export function _Extract_enumeration_values(
  enumeration: string,
  type_reference: DMN_type_reference_
): Array<number> | null;
export function _Extract_enumeration_values(
  enumeration: string,
  type_reference?: DMN_type_reference_
): Array<string> | Array<number> | null {
  if (type_reference) {
    if (FEEL_range.test(enumeration)) {
      const values = enumeration.match(/\d+/g)!.map((value) => parseInt(value));
      const start = /^[\(\]]/.test(enumeration)
        ? Math.min(...values) + 1
        : Math.min(...values);
      const end = /[\)\[]$/.test(enumeration)
        ? Math.max(...values) - 1
        : Math.max(...values);
      values.length = 0;
      for (let i = start; i <= end; i++) values.push(i);
      return values;
    } else if (
      type_reference === DMN_type_reference_.INTEGER ||
      type_reference === DMN_type_reference_.LONG
    )
      return enumeration.split(",").map((value) => parseInt(value));
    else if (
      type_reference === DMN_type_reference_.DOUBLE ||
      type_reference === DMN_type_reference_.NUMBER
    )
      return enumeration.split(",").map((value) => parseFloat(value));
    return null;
  }
  const values = enumeration.match(/"\w+( \w+)*"/g);
  return values === null
    ? values
    : values.map((value) => value.replace(/^"/g, "").replace(/"$/g, ""));
}
