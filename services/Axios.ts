"use client";
import { MAIN_URL } from "@/constants/AppConstants";
import { useAuth } from "@/contexts/AuthContext";

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



axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken!=null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const {logout} =useAuth();
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
