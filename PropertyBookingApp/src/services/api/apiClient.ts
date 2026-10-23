import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { APP_CONFIG } from '../../constants/config';
import { ApiError } from '../../types/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const formattedError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected network error occurred. Please try again.',
      statusCode: error.response?.status,
      originalError: error,
    };

    return Promise.reject(formattedError);
  }
);
