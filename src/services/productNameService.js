import api from './api';

export const fetchProductNames = async () => {
  const { data } = await api.get('/product-names');
  return data;
};

export const createProductName = async (payload) => {
  const { data } = await api.post('/product-names', payload);
  return data;
};

export const deleteProductName = async (id) => {
  await api.delete(`/product-names/${id}`);
};


