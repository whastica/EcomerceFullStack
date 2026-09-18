import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ isOpen, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

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

  if (!isAuthenticated) {
    return (
      <div
        ref={menuRef}
        className="absolute top-full right-0 z-20 mt-2 w-44 bg-dark-surface border border-dark-border shadow-glass rounded-lg py-1"
      >
        <Link
          to="/login"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm text-dark-text hover:bg-dark-background transition-colors"
        >
          <User className="w-4 h-4" /> Iniciar Sesión
        </Link>
        <Link
          to="/register"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm text-dark-text hover:bg-dark-background transition-colors"
        >
          <User className="w-4 h-4" /> Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-20 mt-2 w-44 bg-dark-surface border border-dark-border shadow-glass rounded-lg py-1"
    >
      <div className="px-4 py-2 border-b border-dark-border">
        <p className="text-sm font-medium text-dark-text">{user?.firstName} {user?.lastName}</p>
        <p className="text-xs text-dark-muted truncate">{user?.email}</p>
      </div>
      <button
        onClick={() => { logout(); onClose(); }}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dark-muted hover:text-red-400 hover:bg-dark-background transition-colors"
      >
        <LogOut className="w-4 h-4" /> Cerrar sesión
      </button>
    </div>
  );
}
