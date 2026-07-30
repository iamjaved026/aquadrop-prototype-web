'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyTermsScreen: React.FC = () => {
  const { currentScreen } = useAqua();
  const isPrivacy = currentScreen === 'privacy';

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title={isPrivacy ? 'Privacy Policy' : 'Terms of Service'} showBack />

      <div className="px-4 space-y-4 text-slate-800 text-xs leading-relaxed font-medium">
        <div className="glass-card rounded-3xl p-5 space-y-4 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-3 text-sky-700">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
              {isPrivacy ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {isPrivacy ? 'AquaDrop Privacy Commitment' : 'AquaDrop Service Agreement'}
              </h2>
              <p className="text-[10px] text-slate-500 font-semibold">Effective Date: October 2023</p>
            </div>
          </div>

          {isPrivacy ? (
            <div className="space-y-3">
              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">1. Data Collection & Phone OTP</h3>
                <p className="text-slate-600">
                  We collect your mobile number solely for phone OTP authentication, SMS delivery order status updates, and GPS location tracking to ensure accurate water jar delivery to your doorstep.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">2. Security & Payment Integrity</h3>
                <p className="text-slate-600">
                  All credit card, debit card, and UPI transactions are encrypted using 256-bit SSL protocol in compliance with PCI-DSS guidelines. We never store CVV or card PINs on our servers.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">3. Quality & Hygiene Assurance</h3>
                <p className="text-slate-600">
                  Every 20L water can is sanitized, sealed, and batch-tested for mineral count and zero microbial presence before dispatch.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-3">
              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">1. Water Can Exchange Rules</h3>
                <p className="text-slate-600">
                  Customers agree to return undamaged empty 20L jars upon receiving fresh replacement cans. Damaged or cracked cans may incur a standard ₹150 jar replacement fee.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">2. Subscription Cancellation Policy</h3>
                <p className="text-slate-600">
                  You can pause, skip, or cancel recurring water subscriptions anytime prior to 6:00 AM on the scheduled delivery day with zero penalty fees.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">3. Delivery Guarantee</h3>
                <p className="text-slate-600">
                  Standard delivery times are within 30-45 minutes for Express orders, or during selected 2-hour morning/evening slots.
                </p>
              </section>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-[11px] text-sky-700 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified & Certified Water Quality Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
};
