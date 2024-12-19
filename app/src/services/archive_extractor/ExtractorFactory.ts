import Extractor from "./Extractor";
import ZipExtractor from "./ZipExtractor";
import GzipExtractor from "./GzipExtractor";
import NoneExtractor from "./NoneExtractor";

export enum ExtractorType {
  ZIP,
  GZIP,
  NONE,
}

export default class ExtractorFactory {
  static getExtractor(extractorType: ExtractorType): Extractor {
    switch (extractorType) {
      case ExtractorType.ZIP:
        return ZipExtractor.instance;
      case ExtractorType.GZIP:
        return GzipExtractor.instance;
      default:
        return NoneExtractor.instance;
    }
  }
}
