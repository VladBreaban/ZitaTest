import { apiService } from './api';
import {
  Recommendation,
  RecommendationDetails,
  CreateRecommendationRequest,
  PagedResponse,
  ApiResponse,
} from '../types';

export const recommendationService = {
  async getRecommendations(
    status?: string,
    search?: string,
    pageSize: number = 20,
    pageNumber: number = 1
  ): Promise<PagedResponse<Recommendation>> {
    const response = await apiService.get<ApiResponse<PagedResponse<Recommendation>>>(
      '/recommendations',
      { status, search, pageSize, pageNumber }
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch recommendations');
  },

  async getRecommendationDetails(id: number): Promise<RecommendationDetails> {
    const response = await apiService.get<ApiResponse<RecommendationDetails>>(
      `/recommendations/${id}`
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch recommendation details');
  },

  async createRecommendation(data: CreateRecommendationRequest): Promise<{ id: number }> {
    const response = await apiService.post<ApiResponse<{ id: number }>>(
      '/recommendations',
      data
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create recommendation');
  },

  async deleteRecommendation(id: number): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/recommendations/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete recommendation');
    }
  },
};
