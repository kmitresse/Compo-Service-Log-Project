import { Duplex } from "node:stream";

export default interface Extractor {
  extract(options: { file: string }): Duplex;
}
