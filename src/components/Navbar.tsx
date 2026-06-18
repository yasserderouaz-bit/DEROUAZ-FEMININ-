/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, Heart, Sparkles } from 'lucide-react';
import { ActiveTab, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFavoritesClick?: () => void;
  favoritesCount: number;
  language: 'fr' | 'ar';
  setLanguage: (lang: 'fr' | 'ar') => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onFavoritesClick,
  favoritesCount,
  language,
  setLanguage
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigationItems = (language === 'ar' ? [
    { id: 'accueil', label: 'الرئيسية' },
    { id: 'produits', label: 'منتجاتنا' },
    { id: 'quisommesnous', label: 'من نحن' },
    { id: 'contact', label: 'اتصل بنا' }
  ] : [
    { id: 'accueil', label: 'Accueil' },
    { id: 'produits', label: 'Nos produits' },
    { id: 'quisommesnous', label: 'Qui sommes nous' },
    { id: 'contact', label: 'Contactez nous' }
  ]) as { id: ActiveTab; label: string }[];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-brand-beige-50/95 backdrop-blur-md border-b border-brand-rose-200/40 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-brand-rose-700 hover:bg-brand-rose-100/50 transition-colors cursor-pointer"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Elegant Feminine Branding Logo */}
          <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
            <button 
              onClick={() => handleNavClick('accueil')}
              className="flex flex-col items-center lg:items-start text-left cursor-pointer group"
            >
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-brand-rose-700 uppercase transition-colors duration-300 group-hover:text-brand-rose-600">
                DEROUAZ
              </h1>
              <span className="font-cormorant text-xs font-semibold tracking-[0.35em] text-brand-beige-400 uppercase -mt-1 flex items-center gap-1 group-hover:text-brand-beige-900 transition-colors">
                {language === 'ar' ? (
                  <>
                    نسائي <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span> أزياء مقاسات كبيرة
                  </>
                ) : (
                  <>
                    Féminin <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span> Mode Grande Taille
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-12">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-brand-rose-600 font-semibold' 
                    : 'text-brand-beige-900/80 hover:text-brand-rose-500'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-rose-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Search, Wishlist, Shopping Bag */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Elegant Language Selector Button */}
            <button
              id="lang-toggler-btn"
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-white/80 hover:bg-brand-rose-50 border border-brand-rose-200 text-brand-rose-600 hover:text-brand-rose-700 transition-all cursor-pointer shadow-xs select-none"
              title={language === 'fr' ? 'Passer en Arabe' : 'Passer en Français'}
            >
              {language === 'fr' ? 'العربية' : 'FR'}
            </button>

            {/* Real-time search */}
            <div className={`relative flex items-center ${isSearchExpanded ? 'w-48 sm:w-64' : 'w-10 sm:w-10'} transition-all duration-300`}>
              {isSearchExpanded ? (
                <div className="relative w-full">
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'produits') {
                        setActiveTab('produits');
                      }
                    }}
                    placeholder={language === 'ar' ? "ابحثي عن موديل..." : "Rechercher un modèle..."}
                    className="w-full pl-9 pr-8 py-1.5 rounded-full text-xs bg-white border border-brand-rose-200 text-brand-beige-900 focus:border-brand-rose-400 focus:ring-1 focus:ring-brand-rose-200 transition-all shadow-inner"
                    autoFocus
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-brand-rose-400" />
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchExpanded(false);
                    }}
                    className="absolute right-3 top-2.5 text-brand-beige-400 hover:text-brand-rose-600 cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <button
                  id="expand-search-btn"
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 sm:p-2.5 rounded-full text-brand-rose-700 bg-white/50 hover:bg-brand-rose-100/50 hover:text-brand-rose-600 transition-all cursor-pointer border border-transparent hover:border-brand-rose-100"
                  aria-label="Rechercher"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Favorite Indicator */}
            <button
              id="wishlist-btn"
              onClick={onFavoritesClick}
              className="relative p-2 sm:p-2.5 rounded-full text-brand-rose-700 bg-white/50 hover:bg-brand-rose-100/50 hover:text-brand-rose-600 transition-all cursor-pointer border border-transparent hover:border-brand-rose-100"
              aria-label="Favoris"
            >
              <Heart size={18} className={favoritesCount > 0 ? "fill-brand-rose-400 text-brand-rose-500" : ""} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-rose-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold border border-brand-beige-50">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Bag Icon with dynamic counter */}
            <button
              id="cart-bag-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full text-brand-rose-700 bg-white/50 hover:bg-brand-rose-100/50 hover:text-brand-rose-600 transition-all cursor-pointer border border-brand-rose-200/50 hover:border-brand-rose-200 shadow-xs"
              aria-label="Panier"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  key={cartItemsCount}
                  className="absolute -top-1 -right-1 bg-brand-rose-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold border border-white"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-brand-rose-200/30 bg-brand-beige-50 shadow-inner overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-brand-rose-100 text-brand-rose-700 pl-6 border-l-4 border-brand-rose-500'
                      : 'text-brand-beige-900/80 hover:bg-brand-rose-50 hover:text-brand-rose-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Language Selection inside Mobile drawer */}
              <div className="pt-2 pb-1 flex justify-center gap-3">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${
                    language === 'fr'
                      ? 'bg-brand-rose-500 text-white border-brand-rose-500'
                      : 'bg-white text-brand-rose-600 border-brand-rose-200 hover:bg-brand-rose-50'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${
                    language === 'ar'
                      ? 'bg-brand-rose-500 text-white border-brand-rose-500'
                      : 'bg-white text-brand-rose-600 border-brand-rose-200 hover:bg-brand-rose-50'
                  }`}
                >
                  العربية
                </button>
              </div>
              
              {/* Premium Quality details inside mobile menu */}
              <div className="pt-4 border-t border-brand-rose-100/60 text-center">
                <p className="font-cormorant italic text-xs text-brand-beige-400">
                  {language === 'ar' 
                    ? 'أرقى الأزياء للمحجبات ذوات المقاسات الكبيرة بأناقة ورشاقة.' 
                    : 'Sublimer la femme voilée grande taille avec raffinement.'}
                </p>
                <p className="text-[10px] mt-1 text-brand-rose-500 font-semibold tracking-wider uppercase">
                  {language === 'ar' ? 'خدمة العملاء : ' : 'Service Client : '} +33 (0)1 45 78 92 30
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
