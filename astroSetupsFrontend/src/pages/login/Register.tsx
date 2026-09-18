import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, User, Phone, UserPlus } from 'lucide-react';

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function validate(): string[] {
    const errs: string[] = [];
    if (!form.firstName.trim()) errs.push('El nombre es obligatorio');
    if (!form.lastName.trim()) errs.push('El apellido es obligatorio');
    if (!form.email.trim()) errs.push('El email es obligatorio');
    if (!form.phone.trim()) errs.push('El teléfono es obligatorio');
    if (form.password.length < 8)
      errs.push('La contraseña debe tener al menos 8 caracteres');
    if (form.password !== form.confirmPassword)
      errs.push('Las contraseñas no coinciden');
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const success = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    setLoading(false);

    if (!success) {
      setErrors(['Error al crear la cuenta. Intenta con otro email.']);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-dark-background text-dark-text flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
      </div>

      <main className="flex-grow flex items-center justify-center z-10 relative py-16 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-dark-border bg-dark-surface/80 backdrop-blur-sm shadow-glass p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-[#FB5607]/15 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-[#FB5607]" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-dark-text">
                Crear Cuenta
              </h1>
              <p className="text-sm text-dark-muted mt-1">
                Únete a nuestra comunidad
              </p>
            </div>

            {errors.length > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                {errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-400">
                    {err}
                  </p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-dark-muted mb-1.5"
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted"
                    />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-dark-muted mb-1.5"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

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
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-dark-muted mb-1.5"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                    placeholder="300 123 4567"
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
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-dark-muted mb-1.5"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted"
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-border bg-dark-background text-dark-text text-sm placeholder:text-dark-muted focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/25 transition-colors"
                    placeholder="Repite tu contraseña"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FB5607] hover:bg-[#e44e06] text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-dark-muted">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/login"
                  className="text-[#FB5607] hover:underline font-medium"
                >
                  Inicia sesión
                </Link>
              </p>
              <p className="text-xs text-dark-muted">
                Al registrarte aceptas nuestros{' '}
                <Link to="/conditions" className="text-[#8B5CF6] hover:underline">
                  Términos
                </Link>{' '}
                y{' '}
                <Link
                  to="/privacy-policies"
                  className="text-[#8B5CF6] hover:underline"
                >
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
