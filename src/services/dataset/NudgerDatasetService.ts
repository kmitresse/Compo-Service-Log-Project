import FileService from "../FileService";
import CacheService from "../CacheService";
import { extname, join } from "node:path";
import { DatasetParserFactory, DatasetType } from "../dataset_parser";

class NudgerDatasetService {
  private static URL: string =
    "https://files.opendatarchives.fr/data.cquest.org/open4goods/gtin-open-data.zip";
  private static SOURCE_FILE: string = "open4goods-full-gtin-dataset.csv";
  private static CACHE_PATH: string = CacheService.getCachePath(
    NudgerDatasetService.URL
  );

  public static loadDataset(): Promise<void> {
    if (CacheService.isCached(NudgerDatasetService.URL)) {
      return Promise.resolve();
    }

    return FileService.downloadAndExtract(
      NudgerDatasetService.URL,
      NudgerDatasetService.CACHE_PATH
    );
  }

  public static parse() {
    const extension = extname(NudgerDatasetService.SOURCE_FILE).toLowerCase();

    const parser = DatasetParserFactory.getParser(extension as DatasetType);
    return parser.parse(NudgerDatasetService.getSourcePath());
  }

  public static getSourcePath(): string {
    return join(
      NudgerDatasetService.CACHE_PATH,
      NudgerDatasetService.SOURCE_FILE
    );
  }
}

export default NudgerDatasetService;
