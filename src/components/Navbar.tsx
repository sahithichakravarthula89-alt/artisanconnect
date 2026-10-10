import React from 'react';
import { ArtisanLanguage, UserRole } from '../types';
import { getArtisanText, SUPPORTED_LANGUAGES } from '../i18n/artisanTranslations';
import { Sparkles, ShoppingBag, Store, RotateCcw, HelpCircle, Search, Inbox, Users, PlusCircle, Globe } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenGuide: () => void;
  onResetData: () => void;
  artisanLanguage?: ArtisanLanguage;
  onChangeArtisanLanguage?: (lang: ArtisanLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  activeTab,
  onSelectTab,
  onOpenGuide,
  onResetData,
  artisanLanguage = 'hi',
  onChangeArtisanLanguage
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectRole('welcome')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C2593F] to-[#96371D] text-white flex items-center justify-center shadow-sm">
              <span className="font-serif text-xl font-bold">अ</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C241E]">
                Artisan Connect
              </span>
            </div>
          </div>

          {/* Navigation Items based on Role */}
          {currentRole !== 'welcome' && (
            <nav className="hidden md:flex items-center gap-1 bg-[#F2ECE1] p-1 rounded-xl border border-[#E4D7C2]">
              {currentRole === 'buyer' ? (
                <>
                  <button
                    onClick={() => onSelectTab('browse')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'browse'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    Browse Products
                  </button>
                  <button
                    onClick={() => onSelectTab('smart-match')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'smart-match'
                        ? 'bg-[#1E3F20] text-white shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                    Smart Matching
                  </button>
                  <button
                    onClick={() => onSelectTab('artisans')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'artisans'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    Artisan Profile
                  </button>
                  <button
                    onClick={() => onSelectTab('enquiries')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'enquiries'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    My Enquiries
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onSelectTab('catalogue')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'catalogue'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    {getArtisanText(artisanLanguage, 'myProducts')}
                  </button>
                  <button
                    onClick={() => onSelectTab('add-product')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'add-product'
                        ? 'bg-[#96371D] text-white shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    {getArtisanText(artisanLanguage, 'addProduct')}
                  </button>
                  <button
                    onClick={() => onSelectTab('enquiries')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'enquiries'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    {getArtisanText(artisanLanguage, 'buyerEnquiries')}
                  </button>
                  <button
                    onClick={() => onSelectTab('profile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'profile'
                        ? 'bg-white text-[#96371D] shadow-sm'
                        : 'text-[#625345] hover:text-[#2C241E]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    {getArtisanText(artisanLanguage, 'profile')}
                  </button>
                </>
              )}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Language dropdown for Artisan view */}
            {currentRole === 'artisan' && onChangeArtisanLanguage && (
              <div className="flex items-center gap-1 bg-[#FAF1E3] border border-[#DECFB5] rounded-xl px-2 py-1 text-xs">
                <Globe className="w-3.5 h-3.5 text-[#8C3A20]" />
                <select
                  value={artisanLanguage}
                  onChange={(e) => onChangeArtisanLanguage(e.target.value as ArtisanLanguage)}
                  className="bg-transparent text-[#2C241E] font-semibold text-xs focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quick Role Switcher */}
            <div className="flex items-center bg-[#EDE4D4] p-1 rounded-xl border border-[#DFD1BE]">
              <button
                onClick={() => onSelectRole('artisan')}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === 'artisan'
                    ? 'bg-[#96371D] text-white shadow-sm font-semibold'
                    : 'text-[#685848] hover:text-[#2C241E]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Artisan</span>
              </button>
              <button
                onClick={() => onSelectRole('buyer')}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === 'buyer'
                    ? 'bg-[#1E3F20] text-white shadow-sm font-semibold'
                    : 'text-[#685848] hover:text-[#2C241E]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buyer</span>
              </button>
            </div>

            {/* Benchmark Guide */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#6E4F32] bg-[#FAF1E3] hover:bg-[#F3E5D1] border border-[#E5D5BF] rounded-lg transition-colors"
              title="Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C2593F]" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Reset Data */}
            <button
              onClick={onResetData}
              className="p-1.5 text-[#7A6B5D] hover:text-[#96371D] hover:bg-[#F0E6D8] rounded-lg transition-colors"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        {currentRole !== 'welcome' && (
          <div className="md:hidden flex items-center justify-around py-2 border-t border-[#E8DEC8] text-xs">
            {currentRole === 'buyer' ? (
              <>
                <button
                  onClick={() => onSelectTab('browse')}
                  className={`px-2 py-1 font-medium ${activeTab === 'browse' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  Browse
                </button>
                <button
                  onClick={() => onSelectTab('smart-match')}
                  className={`px-2 py-1 font-medium flex items-center gap-1 ${activeTab === 'smart-match' ? 'text-[#1E3F20] font-bold border-b-2 border-[#1E3F20]' : 'text-[#7A6B5D]'}`}
                >
                  <Sparkles className="w-3 h-3 text-[#C2593F]" />
                  Smart Match
                </button>
                <button
                  onClick={() => onSelectTab('artisans')}
                  className={`px-2 py-1 font-medium ${activeTab === 'artisans' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  Artisan Profile
                </button>
                <button
                  onClick={() => onSelectTab('enquiries')}
                  className={`px-2 py-1 font-medium ${activeTab === 'enquiries' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  Orders
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectTab('catalogue')}
                  className={`px-2 py-1 font-medium ${activeTab === 'catalogue' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  {getArtisanText(artisanLanguage, 'myProducts')}
                </button>
                <button
                  onClick={() => onSelectTab('add-product')}
                  className={`px-2 py-1 font-medium ${activeTab === 'add-product' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  + {getArtisanText(artisanLanguage, 'addProduct')}
                </button>
                <button
                  onClick={() => onSelectTab('enquiries')}
                  className={`px-2 py-1 font-medium ${activeTab === 'enquiries' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  {getArtisanText(artisanLanguage, 'buyerEnquiries')}
                </button>
                <button
                  onClick={() => onSelectTab('profile')}
                  className={`px-2 py-1 font-medium ${activeTab === 'profile' ? 'text-[#96371D] font-bold border-b-2 border-[#96371D]' : 'text-[#7A6B5D]'}`}
                >
                  {getArtisanText(artisanLanguage, 'profile')}
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
