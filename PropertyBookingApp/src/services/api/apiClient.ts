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

apiClient.interceptors.request.use(
  config => {
    console.log(`🌐 [API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('❌ [API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const dataCount = Array.isArray(response.data?.data)
      ? `${response.data.data.length} items`
      : Array.isArray(response.data?.photos)
      ? `${response.data.photos.length} photos`
      : response.data?.id
      ? `Property ${response.data.id}`
      : 'OK';

    console.log(
      `✅ [API RESPONSE] ${response.status} ${response.config.url} (${dataCount})`
    );
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    console.error(
      `❌ [API ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
      error.message
    );
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
