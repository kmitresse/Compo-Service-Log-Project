import { Dataset } from "./index";
import { ParserType } from "../parser";
import WorldCitiesDataTransformer from "../data_transformer/WorldCitiesDataTransformer";
import { ExtractorType } from "../archive_extractor/ExtractorFactory";
import NudgerDataTransformer from "../data_transformer/NudgerDataTransformer";
import OpenfoodfactsDataTransformer from "../data_transformer/OpenfoodfactsDataTransformer";

class DatasetCollection {
  public static datasets: Dataset[] = [
    new Dataset({
      id: "nudger",
      uri: "https://files.opendatarchives.fr/data.cquest.org/open4goods/gtin-open-data.zip",
      endpoint: `http://localhost:${process.env.PORT || 3000}/randomize/nudger`,
    })
      .setExtractor(ExtractorType.ZIP, {
        file: "open4goods-full-gtin-dataset.csv",
      })
      .setParser(ParserType.CSV, {})
      .setDataTransformer(new NudgerDataTransformer()),
    new Dataset({
      id: "openfoodfacts",
      uri: "https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv.gz",
      endpoint: `http://localhost:${process.env.PORT || 3000}/randomize/openfoodfacts`,
    })
      .setExtractor(ExtractorType.GZIP, {
        file: "en.openfoodfacts.org.products.csv",
      })
      .setParser(ParserType.CSV, { delimiter: "\t", quote: null })
      .setDataTransformer(new OpenfoodfactsDataTransformer()),
    new Dataset({
      id: "world-cities",
      uri: "https://raw.githubusercontent.com/datasets/world-cities/refs/heads/main/data/world-cities.csv",
      endpoint: `http://localhost:${process.env.PORT || 3000}/randomize/world-cities`,
    })
      .setExtractor(ExtractorType.NONE, {})
      .setParser(ParserType.CSV, {})
      .setDataTransformer(new WorldCitiesDataTransformer()),
  ];

  public static loadAll(): Promise<void[]> {
    return Promise.all(this.datasets.map((dataset) => dataset.load()));
  }
}

export default DatasetCollection;
