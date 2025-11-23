import api from './api';

export const fetchWarehouses = async () => {
  const response = await api.get('/warehouses');
  return response.data;
};

export const createWarehouse = async (warehouseData) => {
  const response = await api.post('/warehouses', warehouseData);
  return response.data;
};

export const deleteWarehouse = async (id) => {
  await api.delete(`/warehouses/${id}`);
};

