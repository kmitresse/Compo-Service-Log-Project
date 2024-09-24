interface ArchiveExtractor {
  extract(stream: ReadableStream, destinationPath: string): Promise<void>;
}

export default ArchiveExtractor;
