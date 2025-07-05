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
  
  // Forzar modo oscuro al cargar el componente
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    // Forzar estilos en el body
    document.body.style.backgroundColor = '#010101';
    document.body.style.color = '#FFFFFF';
    
    // Aplicar estilos al html
    document.documentElement.style.backgroundColor = '#010101';
    document.documentElement.style.color = '#FFFFFF';
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

  // Categorías para el grid
  const categories = [
    { id: 1, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', imageUrl: '/assets/categories/tarjetas-graficas.webp' },
    { id: 2, name: 'Procesadores', slug: 'procesadores', imageUrl: '/assets/categories/procesadores.webp' },
    { id: 3, name: 'Memorias RAM', slug: 'memorias-ram', imageUrl: '/assets/categories/memoriaRam.webp' },
    { id: 4, name: 'Tarjetas Madre', slug: 'tarjetas-madre', imageUrl: '/assets/categories/tarjetasMadre.webp' },
    { id: 5, name: 'Monitores', slug: 'monitores', imageUrl: '/assets/categories/monitores.webp' },
    { id: 6, name: 'Fuentes de Poder', slug: 'fuentes-de-poder', imageUrl: '/assets/categories/fuente de poder.webp' },
    { id: 7, name: 'Almacenamiento SSD', slug: 'almacenamiento-ssd', imageUrl: '/assets/categories/ssd.webp' },
    { id: 8, name: 'Periféricos', slug: 'perifericos', imageUrl: '/assets/categories/perisfericos.webp' },
  ];
  
  return (
    <div className="min-h-screen bg-dark-background text-dark-text flex flex-col">
      <Navbar 
        cartItemCount={3}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Luisa Fernanda"
        onFAQClick={handleScrollToFAQ}
      />
      
      <Carousel slides={carouselSlides} />
      
      <Container padding="large" className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-dark-text">Explora por categoría</h2>
        <CategoryGrid categories={categories} />
        
        <FAQ ref={faqRef} id="faq" />
      </Container>
      
      <CustomSetup />
      
      <Container padding="large" className="pt-0">
        <div className="border-t border-dark-border pt-8">
          <h2 className="text-2xl font-bold mb-6 text-dark-text">Explora Nuestros Productos</h2>
          <ProductGrid products={relatedProducts} productsPerPage={4} />
        </div>
      </Container>
      
      <Footer />
    </div>
  );
}