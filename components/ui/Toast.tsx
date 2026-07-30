'use client';

import React from 'react';
import { useAqua } from '@/context/AquaContext';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useAqua();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] px-4 py-3 rounded-2xl glass-card flex items-center space-x-3 shadow-xl border border-sky-200/60"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Droplet className="w-4 h-4 fill-current text-white" />
          </div>
          <p className="text-sm font-medium text-slate-800">{toastMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
