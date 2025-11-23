import api from './api';

export const fetchProducts = async () => {
  try {
    console.log('🔍 Fetching products from:', api.defaults.baseURL + '/products');
    const response = await api.get('/products');
    console.log('✅ Products API response:', {
      status: response.status,
      dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
      dataLength: Array.isArray(response.data) ? response.data.length : 'N/A',
      data: response.data
    });
    
    // Response'un data'sı array olmalı
    if (Array.isArray(response.data)) {
      console.log(`✅ Returning ${response.data.length} products`);
      return response.data;
    }
    // Eğer data array değilse, boş array döndür
    console.warn('⚠️ Products API response is not an array:', response.data);
    return [];
  } catch (error) {
    console.error('❌ Error fetching products:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url
      }
    });
    // Hata durumunda boş array döndür ki frontend crash olmasın
    // Ama hatayı da throw et ki React Query hatayı görebilsin
    throw error;
  }
};

export const createProduct = async (payload) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

