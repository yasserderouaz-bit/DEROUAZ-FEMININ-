/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onCategoryFilterChange?: (cat: string) => void;
  language?: 'fr' | 'ar';
}

export default function Footer({ setActiveTab, onCategoryFilterChange, language = 'fr' }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setSubscribed(true);
    setNewsEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleQuickTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickCat = (cat: string) => {
    setActiveTab('produits');
    if (onCategoryFilterChange) {
      onCategoryFilterChange(cat);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-brand-beige-900 text-brand-beige-100 pt-16 pb-8 border-t-4 border-brand-rose-500 font-bold">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-brand-beige-400/20 text-right">
          
          {/* Box 1: Brand description (Grid size 4 on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-brand-rose-300">
                {language === 'ar' ? 'درواز' : 'DEROUAZ'}
              </h3>
              <span className="font-cormorant text-xs font-semibold tracking-[0.35em] text-brand-rose-200 block uppercase -mt-1.5">
                {language === 'ar' ? 'للمرأة • مقاسات كبيرة' : 'Féminin ∙ Grande Taille'}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-brand-beige-200/80 leading-relaxed font-sans text-right">
              {language === 'ar' 
                ? 'الدار الفرنسية الأولى المتخصصة في الأزياء المحتشمة والراقية المصممة خصيصاً للنساء المحجبات وصاحبات القامات الفخمة للمقاسات من 44 إلى 56. نحتفي بجمال قوامكِ المتناسق بحياكة فرنسية فريدة.'
                : "La première maison française de prêt-à-porter modeste entièrement consacrée aux femmes voilées et pudiques taille 44 à 56. Nous célébrons l'abondance de vos courbes avec des finitions d'une noblesse inégalée."
              }
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-brand-beige-200 block">
              <div className="flex items-center gap-3 justify-end">
                <span>+33 (0)1 45 78 92 30</span>
                <Phone size={14} className="text-brand-rose-300" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span>contact@derouaz-feminin.com</span>
                <Mail size={14} className="text-brand-rose-300" />
              </div>
            </div>

          </div>

          {/* Box 2: Customer Care (Grid size 2 on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-rose-300">
              {language === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-beige-200/85">
              <li>
                <button onClick={() => handleQuickTab('accueil')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'الرئيسية' : 'Accueil du salon'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickTab('produits')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'تصفح كل مجموعاتنا' : 'Nos collections'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickTab('quisommesnous')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'من نحن' : 'Qui sommes nous'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickTab('contact')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'اتصلي بنا' : 'Contactez nous'}
                </button>
              </li>
            </ul>
          </div>

          {/* Box 3: Categories shortcuts (Grid size 2 on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-rose-300">
              {language === 'ar' ? 'تصاميمنا الفخمة' : 'Nos Modèles'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-beige-200/85">
              <li>
                <button onClick={() => handleQuickCat('robes')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'فساتين طويلة ملائمة' : 'Robes Longues'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickCat('abayas')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'عباءات كريب المدينة' : 'Abayas de Médine'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickCat('ensembles')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'أطقم بالازو فسيحة' : 'Ensembles Palazzo'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickCat('tuniques')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'تونيكات وتونيك فسيح' : 'Tuniques Amples'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickCat('hijabs')} className="hover:text-brand-rose-300 transition-colors cursor-pointer">
                  {language === 'ar' ? 'حجاب بريميوم أصلي' : 'Hijabs Premium'}
                </button>
              </li>
            </ul>
          </div>

          {/* Box 4: Private Club Newsletter (Grid size 4 on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-brand-rose-300 flex items-center gap-1.5 justify-end">
              <Sparkles size={14} className="text-brand-gold" />
              <span>{language === 'ar' ? 'النشرة البريدية والخصومات الخاصة' : 'Newsletter Privée'}</span>
            </h4>
            
            <p className="text-xs text-brand-beige-200/70 leading-relaxed font-sans text-right">
              {language === 'ar'
                ? 'انضمي فوراً إلى نادي المتميزات لتلقي كتالوجاتنا الموسمية الفرنسية الحصرية، واستشارات الديكور وتنسيق المقاسات، واكتسبي كود خصم -10% فور تسجيلكِ لأول مرة.'
                : "Rejoignez le club d'initiées pour recevoir nos catalogues exclusifs de saison, nos aides morphologiques, et un code de -10% offert sur votre premier achat."
              }
            </p>

            {subscribed ? (
              <div className="p-3 bg-brand-rose-700/50 rounded-xl text-xs flex items-center justify-center gap-2 border border-brand-rose-500/40 text-brand-rose-100 font-semibold uppercase tracking-wider">
                <Check size={14} />
                <span>{language === 'ar' ? 'تم اشتراككِ بنجاح! شكراً لكِ.' : 'Merci ! Inscription validée.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder={language === 'ar' ? 'بريدكِ الإلكتروني الهام...' : "Votre e-mail privée..."}
                    className="w-full px-4 py-3 pl-4 pr-12 rounded-xl bg-white/10 text-xs text-white border border-brand-beige-100/20 focus:border-brand-rose-300 transition-all font-sans text-left"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-brand-rose-600 hover:bg-brand-rose-700 text-white transition-colors cursor-pointer"
                    aria-label="S'abonner"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </form>
            )}

            {/* Quality assurances badge */}
            <div className="pt-2 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#BCA280] bg-white/5 py-1.5 px-3 rounded-lg border border-white/5 justify-center">
              <ShieldCheck size={13} />
              <span>
                {language === 'ar' ? 'ضمان الرضا الكامل أو استرداد القيمة خلال 15 يوماً' : 'Satisfait ou remboursé sous 15j'}
              </span>
            </div>

          </div>

        </div>

        {/* Payment logos list and copyrights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-[#BCA280]">
          
          <p className="text-[10px] text-center md:text-left h-fit self-center">
            {language === 'ar' ? (
              <>© 2026 درواز للمرأة والجمال. جميع الحقوق معترف بها ومصانة. <br className="inline sm:hidden" /> تصاميم وحياكة فرنسية تليق بوقار المرأة في كل زمان.</>
            ) : (
              <>&copy; 2026 DEROUAZ FEMININ. Tous droits réservés. <br className="inline sm:hidden" /> Confection française dédiée à l'excellence modeste.</>
            )}
          </p>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 select-none pointer-events-none opacity-80 animate-pulse">
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">VISA</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">MASTERCARD</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">CB</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">AMEX</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">PAYPAL</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px]">APPLE PAY</span>
          </div>

        </div>

      </div>

    </footer>
  );
}
