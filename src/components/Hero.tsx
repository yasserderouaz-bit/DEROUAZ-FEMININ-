/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Heart, Sparkles, MoveRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
  language?: 'fr' | 'ar';
}

export default function Hero({ onExploreClick, onAboutClick, language = 'fr' }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-[#FDF8F5] overflow-hidden py-12 md:py-20 lg:py-24 border-b border-[#F2D7D5]">
      
      {/* Decorative Blur Background Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-brand-rose-200/10 blur-3xl translate-x-[-10%] select-none pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-brand-beige-100/20 blur-3xl translate-y-[20%] select-none pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Text Frame (Grid Size 7 on Desktop - Bold Typography layout) */}
          <div className="lg:col-span-7 flex flex-col justify-center relative space-y-6 sm:space-y-8 text-center lg:text-left py-6">
            
            {/* Giant watermark backdrop text as requested in Design HTML */}
            <div className={`absolute -top-12 text-[70px] sm:text-[110px] md:text-[150px] font-serif leading-none opacity-5 text-brand-beige-900 select-none pointer-events-none z-0 ${language === 'ar' ? '-right-4 md:right-12' : '-left-4 md:left-12'}`}>
              {language === 'ar' ? 'درواز' : 'DEROUAZ'}
            </div>

            {/* Soft Greeting Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-rose-100/60 border border-brand-rose-200/50 text-brand-rose-700 text-xs font-semibold tracking-widest uppercase mx-auto lg:mx-0 w-fit">
              <Sparkles size={14} className="text-brand-rose-500 animate-spin-slow" />
              <span>{language === 'ar' ? 'تشكيلة الملابس الجاهزة والعبايات 2026' : 'Collection Prêt-à-Porter 2026'}</span>
            </div>

            {/* Immersive Main Title - Large Scale Bold Serif */}
            <div className="space-y-4 relative z-10">
              {language === 'ar' ? (
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-brown leading-[1.1]">
                  الأناقة والجمال <br />
                  <span className="italic font-light text-brand-rose-500 font-cormorant">بكامل وقارها</span> <br />
                  الاستثنائي.
                </h2>
              ) : (
                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-brand-brown leading-[1.0] lg:leading-[0.95]">
                  L\'élégance <br />
                  <span className="italic font-light text-brand-rose-500 font-cormorant">grandeur</span> <br />
                  nature.
                </h2>
              )}
              
              {/* Specialized tag describing the niche */}
              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-[#8C7474] font-light leading-relaxed font-sans pt-3">
                {language === 'ar' ? (
                  <>
                    مجموعتنا الفخمة مصممة حصرياً للمرأة الممتلئة التي ترغب بملابس ساترة تدمج الحشمة مع روعة المظهر. قصات فضفاضة وأقمشة نخب أول تميز انحناءات قامتِك بدلال ووقار ملكي من المقاس <strong className="text-brand-rose-500 font-semibold">44 إلى 56</strong>.
                  </>
                ) : (
                  <>
                    Une collection exclusive dédiée à la femme voilée moderne. Des coupes amples, de sublimes matières qui célèbrent vos formes avec pudeur, confort et un raffinement souverain du <strong className="text-brand-rose-500 font-semibold">44 au 56</strong>.
                  </>
                )}
              </p>
            </div>

            {/* CTA Interaction Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
              <button
                id="hero-cta-collection"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-brand-rose-600 text-white uppercase text-xs tracking-widest font-bold rounded-full hover:bg-brand-rose-700 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer font-bold"
              >
                <span>{language === 'ar' ? 'تصفح كل التشكيلة الفخمة' : 'Découvrir la collection'}</span>
                <MoveRight size={15} className={language === 'ar' ? 'rotate-180' : ''} />
              </button>

              <button
                id="hero-cta-about"
                onClick={onAboutClick}
                className="w-full sm:w-auto px-8 py-4 border border-brand-rose-400 text-brand-rose-500 uppercase text-xs tracking-widest font-bold rounded-full hover:bg-brand-rose-50/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span>{language === 'ar' ? 'الأكثر طلباً ومبيعاً' : 'Nos Best-sellers'}</span>
              </button>
            </div>

            {/* Quick Benefits Badges */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 mt-2 border-t border-brand-beige-200 font-bold">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-rose-100/50 text-brand-rose-600">
                  <Heart size={14} />
                </div>
                <span className="text-xs font-semibold text-brand-beige-900/90 tracking-wide text-left">
                  {language === 'ar' ? 'قصات فضفاضة وانسيابية مريحة' : 'Coupes Amples & Fluides'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-rose-100/50 text-brand-rose-600">
                  <Award size={14} />
                </div>
                <span className="text-xs font-semibold text-brand-beige-900/90 tracking-wide text-left">
                  {language === 'ar' ? 'مقاسات مدروسة بدقة 44-56' : 'Tailles Spécifiques 44–56'}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-rose-100/50 text-brand-rose-600">
                  <ShieldCheck size={14} />
                </div>
                <span className="text-xs font-semibold text-brand-beige-900/90 tracking-wide text-left">
                  {language === 'ar' ? 'كريب وبأصل تركي معتمد' : 'Crêpe de Médine Véritable'}
                </span>
              </div>
            </div>

          </div>

          {/* Hero Visual Column (Grid Size 5 on Desktop - Beautiful Archway container matching design spec) */}
          <div className="lg:col-span-5 relative flex justify-center items-center self-stretch lg:py-6">
            
            <div className="w-full min-h-[440px] lg:h-full bg-brand-beige-100 relative rounded-[2rem] overflow-hidden flex items-center justify-center p-8 transition-transform duration-500 hover:scale-[1.01] shadow-xs">
              
              {/* Thin white inset frame border */}
              <div className="absolute inset-4 sm:inset-6 border border-white/40 z-10 rounded-[1.5rem] pointer-events-none"></div>
              
              {/* Background cover wallpaper model image with overlay blend */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800"
                  alt="DEROUAZ FEMININ - Mode Élégante Grande Taille"
                  className="w-full h-full object-cover object-center scale-[1.05] brightness-[0.85] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-brown/15 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-transparent to-brand-brown/10"></div>
              </div>

              {/* Floating boutique archway center sticker directly from the Design HTML spec */}
              <div className="relative z-20 w-64 h-90 bg-brand-beige-50/25 backdrop-blur-md rounded-t-full flex flex-col items-center justify-center p-6 border border-white/20 shadow-lg text-center transform transition-transform duration-500 hover:scale-105">
                <div className="text-white text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-serif italic font-light drop-shadow-xs">
                    {language === 'ar' ? 'أحدث التصاميم' : 'Nouveautés'}
                  </div>
                  <div className="h-[1px] w-12 bg-white/70 mx-auto my-3"></div>
                  <div className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/90">
                    {language === 'ar' ? 'موسم ربيع ودبي 2026' : 'Saison Printemps 2026'}
                  </div>
                  <p className="text-[10px] text-brand-rose-100 tracking-wider font-light mt-2 max-w-[170px] mx-auto leading-relaxed">
                    {language === 'ar' ? 'تصاميم بأمواج فضفاضة فخمة تأسر القلوب' : 'Créations exclusives au tombé fluide majestueux'}
                  </p>
                </div>
              </div>

              {/* Corner watermark text from HTML design */}
              <div className="absolute bottom-6 right-8 text-[80px] sm:text-[100px] text-white/15 font-serif select-none pointer-events-none font-bold">
                DF
              </div>

              {/* Extra reassurance badge */}
              <div className="absolute left-6 bottom-6 z-20 bg-brand-beige-50/95 backdrop-blur-xs py-1.5 px-3 rounded-full border border-brand-rose-200/30 text-[9px] font-bold text-brand-brown tracking-widest uppercase shadow-xs">
                {language === 'ar' ? '💯 سترة وتغطية كاملة مضمونة' : '💯 OPACITÉ GARANTIE'}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
