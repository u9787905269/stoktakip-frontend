import api from './api';

export const fetchSerialNumbers = async () => {
  const response = await api.get('/serial-numbers');
  return response.data;
};

export const createSerialNumber = async (serialNumberData) => {
  const response = await api.post('/serial-numbers', serialNumberData);
  return response.data;
};

export const deleteSerialNumber = async (id) => {
  await api.delete(`/serial-numbers/${id}`);
};

