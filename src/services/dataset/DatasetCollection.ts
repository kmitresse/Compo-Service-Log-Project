import { Data, NudgerData } from "../data";
import { ArchiveType } from "../archive";
import { Dataset, DatasetType } from "./";

class DatasetCollection {
  public static datasets: Dataset<Data>[] = [
    new Dataset<NudgerData>(
      NudgerData,
      "nudger",
      "https://files.opendatarchives.fr/data.cquest.org/open4goods/gtin-open-data.zip",
      "open4goods-full-gtin-dataset.csv",
      ArchiveType.ZIP,
      DatasetType.CSV
    ),
  ];

  public static loadAll(): Promise<void[]> {
    return Promise.all(this.datasets.map((dataset) => dataset.load()));
  }
}

export default DatasetCollection;
