import { useState } from 'react';

// Mock data para demostración
const mockProduct = {
  description: "Procesador de última generación con arquitectura avanzada de 7nm, diseñado para ofrecer un rendimiento excepcional en gaming, creación de contenido y multitareas intensivas. Incluye tecnología de boost inteligente y soporte para las últimas tecnologías de conectividad.",
  specifications: {
    "Núcleos": "8 núcleos / 16 hilos",
    "Frecuencia base": "3.4 GHz",
    "Frecuencia boost": "4.6 GHz",
    "Caché L3": "32 MB",
    "TDP": "105W",
    "Socket": "AM4",
    "Arquitectura": "Zen 3",
    "Proceso": "7nm"
  },
  features: [
    "Arquitectura Zen 3 de última generación",
    "Soporte para PCIe 4.0",
    "Tecnología Precision Boost 2",
    "AMD StoreMI incluido",
    "Cooler Wraith incluido",
    "Overclocking desbloqueado",
    "Soporte para DDR4-3200",
    "Tecnología Smart Access Memory"
  ]
};

interface ProductDescriptionProps {
  product?: {
    description: string;
    specifications?: Record<string, string>;
    features?: string[];
  };
}

export default function ProductDescription({ product = mockProduct }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  
  const tabs = [
    { id: 'description', label: 'Descripción', icon: '📄' },
    { id: 'specifications', label: 'Especificaciones', icon: '⚙️' },
    { id: 'features', label: 'Características', icon: '⭐' },
  ] as const;

  return (
    <div className="relative rounded-2xl border border-gray-600/30 overflow-hidden shadow-2xl backdrop-blur-sm" 
         style={{ backgroundColor: 'var(--color-dark-panel)' }}>
      
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime via-brand to-lime"></div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-600/20 backdrop-blur-sm">
        <nav className="flex relative">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-5 sm:px-6 text-sm font-semibold text-center transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'text-black shadow-lg transform scale-[1.02]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600/20'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-lime)' : 'transparent'
              }}
            >
              {/* Active tab glow effect */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-b from-lime/20 to-transparent rounded-t-lg"></div>
              )}
              
              {/* Hover effect for inactive tabs */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
              
              <div className="relative z-10 flex items-center justify-center">
                <span className="hidden sm:inline mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </div>
              
              {/* Tab separator */}
              {index < tabs.length - 1 && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-6 bg-gray-600/30"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 text-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-lime/10 via-transparent to-brand/10"></div>
        
        <div className="relative z-10">
          {activeTab === 'description' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-lime to-brand rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Descripción del producto
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="leading-relaxed text-gray-200 text-lg font-light">{product.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="group relative p-6 rounded-xl border border-lime/20 bg-gradient-to-br from-lime/5 to-transparent hover:from-lime/10 transition-all duration-300">
                    <div className="absolute top-4 right-4 text-2xl">🚚</div>
                    <h3 className="font-bold text-lime mb-3 text-lg">Envío Express</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Envío gratis a nivel nacional. Entrega en 24-48 horas hábiles en ciudades principales.
                    </p>
                  </div>
                  
                  <div className="group relative p-6 rounded-xl border border-brand/20 bg-gradient-to-br from-brand/5 to-transparent hover:from-brand/10 transition-all duration-300">
                    <div className="absolute top-4 right-4 text-2xl">🛡️</div>
                    <h3 className="font-bold text-brand mb-3 text-lg">Garantía Premium</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Garantía oficial del fabricante por 3 años. Soporte técnico especializado incluido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-lime to-brand rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Especificaciones técnicas
                </h2>
              </div>
              
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="group flex justify-between items-center py-4 px-6 rounded-xl bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/20 hover:border-lime/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime/10"
                    >
                      <span className="font-semibold text-lime text-sm">{key}:</span>
                      <span className="text-gray-200 text-sm text-right ml-4 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">⚙️</div>
                  <p className="text-gray-400 text-lg">No hay especificaciones técnicas disponibles.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-lime to-brand rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Características completas
                </h2>
              </div>
              
              {product.features && product.features.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="group flex items-start space-x-4 p-5 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl hover:from-gray-600/40 hover:to-gray-700/40 transition-all duration-300 border border-gray-600/20 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10"
                      >
                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-lime to-brand rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                          <span className="text-black text-sm font-bold">✓</span>
                        </div>
                        <p className="text-gray-200 font-medium text-sm leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="group relative p-6 rounded-xl border border-brand/20 bg-gradient-to-br from-brand/5 to-transparent hover:from-brand/10 transition-all duration-300">
                      <div className="absolute top-4 right-4 text-2xl">💡</div>
                      <h3 className="font-bold text-brand mb-3 text-lg">Recomendación</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Ideal para gamers, diseñadores o usuarios exigentes que buscan máximo rendimiento.
                      </p>
                    </div>
                    
                    <div className="group relative p-6 rounded-xl border border-lime/20 bg-gradient-to-br from-lime/5 to-transparent hover:from-lime/10 transition-all duration-300">
                      <div className="absolute top-4 right-4 text-2xl">📦</div>
                      <h3 className="font-bold text-lime mb-3 text-lg">Disponibilidad</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Stock limitado. ¡No pierdas la oportunidad de obtener el tuyo!
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">⭐</div>
                  <p className="text-gray-400 text-lg">No hay características adicionales disponibles.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}