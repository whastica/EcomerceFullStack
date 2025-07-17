import { useState } from 'react';
import {Navbar} from '../../components/layout/navbar/Navbar';
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
      {/* Fondo geométrico animado - igual que en Home */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        
        {/* Elementos geométricos flotantes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar 
          cartItemCount={2}
        />
        
        <main className="flex-1">
          <Container padding="large">
            {/* Header con efectos especiales */}
            <div className="glass-effect rounded-xl p-8 mb-8 animate-glow animate-fade-in">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-dark-text text-shadow-glow">
                  🔥 Promociones Especiales
                </h1>
                <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                  Aprovecha nuestras ofertas exclusivas en productos gaming y tecnología
                </p>
                
                {/* Indicadores de ofertas limitadas */}
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <div className="glass-effect px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                    <span className="text-sm font-medium text-purple-400">
                      ⚡ Ofertas por tiempo limitado
                    </span>
                  </div>
                  <div className="glass-effect px-4 py-2 rounded-full border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                    <span className="text-sm font-medium text-blue-400">
                      🚚 Envío gratis
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Destacados especiales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-effect p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 animate-slide-up">
                <div className="text-center space-y-2">
                  <div className="text-3xl">💰</div>
                  <h3 className="text-lg font-semibold text-dark-text">Hasta 50% OFF</h3>
                  <p className="text-sm text-dark-muted">En productos seleccionados</p>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-center space-y-2">
                  <div className="text-3xl">🎮</div>
                  <h3 className="text-lg font-semibold text-dark-text">Gaming Zone</h3>
                  <p className="text-sm text-dark-muted">Equipos para gamers</p>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-center space-y-2">
                  <div className="text-3xl">⚡</div>
                  <h3 className="text-lg font-semibold text-dark-text">Flash Sales</h3>
                  <p className="text-sm text-dark-muted">Ofertas relámpago</p>
                </div>
              </div>
            </div>
            
            {/* Grid de productos */}
            <div className="glass-effect rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <ProductGrid products={promotions} productsPerPage={8} />
            </div>
          </Container>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}