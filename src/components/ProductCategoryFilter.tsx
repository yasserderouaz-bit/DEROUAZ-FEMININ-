/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProductCategory, ProductSize, FilterState } from '../types';
import { SlidersHorizontal, ArrowUpDown, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface ProductCategoryFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalProductsCount: number;
  language?: 'fr' | 'ar';
}

export default function ProductCategoryFilter({
  filters,
  setFilters,
  totalProductsCount,
  language = 'fr'
}: ProductCategoryFilterProps) {
  
  const categories: { id: ProductCategory | 'all'; label: string; countLetter: string }[] = language === 'ar' ? [
    { id: 'all', label: 'الكل متاح', countLetter: '🌟' },
    { id: 'robes', label: 'فساتين طويلة', countLetter: '👗' },
    { id: 'abayas', label: 'عبايات المدينة', countLetter: '🕌' },
    { id: 'ensembles', label: 'أطقم كلوش', countLetter: '👘' },
    { id: 'tuniques', label: 'تونيكات فضفاضة', countLetter: '👚' },
    { id: 'hijabs', label: 'أوشحة وحجاب رائع', countLetter: '🧣' }
  ] : [
    { id: 'all', label: 'Tout voir', countLetter: '🌟' },
    { id: 'robes', label: 'Robes Longues', countLetter: '👗' },
    { id: 'abayas', label: 'Abayas de Médine', countLetter: '🕌' },
    { id: 'ensembles', label: 'Ensembles Palazzo', countLetter: '👘' },
    { id: 'tuniques', label: 'Tuniques Amples', countLetter: '👚' },
    { id: 'hijabs', label: 'Hijabs Premium', countLetter: '🧣' }
  ];

  const sizes: (ProductSize | 'all')[] = ['all', '50', '52', '54', '56', '58', '60', '62', '64', '66'];

  const handleCategorySelect = (catId: ProductCategory | 'all') => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const handleSizeSelect = (size: ProductSize | 'all') => {
    setFilters(prev => ({ ...prev, size }));
  };

  const resetAllFilters = () => {
    setFilters({
      category: 'all',
      size: 'all',
      searchQuery: '',
      priceRange: 150,
      sortBy: 'popular'
    });
  };

  return (
    <div id="filter-wrapper" className="bg-white rounded-3xl border border-brand-rose-100 p-6 sm:p-8 shadow-2xs space-y-6 sm:space-y-8 font-bold">
      
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-rose-200/30 pb-5">
        <div className="flex items-center gap-2.5 text-brand-beige-900">
          <SlidersHorizontal size={18} className="text-brand-rose-600" />
          <h3 className="font-serif text-lg font-bold">
            {language === 'ar' ? 'تصفية وتحديد المجموعة' : 'Affiner la Collection'}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-brand-rose-500 px-2.5 py-0.5 rounded-full inline-block">
            {language === 'ar' ? `تم العثور على ${totalProductsCount} تصميم فريد` : `${totalProductsCount} modèles trouvés`}
          </span>
        </div>

        {/* Reset filters button */}
        {(filters.category !== 'all' || filters.size !== 'all' || filters.priceRange < 150 || filters.searchQuery !== '') && (
          <button
            onClick={resetAllFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-brand-rose-600 hover:text-brand-rose-800 font-bold tracking-wide uppercase transition-colors cursor-pointer"
          >
            <RefreshCw size={12} className="animate-spin-slow" />
            <span>{language === 'ar' ? 'إعادة ضبط مرشحات البحث' : 'Réinitialiser les filtres'}</span>
          </button>
        )}
      </div>

      {/* 1. Horizontal Scroll Category badges */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCA280] block">
          {language === 'ar' ? 'تصفية حسب نوع وتصنيف الزي :' : 'Filtrer par Catégorie de vêtement :'}
        </span>
        <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-5 py-3 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-brand-rose-600 text-white shadow-md transform -translate-y-0.5'
                  : 'bg-brand-rose-50/60 hover:bg-brand-rose-100 text-brand-rose-800 hover:text-brand-rose-900 border border-brand-rose-100/50'
              }`}
            >
              <span>{cat.countLetter}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of parameters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-2">
        
        {/* Sizes Grid panel (Size 5) */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCA280] block">
            {language === 'ar' ? 'تصفية بحسب مقاس قامتكِ مريح :' : 'Filtrer par Votre Taille :'}
          </span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => handleSizeSelect(sz)}
                className={`w-10 h-10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border flex items-center justify-center cursor-pointer ${
                  filters.size === sz
                    ? 'bg-brand-beige-900 border-brand-beige-900 text-white font-black shadow-xs'
                    : 'bg-white border-brand-rose-100 hover:border-brand-rose-400 text-brand-beige-900'
                }`}
              >
                {sz === 'all' ? (language === 'ar' ? 'الجميع' : 'Toutes') : sz}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-brand-beige-400 font-semibold italic">
            {language === 'ar' ? '* ملابسنا مصممة بدقة لتلائم قامتكِ الممتلئة بكل سهولة وراحة.' : '* Nos vêtements sont patronnés pour des corpulences généreuses avec aisance.'}
          </p>
        </div>

        {/* Price slider range panel (Size 4) */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCA280]">
              {language === 'ar' ? 'الميزانية والحد الأقصى :' : 'Budget Maximal :'}
            </span>
            <span className="text-xs font-bold text-brand-rose-700 bg-brand-rose-100/60 px-2 py-0.5 rounded-md">
              {language === 'ar' ? `حتى ${filters.priceRange} يورو` : `Jusqu'à ${filters.priceRange} €`}
            </span>
          </div>
          
          <div className="pt-2">
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-brand-rose-100 rounded-lg appearance-none cursor-pointer accent-brand-rose-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-brand-beige-400 mt-2 uppercase tracking-wide">
              <span>15 €</span>
              <span>80 €</span>
              <span>150 €</span>
            </div>
          </div>
        </div>

        {/* Sorting options select (Size 3) */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCA280] block">
            {language === 'ar' ? 'ترتيب وتنسيق المعروضات بحسب :' : 'Trier les modèles par :'}
          </span>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full px-4 py-3 rounded-xl border border-brand-rose-100 bg-beige-50/20 hover:bg-brand-rose-50 text-xs font-bold text-brand-beige-900 cursor-pointer shadow-2xs focus:ring-1 focus:ring-brand-rose-300"
            >
              <option value="popular">{language === 'ar' ? 'الأكثر طلباً ورواجاً' : 'Sélection Populaire'}</option>
              <option value="newest">{language === 'ar' ? 'الأحدث وصلاً وصناعة' : 'Dernières confections'}</option>
              <option value="price-asc">{language === 'ar' ? 'السعر : الأدنى للأعلى' : 'Prix de : Faible à Élevé'}</option>
              <option value="price-desc">{language === 'ar' ? 'السعر : الأعلى للأدنى' : 'Prix de : Élevé à Faible'}</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
}
