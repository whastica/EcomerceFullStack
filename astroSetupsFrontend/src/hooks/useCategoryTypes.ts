import { useQuery } from '@tanstack/react-query';
import { categoryTypeService } from '@/services/categoryType.service';

export const useCategoryTypes = () => {
  return useQuery({
    queryKey: ['categoryTypes', 'with-categories'],
    queryFn: () => categoryTypeService.getCategoryTypesWithCategories(),
  });
};
