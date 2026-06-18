/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
  onQuickViewClick: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
  language?: 'fr' | 'ar';
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onQuickViewClick,
  onAddToCart,
  language = 'fr'
}: FavoritesDrawerProps) {
  const [activeSizeSelectors, setActiveSizeSelectors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleSizeSelect = (productId: string) => {
    setActiveSizeSelectors(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div 
      id="favs-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-brand-beige-50 h-full shadow-2xl flex flex-col justify-between border-l border-brand-rose-200/50"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-brand-rose-200/40 flex items-center justify-between font-bold">
          <div className="flex items-center gap-2.5">
            <Heart size={20} className="fill-brand-rose-500 text-brand-rose-600" />
            <h2 className="font-serif text-lg font-bold text-brand-beige-900">
              {language === 'ar' ? 'تصاميمكِ المفضلة المتميزة' : 'Vos Modèles Coups de Cœur'}
            </h2>
            <span className="bg-brand-rose-100 text-brand-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-2.5 py-1.5 rounded-full hover:bg-brand-rose-100/50 text-brand-beige-900 transition-colors cursor-pointer"
            aria-label={language === 'ar' ? 'إغلاق' : 'Fermer'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Favorites list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {favorites.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-brand-rose-100/55 rounded-full flex items-center justify-center mx-auto text-brand-rose-600">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-beige-900">
                    {language === 'ar' ? 'سجل مفضلاتكِ خالي حالياً' : 'Aucun coup de cœur'}
                  </h3>
                  <p className="text-xs text-brand-beige-400 mt-1 max-w-sm mx-auto font-bold leading-relaxed">
                    {language === 'ar' 
                      ? 'تصفحي تفاصيل تشكيلاتنا الفريدة من الجلابيب، العبايات والفساتين الكلاسيكية الطويلة، واضغطي أيقونة القلب لحفظ الموديلات التي نالت إعجابكِ.'
                      : 'Parcourez nos collections de robes longues, abayas et tuniques amples et cliquez sur le cœur pour mémoriser vos coups de cœur.'
                    }
                  </p>
                </div>
              </motion.div>
            ) : (
              favorites.map((prod) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-3 rounded-2xl border border-brand-rose-100/60 flex gap-3.5 relative shadow-2xs hover:border-brand-rose-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div 
                    className="w-16 h-20 bg-brand-beige-50 rounded-xl overflow-hidden cursor-pointer shrink-0"
                    onClick={() => {
                      onQuickViewClick(prod);
                      onClose();
                    }}
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details block */}
                  <div className="flex-1 flex flex-col justify-between py-0.5 text-right">
                    <div>
                      <h4 
                        className="font-serif text-xs font-bold text-brand-beige-900 line-clamp-1 pr-6 cursor-pointer hover:text-brand-rose-600 text-left"
                        onClick={() => {
                          onQuickViewClick(prod);
                          onClose();
                        }}
                      >
                        {language === 'ar' && prod.nameAr ? prod.nameAr : prod.name}
                      </h4>
                      <p className="text-[10px] text-brand-rose-700 font-bold uppercase tracking-wider mt-0.5 text-left">
                        {prod.price.toFixed(2)} €
                      </p>
                    </div>

                    <div className="flex gap-2 relative mt-2 text-center text-xs">
                      <button
                        onClick={() => onQuickViewClick(prod)}
                        className="flex-1 py-1.5 rounded-lg border border-brand-beige-200 hover:border-brand-rose-300 hover:bg-brand-rose-50 text-[10px] font-bold text-brand-beige-900 uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {language === 'ar' ? 'عرض سريع' : 'Aperçu'}
                      </button>

                      <button
                        onClick={() => toggleSizeSelect(prod.id)}
                        className="flex-1 py-1.5 rounded-lg bg-brand-rose-100 hover:bg-brand-rose-600 text-[10px] font-bold text-brand-rose-700 hover:text-white uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <ShoppingBag size={11} />
                        {language === 'ar' ? 'إضافة للسلة' : 'Panier'}
                      </button>

                      {/* Small floating size picker panel */}
                      <AnimatePresence>
                        {activeSizeSelectors[prod.id] && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full left-0 right-0 p-2.5 bg-brand-beige-50 border border-brand-rose-200 rounded-xl shadow-xl z-20 flex flex-col items-center"
                          >
                            <p className="text-[9px] font-bold text-brand-rose-700 uppercase tracking-widest text-center mb-1.5">
                              {language === 'ar' ? 'المقاس المحدد :' : 'Taille :'}
                            </p>
                            <div className="flex gap-1 flex-wrap justify-center">
                              {prod.sizes.map((sz) => (
                                <button
                                  key={sz}
                                  onClick={() => {
                                    onAddToCart(prod, sz);
                                    setActiveSizeSelectors(prev => ({ ...prev, [prod.id]: false }));
                                  }}
                                  className="w-7 h-7 text-[9px] font-bold rounded-md bg-white border border-brand-beige-200 hover:border-brand-rose-500 hover:bg-brand-rose-100 text-center flex items-center justify-center cursor-pointer"
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Remove heart */}
                  <button
                    onClick={() => onRemoveFavorite(prod.id)}
                    className="absolute top-3 right-3 text-brand-beige-400 hover:text-brand-rose-600 p-1 cursor-pointer"
                    aria-label="Retirer des favoris"
                  >
                    <Trash2 size={13} />
                  </button>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* bottom reassurance */}
        <div className="p-4 bg-white border-t border-brand-rose-200/40 text-center">
          <p className="text-[10px] text-brand-beige-400 font-semibold tracking-wider uppercase">
            {language === 'ar' 
              ? '💖 تفضيلاتكِ الخاصة محفوظة ومسجلة تلقائياً داخل متصفحكِ للرجوع الفوري' 
              : '💖 Vos sauvegardes sont localisées dans votre navigateur'
            }
          </p>
        </div>

      </motion.div>
    </div>
  );
}
