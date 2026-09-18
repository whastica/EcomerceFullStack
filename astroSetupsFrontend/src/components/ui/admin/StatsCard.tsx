import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  className?: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl admin-glass admin-card-hover p-5 animate-fade-in-up opacity-0',
        className
      )}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2.5">
          <p className="text-xs text-[#AAAAAA] font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-white admin-glow-text">{value}</p>
          {subtitle && (
            <p className="text-[11px] text-[#AAAAAA]">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-semibold',
                  trend.isPositive ? 'text-[#D7FE3B]' : 'text-[#FB5607]'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-[10px] text-[#AAAAAA]">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/10 border border-[#8B5CF6]/15">
            <Icon size={20} className="text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
          </div>
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#8B5CF6]/10 to-transparent blur-sm -z-10" />
        </div>
      </div>
    </div>
  );
}
