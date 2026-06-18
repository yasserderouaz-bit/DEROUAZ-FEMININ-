/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Sparkles, Scale, SwatchBook, Scissors, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutUsProps {
  language?: 'fr' | 'ar';
}

export default function AboutUs({ language = 'fr' }: AboutUsProps) {
  const values = language === 'ar' ? [
    {
      icon: <Scissors size={24} className="text-brand-rose-600" />,
      title: "التفصيل الاحترافي",
      description: "ملابسنا ليست مجرد مقاسات قياسية مكبرة. يستفيد كل موديل من المقاس 44 إلى 56 من نظام تصميم خاص تم اختباره ومراجعته على أجسام حقيقية ليناسب ويبرز روعة الحركة من غير تقييد."
    },
    {
      icon: <SwatchBook size={24} className="text-brand-rose-600" />,
      title: "أقمشة استثنائية ونادرة",
      description: "نتعاون مع أفضل مصانع النسيج في تركيا وإيطاليا للحصول على ميكروفيبر الحرير الفاخر، والكتان العضوي المنعش، وخاصة كريب المدينة الأصلي الثقيل، الذي يضمن انسدالاً مستقيماً مهيباً وستراً تاماً بنسبة 100%."
    },
    {
      icon: <Scale size={24} className="text-brand-rose-600" />,
      title: "شمولية دون مساومة",
      description: "تستحق كل امرأة أن تشعر بالسيادة والألق التام. تعارض دار درواز الندرة الشديدة في الأزياء الفاخرة الساترة للمقاسات الكبيرة من خلال تقديم فساتين سهرة ساحرة وأطقم خلابة بجودة تصنيع قل نظيرها."
    }
  ] : [
    {
      icon: <Scissors size={24} className="text-brand-rose-600" />,
      title: "Le Patronage Sur-Mesure",
      description: "Nos vêtements ne sont pas de simples tailles standards agrandies. Chaque modèle du 44 au 56 bénéficie d'un patronage spécifique révisé et testé sur des morphologies réelles pour épouser et valoriser le mouvement sans entraver la liberté d'expression."
    },
    {
      icon: <SwatchBook size={24} className="text-brand-rose-600" />,
      title: "Des Tissus d'Exceptions",
      description: "Nous collaborons with les meilleures filatures en Turquie et en Italie pour dénicher des micro-fibres de soie premium, des lins biologiques respirants et surtout notre authentique Crêpe de Médine lourd, qui garantit un tombé droit majestueux et une opacité à 100%."
    },
    {
      icon: <Scale size={24} className="text-brand-rose-600" />,
      title: "Inclusivité Sans Compromis",
      description: "Toutes les femmes méritent de se sentir souveraines et impeccables. DEROUAZ FEMININ s'oppose à la rareté de la haute mode modeste pour les grandes tailles en offrant d'incroyables robes de cérémonie et ensembles d'une confection rare."
    }
  ];

  return (
    <div id="about-us-container" className="bg-brand-beige-50/40 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-brand-rose-600 uppercase block mb-3">
            {language === 'ar' ? 'دار درواز النسائية' : 'Maison Derouaz Féminin'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-beige-900 leading-tight">
            {language === 'ar' 
              ? 'نبل وفخامة الأزياء الساترة المصممة خصيصاً للقوام المتناسق' 
              : 'La noblesse de la mode modeste pensée pour d\'harmonieuses courbes'}
          </h2>
          <div className="w-16 h-0.5 bg-brand-rose-400 mx-auto mt-6"></div>
        </div>

        {/* Story details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Text narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
            
            <p className="font-cormorant italic text-lg sm:text-2xl text-brand-rose-700 font-semibold leading-relaxed">
              {language === 'ar'
                ? '"الأناقة لا تكمن في المقاس، بل هي مسألة نسب، تناغم، ومهابة طبيعية ونبل."'
                : '"L\'élégance n\'est pas une question de taille, c\'est une question de proportion, d\'harmonie, et de dignité."'}
            </p>

            {language === 'ar' ? (
              <>
                <p>
                  تأسست دار <strong>درواز النسائية (DEROUAZ FEMININ)</strong> بدافع إحداث ثورة في سوق الأزياء الساترة الراقية، استجابةً لواقع مؤرق: الصعوبة البالغة التي تواجهها النساء ذوات القوام الممتلئ الباحثات عن ملابس محتشمة وأنيقة تجمع بين الحداثة والراحة والفخامة التي تليق بالهوت كوتور.
                </p>
                
                <p>
                  غالباً ما تلجأ أزياء المقاسات الكبيرة التقليدية إلى قصات فضفاضة خالية من المعالم وأقمشة اصطناعية خانقة. وبخلاف ذلك، تُكرّس ورشة التصميم الفرنسية لدينا جهودها لإبراز جمال قامتكِ من خلال تكييف رقي الموضة الشرقية وانسيابية التصاميم الغربية لصالح منحنياتكِ الجميلة. والنتيجة هي مجموعة راقية تفيض بالانتعاش والثقة اللامتناهية بالنفس.
                </p>

                <blockquote className="border-l-4 border-brand-rose-300 pl-4 py-1 italic font-serif text-brand-beige-900/90 text-sm">
                  حرير الساتان، كريب المدينة الانسيابي، الكتان المنسوج الخفيف، وتفاصيل التطريز الناعمة... نحن لا نغفل عن أي تفصيل لتنعكس الطمأنينة والأناقة الباريسية الفاخرة على كل خطوة تخطينها.
                </blockquote>

                <p>
                  مرحباً بكِ في مساحة تسوق آمنة، تتبخر فيها الصعوبات والتعقيدات لتترك المجال للظهور بأبهى حلة ووقار طبيعي ساحر.
                </p>
              </>
            ) : (
              <>
                <p>
                  Fondée avec la volonté de révolutionner le marché de la mode éthique et pudique, <strong>DEROUAZ FEMININ</strong> est née d\'un constat simple mais révoltant : l\'extrême difficulté pour les femmes de stature généreuse adepte du style mastour à trouver des vêtements à leur taille qui soient à la fois modernes, confortables et dignes de la haute couture.
                </p>
                
                <p>
                  Trop souvent, la mode grande taille a recours à des coupes informes et des tissus synthétiques étouffants. À l\'opposé, notre atelier français s\'applique à sublimer vos silhouettes en adaptant l\'élégance moyen-orientale et la fluidité occidentale au service de vos courbes. Le résultat est une collection soignée, respirant la fraîcheur et la confiance en soi.
                </p>

                <blockquote className="border-l-4 border-brand-rose-300 pl-4 py-1 italic font-serif text-brand-beige-900/90 text-sm">
                  Satin de soie, crêpe de Médine fluide, lin vaporeux, détails de broderies délicates... Nous ne négligeons aucun détail pour que chacun de vos pas reflète la sérénité et le chic parisien.
                </blockquote>

                <p>
                  Bienvenue dans un espace d\'achat sécurisé, où les complexes se dissipent pour laisser place à la distinction naturelle.
                </p>
              </>
            )}

          </div>

          {/* Graphical Frame with workspace picture */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-brand-beige-100 bg-brand-rose-100">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
                alt="Confection Atelier DEROUAZ"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Overlay statistics badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-brand-rose-200 shadow-lg hidden sm:block max-w-[210px]">
              <div className="flex items-center gap-2 text-brand-rose-600 mb-1">
                <Heart size={16} className="fill-brand-rose-500 text-brand-rose-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {language === 'ar' ? 'التزامنا' : 'Engagement'}
                </span>
              </div>
              <p className="text-xs text-brand-beige-900 font-semibold leading-relaxed">
                {language === 'ar' 
                  ? 'أكثر من 5000 عميلة سعيدة وراضية تماماً في جميع أنحاء أوروبا في عام 2025.' 
                  : 'Plus de 5 000 clientes comblées à travers l\'Europe en 2025.'}
              </p>
            </div>
          </div>

        </div>

        {/* Feature grid details */}
        <div className="border-t border-brand-rose-200/40 pt-16 sm:pt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-beige-900">
              {language === 'ar' ? 'ركائز التفوق الثلاث لدينا' : 'Nos trois piliers d\'excellence'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-beige-400 mt-1 uppercase tracking-wider font-semibold">
              {language === 'ar' ? 'معايير دور الأزياء الراقية مطبقة على الملابس الجاهزة' : 'Des standards de maison de couture appliqués au prêt-à-porter'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-white/70 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-brand-rose-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4"
              >
                <div className="p-3.5 rounded-2xl bg-brand-rose-100/50">
                  {val.icon}
                </div>
                <h4 className="font-serif text-base font-bold text-brand-beige-900">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance Banner */}
        <div className="mt-20 bg-brand-rose-100/50 p-8 sm:p-12 rounded-[2.5rem] border border-brand-rose-200/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block font-serif text-3xl font-bold text-brand-rose-700">100%</span>
            <span className="block text-xs uppercase tracking-widest font-bold text-brand-beige-900/80 mt-1">
              {language === 'ar' ? 'أقمشة مستورة تماماً' : 'Opacité Certifiée'}
            </span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-brand-rose-700">44 au 56</span>
            <span className="block text-xs uppercase tracking-widest font-bold text-brand-beige-900/80 mt-1">
              {language === 'ar' ? 'مقاسات حقيقية دقيقة' : 'Tailles Réelles Complètes'}
            </span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-brand-rose-700">Midi & Maxi</span>
            <span className="block text-xs uppercase tracking-widest font-bold text-brand-beige-900/80 mt-1">
              {language === 'ar' ? 'أطوال مخصصة فائقة' : 'Longueurs Spéciales'}
            </span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-bold text-brand-rose-700">48 Heures</span>
            <span className="block text-xs uppercase tracking-widest font-bold text-brand-beige-900/80 mt-1">
              {language === 'ar' ? 'شحن سريع وآمن' : 'Expédition Sécurisée'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
