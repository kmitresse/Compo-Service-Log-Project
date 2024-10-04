import { Archive, ZipArchive, ArchiveType, GzipArchive } from "./";

class ArchiveFactory {
  static getArchive(archiveType: ArchiveType): Archive {
    if (archiveType === ArchiveType.ZIP) return ZipArchive.instance;
    // if ([ArchiveType.GZIP, ArchiveType.GZ].includes(archiveType))
    // return GzipArchive.instance;

    throw new Error("Unsupported archive type");
  }
}

export default ArchiveFactory;