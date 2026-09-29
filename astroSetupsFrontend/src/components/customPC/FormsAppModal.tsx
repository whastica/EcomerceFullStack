import { useEffect, useState } from 'react';
import { X, ExternalLink, Loader2, ClipboardList } from 'lucide-react';
import { getFormsAppUrl } from '../../config/formsApp';

interface FormsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function FormsAppModal({
  isOpen,
  onClose,
  title = 'Personaliza tu PC',
}: FormsAppModalProps) {
  const [isReady, setIsReady] = useState(false);
  const formUrl = getFormsAppUrl();

  useEffect(() => {
    if (!isOpen) return;

    setIsReady(false);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        aria-label="Cerrar formulario"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm"
      />

      <div className="relative flex h-[85vh] w-full max-w-4xl animate-scale-in flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-background shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-dark-border bg-dark-surface px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <ClipboardList size={18} className="shrink-0 text-brand" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{title}</p>
              <p className="truncate text-xs text-dark-muted">
                Cuéntanos para qué necesitas tu computadora
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {formUrl && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg border border-dark-border px-3 py-1.5 text-xs font-medium text-dark-muted transition-colors hover:border-brand hover:text-white sm:flex"
              >
                <ExternalLink size={14} />
                Abrir en otra pestaña
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-lg p-2 text-dark-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex-1 bg-white">
          {!formUrl ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-dark-background px-6 text-center">
              <ClipboardList size={40} className="text-brand" />
              <p className="text-lg font-semibold text-dark-text">
                Formulario aún no configurado
              </p>
              <p className="max-w-md text-sm leading-relaxed text-dark-muted">
                Pega la URL o el ID de Forms.app en{' '}
                <code className="rounded bg-dark-surface px-1.5 py-0.5 text-lime">
                  src/config/formsApp.ts
                </code>{' '}
                y el formulario se cargará aquí automáticamente.
              </p>
            </div>
          ) : (
            <>
              {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-background">
                  <Loader2 size={32} className="animate-spin text-brand" />
                </div>
              )}
              <iframe
                key={formUrl}
                src={formUrl}
                title={title}
                loading="lazy"
                onLoad={() => setIsReady(true)}
                className="relative h-full w-full border-0 bg-white"
                allow="clipboard-write"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
