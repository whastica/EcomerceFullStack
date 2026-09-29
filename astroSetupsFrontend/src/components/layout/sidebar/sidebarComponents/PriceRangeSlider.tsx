import { useEffect, useState } from "react";

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (min: number, max: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 5000000,
  step = 100000,
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  const [propMin, propMax] = value;

  // Sincroniza cuando el padre resetea los filtros ("Limpiar Filtros")
  useEffect(() => {
    setLocalMin(propMin);
    setLocalMax(propMax);
  }, [propMin, propMax]);

  const handleMinChange = (val: number) => {
    const newMin = Math.min(val, localMax - step);
    setLocalMin(newMin);
    onChange(newMin, localMax);
  };

  const handleMaxChange = (val: number) => {
    const newMax = Math.max(val, localMin + step);
    setLocalMax(newMax);
    onChange(localMin, newMax);
  };

  const handleManualMin = (raw: string) => {
    if (raw.trim() === '') return;
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.max(min, Math.min(parsed, localMax - step));
    setLocalMin(clamped);
    onChange(clamped, localMax);
  };

  const handleManualMax = (raw: string) => {
    if (raw.trim() === '') return;
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(max, Math.max(parsed, localMin + step));
    setLocalMax(clamped);
    onChange(localMin, clamped);
  };

  const inputClasses =
    'w-full min-w-0 px-2.5 py-1.5 text-xs rounded-lg bg-dark-background border border-dark-border text-dark-text placeholder-dark-faint focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/40 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-sm font-medium text-dark-text">Rango de precios</h3>

      {/* Valores */}
      <div className="flex justify-between text-sm font-medium text-dark-muted">
        <span>${localMin.toLocaleString()}</span>
        <span>${localMax.toLocaleString()}</span>
      </div>

      {/* Sliders */}
      <div className="relative w-full">
        {/* Barra base */}
        <div className="absolute top-1/2 w-full h-2 rounded-full bg-dark-fill -translate-y-1/2" />

        {/* Slider para mínimo */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          aria-label="Precio mínimo"
          className="
            w-full appearance-none bg-transparent cursor-pointer absolute top-0
            [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:mt-[-8px]

            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10
            [&::-moz-range-thumb]:mt-[-8px]
          "
        />

        {/* Slider para máximo */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          aria-label="Precio máximo"
          className="
            w-full appearance-none bg-transparent cursor-pointer absolute top-0
            [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20
            [&::-webkit-slider-thumb]:mt-[-8px]

            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20
            [&::-moz-range-thumb]:mt-[-8px]
          "
        />
      </div>

      {/* Entrada manual de valores mínimos / máximos */}
      <div className="flex items-center justify-between gap-3">
        <input
          type="number"
          value={localMin}
          min={min}
          max={localMax - step}
          step={step}
          onChange={(e) => handleManualMin(e.target.value)}
          aria-label="Escribir precio mínimo"
          placeholder="Mín."
          className={inputClasses}
        />
        <input
          type="number"
          value={localMax}
          min={localMin + step}
          max={max}
          step={step}
          onChange={(e) => handleManualMax(e.target.value)}
          aria-label="Escribir precio máximo"
          placeholder="Máx."
          className={inputClasses}
        />
      </div>
    </div>
  );
}
