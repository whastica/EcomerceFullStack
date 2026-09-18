import { create } from 'zustand';
import type { UserInfo } from '@/interfaces/auth/auth.interface';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  isAdmin: boolean;

  setAuth: (token: string, user: UserInfo) => void;
  logout: () => void;
  initialize: () => void;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({
      token,
      user,
      isAuthenticated: true,
      isAdmin: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN',
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  initialize: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (token && userJson) {
      try {
        const user: UserInfo = JSON.parse(userJson);
        set({
          token,
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN',
        });
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
  },
}));
