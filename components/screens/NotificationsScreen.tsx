'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Bell, Truck, CalendarSync, Tag, Info, Check, Trash2 } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications, navigateTo } = useAqua();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Truck className="w-4 h-4 text-sky-600" />;
      case 'subscription':
        return <CalendarSync className="w-4 h-4 text-blue-600" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Notifications" showBack />

      <div className="px-4 space-y-4">
        {notifications.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={clearAllNotifications}
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No New Notifications</h4>
            <p className="text-xs text-slate-500">You are all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`glass-card rounded-2xl p-3.5 space-y-1.5 border transition-all cursor-pointer ${
                  n.isRead ? 'border-white/80 opacity-80' : 'border-sky-300 ring-1 ring-sky-200 bg-white/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">{n.title}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{n.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 pl-9 font-medium">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
