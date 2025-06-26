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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar 
        cartItemCount={2}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Juan"
      />

      <main className="flex-1">
        <Container padding="large">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-200">
              🎉 Promociones Especiales
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-200">
              Descubre nuestras mejores ofertas en productos gaming y tecnología
            </p>
          </div>

          {/* Promotion Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 
                          rounded-lg p-6 mb-8 text-white shadow-lg transition-all duration-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">¡Ofertas Limitadas!</h2>
                <p className="text-purple-100 dark:text-purple-200">
                  Hasta 50% de descuento en productos seleccionados
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">Válido hasta fin de mes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter/Sort Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
                          mb-6 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                          border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Mostrando {promotions.length} productos en oferta
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                               rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               transition-colors duration-200">
                <option>Ordenar por precio</option>
                <option>Menor a mayor</option>
                <option>Mayor a menor</option>
                <option>Más populares</option>
              </select>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 
                                 dark:hover:text-purple-400 transition-colors duration-200"
                        title="Vista en grilla">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 
                                 dark:hover:text-purple-400 transition-colors duration-200"
                        title="Vista en lista">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={promotions} productsPerPage={8} />

          {/* Call to Action Section */}
          <div className="mt-12 text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg 
                          border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-200">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-200">
              Explora nuestro catálogo completo con más de 500 productos gaming
            </p>
            <button className="btn-gradient px-6 py-3 text-lg">
              Ver Catálogo Completo
            </button>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}