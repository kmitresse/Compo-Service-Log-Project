import { Parser } from "./";
import { Duplex } from "node:stream";
import csv from "csvtojson";

class CsvParser implements Parser {
  public static instance: CsvParser = new CsvParser();

  public parse(): Duplex {
    return csv();
  }
}

export default CsvParser;
