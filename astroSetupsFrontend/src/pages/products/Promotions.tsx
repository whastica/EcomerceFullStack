import { useState } from 'react';
import Container from '../../components/layout/container/Container';
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
      name: 'Monitor curvo 24" Samsung 75Hz',
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
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text flex flex-col relative">
      {/* Fondo decorativo animado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Capas base */}
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>

        {/* Degradado gris claro en diagonal hacia la parte superior derecha */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 0%, #f3f4f6 200%)`,
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <main className="flex-1">
          <Container padding="large">
            {/* Encabezado con efectos */}
            <div className="glass-effect rounded-xl p-8 mb-8 animate-glow animate-fade-in">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-dark-text text-shadow-glow">
                  🔥 Promociones Especiales
                </h1>
                <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                  Aprovecha nuestras promociones especiales y consigue lo que quieres al mejor precio.
                </p>
                <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                  Aquí verás todos los productos disponibles con descuentos exclusivos, envío inmediato y por tiempo limitado.
                </p>
              </div>
            </div>

            {/* Grid de productos */}
            <div
              className="glass-effect rounded-xl p-6 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <ProductGrid products={promotions} productsPerPage={8} />
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}