import axios from 'axios';
import { getAccessToken } from './storeAccess';
import { checkAuth } from './authHelper';

const instance = axios.create({
  baseURL: 'https://kapusta-serv.vercel.app',
});

const publicEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];

instance.interceptors.request.use(
  config => {
    const isPublicEndpoint = publicEndpoints.some(endpoint =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const isAuthorized = checkAuth();
      if (!isAuthorized) {
        return Promise.reject('Brak autoryzacji');
      }
    }

    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      checkAuth();
    }
    return Promise.reject(error);
  }
);

export default instance;
