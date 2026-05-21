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
  const display = products.slice(0, productsPerPage);

  if (display.length === 0) {
    return (
      <div className="text-center py-8 text-dark-muted">
        No hay productos disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {display.map((product) => (
        <ProductCardRelated key={product.id} product={product} />
      ))}
    </div>
  );
}