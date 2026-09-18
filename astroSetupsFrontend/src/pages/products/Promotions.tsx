import { useState } from 'react';
import Container from '@/components/layout/container/Container';
import ProductGrid from '@/components/products/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { Package } from 'lucide-react';

export default function PromotionsPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['promotions', page],
    queryFn: () =>
      productService.searchProducts({
        hasDiscount: true,
        page,
        size: 12,
      }),
  });

  const products = data?.products ?? [];

  return (
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
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
                  Aprovecha nuestras promociones especiales y consigue lo que
                  quieres al mejor precio. Productos con descuentos exclusivos
                  por tiempo limitado.
                </p>
              </div>
            </div>

            <div
              className="glass-effect rounded-xl p-6 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-72 rounded-xl border border-dark-border bg-dark-surface/50 animate-pulse"
                    />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <ProductGrid
                  products={products}
                  currentPage={data?.currentPage ?? 0}
                  totalPages={data?.totalPages ?? 0}
                  totalElements={data?.totalElements ?? 0}
                  onPageChange={setPage}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 rounded-full bg-dark-surface border border-dark-border mb-4 text-dark-muted">
                    <Package size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-text mb-1">
                    No hay promociones activas
                  </h3>
                  <p className="text-sm text-dark-muted max-w-sm">
                    Vuelve pronto para ver nuevas ofertas y descuentos
                    especiales.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}
