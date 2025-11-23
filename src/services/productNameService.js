import api from './api';

export const fetchProductNames = async () => {
  const response = await api.get('/product-names');
  return response.data;
};

export const createProductName = async (productNameData) => {
  const response = await api.post('/product-names', productNameData);
  return response.data;
};

export const deleteProductName = async (id) => {
  await api.delete(`/product-names/${id}`);
};

