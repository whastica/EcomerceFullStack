export interface ProductSearchRequest {
  query?: string;
  categoryId?: number;
  categoryTypeId?: number;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  hasDiscount?: boolean;
  hasVariations?: boolean;
  /** Solo admin: null = todos los estados */
  active?: boolean;
  sortBy?: 'price' | 'name' | 'newest' | 'discount';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
}