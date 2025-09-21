// Demo API client với Axios
import axios, { AxiosError } from 'axios';
import authService from './auth';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 15000,
});

// Basic error shape for FE
export type FEError = {
  message: string;
  code?: number;
  details?: any;
};

function mapAxiosError(err: AxiosError): FEError {
  const status = err.response?.status;
  const data = err.response?.data as any;
  return {
    message: data?.message || err.message || 'Network error',
    code: status,
    details: data?.details || data,
  };
}

// retry/backoff for transient server errors (502/503)
api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as any;
  if (!config) return Promise.reject(mapAxiosError(error));

  const status = error.response?.status;
  const shouldRetry = status === 502 || status === 503;
  if (!shouldRetry) return Promise.reject(mapAxiosError(error));

  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= 3) return Promise.reject(mapAxiosError(error));
  config.__retryCount += 1;

  const delay = Math.pow(2, config.__retryCount) * 150; // exponential backoff
  await new Promise((res) => setTimeout(res, delay));
  return api(config);
});

// Refresh queue
let isRefreshing = false;
let refreshQueue: Array<(token?: string) => void> = [];

function processQueue(token?: string) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

// Request interceptor: attach access token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = authService.getAccessToken();
      if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      // ignore in non-browser environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 by attempting refresh once
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response && error.response.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((token?: string) => {
            if (token) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(mapAxiosError(error));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const newToken = await authService.refreshToken();
        processQueue(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(undefined);
        authService.clearTokens();
        return Promise.reject(mapAxiosError(refreshErr as AxiosError));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(mapAxiosError(error));
  }
);

export default api;

// Helper: upload with progress and abort via AbortSignal
export async function uploadFile(url: string, file: File, onProgress?: (percent: number) => void, signal?: AbortSignal) {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post(url, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (ev: any) => {
      const loaded = Number(ev?.loaded ?? 0);
      const total = Number(ev?.total ?? 0);
      if (onProgress && total > 0) onProgress(Math.round((loaded / total) * 100));
    },
    signal,
  });
  return res.data;
}

// Helper: download binary as blob with optional filename
export async function download(url: string, params?: any, filename?: string, signal?: AbortSignal) {
  const res = await api.get(url, { params, responseType: 'blob', signal });
  const blob = res.data as Blob;
  if (filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }
  return blob;
}
