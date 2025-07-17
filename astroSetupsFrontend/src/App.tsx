import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home/Home';
import ProductsPage from './pages/products/Products';
import PromotionsPage from './pages/products/Promotions';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';

export default function App() {
  useEffect(() => {
    // Forzar tema oscuro al cargar la aplicación
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    // Aplicar estilos directamente al body y html
    document.body.style.backgroundColor = '#010101';
    document.body.style.color = '#FFFFFF';
    document.documentElement.style.backgroundColor = '#010101';
    document.documentElement.style.color = '#FFFFFF';
    
    // Crear un observer para asegurar que el tema oscuro se mantenga
    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
      }
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
      }
      
      // Volver a aplicar estilos si se pierden
      if (document.body.style.backgroundColor !== 'rgb(1, 1, 1)') {
        document.body.style.backgroundColor = '#010101';
        document.body.style.color = '#FFFFFF';
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Cleanup function
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-background text-dark-text">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductsPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}