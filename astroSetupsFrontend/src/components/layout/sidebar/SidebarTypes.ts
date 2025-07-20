export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

// Define el estado del filtro del sidebar
export interface FilterState {
  priceRange: [number, number];
  searchTerm: string;
  sortBy: SortOption;
}

// Define la estructura de una categoría individual
export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  productCount?: number;
}

// Define las props aceptadas por el Sidebar
export interface SidebarProps {
  isOpen: boolean;
  type?: 'catalog' | 'admin';
  categories?: CategoryItem[];
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}