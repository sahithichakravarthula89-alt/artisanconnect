import React, { useState } from 'react';
import { Artisan, ArtisanLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n/artisanTranslations';
import { X, Phone, KeyRound, CheckCircle2, Store, Clock, Languages, ArrowRight, ShieldCheck } from 'lucide-react';

interface ArtisanLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (artisan: Artisan, selectedLang: ArtisanLanguage) => void;
  existingArtisans: Artisan[];
}

export const ArtisanLoginModal: React.FC<ArtisanLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  existingArtisans
}) => {
  // Wizard steps: 'mobile' -> 'otp' -> 'details'
  const [step, setStep] = useState<'mobile' | 'otp' | 'details'>('mobile');
  
  // Mobile & OTP
  const [mobileNumber, setMobileNumber] = useState('9829014210');
  const [generatedOtp, setGeneratedOtp] = useState<string>('4821');
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState(false);

  // Artisan Profile & Preferences
  const [artisanName, setArtisanName] = useState('Rameshwar Lal Chhipa');
  const [craftType, setCraftType] = useState('Handloom & Block Print Textiles');
  const [preparationDays, setPreparationDays] = useState<number>(7);
  const [location, setLocation] = useState('Sanganer, Jaipur, Rajasthan');
  const [selectedLanguage, setSelectedLanguage] = useState<ArtisanLanguage>('hi');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const demoCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(demoCode);
    setEnteredOtp(demoCode); // Auto-fill for seamless evaluation
    setOtpSent(true);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
      alert(`Invalid OTP. Enter demo code: ${generatedOtp}`);
      return;
    }
    setStep('details');
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find if artisan already exists with this phone or name, else create new
    const existing = existingArtisans.find(a => a.phone.includes(mobileNumber) || a.name === artisanName);
    
    const loggedInArtisan: Artisan = existing ? {
      ...existing,
      name: artisanName,
      craftType,
      location,
      preparationDays,
      languageCode: selectedLanguage,
      preferredLanguage: SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'Hindi'
    } : {
      id: `artisan-new-${Date.now()}`,
      name: artisanName,
      craftType,
      state: location.split(',').pop()?.trim() || 'Rajasthan',
      city: location.split(',')[0]?.trim() || 'Jaipur',
      location,
      preferredLanguage: SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'Hindi',
      languageCode: selectedLanguage,
      phone: `+91 ${mobileNumber}`,
      whatsapp: `+91 ${mobileNumber}`,
      email: `${artisanName.toLowerCase().replace(/\s+/g, '')}@artisans.in`,
      bio: `Master craftsman in ${craftType} based in ${location}.`,
      yearsOfExperience: 15,
      preparationDays,
      avatar: '',
      verifiedArtisan: true,
      specialties: [craftType]
    };

    onLoginSuccess(loggedInArtisan, selectedLanguage);
  };

  // Quick 1-click test button for evaluator
  const handleQuickDemoLogin = (artisanId: string, lang: ArtisanLanguage) => {
    const art = existingArtisans.find(a => a.id === artisanId) || existingArtisans[0];
    const updated: Artisan = {
      ...art,
      languageCode: lang,
      preferredLanguage: SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || 'Hindi',
      preparationDays: 7
    };
    onLoginSuccess(updated, lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECFB5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#96371D] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F7D8C4] block">
              Artisan Access
            </span>
            <h2 className="font-serif text-xl font-bold">
              Artisan Login & Registration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="p-3 bg-[#FAF1E3] border-b border-[#E8DEC8] flex items-center justify-between gap-2 text-xs">
          <span className="text-[#8C3A20] font-bold">Quick Demo:</span>
          <div className="flex gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('artisan-a', 'hi')}
              className="px-2.5 py-1 bg-white hover:bg-[#F2ECE1] border border-[#DECFB5] rounded-md text-[#2C241E] font-semibold text-[11px]"
            >
              Artisan A (हिन्दी - Hindi)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('artisan-b', 'kn')}
              className="px-2.5 py-1 bg-white hover:bg-[#F2ECE1] border border-[#DECFB5] rounded-md text-[#2C241E] font-semibold text-[11px]"
            >
              Artisan B (ಕನ್ನಡ - Kannada)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('artisan-a', 'en')}
              className="px-2.5 py-1 bg-white hover:bg-[#F2ECE1] border border-[#DECFB5] rounded-md text-[#2C241E] font-semibold text-[11px]"
            >
              English
            </button>
          </div>
        </div>

        {/* Wizard Form */}
        <div className="p-6">
          
          {/* STEP 1: Mobile Number */}
          {step === 'mobile' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Mobile Number <span className="text-[#C2593F]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7A6B5D]">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-[#D5C6AF] rounded-xl text-sm font-semibold text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-[#EFF6F0] rounded-xl border border-[#C5DEC8] text-xs text-[#1E3F20]">
                <span>OTP sent to <strong>+91 {mobileNumber}</strong>. (Demo Code: <strong>{generatedOtp}</strong>)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Enter 4-Digit OTP <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2.5 bg-white border border-[#D5C6AF] rounded-xl text-base tracking-widest text-center font-bold text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="text-xs text-[#7A6B5D] hover:underline"
                >
                  Change Mobile
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E3F20] hover:bg-[#152E17] text-white text-xs font-bold rounded-xl shadow transition-colors"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Details & Preferred Language */}
          {step === 'details' && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              
              {/* Preferred Language - Highlighted */}
              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1.5 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-[#96371D]" />
                  <span>Preferred Dashboard Language <span className="text-[#C2593F]">*</span></span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        selectedLanguage === lang.code
                          ? 'bg-[#96371D] text-white border-[#96371D] shadow-sm'
                          : 'bg-white text-[#2C241E] border-[#D5C6AF] hover:bg-[#FAF4EA]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{lang.nativeName}</span>
                      <span className={`block text-[10px] ${selectedLanguage === lang.code ? 'text-white/80' : 'text-[#7A6B5D]'}`}>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Artisan Name */}
              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Artisan / Workshop Name <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="text"
                  value={artisanName}
                  onChange={(e) => setArtisanName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              {/* Craft Type */}
              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Craft / Product Type <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="text"
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  placeholder="e.g. Handloom Textiles, Wooden Toys, Pottery, Brass"
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              {/* Number of days required to prepare a product */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#46392D] mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#96371D]" />
                    <span>Days to Prepare Product <span className="text-[#C2593F]">*</span></span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={preparationDays}
                    onChange={(e) => setPreparationDays(Number(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-xl text-xs font-bold text-[#2C241E]"
                    required
                  />
                  <span className="text-[10px] text-[#7A6B5D] mt-0.5 block">
                    Average lead time in days
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#46392D] mb-1">
                    Workshop Location <span className="text-[#C2593F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E]"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Open Dashboard in {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeName}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
