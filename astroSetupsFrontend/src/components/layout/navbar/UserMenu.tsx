import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ isOpen, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-20 mt-2 w-40 bg-white dark:bg-dark-surface shadow-md rounded-md py-1"
    >
      <Link
        to="/profile"
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-background"
      >
        <User className="w-4 h-4" /> Perfil
      </Link>
      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-background"
      >
        <LogOut className="w-4 h-4" /> Cerrar sesión
      </button>
    </div>
  );
}