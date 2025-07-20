import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'narrow' | 'wide' | 'full';
  padding?: 'none' | 'small' | 'default' | 'large';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  center?: boolean;
  backgroundColor?: 'transparent' | 'surface' | 'card' | 'background';
}