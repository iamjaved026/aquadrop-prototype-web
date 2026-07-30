'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { RefreshCw, Pause, Play, Calendar, Plus, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const SubscriptionsScreen: React.FC = () => {
  const { subscriptions, toggleSubscriptionStatus, products, addSubscription, navigateTo, showToast } =
    useAqua();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedProdId, setSelectedProdId] = useState<string>(products[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [frequency, setFrequency] = useState<'Daily' | 'Alternate Days' | 'Weekly' | 'Monthly'>(
    'Alternate Days'
  );

  const handleCreateSub = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProdId) || products[0];
    addSubscription(prod, quantity, frequency);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Water Subscriptions" showBack />

      <div className="px-4 space-y-4">
        {/* Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-1 font-bold text-xs text-sky-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Delivery Savings</span>
            </div>
            <h3 className="text-base font-extrabold">Save 15% on Every Delivery</h3>
            <p className="text-[11px] text-sky-100">Pause, skip or cancel anytime with zero extra fees.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-2.5 px-4 bg-white text-blue-900 font-bold text-xs rounded-2xl shadow-md shrink-0 hover:bg-sky-50 transition-colors"
          >
            + New Sub
          </button>
        </div>

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">No Active Subscriptions</h4>
            <p className="text-xs text-slate-500">
              Subscribe to 20L cans or bottle packs to receive scheduled automated deliveries.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="py-3 px-6 aqua-gradient-btn text-white font-bold text-xs rounded-2xl shadow-md"
            >
              Start Water Subscription
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((sub) => {
              const isActive = sub.status === 'Active';

              return (
                <div
                  key={sub.id}
                  className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-md relative"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative w-16 h-16 shrink-0 bg-sky-50/50 rounded-2xl p-1">
                      <Image
                        src={sub.product.image}
                        alt={sub.product.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {sub.product.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-600">
                        {sub.quantity}x • {sub.frequency} Delivery
                      </div>

                      <div className="text-[11px] text-sky-700 font-bold flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Next: {sub.nextDeliveryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => showToast(`Next delivery skipped for ${sub.product.name}`)}
                      className="text-slate-600 hover:text-slate-900 font-bold hover:underline"
                    >
                      Skip Next Delivery
                    </button>

                    <button
                      onClick={() => toggleSubscriptionStatus(sub.id)}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-1 transition-all ${
                        isActive
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-3xl space-y-4 shadow-2xl border border-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">Create Water Subscription</h3>

            <form onSubmit={handleCreateSub} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Select Product</label>
                <select
                  value={selectedProdId}
                  onChange={(e) => setSelectedProdId(e.target.value)}
                  className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {products
                    .filter((p) => p.category === 'cans' || p.category === 'bottles')
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price})
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Quantity per Delivery</label>
                <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-sky-200 w-36 justify-between">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-sky-50 font-bold text-sky-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-slate-900 text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-lg bg-sky-50 font-bold text-sky-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Frequency</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Daily', 'Alternate Days', 'Weekly', 'Monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`p-3 rounded-2xl font-bold border transition-all text-left ${
                        frequency === freq
                          ? 'aqua-gradient-btn text-white border-sky-500'
                          : 'glass-card text-slate-700 border-slate-200'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 rounded-2xl glass-pill font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-2xl aqua-gradient-btn text-white font-bold shadow-md"
                >
                  Confirm Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
