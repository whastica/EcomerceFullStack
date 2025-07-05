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

  if (type === 'catalog') {
    return (
      <div className={`w-64 bg-[#1E1E1E] shadow-lg border-r border-gray-800 overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Filtros</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Limpiar
            </button>
          </div>

          {/* Categorías */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products`}
                  className="flex justify-between items-center text-sm text-gray-300 hover:text-purple-400 py-1"
                >
                  <span>{category.name}</span>
                  {category.productCount && (
                    <span className="text-gray-500 text-xs">({category.productCount})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Rango de Precio</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500">
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
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Disponibilidad</h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'Todos los productos' },
                { value: 'inStock', label: 'Próximamente' },
                { value: 'outOfStock', label: 'Agotado' }
              ].map((option) => (
                <label key={option.value} className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={availability === option.value}
                    onChange={() => handleAvailabilityChange(option.value as 'all' | 'inStock' | 'outOfStock')}
                    className="mr-2 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marcas */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Marcas</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {['NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Logitech'].map((brand) => (
                <label key={brand} className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="mr-2 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'admin') {
    return (
      <div className={`w-64 bg-[#1E1E1E] text-white overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Panel Admin</h2>
          </div>
          <nav className="space-y-2">
            <Link to="/admin/dashboard" className="text-gray-300 hover:text-purple-400">📊 Dashboard</Link>
            <Link to="/admin/products" className="text-gray-300 hover:text-purple-400">📦 Productos</Link>
            <Link to="/admin/orders" className="text-gray-300 hover:text-purple-400">📋 Pedidos</Link>
            <Link to="/admin/users" className="text-gray-300 hover:text-purple-400">👥 Usuarios</Link>
            <Link to="/admin/promotions" className="text-gray-300 hover:text-purple-400">🎉 Promociones</Link>
            <Link to="/admin/reports" className="text-gray-300 hover:text-purple-400">📈 Reportes</Link>
          </nav>
        </div>
      </div>
    );
  }

  return null;
}