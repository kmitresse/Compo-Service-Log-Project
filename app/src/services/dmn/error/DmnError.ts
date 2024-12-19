import { ModdleElement } from "../interfaces/ModdleElement";
import { Name_of_ModdleElement } from "../interfaces/enums";

export class DmnError extends Error {
  static readonly Inconsistent_DMN_diagram =
    "<strong>Inconsistent DMN diagram</strong>";
  static readonly Invalid_data_format = "<strong>Invalid data format</strong>";
  static readonly Invalid_drop_mode = "<strong>Invalid drop mode</strong>";
  static readonly Invalid_JSON = "<strong>Invalid JSON</strong>";
  static readonly No_business_logic = "<strong>No business logic</strong>";
  static readonly No_possible_randomization =
    "<strong>No possible randomization</strong>";
  static readonly No_possible_visualization =
    "<strong>No possible visualization</strong>";
  static readonly Not_trained = "<strong>Not trained</strong>";
  static readonly Separator = " &rarrc; ";
  static readonly TensorFlow_js = "<strong>TensorFlow.js</strong>";
  static readonly Undefined_DMN_type = "<strong>Undefined DMN type</strong>";

  constructor(
    readonly me: ModdleElement,
    ...messages: Array<string>
  ) {
    super(
      Name_of_ModdleElement(me) +
        DmnError.Separator +
        messages.join(DmnError.Separator),
    );
  }
}
