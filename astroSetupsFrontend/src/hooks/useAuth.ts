import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import type { LoginRequest, RegisterRequest } from '@/interfaces/auth/auth.interface';
import { toast } from 'sonner';

export function useAuth() {
  const navigate = useNavigate();
  const { token, user, isAuthenticated, isAdmin, setAuth, logout } = useAuthStore();

  const login = useCallback(
    async (data: LoginRequest) => {
      try {
        const response = await authService.login(data);
        setAuth(response.token, response.user);
        toast.success(`Bienvenido, ${response.user.firstName}`);
        navigate('/');
        return true;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Credenciales inválidas';
        toast.error(message);
        return false;
      }
    },
    [setAuth, navigate]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        const response = await authService.register(data);
        setAuth(response.token, response.user);
        toast.success('Cuenta creada exitosamente');
        navigate('/');
        return true;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Error al registrar';
        toast.error(message);
        return false;
      }
    },
    [setAuth, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    toast.success('Sesión cerrada');
    navigate('/');
  }, [logout, navigate]);

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout: handleLogout,
  };
}
