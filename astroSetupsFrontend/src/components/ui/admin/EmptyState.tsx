import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 text-center animate-fade-in',
        className
      )}
    >
      <div className="relative mb-6">
        <div className="p-5 rounded-2xl admin-glass border border-white/[0.08] text-[#AAAAAA]">
          {icon}
        </div>
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/5 to-[#3B82F6]/5 blur-lg -z-10" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#AAAAAA] max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
