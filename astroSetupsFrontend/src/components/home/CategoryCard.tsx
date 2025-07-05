import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
}

export default function CategoryCard({ name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link
      to={`/products/${slug}`}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-200/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm"
    >
      {/* Imagen de fondo */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlays para efectos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-20"></div>
      </div>

      {/* Título centrado sin márgenes laterales */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-30 pointer-events-none">
        <div className="w-full px-0">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold drop-shadow-2xl group-hover:text-blue-100 transition-colors duration-300">
            {name}
          </h3>
          <div className="mt-2 w-12 h-0.5 bg-blue-400 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </div>

      {/* Brillo hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>

      {/* Borde en hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/50 transition-colors duration-300 z-50 pointer-events-none"></div>
    </Link>
  );
}