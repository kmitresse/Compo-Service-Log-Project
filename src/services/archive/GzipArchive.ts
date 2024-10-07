import { createGunzip } from "node:zlib";
import { Duplex } from "node:stream";
import { Archive } from "./";

class GzipArchive implements Archive {
  public static instance: Archive = new GzipArchive();

  public extract(source: string): Duplex {
    return createGunzip();
  }
}

export default GzipArchive;
