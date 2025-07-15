import { useRef, useEffect } from 'react';
import Container from '../../components/layout/Container';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/footer';
import Carousel, { Slide } from '../../components/ui/Carousel';
import CategoryGrid from '../../components/home/CategoryGrid';
import CustomSetup from '../../components/home/CustomSetup';
import FAQ from '../../components/home/FAQ';
import ProductGrid from '../../components/products/ProductGrid';
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

export default function Home() {
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleScrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const carouselSlides: Slide[] = [
    { image: '/assets/carousel/BuscasPartes.webp' },
    { image: '/assets/carousel/Personaliza.webp' },
    { image: '/assets/carousel/portabilidad.webp' },
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
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text flex flex-col relative">
      {/* Fondo geométrico animado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        
        {/* Elementos geométricos flotantes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        

      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar 
          cartItemCount={3}
          isAuthenticated={true}
          userRole="CLIENT"
          userName="Luisa Fernanda"
          onFAQClick={handleScrollToFAQ}
        />
        
        <Carousel slides={carouselSlides} />
        
        <Container padding="large" className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-dark-text">¡Las mejores partes y componentes para armar tu computadora Personalizada!</h2>
          <CategoryGrid categories={categories} />
        </Container>
        
        <CustomSetup />

        <FAQ ref={faqRef} id="faq" />
        
        <Container padding="large" className="pt-0">
          <div className="border-t border-dark-border pt-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-text">Explora Nuestros Productos</h2>
            <ProductGrid products={relatedProducts} productsPerPage={4} />
          </div>
        </Container>
        
        <Footer />
      </div>
    </div>
  );
}