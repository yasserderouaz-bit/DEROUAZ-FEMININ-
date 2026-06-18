/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Check, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { CartItem, ProductSize } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PremiumCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: ProductSize, newQuantity: number) => void;
  onRemoveItem: (productId: string, size: ProductSize) => void;
  onClearCart: () => void;
  language?: 'fr' | 'ar';
}

export default function PremiumCart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language = 'fr'
}: PremiumCartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Checkout inputs
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    address: '',
    zip: '',
    city: '',
    phone: '',
    paymentMethod: 'card'
  });

  const [isPlacingOrderLoader, setIsPlacingOrderLoader] = useState(false);
  const [simulatedOrderNumber, setSimulatedOrderNumber] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * appliedDiscount;
  const deliveryFee = subtotal >= 89 ? 0 : 5.90;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'DEROUAZ10') {
      setAppliedDiscount(0.1);
      setPromoMessage(
        language === 'ar'
          ? 'تم تفعيل كود الخصم درواز بنجاح! تم تطبيق خصم فوري بقيمة -10%.'
          : 'Code DEROUAZ10 activé ! Vous bénéficiez de -10% de réduction immédiate.'
      );
    } else {
      setPromoMessage(
        language === 'ar'
          ? 'كود الخصم المدخل غير صحيح. جربي الكود DEROUAZ10 للحصول على خصم 10%.'
          : 'Code invalide. Essayez le code DEROUAZ10 pour -10%.'
      );
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.fullName || !checkoutForm.address || !checkoutForm.zip || !checkoutForm.city || !checkoutForm.phone) {
      return;
    }
    setIsPlacingOrderLoader(true);
    setTimeout(() => {
      setIsPlacingOrderLoader(false);
      setSimulatedOrderNumber(`DF-OR-${Math.floor(Math.random() * 900000 + 100000)}`);
      setIsOrderPlaced(true);
    }, 2000);
  };

  const handleResetAfterPurchase = () => {
    onClearCart();
    setIsCheckoutMode(false);
    setIsOrderPlaced(false);
    setCheckoutForm({ fullName: '', address: '', zip: '', city: '', phone: '', paymentMethod: 'card' });
    setPromoCode('');
    setAppliedDiscount(0);
    setPromoMessage('');
    onClose();
  };

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-brand-beige-50 h-full shadow-2xl flex flex-col justify-between border-l border-brand-rose-200/50"
      >
        
        {/* Header Section */}
        <div className="p-6 bg-white border-b border-brand-rose-200/40 flex items-center justify-between font-bold">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="text-brand-rose-600" size={20} />
            <h2 className="font-serif text-lg font-bold text-brand-beige-900">
              {isOrderPlaced 
                ? (language === 'ar' ? 'تهانينا رضاء تام' : 'Félicitations') 
                : isCheckoutMode 
                  ? (language === 'ar' ? 'العنوان والدفع الآمن' : 'Paiement & Adresse') 
                  : (language === 'ar' ? 'سلة المشتريات الخاصة بكِ' : 'Votre Panier')
              }
            </h2>
            {!isCheckoutMode && !isOrderPlaced && (
              <span className="bg-brand-rose-100 text-brand-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((tot, it) => tot + it.quantity, 0)}
              </span>
            )}
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1 px-2.5 py-1.5 rounded-full hover:bg-brand-rose-100/50 text-brand-beige-900 transition-colors cursor-pointer"
            aria-label={language === 'ar' ? 'إغلاق السلة' : 'Fermer le panier'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <AnimatePresence mode="wait">
            
            {/* STATE A: Order Confirmation Successful */}
            {isOrderPlaced ? (
              <motion.div
                key="order-success-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full inline-block animate-bounce">
                  <Check size={40} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-brand-beige-900">
                    {language === 'ar' ? 'تم تأكيد وطلب طلبيتكِ بنجاح !' : 'Commande validée avec succès !'}
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto font-bold leading-relaxed">
                    {language === 'ar' ? (
                      <>نشكركِ على ثقتكِ الغالية في <strong>دار درواز للمرأة</strong>. تم تسجيل طلبيتكِ بنجاح ويجري إعدادها وتغليفها بكل ود وعناية لتصلكِ في أقرب وقت.</>
                    ) : (
                      <>Merci pour votre confiance chez <strong>Maison Derouaz Féminin</strong>. Votre commande a été enregistrée et transmise à notre équipe de préparation.</>
                    )}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-brand-rose-150 shadow-2xs text-left text-xs space-y-3 font-sans font-bold">
                  <p className="flex justify-between border-b pb-2 text-brand-beige-400">
                    <span>{language === 'ar' ? 'رقم المرجع للطلب' : 'Référence de Commande'}</span>
                    <strong className="text-brand-beige-900 font-bold">{simulatedOrderNumber}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-2 text-brand-beige-400">
                    <span>{language === 'ar' ? 'المستلم' : 'Destinataire'}</span>
                    <strong className="text-brand-beige-900 font-semibold">{checkoutForm.fullName}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-2 text-brand-beige-400">
                    <span>{language === 'ar' ? 'عنوان الشرح والشحن' : 'Adresse de Livraison'}</span>
                    <strong className="text-brand-beige-900 font-semibold text-right max-w-[200px] inline-block truncate">{checkoutForm.address}, {checkoutForm.city}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-2 text-brand-beige-400">
                    <span>{language === 'ar' ? 'المبلغ الإجمالي المدفوع' : 'Montant Payé'}</span>
                    <strong className="text-brand-rose-700 font-bold text-sm">{grandTotal.toFixed(2)} €</strong>
                  </p>
                  <p className="text-[11px] text-brand-beige-400 font-bold uppercase tracking-wider text-center pt-2">
                    {language === 'ar' ? '🚚 الشحن السريع كوليسيمو مضمون للتسليم في 48-72 ساعة' : '🚚 Livraison Colissimo prévue sous 48-72h'}
                  </p>
                </div>

                <button
                  onClick={handleResetAfterPurchase}
                  className="w-full py-4 rounded-xl bg-brand-rose-600 hover:bg-brand-rose-700 text-white font-bold text-xs tracking-widest uppercase transition-colors shadow-2xs cursor-pointer"
                >
                  {language === 'ar' ? 'مواصلة تصفح التشكيلات' : 'Continuer mes achats'}
                </button>
              </motion.div>
            ) :
            
            /* STATE B: Checkout delivery inputs */
            isCheckoutMode ? (
              <motion.form
                key="checkout-inputs-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handlePlaceOrder}
                className="space-y-5 text-right"
              >
                <div className="bg-brand-rose-100/40 p-4 rounded-xl border border-brand-rose-100 text-[11px] text-brand-rose-800 leading-relaxed font-semibold text-center">
                  {language === 'ar' ? (
                    <>🛒 قيمة الفاتورة شاملة الشحن والتوصيل <strong>{grandTotal.toFixed(2)} €</strong>.</>
                  ) : (
                    <>🛒 Vous réglez un montant total de <strong>{grandTotal.toFixed(2)} €</strong> (livraison incluse).</>
                  )}
                </div>

                <h3 className="font-serif text-sm font-bold text-brand-beige-900 uppercase tracking-wider">
                  {language === 'ar' ? 'معلومات وعناوين الشحن الفعالة :' : 'Vos informations de livraison :'}
                </h3>

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="chk-name" className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                    {language === 'ar' ? (
                      <>الاسم واللقب بالكامل <span className="text-brand-rose-500">*</span></>
                    ) : (
                      <>Nom & Prénom <span className="text-brand-rose-500">*</span></>
                    )}
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    required
                    value={checkoutForm.fullName}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                    placeholder={language === 'ar' ? "مثال: آسية بن جلون" : "Ex: Assia Benjelloun"}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 shadow-inner text-left"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label htmlFor="chk-address" className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                    {language === 'ar' ? (
                      <>العنوان بالكامل والحي <span className="text-brand-rose-500">*</span></>
                    ) : (
                      <>Adresse complète <span className="text-brand-rose-500">*</span></>
                    )}
                  </label>
                  <input
                    id="chk-address"
                    type="text"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    placeholder={language === 'ar' ? "مثال: حي الرياض، شارع النخيل" : "Ex: 14 Avenue des Champs-Élysées"}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 shadow-inner text-left"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Zip code */}
                  <div className="space-y-1">
                    <label htmlFor="chk-zip" className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                      {language === 'ar' ? (
                        <>الرمز البريدي <span className="text-brand-rose-500">*</span></>
                      ) : (
                        <>Code postal <span className="text-brand-rose-500">*</span></>
                      )}
                    </label>
                    <input
                      id="chk-zip"
                      type="text"
                      required
                      value={checkoutForm.zip}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, zip: e.target.value })}
                      placeholder="Ex: 75008"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 shadow-inner text-left"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label htmlFor="chk-city" className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                      {language === 'ar' ? (
                        <>المدينة <span className="text-brand-rose-500">*</span></>
                      ) : (
                        <>Ville <span className="text-brand-rose-500">*</span></>
                      )}
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      required
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      placeholder={language === 'ar' ? "مثال: باريس" : "Ex: Paris"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 shadow-inner text-left"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="chk-phone" className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                    {language === 'ar' ? (
                      <>رقم الهاتف (لمتابعة إشعارات الشحن والوصول عبر SMS) <span className="text-brand-rose-500">*</span></>
                    ) : (
                      <>Téléphone (Suivi SMS de livraison) <span className="text-brand-rose-500">*</span></>
                    )}
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    placeholder="Ex: 06 20 40 60 80"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 shadow-inner text-left"
                  />
                </div>

                {/* Payment selectors */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-beige-900 block">
                    {language === 'ar' ? 'طريقة الدفع الرقمي الآمنة والمجربة :' : 'Mode de paiement virtuel sécurisé :'}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'card' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        checkoutForm.paymentMethod === 'card'
                          ? 'border-brand-rose-600 bg-brand-rose-50 text-brand-rose-700'
                          : 'border-brand-beige-200 bg-white hover:border-brand-rose-200 text-brand-beige-900'
                      }`}
                    >
                      <CreditCard size={14} />
                      {language === 'ar' ? 'بطاقة فيزا بنكية' : 'Carte Bancaire'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cod' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        checkoutForm.paymentMethod === 'cod'
                          ? 'border-brand-rose-600 bg-brand-rose-50 text-brand-rose-700'
                          : 'border-brand-beige-200 bg-white hover:border-brand-rose-200 text-brand-beige-900'
                      }`}
                    >
                      🤝 {language === 'ar' ? 'الدفع نقداً عند الشحن' : 'À la livraison'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    id="confirm-checkout-btn"
                    type="submit"
                    disabled={isPlacingOrderLoader}
                    className="w-full py-4 rounded-xl bg-brand-rose-600 hover:bg-brand-rose-700 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    {isPlacingOrderLoader ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        <span>{language === 'ar' ? 'جاري توثيق وتأكيد طلبكِ الآمن...' : 'Paiement en cours...'}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} />
                        <span>{language === 'ar' ? `تأكيد وإرسال الطلب بقيمة ${grandTotal.toFixed(2)} يورو` : `Confirmer & Payer ${grandTotal.toFixed(2)} €`}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutMode(false)}
                    className="w-full py-3 rounded-xl bg-transparent border border-brand-beige-300 text-brand-beige-900 text-xs font-semibold tracking-widest uppercase hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'العودة لتعديل ومراجعة السلة' : 'Retour au Panier'}
                  </button>
                </div>
              </motion.form>
            ) :
            
            /* STATE C: Standard Cart view */
            cart.length === 0 ? (
              <motion.div
                key="empty-cart-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-brand-rose-100 rounded-full flex items-center justify-center mx-auto text-brand-rose-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-beige-900">
                    {language === 'ar' ? 'سلة المشتريات الخاصة بكِ فارغة حالياً' : 'Votre panier est vide'}
                  </h3>
                  <p className="text-xs text-brand-beige-400 mt-1 max-w-sm mx-auto font-bold leading-relaxed">
                    {language === 'ar' ? 'اكتشفي روائع التصاميم والخيارات من التونيكات الفضفاضة، العبايات والفساتين الرائعة المصممة لتبرز جمال قامتكِ.' : "Découvrez nos élégantes tuniques, abayas et robes en soie de Médine conçues pour vous sublimer."}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-brand-rose-600 hover:bg-brand-rose-700 text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer inline-block shadow-2xs"
                >
                  {language === 'ar' ? 'تصفح تشكيلة الأزياء' : 'Découvrir la collection'}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="active-cart-list-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Visual items roster */}
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}`} 
                      className="bg-white p-3 rounded-2xl border border-brand-rose-100 flex gap-3 h-24 relative shadow-2xs hover:border-brand-rose-200 transition-colors"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-20 bg-brand-beige-50 rounded-xl overflow-hidden shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Detailed Labels inside line */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="font-serif text-xs font-bold text-brand-beige-900 line-clamp-1 pr-6">
                            {language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}
                          </h4>
                          <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-brand-beige-100 text-brand-beige-900 mt-1 uppercase">
                            {language === 'ar' ? `المقاس: ${item.selectedSize}` : `Taille: ${item.selectedSize}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-xs text-brand-rose-700">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </span>
                          
                          {/* Quantity control pod */}
                          <div className="flex items-center gap-2 border border-brand-beige-200 rounded-lg p-0.5 bg-brand-beige-50/50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 rounded-md bg-white text-brand-beige-900 hover:text-brand-rose-600 transition-colors cursor-pointer"
                              aria-label="Moins"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-bold px-1 min-w-4 text-center text-brand-beige-900">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 rounded-md bg-white text-brand-beige-900 hover:text-brand-rose-600 transition-colors cursor-pointer"
                              aria-label="Plus"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line removal trash trigger */}
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="absolute top-3 right-3 text-brand-beige-400 hover:text-brand-rose-600 p-1 cursor-pointer"
                        aria-label="Supprimer la ligne"
                      >
                        <Trash2 size={13} />
                      </button>

                    </div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <form onSubmit={handleApplyPromo} className="pt-4 border-t border-brand-rose-200/30">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={language === 'ar' ? "أدخلي كود الخصم (مثل: DEROUAZ10)" : "Code promo (Ex: DEROUAZ10)"}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-beige-200 text-xs bg-white text-brand-beige-900 focus:bg-white shadow-inner text-left"
                      />
                      <Tag size={12} className="absolute left-3 top-3 text-brand-rose-400" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-brand-beige-200 hover:bg-brand-rose-100 font-bold text-xs uppercase tracking-wider text-brand-rose-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {language === 'ar' ? 'تفعيل الكود' : 'Appliquer'}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[10px] mt-1.5 font-semibold ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-brand-rose-600'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Calculations Ledger */}
                <div className="pt-4 border-t border-brand-rose-200/30 space-y-2 text-xs font-bold leading-relaxed">
                  <div className="flex justify-between text-brand-beige-900/80">
                    <span>{language === 'ar' ? 'مجموع المنتجات' : 'Sous-total'}</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                      <span>{language === 'ar' ? 'خصم الكود الترويجي (10%)' : 'Remise code (10%)'}</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-beige-900/80 items-center">
                    <span>
                      {language === 'ar' ? 'التوصيل وال شحن السريع (Colissimo)' : 'Livraison Colissimo (48h)'}
                      {deliveryFee === 0 && (
                        <span className="ml-1.5 text-[9px] font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                          {language === 'ar' ? 'مـجـانـي' : 'Offerte'}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">{deliveryFee > 0 ? `${deliveryFee.toFixed(2)} €` : (language === 'ar' ? 'مجاني' : 'Gratuit')}</span>
                  </div>
                  
                  {subtotal < 89 && (
                    <p className="text-[10px] text-brand-rose-600 font-bold text-center bg-brand-rose-100/30 p-2 rounded-lg leading-relaxed">
                      {language === 'ar' ? (
                        <>أضيفي منتجات بقيمة <strong>{(89 - subtotal).toFixed(2)} €</strong> لتستفيدي من الشحن المجاني المضمون !</>
                      ) : (
                        <>Ajoutez <strong>{(89 - subtotal).toFixed(2)} €</strong> pour bénéficier de la livraison gratuite !</>
                      )}
                    </p>
                  )}

                  <div className="flex justify-between text-base font-serif font-bold text-brand-beige-900 pt-2 border-t border-brand-rose-200/20">
                    <span>{language === 'ar' ? 'المبلغ الإجمالي التقريبي' : 'Total estimé'}</span>
                    <span className="text-brand-rose-700">{grandTotal.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Proceed checkout trigger */}
                <div className="pt-4">
                  <button
                    id="checkout-trigger-btn"
                    onClick={() => setIsCheckoutMode(true)}
                    className="w-full py-4 rounded-xl bg-brand-rose-600 hover:bg-brand-rose-700 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                  >
                    <span>{language === 'ar' ? 'الذهاب لإتمام الطلب' : 'Passer la commande'}</span>
                    <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Footer info: Secure transaction badge */}
        {!isOrderPlaced && (
          <div className="p-4 bg-white border-t border-brand-rose-200/40 flex items-center justify-center gap-2 text-[10px] text-brand-beige-400 font-semibold tracking-wider uppercase">
            <span className="text-emerald-600">✔</span>
            <span>
              {language === 'ar' ? 'نظام دفع آمن ومشفر بالكامل لحمايتكِ SSL' : 'Transaction chiffrée SSL de bout en bout'}
            </span>
          </div>
        )}

      </motion.div>
    </div>
  );
}
