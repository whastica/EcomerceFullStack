import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../interfaces/product/product.interface';

export default function PromotionsPage() {
  // TODO: Reemplazar con endpoint real
  const promotions: Product[] = [];

  const promotionsWithDescription = promotions.map((product) => ({
    ...product,
    description: product.description || "Descripción no disponible",
  }));

  return (
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text flex flex-col relative">
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

      <div className="relative z-10">
        <main className="flex-1">
          <Container padding="large">
            <div className="glass-effect rounded-xl p-8 mb-8 animate-glow animate-fade-in">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-dark-text text-shadow-glow">
                  🔥 Promociones Especiales
                </h1>

                <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                  Aprovecha nuestras promociones especiales y consigue lo que quieres al mejor precio.
                </p>

                <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                  Aquí verás todos los productos disponibles con descuentos exclusivos,
                  envío inmediato y por tiempo limitado.
                </p>
              </div>
            </div>

            <div
              className="glass-effect rounded-xl p-6 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <ProductGrid
                products={promotionsWithDescription}
                productsPerPage={8}
              />
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}