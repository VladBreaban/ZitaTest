import { apiService } from './api';
import { Client, ShopifyCustomer, PagedResponse, ApiResponse } from '../types';

interface CreateClientRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const clientService = {
  async getClients(
    status?: string,
    search?: string,
    pageSize: number = 20,
    pageNumber: number = 1
  ): Promise<PagedResponse<Client>> {
    const response = await apiService.get<ApiResponse<PagedResponse<Client>>>('/clients', {
      status,
      search,
      pageSize,
      pageNumber,
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch clients');
  },

  async searchShopifyCustomers(searchTerm: string): Promise<ShopifyCustomer[]> {
    const response = await apiService.get<ApiResponse<ShopifyCustomer[]>>(
      '/clients/search',
      { searchTerm }
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to search customers');
  },

  async createClient(data: CreateClientRequest): Promise<ShopifyCustomer> {
    const response = await apiService.post<ApiResponse<ShopifyCustomer>>('/clients', data);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create client');
  },
};
