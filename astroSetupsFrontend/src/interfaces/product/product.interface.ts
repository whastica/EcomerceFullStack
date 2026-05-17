export interface Product {
  id: number;

  name: string;

  price: number;

  imageUrl: string;

  isAvailable: boolean;

  brand: string;

  description?: string;

  rating?: number;

  reviewCount?: number;

  category?: string;

  features?: string[];

  quantity?: number;

  specifications?: Record<string, string>;
}