'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Product } from '@/types/aquadrop';
import { Search, Plus, Minus, Repeat, Sparkles, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import Image from 'next/image';

export const HomeScreen: React.FC = () => {
  const {
    products,
    navigateTo,
    addToCart,
    selectedAddress,
    addSubscription,
    setSelectedCategory,
    activeTrackingOrder,
    showToast
  } = useAqua();

  const [quickQty, setQuickQty] = useState<number>(1);

  const popularProducts = products.filter((p) => p.isPopular);
  const reorderProduct = products[0]; // 20L Can

  const categories = [
    {
      id: 'cans',
      name: '20L Cans',
      image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'bottles',
      name: 'Pet Bottles',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'dispensers',
      name: 'Dispensers',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    navigateTo('products');
  };

  const handleProductClick = (product: Product) => {
    navigateTo('product_details', { product });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header with Address & Search */}
      <AppHeader showNotifications />

      <div className="px-4 space-y-4">
        {/* Search Input Bar (Matching Screenshot 4) */}
        <div
          onClick={() => navigateTo('search')}
          className="glass-card rounded-2xl px-3.5 py-2.5 flex items-center space-x-2.5 shadow-sm border border-white/90 cursor-pointer hover:bg-white/90 transition-all"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-400">Search for water, cans, accessories</span>
        </div>

        {/* Live Order Banner if active order is out for delivery */}
        {activeTrackingOrder && activeTrackingOrder.status === 'Out for Delivery' && (
          <div
            onClick={() => navigateTo('order_tracking', { order: activeTrackingOrder })}
            className="p-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Truck className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-bold">Order #{activeTrackingOrder.orderNumber} Out for Delivery!</div>
                <div className="text-[11px] text-sky-100">ETA {activeTrackingOrder.estimatedDeliveryTime}</div>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">Track →</span>
          </div>
        )}

        {/* Quick Reorder Card (Matching Screenshot 4 Pixel-for-Pixel) */}
        <div className="glass-card rounded-3xl p-4 flex items-center space-x-4 shadow-md border border-white/90 relative overflow-hidden">
          <div className="relative w-24 h-28 shrink-0 flex items-center justify-center">
            <Image
              src={reorderProduct.image}
              alt="Quick Reorder Can"
              fill
              className="object-contain drop-shadow-md rounded-xl"
              unoptimized
            />
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Quick Reorder</h3>
              <p className="text-xs font-medium text-slate-600">
                Last Ordered: {reorderProduct.name.split(' ')[0]} ({`₹${reorderProduct.price}`})
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <button
                onClick={() => {
                  addToCart(reorderProduct, quickQty);
                  navigateTo('cart');
                }}
                className="py-2 px-5 aqua-gradient-btn text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all"
              >
                Reorder
              </button>

              <div className="glass-pill px-2 py-1 rounded-xl flex items-center space-x-2 border border-white/90">
                <button
                  onClick={() => setQuickQty((q) => Math.max(1, q - 1))}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-600 hover:bg-sky-100 text-xs font-bold"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-slate-900 w-3 text-center">{quickQty}</span>
                <button
                  onClick={() => setQuickQty((q) => q + 1)}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-600 hover:bg-sky-100 text-xs font-bold"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid (Matching Screenshot 4) */}
        <div className="grid grid-cols-4 gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="glass-card-interactive p-2.5 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group border border-white/80"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-sky-50/50">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-sky-600">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Most Popular Section (Matching Screenshot 4) */}
        <div className="glass-card rounded-3xl p-4 space-y-4 border border-white/90 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Most Popular</h3>
            <button
              onClick={() => navigateTo('products')}
              className="text-xs font-bold text-sky-600 hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {popularProducts.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="glass-card rounded-2xl p-3 flex flex-col justify-between border border-white/90 shadow-sm relative group"
              >
                {/* Badge top right */}
                {prod.badge && (
                  <span className="absolute top-2 right-2 glass-pill text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-full z-10 border border-white">
                    {prod.badge}
                  </span>
                )}

                <div
                  onClick={() => handleProductClick(prod)}
                  className="relative w-full h-32 my-1 cursor-pointer flex items-center justify-center"
                >
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100/60">
                  <div>
                    <div className="text-lg font-extrabold text-slate-900">₹{prod.price}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{prod.unit}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="py-1.5 glass-pill text-sky-700 hover:bg-sky-100 text-xs font-bold rounded-xl text-center active:scale-95 transition-all"
                    >
                      Add
                    </button>
                    {prod.category === 'cans' || prod.category === 'bottles' ? (
                      <button
                        onClick={() => {
                          addSubscription(prod, 1, 'Alternate Days');
                          navigateTo('subscriptions');
                        }}
                        className="py-1.5 aqua-gradient-btn text-white text-xs font-bold rounded-xl text-center active:scale-95 transition-all shadow-sm"
                      >
                        Subscribe
                      </button>
                    ) : (
                      <button
                        onClick={() => handleProductClick(prod)}
                        className="py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl text-center hover:bg-slate-200 transition-all"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Advantage Banner */}
        <div
          onClick={() => navigateTo('subscriptions')}
          className="p-4 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden cursor-pointer group"
        >
          <div className="relative z-10 space-y-2 max-w-[240px]">
            <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-sky-100">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Auto-Delivery Subscription</span>
            </div>
            <h4 className="text-lg font-extrabold leading-tight">Never Run Out of Pure Water Again</h4>
            <p className="text-[11px] text-sky-100">
              Set custom daily or alternate day delivery. Save up to 15% with zero delivery charges.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center space-x-1 text-xs font-bold bg-white text-blue-900 px-3 py-1.5 rounded-xl shadow-md group-hover:bg-sky-50 transition-colors">
                <span>Start Subscription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="absolute -right-4 -bottom-6 w-32 h-32 opacity-20 bg-white rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Quality Guarantee Strip */}
        <div className="glass-card rounded-2xl p-3 flex items-center justify-between text-xs font-semibold text-slate-700 border border-white/80">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
            <span>100% Ozonated & UV Purified Water</span>
          </div>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
            ISO Certified
          </span>
        </div>
      </div>
    </div>
  );
};
