import { ModdleElement } from "./ModdleElement";
import { DmnError } from "../error/DmnError";
import { DMN_DecisionTable } from "./DMN_DecisionTable";
import {
  _Get_type_reference_from_DMN_Definitions,
  DMN_Definitions,
} from "./DMN_Definitions";
import { DMN_Decision } from "./DMN_Decision";
import { DMN_LiteralExpression } from "./DMN_LiteralExpression";
import { DMN_UnaryTests } from "./DMN_UnaryTests";
import {
  _Extract_enumeration_values,
  DMN_type_reference_,
  Is_DMN_type_reference_,
} from "./DMN_enums";

export const _DMN_InputClause: "dmn:InputClause" = "dmn:InputClause";

export interface DMN_InputClause extends ModdleElement {
  $parent: DMN_DecisionTable; // Overriding...
  $type: typeof _DMN_InputClause;
  inputExpression?: DMN_LiteralExpression;
  inputValues?: DMN_UnaryTests;
  label?: string;
  typeRef?: DMN_type_reference_;
  width?: number;
}

export function Get_enumeration_from_DMN_InputClause(
  me: DMN_InputClause
): Array<any> | never {
  // if (Trace)
  //     console.assert(_Is_DMN_InputClause_enumeration_(me), "Get_enumeration_from_DMN_InputClause >> '_Is_DMN_InputClause_enumeration_(me)', untrue");
  let type_reference =
    "inputExpression" in me ? me.inputExpression!.typeRef : undefined;
  if (Is_DMN_type_reference_(type_reference) === false) {
    type_reference = _Get_type_reference_from_DMN_Definitions(
      me.$parent.$parent.$parent as DMN_Definitions,
      type_reference
    );
    if (type_reference === undefined)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_InputClause(me)
      );
  }
  if (type_reference === DMN_type_reference_.BOOLEAN) return [false, true];
  else if (type_reference === DMN_type_reference_.STRING) {
    const extraction = _Extract_enumeration_values(me.inputValues!.text);
    if (extraction === null)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_InputClause(me)
      );
    return extraction;
  } else {
    const extraction = _Extract_enumeration_values(
      me.inputValues!.text,
      type_reference
    );
    if (extraction === null)
      throw new DmnError(
        me,
        DmnError.Undefined_DMN_type,
        Name_of_DMN_InputClause(me)
      );
    return extraction;
  }
}

function _Is_DMN_InputClause_enumeration_(me: DMN_InputClause): boolean {
  return (
    "inputExpression" in me &&
    "typeRef" in me.inputExpression! &&
    ("inputValues" in me ||
      me.inputExpression.typeRef === DMN_type_reference_.BOOLEAN)
  );
}

export function Name_of_DMN_InputClause(me: DMN_InputClause): string {
  return "label" in me
    ? me.label!
    : "name" in me
      ? me.name!
      : "inputExpression" in me && "name" in me.inputExpression!
        ? me.inputExpression.name!
        : me.id;
}

export function Type_of_DMN_InputClause(
  me: DMN_InputClause,
  decision: DMN_Decision
): DMN_type_reference_ | never {
  if (_Is_DMN_InputClause_enumeration_(me))
    return DMN_type_reference_.ENUMERATION;
  else if ("typeRef" in me) {
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
  } else {
    if ("inputExpression" in me && "typeRef" in me.inputExpression!) {
      if (Is_DMN_type_reference_(me.inputExpression.typeRef))
        return me.inputExpression.typeRef;
      else {
        const base_type = _Get_type_reference_from_DMN_Definitions(
          decision.$parent,
          me.inputExpression!.typeRef as string
        );
        return base_type && Is_DMN_type_reference_(base_type)
          ? base_type
          : DMN_type_reference_.STRING;
      }
    }
  }
  throw new DmnError(
    me,
    DmnError.Undefined_DMN_type,
    Name_of_DMN_InputClause(me)
  );
}
