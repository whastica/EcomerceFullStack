import { useState } from 'react';
import { ProductDetail } from '../../pages/products/ProductDetailPage';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Agregando ${quantity} unidades del producto ${product.id} al carrito`);
    // TODO: Implementar lógica real del carrito
  };

  const handleBuyNow = () => {
    console.log(`Comprando ahora ${quantity} unidades del producto ${product.id}`);
    // TODO: Implementar lógica de compra directa
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {product.name}
        </h1>
        
        {product.brand && (
          <p className="text-lg text-gray-600">
            Marca: <span className="font-semibold">{product.brand}</span>
          </p>
        )}
      </div>

      {/* Rating y Reviews */}
      {product.rating && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {product.rating}
          </span>
          {product.reviewCount && (
            <span className="text-sm text-gray-500">
              ({product.reviewCount} reseñas)
            </span>
          )}
        </div>
      )}

      {/* Precio */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-purple-600">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">COP</span>
        </div>
        <p className="text-sm text-gray-600">
          Precio incluye IVA • Envío gratis a nivel nacional
        </p>
      </div>

      {/* Disponibilidad */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.isAvailable ? '✅ Disponible' : '❌ Agotado'}
          </span>
        </div>
        
        {product.isAvailable && (
          <p className="text-sm text-gray-600">
            Stock disponible: <span className="font-semibold">{product.stock} unidades</span>
          </p>
        )}
      </div>

      {/* Características destacadas */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Características destacadas:</h3>
          <ul className="space-y-2">
            {product.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Controles de cantidad y botones */}
      {product.isAvailable && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Selector de cantidad */}
          <div className="flex items-center space-x-3">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
              Cantidad:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 px-3 py-2 text-center border-0 focus:ring-0 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              🚀 Comprar ahora
            </button>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🛒 Agregar al carrito
            </button>
          </div>

          {/* Información adicional */}
          <div className="text-xs text-gray-500 space-y-1 pt-2">
            <p>• Garantía oficial del fabricante</p>
            <p>• Soporte técnico especializado</p>
            <p>• Envío en 24-48 horas hábiles</p>
          </div>
        </div>
      )}

      {/* Mensaje para productos agotados */}
      {!product.isAvailable && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Producto agotado</h3>
          <p className="text-sm text-red-700 mb-3">
            Este producto no está disponible actualmente. Te notificaremos cuando vuelva a estar en stock.
          </p>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            🔔 Notificarme cuando esté disponible
          </button>
        </div>
      )}
    </div>
  );
}