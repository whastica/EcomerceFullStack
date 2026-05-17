import { useQuery }
  from '@tanstack/react-query';

import { productService }
  from '@/services/product.service';

export const useProduct = (
  productId: number
) => {

  return useQuery({

    queryKey: [
      'product',
      productId,
    ],

    queryFn: () =>
      productService.getProductById(
        productId
      ),

    enabled: !!productId,
  });
};