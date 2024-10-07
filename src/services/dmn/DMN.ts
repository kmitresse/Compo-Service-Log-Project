import DmnModdle from "dmn-moddle";
import {
  Decision,
  Is_DMN_Decision,
  Is_DMN_DecisionTable,
  Name_of_DMN_InputClause,
  Name_of_DMN_OutputClause,
  Definitions,
} from "./interfaces";

export class DMN {
  static async parse(xml: string): Promise<Definitions> {
    const { rootElement, warnings } = await new DmnModdle().fromXML(xml);
    if (warnings.length !== 0)
      console.warn(warnings.map((warning: any) => warning.message).join(" * "));
    return rootElement as Definitions;
  }

  public static getSchema(dmnDefinitions: Definitions) {
    const descisions: Decision[] = dmnDefinitions.drgElement.filter((element) =>
      Is_DMN_Decision(element)
    );
    const { input, output } = descisions
      .map((decision) => decision.decisionLogic)
      .filter((decisionLogic) => Is_DMN_DecisionTable(decisionLogic))[0];

    // TODO generate json schema

    return {
      input: input?.map((input) => Name_of_DMN_InputClause(input)),
      output: output?.map((output) => Name_of_DMN_OutputClause(output)),
    };
  }
}
