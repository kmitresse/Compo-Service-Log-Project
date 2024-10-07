import { ModdleElement } from "./ModdleElement";

import { DecisionTable } from "./DecisionTable";
import { Decision } from "./Decision";
import { DmnError } from "../error/DmnError";
import {
  _Get_type_reference_from_DMN_Definitions,
  Definitions,
} from "./Definitions";
import { UnaryTests } from "./UnaryTests";
import {
  _Extract_enumeration_values,
  DMN_type_reference_,
  Is_DMN_type_reference_,
} from "./enums";

const _DMN_OutputClause: "dmn:OutputClause" = "dmn:OutputClause";

interface OutputClause extends ModdleElement {
  $parent: DecisionTable; // Overriding...
  $type: typeof _DMN_OutputClause;
  label?: string;
  outputValues?: UnaryTests;
  typeRef?: DMN_type_reference_;
}

function Get_enumeration_from_DMN_OutputClause(
  me: OutputClause
): any[] | never {
  // if (Trace)
  //     console.assert(_Is_DMN_OutputClause_enumeration_(me), "Get_enumeration_from_DMN_OutputClause >> '_Is_DMN_OutputClause_enumeration_(me)', untrue");
  let type_reference = me.typeRef;
  if (Is_DMN_type_reference_(type_reference) === false) {
    type_reference = _Get_type_reference_from_DMN_Definitions(
      me.$parent.$parent.$parent as Definitions,
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

function _Is_DMN_OutputClause_enumeration_(me: OutputClause): boolean {
  // 'typeRef' may be missing even though 'outputValues' is present -> "enumeration" anyway...
  return /*'typeRef' in me &&*/ "outputValues" in me;
}

function Name_of_DMN_OutputClause(me: OutputClause): string {
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

function Type_of_DMN_OutputClause(
  me: OutputClause,
  decision: Decision,
  primitive_type = false
): DMN_type_reference_ | never {
  if (!primitive_type && _Is_DMN_OutputClause_enumeration_(me))
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

export {
  OutputClause,
  _DMN_OutputClause,
  Get_enumeration_from_DMN_OutputClause,
  _Is_DMN_OutputClause_enumeration_,
  Name_of_DMN_OutputClause,
  Type_of_DMN_OutputClause,
};
