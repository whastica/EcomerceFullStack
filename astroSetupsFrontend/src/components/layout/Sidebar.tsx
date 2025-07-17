
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FilterState {
  priceRange: [number, number];
  searchTerm: string;
  sortBy: 'newest' | 'oldest' | 'price-asc' | 'price-desc';
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
  const [priceRange, setPriceRange] = useState<[number, number]>(filters?.priceRange || [0, 5000000]);
  const [searchTerm, setSearchTerm] = useState<string>(filters?.searchTerm || '');

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    onFilterChange?.({ 
      priceRange: [min, max], 
      searchTerm, 
      sortBy: filters?.sortBy || 'newest' 
    });
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    onFilterChange?.({ 
      priceRange, 
      searchTerm: term, 
      sortBy: filters?.sortBy || 'newest' 
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 5000000]);
    setSearchTerm('');
    onFilterChange?.({ 
      priceRange: [0, 5000000], 
      searchTerm: '', 
      sortBy: 'newest' 
    });
  };

  if (type === 'catalog') {
    return (
      <div className={`w-64 glass-effect border-r border-dark-border overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-dark-text">Filtros</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-[#FB5607] hover:text-orange-300 transition-colors"
            >
              Limpiar
            </button>
          </div>

          {/* Buscador */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-dark-text mb-3">Buscar productos</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre o marca..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-[#FB5607] focus:border-transparent"
              />
              <svg 
                className="absolute right-3 top-2.5 w-4 h-4 text-dark-muted" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categorías */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-dark-text mb-3">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products`}
                  className="flex justify-between items-center text-sm text-dark-muted hover:text-[#FB5607] transition-colors py-1"
                >
                  <span>{category.name}</span>
                  {category.productCount && (
                    <span className="text-dark-muted text-xs">({category.productCount})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-dark-text mb-3">Rango de Precio</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-dark-muted">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
              
              {/* Slider para precio mínimo */}
              <div className="space-y-2">
                <label className="text-xs text-dark-muted">Precio mínimo</label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
                  className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider-thumb-orange"
                  style={{
                    background: `linear-gradient(to right, #FB5607 0%, #FB5607 ${(priceRange[0] / 5000000) * 100}%, #374151 ${(priceRange[0] / 5000000) * 100}%, #374151 100%)`
                  }}
                />
              </div>
              
              {/* Slider para precio máximo */}
              <div className="space-y-2">
                <label className="text-xs text-dark-muted">Precio máximo</label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                  className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider-thumb-orange"
                  style={{
                    background: `linear-gradient(to right, #FB5607 0%, #FB5607 ${(priceRange[1] / 5000000) * 100}%, #374151 ${(priceRange[1] / 5000000) * 100}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'admin') {
    return (
      <div className={`w-64 glass-effect border-r border-dark-border text-dark-text overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Panel Admin</h2>
          </div>
          
          <nav className="space-y-2">
            <Link to="/admin/dashboard" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              📊 Dashboard
            </Link>
            <Link to="/admin/products" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              📦 Productos
            </Link>
            <Link to="/admin/orders" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              📋 Pedidos
            </Link>
            <Link to="/admin/users" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              👥 Usuarios
            </Link>
            <Link to="/admin/promotions" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              🎉 Promociones
            </Link>
            <Link to="/admin/reports" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
              📈 Reportes
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  return null;
}