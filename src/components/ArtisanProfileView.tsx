import React, { useState, useEffect } from 'react';
import { Artisan, ArtisanLanguage } from '../types';
import { getArtisanText, SUPPORTED_LANGUAGES } from '../i18n/artisanTranslations';
import { CheckCircle2, Clock, Languages, ShieldCheck, Phone, Mail, MessageCircle, MapPin, LogOut } from 'lucide-react';

interface ArtisanProfileViewProps {
  artisan: Artisan;
  onUpdateProfile: (updated: Artisan) => void;
  onLogout: () => void;
}

export const ArtisanProfileView: React.FC<ArtisanProfileViewProps> = ({
  artisan,
  onUpdateProfile,
  onLogout
}) => {
  const lang = artisan.languageCode;

  const [name, setName] = useState(artisan.name);
  const [craftType, setCraftType] = useState(artisan.craftType);
  const [location, setLocation] = useState(artisan.location);
  const [selectedLanguage, setSelectedLanguage] = useState<ArtisanLanguage>(artisan.languageCode || 'hi');
  const [phone, setPhone] = useState(artisan.phone);
  const [whatsapp, setWhatsapp] = useState(artisan.whatsapp);
  const [email, setEmail] = useState(artisan.email);
  const [bio, setBio] = useState(artisan.bio);
  const [yearsOfExperience, setYearsOfExperience] = useState(artisan.yearsOfExperience);
  const [preparationDays, setPreparationDays] = useState<number>(artisan.preparationDays || 7);
  const [specialties, setSpecialties] = useState(artisan.specialties.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setName(artisan.name);
    setCraftType(artisan.craftType);
    setLocation(artisan.location);
    setSelectedLanguage(artisan.languageCode || 'hi');
    setPhone(artisan.phone);
    setWhatsapp(artisan.whatsapp);
    setEmail(artisan.email);
    setBio(artisan.bio);
    setYearsOfExperience(artisan.yearsOfExperience);
    setPreparationDays(artisan.preparationDays || 7);
    setSpecialties(artisan.specialties.join(', '));
    setSavedSuccess(false);
  }, [artisan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage);
    const updated: Artisan = {
      ...artisan,
      name,
      craftType,
      location,
      languageCode: selectedLanguage,
      preferredLanguage: langObj ? langObj.name : 'Hindi',
      phone,
      whatsapp,
      email,
      bio,
      yearsOfExperience: Number(yearsOfExperience),
      preparationDays: Number(preparationDays),
      specialties: specialties.split(',').map(s => s.trim()).filter(Boolean)
    };
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Main Profile Form for ONLY the logged in artisan */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E3D4BC] p-6 shadow-sm space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE5D7] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                {name}
              </h3>
              <ShieldCheck className="w-4 h-4 text-[#1E3F20]" />
            </div>
            <p className="text-xs text-[#7A6B5D] mt-0.5">
              {craftType} · {location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                {getArtisanText(lang, 'preparationDays')}
              </span>
              <span className="text-xs font-bold text-[#8C3A20] flex items-center gap-1 justify-end">
                <Clock className="w-3.5 h-3.5" />
                {preparationDays} days
              </span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#C0392B] hover:text-white hover:bg-[#C0392B] border border-[#F5B7B1] rounded-xl transition-all cursor-pointer shadow-sm ml-2"
              title="Logout artisan session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{getArtisanText(lang, 'logout')}</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-[#EFF6F0] rounded-xl border border-[#C5DEC8] text-xs text-[#1E3F20] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1E3F20]" />
            <span>Profile saved successfully.</span>
          </div>
        )}

        {/* Preferred Language Selection */}
        <div>
          <label className="block text-xs font-bold text-[#46392D] mb-1.5 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-[#96371D]" />
            <span>{getArtisanText(lang, 'preferredLanguage')} <span className="text-[#C2593F]">*</span></span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPPORTED_LANGUAGES.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelectedLanguage(l.code)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedLanguage === l.code
                    ? 'bg-[#96371D] text-white border-[#96371D] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#2C241E] border-[#D5C6AF] hover:bg-white'
                }`}
              >
                <span className="block text-xs font-bold">{l.nativeName}</span>
                <span className={`block text-[10px] ${selectedLanguage === l.code ? 'text-white/80' : 'text-[#7A6B5D]'}`}>
                  {l.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'fullName')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'craftType')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={craftType}
              onChange={(e) => setCraftType(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'location')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#96371D]" />
              <span>{getArtisanText(lang, 'preparationDays')} <span className="text-[#C2593F]">*</span></span>
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={preparationDays}
              onChange={(e) => setPreparationDays(Number(e.target.value) || 1)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs font-bold text-[#2C241E] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EFE5D7]">
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'phone')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'whatsapp')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'email')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Bio & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'bio')} <span className="text-[#C2593F]">*</span>
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'experience')}
            </label>
            <input
              type="number"
              min="1"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs font-bold text-[#2C241E]"
            />
          </div>
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-xs font-bold text-[#46392D] mb-1">
            {getArtisanText(lang, 'specialties')}
          </label>
          <input
            type="text"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            placeholder="e.g. Handmade cotton bags, Dabu Print"
            className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none"
          />
        </div>

        {/* Form Actions */}
        <div className="pt-3 border-t border-[#EFE5D7] flex items-center justify-between">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#C0392B] hover:text-white hover:bg-[#C0392B] border border-[#F5B7B1] rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{getArtisanText(lang, 'logout')}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{getArtisanText(lang, 'saveProfile')}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
