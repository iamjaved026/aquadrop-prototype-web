'use client';

import React, { useState, useEffect } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Phone, CheckCircle2, Clock, Truck, UserCheck, ShieldAlert, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export const LiveOrderTrackingScreen: React.FC = () => {
  const { activeTrackingOrder, navigateTo, showToast } = useAqua();
  const [truckProgress, setTruckProgress] = useState<number>(45); // percentage along route

  // Animate the truck moving smoothly along the route
  useEffect(() => {
    const interval = setInterval(() => {
      setTruckProgress((prev) => (prev >= 85 ? 45 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const order = activeTrackingOrder || {
    orderNumber: 'AD-98234',
    estimatedDeliveryTime: '3:25 PM',
    deliveryPartner: {
      name: 'Ravi Kumar',
      phone: '+91 91234 56789',
      vehicle: 'Tata Ace',
      registrationNumber: 'MH12AB1234',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    }
  };

  const handleCallPartner = () => {
    showToast(`Calling delivery partner ${order.deliveryPartner?.name || 'Ravi Kumar'}...`);
  };

  return (
    <div className="space-y-3 pb-8">
      {/* App Header matching Screenshot 3 */}
      <AppHeader title="Live Order Tracking" showBack />

      <div className="px-4 space-y-4">
        {/* Interactive Vector Route Map Card (Matching Screenshot 3) */}
        <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-white/90 bg-sky-50">
          {/* Simulated Map Canvas Roads Grid */}
          <svg className="w-full h-full bg-[#f4f7f6]" viewBox="0 0 400 250">
            {/* Base Road Grids */}
            <path d="M 0 50 H 400 M 0 120 H 400 M 0 200 H 400" stroke="#e2e8f0" strokeWidth="6" />
            <path d="M 60 0 V 250 M 180 0 V 250 M 300 0 V 250" stroke="#e2e8f0" strokeWidth="6" />

            {/* Route path matching Screenshot 3 curve */}
            <path
              id="deliveryPath"
              d="M 50 160 L 150 140 L 290 80 L 290 50 L 320 50"
              fill="none"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Truck Position on Route */}
            <g transform={`translate(${50 + (truckProgress / 100) * 250}, ${160 - (truckProgress / 100) * 110})`}>
              <circle r="16" fill="#0284c7" opacity="0.2" className="animate-ping" />
              <circle r="14" fill="#0284c7" />
              {/* Truck Icon */}
              <text x="-7" y="5" fill="white" fontSize="11" fontWeight="bold">
                🚚
              </text>
            </g>

            {/* Delivery Partner Destination Pin (Matching Screenshot 3) */}
            <g transform="translate(320, 50)">
              <circle r="16" fill="#0284c7" />
              <circle r="12" fill="#ffffff" />
              <circle r="6" fill="#0284c7" />
              <text x="-24" y="32" fill="#1e293b" fontSize="10" fontWeight="bold">
                Delivery Partner
              </text>
            </g>
          </svg>

          {/* Map Attribution Tag (Matching Screenshot 3) */}
          <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-bold bg-white/70 px-2 py-0.5 rounded-full">
            🗺️ Live GPS Tracking Active
          </div>
          <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 bg-white/70 px-2 py-0.5 rounded-full">
            Legal
          </div>
        </div>

        {/* Timeline Glass Sheet (Matching Screenshot 3) */}
        <div className="glass-card rounded-3xl p-5 space-y-4 shadow-xl border border-white/90">
          <div className="space-y-4 relative pl-2">
            {/* Step 1: Order Confirmed */}
            <div className="flex items-start space-x-3 relative">
              <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-0.5 h-10 bg-sky-500 absolute left-[11px] top-6" />
              <div className="flex-1 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 text-sm">Order Confirmed</span>
                <span className="text-slate-500 font-semibold">2:45 PM</span>
              </div>
            </div>

            {/* Step 2: Packed */}
            <div className="flex items-start space-x-3 relative">
              <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-0.5 h-12 bg-sky-500 absolute left-[11px] top-6" />
              <div className="flex-1 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 text-sm">Packed</span>
                <span className="text-slate-500 font-semibold">3:00 PM</span>
              </div>
            </div>

            {/* Step 3: Out for Delivery (Active) */}
            <div className="flex items-start space-x-3 relative">
              <div className="w-6 h-6 rounded-full bg-sky-500 ring-4 ring-sky-200 text-white flex items-center justify-center shrink-0 z-10 shadow-md animate-pulse">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <div className="w-0.5 h-10 bg-slate-200 absolute left-[11px] top-6" />
              <div className="flex-1 space-y-0.5">
                <div className="font-extrabold text-slate-900 text-sm">Out for Delivery</div>
                <div className="text-xs font-bold text-sky-600">
                  Estimated Delivery: {order.estimatedDeliveryTime || '3:25 PM'}
                </div>
              </div>
            </div>

            {/* Step 4: Delivered */}
            <div className="flex items-start space-x-3 relative">
              <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 z-10" />
              <div className="flex-1 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-400 text-sm">Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery Partner Profile Card (Matching Screenshot 3) */}
          <div className="pt-2">
            <div className="glass-card rounded-2xl p-4 bg-white/80 border border-white space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400 shadow-sm shrink-0">
                    <Image
                      src={order.deliveryPartner?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'}
                      alt={order.deliveryPartner?.name || 'Ravi Kumar'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      {order.deliveryPartner?.name || 'Ravi Kumar'}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                      <span>★</span>
                      <span>{order.deliveryPartner?.rating || 4.8}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">
                    {order.deliveryPartner?.vehicle || 'Tata Ace'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {order.deliveryPartner?.registrationNumber || 'MH12AB1234'}
                  </div>
                </div>
              </div>

              {/* Call Partner Button (Matching Screenshot 3) */}
              <button
                onClick={handleCallPartner}
                className="w-full py-3 px-4 aqua-gradient-btn text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 fill-current text-white" />
                <span>Call Partner</span>
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Note & Safety */}
        <div className="glass-card rounded-2xl p-3 flex items-center space-x-3 text-xs text-slate-600 border border-white/80">
          <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0" />
          <span>No-contact doorstep delivery active. Partner is wearing a mask & sanitized gloves.</span>
        </div>
      </div>
    </div>
  );
};
