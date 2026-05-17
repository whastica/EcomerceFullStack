import { apiClient }
  from '@/api/client';

import { Category }
  from '@/interfaces/category/category.interface';

const BASE_URL =
  '/catalog/categories';

export const categoryService = {

  /**
   * Obtener categorías
   */
  async getCategories():
    Promise<Category[]> {

    const response =
      await apiClient.get<Category[]>(
        BASE_URL
      );

    return response.data;
  },
};