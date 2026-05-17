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

  hasVariations: boolean;

  hasDiscount: boolean;

  category: {
    id: number;
    name: string;
    slug?: string;
  };
}