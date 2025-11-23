import api from './api';

export const fetchInvoices = async () => {
  const response = await api.get('/invoices');
  return response.data;
};

export const fetchInvoice = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (invoiceData) => {
  const response = await api.post('/invoices', invoiceData);
  return response.data;
};

export const updateInvoice = async (id, invoiceData) => {
  const response = await api.put(`/invoices/${id}`, invoiceData);
  return response.data;
};

export const deleteInvoice = async (id) => {
  await api.delete(`/invoices/${id}`);
};

export const generateInvoiceNumber = async () => {
  const response = await api.get('/invoices/generate-number');
  return response.data;
};

export const exportInvoicePdf = async (id, locale = 'tr', templateId = null) => {
  const params = new URLSearchParams({ locale });
  if (templateId) {
    params.append('templateId', templateId);
  }
  const response = await api.get(`/invoices/${id}/pdf?${params.toString()}`, {
    responseType: 'blob'
  });
  
  // Blob'u indir
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invoice-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const exportInvoiceExcel = async (id, locale = 'tr') => {
  const response = await api.get(`/invoices/${id}/excel?locale=${locale}`, {
    responseType: 'blob'
  });
  
  // Blob'u indir
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invoice-${id}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

