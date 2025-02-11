import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { API_KEY, API_URL } from "@/constants/api";
import { apiCache } from "./cache";

class HttpClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      HttpClient.instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          const cacheKey = `${config.url}-${JSON.stringify(config.params)}`;
          const cachedData = apiCache.get(cacheKey);

          if (cachedData) {
            config.adapter = () =>
              Promise.resolve({ data: cachedData, status: 200, config });
          }

          return config;
        },
        (error: AxiosError) => Promise.reject(error)
      );

      HttpClient.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          const cacheKey = `${response.config.url}-${JSON.stringify(
            response.config.params
          )}`;
          apiCache.set(cacheKey, response.data);
          return response;
        },
        (error: AxiosError) => {
          console.error("Error en la solicitud:", error.message);
          return Promise.reject(error);
        }
      );
    }

    return HttpClient.instance;
  }
}

export const httpClient = HttpClient.getInstance();
