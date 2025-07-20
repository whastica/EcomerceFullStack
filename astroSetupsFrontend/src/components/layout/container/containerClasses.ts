import { ContainerProps } from '../container/ContainerTypes';

const variantClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-full',
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  small: 'px-2 py-4',
  default: 'px-4 sm:px-6 lg:px-8 py-6',
  large: 'px-6 sm:px-8 lg:px-12 py-8',
};

const backgroundClasses = {
  transparent: 'bg-transparent',
  surface: 'bg-dark-surface',
  card: 'bg-dark-card',
  background: 'bg-dark-background',
};

type StyleOptions = Pick<
  ContainerProps,
  'variant' | 'padding' | 'maxWidth' | 'center' | 'className' | 'backgroundColor'
>;

export function getContainerClasses({
  variant = 'default',
  padding = 'default',
  maxWidth = '7xl',
  center = true,
  backgroundColor = 'transparent',
  className = '',
}: StyleOptions): string {
  const baseClasses = `w-full ${backgroundClasses[backgroundColor]} text-dark-text`;
  const widthClass =
    maxWidth !== '7xl' ? maxWidthClasses[maxWidth] : variantClasses[variant];
  const paddingClass = paddingClasses[padding];
  const centerClass = center ? 'mx-auto' : '';

  return [baseClasses, widthClass, centerClass, paddingClass, className]
    .filter(Boolean)
    .join(' ');
}
