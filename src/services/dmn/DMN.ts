import DmnModdle from "dmn-moddle";
import {
  Decision,
  Is_DMN_Decision,
  Is_DMN_DecisionTable,
  Name_of_DMN_InputClause,
  Name_of_DMN_OutputClause,
  Definitions,
  InputClause,
  OutputClause,
} from "./interfaces";

export class DMN {
  static async parse(xml: string): Promise<Definitions> {
    const { rootElement, warnings } = await new DmnModdle().fromXML(xml);
    if (warnings.length !== 0)
      console.warn(warnings.map((warning: any) => warning.message).join(" * "));
    return rootElement as Definitions;
  }

  public static getSchema(dmnDefinitions: Definitions) {
    const { inputs, outputs } = this.getInputOutput(dmnDefinitions);
    const properties = this.getProperties(inputs || [], outputs || []);

    return {
      type: "object",
      properties,
      required: Object.keys(properties),
    };
  }

  private static getInputOutput(dmnDefinitions: Definitions) {
    const decisions: Decision[] = dmnDefinitions.drgElement.filter((element) =>
      Is_DMN_Decision(element)
    );
    const { input: inputs, output: outputs } = decisions
      .map((decision) => decision.decisionLogic)
      .filter((decisionLogic) => Is_DMN_DecisionTable(decisionLogic))[0];

    return { inputs, outputs };
  }

  private static getProperties(inputs: InputClause[], outputs: OutputClause[]) {
    let properties = {};

    inputs.forEach((input) => {
      const name = Name_of_DMN_InputClause(input) as string;
      const type = input.typeRef || "string";
      // @ts-ignore
      properties[name] = {
        type,
      };
    });

    outputs.forEach((output) => {
      const name = Name_of_DMN_OutputClause(output) as string;
      const type = output.typeRef || "string";

      // @ts-ignore
      properties[name] = {
        type,
      };
    });

    return properties;
  }
}
