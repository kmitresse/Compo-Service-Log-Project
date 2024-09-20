import axios from "axios";
import * as unzipper from "unzipper";
import * as fs from "fs-extra";
import * as zlib from "zlib";
import { extname, join, basename } from "path";
import crypto from "crypto"; // Utilisé pour générer des identifiants uniques basés sur l'URL

type SupportedFormats = "zip" | "gz" | "gzip";

class FileService {
  private cacheDir: string;

  constructor() {
    this.cacheDir = "./cache";
    fs.ensureDirSync(this.cacheDir);
  }

  /**
   * Télécharger et extraire le fichier à partir de l'URL
   * @param url URL du fichier à télécharger
   */
  async downloadAndExtract(url: string): Promise<void> {
    try {
      const fileType = this.getFileExtension(url);
      if (!fileType) throw new Error("Unsupported file format");
      if (this.isInCache(url)) return;

      const response = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });
      console.log(`Downloading : ${url}`);

      // Décompresser et sauvegarder dans le cache
      const cacheKey = this.generateCacheKey(url);
      const cachedPath = join(this.cacheDir, cacheKey);

      fs.ensureDirSync(cachedPath);

      if (fileType === "zip") await this.extractZip(response.data, cachedPath);
      if (fileType === "gz" || fileType === "gzip")
        await this.extractGzip(
          response.data,
          join(cachedPath, basename(url).replace(/\.(gz|gzip)$/, ""))
        );

      console.log(`Downloaded and extracted : ${basename(url)}`);
    } catch (error) {
      console.error(
        "An error occurred while downloading and extracting the file",
        error
      );
    }
  }

  /**
   * Vérifier si le fichier est déjà en cache
   * @param url URL du fichier
   * @private
   */
  private isInCache(url: string): boolean {
    const cacheKey = this.generateCacheKey(url);
    const cachedPath = join(this.cacheDir, cacheKey);
    return fs.pathExistsSync(cachedPath);
  }

  /**
   * Extraire les fichiers ZIP et stocker dans le cache
   * @param stream
   * @param cachePath
   * @private
   */
  private async extractZip(
    stream: NodeJS.ReadableStream,
    cachePath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      stream
        .pipe(unzipper.Extract({ path: cachePath }))
        .on("close", resolve)
        .on("error", reject);
    });
  }

  /**
   * Extraire les fichiers GZ et GZIP et stocker dans le cache
   * @param stream Flux du fichier téléchargé
   * @param cachePath Chemin où stocker le fichier décompressé
   * @private
   */
  private async extractGzip(
    stream: NodeJS.ReadableStream,
    cachePath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Ajouter une extension correcte (par exemple, si le fichier original est 'file.gz', le résultat sera 'file')
      const decompressedFilePath = cachePath.replace(/\.gz$/, "");

      const writeStream = fs.createWriteStream(decompressedFilePath);

      // Pipeliner le flux du téléchargement et la décompression
      stream
        .pipe(zlib.createGunzip()) // Décompresser le flux
        .pipe(writeStream) // Écrire le fichier décompressé
        .on("finish", resolve)
        .on("error", reject);
    });
  }

  /**
   * Obtenir l'extension du fichier à partir de l'URL
   * @param url URL du fichier
   */
  private getFileExtension(url: string): SupportedFormats | null {
    const extension = extname(url).toLowerCase();
    if (extension === ".zip") return "zip";
    if (extension === ".gz" || extension === ".gzip") return "gz";
    return null;
  }

  /**
   * Générer un identifiant unique pour le fichier basé sur l'URL
   * @param url URL du fichier
   */
  private generateCacheKey(url: string): string {
    return crypto.createHash("md5").update(url).digest("hex");
  }
}

export default new FileService();
