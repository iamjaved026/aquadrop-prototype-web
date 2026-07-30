'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { WaterDropLogo } from '@/components/ui/WaterDropLogo';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  const { navigateTo, isLoggedIn } = useAqua();

  const handleContinue = () => {
    if (isLoggedIn) {
      navigateTo('home');
    } else {
      navigateTo('login');
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-between p-6 text-center overflow-hidden">
      {/* Background glow swirls */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-60 h-60 bg-blue-400/30 rounded-full blur-2xl pointer-events-none" />

      {/* Top Spacer */}
      <div className="pt-8" />

      {/* Center Brand Identity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center z-10 space-y-6"
      >
        <div className="animate-float">
          <WaterDropLogo size={110} />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans drop-shadow-sm">
            Aqua<span className="text-sky-600">Drop</span>
          </h1>
          <p className="text-sm font-medium text-slate-600 max-w-xs leading-relaxed">
            Pure, Refreshed & Mineral Rich Water Delivered Right to Your Doorstep.
          </p>
        </div>
      </motion.div>

      {/* Bottom CTA & Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-xs space-y-3 z-10 pb-6"
      >
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 aqua-gradient-btn text-white font-bold rounded-2xl shadow-xl shadow-sky-500/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>Get Pure Water Now</span>
          <span>→</span>
        </button>

        <p className="text-[11px] text-slate-500 font-medium">
          Quick Delivery • 100% Tested • Subscription Available
        </p>
      </motion.div>
    </div>
  );
};
