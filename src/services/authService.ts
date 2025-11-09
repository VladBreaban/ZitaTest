import { apiService } from './api';
import { LoginRequest, RegisterRequest, LoginResponse, ApiResponse } from '../types';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post<ApiResponse<LoginResponse>>('/auth/login/doctor', data);
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    }
    throw new Error(response.data.message || 'Login failed');
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiService.post<ApiResponse<LoginResponse>>('/auth/register', data);
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser(): LoginResponse | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};
