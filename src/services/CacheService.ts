import { createHash } from "node:crypto";
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";


class CacheService {
  public static readonly CACHE_DIR: string = "./cache";

  public static generateCacheKey(name: string): string {
    return createHash("md5").update(name).digest("hex");
  }

  public static getCachePath(name: string, extension: string = ""): string {
    const cacheKey = this.generateCacheKey(name);
    return join(CacheService.CACHE_DIR, `${cacheKey}${extension}`);
  }

  public static isCached(name: string, extension: string = ""): boolean {
    const cacheKey = CacheService.generateCacheKey(name);

    const cachedPath = join(CacheService.CACHE_DIR, `${cacheKey}${extension}`);
    return existsSync(cachedPath);
  }
}

if (!existsSync(CacheService.CACHE_DIR)) {
  mkdirSync(CacheService.CACHE_DIR);
}

export default CacheService;
