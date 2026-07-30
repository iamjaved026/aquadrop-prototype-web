'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp, Bot, Send, Sparkles } from 'lucide-react';

export const HelpSupportScreen: React.FC = () => {
  const { showToast } = useAqua();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: 'Hello! I am AquaBot, your 24x7 AI Water Assistant. How can I help you with your order, water purity, or subscription today?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const faqs = [
    {
      q: 'How does the 20L Water Can exchange work?',
      a: 'On every delivery, our agent collects your clean empty 20L can and replaces it with a sanitized, freshly sealed 20L AquaDrop jar. No deposit fee is charged after initial order.'
    },
    {
      q: 'What is the TDS and pH level of AquaDrop water?',
      a: 'AquaDrop water maintains a balanced pH level of 7.2 to 7.4 and an ideal Total Dissolved Solids (TDS) count below 50 PPM, enriched with essential minerals like Calcium & Magnesium.'
    },
    {
      q: 'How do I pause or modify my water subscription?',
      a: 'Go to the Subscriptions tab in the app, select your active plan, and tap "Pause" or "Skip Next Delivery". You can resume anytime with zero penalties.'
    },
    {
      q: 'What payment modes are accepted on delivery?',
      a: 'We accept Google Pay, PhonePe, Paytm, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).'
    }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { sender: 'bot', text: data.text || 'AquaBot is ready to assist!' }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'AquaBot: We received your query! Our hotline team is also reachable at 1800-278-2376.'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Help & Support" showBack />

      <div className="px-4 space-y-4">
        {/* Quick Contact Hotline Bar */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => showToast('Calling Customer Care: 1800-278-2376')}
            className="glass-card p-3.5 rounded-2xl border border-white/90 flex items-center space-x-3 text-left hover:bg-sky-50/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">24x7 Hotline</div>
              <div className="text-xs font-extrabold text-slate-900">1800-AQUADROP</div>
            </div>
          </button>

          <button
            onClick={() => showToast('Email sent to support@aquadrop.com')}
            className="glass-card p-3.5 rounded-2xl border border-white/90 flex items-center space-x-3 text-left hover:bg-sky-50/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Email Support</div>
              <div className="text-xs font-extrabold text-slate-900">support@aquadrop.com</div>
            </div>
          </button>
        </div>

        {/* Gemini AI Live Support Assistant */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-md">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1">
                <span>AquaBot AI Support</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </h3>
              <p className="text-[10px] text-emerald-600 font-bold">● Online 24/7</p>
            </div>
          </div>

          {/* Chat Stream Box */}
          <div className="bg-sky-50/50 rounded-2xl p-3 h-48 overflow-y-auto space-y-2 border border-sky-100/80 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 rounded-bl-xs shadow-sm font-medium border border-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-1.5 rounded-2xl text-slate-400 text-[10px] animate-pulse">
                  AquaBot is typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask about water quality, delivery, TDS..."
              className="flex-1 bg-white border border-sky-200 rounded-2xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="p-2.5 aqua-gradient-btn text-white rounded-2xl shadow-md shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* FAQs Section */}
        <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Frequently Asked Questions</h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="bg-white/70 rounded-2xl border border-slate-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-bold text-xs text-slate-800 flex justify-between items-center"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3 pt-0 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
