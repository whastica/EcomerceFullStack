import { useState } from 'react';

export default function PackageTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    console.log('Rastreando paquete:', trackingNumber);
    setTrackingNumber('');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">📦 Rastrea tu Paquete</h3>
      <p className="text-dark-muted mb-4">
        Ingresa tu número de seguimiento para conocer el estado de tu pedido.
      </p>
      <form onSubmit={handleTrackingSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Número de seguimiento"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="px-3 py-2 bg-dark-surface border border-gray-600 rounded-md placeholder-dark-muted focus:ring-2 focus:ring-purple-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={!trackingNumber.trim()}
          className="py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-md transition-all duration-200 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔍 Rastrear Paquete
        </button>
      </form>
      <div className="mt-6 space-y-1 text-dark-muted">
        <p>📧 gamerzone@info.com</p>
        <p>📞 +57 300 123 4567</p>
        <p>📍 Bogotá, Colombia</p>
      </div>
    </div>
  );
}