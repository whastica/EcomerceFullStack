type ErrorStateProps = {
  title?: string;

  message?: string;
};

export default function ErrorState({

  title = 'Ha ocurrido un error',

  message = 'Intenta nuevamente más tarde.',
}: ErrorStateProps) {

  return (
    <div className="text-center py-20">

      <h2
        className="
          text-2xl
          font-bold
          text-red-500
          mb-3
        "
      >
        {title}
      </h2>s

      <p className="text-dark-muted">
        {message}
      </p>

    </div>
  );
}