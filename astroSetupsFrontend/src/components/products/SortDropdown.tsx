import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
  label?: string;
}

export default function SortDropdown({
  value,
  options,
  onChange,
  label = 'Ordenar por:',
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-dark-muted text-sm">{label}</label>

      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 bg-dark-card border border-dark-border rounded px-3 py-1.5 text-dark-text text-sm hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 transition-colors"
        >
          <span className="whitespace-nowrap">{selected?.label ?? value}</span>
          <ChevronDown
            size={14}
            className={`text-dark-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute right-0 mt-2 w-56 py-1 rounded-lg border border-dark-border bg-dark-background shadow-2xl z-50 animate-scale-in"
          >
            {options.map((option) => {
              const isActive = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'text-brand bg-brand/10'
                        : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                    }`}
                  >
                    {option.label}
                    {isActive && <Check size={14} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
