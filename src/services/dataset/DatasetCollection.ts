import { Data, NudgerData, OpenFoodFactsData, WorldCitiesData } from "../data";
import { ArchiveType } from "../archive";
import { Dataset } from "./";
import { ParserType } from "../parser";

class DatasetCollection {
  public static datasets: Dataset<Data>[] = [
    // new Dataset({
    //   id: "nudger",
    //   source:
    //     "https://files.opendatarchives.fr/data.cquest.org/open4goods/gtin-open-data.zip",
    //   file: "open4goods-full-gtin-dataset.csv",
    //   dataConstructor: NudgerData.fromRaw,
    //   dataType: NudgerData,
    //   archiveType: ArchiveType.ZIP,
    //   parserType: ParserType.CSV,
    //   options: {
    //     parser: {
    //       delimiter: ",",
    //     },
    //   },
    // }),
    // new Dataset({
    //   id: "openfoodfacts",
    //   source:
    //     "https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv.gz",
    //   file: "en.openfoodfacts.org.products.csv",
    //   dataConstructor: OpenFoodFactsData.fromRaw,
    //   dataType: OpenFoodFactsData,
    //   archiveType: ArchiveType.GZIP,
    //   parserType: ParserType.CSV,
    //   options: {
    //     parser: {
    //       delimiter: "\t",
    //       quote: null,
    //     },
    //   },
    // }),
    new Dataset<WorldCitiesData>({
      id: "world-cities",
      source:
        "https://raw.githubusercontent.com/datasets/world-cities/refs/heads/main/data/world-cities.csv",
      file: "world-cities.csv",
      dataConstructor: WorldCitiesData.fromRaw,
      dataType: WorldCitiesData,
      archiveType: ArchiveType.NONE,
      parserType: ParserType.CSV,
    }),
  ];

  public static loadAll(): Promise<void[]> {
    return Promise.all(this.datasets.map((dataset) => dataset.load()));
  }
}

export default DatasetCollection;
