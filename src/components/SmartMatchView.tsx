import React, { useState, useEffect } from 'react';
import { Artisan, BuyerRequest, MatchResult, Product } from '../types';
import { executeSmartMatching } from '../services/matchingService';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Store, MapPin, Send, RefreshCw } from 'lucide-react';

interface SmartMatchViewProps {
  products: Product[];
  artisans: Artisan[];
  onSelectProduct: (product: Product, artisan: Artisan) => void;
  onEnquireProduct: (product: Product, artisan: Artisan, quantity: number, requirements: string) => void;
  onOpenGuide: () => void;
  initialPreset?: 'benchmark' | null;
}

export const SmartMatchView: React.FC<SmartMatchViewProps> = ({
  products,
  artisans,
  onSelectProduct,
  onEnquireProduct,
  onOpenGuide
}) => {
  // Form State
  const [requiredProduct, setRequiredProduct] = useState('Handmade cotton bags');
  const [description, setDescription] = useState('Durable eco-friendly cotton bags with block prints.');
  const [quantity, setQuantity] = useState<number>(100);
  const [locationPreference, setLocationPreference] = useState('Rajasthan');
  const [specialRequirements, setSpecialRequirements] = useState('Natural vegetable dyes, reinforced handles.');

  // Results State
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filterQuality, setFilterQuality] = useState<'all' | 'strong' | 'partial' | 'unrelated'>('all');

  const runMatching = (customReq?: Partial<BuyerRequest>) => {
    setIsSearching(true);
    
    const requestPayload: BuyerRequest = {
      id: `req-${Date.now()}`,
      requiredProduct: customReq?.requiredProduct ?? requiredProduct,
      description: customReq?.description ?? description,
      quantity: customReq?.quantity ?? quantity,
      locationPreference: customReq?.locationPreference ?? locationPreference,
      specialRequirements: customReq?.specialRequirements ?? specialRequirements,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      const results = executeSmartMatching(requestPayload, products, artisans);
      setMatchResults(results);
      setIsSearching(false);
    }, 200);
  };

  useEffect(() => {
    runMatching();
  }, [products, artisans]);

  const loadBenchmarkScenario = () => {
    setRequiredProduct('Handmade cotton bags');
    setDescription('Durable eco-friendly cotton bags with block prints.');
    setQuantity(100);
    setLocationPreference('Rajasthan');
    setSpecialRequirements('Natural vegetable dyes, reinforced handles.');
    runMatching({
      requiredProduct: 'Handmade cotton bags',
      description: 'Durable eco-friendly cotton bags with block prints.',
      quantity: 100,
      locationPreference: 'Rajasthan',
      specialRequirements: 'Natural vegetable dyes, reinforced handles.'
    });
  };

  // Filtered Results
  const filteredResults = matchResults.filter(res => {
    if (filterQuality === 'strong') return res.matchQuality === 'STRONG_MATCH';
    if (filterQuality === 'partial') return res.matchQuality === 'PARTIAL_MATCH';
    if (filterQuality === 'unrelated') return res.matchQuality === 'POOR_MATCH';
    return true;
  });

  const strongCount = matchResults.filter(r => r.matchQuality === 'STRONG_MATCH').length;
  const partialCount = matchResults.filter(r => r.matchQuality === 'PARTIAL_MATCH').length;
  const poorCount = matchResults.filter(r => r.matchQuality === 'POOR_MATCH').length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3D4BC] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Smart Matching
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5D4F] mt-1">
            Artisans ranked by craft suitability, stock, and bulk readiness.
          </p>
        </div>

        <button
          onClick={loadBenchmarkScenario}
          className="px-3.5 py-2 bg-[#FAF1E3] hover:bg-[#F3E5D1] border border-[#DECFB5] text-[#8C3A20] text-xs font-semibold rounded-xl transition-colors shrink-0"
        >
          Load Benchmark (100 Cotton Bags)
        </button>
      </div>

      {/* Sourcing Request Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMatching();
        }}
        className="bg-white rounded-2xl border border-[#E3D4BC] p-5 sm:p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              Required Product <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="text"
              value={requiredProduct}
              onChange={(e) => setRequiredProduct(e.target.value)}
              placeholder="e.g. Handmade cotton bags, Wooden toys, Terracotta pots"
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/30 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              Quantity <span className="text-[#C2593F]">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/30 font-bold"
              required
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              Location Preference (Optional)
            </label>
            <select
              value={locationPreference}
              onChange={(e) => setLocationPreference(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none"
            >
              <option value="Any">Any Location</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Bihar">Bihar</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Jammu & Kashmir">Jammu & Kashmir</option>
              <option value="Assam">Assam</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#46392D] mb-1">
              Special Requirements (Optional)
            </label>
            <input
              type="text"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="e.g. Natural dyes, logo print, special packaging"
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/30"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2.5 bg-[#1E3F20] hover:bg-[#152E17] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Matching...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>Find Matches</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* Results Section */}
      <div className="space-y-4">
        
        {/* Results Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C241E]">
              Match Results ({matchResults.length})
            </h3>
            <p className="text-xs text-[#7A6B5D]">
              Showing results for {quantity} units of {requiredProduct}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#EDE4D4] rounded-xl border border-[#DFD1BE] text-xs">
            <button
              onClick={() => setFilterQuality('all')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                filterQuality === 'all'
                  ? 'bg-white text-[#2C241E] shadow-sm'
                  : 'text-[#685848] hover:text-[#2C241E]'
              }`}
            >
              All ({matchResults.length})
            </button>
            <button
              onClick={() => setFilterQuality('strong')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                filterQuality === 'strong'
                  ? 'bg-[#1E3F20] text-white shadow-sm'
                  : 'text-[#685848] hover:text-[#2C241E]'
              }`}
            >
              Strong ({strongCount})
            </button>
            <button
              onClick={() => setFilterQuality('partial')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                filterQuality === 'partial'
                  ? 'bg-[#D97706] text-white shadow-sm'
                  : 'text-[#685848] hover:text-[#2C241E]'
              }`}
            >
              Partial Stock ({partialCount})
            </button>
            <button
              onClick={() => setFilterQuality('unrelated')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                filterQuality === 'unrelated'
                  ? 'bg-[#7A6B5D] text-white shadow-sm'
                  : 'text-[#685848] hover:text-[#2C241E]'
              }`}
            >
              Unrelated ({poorCount})
            </button>
          </div>
        </div>

        {/* Results Cards List */}
        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E3D4BC] p-10 text-center space-y-2">
            <p className="font-serif text-base font-bold text-[#2C241E]">
              No results found for this filter
            </p>
            <p className="text-xs text-[#6C5D4F]">
              Select All to view all results.
            </p>
            <button
              onClick={() => setFilterQuality('all')}
              className="px-4 py-1.5 bg-[#96371D] text-white text-xs font-semibold rounded-lg"
            >
              View All
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredResults.map((result, index) => {
              const { product, artisan, matchScore, matchQuality, isSufficientStock, reasons } = result;

              const badgeColor = {
                STRONG_MATCH: 'bg-[#1E3F20] text-white',
                PARTIAL_MATCH: 'bg-[#D97706] text-white',
                POTENTIAL_MATCH: 'bg-[#7A6B5D] text-white',
                POOR_MATCH: 'bg-red-700 text-white'
              }[matchQuality];

              const badgeLabel = {
                STRONG_MATCH: 'Strong Match',
                PARTIAL_MATCH: 'Partial Match (Insufficient Stock)',
                POTENTIAL_MATCH: 'Alternative Craft',
                POOR_MATCH: 'Unrelated Craft'
              }[matchQuality];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E3D4BC] shadow-sm p-4 sm:p-5 flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    
                    {/* Left: Product info */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onClick={() => onSelectProduct(product, artisan)}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-[#F2ECE1] border border-[#E8DEC8] shrink-0 cursor-pointer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[11px] font-bold text-[#7A6B5D]">
                            #{index + 1}
                          </span>
                          <span className="text-[#8C7D70]">·</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                            {badgeLabel}
                          </span>
                          {artisan.benchmarkRole && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#FAF1E3] border border-[#DECFB5] text-[#8C3A20] rounded">
                              {artisan.benchmarkRole}
                            </span>
                          )}
                        </div>

                        <h4
                          onClick={() => onSelectProduct(product, artisan)}
                          className="font-serif text-base sm:text-lg font-bold text-[#2C241E] hover:text-[#96371D] cursor-pointer truncate"
                        >
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-0.5 text-xs text-[#5D5043]">
                          <Store className="w-3.5 h-3.5 text-[#C2593F] shrink-0" />
                          <span className="font-semibold truncate">{artisan.name}</span>
                          <span className="text-[#8C7D70]">·</span>
                          <span className="text-[#7A6B5D] truncate">{artisan.location}</span>
                        </div>

                        {/* Reasons */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs">
                          {reasons.map((r, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-md text-[11px] ${
                                r.includes('Insufficient')
                                  ? 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]'
                                  : r.includes('Unrelated')
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-[#FAF7F2] text-[#46392D] border border-[#E8DEC8]'
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Pricing */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE5D7]">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                          Match Score
                        </span>
                        <span className={`font-serif text-2xl font-bold ${
                          matchScore >= 75 ? 'text-[#1E3F20]' : matchScore >= 50 ? 'text-[#D97706]' : 'text-[#7A6B5D]'
                        }`}>
                          {matchScore}%
                        </span>
                      </div>

                      <div className="sm:mt-2 text-right">
                        <span className="text-[10px] text-[#7A6B5D] block uppercase font-bold">
                          Artisan Price
                        </span>
                        <span className="font-serif text-base font-bold text-[#2C241E]">
                          ₹{product.price}
                        </span>
                        <span className={`block text-[11px] font-semibold ${isSufficientStock ? 'text-[#1E3F20]' : 'text-[#D97706]'}`}>
                          {product.availableQuantity} in stock
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t border-[#EFE5D7] flex items-center justify-end gap-2">
                    <button
                      onClick={() => onSelectProduct(product, artisan)}
                      className="px-3 py-1.5 border border-[#D5C6AF] text-xs font-semibold text-[#5D5043] hover:bg-[#FAF4EA] rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onEnquireProduct(product, artisan, quantity, specialRequirements)}
                      className="px-4 py-1.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Contact Artisan</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
