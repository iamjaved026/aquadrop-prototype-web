'use client';

import React, { useState, useEffect } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Lock, RefreshCw, CheckCircle2 } from 'lucide-react';

export const OtpScreen: React.FC = () => {
  const { loginPhone, otpCode, setOtpCode, verifyOtp, sendOtp } = useAqua();
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    sendOtp();
    setTimer(30);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtp();
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between">
      <AppHeader title="OTP Verification" showBack />

      <div className="p-6 my-auto max-w-sm mx-auto w-full glass-card rounded-3xl space-y-6 shadow-xl border border-white/90">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Enter Verification Code</h3>
          <p className="text-xs text-slate-500">
            Sent to <span className="font-bold text-slate-800">+91 {loginPhone}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center items-center space-x-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otpCode[index] || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  const currentArr = otpCode.split('');
                  currentArr[index] = val;
                  const newCode = currentArr.join('');
                  setOtpCode(newCode);

                  // Auto focus next input
                  if (val && e.target.nextElementSibling) {
                    (e.target.nextElementSibling as HTMLInputElement).focus();
                  }
                }}
                className="w-12 h-14 bg-white/90 border border-sky-300/80 rounded-2xl text-center text-xl font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            ))}
          </div>

          <div className="bg-sky-50/80 p-3 rounded-2xl border border-sky-200/60 text-center text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-center space-x-1 font-semibold text-sky-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Demo Master Code: 4242</span>
            </div>
            <p className="text-[11px] text-slate-500">Enter 4242 or click submit to log in immediately.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 aqua-gradient-btn text-white font-bold rounded-2xl shadow-md transition-all active:scale-95"
          >
            Verify & Continue
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Didn&apos;t receive code?</span>
          {timer > 0 ? (
            <span className="font-semibold text-slate-700">Resend in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-sky-600 font-bold hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Resend OTP</span>
            </button>
          )}
        </div>
      </div>

      <div className="pb-6" />
    </div>
  );
};
