import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/footer';
import Container from '../../components/layout/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../components/products/ProductCard';

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  availability: 'all' | 'inStock' | 'outOfStock';
}

export default function ProductsPage() {
  const [isSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    brands: [],
    availability: 'all'
  });

  // TODO: reemplazar con datos reales de la API
  const exampleProducts: Product[] = [
    {
      id: 1,
      name: 'NVIDIA RTX 4070 Ti',
      price: 3400000,
      imageUrl: '/assets/products/rtx-4070.webp',
      isAvailable: true,
      brand: 'NVIDIA'
    },
    {
      id: 2,
      name: 'Procesador AMD Ryzen 7 5800X',
      price: 999000,
      imageUrl: '/assets/products/ryzen-7.webp',
      isAvailable: true,
      brand: 'AMD'
    },
    {
      id: 3,
      name: 'SSD NVMe Samsung 980 PRO 1TB',
      price: 520000,
      imageUrl: '/assets/products/SSD.webp',
      isAvailable: false,
      brand: 'Samsung'
    },
    {
      id: 4,
      name: 'Memoria RAM Corsair Vengeance RGB Pro 16GB',
      price: 340000,
      imageUrl: '/assets/products/memoriaram.webp',
      isAvailable: true,
      brand: 'Corsair'
    },
    {
      id: 5,
      name: 'Tarjeta Madre ASUS ROG STRIX B550-F',
      price: 740000,
      imageUrl: '/assets/products/board-asus.webp',
      isAvailable: true,
      brand: 'ASUS'
    },
    {
      id: 6,
      name: 'Monitor LG UltraGear 27" 144Hz',
      price: 1180000,
      imageUrl: '/assets/products/monitor.webp',
      isAvailable: true,
      brand: 'LG'
    },
    {
      id: 7,
      name: 'Fuente de Poder EVGA 750W 80+ Gold',
      price: 420000,
      imageUrl: '/assets/products/fuente_poder.webp',
      isAvailable: true,
      brand: 'EVGA'
    },
    {
      id: 8,
      name: 'Case NZXT H510 Flow',
      price: 370000,
      imageUrl: '/assets/products/case.webp',
      isAvailable: false,
      brand: 'NZXT'
    }
  ];

  // TODO: aplicar filtros a products en el futuro
  const filteredProducts = exampleProducts;

  const categories = [
    { id: 1, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', productCount: 18 },
    { id: 2, name: 'Procesadores', slug: 'procesadores', productCount: 12 },
    { id: 3, name: 'SSD', slug: 'almacenamiento-ssd', productCount: 6 },
    { id: 4, name: 'RAM', slug: 'memorias-ram', productCount: 10 },
    { id: 5, name: 'Tarjetas Madre', slug: 'tarjetas-madre', productCount: 8 },
    { id: 6, name: 'Monitores', slug: 'monitores', productCount: 7 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navbar con soporte para tema */}
      <Navbar 
        cartItemCount={2}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Juan"
      />

      <div className="flex flex-1">
        {/* Sidebar con soporte para tema */}
        <Sidebar
          isOpen={isSidebarOpen}
          type="catalog"
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Main content con tema adaptativo */}
        <main className="flex-1 bg-white dark:bg-gray-900 transition-colors duration-200">
          <Container padding="large">
            {/* Header con tema */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                Productos disponibles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Encuentra los mejores productos de tecnología para tu setup
              </p>
            </div>

            {/* Filtros rápidos */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200">
                  Todos los productos
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  En stock
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  Ofertas
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  Más vendidos
                </button>
              </div>
            </div>

            {/* Información de resultados */}
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Mostrando {filteredProducts.length} productos
              </div>
              
              {/* Selector de orden */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                  Ordenar por:
                </span>
                <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200">
                  <option value="name">Nombre A-Z</option>
                  <option value="price-low">Precio menor a mayor</option>
                  <option value="price-high">Precio mayor a menor</option>
                  <option value="newest">Más recientes</option>
                </select>
              </div>
            </div>

            {/* Grid de productos */}
            <ProductGrid products={filteredProducts} productsPerPage={8} />

            {/* Sección de información adicional */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                ¿Por qué elegirnos?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                    Calidad garantizada
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Todos nuestros productos son originales y cuentan con garantía oficial
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                    Envío rápido
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Entrega en 24-48 horas en la mayoría de ubicaciones
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                    Soporte técnico
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Nuestro equipo técnico está disponible para ayudarte
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>

      {/* Footer con soporte para tema */}
      <Footer />
    </div>
  );
}