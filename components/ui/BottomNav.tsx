'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { MainTab } from '@/types/aquadrop';
import { Home, LayoutGrid, CalendarSync, ShoppingCart, User } from 'lucide-react';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentScreen, cart } = useAqua();

  // Hide bottom nav on splash, login, otp screens
  if (['splash', 'login', 'otp'].includes(currentScreen)) {
    return null;
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tabs: { id: MainTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: LayoutGrid },
    { id: 'subscriptions', label: 'Subscriptions', icon: CalendarSync },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 w-full px-3 pb-2 pt-1">
      <nav className="glass-nav rounded-3xl px-2 py-2 flex items-center justify-around shadow-2xl border border-white/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-sky-100/80 rounded-2xl border border-sky-200/60"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'text-sky-600 scale-110' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  />
                  {tab.id === 'cart' && totalCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {totalCartCount}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[11px] font-medium mt-1 transition-colors duration-200 ${
                    isActive ? 'text-sky-600 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
