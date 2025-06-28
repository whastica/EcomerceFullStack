import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/footer';
import Container from '../../components/layout/Container';
import ProductImageGallery from '../../components/products/ProductImageGallery';
import ProductInfo from '../../components/products/ProductInfo';
import ProductDescription from '../../components/products/ProductDescription';
import ProductGrid from '../../components/products/ProductGrid';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { Product } from '../../components/products/ProductCard';

export interface ProductDetail extends Product {
  description: string;
  specifications: { [key: string]: string };
  images: string[];
  category: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const mockProduct: ProductDetail = {
        id: parseInt(id || '1'),
        name: 'NVIDIA RTX 4070 Ti Super',
        price: 3400000,
        imageUrl: '/assets/products/rtx-4070.webp',
        isAvailable: true,
        brand: 'NVIDIA',
        description: 'La NVIDIA GeForce RTX 4070 Ti Super ofrece un rendimiento excepcional para gaming en 4K y creación de contenido...',
        specifications: {
          'Arquitectura': 'Ada Lovelace',
          'Memoria': '16GB GDDR6X',
          'Bus de memoria': '256-bit',
          'Velocidad base': '2340 MHz',
          'Velocidad boost': '2610 MHz',
          'CUDA Cores': '8448',
          'RT Cores': '66 (3ra Gen)',
          'Tensor Cores': '264 (4ta Gen)',
          'TDP': '285W',
          'Conectores': '1x 16-pin',
          'Salidas de video': '3x DisplayPort 1.4a, 1x HDMI 2.1a',
          'Soporte DirectX': 'DirectX 12 Ultimate',
          'Soporte Ray Tracing': 'Sí',
          'DLSS': 'DLSS 3',
        },
        images: [
          '/assets/products/rtx-4070.webp',
          '/assets/relacionados/rtx-4070op2.webp',
          '/assets/relacionados/op3.webp',
        ],
        category: 'Tarjetas Gráficas',
        stock: 15,
        rating: 4.8,
        reviewCount: 127,
        features: [
          'Ray Tracing en tiempo real',
          'DLSS 3 con Frame Generation',
          'Arquitectura Ada Lovelace',
          'Memoria GDDR6X de 16GB',
          'Soporte para 4K Gaming',
          'RGB Personalizable',
          'Sistema de refrigeración avanzado',
          'Garantía de 3 años'
        ]
      };

      const mockRelatedProducts: Product[] = [
        {
          id: 2,
          name: 'NVIDIA RTX 4060 Ti',
          price: 2100000,
          imageUrl: '/assets/relacionados/rtx-4060-ti.webp',
          isAvailable: true,
          brand: 'NVIDIA'
        },
        {
          id: 3,
          name: 'AMD Radeon RX 7800 XT',
          price: 2800000,
          imageUrl: '/assets/relacionados/RX-7800XT.webp',
          isAvailable: true,
          brand: 'AMD'
        },
        {
          id: 4,
          name: 'NVIDIA RTX 4080 Super',
          price: 4200000,
          imageUrl: '/assets/relacionados/x1-925-600x600.webp',
          isAvailable: false,
          brand: 'NVIDIA'
        },
        {
          id: 5,
          name: 'AMD Radeon RX 7900 XTX',
          price: 3800000,
          imageUrl: '/assets/relacionados/amd7900.webp',
          isAvailable: true,
          brand: 'AMD'
        }
      ];

      setTimeout(() => {
        setProduct(mockProduct);
        setRelatedProducts(mockRelatedProducts);
        setLoading(false);
      }, 500);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar cartItemCount={3} isAuthenticated={true} userRole="CLIENT" userName="Luisa Fernanda" />
        <Container padding="large" className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Cargando producto...</p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar cartItemCount={3} isAuthenticated={true} userRole="CLIENT" userName="Luisa Fernanda" />
        <Container padding="large" className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Producto no encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">El producto que buscas no existe o ha sido eliminado.</p>
            <Link
              to="/products"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Volver al catálogo
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/products' },
    { label: product.category, href: `/products?category=${product.category.toLowerCase()}` },
    { label: product.name, href: `/product/${product.id}`, current: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Navbar cartItemCount={3} isAuthenticated={true} userRole="CLIENT" userName="Luisa Fernanda" />

      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container padding="default" className="pt-4 pb-0">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>

        <Container padding="large">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            <div className="space-y-6">
              <ProductInfo product={product} />
            </div>
          </div>
        </Container>

        <Container padding="large" className="pt-0">
          <ProductDescription product={product} />
        </Container>

        <Container padding="large" className="pt-0">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Productos relacionados</h2>
            <ProductGrid products={relatedProducts} productsPerPage={4} />
          </div>
        </Container>
      </motion.main>

      <Footer />
    </div>
  );
}