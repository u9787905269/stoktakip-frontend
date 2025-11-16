import api from './api';

export const fetchWarehouses = async () => {
  const { data } = await api.get('/warehouses');
  return data;
};

export const createWarehouse = async (payload) => {
  const { data } = await api.post('/warehouses', payload);
  return data;
};

export const deleteWarehouse = async (id) => {
  await api.delete(`/warehouses/${id}`);
};

