import React, { useState, useEffect } from 'react';
import { Artisan, ArtisanLanguage, Enquiry, EnquiryStatus, Product, UserRole } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { WelcomeHero } from './components/WelcomeHero';
import { BrowseProducts } from './components/BrowseProducts';
import { SmartMatchView } from './components/SmartMatchView';
import { ArtisanDirectory } from './components/ArtisanDirectory';
import { BuyerEnquiries } from './components/BuyerEnquiries';
import { ArtisanCatalogue } from './components/ArtisanCatalogue';
import { AddProductAiView } from './components/AddProductAiView';
import { ArtisanEnquiries } from './components/ArtisanEnquiries';
import { ArtisanProfileView } from './components/ArtisanProfileView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { EvaluationGuideModal } from './components/EvaluationGuideModal';
import { ArtisanLoginModal } from './components/ArtisanLoginModal';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('welcome');
  const [buyerTab, setBuyerTab] = useState<'browse' | 'smart-match' | 'artisans' | 'enquiries'>('smart-match');
  const [artisanTab, setArtisanTab] = useState<'catalogue' | 'add-product' | 'enquiries' | 'profile'>('catalogue');

  // Core Data States with LocalStorage Persistence
  const [artisans, setArtisans] = useState<Artisan[]>(() => storageService.getArtisans());
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => storageService.getEnquiries());
  const [activeArtisanId, setActiveArtisanId] = useState<string>(() => storageService.getActiveArtisanId());

  // Editing state for products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Modals
  const [isArtisanLoginOpen, setIsArtisanLoginOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<{ product: Product; artisan: Artisan } | null>(null);
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    product: Product | null;
    artisan: Artisan | null;
    quantity: number;
    requirements: string;
  }>({
    isOpen: false,
    product: null,
    artisan: null,
    quantity: 100,
    requirements: ''
  });
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Active Artisan Object
  const currentArtisan = artisans.find(a => a.id === activeArtisanId) || artisans[0];

  // Role selection helper: If choosing artisan, prompt login with mobile & OTP & details
  const handleSelectRole = (role: UserRole) => {
    if (role === 'artisan') {
      setIsArtisanLoginOpen(true);
    } else {
      setCurrentRole(role);
    }
  };

  const handleArtisanLoginSuccess = (loggedInArtisan: Artisan, selectedLang: ArtisanLanguage) => {
    setIsArtisanLoginOpen(false);

    // Save/update artisan
    const exists = artisans.some(a => a.id === loggedInArtisan.id);
    let updatedArtisans: Artisan[];
    if (exists) {
      updatedArtisans = artisans.map(a => a.id === loggedInArtisan.id ? loggedInArtisan : a);
    } else {
      updatedArtisans = [loggedInArtisan, ...artisans];
    }

    setArtisans(updatedArtisans);
    storageService.saveArtisans(updatedArtisans);
    setActiveArtisanId(loggedInArtisan.id);
    storageService.setActiveArtisanId(loggedInArtisan.id);

    setCurrentRole('artisan');
    setArtisanTab('catalogue');
  };

  const handleArtisanLogout = () => {
    setCurrentRole('welcome');
  };

  const handleChangeArtisanLanguage = (lang: ArtisanLanguage) => {
    const updated = {
      ...currentArtisan,
      languageCode: lang
    };
    handleUpdateProfile(updated);
  };

  // 1-Click Benchmark trigger
  const handleQuickRunBenchmark = () => {
    setCurrentRole('buyer');
    setBuyerTab('smart-match');
  };

  // Reset to initial hackathon sample data
  const handleResetData = () => {
    if (confirm("Reset application to initial demonstration dataset?")) {
      storageService.resetToDemoBenchmark();
      setArtisans(storageService.getArtisans());
      setProducts(storageService.getProducts());
      setEnquiries(storageService.getEnquiries());
      setActiveArtisanId('artisan-a');
      setEditingProduct(null);
      alert("Demo data successfully reset to benchmark defaults!");
    }
  };

  // Product CRUD
  const handleSaveProduct = (product: Product) => {
    const existingIndex = products.findIndex(p => p.id === product.id);
    let updatedProducts: Product[];

    if (existingIndex >= 0) {
      updatedProducts = [...products];
      updatedProducts[existingIndex] = product;
    } else {
      updatedProducts = [product, ...products];
    }

    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
    setEditingProduct(null);
    setArtisanTab('catalogue');
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    storageService.saveProducts(updated);
  };

  // Artisan Profile CRUD
  const handleUpdateProfile = (updated: Artisan) => {
    const updatedArtisans = artisans.map(a => a.id === updated.id ? updated : a);
    setArtisans(updatedArtisans);
    storageService.saveArtisans(updatedArtisans);
  };

  const handleSelectArtisanId = (id: string) => {
    setActiveArtisanId(id);
    storageService.setActiveArtisanId(id);
  };

  // Enquiry Submission (from Buyer)
  const handleSubmitEnquiry = (newEnquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>) => {
    const newEnquiry: Enquiry = {
      ...newEnquiryData,
      id: `enquiry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'New enquiry',
          timestamp: new Date().toISOString(),
          note: `Requested ${newEnquiryData.requestedQuantity} units.`
        }
      ]
    };

    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    storageService.saveEnquiries(updated);
  };

  // Enquiry Status Advancement (from Artisan)
  const handleUpdateEnquiryStatus = (
    enquiryId: string,
    newStatus: EnquiryStatus,
    note?: string,
    agreedPrice?: number
  ) => {
    const updated = enquiries.map(e => {
      if (e.id === enquiryId) {
        const newTimeline = [
          ...e.timeline,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: note || `Status updated to ${newStatus}`
          }
        ];

        return {
          ...e,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          artisanNotes: note || e.artisanNotes,
          agreedPricePerUnit: agreedPrice ?? e.agreedPricePerUnit,
          timeline: newTimeline
        };
      }
      return e;
    });

    setEnquiries(updated);
    storageService.saveEnquiries(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        activeTab={currentRole === 'buyer' ? buyerTab : artisanTab}
        onSelectTab={(tab) => {
          if (currentRole === 'buyer') {
            setBuyerTab(tab as any);
          } else {
            if (tab === 'add-product') {
              setEditingProduct(null);
            }
            setArtisanTab(tab as any);
          }
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
        onResetData={handleResetData}
        artisanLanguage={currentArtisan.languageCode || 'hi'}
        onChangeArtisanLanguage={handleChangeArtisanLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: Welcome Page */}
        {currentRole === 'welcome' && (
          <WelcomeHero
            onSelectRole={handleSelectRole}
            onOpenGuide={() => setIsGuideOpen(true)}
            onQuickRunBenchmark={handleQuickRunBenchmark}
          />
        )}

        {/* VIEW 2: Buyer Dashboard */}
        {currentRole === 'buyer' && (
          <div className="space-y-6">
            {buyerTab === 'browse' && (
              <BrowseProducts
                products={products}
                artisans={artisans}
                onSelectProduct={(p, a) => setDetailProduct({ product: p, artisan: a })}
                onEnquireProduct={(p, a) => setEnquiryModal({
                  isOpen: true,
                  product: p,
                  artisan: a,
                  quantity: 1,
                  requirements: ''
                })}
                onGoToSmartMatch={() => setBuyerTab('smart-match')}
              />
            )}

            {buyerTab === 'smart-match' && (
              <SmartMatchView
                products={products}
                artisans={artisans}
                onSelectProduct={(p, a) => setDetailProduct({ product: p, artisan: a })}
                onEnquireProduct={(p, a, qty, reqs) => setEnquiryModal({
                  isOpen: true,
                  product: p,
                  artisan: a,
                  quantity: qty,
                  requirements: reqs
                })}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {buyerTab === 'artisans' && (
              <ArtisanDirectory
                artisan={currentArtisan}
                products={products}
                onSelectProduct={(p, a) => setDetailProduct({ product: p, artisan: a })}
                onEnquireProduct={(p, a) => setEnquiryModal({
                  isOpen: true,
                  product: p,
                  artisan: a,
                  quantity: 1,
                  requirements: ''
                })}
              />
            )}

            {buyerTab === 'enquiries' && (
              <BuyerEnquiries
                enquiries={enquiries}
                artisans={artisans}
                products={products}
                onSwitchToArtisan={() => {
                  setIsArtisanLoginOpen(true);
                }}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}
          </div>
        )}

        {/* VIEW 3: Artisan Dashboard (rendered in preferred language) */}
        {currentRole === 'artisan' && (
          <div className="space-y-6">
            {artisanTab === 'catalogue' && (
              <ArtisanCatalogue
                artisan={currentArtisan}
                products={products}
                onAddNewProduct={() => {
                  setEditingProduct(null);
                  setArtisanTab('add-product');
                }}
                onEditProduct={(p) => {
                  setEditingProduct(p);
                  setArtisanTab('add-product');
                }}
                onDeleteProduct={handleDeleteProduct}
              />
            )}

            {artisanTab === 'add-product' && (
              <AddProductAiView
                artisan={currentArtisan}
                editingProduct={editingProduct}
                onSaveProduct={handleSaveProduct}
                onCancel={() => {
                  setEditingProduct(null);
                  setArtisanTab('catalogue');
                }}
              />
            )}

            {artisanTab === 'enquiries' && (
              <ArtisanEnquiries
                artisan={currentArtisan}
                enquiries={enquiries}
                onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
              />
            )}

            {artisanTab === 'profile' && (
              <ArtisanProfileView
                artisan={currentArtisan}
                onUpdateProfile={handleUpdateProfile}
                onLogout={handleArtisanLogout}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#FAF4EB] border-t border-[#E8DEC8] py-8 text-xs text-[#7A6B5D] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2C241E]">Artisan Connect</span>
            <span>·</span>
            <span>Indian Handicraft Matching Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="text-[#8C3A20] hover:underline font-semibold"
            >
              Evaluation Guide
            </button>
            <span>·</span>
            <button
              onClick={handleResetData}
              className="hover:underline"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>

      {/* Artisan Mobile + OTP + Language Login Modal */}
      <ArtisanLoginModal
        isOpen={isArtisanLoginOpen}
        onClose={() => setIsArtisanLoginOpen(false)}
        onLoginSuccess={handleArtisanLoginSuccess}
        existingArtisans={artisans}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        product={detailProduct?.product || null}
        artisan={detailProduct?.artisan || null}
        onOpenEnquiry={(p, a) => {
          setDetailProduct(null);
          setEnquiryModal({
            isOpen: true,
            product: p,
            artisan: a,
            quantity: 1,
            requirements: ''
          });
        }}
      />

      {/* Direct Enquiry Modal */}
      {enquiryModal.product && enquiryModal.artisan && (
        <EnquiryModal
          isOpen={enquiryModal.isOpen}
          onClose={() => setEnquiryModal(prev => ({ ...prev, isOpen: false }))}
          product={enquiryModal.product}
          artisan={enquiryModal.artisan}
          initialQuantity={enquiryModal.quantity}
          initialRequirements={enquiryModal.requirements}
          onSubmitEnquiry={handleSubmitEnquiry}
        />
      )}

      {/* Hackathon Evaluation Manual Modal */}
      <EvaluationGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onQuickRunBenchmark={handleQuickRunBenchmark}
      />

    </div>
  );
}
