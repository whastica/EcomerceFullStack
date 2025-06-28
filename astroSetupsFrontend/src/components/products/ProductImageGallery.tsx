import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden group">
        <div className="aspect-square relative">
          <img
            src={images[selectedImageIndex]}
            alt={`${productName} - Imagen ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
          
          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Imagen anterior"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Imagen siguiente"
              >
                →
              </button>
            </>
          )}

          {/* Indicador de zoom */}
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isZoomed ? '🔍 Click para alejar' : '🔍 Click para acercar'}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-purple-600 ring-2 ring-purple-600 ring-opacity-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay para imagen seleccionada */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-purple-600 bg-opacity-20"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Contador de imágenes */}
      {images.length > 1 && (
        <div className="text-center">
          <span className="text-sm text-gray-500">
            {selectedImageIndex + 1} de {images.length} imágenes
          </span>
        </div>
      )}
    </div>
  );
}