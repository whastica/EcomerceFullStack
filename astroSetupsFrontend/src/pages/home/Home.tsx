import Container from '../../components/layout/Container';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/footer';
import Carousel, { Slide } from '../../components/ui/Carousel';
import CategoryGrid from '../../components/home/CategoryGrid';


export default function Home() {

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
      </Container>
      <Footer />
    </div>
  );
}