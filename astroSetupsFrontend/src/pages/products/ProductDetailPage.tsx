import { useParams } from 'react-router-dom';

import Container
  from '../../components/layout/container/Container';

import ProductInfo
  from '../../components/products/ProductInfo';

import ProductGridRelated
  from '../../components/products/ProductGridRelated';

import ProductDescription
  from '../../components/products/ProductDescription';

import LoadingState
  from '../../components/ui/states/LoadingState';

import ErrorState
  from '../../components/ui/states/ErrorState';

import { ProductSummary }
  from '../../interfaces/product/product-summary.interface';

import { useProduct }
  from '../../hooks/useProduct';

export default function ProductDetailPage() {

  const { id } = useParams();

  const productId = Number(id);



  /**
   * React Query
   */
  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(productId);



  /**
   * TODO:
   * Endpoint real relacionados
   */
  const relatedProducts:
    ProductSummary[] = [];



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



      <main className="flex-1">

        <Container
          padding="large"
          className="py-12"
        >

          {isLoading ? (

            <LoadingState
              message="Cargando producto..."
            />

          ) : isError ? (

            <ErrorState
              title="Error al cargar producto"
              message="No pudimos obtener la información."
            />

          ) : !product ? (

            <ErrorState
              title="Producto no encontrado"
              message="El producto solicitado no existe."
            />

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Imagen */}
              <div className="lg:col-span-6 flex justify-center">

                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="w-full max-w-md h-auto rounded-xl shadow-lg object-contain"
                />

              </div>



              {/* Información */}
              <div className="lg:col-span-6">

                <ProductInfo product={product} />

              </div>



              {/* Descripción */}
              <div className="col-span-12 mt-12">

                <ProductDescription
                  product={{
                    description:
                      product.description,

                    specifications: {},

                    features: [],
                  }}
                />

              </div>

            </div>

          )}

        </Container>



        {/* Relacionados */}
        <Container
          padding="large"
          className="pt-0"
        >

          <div className="border-t border-gray-200 pt-8">

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Productos Relacionados
            </h2>



            <div className="flex justify-center">

              <ProductGridRelated
                products={relatedProducts}
                productsPerPage={4}
              />

            </div>

          </div>

        </Container>

      </main>

    </div>
  );
}