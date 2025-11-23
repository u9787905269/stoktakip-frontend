import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack, GlobalStyles } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import jsBarcode from 'jsbarcode';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BarcodePage() {
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const shouldAutoPrint = location.state?.autoPrint ?? false;
  const barcodeValue = query.get('value') ?? '';
  const productName = query.get('name') ?? '';
  const svgRef = useRef(null);
  const hasAutoPrintedRef = useRef(false);

  useEffect(() => {
    if (svgRef.current && barcodeValue) {
      jsBarcode(svgRef.current, barcodeValue, {
        format: 'CODE128',
        displayValue: true,
        height: 120,
        margin: 10
      });
    }
    if (shouldAutoPrint && !hasAutoPrintedRef.current && barcodeValue) {
      hasAutoPrintedRef.current = true;
      setTimeout(() => {
        window.print();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeValue]);

  const handleDownload = () => {
    if (!svgRef.current || !barcodeValue) {
      return;
    }
    const svgNode = svgRef.current;
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${barcodeValue}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!svgRef.current || !barcodeValue) {
      return;
    }

    window.print();
  };

  return (
    <>
      <GlobalStyles
        styles={{
          '@media print': {
            body: {
              margin: 0,
              backgroundColor: '#fff'
            },
            '#barcode-page-root': {
              boxShadow: 'none',
              border: 'none',
              maxWidth: '100%',
              padding: '20px',
              margin: '0 auto'
            },
            '.no-print': {
              display: 'none !important'
            }
          }
        }}
      />
      <Box id="barcode-page-root" sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Button
          className="no-print"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          {t('barcode.back')}
        </Button>
        <Typography variant="h5" gutterBottom>
          {productName || t('barcode.titleFallback')}
        </Typography>
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'background.paper'
          }}
        >
          {barcodeValue ? (
            <>
              <svg ref={svgRef} />
              <Typography variant="caption" color="text.secondary">
                {barcodeValue}
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary">{t('barcode.notFound')}</Typography>
          )}
        </Box>

        <Stack className="no-print" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            disabled={!barcodeValue}
          >
            {t('barcode.print')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!barcodeValue}
          >
            {t('barcode.download')}
          </Button>
        </Stack>
      </Box>
    </>
  );
}


