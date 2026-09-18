import { StrictMode, useEffect } from 'react';

import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import './styles/global.css';
import './styles/admin.css';

import App from './App';

import { CartProvider } from './pages/cart/Cart';

import { Toaster } from 'sonner';

import { queryClient } from './lib/react-query';

import { useAuthStore } from './stores/authStore';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <CartProvider>

        <BrowserRouter>

          <AuthInitializer>

            <App />

            <Toaster
              richColors
              position="top-center"
            />

          </AuthInitializer>

        </BrowserRouter>

      </CartProvider>

    </QueryClientProvider>

  </StrictMode>
);