'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { ArrowLeft, Share2, HelpCircle, Bell, Search, MapPin } from 'lucide-react';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showShare?: boolean;
  showHelp?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  onShare?: () => void;
  onHelp?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack,
  showShare,
  showHelp,
  showNotifications,
  showSearch,
  onShare,
  onHelp
}) => {
  const { goBack, currentScreen, navigateTo, unreadNotificationCount, selectedAddress, showToast } = useAqua();

  const handleShare = () => {
    if (onShare) onShare();
    else {
      if (navigator.share) {
        navigator.share({ title: 'AquaDrop Water Delivery', url: window.location.href });
      } else {
        showToast('AquaDrop link copied to clipboard!');
      }
    }
  };

  const handleHelp = () => {
    if (onHelp) onHelp();
    else navigateTo('help');
  };

  // Determine title based on currentScreen if not provided
  const screenTitles: Record<string, string> = {
    product_details: 'Product Details',
    cart: 'Shopping Cart',
    addresses: 'Saved Addresses',
    checkout: 'Checkout',
    payment_methods: 'Payment Methods',
    order_tracking: 'Live Order Tracking',
    subscriptions: 'My Subscriptions',
    notifications: 'Notifications',
    order_history: 'Order History',
    profile: 'Profile',
    help: 'Help & Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    settings: 'Settings',
    search: 'Search Products'
  };

  const displayTitle = title || screenTitles[currentScreen] || '';
  const isTopTab = ['home', 'products', 'subscriptions', 'cart', 'profile'].includes(currentScreen);
  const shouldShowBack = showBack ?? !isTopTab;

  return (
    <header className="sticky top-0 z-30 px-4 py-3 glass-card rounded-b-2xl shadow-sm border-b border-white/80 transition-all flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {shouldShowBack && (
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors active:scale-95 shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {currentScreen === 'home' ? (
          <div
            onClick={() => navigateTo('addresses')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-200 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                Deliver to:
              </div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center space-x-1">
                <span>
                  {selectedAddress.title} ({selectedAddress.pincode})
                </span>
                <span className="text-xs text-sky-500">▼</span>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">{displayTitle}</h1>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {showSearch && (
          <button
            onClick={() => navigateTo('search')}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {(showNotifications || currentScreen === 'home') && (
          <button
            onClick={() => navigateTo('notifications')}
            className="relative w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-sky-500 rounded-full ring-2 ring-white animate-ping" />
            )}
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-sky-500 rounded-full ring-2 ring-white" />
            )}
          </button>
        )}

        {showShare && (
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors active:scale-95"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}

        {(showHelp || currentScreen === 'payment_methods') && (
          <button
            onClick={handleHelp}
            className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
        )}
      </div>
    </header>
  );
};
