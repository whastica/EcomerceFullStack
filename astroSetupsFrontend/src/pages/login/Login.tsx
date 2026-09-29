import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-app-gradient text-dark-text flex flex-col relative">

      <main className="flex-grow flex items-center justify-center z-10 relative py-16 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-dark-border bg-dark-surface/80 backdrop-blur-sm shadow-glass p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-brand/15 flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-brand" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-dark-text">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-dark-muted mt-1">
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-dark-muted mb-1.5"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted"
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/25 transition-colors"
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-dark-muted mb-1.5"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted"
                  />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/25 transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-dark-muted">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/register"
                  className="text-brand hover:underline font-medium"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
