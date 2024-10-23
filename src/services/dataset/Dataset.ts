import { pipeline, Transform, Writable } from "node:stream";
import { promisify } from "node:util";
import { Validator } from "jsonschema";

import FileService from "../FileService";

import { ArchiveFactory, ArchiveType } from "../archive";
import { ParserFactory, ParserType } from "../parser";
import { Data, InvalidData} from "../data";
import { AppDataSource } from "../../AppDataSource";
import { EntityManager, EntityTarget, Repository } from "typeorm";

type DatasetParams = {
  id: string;
  dataConstructor: (params: any) => Data;
  dataType: Data;
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
class Dataset<D extends Data> {
  readonly id: string;
  readonly source: string;
  readonly file: string;
  readonly archiveType: ArchiveType;
  readonly parserType: ParserType;
  readonly dataConstructor: (params: any) => Data;
  readonly dataType: Data;
  private options?: DatasetOptions;

  /**
   * Create a new dataset instance
   * @param id - The unique identifier of the dataset
   * @param source - The URL of the dataset
   * @param file - The name of the file in the archive
   * @param dataType - The constructor of the data class
   * @param archiveType - The type of the archive
   * @param dataConstructor - The type of the dataset
   * @param parserType
   * @param options - Additional options for the dataset
   */
  constructor({
    id,
    source,
    file,
    dataConstructor,
    dataType,
    archiveType,
    parserType,
    options,
  }: DatasetParams) {
    this.id = id;
    this.dataConstructor = dataConstructor;
    this.source = source;
    this.file = file;
    this.dataType = dataType;
    this.archiveType = archiveType;
    this.parserType = parserType;
    this.options = options;
  }

  /**
   * Load the dataset by downloading, extracting, parsing and saving it in cache
   * @return Promise<void> - A promise that resolves when the dataset is loaded
   * @throws {Error} - If the dataset cannot be loaded
   */
  public async load(): Promise<void> {
    // const repository: Repository<T> = AppDataSource.getRepository<T>(Data);

    // if ((await repository.count()) > 0) {
    //   console.log(`Already cached: ${this.source}`);
    //   return;
    // }

    const archive = ArchiveFactory.getArchive(this.archiveType);
    const parser = ParserFactory.getParser(this.parserType);

    const pipelineAsync = promisify(pipeline);

    console.log(`Download: ${this.source}`);

    // Start transaction
    await AppDataSource.manager.transaction(async (manager) => {
      await pipelineAsync(
        await FileService.getFileStream(this.source),
        archive.extract(this.file),
        parser.parse(this.options?.parser),
        Dataset.transformToData(this.dataConstructor, manager),
        new Writable({
          objectMode: true,
          write(chunk, _, callback) {
            callback();
          },
        })
      )
        .then(() => {
          console.log(`Loaded: ${this.source}`);
        })
        .catch((err) => {
          console.error(`Failed to load dataset: ${this.source}`);
          throw err;
        });
    });
  }

  private static transformToData(
    dataType: (params: any) => Data,
    manager: EntityManager
  ): Transform {
    return new Transform({
      objectMode: true,
      async transform(chunk: object, _, callback) {
        try {
          const data: Data = dataType(chunk);
          await manager.save(data);
          callback(null, JSON.stringify(data) + "\n");
        } catch (err: any) {
          if (err instanceof InvalidData) {
            callback(null, "");
          } else callback(err);
        }
      },
    });
  }

  /**
   * Get a number of data entries from the dataset
   * @param length - The number of data entries to get (default: 10)
   * @param schema - Schema of the expected data returned
   */
  public async get(length: number = 10, schema: {}): Promise<any[]> {
    const dataRepository = AppDataSource.manager.getRepository<T>(
      this.dataType as EntityTarget<T>
    );

    const datas = await dataRepository
      .createQueryBuilder("data")
      .orderBy("RAND()") // Fonction RAND() pour randomiser l'ordre
      .limit(length) // Limiter le nombre de résultats
      .getMany();

    return new Promise((resolve, reject) => {
      let count: number = 0;
      const results: Data[] = [];
      const validator = new Validator();

      datas.forEach((data) => {
        let randomizedData = D.fromRaw(data);
          // this.dataConstructor(data);

        if (validator.validate(randomizedData, schema)) {
          results.push(randomizedData);
          count++;
        }
      });
      return resolve(results);
    });
    //   //
    //   //   const stream = fs.createReadStream(this.cachePath, { encoding: "utf8" });
    //   //   const rl = readline.createInterface({
    //   //     input: stream,
    //   //     crlfDelay: Infinity,
    //   //   });
    //   //
    //   //
    //   //   rl.on("line", (line) => {
    //   //     if (count < length) {
    //   //       const data: Data = JSON.parse(line) as Data;
    //   //       if (validator.validate(data, schema)) {
    //   //         results.push(data);
    //   //         count++;
    //   //       }
    //   //
    //   //       // // Pour chaque objet, récupérer l'objet et vérifier que le schéma est valide
    //   //
    //   //       // schema.input?.forEach((input: string, index: number) => {
    //   //       //   obj[input] = data.input[index];
    //   //       // });
    //   //       // schema.output?.forEach((output, index) => {
    //   //       //   obj[output] = data.output[index];
    //   //       // });
    //   //
    //   //       // // Add the object to the results
    //   //       // count++;
    //   //     } else {
    //   //       rl.close(); // Fermer le flux si on a atteint les n objets
    //   //     }
    //   //   });
    //   //
    //   //   // Quand le flux est terminé ou a été fermé.
    //   //   rl.on("close", () => {
    //   //     resolve(results); // Renvoie les n objets lus
    //   //   });
    //   //
    //   //   // Gérer les erreurs du flux de lecture
    //   //   rl.on("error", (err) => {
    //   //     reject(err);
    //   //   });
    //   // });
  }
}

export default Dataset;
