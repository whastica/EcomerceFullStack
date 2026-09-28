import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCardRelated from './ProductCardRelated';
import { ProductSummary } from '../../interfaces/product/product-summary.interface';

interface ProductGridRelatedProps {
  products: ProductSummary[];
  productsPerPage?: number;
}

export default function ProductGridRelated({
  products,
  productsPerPage = 4,
}: ProductGridRelatedProps) {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-dark-muted">
        No hay productos disponibles en este momento.
      </div>
    );
  }

  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * productsPerPage;
  const display = products.slice(start, start + productsPerPage);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {display.map((product) => (
          <ProductCardRelated key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            aria-label="Productos anteriores"
            className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/30 text-white hover:bg-black/85 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
            aria-label="Siguientes productos"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/30 text-white hover:bg-black/85 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Ir a la página ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === safePage ? 'w-6 bg-purple-500' : 'w-2 bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
