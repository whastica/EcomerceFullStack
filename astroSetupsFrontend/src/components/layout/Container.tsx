import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'narrow' | 'wide' | 'full';
  padding?: 'none' | 'small' | 'default' | 'large';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  center?: boolean;
}

export default function Container({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'default',
  maxWidth = '7xl',
  center = true
}: ContainerProps) {
  // Configuración de variantes
  const variantClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-full'
  };

  // Configuración de max-width personalizado
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  // Configuración de padding
  const paddingClasses = {
    none: '',
    small: 'px-2 py-4',
    default: 'px-4 sm:px-6 lg:px-8 py-6',
    large: 'px-6 sm:px-8 lg:px-12 py-8'
  };

  // Construir clases base
  const baseClasses = 'w-full';
  
  // Construir clases de max-width
  const maxWidthClass = maxWidth !== '7xl' ? maxWidthClasses[maxWidth] : variantClasses[variant];
  
  // Construir clases de padding
  const paddingClass = paddingClasses[padding];
  
  // Construir clases de centrado
  const centerClass = center ? 'mx-auto' : '';
  
  // Combinar todas las clases
  const containerClasses = [
    baseClasses,
    maxWidthClass,
    centerClass,
    paddingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}
