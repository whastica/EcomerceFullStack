import { useEffect, RefObject } from 'react';
import Container from '../../components/layout/container/Container';
import { carouselSlides } from '../../interfaces/carousel/CarouselSlide';
import CategoryGrid from '../../components/home/CategoryGrid';
import CustomSetup from '../../components/home/customSetup/CustomSetup';
import FAQ from '../../components/home/FAQ/FAQ';
import ProductGridRelated from '../../components/products/ProductGridRelated';
import { Product } from '../../components/products/ProductCard';
import Carousel from '../../components/ui/Carousel';

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

// ✅ Recibimos faqRef como prop
interface HomeProps {
  faqRef?: RefObject<HTMLElement | null>;
}

export default function Home({ faqRef }: HomeProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const relatedProducts: Product[] = [
    {
      id: 2,
      name: 'NVIDIA RTX 4060 Ti',
      price: 2100000,
      imageUrl: '/assets/relacionados/rtx-4060-ti.webp',
      isAvailable: true,
      brand: 'NVIDIA',
    },
    {
      id: 3,
      name: 'AMD Radeon RX 7800 XT',
      price: 2800000,
      imageUrl: '/assets/relacionados/RX-7800XT.webp',
      isAvailable: true,
      brand: 'AMD',
    },
    {
      id: 4,
      name: 'NVIDIA RTX 4080 Super',
      price: 4200000,
      imageUrl: '/assets/relacionados/x1-925-600x600.webp',
      isAvailable: false,
      brand: 'NVIDIA',
    },
    {
      id: 5,
      name: 'AMD Radeon RX 7900 XTX',
      price: 3800000,
      imageUrl: '/assets/relacionados/amd7900.webp',
      isAvailable: true,
      brand: 'AMD',
    },
  ];

  const categories = [
    { id: 1, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', imageUrl: '/assets/categories/Trajeta_grafica.png' },
    { id: 2, name: 'Procesadores', slug: 'procesadores', imageUrl: '/assets/categories/Procesador.png' },
    { id: 3, name: 'Memorias RAM', slug: 'memorias-ram', imageUrl: '/assets/categories/Ram.png' },
    { id: 4, name: 'Tarjetas Madre', slug: 'tarjetas-madre', imageUrl: '/assets/categories/Madres.png' },
    { id: 5, name: 'Monitores', slug: 'monitores', imageUrl: '/assets/categories/Monitores.png' },
    { id: 6, name: 'Fuentes de Poder', slug: 'fuentes-de-poder', imageUrl: '/assets/categories/Fuente_poder.png' },
    { id: 7, name: 'Almacenamiento SSD', slug: 'almacenamiento-ssd', imageUrl: '/assets/categories/Almacenamiento.png' },
    { id: 8, name: 'Periféricos', slug: 'perifericos', imageUrl: '/assets/categories/Perifericos.png' },
  ];

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">
      {/* Fondo decorativo animado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Capas base */}
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>

        {/* Degradado gris claro en diagonal hacia la parte superior derecha */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 0%, #f3f4f6 200%)`,
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 content-overlay">
        {/* ✅ Navbar se elimina aquí porque ya está en App.tsx */}

        {/* Carousel principal */}
        <div className="relative">
          <Carousel
            slides={carouselSlides}
            autoSlide={true}
            slideInterval={4000}
            showControls={true}
            showIndicators={true}
          />
        </div>

        {/* Categorías */}
        <Container padding="large" className="mt-8">
          <div className="glass-effect rounded-lg p-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-text text-shadow-dark text-center max-w-2xl mx-auto leading-snug">
              ¡Las mejores partes y componentes<br />para armar tu computadora personalizada!
            </h2>
            <CategoryGrid categories={categories} />
          </div>
        </Container>

        {/* Sección personalizada */}
        <div className="relative">
          <CustomSetup />
        </div>

        {/* Preguntas frecuentes con ref ✅ */}
        <div className="relative">
          <FAQ ref={faqRef} id="faq" />
        </div>

        {/* Productos relacionados */}
        <Container padding="large" className="pt-0">
          <div className="glass-effect rounded-lg p-6 border-dark-border">
            <h2 className="text-6xl sm:text-4xl font-bold mb-6 text-dark-text text-shadow-dark">
              Explora Nuestros Productos
            </h2>
            <ProductGridRelated products={relatedProducts} productsPerPage={4} />
          </div>
        </Container>
      </div>
    </div>
  );
}