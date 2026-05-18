import { useMemo, useState } from 'react';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import Container from '../../components/layout/container/Container';

import ProductGrid from '../../components/products/ProductGrid';

import LoadingState from '../../components/ui/states/LoadingState';
import ErrorState from '../../components/ui/states/ErrorState';
import EmptyState from '../../components/ui/states/EmptyState';

import { FilterState }
  from '../../components/layout/sidebar/SidebarTypes';

import { ProductSummary }
  from '../../interfaces/product/product-summary.interface';

import { Category }
  from '../../interfaces/category/category.interface';

import { useProducts }
  from '../../hooks/useProducts';

import { useCategories }
  from '../../hooks/useCategories';

export default function ProductsPage() {

  const [isSidebarOpen] = useState(true);

  const [filters, setFilters] =
    useState<FilterState>({
      priceRange: [0, 5000000],
      searchTerm: '',
      sortBy: 'newest',
      categories: [],
    });



  /**
   * Productos
   */
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts();



  /**
   * Categorías
   */
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();



  /**
   * Loading global
   */
  if (
    isProductsLoading ||
    isCategoriesLoading
  ) {

    return (

      <LoadingState
        message="Cargando catálogo..."
      />

    );
  }



  /**
   * Error global
   */
  if (
    isProductsError ||
    isCategoriesError
  ) {

    return (

      <ErrorState
        title="Error cargando catálogo"
        message="No pudimos cargar productos o categorías."
      />

    );
  }



  /**
   * Filtrado local temporal
   * Luego migrará al backend.
   */
  const filteredProducts = useMemo(() => {

    let filtered =
      [...products] as ProductSummary[];



    filtered = filtered.filter((product) => {

      /**
       * Precio
       */
      const isDefaultPrice =
        filters.priceRange[0] === 0 &&
        filters.priceRange[1] === 5000000;



      const productPrice =
        product.effectivePrice ??
        product.price;



      const matchesPrice =
        isDefaultPrice ||

        (
          productPrice >= filters.priceRange[0] &&
          productPrice <= filters.priceRange[1]
        );



      /**
       * Búsqueda
       */
      const search =
        filters.searchTerm.toLowerCase();



      const matchesSearch =

        !filters.searchTerm.trim() ||

        product.name
          .toLowerCase()
          .includes(search) ||

        (product.brand || '')
          .toLowerCase()
          .includes(search) ||

        (product.description || '')
          .toLowerCase()
          .includes(search);



      /**
       * Categorías
       */
      const matchesCategory =

        filters.categories.length === 0 ||

        filters.categories.some((catId) => {

          const category =
            categories.find(
              (c: Category) => c.id === catId
            );

          if (!category) {
            return false;
          }

          return (
            product.category.name ===
            category.name
          );
        });



      return (
        matchesPrice &&
        matchesSearch &&
        matchesCategory
      );

    });



    /**
     * Ordenamiento
     */
    switch (filters.sortBy) {

      case 'newest':

        filtered.sort(
          (a, b) => b.id - a.id
        );

        break;



      case 'oldest':

        filtered.sort(
          (a, b) => a.id - b.id
        );

        break;



      case 'price-asc':

        filtered.sort(
          (a, b) =>
            (
              a.effectivePrice ??
              a.price
            ) -
            (
              b.effectivePrice ??
              b.price
            )
        );

        break;



      case 'price-desc':

        filtered.sort(
          (a, b) =>
            (
              b.effectivePrice ??
              b.price
            ) -
            (
              a.effectivePrice ??
              a.price
            )
        );

        break;
    }



    return filtered;

  }, [
    products,
    categories,
    filters,
  ]);



  return (

    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">

      {/* Fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">

        <div className="absolute inset-0 bg-dark-gradient"></div>

        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>

        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>

        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)',
          }}
        />

      </div>



      {/* Contenido */}
      <div className="relative z-10 flex flex-1">

        <Sidebar
          isOpen={isSidebarOpen}
          type="catalog"
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />



        <main className="flex-1">

          <Container padding="large">

            {/* Header */}
            <div className="rounded-xl p-6 mb-8 animate-fade-in border border-[#666] bg-[#4D4D4D] max-w-6xl mx-auto">

              <h1 className="text-3xl font-bold text-dark-text mb-2 text-shadow-glow">
                Todos los productos
              </h1>



              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                <div className="text-dark-muted text-sm">

                  Mostrando {filteredProducts.length} productos

                </div>



                <div className="flex items-center gap-2">

                  <label className="text-dark-muted text-sm">
                    Ordenar por:
                  </label>

                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        sortBy:
                          e.target.value as FilterState['sortBy'],
                      })
                    }
                    className="bg-dark-card border border-dark-border rounded px-3 py-1 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-[#FB5607]"
                  >

                    <option value="newest">
                      Más recientes
                    </option>

                    <option value="oldest">
                      Más antiguos
                    </option>

                    <option value="price-asc">
                      Precio: menor a mayor
                    </option>

                    <option value="price-desc">
                      Precio: mayor a menor
                    </option>

                  </select>

                </div>

              </div>

            </div>



            {/* Estado UI */}
            <div className="glass-effect rounded-xl p-6 animate-slide-up">

              {filteredProducts.length === 0 ? (

                <EmptyState
                  title="No hay productos"
                  message="No existen productos disponibles."
                />

              ) : (

                <ProductGrid
                  products={filteredProducts}
                  productsPerPage={8}
                />

              )}

            </div>

          </Container>

        </main>

      </div>

    </div>
  );
}