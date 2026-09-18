import { apiClient } from '@/api/client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CurrentUser,
} from '@/interfaces/auth/auth.interface';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await apiClient.get<CurrentUser>('/auth/me');
    return response.data;
  },
};
