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
  // Production'da window.location.origin kullan (eğer backend aynı domain'deyse)
  if (typeof window !== 'undefined' && import.meta.env.MODE === 'production') {
    const origin = window.location.origin?.replace(/\/$/, '') || '';
    // Backend URL'i tahmin et (stoktakip-backend-*.onrender.com)
    if (origin.includes('stoktakip-frontend')) {
      return origin.replace('stoktakip-frontend', 'stoktakip-backend-lsam') + '/api';
    }
    // Eğer onrender.com'da ise, direkt backend URL'ini kullan
    if (origin.includes('onrender.com')) {
      return 'https://stoktakip-backend-lsam.onrender.com/api';
    }
    // Fallback: Aynı origin'de /api kullan
    return origin ? `${origin}/api` : 'http://localhost:8080/api';
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
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response.status,
        message: error.response.data?.message || error.message
      });
    } else if (error.request) {
      console.error('❌ API Request Error:', {
        url: error.config?.url,
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
  return config;
});

export default api;

