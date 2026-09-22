import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useRelatedProducts = (productId: number) => {
  return useQuery({
    queryKey: ['products', 'related', productId],
    queryFn: () => productService.getRelatedProducts(productId),
    enabled: !!productId,
  });
};
