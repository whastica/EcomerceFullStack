import { useState } from 'react';
import SearchBox from '@/components/layout/sidebar/sidebarComponents/SearchBox';
import PriceRangeSlider from '@/components/layout/sidebar/sidebarComponents/PriceRangeSlider';
import type { SidebarProps, FilterState } from './SidebarTypes';
import type { CategoryTypeWithCategories } from '@/services/categoryType.service';

const defaultFilterState: FilterState = {
  priceRange: [0, 5000000],
  searchTerm: '',
  sortBy: 'newest',
  categories: [],
};

export default function CatalogSidebar({
  isOpen,
  categoryTypes = [],
  filters,
  onFilterChange,
}: SidebarProps) {
  const activeFilters = filters ?? defaultFilterState;
  const [expandedTypes, setExpandedTypes] = useState<Set<number>>(new Set());

  const updateFilters = (updated: Partial<FilterState>) => {
    onFilterChange?.({ ...activeFilters, ...updated });
  };

  const clearFilters = () => {
    onFilterChange?.(defaultFilterState);
    setExpandedTypes(new Set());
  };

  const toggleExpand = (typeId: number) => {
    setExpandedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(typeId)) {
        next.delete(typeId);
      } else {
        next.add(typeId);
      }
      return next;
    });
  };

  const handleCategoryTypeToggle = (categoryType: CategoryTypeWithCategories) => {
    const allCategoryIds = categoryType.categories.map((c) => c.id);
    const allSelected = allCategoryIds.every((id) => activeFilters.categories.includes(id));

    if (allSelected) {
      // Deseleccionar: quitar categories y categoryType
      const newCategories = activeFilters.categories.filter((id) => !allCategoryIds.includes(id));
      updateFilters({ categories: newCategories, categoryType: undefined });
    } else {
      // Seleccionar: agregar categories y setear categoryType
      const newCategories = [...new Set([...activeFilters.categories, ...allCategoryIds])];
      updateFilters({ categories: newCategories, categoryType: categoryType.id });
    }
  };

  const handleCategoryToggle = (categoryId: number, categoryTypeId: number) => {
    const newCategories = activeFilters.categories.includes(categoryId)
      ? activeFilters.categories.filter((id) => id !== categoryId)
      : [...activeFilters.categories, categoryId];
    updateFilters({ categories: newCategories, categoryType: categoryTypeId });
  };

  const isCategoryTypeSelected = (categoryType: CategoryTypeWithCategories) => {
    return categoryType.categories.every((c) => activeFilters.categories.includes(c.id));
  };

  const isCategoryTypePartial = (categoryType: CategoryTypeWithCategories) => {
    const someSelected = categoryType.categories.some((c) => activeFilters.categories.includes(c.id));
    return someSelected && !isCategoryTypeSelected(categoryType);
  };

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
            Limpiar Filtros
          </button>
        </div>

        {/* Opción "Todos los productos" */}
        <div>
          <label className="flex items-center space-x-2 text-sm text-dark-text cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={activeFilters.categories.length === 0}
              onChange={() => updateFilters({ categories: [], categoryType: undefined })}
              className="form-checkbox text-accent focus:ring-2 focus:ring-offset-1 focus:ring-accent"
            />
            <span>Todos los productos</span>
          </label>
        </div>

        {/* Categorías jerárquicas */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-dark-text">Categorías</h3>
          <div className="space-y-1">
            {categoryTypes.map((categoryType) => {
              const isExpanded = expandedTypes.has(categoryType.id);
              const isSelected = isCategoryTypeSelected(categoryType);
              const isPartial = isCategoryTypePartial(categoryType);

              return (
                <div key={categoryType.id}>
                  {/* CategoryType header */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleExpand(categoryType.id)}
                      className="w-5 h-5 flex items-center justify-center text-dark-muted hover:text-dark-text transition-colors text-xs"
                      aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                    <label className="flex items-center space-x-2 text-sm text-dark-text cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isPartial;
                        }}
                        onChange={() => handleCategoryTypeToggle(categoryType)}
                        className="form-checkbox text-accent focus:ring-2 focus:ring-offset-1 focus:ring-accent"
                      />
                      <span className={isSelected || isPartial ? 'font-semibold' : ''}>
                        {categoryType.name}
                      </span>
                    </label>
                  </div>

                  {/* Sub-categorías (Categories) */}
                  {isExpanded && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {categoryType.categories.map((category) => (
                        <li key={category.id}>
                          <label className="flex items-center space-x-2 text-sm text-dark-muted cursor-pointer hover:text-dark-text transition-colors">
                            <input
                              type="checkbox"
                              checked={activeFilters.categories.includes(category.id)}
                              onChange={() => handleCategoryToggle(category.id, categoryType.id)}
                              className="form-checkbox text-accent focus:ring-2 focus:ring-offset-1 focus:ring-accent"
                            />
                            <span>{category.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Buscador */}
        <SearchBox
          value={activeFilters.searchTerm}
          onChange={(term) => updateFilters({ searchTerm: term })}
        />

        {/* Rango de precios */}
        <PriceRangeSlider
          value={activeFilters.priceRange}
          onChange={(min, max) => updateFilters({ priceRange: [min, max] })}
        />
      </div>
    </aside>
  );
}
