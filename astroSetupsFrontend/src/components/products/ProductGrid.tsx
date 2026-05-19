import ProductCard
  from './ProductCard';
import { ProductSummary }
  from '../../interfaces/product/product-summary.interface';

interface ProductGridProps {
  products: ProductSummary[];
  currentPage: number;       // base 0 — viene del backend
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  isLoading = false,
}: ProductGridProps) {

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-dark-muted">
        Cargando productos...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">
          No se encontraron productos
        </div>
        <p className="text-gray-500">
          Intenta ajustar los filtros para ver más resultados
        </p>
      </div>
    );
  }

  // Convertir page base-0 del backend a base-1 para mostrar al usuario
  const displayPage = currentPage + 1;

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Paginación del servidor */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg border text-sm font-medium bg-dark-card text-dark-text border-dark-border hover:bg-dark-surface hover:border-[#FB5607] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⬅ Anterior
          </button>

          {/* Números de página — mostramos base-1 al usuario */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i; // base-0
              const displayNum = i + 1; // base-1 para mostrar

              if (
                pageNum === 0 ||
                pageNum === totalPages - 1 ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      pageNum === currentPage
                        ? 'bg-[#FB5607] text-white border-[#FB5607]'
                        : 'bg-dark-card text-dark-text border-dark-border hover:bg-dark-surface hover:border-[#FB5607]'
                    }`}
                  >
                    {displayNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={i} className="px-2 py-2 text-dark-muted">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded-lg border text-sm font-medium bg-dark-card text-dark-text border-dark-border hover:bg-dark-surface hover:border-[#FB5607] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente ➡
          </button>
        </div>
      )}

      {/* Info */}
      <div className="text-center text-sm text-dark-muted">
        Página {displayPage} de {totalPages} • {totalElements} producto{totalElements !== 1 ? 's' : ''} en total
      </div>
    </div>
  );
}