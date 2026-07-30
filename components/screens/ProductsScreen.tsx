'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { ProductCategory, Product } from '@/types/aquadrop';
import { Search, LayoutGrid, List, SlidersHorizontal, Plus, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const ProductsScreen: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    addSubscription,
    navigateTo,
    searchQuery,
    setSearchQuery
  } = useAqua();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'cans', label: '20L Cans' },
    { id: 'bottles', label: 'Pet Bottles' },
    { id: 'dispensers', label: 'Dispensers' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return b.rating - a.rating;
    });

  const handleProductClick = (product: Product) => {
    navigateTo('product_details', { product });
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Products Catalog" showSearch showNotifications />

      <div className="px-4 space-y-3">
        {/* Category Pills Bar */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'aqua-gradient-btn text-white shadow-md'
                    : 'glass-card text-slate-700 hover:bg-white/90 border border-white/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sorting & Layout Toggle Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 glass-card px-3 py-2 rounded-2xl border border-white/80">
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-sky-700 focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-sky-100 text-sky-700' : 'text-slate-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-sky-100 text-sky-700' : 'text-slate-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Display Container */}
        {filteredProducts.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">No products found</p>
            <p className="text-xs text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-3xl p-3 flex flex-col justify-between border border-white/90 shadow-sm relative group"
              >
                {product.badge && (
                  <span className="absolute top-2.5 right-2.5 glass-pill text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-full z-10">
                    {product.badge}
                  </span>
                )}

                <div
                  onClick={() => handleProductClick(product)}
                  className="relative w-full h-32 my-1 cursor-pointer flex items-center justify-center"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100/60">
                  <div>
                    <h4
                      onClick={() => handleProductClick(product)}
                      className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-sky-600 cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-1 pt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
                      <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-base font-extrabold text-slate-900">₹{product.price}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{product.unit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="py-1.5 glass-pill text-sky-700 hover:bg-sky-100 text-xs font-bold rounded-xl text-center active:scale-95 transition-all"
                    >
                      Add
                    </button>
                    {product.category === 'cans' || product.category === 'bottles' ? (
                      <button
                        onClick={() => {
                          addSubscription(product, 1, 'Alternate Days');
                          navigateTo('subscriptions');
                        }}
                        className="py-1.5 aqua-gradient-btn text-white text-xs font-bold rounded-xl text-center active:scale-95 transition-all shadow-sm"
                      >
                        Subscribe
                      </button>
                    ) : (
                      <button
                        onClick={() => handleProductClick(product)}
                        className="py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl text-center hover:bg-slate-200 transition-all"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-3xl p-3.5 flex items-center space-x-4 border border-white/90 shadow-sm"
              >
                <div
                  onClick={() => handleProductClick(product)}
                  className="relative w-20 h-20 shrink-0 cursor-pointer flex items-center justify-center bg-sky-50/50 rounded-2xl p-1"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h4
                    onClick={() => handleProductClick(product)}
                    className="text-sm font-bold text-slate-900 hover:text-sky-600 cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-extrabold text-sky-700">₹{product.price}</span>
                    <span className="text-[11px] text-slate-500">{product.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="py-2 px-4 aqua-gradient-btn text-white text-xs font-bold rounded-xl shadow-md shrink-0 active:scale-95"
                >
                  Add +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
