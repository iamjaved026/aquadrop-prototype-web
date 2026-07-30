'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Product } from '@/types/aquadrop';
import { Plus, Minus, ShieldCheck, Droplet, Star, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const ProductDetailsScreen: React.FC = () => {
  const { selectedProduct, addToCart, addSubscription, navigateTo } = useAqua();
  const [quantity, setQuantity] = useState<number>(1);

  if (!selectedProduct) {
    return (
      <div className="p-6 text-center">
        <p>No product selected.</p>
        <button onClick={() => navigateTo('home')} className="mt-4 text-sky-600 font-bold underline">
          Go Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    navigateTo('cart');
  };

  const handleSubscribeNow = () => {
    addSubscription(selectedProduct, quantity, 'Alternate Days');
    navigateTo('subscriptions');
  };

  return (
    <div className="space-y-4 pb-8">
      {/* App Header matching Screenshot 2 */}
      <AppHeader title="Product Details" showBack showShare />

      {/* Large Product Image Preview Canvas (Matching Screenshot 2) */}
      <div className="px-4">
        <div className="relative w-full h-72 flex items-center justify-center my-2">
          {/* Subtle background drop glow */}
          <div className="absolute w-56 h-56 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />

          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            fill
            className="object-contain drop-shadow-2xl z-10 transition-transform duration-300 hover:scale-105"
            priority
            unoptimized
          />
        </div>

        {/* Floating Glassmorphism Card Sheet (Matching Screenshot 2) */}
        <div className="glass-card rounded-3xl p-5 space-y-4 shadow-xl border border-white/90 relative z-20 -mt-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-sky-700 tracking-tight leading-tight">
              {selectedProduct.name}
            </h2>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-3xl font-extrabold text-sky-600">₹{selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <span className="text-sm line-through text-slate-400 font-medium">
                  ₹{selectedProduct.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-slate-500">/ {selectedProduct.unit}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {selectedProduct.description}
          </p>

          {/* Stepper Quantity Pills (Matching Screenshot 2) */}
          <div className="flex items-center justify-center pt-2">
            <div className="glass-pill px-3 py-1.5 rounded-full flex items-center space-x-5 shadow-inner border border-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-700 flex items-center justify-center transition-colors active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold text-slate-900 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-700 flex items-center justify-center transition-colors active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Primary Action Button (Matching Screenshot 2) */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 aqua-gradient-btn text-white font-bold text-base rounded-2xl shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 glass-pill text-sky-800 font-bold text-xs rounded-xl hover:bg-sky-100 transition-colors border border-sky-200"
              >
                Buy Now
              </button>
              <button
                onClick={handleSubscribeNow}
                className="py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribe Daily</span>
              </button>
            </div>
          </div>
        </div>

        {/* Water Quality & Composition Section */}
        <div className="mt-4 glass-card rounded-3xl p-4 space-y-3 border border-white/80">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <Droplet className="w-4 h-4 text-sky-600 fill-current" />
            <span>Water Quality & Purity Breakdown</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2.5 rounded-2xl bg-sky-50/80 border border-sky-100">
              <div className="text-[10px] text-slate-500 font-medium">pH Level</div>
              <div className="text-xs font-bold text-sky-700 mt-0.5">
                {selectedProduct.purityStats?.ph || '7.2 Balanced'}
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-sky-50/80 border border-sky-100">
              <div className="text-[10px] text-slate-500 font-medium">TDS Count</div>
              <div className="text-xs font-bold text-sky-700 mt-0.5">
                {selectedProduct.purityStats?.tds || '< 50 PPM'}
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-sky-50/80 border border-sky-100">
              <div className="text-[10px] text-slate-500 font-medium">Purification</div>
              <div className="text-xs font-bold text-sky-700 mt-0.5">7-Stage RO</div>
            </div>
          </div>

          {/* Key Features List */}
          {selectedProduct.features && (
            <div className="pt-2 space-y-1.5 border-t border-slate-100">
              {selectedProduct.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
