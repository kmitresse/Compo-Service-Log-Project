import Extractor from "./Extractor";
import { Duplex } from "node:stream";
import { createGunzip } from "node:zlib";

export default class GzipExtractor implements Extractor {
  public static instance = new GzipExtractor();

  extract(_: any): Duplex {
    return createGunzip();
  }
}
