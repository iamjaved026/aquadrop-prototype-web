export type ProductCategory = 'cans' | 'bottles' | 'dispensers' | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  volume: string; // e.g. "20 L", "1 L", "10 L"
  price: number;
  originalPrice?: number;
  unit: string; // e.g. "Per Jar", "per case", "per piece"
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string; // e.g. "20 L", "1L Bottle Pack", "Best Seller"
  isPopular?: boolean;
  isRecommended?: boolean;
  features?: string[];
  purityStats?: {
    ph: string;
    tds: string;
    purification: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
  frequency?: 'daily' | 'alternate' | 'weekly' | 'monthly';
}

export interface Address {
  id: string;
  title: string; // e.g. "Home", "Office", "Apartment"
  fullAddress: string;
  pincode: string;
  city: string;
  landmark?: string;
  contactPhone: string;
  isDefault: boolean;
  lat: number;
  lng: number;
}

export type OrderStatus = 'Order Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface TimelineStep {
  title: OrderStatus;
  time: string;
  completed: boolean;
  isCurrent?: boolean;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  registrationNumber: string;
  rating: number;
  avatar: string;
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "AD-98234"
  date: string;
  items: CartItem[];
  itemTotal: number;
  taxes: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  timeline: TimelineStep[];
  deliveryPartner?: DeliveryPartner;
  address: Address;
  paymentMethod: string;
  estimatedDeliveryTime: string;
}

export interface Subscription {
  id: string;
  product: Product;
  quantity: number;
  frequency: 'Daily' | 'Alternate Days' | 'Weekly' | 'Monthly';
  nextDeliveryDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  startDate: string;
  deliveriesCompleted: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'order' | 'subscription' | 'offer' | 'system';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  membership: string;
  avatar: string;
  walletBalance: number;
  memberSince: string;
}

export type ScreenName =
  | 'splash'
  | 'login'
  | 'otp'
  | 'home'
  | 'products'
  | 'product_details'
  | 'cart'
  | 'addresses'
  | 'checkout'
  | 'payment_methods'
  | 'order_tracking'
  | 'subscriptions'
  | 'notifications'
  | 'order_history'
  | 'profile'
  | 'help'
  | 'privacy'
  | 'terms'
  | 'settings'
  | 'search';

export type MainTab = 'home' | 'products' | 'subscriptions' | 'cart' | 'profile';
