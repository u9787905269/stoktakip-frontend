import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  TextField
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import { fetchRecentStockMovements } from '../services/stockMovementService';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

const formatDateTime = (value, locale) => new Date(value).toLocaleString(locale);
const formatDateInput = (date) => date.toISOString().split('T')[0];
const subtractDays = (date, days) => {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() - days);
  return clone;
};

export default function DashboardPage() {
  const { t, locale } = useTranslation();
  const today = useMemo(() => new Date(), []);
  const [startDate, setStartDate] = useState(formatDateInput(subtractDays(today, 7)));
  const [endDate, setEndDate] = useState(formatDateInput(today));

  const {
    data: products = [],
    isLoading: isProductsLoading
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60
  });

  const {
    data: recentMovements = [],
    isLoading: isMovementsLoading
  } = useQuery({
    queryKey: ['recent-stock-movements'],
    queryFn: () => fetchRecentStockMovements(100),
    staleTime: 1000 * 60
  });

  const filteredMovements = useMemo(() => {
    if (!recentMovements.length) {
      return [];
    }
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(23, 59, 59, 999);
    }
    return recentMovements.filter((movement) => {
      if (!movement.movementDate) {
        return false;
      }
      const movementDate = new Date(movement.movementDate);
      if (Number.isNaN(movementDate.getTime())) {
        return false;
      }
      if (start && movementDate < start) {
        return false;
      }
      if (end && movementDate > end) {
        return false;
      }
      return true;
    });
  }, [recentMovements, startDate, endDate]);

  const summaryCards = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + (product.stockQuantity ?? 0), 0);
    const last24HoursCount = recentMovements.filter((movement) => {
      if (!movement.movementDate) return false;
      const movementTs = new Date(movement.movementDate).getTime();
      return Date.now() - movementTs <= 24 * 60 * 60 * 1000;
    }).length;

    return [
      {
        title: t('dashboard.cards.totalProducts.title'),
        value: totalProducts,
        description: t('dashboard.cards.totalProducts.description')
      },
      {
        title: t('dashboard.cards.totalStock.title'),
        value: totalStock,
        description: t('dashboard.cards.totalStock.description')
      },
      {
        title: t('dashboard.cards.last24Hours.title'),
        value: last24HoursCount,
        description: t('dashboard.cards.last24Hours.description')
      }
    ];
  }, [products, recentMovements, t]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t('dashboard.subtitle')}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {summaryCards.map((card) => (
          <Grid item xs={12} md={4} key={card.title}>
            <Card>
              <CardContent>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {isProductsLoading && card.title !== t('dashboard.cards.last24Hours.title')
                    ? '...'
                    : Number(card.value ?? 0).toLocaleString(locale)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('dashboard.recentMovements.title')}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label={t('dashboard.filters.startDate')}
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label={t('dashboard.filters.endDate')}
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
          {isMovementsLoading ? (
            <LinearProgress />
          ) : filteredMovements.length > 0 ? (
            <List>
              {filteredMovements.slice(0, 10).map((movement) => (
                <ListItem key={movement.id} disablePadding sx={{ py: 1 }}>
                  <ListItemText
                    primary={`${movement.productName ?? t('dashboard.recentMovements.unknownProduct')} · ${movement.quantity} ${t('products.table.stockQuantity')}`}
                    secondary={`${formatDateTime(movement.movementDate, locale)} · ${
                      movement.warehouseName ?? t('dashboard.recentMovements.unknownWarehouse')
                    }${movement.note ? ` · ${movement.note}` : ''}`}
                  />
                  <Chip
                    label={
                      movement.type === 'INBOUND'
                        ? t('dashboard.recentMovements.inbound')
                        : t('dashboard.recentMovements.outbound')
                    }
                    color={movement.type === 'INBOUND' ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.recentMovements.empty')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

