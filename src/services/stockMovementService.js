import api from './api';

export const fetchRecentStockMovements = async (limit = 5) => {
  const { data } = await api.get(`/stock/movement/recent`, {
    params: { limit }
  });
  return data;
};


