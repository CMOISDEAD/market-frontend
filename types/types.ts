/* eslint-disable @typescript-eslint/no-explicit-any */

// ===== ENUMS =====
export type RoleType = "USER" | "ADMIN";
export type GenderType = "MALE" | "FEMALE" | "UNISEX" | "KIDS";
export type OrderStatusType =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";
export type PaymentStatusType =
  | "UNPAID"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";
export type ShippingStatusType =
  | "NOT_SHIPPED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

// ===== MODELS =====
export interface UserType {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  activated: boolean;
  role: RoleType;
  createdAt: string;
  updatedAt?: string;
  city?: string;
  country?: string;

  // Relaciones
  addresses: AddressType[];
  cart?: CartType;
  orders: OrderType[];
  loginAudits: LoginAuditType[];
  meta?: any;
}

export interface AddressType {
  id: string;
  userId: string;
  label?: string;
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;

  user: UserType;
  Order: OrderType[];
}

export interface LoginAuditType {
  id: string;
  userId: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
  success: boolean;
  meta?: any;

  user: UserType;
}

export interface CartType {
  id: string;
  userId: string;
  updatedAt?: string;
  createdAt: string;

  user: UserType;
  items: CartItemType[];
}

export interface CartItemType {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  priceAtAdd: number;
  meta?: any;

  cart: CartType;
  product: ProductType;
}

export interface ProductType {
  id: string;
  sku?: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  stock: number;
  categories: string[];
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
  gender: GenderType;
  meta?: any;

  orderItems: OrderItemType[];
  cartItems: CartItemType[];
}

export interface OrderType {
  id: string;
  userId: string;
  totalAmount: number;
  currency: string;
  status: OrderStatusType;
  paymentStatus: PaymentStatusType;
  shippingStatus: ShippingStatusType;
  init_point: string;
  shippingAddressId?: string;
  shippingCarrier?: string;
  shippingTrackingNumber?: string;
  shippingNotes?: string;
  history: any[];
  payment?: any;
  createdAt: string;
  updatedAt?: string;
  canceledAt?: string;
  deliveredAt?: string;
  refundedAt?: string;
  meta?: any;

  user: UserType;
  items: OrderItemType[];
  shippingAddress?: AddressType;
}

export interface OrderItemType {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  meta?: any;

  order: OrderType;
  product: ProductType;
}
