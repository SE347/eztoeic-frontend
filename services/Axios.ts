"use client";
import { MAIN_URL } from "@/constants/AppConstants";
import { useAuth } from "@/contexts/AuthContext";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxiosInterceptors = (authToken: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { logout } = useAuth();
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res: any) => {
      return res.data;
    },
    async (error: AxiosError) => {
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
