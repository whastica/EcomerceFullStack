import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
}

export default function CategoryCard({ name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link
      to={`/catalog/${slug}`}
      className="relative rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold drop-shadow-lg text-center">
          {name}
        </h3>
      </div>
    </Link>
  );
}
