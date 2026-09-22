import { apiClient } from '@/api/client';
import { CartItem } from '@/pages/cart/Cart';

export type PaymentMethodType = 'CASH_ON_DELIVERY' | 'BANK_TRANSFER' | 'CREDIT_CARD';

export interface GuestUserInfo {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderRequest {
  guestUser?: GuestUserInfo;
  paymentMethod: PaymentMethodType;
  orderItems: { productId: number; quantity: number }[];
  promoCode?: string;
  orderNotes?: string;
}

export interface OrderResponse {
  id: number;
  status: string;
  total: number;
}

const PAYMENT_METHOD_MAP: Record<string, PaymentMethodType> = {
  'credit-card': 'CREDIT_CARD',
  'pse': 'BANK_TRANSFER',
  'paypal': 'BANK_TRANSFER',
  'mercado-pago': 'BANK_TRANSFER',
  'cash-on-delivery': 'CASH_ON_DELIVERY',
};

export const orderService = {
  async createOrder(
    items: CartItem[],
    formData: {
      name: string;
      email: string;
      phone: string;
      country: string;
      state: string;
      city: string;
      address1: string;
      address2?: string;
      zipCode: string;
      paymentMethod: string;
    }
  ): Promise<OrderResponse> {

    const shippingAddress = [formData.address1, formData.address2, formData.city, formData.state, formData.country]
      .filter(Boolean)
      .join(', ');

    const request: CreateOrderRequest = {
      guestUser: {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone || '0000000000',
        shippingAddress,
        city: formData.city,
        postalCode: formData.zipCode || '000000',
      },
      paymentMethod: PAYMENT_METHOD_MAP[formData.paymentMethod] || 'CASH_ON_DELIVERY',
      orderItems: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const response = await apiClient.post<OrderResponse>('/sales/orders', request);
    return response.data;
  },
};
