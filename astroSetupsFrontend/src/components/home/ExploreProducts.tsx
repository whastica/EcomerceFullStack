import Container from '../layout/container/Container';
import ProductGridRelated from '../products/ProductGridRelated';
import { useCatalogProducts } from '../../hooks/useCatalogProducts';

interface ExploreProductsProps {
  title?: string;
  productsPerPage?: number;
  className?: string;
}

/**
 * Sección "Explora Nuestros Productos" (extraída del Home).
 * Se reutiliza en Home y en la página de personalización de PC.
 */
export default function ExploreProducts({
  title = 'Explora Nuestros Productos',
  productsPerPage = 4,
  className = '',
}: ExploreProductsProps) {
  const { data: products = [], isLoading } = useCatalogProducts(0, 16);

  return (
    <Container padding="large" className={`pt-0 ${className}`}>
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-dark-text text-shadow-dark">
          {title}
        </h2>
        {isLoading ? (
          <div className="text-center py-8 text-dark-muted">
            Cargando productos...
          </div>
        ) : (
          <ProductGridRelated products={products} productsPerPage={productsPerPage} />
        )}
      </div>
    </Container>
  );
}
