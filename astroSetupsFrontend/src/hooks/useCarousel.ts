import { useEffect, useState } from 'react';

export function useCarousel(length: number, autoSlide: boolean, slideInterval: number = 5000) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % length);
  const prev = () => setCurrent((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    if (!autoSlide) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, slideInterval);

    return () => clearInterval(timer);
  }, [length, autoSlide, slideInterval]);

  return { current, next, prev, setCurrent };
}