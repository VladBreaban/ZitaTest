export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  expiresAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface DashboardStats {
  activeClients: number;
  totalRecommendations: number;
  purchasedRecommendations: number;
  viewedRecommendations: number;
  draftRecommendations: number;
  pendingOrders: number;
  totalCommissions: number;
  thisMonthCommissions: number;
  pendingCommissions: number;
}

export interface Recommendation {
  id: number;
  protocolName: string;
  shortDescription?: string;
  status: string;
  totalPrice: number;
  commissionAmount: number;
  createdAt: string;
  viewedAt?: string;
  purchasedAt?: string;
  clientEmail: string;
  clientFirstName?: string;
  clientLastName?: string;
  productCount: number;
}

export interface RecommendationDetails {
  id: number;
  protocolName: string;
  shortDescription?: string;
  status: string;
  totalPrice: number;
  commissionAmount: number;
  createdAt: string;
  viewedAt?: string;
  purchasedAt?: string;
  client: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  products: RecommendationProduct[];
}

export interface RecommendationProduct {
  id: number;
  shopifyProductId: number;
  shopifyVariantId?: number;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  dailyDosage?: string;
  notes?: string;
  price: number;
}

export interface CreateRecommendationRequest {
  shopifyCustomerId: number;
  protocolName: string;
  shortDescription?: string;
  products: {
    shopifyProductId: number;
    shopifyVariantId?: number;
    productName: string;
    productImageUrl?: string;
    quantity: number;
    dailyDosage?: string;
    notes?: string;
    price: number;
  }[];
}

export interface Client {
  shopifyCustomerId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status: string;
  addedDate: string;
  recommendationCount: number;
  totalCommission: number;
}

export interface ShopifyCustomer {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  created_at?: string;
  updated_at?: string;
  images?: {
    id: number;
    src: string;
    alt?: string;
  }[];
  variants?: {
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku?: string;
    inventory_quantity?: number;
  }[];
}

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
