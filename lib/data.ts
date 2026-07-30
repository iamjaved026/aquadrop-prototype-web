import { Product, Address, Order, Subscription, NotificationItem, UserProfile } from '@/types/aquadrop';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-20l-can',
    name: '20L Packaged Drinking Water',
    category: 'cans',
    volume: '20 L',
    price: 100,
    originalPrice: 120,
    unit: 'Per Jar',
    description:
      'Pure, refreshing, and high-quality water delivered in a convenient 20L can. Perfect for homes and offices. Stay hydrated with AquaDrop\'s rigorous quality standards.',
    rating: 4.9,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=800&auto=format&fit=crop',
    badge: '20 L',
    isPopular: true,
    isRecommended: true,
    features: [
      '7-Stage RO + UV + UF Purification',
      'Food-grade BPA-Free Recyclable Jar',
      'Hygienically Sealed & Sanitized Cap',
      'Rich in Essential Natural Minerals'
    ],
    purityStats: {
      ph: '7.2 (Balanced)',
      tds: '< 50 ppm',
      purification: '7-Stage Nano-Filter'
    }
  },
  {
    id: 'prod-1l-case',
    name: '1L Packaged Water Bottles (Case of 12)',
    category: 'bottles',
    volume: '1L Bottle Pack',
    price: 720,
    originalPrice: 840,
    unit: 'per case',
    description:
      'Pack of 12 ergonomic 1-liter PET bottles filled with 100% ozonated pure drinking water. Ideal for travel, meetings, and events.',
    rating: 4.8,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    badge: '1L Bottle Pack',
    isPopular: true,
    isRecommended: false,
    features: [
      'Easy-grip ergonomic bottle design',
      '100% Recyclable PET Plastic',
      'Tamper-evident leakproof cap',
      'Perfect for daily travel & workout'
    ],
    purityStats: {
      ph: '7.4 (Balanced)',
      tds: '42 ppm',
      purification: 'Ozonated RO Pure'
    }
  },
  {
    id: 'prod-500ml-case',
    name: '500ml Mini Refresh Bottles (Case of 24)',
    category: 'bottles',
    volume: '500 ml',
    price: 480,
    originalPrice: 550,
    unit: 'per case',
    description:
      'Convenient 500ml pocket-friendly water bottles. Perfect for personal hydration on the go, corporate guest hosting, and outdoor parties.',
    rating: 4.7,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop',
    badge: '500ml x 24',
    isPopular: false,
    isRecommended: true,
    features: [
      'Compact & lightweight pocket size',
      'Double-pass RO purified',
      'Zero chlorine taste or odor'
    ],
    purityStats: {
      ph: '7.1',
      tds: '45 ppm',
      purification: 'RO + UV + O3'
    }
  },
  {
    id: 'prod-dispenser-hot-cold',
    name: 'Tabletop Hot & Cold Water Dispenser',
    category: 'dispensers',
    volume: 'Tabletop Unit',
    price: 2499,
    originalPrice: 2999,
    unit: 'per piece',
    description:
      'Sleek tabletop water dispenser compatible with 20L water cans. Features instant hot water for tea/coffee and chilled water for hot summer days.',
    rating: 4.9,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop',
    badge: 'Hot & Cold',
    isPopular: true,
    isRecommended: true,
    features: [
      'Dual faucets for Hot & Cold dispensing',
      'Low noise energy-efficient compressor',
      'Child-lock safety on hot water tap',
      'Stainless steel anti-bacterial tank'
    ],
    purityStats: {
      ph: 'N/A',
      tds: 'N/A',
      purification: 'Food-Grade Stainless Tank'
    }
  },
  {
    id: 'prod-electric-pump',
    name: 'Automatic Rechargeable Electric Can Pump',
    category: 'accessories',
    volume: 'USB Type-C',
    price: 499,
    originalPrice: 799,
    unit: 'per piece',
    description:
      'One-touch automatic water dispenser pump for 20L cans. Built-in 1200mAh USB rechargeable battery dispenses up to 6 cans per charge.',
    rating: 4.8,
    reviewCount: 1100,
    image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?q=80&w=800&auto=format&fit=crop',
    badge: 'Best Accessory',
    isPopular: true,
    isRecommended: true,
    features: [
      'One-touch silent dispensing button',
      'USB-C fast charging port',
      'Food-grade silicone hose included',
      'Fits standard 20L & 10L cans effortlessly'
    ],
    purityStats: {
      ph: 'N/A',
      tds: 'N/A',
      purification: 'BPA Free Silicone Tube'
    }
  },
  {
    id: 'prod-can-stand-bottom',
    name: 'Heavy Duty Metal Water Can Stand with Tap',
    category: 'accessories',
    volume: 'Heavy Steel',
    price: 349,
    originalPrice: 499,
    unit: 'per piece',
    description:
      'Durable non-electric upside-down stand for 20L cans with easy manual flow faucet tap. No power needed.',
    rating: 4.6,
    reviewCount: 430,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    badge: 'Zero Power',
    isPopular: false,
    isRecommended: false,
    features: [
      'Rust-proof powder coated steel frame',
      'Leak-free fast flow valve tap',
      'Compact footprint for small counter space'
    ]
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    fullAddress: 'Flat 402, Green Valley Apartments, MG Road, Bandra West',
    pincode: '400001',
    city: 'Mumbai',
    landmark: 'Opposite City Mall',
    contactPhone: '+91 98765 43210',
    isDefault: true,
    lat: 19.0596,
    lng: 72.8295
  },
  {
    id: 'addr-2',
    title: 'Office',
    fullAddress: 'Suite 804, Infinity Tech Park, BKC Complex',
    pincode: '400051',
    city: 'Mumbai',
    landmark: 'Behind ICICI Tower',
    contactPhone: '+91 98765 43210',
    isDefault: false,
    lat: 19.066,
    lng: 72.8687
  },
  {
    id: 'addr-3',
    title: 'Parents House',
    fullAddress: '12-A Sun Villa, Sunset Boulevard, Juhu',
    pincode: '400049',
    city: 'Mumbai',
    landmark: 'Near Juhu Beach Police Station',
    contactPhone: '+91 98220 11223',
    isDefault: false,
    lat: 19.1075,
    lng: 72.8263
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Alex Johnson',
  phone: '+91 98765 43210',
  email: 'alex.johnson@example.com',
  membership: 'AquaDrop Premium Member',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  walletBalance: 250,
  memberSince: 'Oct 2023'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'AD-98234',
    date: 'Oct 24, 2023',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2
      }
    ],
    itemTotal: 200,
    taxes: 10,
    deliveryFee: 0,
    discount: 0,
    totalAmount: 210,
    status: 'Delivered',
    timeline: [
      { title: 'Order Confirmed', time: '2:45 PM', completed: true },
      { title: 'Packed', time: '3:00 PM', completed: true },
      { title: 'Out for Delivery', time: '3:15 PM', completed: true },
      { title: 'Delivered', time: '3:30 PM', completed: true }
    ],
    address: INITIAL_ADDRESSES[0],
    paymentMethod: 'Visa ending in 4567',
    estimatedDeliveryTime: '3:30 PM'
  },
  {
    id: 'ord-2',
    orderNumber: 'AD-87120',
    date: 'Sep 15, 2023',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    itemTotal: 2599,
    taxes: 120,
    deliveryFee: 0,
    discount: 200,
    totalAmount: 2519,
    status: 'Delivered',
    timeline: [
      { title: 'Order Confirmed', time: '10:00 AM', completed: true },
      { title: 'Packed', time: '10:20 AM', completed: true },
      { title: 'Out for Delivery', time: '10:45 AM', completed: true },
      { title: 'Delivered', time: '11:15 AM', completed: true }
    ],
    address: INITIAL_ADDRESSES[0],
    paymentMethod: 'Google Pay',
    estimatedDeliveryTime: '11:15 AM'
  },
  {
    id: 'ord-3',
    orderNumber: 'AD-10492',
    date: 'Today',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2
      }
    ],
    itemTotal: 200,
    taxes: 10,
    deliveryFee: 0,
    discount: 20,
    totalAmount: 190,
    status: 'Out for Delivery',
    timeline: [
      { title: 'Order Confirmed', time: '2:45 PM', completed: true },
      { title: 'Packed', time: '3:00 PM', completed: true },
      { title: 'Out for Delivery', time: '3:15 PM', completed: true, isCurrent: true },
      { title: 'Delivered', time: 'Est. 3:25 PM', completed: false }
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
    address: INITIAL_ADDRESSES[0],
    paymentMethod: 'Google Pay',
    estimatedDeliveryTime: '3:25 PM'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    product: INITIAL_PRODUCTS[0],
    quantity: 1,
    frequency: 'Alternate Days',
    nextDeliveryDate: 'Tomorrow, 8:00 AM',
    status: 'Active',
    startDate: 'Oct 01, 2023',
    deliveriesCompleted: 14
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Out for Delivery! 🚚',
    message: 'Ravi Kumar is on the way with your 2x 20L AquaDrop Cans. Est delivery 3:25 PM.',
    timestamp: '10 mins ago',
    isRead: false,
    type: 'order'
  },
  {
    id: 'notif-2',
    title: 'Subscription Reminder 💧',
    message: 'Your next scheduled 20L Can delivery is set for tomorrow at 8:00 AM.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'subscription'
  },
  {
    id: 'notif-3',
    title: '20% OFF Offer Unlocked! 🎉',
    message: 'Use code AQUA20 on your next order to save 20% on all bottle cases.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'offer'
  }
];
