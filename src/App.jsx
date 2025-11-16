import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DashboardPage from './pages/Dashboard.jsx';
import ProductsPage from './pages/Products.jsx';
import ReportsPage from './pages/Reports.jsx';
import SettingsPage from './pages/Settings.jsx';
import BarcodePage from './pages/BarcodePage.jsx';
import AppLayout from './components/AppLayout.jsx';
import { LanguageProvider } from './i18n/LanguageProvider.jsx';

export default function App() {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('stoktakip-theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    return 'light';
  });

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.mode) {
        setMode(event.detail.mode);
      }
    };
    window.addEventListener('stoktakip-theme-change', handler);
    return () => window.removeEventListener('stoktakip-theme-change', handler);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                primary: { main: '#90caf9' },
                secondary: { main: '#ce93d8' },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e'
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#e0e0e0'
                }
              }
            : {
                primary: { main: '#2563eb' },
                secondary: { main: '#6366f1' }
              })
        },
        shape: {
          borderRadius: 12
        }
      }),
    [mode]
  );

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/barcode" element={<BarcodePage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ThemeProvider>
    </LanguageProvider>
  );
}

