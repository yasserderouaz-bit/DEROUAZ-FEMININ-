/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onQuickViewClick: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  language?: 'fr' | 'ar';
}

export default function ProductCard({
  product,
  onQuickViewClick,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  language = 'fr'
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  return (
    <article 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-3xl border border-brand-rose-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      
      {/* Visual Product Display Frame */}
      <div className="relative aspect-⅘ bg-brand-beige-50 overflow-hidden cursor-pointer" onClick={() => onQuickViewClick(product)}>
        
        {/* Dynamic Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-brand-rose-500 text-white rounded-full shadow-xs">
              <Sparkles size={10} />
              {language === 'ar' ? 'جديد' : 'Nouveau'}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-brand-gold text-white rounded-full shadow-xs">
              {language === 'ar' ? 'الأكثر مبيعاً' : 'Best-Seller'}
            </span>
          )}
          {product.isPromo && (
            <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-brand-rose-600 text-white rounded-full shadow-xs">
              {language === 'ar' ? 'عرض خاص' : 'Offre Spéciale'}
            </span>
          )}
        </div>

        {/* Favorite Heart Trigger */}
        <button
          id={`favorite-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-brand-rose-500 shadow-xs hover:bg-brand-rose-50 hover:scale-105 transition-all cursor-pointer"
          aria-label={language === 'ar' ? "إضافة إلى المفضلة" : "Ajouter aux favoris"}
        >
          <Heart size={16} className={isFavorite ? "fill-brand-rose-500" : ""} />
        </button>

        {/* Slide/Fade Secondary Image on hover */}
        <img
          src={isHovered && product.secondaryImages.length > 0 ? product.secondaryImages[0] : product.image}
          alt={language === 'ar' && product.nameAr ? product.nameAr : product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out transform group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Action slide-up overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickViewClick(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-white text-brand-beige-900 shadow-sm hover:bg-brand-rose-50 hover:text-brand-rose-600 transition-colors cursor-pointer"
          >
            <Eye size={13} />
            <span>{language === 'ar' ? 'عرض سريع' : 'Aperçu'}</span>
          </button>
        </div>

      </div>

      {/* Description / Info Frame */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        
        {/* Category Indicator */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-beige-400 mb-1.5">
          {product.category === 'robes' && (language === 'ar' ? 'فساتين طويلة' : 'Robes Longues')}
          {product.category === 'abayas' && (language === 'ar' ? 'عبايات مستورة' : 'Abayas Mastour')}
          {product.category === 'ensembles' && (language === 'ar' ? 'أطقم كاجوال' : 'Ensemble Complet')}
          {product.category === 'tuniques' && (language === 'ar' ? 'تونيك وبنطلون' : 'Tuniques Amples')}
          {product.category === 'hijabs' && (language === 'ar' ? 'حجاب وشالات' : 'Hijabs de Soie')}
        </p>

        {/* Product Name */}
        <h3 
          className="font-serif text-base font-bold text-brand-beige-900 line-clamp-1 mb-2 hover:text-brand-rose-600 transition-colors cursor-pointer"
          onClick={() => onQuickViewClick(product)}
        >
          {language === 'ar' && product.nameAr ? product.nameAr : product.name}
        </h3>

        {/* Star Rating Info */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? "text-brand-gold fill-brand-gold" : "text-brand-rose-200"} 
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-brand-beige-400">({product.reviewsCount})</span>
        </div>

        {/* Sizing display tag list */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-brand-beige-400 tracking-wider inline-block">
            {language === 'ar' ? 'المقاسات المتوفرة :' : 'Tailles prévues :'}
          </p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.sizes.map((sz) => (
              <span 
                key={sz} 
                className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-brand-beige-100 text-brand-beige-900 border border-brand-beige-200/50"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Cart CTA block */}
        <div className="mt-auto pt-3 border-t border-brand-beige-100 flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-brand-beige-400 line-through -mb-1">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
            <span className="font-serif text-lg font-bold text-brand-rose-700">
              {product.price.toFixed(2)} €
            </span>
          </div>

          <div className="relative">
            <AnimatePresence>
              {showSizePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full right-0 mb-2 p-3 bg-white border border-brand-rose-200 rounded-2xl shadow-xl z-20 min-w-[210px]"
                >
                  <p className="text-[10px] font-bold text-brand-rose-700 uppercase tracking-widest text-center mb-2">
                    {language === 'ar' ? 'حددي مقاسكِ المفضل :' : 'Sélectionnez la taille :'}
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product, sz);
                          setShowSizePicker(false);
                        }}
                        className="p-1 px-1.5 text-xs font-bold rounded-lg border border-brand-beige-200 hover:border-brand-rose-400 hover:bg-brand-rose-50 text-brand-beige-900 text-center uppercase tracking-wider cursor-pointer"
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Cart triggering CTA */}
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowSizePicker(!showSizePicker);
              }}
              className="p-3 rounded-full bg-brand-rose-100 text-brand-rose-700 hover:bg-brand-rose-600 hover:text-white transition-all cursor-pointer shadow-xs hover:shadow-md"
              aria-label={language === 'ar' ? "إضافة إلى السلة" : "Ajouter au panier"}
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>

      </div>

    </article>
  );
}
