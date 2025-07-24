import { useSidebarFilters } from '@/hooks/useSidebarFilters';
import SearchBox from '@/components/layout/sidebar/sidebarComponents/SearchBox';
import PriceRangeSlider from '@/components/layout/sidebar/sidebarComponents/PriceRangeSlider';
import type { SidebarProps } from './SidebarTypes';

export default function CatalogSidebar({
  isOpen,
  categories = [],
  filters: initialFilters,
  onFilterChange,
}: SidebarProps) {
  const { filters, updateFilters, clearFilters } = useSidebarFilters(initialFilters, onFilterChange);

  return (
    <aside
      className={`w-full lg:w-64 glass-effect border-r border-dark-border overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}
      role="complementary"
      aria-label="Filtros de productos"
    >
      <div className="p-4 space-y-6">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="text-sm text-[#FB5607] hover:text-orange-300 transition-colors focus:outline-none"
            aria-label="Limpiar filtros"
          >
            Limpiar Filtro
          </button>
        </div>

        {/* Lista de categorías (inline) */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-dark-text">Categorías</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <label className="flex items-center space-x-2 text-sm text-dark-text">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => {
                      const newCategories = filters.categories.includes(category.id)
                        ? filters.categories.filter((id) => id !== category.id)
                        : [...filters.categories, category.id];
                      updateFilters({ categories: newCategories });
                    }}
                    className="form-checkbox text-accent focus:ring-2 focus:ring-offset-1 focus:ring-accent"
                  />
                  <span>{category.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Buscador */}
        <SearchBox value={filters.searchTerm} onChange={(term) => updateFilters({ searchTerm: term })} />

        {/* Rango de precios */}
        <PriceRangeSlider
          value={filters.priceRange}
          onChange={(min, max) => updateFilters({ priceRange: [min, max] })}
        />
      </div>
    </aside>
  );
}