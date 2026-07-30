'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Bell, Smartphone, Moon, Globe, Shield, Check } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { showToast } = useAqua();

  const [orderNotifs, setOrderNotifs] = useState<boolean>(true);
  const [promoNotifs, setPromoNotifs] = useState<boolean>(true);
  const [smsUpdates, setSmsUpdates] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English');

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Settings" showBack />

      <div className="px-4 space-y-4 text-xs font-semibold">
        {/* Notifications Preference */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <Bell className="w-4 h-4 text-sky-600" />
            <span>Notification Preferences</span>
          </div>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700">Live Order Tracking Alerts</span>
              <input
                type="checkbox"
                checked={orderNotifs}
                onChange={() => {
                  setOrderNotifs(!orderNotifs);
                  showToast('Updated order alerts setting');
                }}
                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700">SMS Delivery Updates</span>
              <input
                type="checkbox"
                checked={smsUpdates}
                onChange={() => {
                  setSmsUpdates(!smsUpdates);
                  showToast('Updated SMS updates setting');
                }}
                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700">Promotions & Discounts</span>
              <input
                type="checkbox"
                checked={promoNotifs}
                onChange={() => {
                  setPromoNotifs(!promoNotifs);
                  showToast('Updated promotional alerts setting');
                }}
                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
              />
            </label>
          </div>
        </div>

        {/* App Language */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <Globe className="w-4 h-4 text-sky-600" />
            <span>App Language</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {['English', 'Hindi (हिंदी)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  showToast(`Language set to ${lang}`);
                }}
                className={`p-2.5 rounded-2xl text-xs font-bold text-left transition-all ${
                  language === lang
                    ? 'aqua-gradient-btn text-white shadow-sm'
                    : 'glass-card text-slate-700 border border-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
