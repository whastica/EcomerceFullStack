import { Link } from 'react-router-dom';

export default function PackageTracking() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">📦 Rastrea tu Paquete</h3>
      <Link
        to="/tracking"
        className="inline-block py-2 px-4 bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand-dark text-white font-medium rounded-md transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
      >
        🔍 Rastrear Paquete
      </Link>
    </div>
  );
}
