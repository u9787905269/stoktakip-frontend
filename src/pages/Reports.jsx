import { useCallback, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../services/warehouseService';
import { fetchCategories } from '../services/categoryService';
import { fetchStockReport } from '../services/reportService';
import { fetchProducts } from '../services/productService';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

const formatDateInput = (date) => date.toISOString().split('T')[0];
const subtractDays = (date, days) => {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() - days);
  return clone;
};

export default function ReportsPage() {
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

  const todayDate = new Date();
  const today = formatDateInput(todayDate);
  const [startDate, setStartDate] = useState(formatDateInput(subtractDays(todayDate, 30)));
  const [endDate, setEndDate] = useState(today);
  const [format, setFormat] = useState('JSON');
  const [warehouseId, setWarehouseId] = useState('');
  const [productId, setProductId] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const { data: warehouses = [] } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
    staleTime: 1000 * 60 * 5
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5
  });

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const payload = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        warehouseId: warehouseId ? Number(warehouseId) : undefined,
        format,
        productId: productId ? Number(productId) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        minPrice: minPrice !== '' ? Number(minPrice) : undefined,
        maxPrice: maxPrice !== '' ? Number(maxPrice) : undefined
      };
      const result = await fetchStockReport(payload);
      const normalizedFormat = format.toUpperCase();
      if (normalizedFormat === 'CSV' || normalizedFormat === 'PDF') {
        const mimeType =
          normalizedFormat === 'CSV' ? 'text/csv;charset=utf-8;' : 'application/pdf';
        const extension = normalizedFormat.toLowerCase();
        const blob = result instanceof Blob ? result : new Blob([result], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `stock-report.${extension}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } else {
        setReportData(result);
      }
    } catch (err) {
      setError(err?.response?.data?.message ?? t('reports.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('reports.title')}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardHeader title={t('reports.filtersCardTitle')} />
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label={t('reports.startDate')}
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label={t('reports.endDate')}
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="warehouse-label">{t('reports.warehouse')}</InputLabel>
                <Select
                  labelId="warehouse-label"
                  label={t('reports.warehouse')}
                  value={warehouseId}
                  onChange={(event) => setWarehouseId(event.target.value)}
                >
                  <MenuItem value="">{t('reports.warehouseAll')}</MenuItem>
                  {warehouses.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.id?.toString() ?? ''}>
                      {warehouse.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="format-label">{t('reports.format')}</InputLabel>
                <Select
                  labelId="format-label"
                  label={t('reports.format')}
                  value={format}
                  onChange={(event) => setFormat(event.target.value)}
                >
                  <MenuItem value="JSON">{t('reports.formatOptions.json')}</MenuItem>
                  <MenuItem value="CSV">{t('reports.formatOptions.csv')}</MenuItem>
                  <MenuItem value="PDF">{t('reports.formatOptions.pdf')}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="product-filter-label">{t('reports.filters.productName')}</InputLabel>
                <Select
                  labelId="product-filter-label"
                  label={t('reports.filters.productName')}
                  value={productId}
                  onChange={(event) => setProductId(event.target.value)}
                >
                  <MenuItem value="">{t('reports.filters.productNameAll')}</MenuItem>
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id?.toString() ?? ''}>
                      {product.productName ?? product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="category-filter-label">{t('reports.filters.category')}</InputLabel>
                <Select
                  labelId="category-filter-label"
                  label={t('reports.filters.category')}
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                  <MenuItem value="">{t('reports.filters.categoryAll')}</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id?.toString() ?? ''}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label={t('reports.filters.minPrice')}
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                label={t('reports.filters.maxPrice')}
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Button variant="contained" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? <CircularProgress size={20} color="inherit" /> : t('reports.generate')}
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.print()}
                disabled={isGenerating}
              >
                {t('reports.print')}
              </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t('reports.helperText')}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {format === 'JSON' && reportData && (
        <Stack spacing={3}>
          <Card>
            <CardHeader title={t('reports.summaryTitle')} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('reports.summary.dateRange')}
                  </Typography>
                  <Typography variant="body1">
                    {reportData.startDate ?? t('common.notAvailable')} {' - '}
                    {reportData.endDate ?? t('common.notAvailable')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('reports.summary.totalProducts')}
                  </Typography>
                  <Typography variant="body1">{reportData.totalProducts ?? 0}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('reports.summary.totalStock')}
                  </Typography>
                  <Typography variant="body1">{reportData.totalStockQuantity ?? 0}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('reports.summary.totalStockValue')}
                  </Typography>
                  <Typography variant="body1">{formatCurrency(reportData.totalStockValue)}</Typography>
                </Grid>
              </Grid>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
                <Chip
                  label={`${t('reports.summary.inbound')}: ${reportData.movementCounts?.INBOUND ?? 0}`}
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`${t('reports.summary.outbound')}: ${reportData.movementCounts?.OUTBOUND ?? 0}`}
                  color="error"
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('reports.detailTitle')} />
            <CardContent>
              <TableContainer sx={{ maxHeight: 480 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('reports.table.product')}</TableCell>
                      <TableCell>{t('reports.table.warehouse')}</TableCell>
                      <TableCell align="right">{t('reports.table.stock')}</TableCell>
                      <TableCell align="right">{t('reports.table.unitPrice')}</TableCell>
                      <TableCell align="right">{t('reports.table.totalPrice')}</TableCell>
                      <TableCell align="right">{t('reports.table.totalBtw')}</TableCell>
                      <TableCell align="right">{t('reports.table.btwRate')}</TableCell>
                      <TableCell>{t('reports.table.lastMovement')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.items?.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.warehouseName}</TableCell>
                        <TableCell align="right">{item.stockQuantity}</TableCell>
                        <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(item.totalPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(item.totalBtwAmount)}</TableCell>
                        <TableCell align="right">{item.btwRate ?? 0}</TableCell>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="body2">
                              {item.lastMovementDate
                                ? new Date(item.lastMovementDate).toLocaleString(locale)
                                : t('common.notAvailable')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.lastMovementNote ?? t('common.notAvailable')}
                            </Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!reportData.items || reportData.items.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Typography align="center" color="text.secondary">
                            {t('reports.noItems')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
}

