import { Archive, ZipArchive, ArchiveType, GzipArchive, NoneArchive } from "./";

class ArchiveFactory {
  static getArchive(archiveType: ArchiveType): Archive {
    if (archiveType === ArchiveType.ZIP) return ZipArchive.instance;
    if (archiveType === ArchiveType.GZIP) return GzipArchive.instance;
    if (archiveType === ArchiveType.NONE) return NoneArchive.instance;

    throw new Error("Unsupported archive type");
  }
}

export default ArchiveFactory;
