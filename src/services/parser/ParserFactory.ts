import { Parser, CsvParser } from "./";
import { DatasetType } from "../dataset";

class ParserFactory {
  /**
   * Get the parser corresponding to the dataset type
   * @param fileType The type of the dataset
   * @returns The parser corresponding to the dataset type
   */
  static getParser(fileType: DatasetType): Parser {
    if (fileType === DatasetType.CSV) return CsvParser.instance;
    throw new Error("Unsupported file type");
  }
}

export default ParserFactory;
