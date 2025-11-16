import api from './api';

export const fetchSerialNumbers = async () => {
  const { data } = await api.get('/serial-numbers');
  return data;
};

export const createSerialNumber = async (payload) => {
  const { data } = await api.post('/serial-numbers', payload);
  return data;
};

export const deleteSerialNumber = async (id) => {
  await api.delete(`/serial-numbers/${id}`);
};


