'use client';

import React, { useState } from 'react';
import { useAqua } from '@/context/AquaContext';
import { AppHeader } from '@/components/ui/AppHeader';
import { Product } from '@/types/aquadrop';
import { Search, X, History, SlidersHorizontal, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

export const SearchScreen: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    addToCart,
    navigateTo
  } = useAqua();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const searchResults = products.filter((p) => {
    const matchesQuery =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    return matchesQuery && matchesCat;
  });

  const handleSelectRecent = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
  };

  const handleProductClick = (product: Product) => {
    addRecentSearch(product.name);
    navigateTo('product_details', { product });
  };

  return (
    <div className="space-y-4 pb-8">
      <AppHeader title="Search Products" showBack />

      <div className="px-4 space-y-4">
        {/* Search Bar Input */}
        <div className="glass-card rounded-2xl px-3.5 py-2.5 flex items-center space-x-2.5 shadow-md border border-white/90">
          <Search className="w-4 h-4 text-sky-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addRecentSearch(searchQuery);
            }}
            placeholder="Search 20L cans, bottles, dispensers..."
            className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory !== 'all'
                ? 'bg-sky-600 text-white'
                : 'glass-pill text-slate-700 hover:bg-sky-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Drawer Toggle */}
        {showFilters && (
          <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90 shadow-sm animate-fadeIn">
            <h4 className="text-xs font-bold text-slate-800">Filter by Category</h4>
            <div className="flex flex-wrap gap-2">
              {['all', 'cans', 'bottles', 'dispensers', 'accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    filterCategory === cat
                      ? 'aqua-gradient-btn text-white'
                      : 'glass-card text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches Tags */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="glass-card rounded-3xl p-4 space-y-3 border border-white/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                <History className="w-4 h-4 text-sky-600" />
                <span>Recent Searches</span>
              </div>
              <button
                onClick={clearRecentSearches}
                className="text-[11px] font-bold text-slate-400 hover:text-red-500"
              >
                Clear
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectRecent(term)}
                  className="glass-pill px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors border border-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>Results ({searchResults.length})</span>
            {searchQuery && (
              <span>
                Matching &quot;<span className="text-sky-600">{searchQuery}</span>&quot;
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-3xl p-3 flex flex-col justify-between border border-white/90 shadow-sm relative group"
              >
                <div
                  onClick={() => handleProductClick(product)}
                  className="relative w-full h-28 my-1 cursor-pointer flex items-center justify-center"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4
                    onClick={() => handleProductClick(product)}
                    className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-sky-600 cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  <div className="text-sm font-extrabold text-sky-700">₹{product.price}</div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2 aqua-gradient-btn text-white text-xs font-bold rounded-xl shadow-sm active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
