import { Artisan, Enquiry, Product } from '../types';
import { INITIAL_ARTISANS, INITIAL_ENQUIRIES, INITIAL_PRODUCTS } from '../data/sampleData';

const STORAGE_KEYS = {
  ARTISANS: 'artisan_connect_artisans_v1',
  PRODUCTS: 'artisan_connect_products_v1',
  ENQUIRIES: 'artisan_connect_enquiries_v1',
  ACTIVE_ARTISAN_ID: 'artisan_connect_active_artisan_id_v1'
};

export const storageService = {
  getArtisans(): Artisan[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARTISANS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading artisans from storage', e);
    }
    this.saveArtisans(INITIAL_ARTISANS);
    return INITIAL_ARTISANS;
  },

  saveArtisans(artisans: Artisan[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(artisans));
    } catch (e) {
      console.error('Error saving artisans to storage', e);
    }
  },

  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading products from storage', e);
    }
    this.saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  },

  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to storage', e);
    }
  },

  getEnquiries(): Enquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading enquiries from storage', e);
    }
    this.saveEnquiries(INITIAL_ENQUIRIES);
    return INITIAL_ENQUIRIES;
  },

  saveEnquiries(enquiries: Enquiry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Error saving enquiries to storage', e);
    }
  },

  getActiveArtisanId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID) || 'artisan-a';
  },

  setActiveArtisanId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID, id);
  },

  resetToDemoBenchmark(): void {
    localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(INITIAL_ARTISANS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID, 'artisan-a');
  }
};
