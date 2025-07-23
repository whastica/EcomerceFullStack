import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';
import { useCarousel } from '../../hooks/useCarousel';
import { Slide } from '../../interfaces/carousel/Slide';
import { useEffect, useState } from 'react';

interface CarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  slideInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function Carousel({
  slides,
  autoSlide = true,
  slideInterval = 5000,
  showControls = true,
  showIndicators = true,
}: CarouselProps) {
  const { current, next, prev, setCurrent } = useCarousel(slides.length, autoSlide, slideInterval);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    setProgressKey((prev) => prev + 1); // reinicia animación al cambiar slide
  }, [current]);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-contain object-center"
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

      {/* Barra de progreso con efecto shimmer */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20 overflow-hidden rounded-full">
        <div
          key={progressKey}
          className="h-full bg-gradient-to-r from-white via-orange-400 to-orange-500 animate-progress progress-bar-glow relative overflow-hidden rounded-full"
          style={{ 
            animationDuration: `${slideInterval}ms`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards'
          }}
        />
      </div>
    </div>
  );
}