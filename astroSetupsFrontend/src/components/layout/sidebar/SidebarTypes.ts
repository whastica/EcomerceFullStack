import { Category } from '@/interfaces/category/category.interface';

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

export interface FilterState {
  priceRange: [number, number];
  searchTerm: string;
  sortBy: SortOption;
  categories: number[]; // Filtro por categorías seleccionadas
}
export interface SidebarProps {
  isOpen: boolean;
  type?: 'catalog' | 'admin';
  categories?: Category[];  // ← Category directamente, CategoryItem eliminado
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}