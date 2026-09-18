import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import { API_CONFIG } from './apiConfig';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,

  timeout: API_CONFIG.TIMEOUT,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-App-Name': API_CONFIG.APP_NAME,
  },

  // IMPORTANTE:
  // preparado para futuras cookies HttpOnly
  withCredentials: true,
});



/**
 * REQUEST INTERCEPTOR
 * Aquí luego inyectaremos JWT automáticamente.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);



/**
 * RESPONSE INTERCEPTOR
 * Manejo global de errores.
 */
apiClient.interceptors.response.use(

  (response) => response,

  async (error: AxiosError) => {

    /**
     * FUTURO:
     * Refresh token automático
     */

    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');

      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      console.warn('Forbidden request');
    }

    if (error.response?.status === 500) {
      console.error('Internal server error');
    }

    return Promise.reject(error);
  }
);