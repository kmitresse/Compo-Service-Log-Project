import { Readable } from "node:stream";
import axios from "axios";
import * as fs from "node:fs";
import { WriteStream } from "node:fs";

class FileService {
  /**
   * Get the compressed file stream from a given url
   * @param url - The url of the file
   * @return Promise<Readable> - The compressed file stream
   */
  public static async getFileStream(url: string): Promise<Readable> {
    return axios({ method: "GET", url, responseType: "stream" }).then(
      (response) => response.data
    );
  }

  /**
   * Create a write stream to a file
   * @param path - The path of the file
   */
  public static createWriteStream(path: string): WriteStream {
    return fs.createWriteStream(path);
  }

  /**
   * Delete a file from the file system
   * @param cachePath - The path of the file to delete
   */
  public static deleteFile(cachePath: string): void {
    fs.unlinkSync(cachePath);
  }
}

export default FileService;
