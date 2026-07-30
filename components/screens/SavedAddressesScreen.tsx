'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Address } from '@/types/aquadrop';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Building2, User, X } from 'lucide-react';

export const SavedAddressesScreen: React.FC = () => {
  const { addresses, selectedAddress, setSelectedAddress, addAddress, deleteAddress, showToast } =
    useAqua();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Home');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [pincode, setPincode] = useState<string>('400001');
  const [city, setCity] = useState<string>('Mumbai');
  const [landmark, setLandmark] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('9876543210');
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullAddress || !pincode) return;

    addAddress({
      title,
      fullAddress,
      pincode,
      city,
      landmark,
      contactPhone,
      isDefault,
      lat: 19.076,
      lng: 72.877
    });

    setShowAddModal(false);
    setFullAddress('');
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Saved Addresses" showBack />

      <div className="px-4 space-y-4">
        {/* Add New Address Trigger Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full glass-card py-3.5 px-4 rounded-3xl border border-sky-300 border-dashed text-sky-700 font-bold text-xs flex items-center justify-center space-x-2 hover:bg-sky-50/80 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Delivery Location</span>
        </button>

        {/* Address List */}
        <div className="space-y-3">
          {addresses.map((addr) => {
            const isSelected = selectedAddress.id === addr.id;

            return (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddress(addr);
                  showToast(`Selected ${addr.title} address`);
                }}
                className={`glass-card rounded-3xl p-4 space-y-2 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-300 shadow-md bg-white/90'
                    : 'border-white/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-medium pl-10">{addr.fullAddress}</p>
                {addr.landmark && (
                  <p className="text-[11px] text-slate-500 font-medium pl-10">
                    Landmark: {addr.landmark}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 pl-10 text-xs">
                  <span className="font-mono text-slate-500">📞 {addr.contactPhone}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAddress(addr.id);
                    }}
                    className="text-red-500 hover:text-red-700 font-bold flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-3xl space-y-4 shadow-2xl border border-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Add Delivery Address</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Address Label</label>
                <div className="flex space-x-2">
                  {['Home', 'Office', 'Parents', 'Other'].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setTitle(lbl)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        title === lbl
                          ? 'aqua-gradient-btn text-white'
                          : 'glass-card text-slate-700 border border-slate-200'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Flat / House / Building Details</label>
                <input
                  type="text"
                  required
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="e.g. Flat 302, Rosewood Heights, Central Ave"
                  className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400001"
                    className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Police Station"
                  className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Phone Number</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="10-digit phone"
                  className="w-full bg-white p-3 rounded-2xl border border-sky-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 aqua-gradient-btn text-white font-bold rounded-2xl shadow-md text-xs"
                >
                  Save Address & Set Selected
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
