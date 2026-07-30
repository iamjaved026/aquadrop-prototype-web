'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import Image from 'next/image';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartTaxes,
    cartDeliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    showToast
  } = useAqua();

  const [couponCode, setCouponCode] = useState<string>('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    showToast(res.message);
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-4 pb-8 min-h-[70vh] flex flex-col justify-between">
        <AppHeader title="Shopping Cart" showBack />

        <div className="px-4 text-center my-auto space-y-4 max-w-sm mx-auto">
          <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Your Cart is Empty</h3>
            <p className="text-xs text-slate-500">
              Browse our pure water cans, pet bottles, and accessories to start your order.
            </p>
          </div>

          <button
            onClick={() => navigateTo('products')}
            className="w-full py-3.5 aqua-gradient-btn text-white font-bold text-xs rounded-2xl shadow-md active:scale-95 transition-all"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  const freeDeliveryThreshold = 300;
  const freeDeliveryDiff = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="space-y-4 pb-28">
      <AppHeader title="Shopping Cart" showBack />

      <div className="px-4 space-y-4">
        {/* Free Delivery Bar */}
        {freeDeliveryDiff > 0 ? (
          <div className="glass-card rounded-2xl p-3 text-xs text-slate-700 space-y-1.5 border border-sky-200">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center space-x-1">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>Add ₹{freeDeliveryDiff} more for FREE Delivery</span>
              </span>
              <span className="text-sky-700 font-bold">{Math.round((cartSubtotal / 300) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
                style={{ width: `${Math.min(100, (cartSubtotal / 300) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-3 text-xs font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200 flex items-center space-x-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>🎉 Congratulations! You unlocked FREE Delivery</span>
          </div>
        )}

        {/* Cart Items List */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="glass-card rounded-3xl p-4 flex items-center space-x-4 border border-white/90 shadow-sm relative"
            >
              <div className="relative w-16 h-16 shrink-0 bg-sky-50/50 rounded-2xl flex items-center justify-center p-1">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                <div className="text-xs font-extrabold text-sky-700">₹{item.product.price}</div>

                {/* Quantity Stepper */}
                <div className="flex items-center space-x-3 pt-1">
                  <div className="glass-pill px-2 py-0.5 rounded-xl flex items-center space-x-2 border border-white">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, -1)}
                      className="w-5 h-5 text-slate-700 hover:text-sky-600 font-bold text-xs flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-slate-900 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, 1)}
                      className="w-5 h-5 text-slate-700 hover:text-sky-600 font-bold text-xs flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-slate-800">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Promo Code Input Section */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <Tag className="w-4 h-4 text-sky-600" />
            <span>Apply Promo Code</span>
          </div>

          {appliedCoupon ? (
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-sky-800">{appliedCoupon.code}</span>
                <span className="text-slate-500 ml-2">({appliedCoupon.description})</span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-500 font-bold hover:underline text-xs"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Try AQUA20 or FREEDROP"
                className="flex-1 bg-white/80 border border-sky-200 rounded-2xl px-3.5 py-2 text-xs font-semibold uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 aqua-gradient-btn text-white text-xs font-bold rounded-2xl shadow-sm shrink-0"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* Bill Summary Breakdown */}
        <div className="glass-card rounded-3xl p-4 space-y-2.5 border border-white/90 shadow-sm text-xs">
          <h4 className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100">
            Bill Details
          </h4>

          <div className="flex justify-between text-slate-600">
            <span>Item Subtotal</span>
            <span className="font-bold text-slate-800">₹{cartSubtotal}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Taxes & GST (5%)</span>
            <span className="font-bold text-slate-800">₹{cartTaxes}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            {cartDeliveryFee === 0 ? (
              <span className="font-bold text-emerald-600">FREE</span>
            ) : (
              <span className="font-bold text-slate-800">₹{cartDeliveryFee}</span>
            )}
          </div>

          {cartDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Coupon Discount</span>
              <span>- ₹{cartDiscount}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-100">
            <span>Total Payable</span>
            <span className="text-sky-700">₹{cartTotal}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Proceed to Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 glass-nav rounded-t-3xl border-t border-white/90 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[11px] font-semibold text-slate-500">To Pay</div>
          <div className="text-xl font-extrabold text-slate-900">₹{cartTotal}</div>
        </div>

        <button
          onClick={() => navigateTo('checkout')}
          className="py-3.5 px-7 aqua-gradient-btn text-white font-bold text-xs rounded-2xl shadow-xl active:scale-95 transition-all flex items-center space-x-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
