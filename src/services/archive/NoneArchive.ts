import { Archive } from "./";
import { Duplex, Transform } from "node:stream";

class NoneArchive implements Archive {
  public static instance: Archive = new NoneArchive();

  public extract(source: string): Duplex {
    return new Transform({
      transform(chunk, _, callback) {
        callback(null, chunk);
      },
    });
  }
}

export default NoneArchive;
