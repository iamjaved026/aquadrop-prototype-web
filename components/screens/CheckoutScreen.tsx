'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const CheckoutScreen: React.FC = () => {
  const { cart, selectedAddress, addresses, setSelectedAddress, cartTotal, navigateTo } = useAqua();

  const [selectedSlot, setSelectedSlot] = useState<string>('Express Delivery (Within 30-45 mins)');
  const [instruction, setInstruction] = useState<string>('Leave at door');

  const deliverySlots = [
    { id: 'express', label: 'Express Delivery (30-45 mins)', badge: 'Fastest' },
    { id: 'evening', label: 'Today Evening (4:00 PM - 6:00 PM)', badge: 'Popular' },
    { id: 'morning_tomorrow', label: 'Tomorrow Morning (8:00 AM - 10:00 AM)', badge: 'Scheduled' }
  ];

  const instructions = [
    'Leave at door',
    'Ring doorbell twice',
    'Call upon arrival',
    'Hand over to security'
  ];

  return (
    <div className="space-y-4 pb-28">
      <AppHeader title="Checkout" showBack />

      <div className="px-4 space-y-4">
        {/* Step 1: Delivery Address Card */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Delivery Address</span>
            </div>
            <button
              onClick={() => navigateTo('addresses')}
              className="text-xs font-bold text-sky-600 hover:underline flex items-center space-x-0.5"
            >
              <span>Change</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 bg-white/80 rounded-2xl border border-sky-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900">{selectedAddress.title}</span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                {selectedAddress.pincode}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">{selectedAddress.fullAddress}</p>
            <p className="text-[11px] text-slate-500 font-mono pt-1">
              Phone: {selectedAddress.contactPhone}
            </p>
          </div>
        </div>

        {/* Step 2: Delivery Slot Picker */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Select Delivery Slot</span>
          </div>

          <div className="space-y-2">
            {deliverySlots.map((slot) => {
              const isSelected = selectedSlot === slot.label;

              return (
                <label
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.label)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-400 ring-1 ring-sky-300'
                      : 'bg-white/60 border-slate-100 hover:bg-sky-50/40'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="radio"
                      name="slot"
                      checked={isSelected}
                      onChange={() => setSelectedSlot(slot.label)}
                      className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-xs font-bold text-slate-900">{slot.label}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-slate-600 border border-slate-100">
                    {slot.badge}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Step 3: Delivery Instructions */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span>Delivery Instructions</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {instructions.map((inst) => {
              const isSelected = instruction === inst;

              return (
                <button
                  key={inst}
                  onClick={() => setInstruction(inst)}
                  className={`p-2.5 rounded-2xl text-xs font-bold text-left transition-all border ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'glass-card text-slate-700 border-white/80 hover:bg-white'
                  }`}
                >
                  {inst}
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Items Preview Summary */}
        <div className="glass-card rounded-3xl p-4 space-y-2 border border-white/90 shadow-sm text-xs">
          <h4 className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100">
            Items in Order ({cart.reduce((a, c) => a + c.quantity, 0)})
          </h4>

          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-slate-700">
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span className="font-bold text-slate-900">₹{item.product.price * item.quantity}</span>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-slate-900 text-sm">
            <span>Amount Payable</span>
            <span className="text-sky-700">₹{cartTotal}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar -> Proceed to Payment */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 glass-nav rounded-t-3xl border-t border-white/90 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[11px] font-semibold text-slate-500">Payable Amount</div>
          <div className="text-xl font-extrabold text-slate-900">₹{cartTotal}</div>
        </div>

        <button
          onClick={() => navigateTo('payment_methods')}
          className="py-3.5 px-8 aqua-gradient-btn text-white font-bold text-xs rounded-2xl shadow-xl active:scale-95 transition-all flex items-center space-x-2"
        >
          <span>Select Payment Method</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
