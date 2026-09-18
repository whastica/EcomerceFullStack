import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  keyExtractor: (item: T) => string | number;
}

export default function DataTable<T>({
  columns,
  data,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  onRowClick,
  emptyMessage = 'No hay datos disponibles',
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl admin-glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-5 py-3.5 text-left text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-16 text-center text-[#AAAAAA]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'admin-row-hover animate-fade-in opacity-0',
                    onRowClick && 'cursor-pointer'
                  )}
                  style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'forwards' }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn('px-5 py-3.5 text-white', col.className)}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#AAAAAA]">
            {totalElements} resultado{totalElements !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-2 rounded-xl admin-glass text-[#AAAAAA] hover:text-white hover:border-[#8B5CF6]/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (currentPage < 3) {
                  pageNum = i;
                } else if (currentPage > totalPages - 4) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-xs font-medium transition-all duration-300',
                      pageNum === currentPage
                        ? 'bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shadow-lg shadow-[#8B5CF6]/20'
                        : 'text-[#AAAAAA] hover:text-white hover:bg-white/[0.05]'
                    )}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-2 rounded-xl admin-glass text-[#AAAAAA] hover:text-white hover:border-[#8B5CF6]/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
