import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/footer';
import Container from '../../components/layout/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../components/products/ProductCard';

export default function PromotionsPage() {
  const [promotions] = useState<Product[]>([
    {
      id: 101,
      name: 'Combo Gamer: Teclado + Mouse RGB',
      price: 149000,
      imageUrl: '/assets/products/combo.webp',
      isAvailable: true,
      brand: 'Redragon',
    },
    {
      id: 102,
      name: 'Auriculares Logitech G435 Lightspeed',
      price: 279000,
      imageUrl: '/assets/products/auriculares.webp',
      isAvailable: true,
      brand: 'Logitech',
    },
    {
      id: 103,
      name: 'Monitor curvo 24” Samsung 75Hz',
      price: 569000,
      imageUrl: '/assets/products/monitorC.webp',
      isAvailable: true,
      brand: 'Samsung',
    },
    {
      id: 104,
      name: 'Silla Gamer Reclinable Roja',
      price: 849000,
      imageUrl: '/assets/products/silla.webp',
      isAvailable: false,
      brand: 'Xtreme',
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartItemCount={2}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Juan"
      />

      <main className="flex-1">
        <Container padding="large">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Promociones Especiales</h1>
          <ProductGrid products={promotions} productsPerPage={8} />
        </Container>
      </main>

      <Footer />
    </div>
  );
}