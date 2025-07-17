import { useState } from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  productsPerPage?: number;
}

export default function ProductGrid({ products, productsPerPage = 8 }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll hacia arriba cuando cambie la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No se encontraron productos</div>
        <p className="text-gray-500">Intenta ajustar los filtros para ver más resultados</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid de productos con espaciado uniforme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación mejorada */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border text-sm font-medium bg-dark-card text-dark-text border-dark-border hover:bg-dark-surface hover:border-[#FB5607] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⬅ Anterior
          </button>
          
          {/* Números de página */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              // Mostrar solo algunas páginas alrededor de la actual
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
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
                    {pageNum}
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
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border text-sm font-medium bg-dark-card text-dark-text border-dark-border hover:bg-dark-surface hover:border-[#FB5607] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente ➡
          </button>
        </div>
      )}
      
      {/* Información adicional */}
      <div className="text-center text-sm text-dark-muted">
        Página {currentPage} de {totalPages} • {products.length} producto{products.length !== 1 ? 's' : ''} en total
      </div>
    </div>
  );
}