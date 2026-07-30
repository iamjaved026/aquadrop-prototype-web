'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Order } from '@/types/aquadrop';
import { CheckCircle2, Download, Repeat, FileText, X, Printer, Truck } from 'lucide-react';

export const OrderHistoryScreen: React.FC = () => {
  const { orders, reorder, navigateTo, showToast } = useAqua();
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const handleDownloadInvoice = (order: Order) => {
    setInvoiceOrder(order);
    showToast(`Invoice for Order #${order.orderNumber} generated`);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* App Header matching Screenshot 7 */}
      <AppHeader title="Order History" showBack />

      <div className="px-4 space-y-4">
        {orders.map((order) => {
          const summaryText = order.items
            .map((i) => `${i.quantity} x ${i.product.name}`)
            .join(', ');

          const isDelivered = order.status === 'Delivered';

          return (
            <div
              key={order.id}
              className="glass-card rounded-3xl p-5 space-y-3 shadow-md border border-white/90 relative"
            >
              {/* Top Order Metadata (Matching Screenshot 7) */}
              <div className="text-xs font-semibold text-slate-500">
                {order.date} • Order #{order.orderNumber}
              </div>

              {/* Order Items Headline (Matching Screenshot 7) */}
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                {summaryText}
              </h3>

              {/* Status Pill (Matching Screenshot 7) */}
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 pt-0.5">
                <span>Status:</span>
                <span
                  className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full ${
                    isDelivered
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-sky-100 text-sky-800 animate-pulse'
                  }`}
                >
                  <span>{order.status}</span>
                  {isDelivered ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Truck className="w-3.5 h-3.5 text-sky-600" />
                  )}
                </span>
              </div>

              {/* Action Buttons Row (Matching Screenshot 7) */}
              <div className="flex items-center space-x-4 pt-2 border-t border-slate-100/80">
                <button
                  onClick={() => reorder(order)}
                  className="py-2.5 px-6 aqua-gradient-btn text-white text-xs font-bold rounded-2xl shadow-md active:scale-95 transition-all flex items-center space-x-1.5"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>

                <button
                  onClick={() => handleDownloadInvoice(order)}
                  className="text-sky-700 hover:text-sky-900 text-xs font-bold flex items-center space-x-1 hover:underline transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>

                {!isDelivered && (
                  <button
                    onClick={() => navigateTo('order_tracking', { order })}
                    className="ml-auto text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1.5 rounded-xl hover:bg-sky-200"
                  >
                    Track Order →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Modal Preview */}
      {invoiceOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-3xl space-y-4 shadow-2xl border border-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Tax Invoice #{invoiceOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-800">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-sky-700 text-sm">AquaDrop India Pvt Ltd</div>
                  <div className="text-slate-500">GSTIN: 27AAAAA0000A1Z5</div>
                  <div className="text-slate-500">Date: {invoiceOrder.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">Billed To:</div>
                  <div className="text-slate-600">{invoiceOrder.address.title}</div>
                  <div className="text-slate-500">{invoiceOrder.address.pincode}</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 space-y-1">
                <div className="font-bold text-slate-700 pb-1">Order Items:</div>
                {invoiceOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-mono">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-2 space-y-1 font-semibold">
                <div className="flex justify-between text-slate-600">
                  <span>Item Subtotal</span>
                  <span>₹{invoiceOrder.itemTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes (5% GST)</span>
                  <span>₹{invoiceOrder.taxes}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>₹{invoiceOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sky-700 font-extrabold text-sm pt-1 border-t border-slate-200">
                  <span>Total Paid</span>
                  <span>₹{invoiceOrder.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full py-3 rounded-2xl aqua-gradient-btn text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
