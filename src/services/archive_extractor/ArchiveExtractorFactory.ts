import ArchiveExtractor from "./ArchiveExtractor";
import ZipExtractor from "./ZipExtractor";

enum ArchiveType {
  ZIP = ".zip",
}

class ArchiveExtractorFactory {
  static getExtractor(archiveType: ArchiveType): ArchiveExtractor {
    if (archiveType === ArchiveType.ZIP) return ZipExtractor.instance;
    throw new Error("Unsupported archive type");
  }
}

export default ArchiveExtractorFactory;
export { ArchiveType };
