export type OrderStatus = 'PENDING' | 'IN_PREPARATION' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type UserRole = 'CLIENT' | 'ADMIN' | 'SUPER_ADMIN';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DELETED';

export type PaymentMethod = 'CASH_ON_DELIVERY' | 'BANK_TRANSFER' | 'CREDIT_CARD';

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}

export interface SalesStats {
  totalOrders: number;
  ordersPending: number;
  ordersShipped: number;
  ordersDelivered: number;
  ordersCancelled: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalCustomers: number;
}

export interface SalesSeriesPoint {
  date: string;
  label: string;
  orders: number;
  revenue: number;
}

export interface SalesSeries {
  period: string;
  days: number;
  points: SalesSeriesPoint[];
}

export interface CustomerStats {
  totalCustomers: number;
  verifiedCustomers: number;
  unverifiedCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomersThisMonth: number;
  customersByStatus: { status: string; count: number }[];
  avgOrdersPerCustomer: number;
  totalShippingAddresses: number;
}

export interface ProductSummary {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  effectivePrice: number | null;
  hasDiscount: boolean;
  brand: string | null;
  imageUrl: string | null;
  stock: number;
  active: boolean;
  categoryName: string;
}

export interface ProductDetail extends ProductSummary {
  description: string | null;
  discountPercentage: number | null;
  hasVariations: boolean;
  category: { id: number; name: string; slug: string };
  galleryImages: string[];
}

export interface CategorySummary {
  id: number;
  name: string;
  slug: string;
  categoryTypeName: string;
}

export interface OrderSummary {
  id: number;
  total: number;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  userFullName: string;
  totalItems: number;
  firstProductName: string;
  summaryDescription: string | null;
}

export interface OrderDetail {
  id: number;
  subtotal: number;
  totalDiscount: number;
  shippingCost: number;
  total: number;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  userId: number;
  userFullName: string;
  userEmail: string;
  guestUser: {
    fullName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
  } | null;
  orderItems: OrderItem[];
  totalItems: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  unitPrice: number;
  originalSubtotal: number;
  discountAmount: number;
  finalSubtotal: number;
  available: boolean;
}

export interface OrderSearchResult {
  orders: OrderSummary[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UserAdmin {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  createdAt: string;
  totalOrders: number;
  activeShippingAddresses: number;
  cityName: string | null;
  postalCode: string | null;
}

export interface UserAdminProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  createdAt: string;
  cityName: string | null;
  postalCode: string | null;
  shippingAddresses: {
    id: number;
    addressLine1: string;
    addressLine2: string | null;
    recipientName: string;
    phone: string;
    isDefault: boolean;
    cityName: string;
    stateName: string;
    countryName: string;
  }[];
  totalOrders: number;
  pendingOrders: number;
  totalSpent: number;
  lastOrderDate: string | null;
  hasActiveOrders: boolean;
}

// =====================
// PROMOCIONES
// =====================

export type PromoDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

export interface PromoCodeSummary {
  code: string;
  discountType: PromoDiscountType;
  discountValue: number;
  expirationDate: string | null;
  active: boolean;
  timesUsed: number;
  remainingUses: number | null;
  expired: boolean;
}

export interface PromoCodeUsageRanking {
  code: string;
  type: PromoDiscountType;
  discountValue: number;
  timesUsed: number;
}

export interface PromoCodeStats {
  totalPromoCodes: number;
  activePromoCodes: number;
  expiredPromoCodes: number;
  disabledPromoCodes: number;
  totalUniqueCodesUsed: number;
  totalApplications: number;
  totalDiscountGiven: number;
  averageDiscountValue: number;
  promoCodesByType: Record<string, number>;
  totalDiscountGivenByType: Record<string, number>;
  topUsedCodes: PromoCodeUsageRanking[];
  promoCodesExpiringSoon: number;
  lastCodeCreated: string | null;
}

export interface PromoSearchFilters {
  searchTerm?: string;
  active?: boolean;
  expired?: boolean;
  page?: number;
  size?: number;
}

export interface PromoCreateRequest {
  code: string;
  discountValue: number;
  expirationDate?: string | null;
  remainingUses?: number | null;
  onlyForDiscountedProducts?: boolean;
  active?: boolean;
}

export interface PromoUpdateRequest {
  discountValue?: number;
  expirationDate?: string | null;
  remainingUses?: number | null;
  forDiscountedProductsOnly?: boolean;
  active?: boolean;
}
