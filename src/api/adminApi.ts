import { ModakProduct, CustomerOrder, StoreSettings, DeliverySlot, AuthUser } from '../types';

async function req(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }
  return data;
}

export const adminApi = {
  // Auth (separate hidden-portal session, distinct from customer login)
  login(email: string, password: string): Promise<{ user: AuthUser }> {
    return req('/auth/admin-login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },
  logout(): Promise<{ message: string }> {
    return req('/auth/admin-logout', { method: 'POST' });
  },
  me(): Promise<{ user: AuthUser }> {
    return req('/auth/admin-me');
  },

  // Products
  getProducts(): Promise<ModakProduct[]> {
    return req('/products');
  },
  createProduct(product: Partial<ModakProduct>): Promise<ModakProduct> {
    return req('/products', { method: 'POST', body: JSON.stringify(product) });
  },
  updateProduct(id: string, product: Partial<ModakProduct>): Promise<ModakProduct> {
    return req(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) });
  },
  deleteProduct(id: string): Promise<{ success: boolean }> {
    return req(`/products/${id}`, { method: 'DELETE' });
  },

  // Orders
  getOrders(): Promise<CustomerOrder[]> {
    return req('/orders');
  },
  updateOrderStatus(id: string, status?: string, paymentStatus?: string): Promise<CustomerOrder> {
    return req(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, paymentStatus }) });
  },
  deleteOrder(id: string): Promise<{ success: boolean }> {
    return req(`/orders/${id}`, { method: 'DELETE' });
  },

  // Settings
  getSettings(): Promise<StoreSettings> {
    return req('/settings');
  },
  updateSettings(settings: Partial<StoreSettings>): Promise<StoreSettings> {
    return req('/settings', { method: 'PUT', body: JSON.stringify(settings) });
  },

  // Slots
  getSlots(): Promise<DeliverySlot[]> {
    return req('/slots');
  },
  updateSlots(slots: DeliverySlot[]): Promise<DeliverySlot[]> {
    return req('/slots', { method: 'PUT', body: JSON.stringify(slots) });
  },
};
