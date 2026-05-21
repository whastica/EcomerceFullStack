import { Link } from 'react-router-dom';
import { ProductSummary } from '../../interfaces/product/product-summary.interface';

interface ProductCardRelatedProps {
  product: ProductSummary;
}

export default function ProductCardRelated({ product }: ProductCardRelatedProps) {
  const finalPrice = product.effectivePrice ?? product.price;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="relative overflow-hidden bg-transparent border border-white border-t-0">
        {/* Imagen */}
        <div className="relative overflow-hidden bg-dark-card">
          <img
            src={product.imageUrl || '/assets/products/placeholder.png'}
            alt={product.name}
            className="w-full object-contain aspect-[4/5] transition-transform duration-300 group-hover:scale-110 p-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Info */}
        <div className="p-4 text-center space-y-2">
          {product.brand && (
            <p className="text-xs text-dark-muted uppercase tracking-wide">
              {product.brand}
            </p>
          )}
          <h3 className="text-base font-semibold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold" style={{ color: '#CAD519' }}>
            ${finalPrice.toLocaleString('es-CO')}
          </p>
        </div>
      </div>
    </Link>
  );
}