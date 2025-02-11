type Cache = {
  [key: string]: {
    data: any;
    timestamp: number;
  };
};

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

class ApiCache {
  private cache: Cache = {};

  get(key: string): any | null {
    const item = this.cache[key];
    if (item && Date.now() - item.timestamp < CACHE_EXPIRATION_TIME) {
      return item.data;
    }
    delete this.cache[key];
    return null;
  }

  set(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  clear(): void {
    this.cache = {};
  }
}

export const apiCache = new ApiCache();
