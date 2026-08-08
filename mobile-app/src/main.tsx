import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#171A21',
            border: '1px solid #1E2128',
            color: '#F3F5F7',
            fontFamily: "'Inter Variable', Inter, system-ui, sans-serif",
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
