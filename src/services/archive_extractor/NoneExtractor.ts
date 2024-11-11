import Extractor from "./Extractor";
import { Duplex, Transform } from "node:stream";
import { createGunzip } from "node:zlib";

export default class NoneExtractor implements Extractor {
  public static instance = new NoneExtractor();

  extract(_: any): Duplex {
    return new Transform({
      transform(chunk, _, callback) {
        callback(null, chunk);
      },
    });
  }
}
