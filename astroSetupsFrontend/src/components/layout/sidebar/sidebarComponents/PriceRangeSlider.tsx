import { useState } from "react";

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

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Valores */}
      <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>${localMin.toLocaleString()}</span>
        <span>${localMax.toLocaleString()}</span>
      </div>

      {/* Sliders */}
      <div className="relative w-full">
        {/* Barra base */}
        <div className="absolute top-1/2 w-full h-2 rounded-full bg-gray-300 dark:bg-gray-700 -translate-y-1/2" />

        {/* Slider para mínimo */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="
            w-full appearance-none bg-transparent cursor-pointer absolute top-0
            [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:mt-[-8px]   /* 

            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:shadow-md 
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
          className="
            w-full appearance-none bg-transparent cursor-pointer absolute top-0
            [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20
            [&::-webkit-slider-thumb]:mt-[-8px] 

            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:shadow-md 
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20
            [&::-moz-range-thumb]:mt-[-8px]    
          "
        />
      </div>
    </div>
  );
}