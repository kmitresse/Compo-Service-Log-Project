import { Parser } from "./index";
import { Duplex } from "node:stream";
import * as csv from "fast-csv";

class CsvParser implements Parser {
  public static instance: CsvParser = new CsvParser();

  public parse(options: any): Duplex {
    return csv.parse({
      headers: true,
      objectMode: true,
      trim: true,
      ...options,
    });
  }
}

export default CsvParser;
