import { extname } from "node:path";
import { ArchiveExtractorFactory, ArchiveType } from "./archive_extractor";

class FileService {
  public static async downloadAndExtract(
    url: string,
    output: string
  ): Promise<void> {
    const fileType: string = FileService.getFileExtension(url);

    const archiveExtractor = ArchiveExtractorFactory.getExtractor(
      fileType as ArchiveType
    );

    console.log(`Downloading ${url}`);
    const stream = await FileService.getFileStream(url);
    return archiveExtractor.extract(stream, output);
  }

  private static async getFileStream(url: string): Promise<ReadableStream> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("Response body is not a readable stream");
    }

    return response.body;
  }

  private static getFileExtension(url: string): string {
    return extname(url).toLowerCase();
  }
}

export default FileService;
