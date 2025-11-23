import api from './api';

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    // Response'un data'sı array olmalı
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Eğer data array değilse, boş array döndür
    console.warn('⚠️ Products API response is not an array:', response.data);
    return [];
  } catch (error) {
    console.error('❌ Error fetching products:', error);
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

