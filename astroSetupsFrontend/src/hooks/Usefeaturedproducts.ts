import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 1000 * 60 * 10,
  });
};