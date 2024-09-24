import { createHash } from "node:crypto";
import { join } from "node:path";
import * as fs from "fs-extra";

class CacheService {
  public static readonly CACHE_DIR: string = "./cache";

  public static generateCacheKey(url: string): string {
    return createHash("md5").update(url).digest("hex");
  }

  public static getCachePath(url: string): string {
    const cacheKey = this.generateCacheKey(url);
    return join(CacheService.CACHE_DIR, cacheKey);
  }

  public static isCached(url: string): boolean {
    const cacheKey = CacheService.generateCacheKey(url);

    const cachedPath = join(CacheService.CACHE_DIR, cacheKey);
    return fs.pathExistsSync(cachedPath);
  }
}

fs.ensureDirSync(CacheService.CACHE_DIR);

export default CacheService;
