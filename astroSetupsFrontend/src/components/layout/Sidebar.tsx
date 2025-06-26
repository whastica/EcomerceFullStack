import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  availability: 'all' | 'inStock' | 'outOfStock';
}

interface SidebarProps {
  isOpen: boolean;
  type?: 'catalog' | 'admin';
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    productCount?: number;
  }>;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export default function Sidebar({ 
  isOpen, 
  type = 'catalog',
  categories = [],
  filters,
  onFilterChange 
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters?.priceRange || [0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(filters?.brands || []);
  const [availability, setAvailability] = useState<'all' | 'inStock' | 'outOfStock'>(filters?.availability || 'all');

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    onFilterChange?.({ priceRange: [min, max], brands: selectedBrands, availability });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange?.({ priceRange, brands: newBrands, availability });
  };

  const handleAvailabilityChange = (value: 'all' | 'inStock' | 'outOfStock') => {
    setAvailability(value);
    onFilterChange?.({ priceRange, brands: selectedBrands, availability: value });
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
    setAvailability('all');
    onFilterChange?.({ priceRange: [0, 10000], brands: [], availability: 'all' });
  };

  // Sidebar de catálogo (desktop)
  if (type === 'catalog') {
    return (
      <div className={`w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-colors duration-200 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
              Filtros
            </h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
            >
              Limpiar
            </button>
          </div>

          {/* Categorías */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-200">
              Categorías
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog/${category.slug}`}
                  className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 py-1 transition-colors duration-200"
                >
                  <span>{category.name}</span>
                  {category.productCount && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-200">
                      ({category.productCount})
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-200">
              Rango de Precio
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                         [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
                         [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-purple-600 
                         [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-200">
              Disponibilidad
            </h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'Todos los productos' },
                { value: 'inStock', label: 'Próximamente' },
                { value: 'outOfStock', label: 'Agotado' }
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={availability === option.value}
                    onChange={() => handleAvailabilityChange(option.value as 'all' | 'inStock' | 'outOfStock')}
                    className="mr-2 text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400 
                             bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Marcas */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-200">
              Marcas
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {['NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Logitech'].map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="mr-2 text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400 
                             bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                             rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar administrativo
  if (type === 'admin') {
    return (
      <div className={`w-64 bg-gray-900 dark:bg-gray-950 text-white overflow-y-auto transition-colors duration-200 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Panel Admin</h2>
          </div>
          
          <nav className="space-y-2">
            <Link to="/admin/dashboard" className="admin-nav-link">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link">📦 Productos</Link>
            <Link to="/admin/orders" className="admin-nav-link">📋 Pedidos</Link>
            <Link to="/admin/users" className="admin-nav-link">👥 Usuarios</Link>
            <Link to="/admin/promotions" className="admin-nav-link">🎉 Promociones</Link>
            <Link to="/admin/reports" className="admin-nav-link">📈 Reportes</Link>
          </nav>
        </div>
      </div>
    );
  }

  return null;
}