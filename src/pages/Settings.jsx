import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  Grid
} from '@mui/material';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

export default function SettingsPage() {
  const { t, language, setLanguage } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('stoktakip-theme') === 'dark');

  useEffect(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('stoktakip-theme', mode);
    window.dispatchEvent(new CustomEvent('stoktakip-theme-change', { detail: { mode } }));
  }, [isDarkMode]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('settings.title')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={t('settings.languageCardTitle')} />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="language-label">{t('settings.languageLabel')}</InputLabel>
                <Select
                  labelId="language-label"
                  label={t('settings.languageLabel')}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                >
                  <MenuItem value="tr">Türkçe</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="nl">Nederlands</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                {t('settings.languageHint')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={t('settings.themeCardTitle')} />
            <CardContent>
              <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={(event) => setIsDarkMode(event.target.checked)} />}
                label={isDarkMode ? t('settings.darkModeLabel') : t('settings.lightModeLabel')}
              />
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                {t('settings.themeHint')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

