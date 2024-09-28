import { Duplex } from "node:stream";

interface Archive {
  extract(source: string): Duplex;
}

export default Archive;
