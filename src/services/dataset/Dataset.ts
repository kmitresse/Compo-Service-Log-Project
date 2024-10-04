import { pipeline, Transform } from "node:stream";
import { promisify } from "node:util";
import * as fs from "node:fs";
import * as readline from "node:readline";

import CacheService from "../CacheService";
import FileService from "../FileService";

import { ArchiveFactory, ArchiveType } from "../archive";
import { ParserFactory } from "../parser";
import { DatasetType } from "./";
import { Data } from "../data";

/**
 * Represents a dataset that can be loaded and queried
 */
class Dataset {
  readonly id: string;
  readonly url: string;
  readonly sourceFile: string;
  readonly archiveType: ArchiveType;
  readonly datasetType: DatasetType;
  readonly cachePath: string;
  private dataConstructor: { new (rawData: object): Data };

  /**
   * Create a new dataset instance
   * @param dataConstructor - The constructor of the data class
   * @param id - The unique identifier of the dataset
   * @param url - The URL of the dataset
   * @param sourceFile - The file name of the dataset in the archive
   * @param archiveType - The type of the archive
   * @param datasetType - The type of the dataset
   */
  constructor(
    dataConstructor: new (rawData: any) => Data,
    id: string,
    url: string,
    sourceFile: string,
    archiveType: ArchiveType,
    datasetType: DatasetType
  ) {
    this.dataConstructor = dataConstructor;
    this.id = id;
    this.url = url;
    this.sourceFile = sourceFile;
    this.archiveType = archiveType;
    this.datasetType = datasetType;

    this.cachePath = CacheService.getCachePath(this.url, ".json");
  }

  /**
   * Load the dataset by downloading, extracting, parsing and saving it in cache
   * @return Promise<void> - A promise that resolves when the dataset is loaded
   * @throws {Error} - If the dataset cannot be loaded
   */
  public async load(): Promise<void> {
    if (CacheService.isCached(this.url, ".json")) {
      console.log(`Already cached: ${this.url}`);
      return;
    }

    const archive = ArchiveFactory.getArchive(this.archiveType);
    const parser = ParserFactory.getParser(this.datasetType);

    const pipelineAsync = promisify(pipeline);

    const self = this;

    console.log(`Download: ${this.url}`);
    await pipelineAsync(
      await FileService.getFileStream(this.url),
      archive.extract(this.sourceFile),
      parser.parse(),
      new Transform({
        objectMode: true,
        transform(chunk: object, _, callback) {
          const data: Data = new self.dataConstructor(
            JSON.parse(chunk.toString())
          );
          this.push(JSON.stringify(data) + "\n");
          callback(null, JSON.stringify(data) + "\n");
        },
      }),
      FileService.createWriteStream(this.cachePath)
    );
  }

  /**
   * Get a number of data entries from the dataset
   * @param length - The number of data entries to get (default: 10)
   */
  public get(length: number = 10): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      let count: number = 0;
      const results: Data[] = [];

      const stream = fs.createReadStream(this.cachePath, { encoding: "utf8" });
      const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
      });

      rl.on("line", (line) => {
        if (count < length) {
          try {
            results.push(JSON.parse(line) as Data);
            count++;
          } catch (err) {
            console.error("Erreur lors du parsing de la ligne:", err);
          }
        } else {
          rl.close(); // Fermer le flux si on a atteint les n objets
        }
      });

      // Quand le flux est terminé ou a été fermé
      rl.on("close", () => {
        resolve(results); // Renvoie les n objets lus
      });

      // Gérer les erreurs du flux de lecture
      rl.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export default Dataset;
