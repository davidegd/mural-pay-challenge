import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_KEY, API_URL } from "@/constants/api";

const cache = new Map<string, any>();

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

api.interceptors.request.use((config) => {
  const key = `${config.method}:${config.url}`;
  if (config.method === "get" && cache.has(key)) {
    config.adapter = () => Promise.resolve(cache.get(key));
  }
  return config;
});

api.interceptors.response.use((response) => {
  const key = `${response.config.method}:${response.config.url}`;
  if (response.config.method === "get") {
    cache.set(key, response);
  }
  return response;
});

export async function fetchApi<T>(
  url: string,
  config?: AxiosRequestConfig,
  useCache: boolean = true
): Promise<T> {
  const key = `get:${url}`;
  if (useCache && cache.has(key)) {
    return cache.get(key).data as T;
  }

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response: AxiosResponse<T> = await api.get(url, {
      ...config,
      signal,
    });
    if (useCache) cache.set(key, response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export function clearCache(url?: string) {
  if (url) {
    cache.delete(`get:${url}`);
  } else {
    cache.clear();
  }
}
