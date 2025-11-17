import api from './api';

export const fetchInvoices = async () => {
  const response = await api.get('/invoices');
  return response.data;
};

export const fetchInvoice = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (invoice) => {
  const response = await api.post('/invoices', invoice);
  return response.data;
};

export const updateInvoice = async (id, invoice) => {
  const response = await api.put(`/invoices/${id}`, invoice);
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
  let url = `/invoices/${id}/pdf?locale=${locale}`;
  if (templateId) {
    url += `&templateId=${templateId}`;
  }
  const response = await api.get(url, { responseType: 'blob' });
  
  // Blob'u indirme için kullan
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const urlObj = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = urlObj;
  link.setAttribute('download', `invoice-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(urlObj);
};

export const exportInvoiceExcel = async (id, locale = 'tr') => {
  const response = await api.get(`/invoices/${id}/excel?locale=${locale}`, { responseType: 'blob' });
  
  // Blob'u indirme için kullan
  const blob = new Blob([response.data], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  const urlObj = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = urlObj;
  link.setAttribute('download', `invoice-${id}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(urlObj);
};

// Invoice Template servisleri
export const fetchInvoiceTemplates = async () => {
  const response = await api.get('/invoice-templates');
  return response.data;
};

export const fetchInvoiceTemplate = async (id) => {
  const response = await api.get(`/invoice-templates/${id}`);
  return response.data;
};

export const fetchDefaultInvoiceTemplate = async () => {
  const response = await api.get('/invoice-templates/default');
  return response.data;
};

export const createInvoiceTemplate = async (template) => {
  const response = await api.post('/invoice-templates', template);
  return response.data;
};

export const updateInvoiceTemplate = async (id, template) => {
  const response = await api.put(`/invoice-templates/${id}`, template);
  return response.data;
};

export const deleteInvoiceTemplate = async (id) => {
  await api.delete(`/invoice-templates/${id}`);
};

