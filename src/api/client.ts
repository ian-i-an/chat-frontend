import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError, toApiError } from "./error";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

interface RetryQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: ApiError) => void;
}

let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error)
      reject(toApiError(error)); // ← ApiError로 변환해서 던짐
    else resolve();
  });
  failedQueue = [];
};

client.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest.retry) {
      return Promise.reject(toApiError(error));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => client(originalRequest));
    }

    originalRequest.retry = true;
    isRefreshing = true;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {},
        {
          withCredentials: true,
        },
      );

      isRefreshing = false;
      processQueue(null);

      return client(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError as AxiosError);

      window.dispatchEvent(
        new CustomEvent("token-expired", {
          detail: (refreshError as AxiosError).response?.data,
        }),
      );

      return Promise.reject(toApiError(error));
    }
  },
);
