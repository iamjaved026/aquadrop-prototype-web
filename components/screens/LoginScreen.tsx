'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { WaterDropLogo } from '@/components/ui/WaterDropLogo';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginPhone, setLoginPhone, sendOtp, navigateTo } = useAqua();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.length >= 10) {
      sendOtp();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="pt-4 flex flex-col items-center text-center space-y-4">
        <WaterDropLogo size={64} />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to AquaDrop</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your mobile number to order pure water or manage subscriptions.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="my-auto max-w-sm mx-auto w-full glass-card p-6 rounded-3xl space-y-5 border border-white/90 shadow-lg">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Mobile Number
        </label>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2 bg-white/80 rounded-2xl border border-sky-200/80 px-3.5 py-3 shadow-inner focus-within:ring-2 focus-within:ring-sky-500">
            <span className="text-sm font-bold text-slate-700 flex items-center space-x-1">
              <span>🇮🇳</span>
              <span>+91</span>
            </span>
            <div className="w-px h-5 bg-slate-300 mx-1" />
            <input
              type="tel"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit number"
              maxLength={10}
              className="w-full bg-transparent text-slate-900 font-semibold placeholder:text-slate-400 focus:outline-none text-sm"
              required
            />
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          <button
            type="submit"
            disabled={loginPhone.length < 10}
            className="w-full py-3.5 px-4 aqua-gradient-btn text-white font-bold rounded-2xl shadow-md disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
          >
            <span>Send OTP Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center space-x-2 justify-center text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>We will send a 4-digit verification code via SMS</span>
        </div>
      </div>

      {/* Footer Disclaimer & Guest Option */}
      <div className="text-center space-y-3 pb-4">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-sky-600 hover:underline"
        >
          Skip Login & Browse Catalog →
        </button>

        <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
          By continuing, you agree to AquaDrop&apos;s{' '}
          <button onClick={() => navigateTo('terms')} className="underline">
            Terms of Service
          </button>{' '}
          &{' '}
          <button onClick={() => navigateTo('privacy')} className="underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};
