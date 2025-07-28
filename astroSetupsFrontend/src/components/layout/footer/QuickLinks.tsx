import { Link } from 'react-router-dom';

export default function QuickLinks() {
  const links = [
    { to: '/', label: '🏠 Inicio' },
    { to: '/products', label: '📦 Catálogo' },
    { to: '/promotions', label: '🎉 Promociones' },
    { to: '/customPc', label: '🖥️ Personaliza tu PC' },
    { to: '/contact', label: '❓ Contacto' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
      <ul className="space-y-2 text-dark-muted">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="hover:text-purple-500 transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}