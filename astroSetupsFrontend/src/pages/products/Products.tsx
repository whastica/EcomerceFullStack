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
      name: 'Monitor LG UltraGear 27” 144Hz',
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartItemCount={2}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Juan"
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          type="catalog"
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />

        <main className="flex-1">
          <Container padding="large">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Productos disponibles</h1>
            <ProductGrid products={filteredProducts} productsPerPage={8} />
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}