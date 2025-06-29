import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ProductsPage from './pages/products/Products';
import PromotionsPage from './pages/products/Promotions';
import ProductDetailPage from './pages/products/ProductDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/promotions" element={<PromotionsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}
