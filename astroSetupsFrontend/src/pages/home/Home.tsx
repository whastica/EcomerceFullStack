import { useRef } from 'react';
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

  const carouselSlides: Slide[] = [
    {
      image: '/assets/carousel/setupgamer.webp',
      title: '¿No Sabes que Comprar?',
      description: 'Armamos la computadora que necesitas con los recursos necesarios para aquello que necesitas correr',
    },
    {
      image: '/assets/carousel/lampara.webp',
      title: 'Una nueva forma de completar tu setup',
      description: 'Nuestras lámparas LED te permitirán personalizar tu espacio de trabajo o juego con una amplia gama de colores y diseños.',
    },
    {
      image: '/assets/carousel/portatiles2.webp',
      title: '¿Prefieres Portabilidad?',
      description: 'Explora nuestra espectacular selección de portátiles',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        cartItemCount={3}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Luisa Fernanda"
        onFAQClick={handleScrollToFAQ}
      />

      <Carousel slides={carouselSlides} />

      <Container padding="large" className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora por categoría</h2>
        <CategoryGrid categories={[
          { id: 1, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', imageUrl: '/assets/categories/tarjetas-graficas.webp' },
          { id: 2, name: 'Procesadores', slug: 'procesadores', imageUrl: '/assets/categories/procesadores.webp' },
          { id: 3, name: 'Memorias RAM', slug: 'memorias-ram', imageUrl: '/assets/categories/memoriaRam.webp' },
          { id: 4, name: 'Tarjetas Madre', slug: 'tarjetas-madre', imageUrl: '/assets/categories/tarjetasMadre.webp' },
          { id: 5, name: 'Monitores', slug: 'monitores', imageUrl: '/assets/categories/monitores.webp' },
          { id: 6, name: 'Fuentes de Poder', slug: 'fuentes-de-poder', imageUrl: '/assets/categories/fuente de poder.webp' },
          { id: 7, name: 'Almacenamiento SSD', slug: 'almacenamiento-ssd', imageUrl: '/assets/categories/ssd.webp' },
          { id: 8, name: 'Periféricos', slug: 'perifericos', imageUrl: '/assets/categories/perisfericos.webp' },
        ]} />
        
        {/* 🎯 Aquí usamos el ref para permitir scroll */}
        <FAQ ref={faqRef} id="faq" />
      </Container>

      <CustomSetup />

      <Container padding="large" className="pt-0">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora Nuestros Productos</h2>
          <ProductGrid products={relatedProducts} productsPerPage={4} />
        </div>
      </Container>

      <Footer />
    </div>
  );
}