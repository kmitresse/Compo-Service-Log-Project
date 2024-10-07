import DmnModdle from "dmn-moddle";
import { DMN_Decision, Is_DMN_Decision } from "./interfaces/DMN_Decision";
import { Is_DMN_DecisionTable } from "./interfaces/DMN_DecisionTable";
import { Name_of_DMN_InputClause } from "./interfaces/DMN_InputClause";
import { Name_of_DMN_OutputClause } from "./interfaces/DMN_OutputClause";
import { DMN_Definitions } from "./interfaces/DMN_Definitions";

export class DMN {
  static async parse(xml: string): Promise<DMN_Definitions> {
    const { rootElement, warnings } = await new DmnModdle().fromXML(xml);
    if (warnings.length !== 0)
      console.warn(warnings.map((warning: any) => warning.message).join(" * "));
    return rootElement as DMN_Definitions;
  }

  public static getSchema(dmnDefinitions: DMN_Definitions) {
    const descisions: DMN_Decision[] = dmnDefinitions.drgElement.filter(
      (element) => Is_DMN_Decision(element)
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
