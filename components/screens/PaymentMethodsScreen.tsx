'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { CreditCard, Check, Plus, Landmark, Banknote, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentMethodsScreen: React.FC = () => {
  const { cartTotal, placeOrder, navigateTo, showToast } = useAqua();
  const [selectedMethod, setSelectedMethod] = useState<string>('gpay');
  const [newUpi, setNewUpi] = useState<string>('');
  const [showUpiModal, setShowUpiModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const displayAmount = cartTotal > 0 ? cartTotal : 549; // Default 549 matching screenshot 6

  const handlePayNow = () => {
    setIsProcessing(true);
    showToast('Processing payment securely...');

    setTimeout(() => {
      setIsProcessing(false);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      let pMethod = 'Google Pay';
      if (selectedMethod === 'card-visa') pMethod = 'Visa ending 4567';
      else if (selectedMethod === 'card-mc') pMethod = 'MasterCard ending 8901';
      else if (selectedMethod === 'phonepe') pMethod = 'PhonePe UPI';
      else if (selectedMethod === 'netbanking') pMethod = 'HDFC Net Banking';
      else if (selectedMethod === 'cod') pMethod = 'Cash on Delivery (COD)';

      const order = placeOrder(pMethod, '3:25 PM Today');
      navigateTo('order_tracking', { order });
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-28">
      {/* App Header matching Screenshot 6 */}
      <AppHeader title="Payment Methods" showBack showHelp />

      <div className="px-4 space-y-5">
        {/* Saved Cards Section (Matching Screenshot 6) */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Saved Cards</h3>

          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {/* Visa Card (Matching Screenshot 6) */}
            <div
              onClick={() => setSelectedMethod('card-visa')}
              className={`relative shrink-0 w-64 h-36 rounded-3xl p-4 cursor-pointer snap-start transition-all ${
                selectedMethod === 'card-visa'
                  ? 'ring-2 ring-sky-500 shadow-xl scale-[1.01]'
                  : 'opacity-90 hover:opacity-100'
              } bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-700 text-white shadow-lg overflow-hidden flex flex-col justify-between`}
            >
              {/* Glass sheen overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />

              <div className="flex justify-between items-start z-10">
                <span className="font-extrabold text-lg italic tracking-widest font-serif">VISA</span>
                {selectedMethod === 'card-visa' && (
                  <div className="w-5 h-5 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="z-10 tracking-widest text-lg font-mono">•••• 4567</div>

              <div className="flex justify-between items-end z-10 text-[11px]">
                <div>
                  <div className="text-[9px] uppercase opacity-75">Expires</div>
                  <div className="font-semibold font-mono">12/25</div>
                </div>

                <div className="flex items-center space-x-1 font-bold text-xs bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span>AquaDrop</span>
                </div>
              </div>
            </div>

            {/* MasterCard (Matching Screenshot 6) */}
            <div
              onClick={() => setSelectedMethod('card-mc')}
              className={`relative shrink-0 w-64 h-36 rounded-3xl p-4 cursor-pointer snap-start transition-all ${
                selectedMethod === 'card-mc'
                  ? 'ring-2 ring-sky-500 shadow-xl scale-[1.01]'
                  : 'opacity-80 hover:opacity-100'
              } bg-gradient-to-tr from-blue-700 via-indigo-800 to-slate-900 text-white shadow-lg overflow-hidden flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start z-10">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
                  <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90" />
                </div>
                {selectedMethod === 'card-mc' && (
                  <div className="w-5 h-5 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="z-10 tracking-widest text-lg font-mono">•••• 8901</div>

              <div className="flex justify-between items-end z-10 text-[11px]">
                <div>
                  <div className="text-[9px] uppercase opacity-75">Expires</div>
                  <div className="font-semibold font-mono">08/27</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Section (Matching Screenshot 6) */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">UPI</h3>

          <div className="glass-card rounded-3xl p-3 space-y-2.5 border border-white/90 shadow-sm">
            {/* Google Pay */}
            <label
              onClick={() => setSelectedMethod('gpay')}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-100 hover:bg-sky-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-sky-600">
                  GPay
                </div>
                <span className="text-sm font-bold text-slate-900">Google Pay</span>
              </div>
              <input
                type="radio"
                name="payment"
                checked={selectedMethod === 'gpay'}
                onChange={() => setSelectedMethod('gpay')}
                className="w-4 h-4 text-sky-600 focus:ring-sky-500"
              />
            </label>

            {/* PhonePe */}
            <label
              onClick={() => setSelectedMethod('phonepe')}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-100 hover:bg-sky-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  Pe
                </div>
                <span className="text-sm font-bold text-slate-900">PhonePe</span>
              </div>
              <input
                type="radio"
                name="payment"
                checked={selectedMethod === 'phonepe'}
                onChange={() => setSelectedMethod('phonepe')}
                className="w-4 h-4 text-sky-600 focus:ring-sky-500"
              />
            </label>

            {/* Add New UPI ID */}
            <button
              onClick={() => setShowUpiModal(true)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/50 hover:bg-sky-50/60 text-sky-700 text-xs font-bold transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New UPI ID</span>
              </div>
              <span className="text-slate-400">›</span>
            </button>
          </div>
        </div>

        {/* Other Modes Section (Matching Screenshot 6) */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Other Modes</h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Net Banking */}
            <div
              onClick={() => setSelectedMethod('netbanking')}
              className={`glass-card p-3.5 rounded-3xl cursor-pointer border transition-all ${
                selectedMethod === 'netbanking' ? 'border-sky-500 ring-2 ring-sky-300' : 'border-white/80'
              } space-y-2`}
            >
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Landmark className="w-4 h-4 text-sky-600" />
                <span>Net Banking</span>
              </div>

              <div className="space-y-1 text-xs font-semibold text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>HDFC Bank</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>SBI Bank</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>ICICI Bank</span>
                </div>
              </div>
            </div>

            {/* Cash On Delivery (COD) */}
            <div
              onClick={() => setSelectedMethod('cod')}
              className={`glass-card p-3.5 rounded-3xl cursor-pointer border transition-all ${
                selectedMethod === 'cod' ? 'border-sky-500 ring-2 ring-sky-300' : 'border-white/80'
              } space-y-2 flex flex-col justify-between`}
            >
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery</span>
              </div>

              <p className="text-xs font-medium text-slate-600 leading-tight">
                Pay in cash or UPI directly to delivery agent on arrival.
              </p>

              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full self-start">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* Security assurance */}
        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>256-Bit SSL Encrypted & PCI-DSS Compliant Payment</span>
        </div>
      </div>

      {/* Fixed Bottom Glass Checkout Summary Bar (Matching Screenshot 6) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 glass-nav rounded-t-3xl border-t border-white/90 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-xs font-semibold text-sky-800">Total Payable:</div>
          <div className="text-2xl font-extrabold text-sky-600 tracking-tight">₹{displayAmount}.00</div>
        </div>

        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="py-3.5 px-8 aqua-gradient-btn text-white font-bold text-sm rounded-2xl shadow-xl active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal for UPI ID entry */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full p-6 rounded-3xl space-y-4 shadow-2xl border border-white">
            <h3 className="text-lg font-bold text-slate-900">Add New UPI ID</h3>
            <p className="text-xs text-slate-500">Enter your VPA (e.g., username@upi or username@okicici)</p>

            <input
              type="text"
              value={newUpi}
              onChange={(e) => setNewUpi(e.target.value)}
              placeholder="e.g. mobile@upi"
              className="w-full bg-white p-3 rounded-2xl border border-sky-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setShowUpiModal(false)}
                className="w-1/2 py-2.5 rounded-2xl glass-pill font-bold text-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newUpi) {
                    setSelectedMethod('custom-upi');
                    showToast(`UPI ID ${newUpi} saved!`);
                    setShowUpiModal(false);
                  }
                }}
                className="w-1/2 py-2.5 rounded-2xl aqua-gradient-btn text-white font-bold text-xs"
              >
                Save & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
