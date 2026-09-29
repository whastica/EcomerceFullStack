import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import SortDropdown from '../../components/products/SortDropdown';
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

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'oldest', label: 'Más antiguos' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
];

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
    // Selección exclusiva: categoría (sub) y tipo de categoría no pueden coexistir
    if (categoryIdFromUrl) {
      setFilters(prev => ({ ...prev, categories: [Number(categoryIdFromUrl)], categoryType: undefined }));
      setPage(0);
    } else if (categoryTypeIdFromUrl) {
      setFilters(prev => ({ ...prev, categories: [], categoryType: Number(categoryTypeIdFromUrl) }));
      setPage(0);
    }
  }, [categoryIdFromUrl, categoryTypeIdFromUrl]);

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
      categoryId: filters.categories.length === 1 ? filters.categories[0] : undefined,
      categoryTypeId: filters.categories.length === 1 ? undefined : filters.categoryType || undefined,
      minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
      maxPrice: filters.priceRange[1] < 5000000 ? filters.priceRange[1] : undefined,
      sortBy: sortConfig.sortBy,
      sortDirection: sortConfig.sortDirection,
      page,
      size: 20,
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
    <div className="min-h-screen text-dark-text flex flex-col relative bg-app-gradient">

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
            <div className="rounded-xl p-6 mb-8 border border-[#666] bg-dark-panel max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-dark-text mb-2 text-shadow-glow">
                {title}
              </h1>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-dark-muted text-sm">
                  Mostrando {totalElements} productos
                </div>
                <div className="flex items-center gap-2">
                  <SortDropdown
                    value={filters.sortBy}
                    options={SORT_OPTIONS}
                    onChange={(value) =>
                      handleFilterChange({
                        ...filters,
                        sortBy: value as FilterState['sortBy'],
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
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
