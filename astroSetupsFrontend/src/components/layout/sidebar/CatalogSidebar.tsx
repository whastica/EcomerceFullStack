import { useState } from 'react';
import { SidebarProps, FilterState } from './SidebarTypes';
import SearchBox from './sidebarComponents/SearchBox';
import CategoryList from './sidebarComponents/CategoryList';
import PriceRangeSlider from './sidebarComponents/PriceRangeSlider';

export default function CatalogSidebar({
  isOpen,
  categories = [],
  filters,
  onFilterChange,
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters?.priceRange || [0, 5000000]
  );
  const [searchTerm, setSearchTerm] = useState<string>(filters?.searchTerm || '');

  const clearFilters = () => {
    const cleared: FilterState = {
      priceRange: [0, 5000000],
      searchTerm: '',
      sortBy: 'newest',
    };
    setPriceRange(cleared.priceRange);
    setSearchTerm('');
    onFilterChange?.(cleared);
  };

  const handlePriceChange = (min: number, max: number) => {
    const updated: FilterState = {
      priceRange: [min, max],
      searchTerm,
      sortBy: filters?.sortBy || 'newest',
    };
    setPriceRange(updated.priceRange);
    onFilterChange?.(updated);
  };

  const handleSearchChange = (term: string) => {
    const updated: FilterState = {
      priceRange,
      searchTerm: term,
      sortBy: filters?.sortBy || 'newest',
    };
    setSearchTerm(term);
    onFilterChange?.(updated);
  };

  return (
    <div
      className={`w-64 glass-effect border-r border-dark-border overflow-y-auto ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-dark-text">Filtros</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-[#FB5607] hover:text-orange-300 transition-colors"
          >
            Limpiar
          </button>
        </div>

        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        <CategoryList categories={categories} />
        <PriceRangeSlider value={priceRange} onChange={handlePriceChange} />
      </div>
    </div>
  );
}