import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Tooltip,
  Typography,
  Paper,
  Chip
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import { 
  fetchInvoices, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice, 
  generateInvoiceNumber,
  exportInvoicePdf,
  exportInvoiceExcel
} from '../services/invoiceService';
import { fetchProducts } from '../services/productService';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

const initialForm = {
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  customerName: '',
  customerAddress: '',
  customerTaxNumber: '',
  customerEmail: '',
  customerPhone: '',
  sellerName: 'Es-ko',
  sellerAddress: 'Kapelstraat 38 a 2660 Hoboken',
  sellerTaxNumber: 'Be1020748717',
  sellerEmail: 'es-ko2660@hotmail.com',
  sellerPhone: '',
  sellerBankAccount: '',
  taxRate: 0,
  discountAmount: 0,
  notes: '',
  terms: '',
  status: 'DRAFT',
  items: []
};

const initialItemForm = {
  itemNumber: 1,
  productName: '',
  productCode: '',
  description: '',
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
  discountPercent: 0
};

export default function InvoicesPage() {
  const queryClient = useQueryClient();
  const { t, locale } = useTranslation();
  
  const formatCurrency = useCallback(
    (value) =>
      Number(value ?? 0).toLocaleString(locale, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    [locale]
  );
  
  const formatDate = useCallback(
    (value) => {
      if (!value) return '-';
      try {
        return new Date(value).toLocaleDateString(locale);
      } catch (error) {
        return '-';
      }
    },
    [locale]
  );

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [itemForm, setItemForm] = useState(initialItemForm);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
      setNotification({ message: 'Fatura başarıyla oluşturuldu', severity: 'success' });
      handleClose();
    },
    onError: (error) => {
      setNotification({ 
        message: error.response?.data?.message || 'Fatura oluşturulamadı', 
        severity: 'error' 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
      setNotification({ message: 'Fatura başarıyla güncellendi', severity: 'success' });
      handleClose();
    },
    onError: (error) => {
      setNotification({ 
        message: error.response?.data?.message || 'Fatura güncellenemedi', 
        severity: 'error' 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
      setNotification({ message: 'Fatura başarıyla silindi', severity: 'success' });
    },
    onError: (error) => {
      setNotification({ 
        message: error.response?.data?.message || 'Fatura silinemedi', 
        severity: 'error' 
      });
    }
  });

  const handleOpen = async (invoice = null) => {
    if (invoice) {
      setForm({
        ...invoice,
        invoiceDate: invoice.invoiceDate ? invoice.invoiceDate : initialForm.invoiceDate,
        dueDate: invoice.dueDate ? invoice.dueDate : '',
        items: invoice.items || []
      });
      setEditingId(invoice.id);
    } else {
      try {
        const newInvoiceNumber = await generateInvoiceNumber();
        setForm({ ...initialForm, invoiceNumber: newInvoiceNumber });
        setEditingId(null);
      } catch (error) {
        setForm({ ...initialForm, invoiceNumber: 'INV-' + new Date().getFullYear() + '-' + Date.now() });
        setEditingId(null);
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu faturayı silmek istediğinizden emin misiniz?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddItem = () => {
    setItemForm({ ...initialItemForm, itemNumber: form.items.length + 1 });
    setEditingItemIndex(null);
    setItemDialogOpen(true);
  };

  const handleEditItem = (index) => {
    setItemForm({ ...form.items[index] });
    setEditingItemIndex(index);
    setItemDialogOpen(true);
  };

  const handleDeleteItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems.map((item, i) => ({ ...item, itemNumber: i + 1 })) });
  };

  const handleSaveItem = () => {
    const newItems = [...form.items];
    if (editingItemIndex !== null) {
      newItems[editingItemIndex] = { ...itemForm };
    } else {
      newItems.push({ ...itemForm });
    }
    setForm({ ...form, items: newItems.map((item, i) => ({ ...item, itemNumber: i + 1 })) });
    setItemDialogOpen(false);
    setItemForm(initialItemForm);
    setEditingItemIndex(null);
  };

  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setItemForm({
        ...itemForm,
        productName: product.name || product.productName,
        productCode: product.barcode || '',
        unitPrice: product.unitPrice || 0,
        taxRate: product.btwRate || 0
      });
    }
  };

  const calculateSubtotal = () => {
    return form.items.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      const unitPrice = item.unitPrice || 0;
      const discount = (item.discountPercent || 0) / 100;
      const subtotal = quantity * unitPrice * (1 - discount);
      return sum + subtotal;
    }, 0);
  };

  const calculateTaxAmount = () => {
    return form.items.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      const unitPrice = item.unitPrice || 0;
      const discount = (item.discountPercent || 0) / 100;
      const subtotal = quantity * unitPrice * (1 - discount);
      const taxRate = (item.taxRate || 0) / 100;
      return sum + (subtotal * taxRate);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount();
    return subtotal + taxAmount;
  };

  const handleExportPdf = async (id) => {
    try {
      await exportInvoicePdf(id);
      setNotification({ message: 'PDF başarıyla indirildi', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'PDF indirilemedi', severity: 'error' });
    }
  };

  const handleExportExcel = async (id) => {
    try {
      await exportInvoiceExcel(id);
      setNotification({ message: 'Excel başarıyla indirildi', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Excel indirilemedi', severity: 'error' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'SENT': return 'info';
      case 'DRAFT': return 'default';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Faturalar
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Yeni Fatura
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fatura No</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Müşteri</TableCell>
              <TableCell>Toplam</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Fatura bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{formatDate(invoice.invoiceDate)}</TableCell>
                  <TableCell>{invoice.customerName || '-'}</TableCell>
                  <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={invoice.status || 'DRAFT'} 
                      color={getStatusColor(invoice.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="PDF İndir">
                      <IconButton size="small" onClick={() => handleExportPdf(invoice.id)}>
                        <PictureAsPdfIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excel İndir">
                      <IconButton size="small" onClick={() => handleExportExcel(invoice.id)}>
                        <TableChartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Düzenle">
                      <IconButton size="small" onClick={() => handleOpen(invoice)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton size="small" onClick={() => handleDelete(invoice.id)} color="error">
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Fatura Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? 'Faturayı Düzenle' : 'Yeni Fatura'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Fatura Bilgileri - Kompakt */}
            <Grid item xs={12}>
              <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1, mb: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Fatura No:</Typography>
                    <TextField
                      value={form.invoiceNumber}
                      onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                      required
                      size="small"
                      placeholder="INV-2025-000001"
                      sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' }, width: '200px' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Fatura Tarihi:</Typography>
                    <TextField
                      type="date"
                      value={form.invoiceDate}
                      onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' }, width: '200px' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Vade Tarihi:</Typography>
                    <TextField
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' }, width: '200px' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Durum:</Typography>
                    <TextField
                      select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' }, width: '200px' }}
                    >
                      <MenuItem value="DRAFT">Taslak</MenuItem>
                      <MenuItem value="SENT">Gönderildi</MenuItem>
                      <MenuItem value="PAID">Ödendi</MenuItem>
                      <MenuItem value="CANCELLED">İptal</MenuItem>
                    </TextField>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>Müşteri Bilgileri</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Müşteri Adı"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vergi No"
                value={form.customerTaxNumber}
                onChange={(e) => setForm({ ...form, customerTaxNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres"
                multiline
                rows={2}
                value={form.customerAddress}
                onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-posta"
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefon"
                value={form.customerPhone}
                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 1 }}>
                <Typography variant="h6">Fatura Kalemleri</Typography>
                <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleAddItem}>
                  Kalem Ekle
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sıra</TableCell>
                      <TableCell>Ürün</TableCell>
                      <TableCell>Miktar</TableCell>
                      <TableCell>Birim Fiyat</TableCell>
                      <TableCell>KDV %</TableCell>
                      <TableCell align="right">İşlemler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {form.items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          Fatura kalemi yok
                        </TableCell>
                      </TableRow>
                    ) : (
                      form.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.itemNumber}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell>%{item.taxRate}</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => handleEditItem(index)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteItem(index)} color="error">
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* BTW Toplamı Fatura Kalemleri Altında */}
              {form.items.length > 0 && (
                <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="body2" color="text.secondary">
                    BTW Toplamı: {formatCurrency(calculateTaxAmount())}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Ara Toplam: {formatCurrency(calculateSubtotal())}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  KDV Toplamı: {formatCurrency(calculateTaxAmount())}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  Genel Toplam: {formatCurrency(calculateTotal())}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notlar"
                multiline
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Güncelle' : 'Oluştur'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Fatura Kalemi Dialog */}
      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItemIndex !== null ? 'Kalemi Düzenle' : 'Yeni Kalem'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Ürün Seç"
                value=""
                onChange={(e) => handleProductSelect(parseInt(e.target.value))}
              >
                <MenuItem value="">Ürün Seçin</MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name || product.productName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ürün Adı"
                value={itemForm.productName}
                onChange={(e) => setItemForm({ ...itemForm, productName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ürün Kodu"
                value={itemForm.productCode}
                onChange={(e) => setItemForm({ ...itemForm, productCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Miktar"
                type="number"
                value={itemForm.quantity}
                onChange={(e) => setItemForm({ ...itemForm, quantity: parseInt(e.target.value) || 1 })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Birim Fiyat"
                type="number"
                value={itemForm.unitPrice}
                onChange={(e) => setItemForm({ ...itemForm, unitPrice: parseFloat(e.target.value) || 0 })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="KDV Oranı (%)"
                type="number"
                value={itemForm.taxRate}
                onChange={(e) => setItemForm({ ...itemForm, taxRate: parseInt(e.target.value) || 0 })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="İndirim (%)"
                type="number"
                value={itemForm.discountPercent}
                onChange={(e) => setItemForm({ ...itemForm, discountPercent: parseFloat(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                multiline
                rows={2}
                value={itemForm.description}
                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)}>İptal</Button>
          <Button onClick={handleSaveItem} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setNotification(null)} severity={notification?.severity} sx={{ width: '100%' }}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

