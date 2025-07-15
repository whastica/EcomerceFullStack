
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    console.log('Rastreando paquete:', trackingNumber);
    setTrackingNumber('');
  };

  return (
    <footer className="bg-dark-card text-dark-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/assets/icono/logo.png" 
                alt="Astro Setups Logo" 
                className="ml-2 h-8"
              />
            </div>
            <p className="text-sm text-dark-muted mb-4">
              Tu lugar indispensable de tecnología. Encuentra las mejores piezas y componentes para tu computadora gamer o profesional.
            </p>
            <div className="flex space-x-3">
              {[
                { platform: 'facebook', emoji: '📘' },
                { platform: 'instagram', emoji: '📷' },
                { platform: 'twitter', emoji: '🐦' },
                { platform: 'youtube', emoji: '📺' }
              ].map(({ platform, emoji }) => (
                <a 
                  key={platform} 
                  href="#" 
                  aria-label={platform}
                  className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg flex items-center justify-center text-white text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md border-2 border-orange-300"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    boxShadow: '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
                  }}
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-text">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li><Link to="/" className="hover:text-purple-500 transition-colors duration-200">🏠 Inicio</Link></li>
              <li><Link to="/products" className="hover:text-purple-500 transition-colors duration-200">📦 Catálogo</Link></li>
              <li><Link to="/promotions" className="hover:text-purple-500 transition-colors duration-200">🎉 Promociones</Link></li>
              <li><Link to="/customPc" className="hover:text-purple-500 transition-colors duration-200">🖥️ Personaliza tu PC</Link></li>
              <li><Link to="/contact" className="hover:text-purple-500 transition-colors duration-200">❓ Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Rastreo */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-text">📦 Rastrea tu Paquete</h3>
            <p className="text-sm text-dark-muted mb-4">
              Ingresa tu número de seguimiento para conocer el estado de tu pedido.
            </p>
            <form onSubmit={handleTrackingSubmit} className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Número de seguimiento"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="px-3 py-2 text-sm text-dark-text bg-dark-surface border border-gray-600 rounded-md placeholder-dark-muted focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                required
              />
              <button
                type="submit"
                disabled={!trackingNumber.trim()}
                className="text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-lg transform hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-300"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  boxShadow: '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
                }}
              >
                🔍 Rastrear Paquete
              </button>
            </form>
            <div className="mt-6 text-sm text-dark-muted space-y-1">
              <p>📧 info@astrosetups.com</p>
              <p>📞 +57 300 123 4567</p>
              <p>📍 Bogotá, Colombia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span className="text-sm text-dark-muted text-center md:text-left">
            © {new Date().getFullYear()} Astro Setups. Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <Link to="/privacy" className="text-dark-muted hover:text-purple-500 transition-colors duration-200">Política de Privacidad</Link>
            <Link to="/terms" className="text-dark-muted hover:text-purple-500 transition-colors duration-200">Términos y Condiciones</Link>
            <Link to="/shipping" className="text-dark-muted hover:text-purple-500 transition-colors duration-200">Política de Envíos</Link>
            <Link to="/warranty" className="text-dark-muted hover:text-purple-500 transition-colors duration-200">Garantías</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}