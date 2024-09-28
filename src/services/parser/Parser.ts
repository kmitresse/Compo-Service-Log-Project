import { Duplex } from "node:stream";

interface Parser {
  /**
   * Parse the content of the stream into JSON objects
   */
  parse(): Duplex;
}

export default Parser;
