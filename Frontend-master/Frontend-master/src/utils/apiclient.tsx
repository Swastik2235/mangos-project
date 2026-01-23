import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

// Use environment variable for API URL, fallback to localhost for development
export const baseurl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    'Content-Type': 'application/json',
  },
});

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// API method
export const apiRequest = async <T, D = unknown>(
  method: HttpMethod, 
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<T> => {
  // Create merged headers
  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    ...(config?.headers as RawAxiosRequestHeaders)
  };

  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    ...config,
    headers
  };

  const response: AxiosResponse<T> = await apiClient.request<T>(requestConfig);
  return response.data;
};