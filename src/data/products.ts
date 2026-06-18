/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'robe-soumaya',
    name: 'Robe Cérémonie Soumaya',
    nameAr: 'فستان سومايا الفاخر للمناسبات',
    category: 'robes',
    price: 89.90,
    originalPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800'
    ],
    sizes: ['52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Une superbe robe longue d\'une élégance rare, conçue dans un satin de soie fluide de première qualité. Parfaitement coupée pour sublimer les formes sans mouler, elle offre une retombée royale.',
    descriptionAr: 'فستان طويل غاية في الأناقة والوقار، مصمم من كريب حرير الساتان المنسدل من الطراز الأول. صُمم وقُصَّ بجمالية متناهية ليناسب انحناءات الجسم بكل انسيابية ووقار ملكي دون تجسيد.',
    details: [
      'Matière : Satin de soie premium ultra-fluide',
      'Longueur : 148 cm (parfaite pour stature jusqu\'à 1m78)',
      'Manches : Manches ballons avec poignets élastiqués discrets',
      'Coupe : Coupe papillon ample et froncée à la poitrine',
      'Entretien : Lavage à la main ou programme délicat 30°C'
    ],
    detailsAr: [
      'الخامة: ساتان حريري فاخر شديد الانسيابية والنعومة',
      'الطول: 148 سم (مثالي لطول قامة يصل إلى 1.78 متر)',
      'الأكمام: أكمام واسعة منفوخة مع معاصم مطاطية ناعمة',
      'القصة: قصة الفراشة المريحة مع كسرات صدر رقيقة',
      'العناية: غسيل يدوي لطيف أو في الغسالة ببرنامج الملابس الحساسة 30 درجة'
    ],
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'abaya-jasmine',
    name: 'Abaya Élite en Crêpe de Médine',
    nameAr: 'عباية ياسمين الراقية بكريب المدينة',
    category: 'abayas',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800'
    ],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64'],
    description: 'La pièce maîtresse du dressing mastour : l\'Abaya Jasmine. Taillée dans le véritable Crêpe de Médine importé, elle offre une opacité à 100% tout en restant d\'une légèreté et d\'un confort absolu.',
    descriptionAr: 'القطعة الأساسية الفاخرة لكل خزانة ملابس ساترة: عباية ياسمين. مصنوعة من كريب المدينة الأصيل المستورد من تركيا، تمنحك ستراً وتغطية تامة بنسبة 100% مع خفة وراحة ووقار لا يضاهى.',
    details: [
      'Matière : 100% Crêpe de Médine haut de gamme',
      'Longueur : 145 cm',
      'Détails : Col rond discret avec fermeture éclair invisible pour allaitement',
      'Opacité : Maximale, ne nécessite pas de sous-robe',
      'Infroissable : Ne nécessite que très peu de repassage'
    ],
    detailsAr: [
      'الخامة: 100% كريب المدينة التركي الفاخر الممتاز',
      'الطول: 145 سم وثير',
      'التفاصيل: ياقة دائرية مبسطة مع سحاب خفي مريح للرضاعة',
      'الستر والشفافية: تغطية تامة وخامة ثقيلة لا تحتاج لبطانة سفلى',
      'مقاومة التجعد: خامة انسيابية ممتازة لا تحتاج للكي المفرط'
    ],
    rating: 4.8,
    reviewsCount: 64,
    isBestSeller: true
  },
  {
    id: 'ensemble-nour',
    name: 'Ensemble Casual Lin Nour',
    nameAr: 'طقم نور المريح من الكتان العضوي',
    category: 'ensembles',
    price: 95.00,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    secondaryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800'
    ],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Composé d\'une tunique longue asymétrique et d\'un pantalon large assorti (Palazzo), cet ensemble en lin respirant garantit une silhouette fraîche, élégante et parfaitement couvrante durant les beaux jours.',
    descriptionAr: 'طقم متميز يتكون من تونيك طويل غير متماثل مع بنطلون واسع رائع (بالازو). صُنع من الكتان الطبيعي خفيف الوزن لضمان مظهر منعش وأنيق وساتر في الصيف والمناسبات.',
    details: [
      'Composition : Lin premium et viscose tissée rafraîchissante',
      'Tunique : Longueur 115 cm avant / 125 cm arrière (fentes latérales)',
      'Pantalon : Taille entièrement élastiquée ultra-confortable, coupe droite large',
      'Tailles : Modèle conçu spécialement pour les tailles 50 à 66 avec aisance',
      'Coloris : Disponible en beige lin naturel et rose poudré chaleureux'
    ],
    detailsAr: [
      'التركيبة: كتان طبيعي فاخر مع فيسكوز منسوج ناعم وبارد',
      'التونيك: طول 115 سم من الأمام و125 سم من الخلف مع فتحات جانبية غاية في الأناقة',
      'البنطلون: حزام خصر مرن بالكامل ومريح، وقصة بالازو مستقيمة وواسعة',
      'المقاسات: تصميم حصري متقن ليوفر حرية وراحة تامة للمقاسات من 50 إلى 66',
      'الألوان: متوفر باللون البيج الرملي والوردي البودري الدافئ'
    ],
    rating: 4.7,
    reviewsCount: 22,
    isPromo: true
  },
  {
    id: 'tunique-kenza',
    name: 'Tunique Évasée Kenza en Soie thermique',
    nameAr: 'تونيك كنزة الفضفاض بالحرير الناعم',
    category: 'tuniques',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800',
    secondaryImages: [],
    sizes: ['52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Une coupe évasée cache-misère magistrale pour cette tunique au fini texturé soyeux. Elle s\'associe à merveille avec l\'un de nos hijabs en soie de Médine pour un look chic au quotidien.',
    descriptionAr: 'تونيك رائع بقصة واسعة على شكل حرف A لإخفاء معالم القوام بكل لباقة وجاذبية متميزة من قماش حريري فاخر. يتناسب بكل مثالية مع حجاب كريب المدينة لإطلالة يومية راقية وسهلة.',
    details: [
      'Matière : Soie synthétique tressée thermorégulatrice',
      'Coupe : Trapèze ultra-ample qui s\'élargit élégamment vers le bas',
      'Longueur : 98 cm',
      'Col : Col mao raffiné avec bouton d\'or amovible'
    ],
    detailsAr: [
      'الخامة: حرير صناعي منسوج ومقاوم للحرارة لملمس دائم الانتعاش',
      'القصة: كلوش فضفاض غاية في الأناقة يتسع بلطف نحو الأسفل',
      'الطول: 98 سم ساتر',
      'الياقة: ياقة ماو الصينية الراقية مع زر ذهبي رقيق كلاسيكي'
    ],
    rating: 4.6,
    reviewsCount: 19,
    isNew: true
  },
  {
    id: 'robe-ines',
    name: 'Robe Plissée Soleil Inès',
    nameAr: 'فستان إيناس المكسر ثنيات كلوش',
    category: 'robes',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800',
    secondaryImages: [],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64'],
    description: 'Le charme intemporel du plissé soleil sur une robe d\'une envergure spectaculaire. Ce modèle cache magnifiquement les formes tout en structurant une démarche gracieuse et majestueuse.',
    descriptionAr: 'سحر الكسرات المتتالية الأخاذ على فستان ذو هيبة ووقار استثنائي. هذا الموديل ينسدل ليواري تفاصيل القوام ويهبك مشية رشيقة تفيض بالثقة والأنوثة الطبيعية.',
    details: [
      'Matière : Crêpe de georgette plissé très haute qualité',
      'Doublure : Doubler entièrement en coton doux respirant',
      'Taille : Ceinture amovible ton sur ton incluse',
      'Amplitude : Plus de 4 mètres de circonférence plissée au bas de l\'ourlet'
    ],
    detailsAr: [
      'الخامة: جورجيت صيفي مكسر ذو جودة عالية وفخامة ملموسة',
      'البطانة: مبطن بالكامل بقطن ناعم لطيف بارد على البشرة',
      'الخصر: حزام قماشي ناعم قابل للإزالة بلون فستانكِ المفضل',
      'الوسع: محيط حافة سفلية واسع يتجاوز 4 أمتار من الكسرات المنسدلة'
    ],
    rating: 5.0,
    reviewsCount: 15,
    isBestSeller: true
  },
  {
    id: 'abaya-kimono-layla',
    name: 'Set Abaya Combo Kimono Layla (3 pièces)',
    nameAr: 'طقم عباية وكيمونو ليلى الفاخر (3 قطع)',
    category: 'abayas',
    price: 125.00,
    originalPrice: 145.00,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800',
    secondaryImages: [],
    sizes: ['52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Un ensemble somptueux composé de trois pièces coordonnées : un kimono long de style dubaï, une robe sans manches à col montant, et une ceinture assortie. Le raffinement absolu pour vos réceptions.',
    descriptionAr: 'طقم استثنائي فخم يتكون من ثلاث قطع متناسقة: كيمونو طويل مستوحى من طراز دبي الراقي، فستان داخلي بدون أكمام بياقة مرتفعة دائرية، وحزام خصر متطابق. قمة الفخامة لاستقبالاتك ومناسباتك الخاصة.',
    details: [
      'Kimono : Manches évasées XXL brodées de fils de soie roses',
      'Sous-Robe : Col montant fluide, sans manches pour le confort sous le kimono',
      'Matière : Lin de coton et soie mélangés',
      'Longueur globale : 147 cm'
    ],
    detailsAr: [
      'الكيمونو: أكمام واسعة جداً مطرزة بخيوط حريرية وردية رقيقة',
      'الفستان الداخلي: ياقة مرتفعة انسيابية، بدون أكمام لراحة كاملة تحت الكيمونو',
      'الخامة: مزيج ممتاز فاخر من الكتان القطني الخفيف مع الحرير اللامع',
      'الطول الكلي: 147 سم لمظهر ملكي فخم'
    ],
    rating: 4.9,
    reviewsCount: 31,
    isPromo: true
  },
  {
    id: 'ensemble-sofia',
    name: 'Ensemble Plissé Velours Sofia',
    nameAr: 'طقم صوفيا المخملي المكسر ثنيات',
    category: 'ensembles',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800',
    secondaryImages: [],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64'],
    description: 'Composé d\'un pull long plissé texturé et d\'un pantalon ultra extensible, l\'ensemble Sofia se démarque par son relief somptueux et son tombé qui allonge la silhouette de manière spectaculaire.',
    descriptionAr: 'طقم متميز يتألف من كنزة مخملية مكسرة طويلة وبنطلون مرن وواسع للغاية. يتميز طقم صوفيا بلمعانه الفاخر وطلته الساحرة التي تزيد القوام طولاً ووقاراً لا يضاهى.',
    details: [
      'Matière : Velours plissé de soie extensible haut de gamme',
      'Haut : Coupe tunique avec manches amples resserrées aux poignets (85cm)',
      'Pantalon : Coupe Palazzo fluide d\'un infini confort thermique',
      'Aisance : Elasticité de +20cm garantie pour le respect des courbes généreuses'
    ],
    detailsAr: [
      'الخامة: مخمل حريري ناعم ومكسر ذو مرونة عالية وخامة دافئة مريحة',
      'الكنزة: قصة تونيك مريحة بأكمام واسعة تضيق بلطف عند المعصمين (طول 85 سم)',
      'البنطلون: قصة بالازو واسعة انسيابية تضمن لكِ دفئاً وراحة مطلقة طوال اليوم',
      'المرونة والتمدد: تمدد مضمون بأكثر من 20 سم لراحة وانسيابية تامة للقوام ذو المنحنيات الجميلة'
    ],
    rating: 4.8,
    reviewsCount: 27,
    isNew: true
  },
  {
    id: 'hijab-medine-rose',
    name: 'Hijab Luxe Crêpe de Médine - Rose Poudré',
    nameAr: 'شال حجاب ميدي روز الحريري - وردي بودرة',
    category: 'hijabs',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800',
    secondaryImages: [],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Le compagnon parfait de nos robes et ensembles. En authentique Crêpe de Médine, il se drape facilement, tient en place toute la journée sans épingles constantes et présente un aspect soyeux et mat.',
    descriptionAr: 'الرفيق واللمسة النهائية المتميزة لعباياتنا وفساتيننا اليومية والمناسبات. مصنوع من كريب المدينة التركي الأصيل، ينثني ويتشكل بكل سهولة طوال اليوم دون الحاجة لدبابيس مفرطة بقوام حريري ناعم مطفأ.',
    details: [
      'Dimensions : 195 cm x 75 cm',
      'Matière : 100% Crêpe de Médine de Turquie',
      'Anti-glisse : Adhérence naturelle douce',
      'Finition : Ourlet plat couture invisible d\'une finesse extrême'
    ],
    detailsAr: [
      'المقاس: 195 سم × 75 سم لتغطية مثالية تامة',
      'الخامة: 100% كريب المدينة التركي الفاخر المستورد',
      'الثبات: تصميم يمنع الانزلاق بنعومة تامة على الرأس',
      'الخياطة: حافة مخيطة ناعمة بخياطة خفية غاية في الرقة'
    ],
    rating: 4.9,
    reviewsCount: 89,
    isBestSeller: true
  },
  {
    id: 'hijab-plisse-creme',
    name: 'Hijab Premium Plissé Soleil - Crème Vanille',
    nameAr: 'شال حجاب مكسر نخب أول - بيج فانيليا',
    category: 'hijabs',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?q=80&w=800',
    secondaryImages: [],
    sizes: ['50', '52', '54', '56', '58', '60', '62', '64', '66'],
    description: 'Ajoutez une touche texturée et poétique à votre tenue de fête. Ce hijab plissé reflète doucement la lumière chaude et apporte un volume élégant au port de tête.',
    descriptionAr: 'أضيفي لمسة فنية دافئة وشاعرية إلى فستان حفلِك المفضل. هذا الحجاب المكسر ذو الثنيات اللطيفة يعكس الإضاءة الدافئة ويهبك وقاراً لافتاً وجمالاً فخماً.',
    details: [
      'Dimensions : 185 cm x 70 cm',
      'Matière : Mousseline plissée satinée',
      'Effet : Gauffrage plissé régulier qui ne s\'estompe pas au lavage'
    ],
    detailsAr: [
      'المقاس: 185 سم × 70 سم مريح للتشكيل واللف',
      'الخامة: شيفون منسوج مكسر ولامع بقوام أنثوي متميز',
      'الكسرات: ثنيات حرارية دائمة لا تزول أو تبهت مطلقاً مع الغسيل المتكرر'
    ],
    rating: 4.8,
    reviewsCount: 42,
    isNew: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Fariha K.',
    rating: 5,
    comment: 'Trouver de magnifiques vêtements quand on fait un 52 et qu\'on souhaite s\'habiller de façon mastour et élégante était un calvaire... Un immense MERCI à DEROUAZ FEMININ ! La robe Soumaya tombe à la perfection, elle est ultra fluide et de très grande qualité !',
    commentAr: 'كان إيجاد ملابس فاخرة أنيقة بمقاس 52 ساترة وممتازة كابوساً يومياً بالنسبة لي... لدرجة الاستسلام! شكراً جزيلاً لدار درواز النسائية! فستان سومايا ينسدل عليَّ بكل روعة ومثالية تامة، خامة راقية جداً للغاية وجذابة!',
    date: '10 mai 2026',
    dateAr: '10 مايو 2026',
    sizeBought: '52',
    verified: true
  },
  {
    id: 't2',
    name: 'Samira B.',
    rating: 5,
    comment: 'J\'ai acheté l\'ensemble Nour en lin de taille 54. C\'est d\'un confort absolu ! Le pantalon ne serre pas le ventre et le haut cache magnifiquement les hanches. On sent que le vêtement a été pensé par des femmes qui comprennent nos besoins.',
    commentAr: 'اشتريت طقم نور من الكتان بمقاس 54. راحة مطلقة ووفيرة! البنطلون واسع ومريح لا يضغط على البطن، والتونيك الطويل يستر الأرداف بشكل منسدل غاية في الرقي. تشعرين أن الثوب صُمم بأيدي خبيرات يفهمن طبيعة جسم المرأة الممتلئ تماماً.',
    date: '28 mai 2026',
    dateAr: '28 مايو 2026',
    sizeBought: '54',
    verified: true
  },
  {
    id: 't3',
    name: 'Assia M.',
    rating: 5,
    comment: 'Le service client est exceptionnel et le Crêpe de Médine de l\'Abaya est incomparable. J\'avais peur que la longueur de 145cm soit trop courte pour mon 1m73 mais c\'est parfait. Livraison très rapide en 48h !',
    commentAr: 'خدمة العملاء غاية في السمو والمسؤولية، وخامة كريب المدينة في عباية ياسمين لا يعلى عليها تضاهي أفخم الماركات. كنت متخوفة قليلاً من أن طول 145 سم قد يبدو صغيراً على طولي البالغ 1.73 متر ولكن انسدالها كان كاملاً ومثالياً. الشحن كان فائق السرعة وصلني في 48 ساعة!',
    date: '4 juin 2026',
    dateAr: '4 يونيو 2026',
    sizeBought: '50',
    verified: true
  }
];
