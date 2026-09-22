import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

export default function CategoryCard({ id, name, imageUrl }: CategoryCardProps) {
  return (
    <Link
      to={`/products?categoryTypeId=${id}`}
      className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className="relative w-full h-48">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Brillo en hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-400/30 transition-colors duration-300 pointer-events-none" />
        {/* Nombre de la categoría */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white font-semibold text-sm">{name}</span>
        </div>
      </div>
    </Link>
  );
}