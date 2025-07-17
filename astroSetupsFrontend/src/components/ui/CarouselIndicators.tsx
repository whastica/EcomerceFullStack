interface Props {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function CarouselIndicators({ total, current, onSelect }: Props) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          aria-label={`Ir al slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === current ? 'bg-white' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  );
}