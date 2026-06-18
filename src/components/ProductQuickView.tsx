/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Ruler, Check, Heart, ShieldAlert } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  language?: 'fr' | 'ar';
}

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  language = 'fr'
}: ProductQuickViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantityAdded, setQuantityAdded] = useState(false);
  const [showRulerGuide, setShowRulerGuide] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setQuantityAdded(true);
    setTimeout(() => {
      setQuantityAdded(false);
    }, 2000);
  };

  const images = [product.image, ...product.secondaryImages];

  // Specific chest measurements in cm for sizes 50 to 66
  const measureGuides: Record<ProductSize, { poitrine: string; hanche: string; longueur: string }> = {
    '50': { poitrine: '123 - 127 cm', hanche: '131 - 135 cm', longueur: '145 cm' },
    '52': { poitrine: '128 - 133 cm', hanche: '136 - 141 cm', longueur: '145 cm' },
    '54': { poitrine: '134 - 139 cm', hanche: '142 - 147 cm', longueur: '145 cm' },
    '56': { poitrine: '140 - 145 cm', hanche: '148 - 153 cm', longueur: '148 cm' },
    '58': { poitrine: '146 - 151 cm', hanche: '154 - 159 cm', longueur: '148 cm' },
    '60': { poitrine: '152 - 157 cm', hanche: '160 - 165 cm', longueur: '148 cm' },
    '62': { poitrine: '158 - 163 cm', hanche: '166 - 171 cm', longueur: '150 cm' },
    '64': { poitrine: '164 - 169 cm', hanche: '172 - 177 cm', longueur: '150 cm' },
    '66': { poitrine: '170 - 175 cm', hanche: '178 - 183 cm', longueur: '150 cm' },
  };

  return (
    <div 
      id="quickview-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-brand-beige-50 max-w-5xl w-full rounded-[2.5rem] border border-brand-rose-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        
        {/* Dismiss trigger */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/95 text-brand-beige-900 border border-brand-rose-200 hover:bg-brand-rose-100/50 hover:text-brand-rose-600 transition-colors shadow-2xs cursor-pointer"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Column 1: Image gallery (Grid 5 of 12) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col gap-4 bg-white/40">
          
          {/* Active Big Image Area */}
          <div className="relative aspect-¾ rounded-2xl overflow-hidden bg-brand-beige-50 border border-brand-rose-100/40 shadow-xs">
            <img
              src={images[selectedImageIndex]}
              alt={language === 'ar' && product.nameAr ? product.nameAr : product.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-rose-500 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                {language === 'ar' ? 'جديد' : 'Nouveau'}
              </span>
            )}
          </div>

          {/* Miniature Image carousel */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 aspect-¾ rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-brand-rose-500 scale-105' : 'border-brand-beige-100 hover:border-brand-rose-200'
                  }`}
                >
                  <img src={img} alt={`Visual preview ${idx}`} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Specific info frame (Grid 7 of 12) */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-[750px]">
          
          <div>
            {/* Category / Breadcrumbs state */}
            <p className="text-[10px] font-bold tracking-widest text-brand-rose-500 uppercase mb-2">
              {language === 'ar' ? 'متجر درواز النسائي' : 'Boutique Derouaz'} &gt; {
                product.category === 'robes' && (language === 'ar' ? 'فساتين طويلة' : 'Robes Longues') ||
                product.category === 'abayas' && (language === 'ar' ? 'عبايات مستورة' : 'Abayas Mastour') ||
                product.category === 'ensembles' && (language === 'ar' ? 'أطقم كاجوال' : 'Ensembles Complet') ||
                product.category === 'tuniques' && (language === 'ar' ? 'تونيكات فضفاضة' : 'Tuniques Amples') ||
                product.category === 'hijabs' && (language === 'ar' ? 'حجاب وشالات' : 'Hijabs de Soie') ||
                product.category
              }
            </p>

            {/* Title & Favorite action */}
            <div className="flex justify-between items-start gap-4 mb-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-beige-900 leading-tight">
                {language === 'ar' && product.nameAr ? product.nameAr : product.name}
              </h2>
              <button
                onClick={() => onToggleFavorite(product.id)}
                className="p-2.5 rounded-full bg-white hover:bg-brand-rose-50 border border-brand-rose-100 text-brand-rose-500 hover:scale-105 transition-all cursor-pointer"
              >
                <Heart size={18} className={isFavorite ? "fill-brand-rose-500" : ""} />
              </button>
            </div>

            {/* Star ratings and review indications */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    className={i < Math.floor(product.rating) ? "text-brand-gold fill-brand-gold" : "text-brand-rose-200"} 
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-beige-400">
                {product.rating} / 5 ({product.reviewsCount} {language === 'ar' ? 'تقييم موثق' : 'avis vérifiés'})
              </span>
            </div>

            {/* Price section */}
            <div className="inline-flex items-baseline gap-3 px-5 py-2.5 rounded-2xl bg-white border border-brand-rose-100 mb-6 shadow-2xs">
              <span className="font-serif text-2xl font-bold text-brand-rose-700">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span className="text-sm font-semibold text-brand-beige-400 line-through">
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>

            {/* Short Paragraph Description */}
            <p className="text-sm text-brand-beige-900/80 leading-relaxed mb-6 bg-white/50 p-4 rounded-xl border border-brand-beige-200/50">
              {language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description}
            </p>

            {/* Size selection and ruler assistant toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-beige-900/95">
                  {language === 'ar' ? 'حدد مقاسك المفضل (مقاسات كبيرة) :' : 'Choisissez votre Taille (Grande Taille) :'}
                </span>
                
                <button
                  onClick={() => setShowRulerGuide(!showRulerGuide)}
                  className="flex items-center gap-1.5 text-xs text-brand-rose-600 hover:text-brand-rose-800 font-semibold transition-colors cursor-pointer"
                >
                  <Ruler size={14} />
                  <span>{language === 'ar' ? 'جدول المقاسات' : 'Guide des tailles'}</span>
                </button>
              </div>

              {/* Sizes button roster */}
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 h-12 rounded-xl text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                      selectedSize === sz 
                        ? 'bg-brand-rose-600 border-brand-rose-600 text-white shadow-md' 
                        : 'bg-white border-brand-beige-200 text-brand-beige-900 hover:border-brand-rose-400 hover:bg-brand-rose-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Interactive Sizing Details from tour de poitrine (Ruler Guide view) */}
              <AnimatePresence>
                {(showRulerGuide || selectedSize) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="p-4 rounded-xl bg-brand-rose-50 border border-brand-rose-100/80 text-xs font-semibold">
                      {selectedSize ? (
                        <div className="grid grid-cols-3 gap-2 text-center text-brand-rose-800 font-bold">
                          <div>
                            <span className="block text-[10px] text-brand-beige-400 uppercase font-semibold">
                              {language === 'ar' ? 'المقاس النشط' : 'Taille active'}
                            </span>
                            <span className="font-bold text-sm tracking-wide">{selectedSize}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-brand-beige-400 uppercase font-semibold">
                              {language === 'ar' ? 'محيط الصدر' : 'Tour de Poitrine'}
                            </span>
                            <span className="font-semibold text-xs">{measureGuides[selectedSize]?.poitrine || "Ample"}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-brand-beige-400 uppercase font-semibold">
                              {language === 'ar' ? 'الطول الإجمالي' : 'Longueur Totale'}
                            </span>
                            <span className="font-semibold text-xs">{measureGuides[selectedSize]?.longueur || "145 cm"}</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-brand-rose-700 tracking-wide mb-2 text-center uppercase text-[10px]">
                            {language === 'ar' ? 'جدول الملاءمة الفضفاضة للمقاسات الكبيرة' : 'Tableau de correspondance des tailles amples'}
                          </p>
                          <div className="grid grid-cols-4 gap-1 text-[10px] text-center border-b border-brand-rose-200/40 pb-1.5 font-bold text-brand-rose-800">
                            <span>{language === 'ar' ? 'المقاس' : 'Taille'}</span>
                            <span>{language === 'ar' ? 'الصدر (سم)' : 'Buste (cm)'}</span>
                            <span>{language === 'ar' ? 'الأرداف (سم)' : 'Hanche (cm)'}</span>
                            <span>{language === 'ar' ? 'الطول' : 'Longueur'}</span>
                          </div>
                          <div className="space-y-1 mt-1">
                            {Object.entries(measureGuides).map(([szCode, values]) => (
                              <div key={szCode} className="grid grid-cols-4 text-center text-brand-beige-900 py-0.5 odd:bg-white/40">
                                <span className="font-bold text-brand-rose-600">{szCode}</span>
                                <span>{values.poitrine}</span>
                                <span>{values.hanche}</span>
                                <span>{values.longueur}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* List of custom luxury specifications */}
            <div className="space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-beige-400 block">
                {language === 'ar' ? 'المواصفات الفنية للتصميم :' : 'Fiche Technique du Modèle :'}
              </span>
              <ul className="text-xs text-brand-beige-900/85 space-y-1.5 pl-1.5">
                {(language === 'ar' && product.detailsAr ? product.detailsAr : product.details).map((dt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-rose-400 mt-1.5 shrink-0" />
                    <span>{dt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* CTA checkout operations */}
          <div className="pt-4 border-t border-brand-rose-200/30">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="modal-add-to-cart-cta"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 px-6 rounded-xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 shadow-sm transition-all duration-300 transform active:scale-98 cursor-pointer ${
                  selectedSize 
                    ? quantityAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-rose-600 text-white hover:bg-brand-rose-700 hover:shadow-md hover:-translate-y-0.5' 
                    : 'bg-brand-beige-200 text-brand-beige-400 cursor-not-allowed border border-brand-beige-300'
                }`}
              >
                {quantityAdded ? (
                  <>
                    <Check size={16} />
                    <span>{language === 'ar' ? 'تمت الإضافة بنجاح !' : 'Ajouté avec Succès !'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>{selectedSize ? (language === 'ar' ? `إضافة إلى السلة (${selectedSize})` : `Ajouter au Panier (${selectedSize})`) : (language === 'ar' ? 'حددي مقاسك الملائم' : 'Sélectionnez une Taille')}</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="py-4 px-6 rounded-xl bg-white text-brand-beige-900 border border-brand-beige-200 hover:bg-brand-rose-50 text-xs font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer"
              >
                {language === 'ar' ? 'رجوع' : 'Retour'}
              </button>
            </div>

            {/* Trust assurances block */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-brand-beige-400 font-semibold uppercase tracking-wider text-center font-bold">
              <span className="flex items-center gap-1.5">🛡️ {language === 'ar' ? 'دفع آمن ومحمي 100%' : 'Paiement Sécurisé'}</span>
              <span className="w-1 h-1 rounded-full bg-brand-rose-100"></span>
              <span className="flex items-center gap-1.5">📦 {language === 'ar' ? 'شحن سريع خلال 48 ساعة' : 'Expédition sous 48h'}</span>
              <span className="w-1 h-1 rounded-full bg-brand-rose-100"></span>
              <span className="flex items-center gap-1.5">🔄 {language === 'ar' ? 'استبدال واسترجاع مرن' : 'Retours Faciles'}</span>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
