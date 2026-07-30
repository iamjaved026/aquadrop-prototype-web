'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { WaterDropLogo } from '@/components/ui/WaterDropLogo';
import { Package, MapPin, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Shield, Crown, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export const ProfileScreen: React.FC = () => {
  const { user, navigateTo, logout } = useAqua();

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: Package,
      action: () => navigateTo('order_history')
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      icon: MapPin,
      action: () => navigateTo('addresses')
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: CreditCard,
      action: () => navigateTo('payment_methods')
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      icon: RefreshCw,
      action: () => navigateTo('subscriptions')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      action: () => navigateTo('notifications')
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      action: () => navigateTo('help')
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: LogOut,
      action: () => logout(),
      isDestructive: true
    }
  ];

  return (
    <div className="space-y-5 pb-8 pt-4">
      {/* Top Profile Card (Matching Screenshot 5) */}
      <div className="px-4 flex flex-col items-center text-center space-y-2">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-sky-100 flex items-center justify-center">
            {user.avatar ? (
              <Image src={user.avatar} alt={user.name} fill className="object-cover" unoptimized />
            ) : (
              <WaterDropLogo size={48} glow={false} />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white">
            <Crown className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold text-sky-800 tracking-tight">{user.name}</h2>
          <p className="text-xs font-semibold text-sky-600 tracking-wide">{user.membership}</p>
        </div>
      </div>

      {/* Account Settings Menu List (Matching Screenshot 5) */}
      <div className="px-4 space-y-3">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight pl-1">
          Account Settings
        </h3>

        <div className="space-y-2.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full glass-card-interactive px-4 py-3.5 rounded-2xl flex items-center justify-between shadow-sm border border-white/90 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </span>
                </div>

                <div className="text-slate-400 group-hover:text-sky-600 transition-colors">
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* App Version & Credits */}
      <div className="text-center pt-2 text-[11px] text-slate-400 font-medium space-y-1">
        <p>AquaDrop v2.4.0 • Built with Clean Architecture</p>
        <p>Pure Water Guarantee • 24x7 Customer Care</p>
      </div>
    </div>
  );
};
