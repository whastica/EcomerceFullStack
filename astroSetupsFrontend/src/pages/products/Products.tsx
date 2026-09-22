import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import LoadingState from '../../components/ui/states/LoadingState';
import ErrorState from '../../components/ui/states/ErrorState';
import EmptyState from '../../components/ui/states/EmptyState';
import { FilterState } from '../../components/layout/sidebar/SidebarTypes';
import { ProductSummary } from '../../interfaces/product/product-summary.interface';
import { useProductSearch } from '../../hooks/useProductSearch';
import { useCategoryTypes } from '../../hooks/useCategoryTypes';

const SORT_MAP: Record<string, { sortBy: 'price' | 'name' | 'newest'; sortDirection: 'asc' | 'desc' }> = {
  'newest': { sortBy: 'newest', sortDirection: 'desc' },
  'oldest': { sortBy: 'newest', sortDirection: 'asc' },
  'price-asc': { sortBy: 'price', sortDirection: 'asc' },
  'price-desc': { sortBy: 'price', sortDirection: 'desc' },
};

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('categoryId');
  const categoryTypeIdFromUrl = searchParams.get('categoryTypeId');
  const queryFromUrl = searchParams.get('q');

  const [isSidebarOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000000],
    searchTerm: queryFromUrl || '',
    sortBy: 'newest',
    categories: categoryIdFromUrl ? [Number(categoryIdFromUrl)] : [],
    categoryType: categoryTypeIdFromUrl ? Number(categoryTypeIdFromUrl) : undefined,
  });

  useEffect(() => {
    if (categoryIdFromUrl) {
      setFilters(prev => ({ ...prev, categories: [Number(categoryIdFromUrl)] }));
      setPage(0);
    }
  }, [categoryIdFromUrl]);

  useEffect(() => {
    if (categoryTypeIdFromUrl) {
      setFilters(prev => ({ ...prev, categoryType: Number(categoryTypeIdFromUrl) }));
      setPage(0);
    }
  }, [categoryTypeIdFromUrl]);

  useEffect(() => {
    if (queryFromUrl) {
      setFilters(prev => ({ ...prev, searchTerm: queryFromUrl }));
      setPage(0);
    }
  }, [queryFromUrl]);

  // Mapear filtros a request del backend
  const searchRequest = useMemo(() => {
    const sortConfig = SORT_MAP[filters.sortBy] || SORT_MAP['newest'];

    return {
      query: filters.searchTerm.trim() || undefined,
      categoryId: filters.categories.length === 1 && !filters.categoryType ? filters.categories[0] : undefined,
      categoryTypeId: filters.categoryType || undefined,
      minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
      maxPrice: filters.priceRange[1] < 5000000 ? filters.priceRange[1] : undefined,
      sortBy: sortConfig.sortBy,
      sortDirection: sortConfig.sortDirection,
      page,
      size: 50,
    };
  }, [filters, page]);

  // Data fetching con búsqueda server-side
  const {
    data,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProductSearch(searchRequest);

  const {
    data: categoryTypes = [],
    isLoading: isCategoryTypesLoading,
    isError: isCategoryTypesError,
  } = useCategoryTypes();

  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  // Handler de filtros — resetea página al cambiar filtros
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(0);
  };

  // Nombre de la categoría para el título
  const title = useMemo(() => {
    if (filters.categories.length === 1) {
      for (const ct of categoryTypes) {
        const found = ct.categories.find(c => c.id === filters.categories[0]);
        if (found) return found.name;
      }
    }
    if (filters.categoryType) {
      const ct = categoryTypes.find(ct => ct.id === filters.categoryType);
      if (ct) return ct.name;
    }
    return 'Todos los productos';
  }, [filters, categoryTypes]);

  // Early returns
  if (isProductsLoading || isCategoryTypesLoading) {
    return <LoadingState message="Cargando catálogo..." />;
  }

  if (isProductsError || isCategoryTypesError) {
    return (
      <ErrorState
        title="Error cargando catálogo"
        message="No pudimos cargar productos o categorías."
      />
    );
  }

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
        <div
          className="absolute top-0 left-0 w-full h-20 opacity-20"
          style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          type="catalog"
          categoryTypes={categoryTypes}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <main className="flex-1">
          <Container padding="large">
            <div className="rounded-xl p-6 mb-8 border border-[#666] bg-[#4D4D4D] max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-dark-text mb-2 text-shadow-glow">
                {title}
              </h1>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-dark-muted text-sm">
                  Mostrando {totalElements} productos
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-dark-muted text-sm">Ordenar por:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange({
                        ...filters,
                        sortBy: e.target.value as FilterState['sortBy'],
                      })
                    }
                    className="bg-dark-card border border-dark-border rounded px-3 py-1 text-dark-text text-sm focus:ring-2 focus:ring-[#FB5607] outline-none"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 animate-slide-up">
              {products.length === 0 ? (
                <EmptyState
                  title="No hay productos"
                  message="No existen productos que coincidan con los filtros seleccionados."
                />
              ) : (
                <ProductGrid
                  products={products as ProductSummary[]}
                  currentPage={page}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  onPageChange={setPage}
                />
              )}
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}
