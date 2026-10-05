import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Navbar } from './components/layout/navbar/Navbar';
import PromoBanner from './components/home/PromoBanner';
import Home from './pages/home/Home';
import ProductsPage from './pages/products/Products';
import PromotionsPage from './pages/products/Promotions';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import Footer from './components/layout/footer/footer';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Contact from './pages/login/Contact';
import CheckoutPage from './pages/checkout/CheckoutPage';
import PrivacyPolicies from './pages/privacyPolicies';
import Conditions from './pages/conditions';
import CustomPCPage from './pages/products/CustomPCPage';
import TrackingPage from './pages/tracking/TrackingPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  const faqRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#faq') {
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  if (isAdminRoute) {
    return (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    );
  }

  return (
    <>
      {isHome && <PromoBanner />}
      <Navbar onFAQClick={scrollToFAQ} />
      <div className="min-h-screen bg-app-gradient text-dark-text">
        <Routes>
          <Route path="/" element={<Home faqRef={faqRef} />} />
          <Route path="/catalog" element={<ProductsPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/custom-pc" element={<CustomPCPage />} />
          <Route path="/privacy-policies" element={<PrivacyPolicies />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}