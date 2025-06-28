import { useState } from 'react';
import { ProductDetail } from '../../pages/products/ProductDetailPage';

interface ProductDescriptionProps {
  product: ProductDetail;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');

  const tabs = [
    { id: 'description', label: 'Descripción', icon: '📄' },
    { id: 'specifications', label: 'Especificaciones', icon: '⚙️' },
    { id: 'features', label: 'Características', icon: '⭐' },
  ] as const;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 sm:px-6 text-sm font-medium text-center transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción del producto</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {/* Información adicional */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">🚚 Envío</h3>
                  <p className="text-sm text-blue-800">
                    Envío gratis a nivel nacional. Entrega en 24-48 horas hábiles en ciudades principales.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">🛡️ Garantía</h3>
                  <p className="text-sm text-green-800">
                    Garantía oficial del fabricante por 3 años. Soporte técnico especializado incluido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Especificaciones técnicas</h2>

            {Object.keys(product.specifications).length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div
                    key={key}
                    className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                      index % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-900 text-sm">{key}:</span>
                    <span className="text-gray-700 text-sm text-right ml-4">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay especificaciones técnicas disponibles.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Características completas</h2>

            {product.features && product.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay características adicionales disponibles.</p>
              </div>
            )}

            {/* Beneficios adicionales */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">💡 Consejo</h3>
                <p className="text-sm text-yellow-800">
                  Ideal para gamers, diseñadores o usuarios exigentes que buscan máximo rendimiento.
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">📦 Disponibilidad</h3>
                <p className="text-sm text-indigo-800">
                  Stock limitado. ¡No pierdas la oportunidad de obtener el tuyo!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}