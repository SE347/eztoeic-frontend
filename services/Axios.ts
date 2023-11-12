"use client";
import { MAIN_URL } from "@/constants/AppConstants";

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxiosInterceptors = (
  authToken: string,
  logout: () => void
) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    }
  );
  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    (error: AxiosError) => {
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 401: {
          logout();
          break;
        }
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
};
