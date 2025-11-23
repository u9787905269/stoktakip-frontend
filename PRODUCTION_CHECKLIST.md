# Production Deployment Checklist

## ✅ Pre-Deploy Kontrolleri

### 1. Environment Variables (Render Dashboard)
- [ ] `VITE_API_URL=https://stoktakip-backend-lsam.onrender.com/api`
- [ ] `VITE_SUPABASE_KEY` (opsiyonel, Supabase kullanıyorsanız)

### 2. Build Configuration
- [ ] `vite.config.js` doğru yapılandırılmış
- [ ] `package.json` build script'i doğru
- [ ] Dependencies güncel

### 3. Code Quality
- [ ] Tüm React import'ları eklendi
- [ ] Console hataları yok
- [ ] TypeScript/ESLint hataları yok

## 🔍 Post-Deploy Kontrolleri

### 1. Browser Console
- [ ] `🔗 API Base URL:` log'u doğru URL'i gösteriyor
- [ ] CORS hatası yok
- [ ] Network error yok
- [ ] React import hatası yok

### 2. Network Tab
- [ ] API request'leri başarılı (200 OK)
- [ ] Preflight (OPTIONS) request başarılı
- [ ] Response data geliyor

### 3. Functionality
- [ ] Sayfa yükleniyor
- [ ] API'lerden data geliyor
- [ ] Routing çalışıyor
- [ ] UI render ediliyor

## 🐛 Yaygın Sorunlar ve Çözümleri

### Sorun 1: "VITE_API_URL environment variable set edilmemiş!"
**Çözüm:** Render Dashboard'da `VITE_API_URL` ekleyin ve yeniden build edin

### Sorun 2: CORS Error
**Çözüm:** Backend'de `FRONTEND_URL` ve `CORS_ALLOWED_ORIGINS` kontrol edin

### Sorun 3: 404 Not Found
**Çözüm:** API URL'in sonunda `/api` olduğundan emin olun

### Sorun 4: Network Error
**Çözüm:** Backend health check yapın ve backend'in çalıştığından emin olun

