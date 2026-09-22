import { Category } from '@/interfaces/category/category.interface';
import { CategoryTypeWithCategories } from '@/services/categoryType.service';

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

export interface FilterState {
  priceRange: [number, number];
  searchTerm: string;
  sortBy: SortOption;
  categories: number[];
  categoryType?: number;
}
export interface SidebarProps {
  isOpen: boolean;
  type?: 'catalog' | 'admin';
  categories?: Category[];
  categoryTypes?: CategoryTypeWithCategories[];
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}