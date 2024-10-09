import { pipeline, Transform } from "node:stream";
import { promisify } from "node:util";
import * as fs from "node:fs";
import * as readline from "node:readline";

import CacheService from "../CacheService";
import FileService from "../FileService";

import { ArchiveFactory, ArchiveType } from "../archive";
import { ParserFactory, ParserType } from "../parser";
import { Data, DataConstructor } from "../data";

type DatasetParams = {
  id: string;
  dataType: DataConstructor<Data>;
  source: string;
  file: string;
  archiveType: ArchiveType;
  parserType: ParserType;
  options?: DatasetOptions;
};

type DatasetOptions = {
  parser?: any;
};

/**
 * Represents a dataset that can be loaded and queried
 */
class Dataset {
  readonly id: string;
  readonly source: string;
  readonly file: string;
  readonly archiveType: ArchiveType;
  readonly parserType: ParserType;
  readonly cachePath: string;
  private dataType: DataConstructor<Data>;
  private options?: DatasetOptions;

  /**
   * Create a new dataset instance
   * @param id - The unique identifier of the dataset
   * @param source - The URL of the dataset
   * @param file - The name of the file in the archive
   * @param dataType - The constructor of the data class
   * @param archiveType - The type of the archive
   * @param datasetType - The type of the dataset
   * @param options - Additional options for the dataset
   */
  constructor({
    id,
    source,
    file,
    dataType,
    archiveType,
    parserType,
    options,
  }: DatasetParams) {
    this.id = id;
    this.dataType = dataType;
    this.source = source;
    this.file = file;
    this.archiveType = archiveType;
    this.parserType = parserType;
    this.options = options;

    this.cachePath = CacheService.getCachePath(this.source, ".json");
  }

  /**
   * Load the dataset by downloading, extracting, parsing and saving it in cache
   * @return Promise<void> - A promise that resolves when the dataset is loaded
   * @throws {Error} - If the dataset cannot be loaded
   */
  public async load(): Promise<void> {
    if (CacheService.isCached(this.source, ".json")) {
      console.log(`Already cached: ${this.source}`);
      return;
    }

    const archive = ArchiveFactory.getArchive(this.archiveType);
    const parser = ParserFactory.getParser(this.parserType);

    const pipelineAsync = promisify(pipeline);

    console.log(`Download: ${this.source}`);
    await pipelineAsync(
      await FileService.getFileStream(this.source),
      archive.extract(this.file),
      parser.parse(this.options?.parser),
      Dataset.transformToData(this.dataType),
      FileService.createWriteStream(this.cachePath)
    )
      .then(() => {
        console.log(`Loaded: ${this.source}`);
      })
      .catch((err) => {
        console.error(`Failed to load dataset: ${this.source}`);
        FileService.deleteFile(this.cachePath);
        throw err;
      });
  }

  private static transformToData(dataType: DataConstructor<Data>): Transform {
    return new Transform({
      objectMode: true,
      transform(chunk: object, _, callback) {
        const data: Data = new dataType(chunk);
        this.push(JSON.stringify(data) + "\n");

        callback(null, JSON.stringify(data) + "\n");
      },
    });
  }

  /**
   * Get a number of data entries from the dataset
   * @param length - The number of data entries to get (default: 10)
   * @param schema - Schema of the expected data returned
   */
  public get(
    length: number = 10,
    schema: { input: string[] | undefined; output: string[] | undefined }
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let count: number = 0;
      const results: any[] = [];

      const stream = fs.createReadStream(this.cachePath, { encoding: "utf8" });
      const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
      });

      rl.on("line", (line) => {
        if (count < length) {
          const data: Data = JSON.parse(line) as Data;

          // Create an object with the input and output values according to the schema
          const obj: any = {};
          schema.input?.forEach((input: string, index: number) => {
            obj[input] = data.input[index];
          });
          schema.output?.forEach((output, index) => {
            obj[output] = data.output[index];
          });

          // Add the object to the results
          results.push(obj);
          count++;
        } else {
          rl.close(); // Fermer le flux si on a atteint les n objets
        }
      });

      // Quand le flux est terminé ou a été fermé.
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
