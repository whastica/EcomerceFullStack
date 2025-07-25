import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../../components/layout/container/Container';
import ProductInfo from '../../components/products/ProductInfo';
import ProductGridRelated from '../../components/products/ProductGridRelated';
import ProductDescription from '../../components/products/ProductDescription';

// ✅ Tipo extendido completo
export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  brand: string;
  description: string;
};

export type ProductDetail = Product & {
  rating?: number;
  reviewCount?: number;
  category?: string;
  features?: string[];
  quantity?: number;
  specifications?: Record<string, string>; // ✅ Nuevo campo
};

// ✅ Productos de ejemplo con especificaciones incluidas
const exampleProducts: ProductDetail[] = [
  {
    id: 1,
    name: 'NVIDIA RTX 4070 Ti',
    price: 3400000,
    imageUrl: '/assets/products/rtx-4070.png',
    isAvailable: true,
    brand: 'NVIDIA',
    description: 'GPU de alto rendimiento con trazado de rayos y DLSS 3. Ideal para gamers y creadores.',
    rating: 4.8,
    reviewCount: 42,
    category: 'Tarjetas Gráficas',
    features: ['12 GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', 'PCIe 4.0'],
    specifications: {
      'Memoria': '12 GB GDDR6X',
      'TDP': '285W',
      'Interfaz': 'PCIe 4.0',
      'Resolución Máxima': '7680x4320',
      'Puertos': 'HDMI 2.1, 3x DisplayPort',
    },
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 5800X',
    price: 999000,
    imageUrl: '/assets/products/ryzen-7.png',
    isAvailable: true,
    brand: 'AMD',
    description: 'Procesador con 8 núcleos y 16 hilos, perfecto para multitarea y juegos exigentes.',
    rating: 4.6,
    reviewCount: 30,
    category: 'Procesadores',
    features: ['8 núcleos', '16 hilos', '4.7GHz Boost', 'AM4 Socket'],
    specifications: {
      'Núcleos': '8',
      'Hilos': '16',
      'Frecuencia Base': '3.8GHz',
      'Frecuencia Máx. Boost': '4.7GHz',
      'Socket': 'AM4',
    },
  },
  {
    id: 3,
    name: 'SSD Samsung 980 PRO 1TB',
    price: 520000,
    imageUrl: '/assets/products/SSD.png',
    isAvailable: false,
    brand: 'Samsung',
    description: 'SSD NVMe ultrarrápido con velocidades de lectura de hasta 7000MB/s.',
    rating: 4.9,
    reviewCount: 58,
    category: 'Almacenamiento',
    features: ['NVMe 4.0', '7000MB/s Lectura', '1000MB/s Escritura', '1TB'],
    specifications: {
      'Capacidad': '1TB',
      'Interfaz': 'NVMe PCIe Gen4',
      'Lectura secuencial': '7000MB/s',
      'Escritura secuencial': '1000MB/s',
    },
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const found = exampleProducts.find(p => p.id === Number(id));
    setProduct(found || null);
  }, [id]);

  const relatedProducts = exampleProducts
    .filter(p => p.id !== Number(id))
    .slice(0, 4);

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)',
          }}
        />
      </div>
      <main className="flex-1">
        <Container padding="large" className="py-12">
          {!product ? (
            <p className="text-center text-red-500 font-semibold py-20">
              Producto no encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full max-w-md h-auto rounded-xl shadow-lg object-contain"
                />
              </div>

              <div className="lg:col-span-6">
                <ProductInfo product={product} />
              </div>

              {/* Descripción detallada abajo de toda la info */}
              <div className="col-span-12 mt-12">
                <ProductDescription product={product} />
              </div>
            </div>
          )}
        </Container>

        {/* Productos relacionados */}
        <Container padding="large" className="pt-0">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Productos Relacionados</h2>
            
            <div className="flex justify-center">
              <ProductGridRelated products={relatedProducts} productsPerPage={4} />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}