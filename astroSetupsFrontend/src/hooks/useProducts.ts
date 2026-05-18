import { useQuery }
  from '@tanstack/react-query';

import { productService }
  from '@/services/product.service';

export const PRODUCT_QUERY_KEYS = {

  all: ['products'],

  list: (
    page: number,
    size: number
  ) => [
    'products',
    page,
    size,
  ],

  category: (
    categoryId: number,
    page: number,
    size: number
  ) => [
    'products',
    'category',
    categoryId,
    page,
    size,
  ],
};

export const useProducts = (
  page = 0,
  size = 8
) => {

  return useQuery({

    queryKey:
      PRODUCT_QUERY_KEYS.list(
        page,
        size
      ),

    queryFn: () =>
      productService.getProducts(
        page,
        size
      ),

    placeholderData:
      previousData => previousData,
  });
};