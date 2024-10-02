import { ModdleElement } from "./ModdleElement";

import { DMN_DecisionTable } from "./DMN_DecisionTable";
import { DMN_Decision } from "./DMN_Decision";
import { DmnError } from "../error/DmnError";
import {
  _Get_type_reference_from_DMN_Definitions,
  DMN_Definitions,
} from "./DMN_Definitions";
import { DMN_UnaryTests } from "./DMN_UnaryTests";
import {
  _Extract_enumeration_values,
  DMN_type_reference_,
  Is_DMN_type_reference_,
} from "./DMN_enums";

const _DMN_OutputClause: "dmn:OutputClause" = "dmn:OutputClause";

export interface DMN_OutputClause extends ModdleElement {
  $parent: DMN_DecisionTable; // Overriding...
  $type: typeof _DMN_OutputClause;
  label?: string;
  outputValues?: DMN_UnaryTests;
  typeRef?: DMN_type_reference_;
}

export function Get_enumeration_from_DMN_OutputClause(
  me: DMN_OutputClause
): Array<any> | never {
  // if (Trace)
  //     console.assert(_Is_DMN_OutputClause_enumeration_(me), "Get_enumeration_from_DMN_OutputClause >> '_Is_DMN_OutputClause_enumeration_(me)', untrue");
  let type_reference = me.typeRef;
  if (Is_DMN_type_reference_(type_reference) === false) {
    type_reference = _Get_type_reference_from_DMN_Definitions(
      me.$parent.$parent.$parent as DMN_Definitions,
      type_reference
    );
    if (type_reference === undefined)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_OutputClause(me)
      );
  }
  if (type_reference === DMN_type_reference_.BOOLEAN) return [false, true];
  else if (type_reference === DMN_type_reference_.STRING) {
    const extraction = _Extract_enumeration_values(me.outputValues!.text);
    if (extraction === null)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_OutputClause(me)
      );
    return extraction;
  } else {
    const extraction = _Extract_enumeration_values(
      me.outputValues!.text,
      type_reference
    );
    if (extraction === null)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_OutputClause(me)
      );
    return extraction;
  }
}

export function _Is_DMN_OutputClause_enumeration_(
  me: DMN_OutputClause
): boolean {
  // 'typeRef' may be missing even though 'outputValues' is present -> "enumeration" anyway...
  return /*'typeRef' in me &&*/ "outputValues" in me;
}

export function Name_of_DMN_OutputClause(me: DMN_OutputClause): string {
  return "label" in me
    ? me.label!
    : "name" in me
      ? me.name!
      : "outputLabel" in me.$parent
        ? me.$parent.outputLabel!
        : "name" in me.$parent.$parent
          ? me.$parent.$parent.name!
          : me.id;
}

export function Type_of_DMN_OutputClause(
  me: DMN_OutputClause,
  decision: DMN_Decision,
  primitive_type = false
): DMN_type_reference_ | never {
  if (primitive_type === false && _Is_DMN_OutputClause_enumeration_(me))
    return DMN_type_reference_.ENUMERATION;
  else if ("typeRef" in me)
    if (Is_DMN_type_reference_(me.typeRef!)) return me.typeRef;
    else {
      const base_type = _Get_type_reference_from_DMN_Definitions(
        decision.$parent,
        me.typeRef! as string
      );
      return base_type && Is_DMN_type_reference_(base_type)
        ? base_type
        : DMN_type_reference_.STRING;
    }
  throw new DmnError(
    me,
    DmnError.Undefined_DMN_type,
    Name_of_DMN_OutputClause(me)
  );
}
