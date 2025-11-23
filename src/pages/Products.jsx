import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  Typography
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import jsBarcode from 'jsbarcode';
import { createProduct, fetchProducts, updateProduct, deleteProduct } from '../services/productService';
import { createWarehouse, deleteWarehouse, fetchWarehouses } from '../services/warehouseService';
import { createCategory, deleteCategory, fetchCategories } from '../services/categoryService';
import { createProductName, deleteProductName, fetchProductNames } from '../services/productNameService';
import { createSerialNumber, deleteSerialNumber, fetchSerialNumbers } from '../services/serialNumberService';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

function Barcode({ value }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      jsBarcode(svgRef.current, value, { format: 'CODE128', displayValue: true, height: 60 });
    }
  }, [value]);

  return <svg ref={svgRef} />;
}

const initialForm = {
  productNameId: '',
  description: '',
  categoryId: '',
  serialNumberId: '',
  unitPrice: '',
  btwRate: '0',
  stockQuantity: '',
  warehouseId: ''
};

const initialWarehouseForm = {
  name: '',
  location: '',
  description: ''
};

export default function ProductsPage() {
  const navigate = useNavigate();
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
      if (!value) return t('common.notAvailable');
      try {
        return new Date(value).toLocaleDateString(locale);
      } catch (error) {
        return t('common.notAvailable');
      }
    },
    [locale, t]
  );
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [notification, setNotification] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [openProductNameDialog, setOpenProductNameDialog] = useState(false);
  const [newProductNameValue, setNewProductNameValue] = useState('');
  const [openSerialDialog, setOpenSerialDialog] = useState(false);
  const [newSerialValue, setNewSerialValue] = useState('');
  const [openWarehouseDialog, setOpenWarehouseDialog] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({ ...initialWarehouseForm });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const adjustmentOptions = useMemo(
    () => [
      { key: 'SALE', label: t('products.adjustmentReasons.sale'), type: 'OUTBOUND' },
      { key: 'DISPOSAL', label: t('products.adjustmentReasons.disposal'), type: 'OUTBOUND' },
      { key: 'RETURN', label: t('products.adjustmentReasons.return'), type: 'INBOUND' },
      { key: 'PURCHASE', label: t('products.adjustmentReasons.purchase'), type: 'INBOUND' },
      { key: 'INCREASE', label: t('products.adjustmentReasons.increase'), type: 'INBOUND' },
      { key: 'DECREASE', label: t('products.adjustmentReasons.decrease'), type: 'OUTBOUND' },
      { key: 'VAT_CHANGE', label: t('products.adjustmentReasons.vatChange'), type: 'ADJUSTMENT' },
      { key: 'PRICE_CHANGE', label: t('products.adjustmentReasons.priceChange'), type: 'ADJUSTMENT' }
    ],
    [t]
  );
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const name = (product.productName ?? product.name ?? '').toLowerCase();
      const category = (product.categoryName ?? '').toLowerCase();
      const serial = (product.serialNumberValue ?? '').toLowerCase();
      const barcode = (product.barcode ?? '').toLowerCase();
      return (
        name.includes(term) ||
        category.includes(term) ||
        serial.includes(term) ||
        barcode.includes(term)
      );
    });
  }, [products, searchTerm]);

  const { data: warehouses = [], isLoading: isWarehousesLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: productNames = [], isLoading: isProductNamesLoading } = useQuery({
    queryKey: ['product-names'],
    queryFn: fetchProductNames
  });

  const { data: serialNumbers = [], isLoading: isSerialsLoading } = useQuery({
    queryKey: ['serial-numbers'],
    queryFn: fetchSerialNumbers
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['recent-stock-movements'] });
      setNotification({ type: 'success', message: t('products.notifications.createSuccess') });
      setOpen(false);
      setForm({ ...initialForm });
    },
    onError: () => {
      setNotification({ type: 'error', message: t('products.notifications.createError') });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      productNameId: form.productNameId ? Number(form.productNameId) : null,
      description: form.description || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      serialNumberId: form.serialNumberId ? Number(form.serialNumberId) : null,
      unitPrice: Number(form.unitPrice),
      btwRate: Number(form.btwRate),
      stockQuantity: Number(form.stockQuantity),
      warehouseId: form.warehouseId ? Number(form.warehouseId) : null
    };
    mutation.mutate(payload);
  };

  const isSubmitDisabled = useMemo(() => {
    return (
      !form.productNameId ||
      !form.warehouseId ||
      form.unitPrice === '' ||
      Number.isNaN(Number(form.unitPrice)) ||
      form.stockQuantity === '' ||
      Number.isNaN(Number(form.stockQuantity)) ||
      form.btwRate === '' ||
      Number.isNaN(Number(form.btwRate))
    );
  }, [form]);

  const formPreview = useMemo(() => {
    // unitPrice artık net fiyat (BTW hariç)
    const unitNet = Number(form.unitPrice) || 0;
    const qty = Number(form.stockQuantity) || 0;
    const rate = Number(form.btwRate) || 0;
    const rateFraction = rate / 100;

    // BTW net fiyat üzerinden hesaplanıyor
    const unitBtw = Number((unitNet * rateFraction).toFixed(2));
    // Brüt fiyat = Net fiyat + BTW
    const unitGross = Number((unitNet + unitBtw).toFixed(2));
    
    const totalNet = Number((unitNet * qty).toFixed(2));
    const totalBtw = Number((unitBtw * qty).toFixed(2));
    const totalGross = Number((totalNet + totalBtw).toFixed(2));

    return {
      unitNet,
      unitBtw,
      unitGross,
      totalNet,
      totalBtw,
      totalGross
    };
  }, [form.unitPrice, form.stockQuantity, form.btwRate]);

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNotification({ type: 'success', message: t('products.notifications.categoryCreateSuccess') });
      setNewCategoryName('');
      setOpenCategoryDialog(false);
      setForm((prev) => ({ ...prev, categoryId: data.id?.toString() ?? '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.categoryCreateError');
      setNotification({ type: 'error', message });
    }
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNotification({ type: 'success', message: t('products.notifications.categoryDeleteSuccess') });
      setForm((prev) => ({ ...prev, categoryId: '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.categoryDeleteError');
      setNotification({ type: 'error', message });
    }
  });

  const handleCreateCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setNotification({ type: 'error', message: t('products.notifications.categoryRequired') });
      return;
    }
    categoryMutation.mutate({ name: trimmed });
  };

  const productNameMutation = useMutation({
    mutationFn: createProductName,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product-names'] });
      setNotification({ type: 'success', message: t('products.notifications.productNameCreateSuccess') });
      setNewProductNameValue('');
      setOpenProductNameDialog(false);
      setForm((prev) => ({ ...prev, productNameId: data.id?.toString() ?? '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.productNameCreateError');
      setNotification({ type: 'error', message });
    }
  });
  const deleteProductNameMutation = useMutation({
    mutationFn: deleteProductName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-names'] });
      setNotification({ type: 'success', message: t('products.notifications.productNameDeleteSuccess') });
      setForm((prev) => ({ ...prev, productNameId: '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.productNameDeleteError');
      setNotification({ type: 'error', message });
    }
  });

  const handleCreateProductName = () => {
    const trimmed = newProductNameValue.trim();
    if (!trimmed) {
      setNotification({ type: 'error', message: t('products.notifications.productNameRequired') });
      return;
    }
    productNameMutation.mutate({ name: trimmed });
  };

  const handleDeleteProductName = () => {
    if (!form.productNameId) {
      return;
    }
    if (!window.confirm(t('products.confirmations.deleteProductName'))) {
      return;
    }
    deleteProductNameMutation.mutate(Number(form.productNameId));
  };

  const serialNumberMutation = useMutation({
    mutationFn: createSerialNumber,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['serial-numbers'] });
      setNotification({ type: 'success', message: t('products.notifications.serialCreateSuccess') });
      setNewSerialValue('');
      setOpenSerialDialog(false);
      setForm((prev) => ({ ...prev, serialNumberId: data.id?.toString() ?? '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.serialCreateError');
      setNotification({ type: 'error', message });
    }
  });
  const deleteSerialNumberMutation = useMutation({
    mutationFn: deleteSerialNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serial-numbers'] });
      setNotification({ type: 'success', message: t('products.notifications.serialDeleteSuccess') });
      setForm((prev) => ({ ...prev, serialNumberId: '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.serialDeleteError');
      setNotification({ type: 'error', message });
    }
  });

  const handleCreateSerialNumber = () => {
    const trimmed = newSerialValue.trim();
    if (!trimmed) {
      setNotification({ type: 'error', message: t('products.notifications.serialRequired') });
      return;
    }
    serialNumberMutation.mutate({ value: trimmed });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditForm({
      productNameId: product.productNameId ? product.productNameId.toString() : '',
      description: product.description ?? '',
      categoryId: product.categoryId ? product.categoryId.toString() : '',
      serialNumberId: product.serialNumberId ? product.serialNumberId.toString() : '',
      unitPrice: product.unitPrice !== undefined && product.unitPrice !== null ? product.unitPrice.toString() : '',
      btwRate: product.btwRate !== undefined && product.btwRate !== null ? product.btwRate.toString() : '',
      stockQuantity: product.stockQuantity !== undefined && product.stockQuantity !== null ? product.stockQuantity.toString() : '',
      warehouseId: product.warehouseId ? product.warehouseId.toString() : '',
      stockAdjustmentKey: '',
      stockAdjustmentReason: '',
      stockAdjustmentType: ''
    });
    setOpenEditDialog(true);
  };

  const handleEditFieldChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdjustmentReasonChange = (event) => {
    const { value } = event.target;
    const option = adjustmentOptions.find((item) => item.key === value);
    setEditForm((prev) => ({
      ...prev,
      stockAdjustmentKey: value,
      stockAdjustmentReason: option ? option.label : '',
      stockAdjustmentType: option ? option.type : ''
    }));
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !editForm) {
      return;
    }
    const payload = {
      productNameId: Number(editForm.productNameId),
      description: editForm.description ? editForm.description : null,
      categoryId: editForm.categoryId ? Number(editForm.categoryId) : null,
      serialNumberId: editForm.serialNumberId ? Number(editForm.serialNumberId) : null,
      unitPrice: Number(editForm.unitPrice),
      btwRate: Number(editForm.btwRate),
      stockQuantity: Number(editForm.stockQuantity),
      warehouseId: editForm.warehouseId ? Number(editForm.warehouseId) : null,
      stockAdjustmentReason: editForm.stockAdjustmentReason ? editForm.stockAdjustmentReason : null,
      stockAdjustmentType: editForm.stockAdjustmentType ? editForm.stockAdjustmentType : null
    };
    updateProductMutation.mutate({ id: editingProduct.id, payload });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingProduct(null);
    setEditForm(null);
  };

  const handleDeleteProduct = (product) => {
    if (!window.confirm(t('products.confirmations.deleteProduct'))) {
      return;
    }
    deleteProductMutation.mutate(product.id);
  };

  const handleDeleteWarehouse = () => {
    if (!form.warehouseId) {
      return;
    }
    if (!window.confirm(t('products.confirmations.deleteWarehouse'))) {
      return;
    }
    deleteWarehouseMutation.mutate(Number(form.warehouseId));
  };

  const handleDeleteSerialNumber = () => {
    if (!form.serialNumberId) {
      return;
    }
    if (!window.confirm(t('products.confirmations.deleteSerial'))) {
      return;
    }
    deleteSerialNumberMutation.mutate(Number(form.serialNumberId));
  };

  const warehouseMutation = useMutation({
    mutationFn: createWarehouse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      setNotification({ type: 'success', message: t('products.notifications.warehouseCreateSuccess') });
      setOpenWarehouseDialog(false);
      setNewWarehouse({ ...initialWarehouseForm });
      setForm((prev) => ({ ...prev, warehouseId: data.id?.toString() ?? '' }));
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.warehouseCreateError');
      setNotification({ type: 'error', message });
    }
  });

  const handleWarehouseFieldChange = (event) => {
    const { name, value } = event.target;
    setNewWarehouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteCategory = () => {
    if (!form.categoryId) {
      return;
    }
    if (!window.confirm(t('products.confirmations.deleteCategory'))) {
      return;
    }
    deleteCategoryMutation.mutate(Number(form.categoryId));
  };

  const handleCreateWarehouse = () => {
    const trimmedName = newWarehouse.name.trim();
    if (!trimmedName) {
      setNotification({ type: 'error', message: t('products.notifications.warehouseRequired') });
      return;
    }
    warehouseMutation.mutate({
      name: trimmedName,
      location: newWarehouse.location || null,
      description: newWarehouse.description || null
    });
  };

  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['recent-stock-movements'] });
      setNotification({ type: 'success', message: t('products.notifications.updateSuccess') });
      setOpenEditDialog(false);
      setEditingProduct(null);
      setEditForm(null);
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.updateError');
      setNotification({ type: 'error', message });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['recent-stock-movements'] });
      setNotification({ type: 'success', message: t('products.notifications.deleteSuccess') });
      if (editingProduct) {
        setOpenEditDialog(false);
        setEditingProduct(null);
        setEditForm(null);
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.deleteError');
      setNotification({ type: 'error', message });
    }
  });

  const deleteWarehouseMutation = useMutation({
    mutationFn: deleteWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      setNotification({ type: 'success', message: t('products.notifications.warehouseDeleteSuccess') });
      setForm((prev) => ({ ...prev, warehouseId: '' }));
      if (editForm) {
        setEditForm((prev) => ({ ...prev, warehouseId: '' }));
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? t('products.notifications.warehouseDeleteError');
      setNotification({ type: 'error', message });
    }
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4">{t('products.title')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          {t('products.addButton')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          placeholder={t('products.filters.searchPlaceholder')}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          size="small"
          sx={{ width: { xs: '100%', sm: '75%' } }}
        />
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Typography>{t('common.loading')}</Typography>
          ) : filteredProducts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t('common.noResults')}
            </Typography>
          ) : (
            <TableContainer sx={{ maxHeight: { xs: 420, md: 'none' } }}>
              <Table size="small" stickyHeader aria-label={t('products.title')}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.productName')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.category')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.unitPrice')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.unitBtw')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.totalBtw')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.totalPrice')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.btwRate')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.stockQuantity')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.serialNumber')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.warehouse')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{t('products.table.createdAt')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('products.table.barcode')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} align="right">
                      {t('products.table.actions')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>{product.productName ?? product.name}</TableCell>
                      <TableCell>{product.categoryName ?? t('common.notAvailable')}</TableCell>
                      <TableCell>{formatCurrency(product.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(product.unitPriceBtwAmount)}</TableCell>
                      <TableCell>{formatCurrency(product.totalBtwAmount)}</TableCell>
                      <TableCell>{formatCurrency(product.totalPrice)}</TableCell>
                      <TableCell>{product.btwRate ?? 0}</TableCell>
                      <TableCell>{product.stockQuantity}</TableCell>
                      <TableCell>{product.serialNumberValue ?? t('common.notAvailable')}</TableCell>
                      <TableCell>{product.warehouseName ?? t('common.notAvailable')}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatDate(product.createdAt)}</TableCell>
                      <TableCell>
                        {product.barcode ? (
                          <Button
                            component={RouterLink}
                            to={`/barcode?value=${encodeURIComponent(product.barcode)}&name=${encodeURIComponent(product.productName ?? product.name ?? '')}`}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ whiteSpace: 'nowrap' }}
                          >
                            {t('products.showBarcode')}
                          </Button>
                        ) : (
                          t('common.notAvailable')
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'inline-flex', gap: 1 }}>
                          <Tooltip title={t('products.tooltips.edit')}>
                            <span>
                              <IconButton
                                size="small"
                                onClick={() => handleEditProduct(product)}
                                disabled={updateProductMutation.isLoading}
                              >
                                <EditOutlinedIcon fontSize="inherit" />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title={t('products.tooltips.delete')}>
                            <span>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteProduct(product)}
                                disabled={deleteProductMutation.isLoading}
                              >
                                <DeleteOutlineIcon fontSize="inherit" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{t('products.form.addTitle')}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <TextField
                      select
                      label={t('products.form.productNameLabel')}
                      name="productNameId"
                      value={form.productNameId}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                      required
                      disabled={isProductNamesLoading}
                    >
                      <MenuItem value="">{t('products.form.productNamePlaceholder')}</MenuItem>
                      {productNames.map((productName) => (
                        <MenuItem key={productName.id} value={productName.id?.toString()}>
                          {productName.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.addProductName')}>
                      <IconButton
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => setOpenProductNameDialog(true)}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.deleteProductName')}>
                      <span>
                        <IconButton
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={handleDeleteProductName}
                          disabled={!form.productNameId || deleteProductNameMutation.isLoading}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Grid item xs>
                    <TextField
                      select
                      label={t('products.form.categoryLabel')}
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                      disabled={isCategoriesLoading}
                    >
                      <MenuItem value="">{t('products.form.categoryPlaceholder')}</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id?.toString()}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.addCategory')}>
                      <IconButton color="primary" sx={{ mt: 1 }} onClick={() => setOpenCategoryDialog(true)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.deleteCategory')}>
                      <span>
                        <IconButton
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={handleDeleteCategory}
                          disabled={!form.categoryId || deleteCategoryMutation.isLoading}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <TextField
                  label={t('products.form.descriptionLabel')}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  multiline
                  rows={3}
                />
                <TextField
                  label={t('products.form.unitPriceLabel')}
                  name="unitPrice"
                  value={form.unitPrice}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  type="number"
                  required
                />
                <TextField
                  label={t('products.form.btwRateLabel')}
                  name="btwRate"
                  value={form.btwRate}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  type="number"
                  required
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                />
                <TextField
                  label={t('products.form.stockQuantityLabel')}
                  name="stockQuantity"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <TextField
                      select
                      label={t('products.form.serialNumberLabel')}
                      name="serialNumberId"
                      value={form.serialNumberId}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                      disabled={isSerialsLoading}
                    >
                      <MenuItem value="">{t('products.form.serialNumberPlaceholder')}</MenuItem>
                      {serialNumbers.map((serial) => (
                        <MenuItem key={serial.id} value={serial.id?.toString()}>
                          {serial.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.addSerial')}>
                      <IconButton color="primary" sx={{ mt: 1 }} onClick={() => setOpenSerialDialog(true)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.deleteSerial')}>
                      <span>
                        <IconButton
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={handleDeleteSerialNumber}
                          disabled={!form.serialNumberId || deleteSerialNumberMutation.isLoading}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Grid item xs>
                    <TextField
                      select
                      label={t('products.form.warehouseLabel')}
                      name="warehouseId"
                      value={form.warehouseId}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                      disabled={isWarehousesLoading}
                    >
                      <MenuItem value="">{t('products.form.warehousePlaceholder')}</MenuItem>
                      {warehouses.map((warehouse) => (
                        <MenuItem key={warehouse.id} value={warehouse.id?.toString()}>
                          {warehouse.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.addWarehouse')}>
                      <IconButton
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => {
                          setNewWarehouse({ ...initialWarehouseForm });
                          setOpenWarehouseDialog(true);
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title={t('products.tooltips.deleteWarehouse')}>
                      <span>
                        <IconButton
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={handleDeleteWarehouse}
                          disabled={!form.warehouseId || deleteWarehouseMutation.isLoading}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t('products.form.computedValuesTitle')}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('products.form.unitBtw')}
                        value={formatCurrency(formPreview.unitBtw)}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('products.form.unitGross')}
                        value={formatCurrency(formPreview.unitGross)}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('products.form.totalBtw')}
                        value={formatCurrency(formPreview.totalBtw)}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('products.form.totalGross')}
                        value={formatCurrency(formPreview.totalGross)}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={t('products.form.totalNet')}
                        value={formatCurrency(formPreview.totalNet)}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <DialogActions sx={{ pr: 0 }}>
              <Button onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
              <Button type="submit" variant="contained" disabled={isSubmitDisabled || mutation.isLoading}>
                {t('common.save')}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openProductNameDialog} onClose={() => setOpenProductNameDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('products.dialogs.newProductNameTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('products.dialogs.newProductNameLabel')}
            fullWidth
            value={newProductNameValue}
            onChange={(event) => setNewProductNameValue(event.target.value)}
            disabled={productNameMutation.isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductNameDialog(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleCreateProductName} disabled={productNameMutation.isLoading}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('products.editDialog.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            {editingProduct?.productName ?? editingProduct?.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label={t('products.editDialog.unitPriceLabel')}
                name="unitPrice"
                type="number"
                value={editForm?.unitPrice ?? ''}
                onChange={handleEditFieldChange}
                fullWidth
                margin="dense"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label={t('products.form.btwRateLabel')}
                name="btwRate"
                type="number"
                value={editForm?.btwRate ?? ''}
                onChange={handleEditFieldChange}
                fullWidth
                margin="dense"
                required
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label={t('products.editDialog.stockQuantityLabel')}
                name="stockQuantity"
                type="number"
                value={editForm?.stockQuantity ?? ''}
                onChange={handleEditFieldChange}
                fullWidth
                margin="dense"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                label={t('products.editDialog.reasonLabel')}
                value={editForm?.stockAdjustmentKey ?? ''}
                onChange={handleAdjustmentReasonChange}
                fullWidth
                margin="dense"
                helperText={t('products.editDialog.helperText')}
              >
                <MenuItem value="">{t('products.editDialog.reasonPlaceholder')}</MenuItem>
                {adjustmentOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label={t('products.editDialog.customReasonLabel')}
                placeholder={t('products.editDialog.customReasonPlaceholder')}
                value={editForm?.stockAdjustmentReason ?? ''}
                onChange={(event) =>
                  setEditForm((prev) => ({
                    ...prev,
                    stockAdjustmentReason: event.target.value
                  }))
                }
                fullWidth
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleUpdateProduct}
            disabled={updateProductMutation.isLoading || !editForm}
          >
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSerialDialog}
        onClose={() => {
          setOpenSerialDialog(false);
          setNewSerialValue('');
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{t('products.dialogs.newSerialTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('products.dialogs.newSerialLabel')}
            fullWidth
            value={newSerialValue}
            onChange={(event) => setNewSerialValue(event.target.value)}
            disabled={serialNumberMutation.isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSerialDialog(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleCreateSerialNumber} disabled={serialNumberMutation.isLoading}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarehouseDialog}
        onClose={() => {
          setOpenWarehouseDialog(false);
          setNewWarehouse({ ...initialWarehouseForm });
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('products.dialogs.newWarehouseTitle')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                label={t('products.dialogs.newWarehouseNameLabel')}
                fullWidth
                value={newWarehouse.name}
                name="name"
                onChange={handleWarehouseFieldChange}
                disabled={warehouseMutation.isLoading}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                label={t('products.dialogs.newWarehouseLocationLabel')}
                fullWidth
                value={newWarehouse.location}
                name="location"
                onChange={handleWarehouseFieldChange}
                disabled={warehouseMutation.isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label={t('products.dialogs.newWarehouseDescriptionLabel')}
                fullWidth
                value={newWarehouse.description}
                name="description"
                onChange={handleWarehouseFieldChange}
                disabled={warehouseMutation.isLoading}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenWarehouseDialog(false);
              setNewWarehouse({ ...initialWarehouseForm });
            }}
            disabled={warehouseMutation.isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button onClick={handleCreateWarehouse} disabled={warehouseMutation.isLoading}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('products.dialogs.newCategoryTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('products.dialogs.newCategoryLabel')}
            fullWidth
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
            disabled={categoryMutation.isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleCreateCategory} disabled={categoryMutation.isLoading}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {notification ? (
          <Alert severity={notification.type} onClose={() => setNotification(null)} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}

