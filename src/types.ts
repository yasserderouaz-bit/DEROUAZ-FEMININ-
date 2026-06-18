/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 'robes' | 'ensembles' | 'abayas' | 'tuniques' | 'hijabs';

export type ProductSize = '44' | '46' | '48' | '50' | '52' | '54' | '56';

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImages: string[];
  sizes: ProductSize[];
  description: string;
  descriptionAr?: string;
  details: string[]; // e.g., "Matière : Crêpe de Médine premium", "Longueur : 145cm", "Ample et fluide"
  detailsAr?: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

export type ActiveTab = 'accueil' | 'produits' | 'quisommesnous' | 'contact';

export interface FilterState {
  category: ProductCategory | 'all';
  size: ProductSize | 'all';
  searchQuery: string;
  priceRange: number;
  sortBy: 'price-asc' | 'price-desc' | 'popular' | 'newest';
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr?: string;
  rating: number;
  comment: string;
  commentAr?: string;
  date: string;
  dateAr?: string;
  sizeBought: ProductSize;
  verified: boolean;
}
