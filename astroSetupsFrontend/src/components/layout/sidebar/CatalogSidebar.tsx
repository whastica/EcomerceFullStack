import { useEffect, useState } from 'react';
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

/* Indicador circular (estilo radio button) */
function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
        active ? 'border-brand' : 'border-dark-soft group-hover:border-dark-muted'
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
    </span>
  );
}

export default function CatalogSidebar({
  isOpen,
  categoryTypes = [],
  filters,
  onFilterChange,
}: SidebarProps) {
  const activeFilters = filters ?? defaultFilterState;
  const [expandedTypeId, setExpandedTypeId] = useState<number | null>(null);

  const selectedCategoryId =
    activeFilters.categories.length === 1 ? activeFilters.categories[0] : undefined;
  const isAllSelected =
    activeFilters.categories.length === 0 && activeFilters.categoryType === undefined;

  // Si el filtro llega desde la URL (home / enlaces), desplegar su grupo
  useEffect(() => {
    if (activeFilters.categoryType != null) {
      setExpandedTypeId(activeFilters.categoryType);
      return;
    }
    if (selectedCategoryId != null) {
      const parent = categoryTypes.find((ct) =>
        ct.categories.some((c) => c.id === selectedCategoryId)
      );
      setExpandedTypeId(parent ? parent.id : null);
    }
  }, [activeFilters.categoryType, selectedCategoryId, categoryTypes]);

  const updateFilters = (updated: Partial<FilterState>) => {
    onFilterChange?.({ ...activeFilters, ...updated });
  };

  const clearFilters = () => {
    onFilterChange?.(defaultFilterState);
    setExpandedTypeId(null);
  };

  /* "Todos los productos" → catálogo completo, desmarca todo lo demás */
  const handleSelectAll = () => {
    if (isAllSelected) return;
    updateFilters({ categories: [], categoryType: undefined });
    setExpandedTypeId(null);
  };

  /* Selección exclusiva sobre una categoría principal */
  const handleTypeSelect = (categoryType: CategoryTypeWithCategories) => {
    const alreadySelected =
      activeFilters.categoryType === categoryType.id && selectedCategoryId === undefined;

    if (alreadySelected) {
      setExpandedTypeId((prev) => (prev === categoryType.id ? null : categoryType.id));
      return;
    }

    updateFilters({ categories: [], categoryType: categoryType.id });
    setExpandedTypeId(categoryType.id);
  };

  /* Selección exclusiva sobre una subcategoría */
  const handleSubSelect = (categoryId: number, typeId: number) => {
    const alreadySelected = selectedCategoryId === categoryId;

    if (alreadySelected) {
      updateFilters({ categories: [], categoryType: undefined });
      return;
    }

    updateFilters({ categories: [categoryId], categoryType: undefined });
    setExpandedTypeId(typeId);
  };

  return (
    <aside
      className={`w-full lg:w-64 border-r border-dark-border overflow-y-auto transition-all duration-300 ease-in-out ${
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
            className="text-sm text-brand hover:text-brand-light transition-colors focus:outline-none"
            aria-label="Limpiar filtros"
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Opción "Todos los productos" */}
        <button
          type="button"
          onClick={handleSelectAll}
          aria-pressed={isAllSelected}
          className="group w-full flex items-center gap-2.5 text-sm cursor-pointer text-left"
        >
          <RadioDot active={isAllSelected} />
          <span
            className={`${
              isAllSelected ? 'text-brand font-semibold' : 'text-dark-text'
            } transition-colors`}
          >
            Todos los productos
          </span>
        </button>

        {/* Categorías jerárquicas — selección exclusiva */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-dark-text">Categorías</h3>
          <div className="space-y-0.5">
            {categoryTypes.map((categoryType) => {
              const isTypeSelected =
                activeFilters.categoryType === categoryType.id &&
                selectedCategoryId === undefined;
              const isExpanded = expandedTypeId === categoryType.id;

              return (
                <div key={categoryType.id}>
                  {/* Categoría principal */}
                  <button
                    type="button"
                    onClick={() => handleTypeSelect(categoryType)}
                    aria-pressed={isTypeSelected}
                    aria-expanded={isExpanded}
                    className="group w-full flex items-center gap-2.5 py-1.5 text-left"
                  >
                    <RadioDot active={isTypeSelected} />
                    <span
                      className={`text-sm transition-colors ${
                        isTypeSelected
                          ? 'text-brand font-semibold'
                          : 'text-dark-text group-hover:text-brand'
                      }`}
                    >
                      {categoryType.name}
                    </span>
                  </button>

                  {/* Subcategorías */}
                  {isExpanded && categoryType.categories.length > 0 && (
                    <ul className="ml-[7px] mt-0.5 space-y-0.5 border-l border-dark-border pl-3">
                      {categoryType.categories.map((category) => {
                        const isSubSelected = selectedCategoryId === category.id;

                        return (
                          <li key={category.id}>
                            <button
                              type="button"
                              onClick={() => handleSubSelect(category.id, categoryType.id)}
                              aria-pressed={isSubSelected}
                              className="group w-full flex items-center gap-2.5 py-1 text-left"
                            >
                              <RadioDot active={isSubSelected} />
                              <span
                                className={`text-sm transition-colors ${
                                  isSubSelected
                                    ? 'text-brand font-semibold'
                                    : 'text-dark-muted group-hover:text-dark-text'
                                }`}
                              >
                                {category.name}
                              </span>
                            </button>
                          </li>
                        );
                      })}
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
