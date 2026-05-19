export interface ProductSummary {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  effectivePrice?: number;
  discountPercentage?: number;
  brand?: string;
  imageUrl?: string;
  hasDiscount: boolean;
  stock: number;
  categoryName: string;
}