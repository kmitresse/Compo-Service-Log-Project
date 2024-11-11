import { pipeline, Transform, Writable } from "node:stream";
import { promisify } from "node:util";

import FileService from "../FileService";

import { ParserFactory, ParserType } from "../parser";
import ExtractorFactory, {
  ExtractorType,
} from "../archive_extractor/ExtractorFactory";
import Extractor from "../archive_extractor/Extractor";
import Parser from "../parser/Parser";
import { getDatabaseConnexion } from "../DataLake";
import { validate } from "jsonschema";

/**
 * Represents a dataset that can be loaded and queried
 */
export default class Dataset {
  readonly id: string;
  readonly uri: string;
  readonly endpoint: string;

  private extractor: Extractor = ExtractorFactory.getExtractor(
    ExtractorType.NONE
  );
  private parser: Parser = ParserFactory.getParser(ParserType.CSV);
  private extractorOptions: any;
  private parserOptions: any;
  private dataTransformer?: Transform;

  /**
   * Create a new dataset instance
   * @param id - The unique identifier of the dataset
   * @param source - The URL of the dataset
   */
  constructor({
    id,
    uri,
    endpoint,
  }: {
    id: string;
    uri: string;
    endpoint: string;
  }) {
    this.id = id;
    this.uri = uri;
    this.endpoint = endpoint;
  }

  setExtractor(type: ExtractorType, options: any): this {
    this.extractor = ExtractorFactory.getExtractor(type);
    this.extractorOptions = options;
    return this;
  }

  setParser(type: ParserType, options: any): this {
    this.parser = ParserFactory.getParser(type);
    this.parserOptions = options;
    return this;
  }

  setDataTransformer(dataTransformer: Transform): this {
    this.dataTransformer = dataTransformer;
    return this;
  }

  /**
   * Load the dataset by downloading, extracting, parsing and saving it in cache
   * @return Promise<void> - A promise that resolves when the dataset is loaded
   * @throws {Error} - If the dataset cannot be loaded
   */
  public async load(): Promise<void> {
    if (!this.dataTransformer) {
      throw new Error("Data transformer is not set");
    }

    const db = await getDatabaseConnexion();
    const collection = db.collection(this.id);
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Dataset ${this.id} already loaded`);
      return;
    }

    const pipelineAsync = promisify(pipeline);

    console.log(`Download: ${this.uri}`);

    const datasetId = this.id;

    const batch = 1000;
    const buffer: any[] = [];

    await pipelineAsync(
      await FileService.getFileStream(this.uri),
      this.extractor.extract(this.extractorOptions),
      this.parser.parse(this.parserOptions),
      this.dataTransformer,
      new Writable({
        objectMode: true,
        async write(chunk, _, callback) {
          buffer.push(chunk);
          if (buffer.length < batch) return callback();

          const db = await getDatabaseConnexion();
          db.collection(datasetId)
            .insertMany(buffer.splice(0, batch))
            .then(() => callback())
            .catch((error) => callback(error));
        },
      })
    )
      .then(async () => {
        if (buffer.length > 0) {
          await db.collection(datasetId).insertMany(buffer);
        }
      })
      .then(() => console.log(`Dataset ${this.id} loaded`))
      .catch((error) =>
        console.error(`Error loading dataset ${this.id}: ${error.message}`)
      );
  }

  async get(length: number = 10, schema: any) {
    const db = await getDatabaseConnexion();

    // Convert JSON schema to projection
    const projection = { _id: 0 };
    if (schema?.properties) {
      for (const field in schema.properties) {
        // @ts-ignore
        projection[field] = 1;
      }
    }

    const datas = await db
      .collection(this.id)
      .aggregate([{ $project: projection }, { $sample: { size: length } }])
      .limit(length)
      .toArray();

    return datas
      .map((data) => {
        const res = validate(data, schema);
        if (!res.valid) return null;
        return data;
      })
      .filter((data) => data !== null);
  }
}
