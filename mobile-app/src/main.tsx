import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import App from './App';
import './index.css';

// Step 10: Add mobile performance mode class
if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
  document.body.classList.add('mobile-performance');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#151821',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#F8FAFC',
            fontFamily: "'Inter Variable', Inter, system-ui, sans-serif",
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
