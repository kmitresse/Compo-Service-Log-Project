import ArchiveExtractor from "./ArchiveExtractor";
import unzipper from "unzipper";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

class ZipExtractor implements ArchiveExtractor {
  public static instance: ArchiveExtractor = new ZipExtractor();

  async extract(
    stream: ReadableStream,
    destinationPath: string
  ): Promise<void> {
    const streamPipeline = promisify(pipeline);
    await streamPipeline(stream, unzipper.Extract({ path: destinationPath }));
  }
}

export default ZipExtractor;
