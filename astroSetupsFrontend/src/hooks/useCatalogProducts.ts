import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';

export const useCatalogProducts = (page = 0, size = 16) => {
  return useQuery({
    queryKey: ['products', 'catalog', page, size],
    queryFn: async () => {
      const response = await productService.getProducts(page, size);
      return response.content;
    },
    staleTime: 1000 * 60 * 10,
  });
};
