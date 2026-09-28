import { useEffect, RefObject, useMemo } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/layout/container/Container';
import { carouselSlides } from '../../interfaces/carousel/CarouselSlide';
import CategoryGrid from '../../components/home/CategoryGrid';
import CustomSetup from '../../components/home/customSetup/CustomSetup';
import FAQ from '../../components/home/FAQ/FAQ';
import ProductGridRelated from '../../components/products/ProductGridRelated';
import Carousel from '../../components/ui/Carousel';
import { useCatalogProducts } from '../../hooks/useCatalogProducts';
import { useCategoryTypes } from '../../hooks/useCategoryTypes';

interface HomeProps {
  faqRef?: RefObject<HTMLElement | null>;
}

// Categorías del home — nombre + imagen local + ancho en el grid
// Los IDs se resuelven desde la API usando el nombre
const HOME_CATEGORIES_CONFIG = [
  { name: 'Tarjetas Gráficas',  imageUrl: '/assets/categories/Trajeta_grafica.png',  span: 'full' as const },
  { name: 'Procesadores',        imageUrl: '/assets/categories/Procesador.png',       span: 'half' as const },
  { name: 'Tarjetas Madres',     imageUrl: '/assets/categories/Madres.png',           span: 'half' as const },
  { name: 'Refrigeración',       imageUrl: '/assets/categories/Refrigeracion.png',    span: 'half' as const },
  { name: 'Memorias Ram',        imageUrl: '/assets/categories/Ram.png',              span: 'half' as const },
  { name: 'Periféricos',         imageUrl: '/assets/categories/Perifericos.png',      span: 'full' as const },
  { name: 'Chasis - Torres',     imageUrl: '/assets/categories/Chasis.png',           span: 'half' as const },
  { name: 'Almacenamiento SSD',  imageUrl: '/assets/categories/Almacenamiento.png',   span: 'half' as const },
  { name: 'Monitores',           imageUrl: '/assets/categories/Monitores.png',        span: 'half' as const },
  { name: 'Fuentes de Poder',    imageUrl: '/assets/categories/Fuente_poder.png',     span: 'half' as const },
  { name: 'Lámparas LED',        imageUrl: '/assets/categories/led.png',              span: 'full' as const },
];

function matchCategoryType(configName: string, apiCategoryTypes: { id: number; name: string }[]): number | undefined {
  const lower = configName.toLowerCase();
  const match = apiCategoryTypes.find(ct => ct.name.toLowerCase() === lower);
  return match?.id;
}

export default function Home({ faqRef }: HomeProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const { data: catalogProducts = [], isLoading } = useCatalogProducts(0, 16);
  const { data: apiCategoryTypes = [] } = useCategoryTypes();

  const HOME_CATEGORIES = useMemo(() => {
    return HOME_CATEGORIES_CONFIG.map(config => ({
      id: matchCategoryType(config.name, apiCategoryTypes) ?? 0,
      name: config.name,
      imageUrl: config.imageUrl,
      span: config.span,
    })).filter(cat => cat.id > 0);
  }, [apiCategoryTypes]);

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)' }}
        />
      </div>

      <div className="relative z-10 content-overlay">
        {/* Carousel */}
        <div className="relative">
          <Carousel
            slides={carouselSlides}
            autoSlide={true}
            slideInterval={4000}
            showControls={true}
            showIndicators={true}
          />
        </div>

        {/* Banner */}
        <Container padding="large" className="mt-6">
          <div>
            <a href="/catalog">
              <img
                src="https://content.app-sources.com/s/06812195814293589/uploads/Images/Recurso_5-0020972.png?format=webp"
                className="flex-none w-full h-auto"
                alt=""
                loading="lazy"
              />
            </a>
          </div>
        </Container>

        {/* Categorías */}
        <Container padding="large" className="mt-8">
          <div className="glass-effect rounded-lg p-6 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-2xl md:text-3xl font-bold mb-6 text-dark-text text-shadow-dark text-center max-w-2xl mx-auto leading-snug"
            >
              ¡Las mejores partes y componentes<br />para armar tu computadora personalizada!
            </motion.h2>
            <CategoryGrid categories={HOME_CATEGORIES} />
          </div>
        </Container>

        {/* Sección personalizada */}
        <div className="relative">
          <CustomSetup />
        </div>

        {/* FAQ */}
        <div className="relative">
          <FAQ ref={faqRef} id="faq" />
        </div>

        {/* Productos destacados desde el backend */}
        <Container padding="large" className="pt-0">
          <div className="glass-effect rounded-lg p-6 border-dark-border">
            <h2 className="text-4xl font-bold mb-6 text-dark-text text-shadow-dark">
              Explora Nuestros Productos
            </h2>
            {isLoading ? (
              <div className="text-center py-8 text-dark-muted">
                Cargando productos...
              </div>
            ) : (
              <ProductGridRelated
                products={catalogProducts}
                productsPerPage={4}
              />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
