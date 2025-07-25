import { useState } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../components/products/ProductCard';
import { FilterState } from '../../components/layout/sidebar/SidebarTypes';

export default function ProductsPage() {
  const [isSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000000],
    searchTerm: '',
    sortBy: 'newest',
    categories: [], // ✅ Añadido
  });

  const exampleProducts: Product[] = [
    { id: 1, name: 'NVIDIA RTX 4070 Ti', price: 3400000, imageUrl: '/assets/products/rtx-4070.png', isAvailable: true, brand: 'NVIDIA' },
    { id: 2, name: 'Procesador AMD Ryzen 7 5800X', price: 999000, imageUrl: '/assets/products/ryzen-7.png', isAvailable: true, brand: 'AMD' },
    { id: 3, name: 'SSD NVMe Samsung 980 PRO 1TB', price: 520000, imageUrl: '/assets/products/SSD.png', isAvailable: false, brand: 'Samsung' },
    { id: 4, name: 'Memoria RAM Corsair Vengeance RGB Pro 16GB', price: 340000, imageUrl: '/assets/products/memoriaram.png', isAvailable: true, brand: 'Corsair' },
    { id: 5, name: 'Tarjeta Madre ASUS ROG STRIX B550-F', price: 740000, imageUrl: '/assets/products/board-asus.png', isAvailable: true, brand: 'ASUS' },
    { id: 6, name: 'Monitor LG UltraGear 27" 144Hz', price: 1180000, imageUrl: '/assets/products/monitor.png', isAvailable: true, brand: 'LG' },
    { id: 7, name: 'Fuente de Poder EVGA 750W 80+ Gold', price: 420000, imageUrl: '/assets/products/fuente_poder.png', isAvailable: true, brand: 'EVGA' },
    { id: 8, name: 'Case NZXT H510 Flow', price: 370000, imageUrl: '/assets/products/case.png', isAvailable: false, brand: 'NZXT' },
  ];

  const categories = [
    { id: 1, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', productCount: 18 },
    { id: 2, name: 'Procesadores', slug: 'procesadores', productCount: 12 },
    { id: 3, name: 'SSD', slug: 'almacenamiento-ssd', productCount: 6 },
    { id: 4, name: 'RAM', slug: 'memorias-ram', productCount: 10 },
    { id: 5, name: 'Tarjetas Madre', slug: 'tarjetas-madre', productCount: 8 },
    { id: 6, name: 'Monitores', slug: 'monitores', productCount: 7 },
  ];

  const getFilteredAndSortedProducts = () => {
    let filtered = exampleProducts.filter((product) => {
      const isDefaultPrice = filters.priceRange[0] === 0 && filters.priceRange[1] === 5000000;
      const matchesPrice = isDefaultPrice || (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

      const matchesSearch =
        !filters.searchTerm.trim() ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 || // si no hay categorías seleccionadas, mostrar todo
        filters.categories.some((catId) => {
          const category = categories.find((c) => c.id === catId);
          if (!category) return false;
          return product.name.toLowerCase().includes(category.name.toLowerCase());
        });

      return matchesPrice && matchesSearch && matchesCategory;
    });

    switch (filters.sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => a.id - b.id);
        break;
      case 'price-asc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">

      {/* Fondo decorativo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)',
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          type="catalog"
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />

        <main className="flex-1">
          <Container padding="large">
            {/* Encabezado + Ordenamiento en un solo bloque */}
            <div className="rounded-xl p-6 mb-8 animate-fade-in border border-[#666] bg-[#4D4D4D] max-w-6xl mx-auto">
              {/* Título y descripción */}
              <h1 className="text-3xl font-bold text-dark-text mb-2 text-shadow-glow">
                Todos los productos
              </h1>

              {/* Barra de ordenamiento */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-dark-muted text-sm">
                  Mostrar 1 – {Math.min(8, filteredProducts.length)} de {filteredProducts.length} resultados
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-dark-muted text-sm">Ordenar por:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                    }
                    className="bg-dark-card border border-dark-border rounded px-3 py-1 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-[#FB5607]"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="glass-effect rounded-xl p-6 animate-slide-up">
              <ProductGrid products={filteredProducts} productsPerPage={8} />
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}