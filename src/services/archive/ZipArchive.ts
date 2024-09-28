import { Archive } from "./";
import { Duplex } from "node:stream";
import { ParseOne } from "unzipper";

class ZipArchive implements Archive {
  public static instance: Archive = new ZipArchive();

  public extract(source: string): Duplex {
    return ParseOne(new RegExp(source), {
      forceStream: true,
    });
  }
}

export default ZipArchive;
