import { Duplex } from "node:stream";
import Extractor from "./Extractor";
import { ParseOne } from "unzipper";

export default class ZipExtractor implements Extractor {
  public static instance: ZipExtractor = new ZipExtractor();

  public extract(options: { file: string }): Duplex {
    return ParseOne(new RegExp(options.file), {
      forceStream: true,
    });
  }
}
