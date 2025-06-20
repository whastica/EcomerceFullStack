// components/home/CategoryGrid.tsx
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          slug={category.slug}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}