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
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      {/* Grid de Productos */}
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ⬅ Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border text-sm font-medium ${
                i + 1 === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Siguiente ➡
          </button>
        </div>
      )}
    </div>
  );
}