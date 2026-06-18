/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactUsProps {
  language?: 'fr' | 'ar';
}

export default function ContactUs({ language = 'fr' }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'taille',
    message: ''
  });
  
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    // Simulate API pipeline
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'taille', message: '' });
    }, 1500);
  };

  return (
    <div id="contact-us-container" className="bg-brand-beige-50/20 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-brand-rose-600 uppercase block mb-3">
            {language === 'ar' ? 'في خدمتكم' : 'À votre écoute'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-beige-900 leading-tight">
            {language === 'ar' ? 'اتصلي بخدمة العملاء المتميزة لدينا' : 'Contactez notre Service Client d\'Excellence'}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-600">
            {language === 'ar' 
              ? 'هل لديكِ استفسار عن قماش ما، أو نصيحة بشأن اختيار مقاس مناسب، أو رغبة في المساعدة لعملية الاسترجاع؟ فريق المستشارين لدينا متأهب للرد عليكِ خلال 24 ساعة من أيام العمل.'
              : 'Une question sur un tissu, un conseil pour la sélection d\'une taille, ou besoin d\'assistance pour un retour ? Notre équipe de conseillères dévouées vous répond sous 24 heures ouvrées.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates & Information (Size 5 on Desktop) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            
            <div className="bg-white p-8 rounded-3xl border border-brand-rose-100 shadow-2xs space-y-8">
              
              <h3 className="font-serif text-lg font-bold text-brand-beige-900 border-b border-brand-rose-200/40 pb-4 flex items-center gap-2">
                <span>{language === 'ar' ? 'بيانات الاتصال بنا' : 'Nos Coordonnées'}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-brand-rose-500"></span>
              </h3>

              {/* Individual Details */}
              <div className="space-y-6">
                
                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-rose-100/50 text-brand-rose-700 rounded-xl">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-beige-400 mb-0.5">
                      {language === 'ar' ? 'الهاتف المجاني' : 'Téléphone gratuit'}
                    </h4>
                    <p className="text-sm font-semibold text-brand-beige-900">+33 (0)1 45 78 92 30</p>
                    <p className="text-xs text-brand-beige-400 mt-1">
                      {language === 'ar' ? 'من الإثنين إلى الجمعة: 9:00 صباحاً – 6:30 مساءً' : 'Du lundi au vendredi : 9h00 – 18h30'}
                    </p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-rose-100/50 text-brand-rose-700 rounded-xl">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-beige-400 mb-0.5">
                      {language === 'ar' ? 'البريد الإلكتروني للاتصال' : 'E-mail de contact'}
                    </h4>
                    <p className="text-sm font-semibold text-brand-beige-900">contact@derouaz-feminin.com</p>
                    <p className="text-xs text-brand-beige-400 mt-1">
                      {language === 'ar' ? 'إجابة مخصصة وذات أولوية قصوى' : 'Réponse prioritaire personnalisée'}
                    </p>
                  </div>
                </div>

                {/* Showroom Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-rose-100/50 text-brand-rose-700 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-beige-400 mb-0.5">
                      {language === 'ar' ? 'صالة العرض بباريس' : 'Showroom Parisien'}
                    </h4>
                    <p className="text-sm font-semibold text-brand-beige-900">Maison Derouaz Féminin</p>
                    <p className="text-xs text-brand-beige-900">22 Rue du Faubourg Saint-Honoré, Esc. B, 3ème étage</p>
                    <p className="text-xs text-brand-beige-400 mt-1">
                      {language === 'ar' ? 'بموعد مسبق فقط للقياسات الخاصة المتميزة' : 'Sur rendez-vous uniquement pour essayages privés'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Timely notice detail */}
            <div className="bg-brand-rose-100/30 p-6 rounded-3xl border border-brand-rose-100 flex items-start gap-4">
              <Clock className="text-brand-rose-600 shrink-0 mt-0.5" size={18} />
              <div className="text-xs">
                <p className="font-bold text-brand-rose-800 uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'فترة الأعياد والمناسبات المزدحمة' : 'Période des Fêtes & Événements'}
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  {language === 'ar' 
                    ? 'يظل فريقنا في تمام الجاهزية والنشاط حتى خلال فترات التوافد الكثيف (العيد، وموسم حفلات الزفاف الصيفية) لتقديم الدعم التام لكِ.'
                    : 'Notre équipe reste mobilisée même durant les périodes de forte affluence (Aïd, période de mariages estivaux) pour vous guider au mieux.'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interaction Form (Size 7 on Desktop) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-brand-rose-100 shadow-2xs">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <h3 className="font-serif text-xl font-bold text-brand-beige-900 mb-2">
                    {language === 'ar' ? 'نموذج المراسلة المباشرة' : 'Formulaire de Message Direct'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nom / Prénom */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-name" className="text-xs font-bold uppercase tracking-wider text-brand-beige-900 block">
                        {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'} <span className="text-brand-rose-500">*</span>
                      </label>
                      <input
                        id="user-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'ar' ? "مثال: مريم العلمي" : "Ex: Myriam Alami"}
                        className="w-full px-4 py-3 rounded-xl border border-brand-beige-200 text-sm bg-brand-beige-50/50 focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-email" className="text-xs font-bold uppercase tracking-wider text-brand-beige-1000 block">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Adresse e-mail'} <span className="text-brand-rose-500">*</span>
                      </label>
                      <input
                        id="user-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: myriam@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-brand-beige-200 text-sm bg-brand-beige-50/50 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-phone" className="text-xs font-bold uppercase tracking-wider text-brand-beige-900 block">
                        {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Téléphone (Optionnel)'}
                      </label>
                      <input
                        id="user-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: 06 12 34 56 78"
                        className="w-full px-4 py-3 rounded-xl border border-brand-beige-200 text-sm bg-brand-beige-50/50 focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="message-topic" className="text-xs font-bold uppercase tracking-wider text-brand-beige-900 block">
                        {language === 'ar' ? 'موضوع الرسالة' : 'Objet du message'}
                      </label>
                      <select
                        id="message-topic"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-beige-200 text-sm bg-brand-beige-50/50 focus:bg-white transition-all cursor-pointer shadow-inner"
                      >
                        {language === 'ar' ? (
                          <>
                            <option value="taille">نصائح وإرشاد للمقاسات (44-56)</option>
                            <option value="commande">متابعة أو شحن طلبية</option>
                            <option value="retour">سياسة الاستبدال أو الاسترجاع</option>
                            <option value="reclamation">خدمة ما بعد البيع</option>
                            <option value="autre">طلب أو استفسار آخر</option>
                          </>
                        ) : (
                          <>
                            <option value="taille">Conseil d'Aide aux Tailles (44-56)</option>
                            <option value="commande">Suivi ou Expédition de commande</option>
                            <option value="retour">Politique d'Échanges ou Retours</option>
                            <option value="reclamation">Service après-vente</option>
                            <option value="autre">Autre demande</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label htmlFor="message-body" className="text-xs font-bold uppercase tracking-wider text-brand-beige-900 block">
                      {language === 'ar' ? 'رسالتكِ' : 'Votre Message'} <span className="text-brand-rose-500">*</span>
                    </label>
                    <textarea
                      id="message-body"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'ar' ? "كيف يمكننا مساعدتكِ؟ اكتب استفساركِ هنا..." : "Comment pouvons-nous vous aider ? Écrivez vos questions ici..."}
                      className="w-full px-4 py-3 rounded-xl border border-brand-beige-200 text-sm bg-brand-beige-50/50 focus:bg-white transition-all shadow-inner resize-none"
                    />
                  </div>

                  {/* Submit trigger */}
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                      isSending 
                        ? 'bg-brand-rose-300 text-white cursor-not-allowed' 
                        : 'bg-brand-rose-600 text-white hover:bg-brand-rose-700 hover:shadow-md cursor-pointer transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        <span>{language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>{language === 'ar' ? 'إرسال الرسالة' : 'Envoyer le Message'}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-brand-beige-400 font-semibold uppercase tracking-wider">
                    {language === 'ar' 
                      ? '* من خلال إرسال هذا النموذج، فإنكِ توافقين على سياسة حماية وأمن البيانات الخاصة بنا.'
                      : '* En soumettant ce formulaire, vous acceptez notre politique de protection des données.'}
                  </p>

                </motion.form>
              ) : (
                <motion.div 
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 flex flex-col items-center text-center space-y-6"
                >
                  <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full animate-bounce">
                    <CheckCircle2 size={44} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-beige-900">
                      {language === 'ar' ? 'تم استلام رسالتكِ بنجاح!' : 'Message Reçu avec Succès !'}
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto">
                      {language === 'ar'
                        ? 'نشكركِ على مراسلتنا. تم استلام رسالتكِ بشكل آمن، وسيقوم أحد ممثلي الدعم الفني بالرد عليكِ في غضون 24 ساعة كحد أقصى.'
                        : 'Merci pour votre message à notre service client. Une conseillère dédiée a bien reçu votre demande et reviendra vers vous sous 24 heures maximum.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-rose-100/30 text-xs text-brand-rose-800 font-semibold border border-brand-rose-100/70 inline-block">
                    {language === 'ar' ? 'رقم التذكرة المعيّن:' : 'Numéro de ticket attribué :'} #DF-2026-{Math.floor(Math.random() * 90000 + 10000)}
                  </div>

                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-brand-rose-600 text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-rose-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    {language === 'ar' ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
