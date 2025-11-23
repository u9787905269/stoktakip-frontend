// Production Debug Utility
// Browser console'da çalıştırın: window.debugApp()

export const debugApp = () => {
  console.log('🔍 === PRODUCTION DEBUG ===');
  
  // 1. Environment Variables
  console.log('\n1️⃣ Environment Variables:');
  console.log('  MODE:', import.meta.env.MODE);
  console.log('  VITE_API_URL:', import.meta.env.VITE_API_URL || '❌ NOT SET');
  console.log('  VITE_SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_KEY ? '✅ SET' : '❌ NOT SET');
  console.log('  All env vars:', import.meta.env);
  
  // 2. API Configuration
  console.log('\n2️⃣ API Configuration:');
  const apiModule = import('../services/api.js');
  apiModule.then(module => {
    const api = module.default;
    console.log('  Base URL:', api.defaults.baseURL);
    console.log('  Timeout:', api.defaults.timeout);
    console.log('  Headers:', api.defaults.headers);
  });
  
  // 3. Backend Health Check
  console.log('\n3️⃣ Backend Health Check:');
  fetch('https://stoktakip-backend-lsam.onrender.com/api/actuator/health')
    .then(response => {
      console.log('  Status:', response.status, response.statusText);
      return response.json();
    })
    .then(data => {
      console.log('  ✅ Backend is UP:', data);
    })
    .catch(error => {
      console.error('  ❌ Backend Error:', error);
    });
  
  // 4. Test API Request
  console.log('\n4️⃣ Test API Request:');
  fetch('https://stoktakip-backend-lsam.onrender.com/api/products')
    .then(response => {
      console.log('  Status:', response.status, response.statusText);
      console.log('  Headers:', Object.fromEntries(response.headers.entries()));
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error(`HTTP ${response.status}: ${text}`);
        });
      }
    })
    .then(data => {
      console.log('  ✅ Products fetched:', data.length, 'items');
    })
    .catch(error => {
      console.error('  ❌ Products Error:', error.message);
    });
  
  // 5. CORS Check
  console.log('\n5️⃣ CORS Check:');
  fetch('https://stoktakip-backend-lsam.onrender.com/api/products', {
    method: 'OPTIONS'
  })
    .then(response => {
      console.log('  OPTIONS Status:', response.status);
      console.log('  CORS Headers:');
      console.log('    Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
      console.log('    Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
      console.log('    Access-Control-Allow-Headers:', response.headers.get('Access-Control-Allow-Headers'));
    })
    .catch(error => {
      console.error('  ❌ CORS Preflight Error:', error);
    });
  
  // 6. Window Location
  console.log('\n6️⃣ Window Location:');
  console.log('  Origin:', window.location.origin);
  console.log('  Host:', window.location.host);
  console.log('  Protocol:', window.location.protocol);
  
  console.log('\n✅ Debug complete! Check the logs above.');
};

// Global olarak erişilebilir yap
if (typeof window !== 'undefined') {
  window.debugApp = debugApp;
}

