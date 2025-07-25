import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Navbar } from './components/layout/navbar/Navbar';
import Home from './pages/home/Home';
import ProductsPage from './pages/products/Products';
import PromotionsPage from './pages/products/Promotions';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import Footer from './components/layout/footer/footer';
import Login from './pages/login/Login';

export default function App() {
  const faqRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');

    document.body.style.backgroundColor = '#010101';
    document.body.style.color = '#FFFFFF';
    document.documentElement.style.backgroundColor = '#010101';
    document.documentElement.style.color = '#FFFFFF';

    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
      }
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
      }

      if (document.body.style.backgroundColor !== 'rgb(1, 1, 1)') {
        document.body.style.backgroundColor = '#010101';
        document.body.style.color = '#FFFFFF';
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Si llegamos a la página con /#faq, hacer scroll al elemento
    if (location.pathname === '/' && location.hash === '#faq') {
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Pequeño delay para esperar al render del DOM
    }
  }, [location]);

  return (
    <>
      <Navbar onFAQClick={scrollToFAQ} />
      <div className="min-h-screen bg-dark-background text-dark-text">
        <Routes>
          <Route path="/" element={<Home faqRef={faqRef} />} />
          <Route path="/catalog" element={<ProductsPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}