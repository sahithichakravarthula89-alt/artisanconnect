import React, { useState, useEffect, useRef } from 'react';
import { Artisan, Product } from '../types';
import { generateAiCatalogueSuggestion, DEMO_VOICE_PROMPTS } from '../services/aiCatalogueService';
import { getArtisanText } from '../i18n/artisanTranslations';
import { Sparkles, Mic, MicOff, Upload, Image as ImageIcon, CheckCircle2, AlertCircle, Info, RefreshCw, X, ArrowLeft } from 'lucide-react';

interface AddProductAiViewProps {
  artisan: Artisan;
  editingProduct?: Product | null;
  onSaveProduct: (product: Product) => void;
  onCancel: () => void;
}

const PRESET_PHOTOS = [
  { label: 'Cotton Tote Bag', url: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cotton Pouch', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
  { label: 'Channapatna Wooden Toys', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Terracotta Water Jug', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Dhokra Brass Art', url: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80' },
  { label: 'Blue Pottery Vase', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
  { label: 'Banarasi Brocade Silk', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bamboo Basket', url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80' }
];

export const AddProductAiView: React.FC<AddProductAiViewProps> = ({
  artisan,
  editingProduct,
  onSaveProduct,
  onCancel
}) => {
  // Form fields
  const [name, setName] = useState(editingProduct?.name || '');
  const [category, setCategory] = useState(editingProduct?.category || 'Bags & Accessories');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [price, setPrice] = useState<number>(editingProduct?.price || 250);
  const [availableQuantity, setAvailableQuantity] = useState<number>(editingProduct?.availableQuantity || 100);
  const [bulkOrderAvailable, setBulkOrderAvailable] = useState<boolean>(editingProduct ? editingProduct.bulkOrderAvailable : true);
  const [bulkMinQuantity, setBulkMinQuantity] = useState<number>(editingProduct?.bulkMinQuantity || 25);
  const [bulkLeadTimeDays, setBulkLeadTimeDays] = useState<number>(editingProduct?.bulkLeadTimeDays || 10);
  const [imageUrl, setImageUrl] = useState<string>(editingProduct?.images[0] || PRESET_PHOTOS[0].url);
  const [materials, setMaterials] = useState<string>(editingProduct ? editingProduct.materials.join(', ') : 'Organic Cotton, Natural Indigo Dyes');
  const [dimensions, setDimensions] = useState<string>(editingProduct?.dimensions || '38 cm x 42 cm');

  // AI & Voice Assistant states
  const [roughNotes, setRoughNotes] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedNotice, setAiGeneratedNotice] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Speech Recognition Hook
  const recognitionRef = useRef<any>(null);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser Web Speech API not available on this device. Please use the demo voice trigger buttons below.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListeningVoice(true);
      };

      recognition.onresult = (event: any) => {
        const speech = event.results[0][0].transcript;
        setVoiceTranscript(speech);
        setRoughNotes(prev => prev ? `${prev} ${speech}` : speech);
        setIsListeningVoice(false);
      };

      recognition.onerror = () => {
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Speech recognition error", e);
      setIsListeningVoice(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListeningVoice(false);
    }
  };

  const handleApplyVoicePrompt = (prompt: typeof DEMO_VOICE_PROMPTS[0]) => {
    setVoiceTranscript(prompt.spokenText);
    setRoughNotes(prompt.roughNotes);
    if (!name) {
      setName(prompt.label);
    }
  };

  // AI Catalogue Assistant Generator
  const handleGenerateWithAi = async () => {
    setIsGeneratingAi(true);

    try {
      const suggestion = await generateAiCatalogueSuggestion({
        craftType: artisan.craftType,
        roughNotes: roughNotes || name,
        category: category,
        artisanName: artisan.name,
        artisanLocation: artisan.location
      });

      setName(suggestion.suggestedName);
      setCategory(suggestion.category);
      setDescription(suggestion.description);
      setMaterials(suggestion.materials.join(', '));
      setPrice(Math.round((suggestion.suggestedPriceRange.min + suggestion.suggestedPriceRange.max) / 2));
      setAiGeneratedNotice(true);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // File Upload to Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-custom-${Date.now()}`,
      artisanId: artisan.id,
      name,
      category,
      craftType: artisan.craftType,
      description,
      price: Number(price),
      availableQuantity: Number(availableQuantity),
      bulkOrderAvailable,
      bulkMinQuantity: bulkOrderAvailable ? Number(bulkMinQuantity) : undefined,
      bulkLeadTimeDays: bulkOrderAvailable ? Number(bulkLeadTimeDays) : undefined,
      location: artisan.location,
      images: [imageUrl],
      materials: materials.split(',').map(m => m.trim()).filter(Boolean),
      dimensions,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    onSaveProduct(productPayload);
  };

  const lang = artisan.languageCode;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onCancel}
            className="text-xs text-[#7A6B5D] hover:text-[#2C241E] flex items-center gap-1 font-semibold mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {getArtisanText(lang, 'myProducts')}
          </button>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            {editingProduct ? getArtisanText(lang, 'editProduct') : getArtisanText(lang, 'addProduct')}
          </h2>
          <p className="text-xs text-[#7A6B5D]">
            {artisan.name} · {artisan.craftType}
          </p>
        </div>
      </div>

      {/* AI & Voice Assistant Box */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base font-bold text-[#2C241E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C2593F]" />
              <span>{getArtisanText(lang, 'aiAssistant')}</span>
            </h3>
            <p className="text-xs text-[#6C5D4F] mt-0.5">
              Enter notes or use voice to generate product title and description.
            </p>
          </div>
        </div>

        {/* Voice Input Section */}
        <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#46392D] flex items-center gap-2">
              <span>{getArtisanText(lang, 'voiceInput')}</span>
              {isListeningVoice && (
                <span className="text-[10px] text-red-600 font-semibold animate-pulse">
                  ● Listening...
                </span>
              )}
            </label>

            <button
              type="button"
              onClick={isListeningVoice ? stopVoiceInput : startVoiceInput}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                isListeningVoice
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-[#8C3A20] hover:bg-[#FAF1E3] border border-[#DECFB5]'
              }`}
            >
              {isListeningVoice ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isListeningVoice ? 'Stop' : 'Speak'}</span>
            </button>
          </div>

          {/* Demonstration Voice Prompts */}
          <div>
            <span className="text-[10px] text-[#7A6B5D] block mb-1">
              Demo voice samples:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_VOICE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyVoicePrompt(prompt)}
                  className="px-2 py-0.5 text-[11px] bg-white hover:bg-[#F2ECE1] border border-[#D5C6AF] text-[#5D5043] rounded-md transition-colors"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {voiceTranscript && (
            <div className="p-2 bg-white rounded-lg border border-[#C5DEC8] text-xs text-[#1E3F20]">
              <span className="font-semibold">Transcribed:</span> {voiceTranscript}
            </div>
          )}
        </div>

        {/* Rough notes input & Generate button */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#46392D]">
            {getArtisanText(lang, 'craftNotes')}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={roughNotes}
              onChange={(e) => setRoughNotes(e.target.value)}
              placeholder="e.g. Cotton tote bag, Sanganer block print, natural indigo..."
              className="flex-1 px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
            />
            <button
              type="button"
              onClick={handleGenerateWithAi}
              disabled={isGeneratingAi}
              className="px-4 py-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>{getArtisanText(lang, 'aiSuggest')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Notice Banner */}
        {aiGeneratedNotice && (
          <div className="p-2.5 bg-[#EFF6F0] rounded-xl border border-[#C5DEC8] text-xs text-[#1E3F20] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1E3F20] shrink-0" />
              <span>Details suggested. You can edit any field below before publishing.</span>
            </div>
            <button
              onClick={() => setAiGeneratedNotice(false)}
              className="text-[#1E3F20] hover:text-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Main Form for Editing & Publishing */}
      <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-[#E3D4BC] p-6 shadow-sm space-y-5">
        
        <h3 className="font-serif text-lg font-bold text-[#2C241E] border-b border-[#EFE5D7] pb-3">
          {editingProduct ? getArtisanText(lang, 'editProduct') : getArtisanText(lang, 'addProduct')}
        </h3>

        {/* Image Selection & Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#46392D]">
            {getArtisanText(lang, 'photoUpload')} <span className="text-[#C2593F]">*</span>
          </label>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-[#FAF7F2] border-2 border-[#D5C6AF] shrink-0">
              <img
                src={imageUrl}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <label className="px-3 py-2 bg-[#FAF1E3] hover:bg-[#F3E5D1] border border-[#DECFB5] text-[#8C3A20] text-xs font-semibold rounded-xl cursor-pointer transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{getArtisanText(lang, 'uploadFromDevice')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-[#7A6B5D]">or select craft preset photo:</span>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(photo.url)}
                    className={`px-2 py-1 text-[11px] rounded-lg border transition-colors ${
                      imageUrl === photo.url
                        ? 'bg-[#96371D] text-white border-[#96371D]'
                        : 'bg-[#FAF7F2] text-[#5D5043] border-[#D5C6AF] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {photo.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'productTitle')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Handmade Cotton Bags"
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'category')} <span className="text-[#C2593F]">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none"
            >
              <option value="Bags & Accessories">Bags & Accessories</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Kitchen & Dining">Kitchen & Dining</option>
              <option value="Apparel & Textiles">Apparel & Textiles</option>
              <option value="Paintings & Folk Art">Paintings & Folk Art</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-[#46392D] mb-1">
            {getArtisanText(lang, 'description')} <span className="text-[#C2593F]">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the craft tradition, materials, making technique..."
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30 leading-relaxed"
            required
          />
        </div>

        {/* Pricing, Quantity, Bulk Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EFE5D7]">
          
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'setPrice')} (INR ₹) <span className="text-[#C2593F]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-bold text-[#7A6B5D]">₹</span>
              <input
                type="number"
                min="10"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-sm font-bold text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'availableStock')} <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-sm font-bold text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'bulkOrders')}
            </label>
            <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#D5C6AF] flex items-center gap-2">
              <input
                type="checkbox"
                id="bulkToggle"
                checked={bulkOrderAvailable}
                onChange={(e) => setBulkOrderAvailable(e.target.checked)}
                className="rounded text-[#96371D] focus:ring-0"
              />
              <label htmlFor="bulkToggle" className="text-xs font-semibold text-[#2C241E] cursor-pointer">
                {getArtisanText(lang, 'acceptsBulk')}
              </label>
            </div>
          </div>

        </div>

        {/* Bulk order specs if enabled */}
        {bulkOrderAvailable && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-[#FAF4EB] rounded-xl border border-[#E5D7C2]">
            <div>
              <label className="block text-xs font-bold text-[#8C3A20] mb-1">
                Min. Batch (units)
              </label>
              <input
                type="number"
                min="5"
                value={bulkMinQuantity}
                onChange={(e) => setBulkMinQuantity(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-[#D5C6AF] rounded-lg text-xs font-semibold text-[#2C241E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8C3A20] mb-1">
                Lead Time (days)
              </label>
              <input
                type="number"
                min="3"
                value={bulkLeadTimeDays}
                onChange={(e) => setBulkLeadTimeDays(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-[#D5C6AF] rounded-lg text-xs font-semibold text-[#2C241E]"
              />
            </div>
          </div>
        )}

        {/* Materials and Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'materials')}
            </label>
            <input
              type="text"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="e.g. 100% Cotton Canvas, Natural Indigo Dyes"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              {getArtisanText(lang, 'dimensions')}
            </label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. 38 cm x 42 cm"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E]"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFE5D7]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#D5C6AF] text-xs font-medium text-[#6C5D4F] hover:bg-[#FAF4EA] rounded-xl transition-colors cursor-pointer"
          >
            {getArtisanText(lang, 'cancel')}
          </button>
          
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{editingProduct ? getArtisanText(lang, 'saveChanges') : getArtisanText(lang, 'publishProduct')}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
