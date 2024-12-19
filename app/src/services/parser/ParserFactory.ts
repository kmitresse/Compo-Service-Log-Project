import { Parser, CsvParser } from "./index";
import { ParserType } from "./index";

class ParserFactory {
  /**
   * Get the parser corresponding to the dataset type
   * @param fileType The type of the dataset
   * @returns The parser corresponding to the dataset type
   */
  static getParser(fileType: ParserType): Parser {
    if (fileType === ParserType.CSV) return CsvParser.instance;
    throw new Error("Unsupported file type");
  }
}

export default ParserFactory;
