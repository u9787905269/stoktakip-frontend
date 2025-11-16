import axios from 'axios';

const resolveBaseUrl = () => {
  // Vite environment variable kontrolü
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Window global değişken kontrolü (production build için)
  if (typeof window !== 'undefined' && window.__STOKTAKIP_API_URL__) {
    return window.__STOKTAKIP_API_URL__;
  }
  // Varsayılan: Backend context-path /api olduğu için direkt /api ekliyoruz
  return 'http://localhost:8080/api';
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('stoktakip-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

