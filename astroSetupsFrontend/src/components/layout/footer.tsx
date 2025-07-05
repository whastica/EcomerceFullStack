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
              <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-dark-text">Astro Setups</span>
            </div>
            <p className="text-sm text-dark-muted mb-4">
              Tu lugar indispensable de tecnología. Encuentra las mejores piezas y componentes para tu computadora gamer o profesional.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
                <a key={platform} href="#" aria-label={platform} className="text-dark-muted hover:text-purple-500 text-lg transition-colors duration-200">
                  {platform === 'facebook' ? '📘' : platform === 'instagram' ? '📷' : platform === 'twitter' ? '🐦' : '📺'}
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
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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