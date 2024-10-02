import { Dataset } from "../dataset";
import { Data } from "../data";
import DmnModdle from "dmn-moddle";
import { DMN_Decision, Is_DMN_Decision } from "./interfaces/DMN_Decision";
import {
  DMN_DecisionTable,
  Is_DMN_DecisionTable,
} from "./interfaces/DMN_DecisionTable";
import {
  DMN_InputClause,
  Name_of_DMN_InputClause,
} from "./interfaces/DMN_InputClause";
import { Name_of_DMN_OutputClause } from "./interfaces/DMN_OutputClause";
import { ModdleElement } from "./interfaces/ModdleElement";
import { DmnError } from "./error/DmnError";

export class DMN {
  static async parse(xml: string) {
    const { rootElement, warnings } = await new DmnModdle().fromXML(xml);
    if (warnings.length !== 0)
      console.warn(warnings.map((warning: any) => warning.message).join(" * "));
    return rootElement;
  }

  // static async getFilter(xml: string) {
  //   const rootElement = await DMN.parse(xml);
  //
  //   const filterFunction = (me: ModdleElement) =>
  //     Is_DMN_Decision(me) && Is_DMN_DecisionTable(me.decisionLogic);
  //   const everyFunction = (decision: DMN_Decision) => {
  //     try {
  //       const decision_table: DMN_DecisionTable =
  //         decision.decisionLogic as DMN_DecisionTable;
  //       let features: string[] = decision_table.input!.map(
  //         (input_clause: DMN_InputClause) =>
  //           Name_of_DMN_InputClause(input_clause)
  //       );
  //       const index: number = features
  //         .map((feature: string): string => feature.toUpperCase())
  //         .indexOf(DMN.URL);
  //       if (index === -1) return false;
  //       // Si la zone 'text' est égale à "" alors prendre 'features[0]' :
  //       const data_source = decision_table.input[
  //         index
  //       ].inputExpression.text.replaceAll('"', ""); // ES2021
  //       features = features.concat(
  //         decision_table.output!.map((output_clause) =>
  //           Name_of_DMN_OutputClause(output_clause)
  //         )
  //       );
  //       // A changer, il y a autant de 'Randomizer' objects que de tables de décision :
  //       DMN._Randomizer = new Randomizer(
  //         data_source,
  //         features /* Number of features whose type is "output", default is '1' */
  //       );
  //
  //       // decision_table.rule!.forEach((rule) => {
  //       //     features.forEach((feature, feature_index) => {
  //       //         const column = rule.inputEntry[feature_index];
  //       //         // A priori, nothing here since "rules" are ignored...
  //       //     y});
  //       // });
  //     } catch (error: unknown) {
  //       throw new DmnError(decision, DmnError.Invalid_JSON);
  //     }
  //   };
  //
  //   const a: boolean = rootElement.drgElement
  //     .filter(filterFunction)
  //     .every(everyFunction);
  //
  //   try {
  //     if (a === false) return Promise.resolve(undefined); // DMN processing causes trouble(s)...
  //   } catch (error: unknown) {
  //     console.error(error);
  //   }
  // }
}
