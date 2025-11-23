import api from './api';

export const fetchStockReport = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.startDate) {
    queryParams.append('startDate', params.startDate);
  }
  if (params.endDate) {
    queryParams.append('endDate', params.endDate);
  }
  if (params.warehouseId) {
    queryParams.append('warehouseId', params.warehouseId);
  }
  if (params.productId) {
    queryParams.append('productId', params.productId);
  }
  if (params.categoryId) {
    queryParams.append('categoryId', params.categoryId);
  }
  if (params.minPrice) {
    queryParams.append('minPrice', params.minPrice);
  }
  if (params.maxPrice) {
    queryParams.append('maxPrice', params.maxPrice);
  }
  if (params.format) {
    queryParams.append('format', params.format);
  }
  
  const response = await api.get(`/reports/stock?${queryParams.toString()}`);
  return response.data;
};

