import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

// Production debug utility (sadece production'da)
if (import.meta.env.MODE === 'production') {
  import('./utils/debug.js').then(module => {
    console.log('🔍 Debug utility loaded. Run window.debugApp() in console for detailed diagnostics.');
  });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

