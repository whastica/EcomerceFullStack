import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/catalog' },
  { name: 'Promociones', path: '/promotions' },
];

export function DesktopLinks() {
  return (
    <div className="hidden md:flex gap-6 items-center">
      {links.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-brand ${isActive ? 'text-brand' : 'text-dark-muted'}`
          }
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}
