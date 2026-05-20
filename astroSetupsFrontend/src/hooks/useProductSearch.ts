import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { ProductSearchRequest } from '@/interfaces/product/product-search-request.interface';

export const useProductSearch = (
  searchRequest: ProductSearchRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: ['products', 'search', searchRequest],
    queryFn: () =>
      productService.searchProducts(searchRequest),
    enabled,
    placeholderData: previousData => previousData,
  });
};