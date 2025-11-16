import api from './api';

export const fetchStockReport = async ({
  startDate,
  endDate,
  warehouseId,
  format = 'JSON',
  productName,
  categoryId,
  minPrice,
  maxPrice,
  productId
}) => {
  const params = {};
  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }
  if (warehouseId) {
    params.warehouseId = warehouseId;
  }
  if (productName && productName.trim()) {
    params.productName = productName.trim();
  }
  if (categoryId) {
    params.categoryId = categoryId;
  }
  if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
    params.minPrice = minPrice;
  }
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
    params.maxPrice = maxPrice;
  }
  if (productId) {
    params.productId = productId;
  }
  params.format = format;

  const normalizedFormat = format ? format.toUpperCase() : 'JSON';

  const config =
    normalizedFormat === 'CSV' || normalizedFormat === 'PDF'
      ? { params, responseType: 'blob' }
      : { params };

  const response = await api.get('/reports/stock', config);
  return response.data;
};


