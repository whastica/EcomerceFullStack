import { Link } from 'react-router-dom';

export default function QuickLinks() {
  const links = [
    { to: '/', label: '🏠 Inicio' },
    { to: '/catalog', label: '📦 Productos' },
    { to: '/contact', label: '❓ Contacto' },
    { to: '/privacy-policies', label: '📄 Políticas contra entrega' },
    { to: '/contact', label: '🚚 Información de envíos' },
    { to: '/conditions', label: '📜 Condiciones de uso y garantías' },
    { to: '/privacy-policies', label: '🔒 Políticas de privacidad' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
      <ul className="space-y-2 text-dark-muted">
        {links.map(({ to, label }, index) => (
          <li key={`${to}-${index}`}>
            <Link to={to} className="hover:text-purple-500 transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}