import { apiService } from './api';
import { ShopifyProduct, ApiResponse } from '../types';

export const productService = {
  async getProducts(search?: string, limit: number = 50): Promise<ShopifyProduct[]> {
    const response = await apiService.get<ApiResponse<ShopifyProduct[]>>('/products', {
      search,
      limit,
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch products');
  },

  async getProduct(id: number): Promise<ShopifyProduct> {
    const response = await apiService.get<ApiResponse<ShopifyProduct>>(`/products/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch product');
  },
};
