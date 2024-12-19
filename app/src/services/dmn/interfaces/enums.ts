import { ModdleElement } from "./ModdleElement";

const _DMiNer_ = "_DMiNer_";
const FEEL_range = /^[[(\]]\d{1,}\.\.\d{1,}[[)\]]$/;
const Trace = true; // 'false' in production mode...

enum Drop_mode {
  FEEL = "FEEL",
  PREDICT = "PREDICT",
  TRAIN = "TRAIN",
}

enum State_mode {
  MENU = "MENU",
  RANDOMIZE = "RANDOMIZE",
}

enum Status_mode {
  FELT = "FELT",
  PREDICTED = "PREDICTED",
  RANDOMIZED = "RANDOMIZED",
}

enum Hit_policy { // DMN 1.3
  ANY = "ANY",
  COLLECT = "COLLECT",
  FIRST = "FIRST",
  OUTPUT_ORDER = "OUTPUT ORDER",
  PRIORITY = "PRIORITY",
  RULE_ORDER = "RULE ORDER",
  UNIQUE = "UNIQUE",
}

function Name_of_ModdleElement(me: ModdleElement): string {
  return "name" in me ? me.name! : me.$type + me.id;
}

// https://docs.camunda.org/manual/7.18/user-guide/dmn-engine/data-types/#supported-data-types
enum DMN_type_reference_ {
  BOOLEAN = "boolean",
  DATE = "date",
  DOUBLE = "double",
  ENUMERATION = "enum",
  INTEGER = "integer",
  LONG = "long",
  NUMBER = "number",
  STRING = "string",
}

function Is_DMN_type_reference_(
  type_reference: string | undefined,
): type_reference is DMN_type_reference_ {
  if (type_reference === undefined) return false;
  return Object.values(DMN_type_reference_).includes(
    type_reference.toLowerCase() as DMN_type_reference_,
  );
}

type DMN_type_reference = boolean | Date | number | string;

type TensorFlow_datum = Array<Array<0 | 1> | DMN_type_reference>;
type TensorFlow_data = Array<TensorFlow_datum>;

const _DMN_DecisionService: "dmn:DecisionService" = "dmn:DecisionService";

const _DMN_Invocation: "dmn:Invocation" = "dmn:Invocation"; // Alternative to decision table and literal expression

function _Extract_enumeration_values(enumeration: string): string[] | null;

function _Extract_enumeration_values(
  enumeration: string,
  type_reference: DMN_type_reference_,
): number[] | null;

function _Extract_enumeration_values(
  enumeration: string,
  type_reference?: DMN_type_reference_,
): string[] | number[] | null {
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

export {
  _DMiNer_,
  FEEL_range,
  Trace,
  Drop_mode,
  State_mode,
  Status_mode,
  Hit_policy,
  Name_of_ModdleElement,
  DMN_type_reference_,
  Is_DMN_type_reference_,
  DMN_type_reference,
  TensorFlow_datum,
  TensorFlow_data,
  _Extract_enumeration_values,
};
