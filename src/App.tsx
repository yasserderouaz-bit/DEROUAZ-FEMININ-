/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CartItem, FilterState, Product, ProductSize, Testimonial } from './types';
import { PRODUCTS, TESTIMONIALS } from './data/products';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, HeartOff, Check, AlertCircle, RefreshCw, Star, Info, ShoppingBag } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import PremiumCart from './components/PremiumCart';
import FavoritesDrawer from './components/FavoritesDrawer';
import ProductCategoryFilter from './components/ProductCategoryFilter';
import Footer from './components/Footer';

export default function App() {
  // Global Navigation tabs
  const [activeTab, setActiveTab] = useState<ActiveTab>('accueil');
  
  // Language & Direction controls
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  // Sync document direction and lang on language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  // Shopping cart & Wishlist state loaders
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  // Sidebar drawers triggers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search and advanced filtering variables
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    size: 'all',
    searchQuery: '',
    priceRange: 150,
    sortBy: 'popular'
  });

  // Small feedback alert bar
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync searchQuery with filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Toast auto-dismiss system
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Show customized floating toast alert
  const displayToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: ProductSize) => {
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === size
      );

      const prodName = language === 'ar' && product.nameAr ? product.nameAr : product.name;

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        displayToast(
          language === 'ar'
            ? `تم زيادة كمية ${prodName} (المقاس ${size}) بنجاح`
            : `Quantité augmentée pour ${product.name} (Taille ${size})`,
          'success'
        );
        return updated;
      } else {
        displayToast(
          language === 'ar'
            ? `تم إضافة ${prodName} (المقاس ${size}) إلى سلة المشتريات`
            : `Modèle ${product.name} ajouté au panier en taille ${size}`,
          'success'
        );
        return [...prevCart, { product, selectedSize: size, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: ProductSize, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        (item.product.id === productId && item.selectedSize === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: ProductSize) => {
    setCart(prevCart => {
      const target = prevCart.find(item => item.product.id === productId && item.selectedSize === size);
      if (target) {
        const prodName = language === 'ar' && target.product.nameAr ? target.product.nameAr : target.product.name;
        displayToast(
          language === 'ar'
            ? `تم إزالة ${prodName} (المقاس ${size}) من السلة`
            : `${target.product.name} (Taille ${size}) a été retiré du panier`,
          'info'
        );
      }
      return prevCart.filter(item => !(item.product.id === productId && item.selectedSize === size));
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Fav operations
  const handleToggleFavorite = (productId: string) => {
    const targetProduct = PRODUCTS.find(p => p.id === productId);
    if (!targetProduct) return;

    const isAlreadyFav = favorites.some(p => p.id === productId);
    const prodName = language === 'ar' && targetProduct.nameAr ? targetProduct.nameAr : targetProduct.name;

    if (isAlreadyFav) {
      setFavorites(prev => prev.filter(p => p.id !== productId));
      displayToast(
        language === 'ar'
          ? `تم إزالة الموديل من قائمة مفضلاتكِ الهامة`
          : `Modèle retiré de vos coups de cœur`,
        'info'
      );
    } else {
      setFavorites(prev => [...prev, targetProduct]);
      displayToast(
        language === 'ar'
          ? `تم إضافة الموديل إلى تصاميمكِ المفضلة المتميزة 💖`
          : `Ajouté à vos coups de cœur ! 💖`,
        'success'
      );
    }
  };

  // Filtering products computation
  const filteredProducts = PRODUCTS.filter(prod => {
    // 1. Search Query filter (match title, specs, description)
    if (filters.searchQuery) {
      const term = filters.searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(term);
      const matchDesc = prod.description.toLowerCase().includes(term);
      const matchCat = prod.category.toLowerCase().includes(term);
      const matchDetails = prod.details.some(d => d.toLowerCase().includes(term));
      if (!matchName && !matchDesc && !matchCat && !matchDetails) return false;
    }

    // 2. Category Filter
    if (filters.category !== 'all' && prod.category !== filters.category) {
      return false;
    }

    // 3. Sizing Filter (item must offer selected size option)
    if (filters.size !== 'all' && !prod.sizes.includes(filters.size)) {
      return false;
    }

    // 4. Budget Slider filter (item price must be less/equal)
    if (prod.price > filters.priceRange) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Sorting modes implementation
    if (filters.sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (filters.sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (filters.sortBy === 'newest') {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    // Popularity logic (sort based on reviews quantity & ratings summary)
    return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
  });

  const featuredBestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  // Shortcut setters
  const handleCategorySelectionFromHome = (categoryName: string) => {
    setFilters(prev => ({ ...prev, category: categoryName as any }));
    setActiveTab('produits');
  };

  return (
    <div className="min-h-screen bg-brand-beige-50 flex flex-col justify-between selection:bg-brand-rose-200 selection:text-brand-rose-950">
      
      {/* 1. Header Navigation elements */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart} 
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. Page viewport contents */}
      <main id="main-scroll-section" className="flex-grow">
        
        <AnimatePresence mode="wait">
          
          {/* TAB A: Accueil (Home Dashboard) */}
          {activeTab === 'accueil' && (
            <motion.div
              key="accueil-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 sm:space-y-24 pb-20"
            >
              <Hero 
                onExploreClick={() => setActiveTab('produits')} 
                onAboutClick={() => setActiveTab('quisommesnous')} 
                language={language}
              />

              {/* Signature Four-Column Numeric Categories Grid from Bold Typography Design HTML */}
              <section id="categories-numeric-highlight" className="bg-brand-cream py-10 md:py-14 grid grid-cols-2 lg:grid-cols-4 border-y border-brand-rose-200 divide-y lg:divide-y-0 lg:divide-x divide-brand-rose-200 font-bold">
                <div onClick={() => handleCategorySelectionFromHome('robes')} className="p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-brand-rose-100/30 transition-colors group">
                  <span className="text-brand-rose-500 font-serif text-4xl mb-1.5 group-hover:scale-110 transition-transform">01</span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#4A3B3B]">
                    {language === 'ar' ? 'فساتين طويلة' : 'Robes Longues'}
                  </span>
                  <span className="text-xs text-[#8C7474] mt-1 italic">
                    {language === 'ar' ? 'أناقة وسُمـوّ' : 'Confort & Distinction'}
                  </span>
                </div>
                <div onClick={() => handleCategorySelectionFromHome('ensembles')} className="p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-brand-rose-100/30 transition-colors group">
                  <span className="text-brand-rose-500 font-serif text-4xl mb-1.5 group-hover:scale-110 transition-transform">02</span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#4A3B3B]">
                    {language === 'ar' ? 'أطقم متميزة' : 'Ensembles'}
                  </span>
                  <span className="text-xs text-[#8C7474] mt-1 italic">
                    {language === 'ar' ? 'جمال وتناسق' : 'Harmonie & Style'}
                  </span>
                </div>
                <div onClick={() => handleCategorySelectionFromHome('abayas')} className="p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-brand-rose-100/30 transition-colors group">
                  <span className="text-brand-rose-500 font-serif text-4xl mb-1.5 group-hover:scale-110 transition-transform">03</span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#4A3B3B]">
                    {language === 'ar' ? 'عبايات نخب أول' : 'Abayas Luxe'}
                  </span>
                  <span className="text-xs text-[#8C7474] mt-1 italic font-cormorant">
                    {language === 'ar' ? 'حياكة يدوية راقية' : 'Finition Main'}
                  </span>
                </div>
                <div onClick={() => handleCategorySelectionFromHome('hijabs')} className="p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-brand-rose-100/30 transition-colors group">
                  <span className="text-brand-rose-500 font-serif text-4xl mb-1.5 group-hover:scale-110 transition-transform">04</span>
                  <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#4A3B3B]">
                    {language === 'ar' ? 'إكسسوارات وشالات' : 'Accessoires'}
                  </span>
                  <span className="text-xs text-[#8C7474] mt-1 italic">
                    {language === 'ar' ? 'لمسة التميز الأخيرة' : 'La touche finale'}
                  </span>
                </div>
              </section>

              {/* Browse Elegant Categories Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-brand-rose-600 uppercase block mb-2">
                    {language === 'ar' ? 'فن الأزياء الساترة بباريس' : "L'Art du Mustour parisien"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-beige-900">
                    {language === 'ar' ? 'اكتشفي تشكيلاتنا الموسمية الفخمة' : 'Découvrez nos confections de saison'}
                  </h3>
                  <p className="text-xs text-brand-beige-400 uppercase tracking-widest mt-1.5 font-semibold">
                    {language === 'ar' ? 'تفصيلات نادرة مصممة بدقة من المقاس 44 إلى 56' : 'Des créations spécifiquement taillées du 44 au 56'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                  {[
                    { id: 'robes', label: language === 'ar' ? 'فساتين طويلة' : 'Robes Longues', icon: '👗', bg: 'bg-brand-rose-50', text: language === 'ar' ? 'ساتان حريري وكسرات' : 'Satin de soie & plissés' },
                    { id: 'abayas', label: language === 'ar' ? 'عبايات كريب المدينة' : 'Abayas de Médine', icon: '🕌', bg: 'bg-[#F4EFEA]', text: language === 'ar' ? 'كريب ثقيل مقاوم للتجعد' : 'Crêpe lourd infroissable' },
                    { id: 'ensembles', label: language === 'ar' ? 'أطقم بالازو مريحة' : 'Ensembles Palazzo', icon: '👘', bg: 'bg-brand-rose-100/30', text: language === 'ar' ? 'تونيكات وبناطيل فضفاضة' : 'Tuniques & Pantalons' },
                    { id: 'tuniques', label: language === 'ar' ? 'تونيكات كاجوال' : 'Tuniques Amples', icon: '👚', bg: 'bg-[#EAE2D8]', text: language === 'ar' ? 'قصة كلوش ملكية واسعة' : 'Coupes trapèzes royales' },
                    { id: 'hijabs', label: language === 'ar' ? 'شالات حجاب فاخرة' : 'Hijabs Premium', icon: '🧣', bg: 'bg-brand-rose-50/80', text: language === 'ar' ? 'حرير المدينة وجورجيت' : 'Soie de Médine & Georgette' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelectionFromHome(cat.id)}
                      className={`group p-6 rounded-3xl border border-brand-rose-100/60 ${cat.bg} text-center space-y-3.5 hover:shadow-md hover:border-brand-rose-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 block w-full`}
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-brand-beige-900 group-hover:text-brand-rose-600 transition-colors">
                          {cat.label}
                        </h4>
                        <p className="text-[10px] mt-1 text-brand-beige-400 font-bold">
                          {cat.text}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Private Code Banner */}
              <section className="bg-brand-rose-100/40 border-y border-brand-rose-200/50 py-10 px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#BCA280] block">
                      {language === 'ar' ? 'عرض الافتتاح والموسم الجديد' : "OFFRE D'OUVERTURE DE RENTRÉE"}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-beige-900">
                      {language === 'ar' ? (
                        <>بمناسبة الافتتاح، استفيدي من خصم ترويجي بقيمة <span className="text-brand-rose-600 font-extrabold">-10%</span> على كل المتجر !</>
                      ) : (
                        <>Bénéficiez de <span className="text-brand-rose-600">-10%</span> de bienvenue sur tout le site !</>
                      )}
                    </h3>
                    <p className="text-xs text-neutral-600 font-bold">
                      {language === 'ar' ? 'دون حد أدنى للشراء. احتفالاً بإنطلاق متجرنا الرقمي للمقاسات الكبيرة الساترة.' : "Aucune limite d'achat. Pour fêter la mise en ligne de notre salon grande taille."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-brand-rose-150 shadow-inner">
                    <span className="text-xs font-bold text-brand-beige-400 uppercase tracking-widest">Code :</span>
                    <span className="font-mono text-base font-black tracking-widest text-brand-rose-700 animate-pulse">DEROUAZ10</span>
                  </div>
                </div>
              </section>

               {/* Best-Sellers Grid Row */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-brand-rose-200/30 pb-5">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.25em] text-brand-rose-600 uppercase block">
                      {language === 'ar' ? 'الأكثر عمقاً وتقييماً من قِبل عميلاتنا الكرام' : 'Plébiscités par nos clientes'}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-beige-900">
                      {language === 'ar' ? 'تصاميمنا وموديلاتنا الأكثر طلباً' : 'Nos Modèles Vedettes'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, sortBy: 'popular' }));
                      setActiveTab('produits');
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-brand-rose-700 hover:text-brand-rose-800 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'تصفح كافة التشكيلة الملكية' : 'Voir toute la collection'}</span>
                    <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {featuredBestSellers.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickViewClick={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isFavorite={favorites.some(f => f.id === prod.id)}
                      onToggleFavorite={handleToggleFavorite}
                      language={language}
                    />
                  ))}
                </div>
              </section>

              {/* Morphological Sizing Guide */}
              <section className="bg-brand-rose-50/50 py-16 sm:py-20 border-y border-brand-rose-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-brand-rose-600 uppercase block mb-2">
                      {language === 'ar' ? 'نصائح ومعايير خبراء الأناقة والمظهر' : "Conseils d'expertes"}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-beige-900">
                      {language === 'ar' ? 'أفضل طريقة لتنسيق مظهركِ تبعاً لشكل قامتكِ الاستثنائي' : 'Sublimer mes formes selon ma silhouette'}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-bold">
                      {language === 'ar' ? 'لأن معايير الجمال والوقار تتجلى في التناسق، لقد قمنا بدراسة انسياب وهبوط عبايات وفساتين درواز لتلائم منحنيات قامتِك بامتياز مريح.' : "Parce que la beauté n'est pas uniforme, nous ajustons la retombée de nos Abayas selon vos courbes stratégiques."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        title: language === 'ar' ? "القوام على شكل حرف A (أكتاف ناعمة مع أوراك ممتلئة)" : "Morphologie en A (Hanches pulpeuses)",
                        recommendation: language === 'ar' ? "اختياركِ الأمثل هو عباية إيليت الفخمة أو فستان سمية بقصته المتسعة تدريجياً لأسفل. تمنحكِ هذه الفساتين الواسعة انسياباً وقاراً ملكياً دون تحديد الأوراك." : "Misez sur l'Abaya Élite ou nos Robes Trapèzes Soumaya. Leurs évasements amples et fluides sur le bas accompagnent vos bassins de façon royale sans souligner la hanche.",
                        fabric: language === 'ar' ? "القماش الموصى به : كريب المدينة الفاخر الثقيل" : "Recommandé : Crêpe de Médine lourd"
                      },
                      {
                        title: language === 'ar' ? "القوام على شكل حرف H (الأكتاف والخصر متطابقان)" : "Morphologie en H / Sabre",
                        recommendation: language === 'ar' ? "ننصحكِ بأطقم الكتان «نور» المريحة أو تونيك كنزة الفضفاضة. قصاتها تجعل القوام يبدو رائعاً وتبرز الجانب الخفيف والأنيق لخطوط قامتِك." : "Optez pour nos Ensembles Casual Lin Nour ou la Tunique trapèze Kenza. Leurs coupes asymétriques allongent majestueusement le tronc et dessinent une ligne chic et légère.",
                        fabric: language === 'ar' ? "القماش الموصى به : فيسكوز طبيعي وكتان نقي" : "Recommandé : Pure Viscose & Lin respirant"
                      },
                      {
                        title: language === 'ar' ? "القوام الدائري الممتلئ بانتظام O" : "Morphologie en O / Formes pulpeuses uniformes",
                        recommendation: language === 'ar' ? "طقم عباية وكيمونو ليلى المكون من 3 قطع فريدة هو حليفكِ الأقوى. تصميمه يمنح المظهر طولاً فارهاً ووقاراً ملكياً مع خفة مطلقة في التنقل." : "Le Set Abaya Combo Kimono Layla (3 pièces) est votre allié suprême. Conçu with un drapé droit, le kimono ouvert structure la stature en apportant de la hauteur et une superbe liberté de mouvement.",
                        fabric: language === 'ar' ? "القماش الموصى به : حرير مكسر بكسرات الأكورديون أو قطيفة فاخرة" : "Recommandé : Soie plissée soleil ou Velours fluide"
                      }
                    ].map((mor, idx) => (
                      <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-rose-100 shadow-2xs space-y-4">
                        <span className="inline-block p-2 bg-brand-rose-100/50 rounded-lg text-xs font-bold text-brand-rose-700">
                          {language === 'ar' ? `دليل رقم ${idx + 1}` : `Guide ${idx + 1}`}
                        </span>
                        <h4 className="font-serif text-base font-bold text-brand-beige-900">{mor.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-bold">{mor.recommendation}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">{mor.fabric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Verified Testimonials Carousel Accent */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-bold">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-brand-rose-600 uppercase block mb-2">
                    {language === 'ar' ? 'آراء عميلاتنا الموثقات والمعتمدات' : 'Avis clients certifiés'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-beige-900">
                    {language === 'ar' ? 'تجارب شهية بالجمال والوقار والرضى' : 'Leurs retours chaleureux'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-rose-100 shadow-2xs space-y-4 relative">
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm font-bold text-brand-beige-900">
                          {language === 'ar' && t.nameAr ? t.nameAr : t.name}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {language === 'ar' ? 'شراء مـؤكـّد' : 'Achat Vérifié'}
                        </span>
                      </div>
                      
                      <div className="flex text-brand-gold">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-brand-gold text-brand-gold" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed font-semibold">
                        " {language === 'ar' && t.commentAr ? t.commentAr : t.comment} "
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-brand-beige-400 font-bold border-t pt-3">
                        <span>{language === 'ar' ? 'المقاس المُقـتنَى : ' : 'Taille achetée : '}{t.sizeBought}</span>
                        <span>{language === 'ar' ? (t.dateAr || t.date) : `Le ${t.date}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB B: Nos Produits (Catalog) */}
          {activeTab === 'produits' && (
            <motion.div
              key="produits-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-12 pb-24"
            >
              {/* Title Section */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-brand-rose-600 uppercase block mb-3">
                  {language === 'ar' ? 'التشكيلة الملكية الفخمة' : 'La collection royale'}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-beige-900 leading-tight">
                  {language === 'ar' ? 'ملابس جاهزة وساترة بمقاسات كبيرة' : 'Prêt-à-Porter Mastour Grande Taille'}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  {language === 'ar' ? 'تم تصميم جميع قطعنا الفخمة بانسياب وهبوط وقور يجمع بين الحشمة والراحة والاستثنائية الفريدة. استخدمي خزانة التصفية لتبحثي عن ما يناسبك.' : 'Toutes nos pièces ont été conçues avec des tombés fluides pour allier modestie, aisance et esthétique raffinée. Filtrez pour trouver votre pépite.'}
                </p>
              </div>

              {/* Advanced Filtering Pod */}
              <ProductCategoryFilter 
                filters={filters} 
                setFilters={setFilters} 
                totalProductsCount={filteredProducts.length}
                language={language}
              />

              {/* Main Products Grid displaying computed filters */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-rose-100 p-8 max-w-xl mx-auto space-y-4 font-bold">
                  <div className="text-brand-rose-400 text-3xl">🔍</div>
                  <h3 className="font-serif text-lg font-bold text-brand-beige-900">
                    {language === 'ar' ? 'عذراً، لا توجد موديلات تطابق تفضيلاتك الحالية' : 'Aucun modèle ne correspond à vos critères'}
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    {language === 'ar' ? 'ليس لدينا حالياً تصميم متاح بهذه المواصفات المحددة من الفئة والمقاس والميزانية المطلوبة.' : "Nous n'avons actuellement pas de modèle disponible avec cette combinaison spécifique de taille, catégorie ou budget maximal."}
                  </p>
                  <button
                    onClick={() => setFilters({
                      category: 'all',
                      size: 'all',
                      searchQuery: '',
                      priceRange: 150,
                      sortBy: 'popular'
                    })}
                    className="px-5 py-2.5 rounded-full bg-brand-rose-600 hover:bg-brand-rose-700 text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer inline-block"
                  >
                    {language === 'ar' ? 'إعادة ضبط مرشحات البحث' : 'Effacer les filtres'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 font-bold">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickViewClick={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isFavorite={favorites.some(f => f.id === prod.id)}
                      onToggleFavorite={handleToggleFavorite}
                      language={language}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* TAB C: Qui sommes nous */}
          {activeTab === 'quisommesnous' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutUs language={language} />
            </motion.div>
          )}

          {/* TAB D: Contact */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactUs language={language} />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* 3. Footer branding information */}
      <Footer 
        setActiveTab={setActiveTab} 
        onCategoryFilterChange={(catCode) => handleCategorySelectionFromHome(catCode)} 
        language={language}
      />

      {/* 4. Overlay Modals & Slideouts */}
      
      {/* Detail Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductQuickView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.some(f => f.id === selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Elegant Slide-over Shopping Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <PremiumCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Elegant Slide-over Wishlist Favorites */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <FavoritesDrawer
            isOpen={isFavoritesOpen}
            onClose={() => setIsFavoritesOpen(false)}
            favorites={favorites}
            onRemoveFavorite={handleToggleFavorite}
            onQuickViewClick={(prod) => {
              setSelectedProduct(prod);
              setIsFavoritesOpen(false);
            }}
            onAddToCart={handleAddToCart}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Floating alert bar toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl shadow-xl max-w-sm border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : toast.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-brand-rose-50 border-brand-rose-100 text-brand-rose-800'
            }`}
          >
            {toast.type === 'success' && <div className="p-1 rounded-full bg-emerald-500 text-white"><Check size={14} /></div>}
            {toast.type === 'error' && <div className="p-1 rounded-full bg-rose-500 text-white"><AlertCircle size={14} /></div>}
            {toast.type === 'info' && <div className="p-1 rounded-full bg-brand-rose-500 text-white"><Info size={14} /></div>}
            <span className="text-xs font-semibold leading-normal">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
