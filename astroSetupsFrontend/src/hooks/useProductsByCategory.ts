import { useQuery }
  from '@tanstack/react-query';

import { productService }
  from '@/services/product.service';

import { PRODUCT_QUERY_KEYS }
  from './useProducts';

export const useProductsByCategory = (

  categoryId: number,

  page = 0,

  size = 8
) => {

  return useQuery({

    queryKey:
      PRODUCT_QUERY_KEYS.category(
        categoryId,
        page,
        size
      ),

    queryFn: () =>
      productService.getProductsByCategory(
        categoryId,
        page,
        size
      ),

    enabled: !!categoryId,
  });
};