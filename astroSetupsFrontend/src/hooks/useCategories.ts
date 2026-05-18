import { useQuery }
  from '@tanstack/react-query';

import { categoryService }
  from '@/services/category.service';

import { Category }
  from '@/interfaces/category/category.interface';

export function useCategories() {

  return useQuery<Category[]>({

    queryKey: ['categories'],

    queryFn: () =>
      categoryService.getCategories(),

    staleTime:
      1000 * 60 * 10,

    retry: 2,
  });
}