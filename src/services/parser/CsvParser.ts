import { Parser } from "./";
import { Duplex } from "node:stream";
// import csv from "csvtojson";
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
    // return csv({
    //   delimiter: "auto",
    // });
  }
}

export default CsvParser;
