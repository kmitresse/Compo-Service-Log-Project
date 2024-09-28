import { pipeline } from "node:stream";
import { promisify } from "node:util";
import CacheService from "../CacheService";
import FileService from "../FileService";
import { ArchiveFactory, ArchiveType } from "../archive";
import { ParserFactory } from "../parser";
import { DatasetType } from "./";

/**
 * Represents a dataset that can be loaded and queried
 */
class Dataset<Data> {

  readonly url: string;
  readonly sourceFile: string;
  readonly archiveType: ArchiveType;
  readonly datasetType: DatasetType;
  readonly cachePath: string;

  /**
   * Create a new dataset instance
   * @param url - The URL of the dataset
   * @param sourceFile - The file name of the dataset in the archive
   * @param archiveType - The type of the archive
   * @param datasetType - The type of the dataset
   */
  constructor(
    url: string,
    sourceFile: string,
    archiveType: ArchiveType,
    datasetType: DatasetType,
  ) {
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

    console.log(`Download: ${this.url}`);
    await pipelineAsync(
      await FileService.getFileStream(this.url),
      archive.extract(this.sourceFile),
      parser.parse(),
      FileService.createWriteStream(this.cachePath),
    );
  }

  /**
   * Get a number of data entries from the dataset
   * @param count - The number of data entries to get (default: 10)
   */
  public get(count: number = 10): Data[] {
    // TODO: Implement the get method
    return [];
  }
}

export default Dataset;
