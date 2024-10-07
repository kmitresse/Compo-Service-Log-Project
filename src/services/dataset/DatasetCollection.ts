import { NudgerData } from "../data";
import { ArchiveType } from "../archive";
import { Dataset, DatasetType } from "./";

class DatasetCollection {
  public static datasets: Dataset[] = [
    new Dataset({
      id: "nudger",
      source:
        "https://files.opendatarchives.fr/data.cquest.org/open4goods/gtin-open-data.zip",
      file: "open4goods-full-gtin-dataset.csv",
      dataType: NudgerData,
      archiveType: ArchiveType.ZIP,
      datasetType: DatasetType.CSV,
    }),
  ];

  public static loadAll(): Promise<void[]> {
    return Promise.all(this.datasets.map((dataset) => dataset.load()));
  }
}

export default DatasetCollection;
