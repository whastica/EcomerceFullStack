import { ProductSummary } from './product-summary.interface';

export interface ProductSearchResult {
  products: ProductSummary[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}