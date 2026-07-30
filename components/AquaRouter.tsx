'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { OtpScreen } from '@/components/screens/OtpScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { ProductsScreen } from '@/components/screens/ProductsScreen';
import { ProductDetailsScreen } from '@/components/screens/ProductDetailsScreen';
import { CartScreen } from '@/components/screens/CartScreen';
import { SavedAddressesScreen } from '@/components/screens/SavedAddressesScreen';
import { CheckoutScreen } from '@/components/screens/CheckoutScreen';
import { PaymentMethodsScreen } from '@/components/screens/PaymentMethodsScreen';
import { LiveOrderTrackingScreen } from '@/components/screens/LiveOrderTrackingScreen';
import { SubscriptionsScreen } from '@/components/screens/SubscriptionsScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';
import { OrderHistoryScreen } from '@/components/screens/OrderHistoryScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { HelpSupportScreen } from '@/components/screens/HelpSupportScreen';
import { PrivacyTermsScreen } from '@/components/screens/PrivacyTermsScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { SearchScreen } from '@/components/screens/SearchScreen';
import { BottomNav } from '@/components/ui/BottomNav';
import { Toast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'motion/react';

export const AquaRouter: React.FC = () => {
  const { currentScreen } = useAqua();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'otp':
        return <OtpScreen />;
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'product_details':
        return <ProductDetailsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'addresses':
        return <SavedAddressesScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'payment_methods':
        return <PaymentMethodsScreen />;
      case 'order_tracking':
        return <LiveOrderTrackingScreen />;
      case 'subscriptions':
        return <SubscriptionsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'order_history':
        return <OrderHistoryScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'help':
        return <HelpSupportScreen />;
      case 'privacy':
      case 'terms':
        return <PrivacyTermsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'search':
        return <SearchScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full flex-1"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <BottomNav />
      <Toast />
    </div>
  );
};
