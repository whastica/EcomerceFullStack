import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/global.css';
import App from './App';
import { CartProvider } from './pages/cart/Cart'; 

import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
        <Toaster richColors position="top-center" /> 
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);