'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  Subscription,
  NotificationItem,
  UserProfile,
  ScreenName,
  MainTab
} from '@/types/aquadrop';
import {
  INITIAL_PRODUCTS,
  INITIAL_ADDRESSES,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_NOTIFICATIONS
} from '@/lib/data';

interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minOrder: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  AQUA20: {
    code: 'AQUA20',
    discountPercentage: 20,
    maxDiscount: 150,
    minOrder: 150,
    description: 'Get 20% off up to ₹150'
  },
  FREEDROP: {
    code: 'FREEDROP',
    discountPercentage: 100,
    maxDiscount: 40,
    minOrder: 100,
    description: 'Free delivery on your order'
  },
  HYDRATE100: {
    code: 'HYDRATE100',
    discountPercentage: 25,
    maxDiscount: 100,
    minOrder: 300,
    description: 'Flat ₹100 off on orders above ₹300'
  }
};

interface AquaContextType {
  // Navigation
  currentScreen: ScreenName;
  screenHistory: ScreenName[];
  activeTab: MainTab;
  navigateTo: (screen: ScreenName, params?: { product?: Product; order?: Order }) => void;
  goBack: () => void;
  setActiveTab: (tab: MainTab) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  // Catalog & Search
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isSubscription?: boolean, frequency?: 'daily' | 'alternate' | 'weekly' | 'monthly') => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Pricing calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartTaxes: number;
  cartDeliveryFee: number;
  cartTotal: number;

  // Addresses
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (paymentMethod: string, deliverySlot: string) => Order;
  reorder: (order: Order) => void;

  // Subscriptions
  subscriptions: Subscription[];
  addSubscription: (product: Product, quantity: number, frequency: 'Daily' | 'Alternate Days' | 'Weekly' | 'Monthly') => void;
  toggleSubscriptionStatus: (subscriptionId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Auth & Profile
  user: UserProfile;
  isLoggedIn: boolean;
  loginPhone: string;
  setLoginPhone: (phone: string) => void;
  otpCode: string;
  setOtpCode: (code: string) => void;
  sendOtp: () => void;
  verifyOtp: () => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Device view
  isMobileSimulator: boolean;
  toggleMobileSimulator: () => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AquaContext = createContext<AquaContextType | undefined>(undefined);

export const AquaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenName[]>(['home']);
  const [activeTab, setActiveTabState] = useState<MainTab>('home');

  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[2]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '20L Water Can',
    'Pet Bottles',
    'Hot & Cold Dispenser',
    'Electric Pump'
  ]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(INITIAL_ADDRESSES[0]);

  // Orders & Subscriptions
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Auth
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginPhone, setLoginPhone] = useState<string>('9876543210');
  const [otpCode, setOtpCode] = useState<string>('');

  // UI state
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navigateTo = (screen: ScreenName, params?: { product?: Product; order?: Order }) => {
    if (params?.product) {
      setSelectedProduct(params.product);
    }
    if (params?.order) {
      setActiveTrackingOrder(params.order);
    }

    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);

    // Sync tab state if navigating to a top-level screen
    if (screen === 'home') setActiveTabState('home');
    else if (screen === 'products') setActiveTabState('products');
    else if (screen === 'subscriptions') setActiveTabState('subscriptions');
    else if (screen === 'cart') setActiveTabState('cart');
    else if (screen === 'profile') setActiveTabState('profile');

    // Scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);

      if (prevScreen === 'home') setActiveTabState('home');
      else if (prevScreen === 'products') setActiveTabState('products');
      else if (prevScreen === 'subscriptions') setActiveTabState('subscriptions');
      else if (prevScreen === 'cart') setActiveTabState('cart');
      else if (prevScreen === 'profile') setActiveTabState('profile');
    } else {
      setCurrentScreen('home');
      setActiveTabState('home');
    }
  };

  const setActiveTab = (tab: MainTab) => {
    setActiveTabState(tab);
    if (tab === 'home') navigateTo('home');
    else if (tab === 'products') navigateTo('products');
    else if (tab === 'subscriptions') navigateTo('subscriptions');
    else if (tab === 'cart') navigateTo('cart');
    else if (tab === 'profile') navigateTo('profile');
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 8);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Cart Functions
  const addToCart = (
    product: Product,
    quantity: number = 1,
    isSubscription: boolean = false,
    frequency?: 'daily' | 'alternate' | 'weekly' | 'monthly'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          isSubscription: isSubscription || updated[existingIndex].isSubscription,
          frequency: frequency || updated[existingIndex].frequency
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          isSubscription,
          frequency
        }
      ];
    });
    showToast(`Added ${quantity}x ${product.name} to Cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const uppercaseCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[uppercaseCode];
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    if (cartSubtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrder} required for ${uppercaseCode}`
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${uppercaseCode} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.code === 'FREEDROP') {
      cartDiscount = 30; // free delivery value
    } else {
      const calc = (cartSubtotal * appliedCoupon.discountPercentage) / 100;
      cartDiscount = Math.min(calc, appliedCoupon.maxDiscount);
    }
  }

  const cartTaxes = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartDeliveryFee = cartSubtotal > 300 || appliedCoupon?.code === 'FREEDROP' ? 0 : 30;
  const cartTotal = Math.max(0, cartSubtotal + cartTaxes + cartDeliveryFee - cartDiscount);

  // Addresses
  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const full: Address = { ...newAddr, id };
    if (full.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
    }
    setAddresses((prev) => [full, ...prev]);
    setSelectedAddress(full);
    showToast('Address added successfully');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted');
  };

  // Place Order
  const placeOrder = (paymentMethod: string, deliverySlot: string): Order => {
    const orderNum = `AD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: 'Today',
      items: [...cart],
      itemTotal: cartSubtotal,
      taxes: cartTaxes,
      deliveryFee: cartDeliveryFee,
      discount: cartDiscount,
      totalAmount: cartTotal,
      status: 'Order Confirmed',
      timeline: [
        { title: 'Order Confirmed', time: 'Just now', completed: true, isCurrent: true },
        { title: 'Packed', time: 'Est. 10 mins', completed: false },
        { title: 'Out for Delivery', time: 'Est. 20 mins', completed: false },
        { title: 'Delivered', time: deliverySlot || 'Est. 35 mins', completed: false }
      ],
      deliveryPartner: {
        name: 'Ravi Kumar',
        phone: '+91 91234 56789',
        vehicle: 'Tata Ace',
        registrationNumber: 'MH12AB1234',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        lat: 19.062,
        lng: 72.838
      },
      address: selectedAddress,
      paymentMethod,
      estimatedDeliveryTime: deliverySlot || '30-40 mins'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Order Placed! 💧',
      message: `Your order #${orderNum} for ₹${cartTotal} has been placed successfully.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'order'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    clearCart();
    return newOrder;
  };

  const reorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    navigateTo('cart');
    showToast(`Items from #${order.orderNumber} added to cart!`);
  };

  // Subscriptions
  const addSubscription = (
    product: Product,
    quantity: number,
    frequency: 'Daily' | 'Alternate Days' | 'Weekly' | 'Monthly'
  ) => {
    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      product,
      quantity,
      frequency,
      nextDeliveryDate: 'Tomorrow, 8:00 AM',
      status: 'Active',
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deliveriesCompleted: 0
    };
    setSubscriptions((prev) => [newSub, ...prev]);
    showToast(`Subscribed to ${product.name} (${frequency})`);
  };

  const toggleSubscriptionStatus = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
          showToast(`Subscription ${nextStatus.toLowerCase()}`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared');
  };

  // Auth & Profile
  const sendOtp = () => {
    showToast(`OTP 4242 sent to +91 ${loginPhone}`);
    navigateTo('otp');
  };

  const verifyOtp = () => {
    if (otpCode === '4242' || otpCode.length === 4) {
      setIsLoggedIn(true);
      showToast('Logged in successfully!');
      navigateTo('home');
      return true;
    }
    showToast('Invalid OTP. Use test code: 4242');
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out');
    navigateTo('login');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('Profile updated!');
  };

  const toggleMobileSimulator = () => {
    setIsMobileSimulator((prev) => !prev);
  };

  return (
    <AquaContext.Provider
      value={{
        currentScreen,
        screenHistory,
        activeTab,
        navigateTo,
        goBack,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        activeTrackingOrder,
        setActiveTrackingOrder,

        products,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,

        cartSubtotal,
        cartDiscount,
        cartTaxes,
        cartDeliveryFee,
        cartTotal,

        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        deleteAddress,

        orders,
        placeOrder,
        reorder,

        subscriptions,
        addSubscription,
        toggleSubscriptionStatus,

        notifications,
        unreadNotificationCount,
        markNotificationRead,
        clearAllNotifications,

        user,
        isLoggedIn,
        loginPhone,
        setLoginPhone,
        otpCode,
        setOtpCode,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,

        isMobileSimulator,
        toggleMobileSimulator,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AquaContext.Provider>
  );
};

export const useAqua = () => {
  const context = useContext(AquaContext);
  if (!context) {
    throw new Error('useAqua must be used within an AquaProvider');
  }
  return context;
};
