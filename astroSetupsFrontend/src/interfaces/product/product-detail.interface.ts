import { ProductSummary } from './product-summary.interface';

export interface ProductDetail extends ProductSummary {
  specifications?: Record<string, string>;

  features?: string[];

  createdAt?: string;
}