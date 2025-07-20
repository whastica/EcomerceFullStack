// components/CategoryList.tsx
import { Link } from 'react-router-dom';

interface Props {
  categories: Array<{ id: number; name: string; slug: string; productCount?: number }>;
}

export default function CategoryList({ categories }: Props) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-dark-text mb-3">Categorías</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products`}
            className="flex justify-between items-center text-sm text-dark-muted hover:text-[#FB5607] transition-colors py-1"
          >
            <span>{category.name}</span>
            {category.productCount && <span className="text-dark-muted text-xs">({category.productCount})</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
