import axios from 'axios';
import { getAccessToken } from './storeAccess';

const instance = axios.create({
  baseURL: 'https://kapusta-serv.vercel.app',
});

instance.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
