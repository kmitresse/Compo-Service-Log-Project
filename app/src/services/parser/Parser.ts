import { Duplex } from "node:stream";

interface Parser {
  /**
   * Parse the content of the stream into JSON objects
   */
  parse(options: any): Duplex;
}

export default Parser;
