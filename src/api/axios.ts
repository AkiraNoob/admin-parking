import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { clearCookiesAndLocalStorage, getAccessToken } from 'src/utils/auth-helpers';

const baseApi = import.meta.env.VITE_API_ENDPOINT
  ? `${import.meta.env.VITE_API_ENDPOINT}`
  : 'http://localhost:3000';

const requestConfig: AxiosRequestConfig = {
  baseURL: baseApi,
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  async (error: AxiosError) => {
    const statusCode = error.response?.status as number;

    if (statusCode === 401) {
      clearCookiesAndLocalStorage();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
