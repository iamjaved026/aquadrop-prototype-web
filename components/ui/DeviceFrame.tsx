'use client';

import React, { useState, useEffect } from 'react';
import { useAqua } from '@/context/AquaContext';
import {
  Droplets,
  QrCode,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  CalendarSync,
  Truck,
  Bot
} from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { navigateTo, showToast } = useAqua();
  const [copied, setCopied] = useState(false);
  const [qrCodeImgUrl, setQrCodeImgUrl] = useState<string>(
    'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http%3A%2F%2Flocalhost%3A3000&color=0284c7&bgcolor=ffffff'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setQrCodeImgUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=0284c7&bgcolor=ffffff`
      );
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Prototype link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* 1. MOBILE VIEWPORTS: Only native app renders with zero frames or sidebars */}
      <div className="lg:hidden w-full min-h-screen aqua-gradient-bg text-slate-900 font-sans antialiased flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen flex flex-col relative shadow-xl bg-transparent">
          {children}
        </div>
      </div>

      {/* 2. DESKTOP VIEWPORTS: Split Presentation Frame (Left Showcase + Right Mobile Phone Mockup) */}
      <div className="hidden lg:flex min-h-screen bg-slate-950 text-slate-100 flex-col font-sans antialiased selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
        {/* Ambient Glow Orbs */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Desktop Client Header */}
        <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-8 py-3 flex items-center justify-between z-50 shrink-0">
          <div className="flex items-center space-x-3">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Droplets className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-extrabold text-white tracking-wide text-base group-hover:text-sky-400 transition-colors">
                  AquaDrop
                </span>
                <span className="text-[10px] text-sky-400/90 block font-semibold -mt-0.5">
                  Client Interactive Prototype
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('splash')}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center space-x-1.5 border border-slate-700/60 active:scale-95"
              title="Reset to Splash Screen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>Overview Ready</span>
            </div>
          </div>
        </header>

        {/* Main Desktop Showcase Split Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-8 flex flex-row items-center justify-center gap-12 xl:gap-16">
          
          {/* Left Side Info Panel */}
          <div className="flex flex-col justify-center flex-1 space-y-6 max-w-xl text-left py-4">
            
            <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3.5 py-1.5 rounded-full text-xs font-extrabold w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Packaged Water & Hydration Delivery Platform</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
                AquaDrop Mobile Experience
              </h1>
              <p className="text-slate-400 text-sm xl:text-base leading-relaxed font-medium">
                Test the live interactive mobile app on the right. Experience 1-click water reordering, recurring subscription scheduling, live order tracking, and 24/7 AquaBot assistance.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">1-Click Reorders</div>
                  <div className="text-[11px] text-slate-400 font-medium">Instant 20L Can & bottle orders</div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarSync className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Auto Subscriptions</div>
                  <div className="text-[11px] text-slate-400 font-medium">Daily & alternate schedule plans</div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Live GPS Tracking</div>
                  <div className="text-[11px] text-slate-400 font-medium">Driver location & delivery timeline</div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">AquaBot Support</div>
                  <div className="text-[11px] text-slate-400 font-medium">24/7 AI water quality & TDS bot</div>
                </div>
              </div>
            </div>

            {/* Dynamic Scannable QR Code */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800/90 rounded-3xl p-5 shadow-2xl flex items-center space-x-5">
              <div className="relative w-28 h-28 bg-white p-2 rounded-2xl shrink-0 flex items-center justify-center shadow-lg border border-sky-200 overflow-hidden group">
                <img
                  src={qrCodeImgUrl}
                  alt="Scan AquaDrop Mobile QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="space-y-2.5 flex-1">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <QrCode className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold text-white">Scan to Open on Mobile</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-0.5">
                    Point smartphone camera at QR code to open and test live prototype on your phone.
                  </p>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-slate-700/80 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Prototype URL Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy Prototype URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Side Smartphone Mockup Frame */}
          <div className="flex justify-center items-center py-2">
            <div className="relative w-[420px] h-[840px] max-h-[840px] bg-slate-950 rounded-[52px] p-3.5 shadow-2xl border-[8px] border-slate-800 ring-1 ring-slate-700/60 flex flex-col overflow-hidden shadow-sky-500/10">
              
              {/* Speaker Notch */}
              <div className="flex justify-center items-center h-6 w-full shrink-0 relative bg-slate-950">
                <div className="w-28 h-4 bg-slate-900 rounded-full flex items-center justify-between px-2">
                  <div className="w-2 h-2 rounded-full bg-slate-950" />
                  <div className="w-3 h-3 rounded-full bg-slate-950 ring-1 ring-slate-800" />
                </div>
              </div>

              {/* Inner Mobile Screen Area */}
              <div className="relative flex-1 w-full h-full aqua-gradient-bg text-slate-900 rounded-[38px] overflow-y-auto overflow-x-hidden flex flex-col shadow-inner select-none">
                
                {/* Mobile Status Bar */}
                <div className="sticky top-0 z-40 px-5 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-slate-900 backdrop-blur-md bg-white/40 border-b border-white/20 select-none shrink-0">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] tracking-tighter font-extrabold">5G</span>
                    <div className="flex items-end space-x-0.5 h-3">
                      <div className="w-0.5 h-1 bg-slate-900 rounded-xs" />
                      <div className="w-0.5 h-1.5 bg-slate-900 rounded-xs" />
                      <div className="w-0.5 h-2 bg-slate-900 rounded-xs" />
                      <div className="w-0.5 h-2.5 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="w-5 h-2.5 border border-slate-900 rounded-xs p-0.5 flex items-center">
                      <div className="w-full h-full bg-slate-900 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Mobile App Content */}
                <div className="flex-1 flex flex-col relative overflow-y-auto">
                  {children}
                </div>

                {/* Home Indicator */}
                <div className="sticky bottom-0 z-50 w-full py-1.5 flex justify-center bg-slate-900/5 backdrop-blur-xs pointer-events-none shrink-0">
                  <div className="w-32 h-1 bg-slate-900/40 rounded-full" />
                </div>

              </div>

            </div>
          </div>

        </main>
      </div>
    </>
  );
};
