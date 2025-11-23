import api from './api';

export const fetchRecentStockMovements = async (limit = 5) => {
  const response = await api.get(`/stock/movement/recent?limit=${limit}`);
  return response.data;
};

export const fetchStockMovements = async (warehouseId, start, end) => {
  const response = await api.get(`/stock/movement/${warehouseId}`, {
    params: {
      start: start.toISOString(),
      end: end.toISOString()
    }
  });
  return response.data;
};

export const createStockMovement = async (movementData) => {
  const response = await api.post('/stock/movement', movementData);
  return response.data;
};

