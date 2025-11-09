import { apiService } from './api';
import { DashboardStats, ApiResponse } from '../types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiService.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch dashboard stats');
  },
};
