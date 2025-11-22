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
  // Production'da direkt backend URL'ini kullan
  if (typeof window !== 'undefined' && import.meta.env.MODE === 'production') {
    // Production'da her zaman backend URL'ini kullan
    return 'https://stoktakip-backend-lsam.onrender.com/api';
  }
  // Development varsayılanı
  return 'http://localhost:8080/api';
};

const baseURL = resolveBaseUrl();

// Production'da API URL'i console'a yazdır (debug için)
if (import.meta.env.MODE === 'production') {
  console.log('🔗 API Base URL:', baseURL);
  if (!import.meta.env.VITE_API_URL) {
    console.warn('⚠️ VITE_API_URL environment variable set edilmemiş! Fallback kullanılıyor:', baseURL);
  }
}

const api = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor - hataları logla
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const fullUrl = error.config?.baseURL + error.config?.url;
      console.error('❌ API Error:', {
        fullUrl: fullUrl,
        baseURL: error.config?.baseURL,
        path: error.config?.url,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        message: error.response.data?.message || error.message
      });
    } else if (error.request) {
      const fullUrl = error.config?.baseURL + error.config?.url;
      console.error('❌ API Request Error:', {
        fullUrl: fullUrl,
        baseURL: error.config?.baseURL,
        path: error.config?.url,
        message: 'Network error - Backend\'e ulaşılamıyor'
      });
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('stoktakip-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Production'da request detaylarını logla
  if (import.meta.env.MODE === 'production') {
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      baseURL: config.baseURL,
      path: config.url
    });
  }
  return config;
});

export default api;

