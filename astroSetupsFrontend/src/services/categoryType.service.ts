import { apiClient } from '@/api/client';

export interface CategorySummary {
  id: number;
  name: string;
  slug: string;
  categoryTypeName: string;
}

export interface CategoryTypeWithCategories {
  id: number;
  name: string;
  categories: CategorySummary[];
}

export const categoryTypeService = {
  async getCategoryTypesWithCategories(): Promise<CategoryTypeWithCategories[]> {
    const response = await apiClient.get<CategoryTypeWithCategories[]>(
      '/catalog/category-types/with-categories'
    );
    return response.data;
  },
};
