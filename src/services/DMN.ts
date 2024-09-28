import { Dataset } from "./dataset";
import { Data } from "./data";

class DMN {
  readonly xmlPath: string;
  constructor(xmlPath: string, dataset: Dataset<Data>) {
    this.xmlPath = xmlPath;
  }
  public parseXml() {}
}
