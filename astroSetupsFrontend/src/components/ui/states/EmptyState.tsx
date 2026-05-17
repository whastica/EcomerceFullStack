type EmptyStateProps = {
  title?: string;

  message?: string;
};

export default function EmptyState({

  title = 'No hay resultados',

  message = 'No se encontraron productos.',
}: EmptyStateProps) {

  return (
    <div className="text-center py-20">

      <h2
        className="
          text-2xl
          font-bold
          text-dark-text
          mb-3
        "
      >
        {title}
      </h2>

      <p className="text-dark-muted">
        {message}
      </p>

    </div>
  );
}