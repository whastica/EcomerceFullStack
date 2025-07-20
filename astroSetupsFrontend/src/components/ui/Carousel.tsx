import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';
import { useCarousel } from '../../hooks/useCarousel';
import { Slide } from '../../interfaces/carousel/Slide';

interface CarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  slideInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
}

export default function Carousel({
  slides,
  autoSlide = true,
  slideInterval = 5000,
  showControls = true,
  showIndicators = true,
  height = 'h-[400px]',
}: CarouselProps) {
  const { current, next, prev, setCurrent } = useCarousel(slides.length, autoSlide, slideInterval);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-lg ${height}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              console.error('Error cargando imagen:', slide.image);
              (e.target as HTMLImageElement).src = '/fallback.jpg';
            }}
          />
        </div>
      ))}

      {showControls && <CarouselControls onPrev={prev} onNext={next} />}
      {showIndicators && (
        <CarouselIndicators total={slides.length} current={current} onSelect={setCurrent} />
      )}
    </div>
  );
}