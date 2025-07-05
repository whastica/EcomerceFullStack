import CategoryCard from '../home/CategoryCard';

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-6 p-2">
      {categories.map((category, index) => {
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;
        const shouldSpanFullWidth = isFirst || isLast;
        
        return (
          <div
            key={category.id}
            className={shouldSpanFullWidth ? 'col-span-2' : 'col-span-1'}
          >
            <CategoryCard 
              name={category.name}
              slug={category.slug}
              imageUrl={category.imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
}