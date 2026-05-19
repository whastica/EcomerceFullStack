export interface ProductSearchRequest {
  query?: string;
  categoryId?: number;
  categoryTypeId?: number;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  hasDiscount?: boolean;
  hasVariations?: boolean;
  sortBy?: 'price' | 'name' | 'newest' | 'discount';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
}