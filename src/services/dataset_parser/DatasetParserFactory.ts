import DatasetParser from "./DatasetParser";
import CsvParser from "./CsvParser";

enum DatasetType {
  CSV = ".csv",
}

class DatasetParserFactory {
  static getParser(fileType: DatasetType): DatasetParser {
    if (fileType === DatasetType.CSV) return CsvParser.instance;
    throw new Error("Unsupported file type");
  }
}

export default DatasetParserFactory;
export { DatasetType };
