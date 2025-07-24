interface Props {
  value: [number, number];
  onChange: (min: number, max: number) => void;
}

export default function PriceRangeSlider({ value, onChange }: Props) {
  const [min, max] = value;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-dark-text mb-3">Rango de Precio</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-dark-muted">
          <span>${min.toLocaleString()}</span>
          <span>${max.toLocaleString()}</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-dark-muted">Precio mínimo</label>
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={min}
            onChange={(e) => onChange(parseInt(e.target.value), max)}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider-thumb-orange"
            style={{
              background: `linear-gradient(to right, #FB5607 0%, #FB5607 ${(min / 5000000) * 100}%, #374151 ${(min / 5000000) * 100}%, #374151 100%)`,
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-dark-muted">Precio máximo</label>
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={max}
            onChange={(e) => onChange(min, parseInt(e.target.value))}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider-thumb-orange"
            style={{
              background: `linear-gradient(to right, #FB5607 0%, #FB5607 ${(min / 5000000) * 100}%, #374151 ${(min / 5000000) * 100}%, #374151 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
