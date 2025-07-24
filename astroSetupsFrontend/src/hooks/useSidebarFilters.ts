import { useState } from 'react';
import { FilterState } from '../components/layout/sidebar/SidebarTypes';

const defaultFilterState: FilterState = {
  priceRange: [0, 5000000],
  searchTerm: '',
  sortBy: 'newest',
  categories: [], // ✅ Añadido
};

export function useSidebarFilters(initial?: FilterState, onFilterChange?: (filters: FilterState) => void) {
  const [filters, setFilters] = useState<FilterState>(initial || defaultFilterState);

  const updateFilters = (updated: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updated };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilterState);
    onFilterChange?.(defaultFilterState);
  };

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}