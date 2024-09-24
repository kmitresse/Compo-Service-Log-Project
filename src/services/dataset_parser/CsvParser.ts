import DatasetParser from "./DatasetParser";
import * as fs from "node:fs";
import Papa from "papaparse";

class CsvParser implements DatasetParser {
  public static instance: CsvParser = new CsvParser();

  async parse(filePath: string) {
    const stream = fs.createReadStream(filePath);
    Papa.parse(stream, {
      worker: true,
      step: (res) => console.log("Row:", res.data),
    });
  }
}

export default CsvParser;
