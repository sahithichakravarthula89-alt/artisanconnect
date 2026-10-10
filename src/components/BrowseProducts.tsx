import React, { useState, useMemo } from 'react';
import { Artisan, Product } from '../types';
import { Search, Filter, Store, MapPin, Package, ArrowUpDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface BrowseProductsProps {
  products: Product[];
  artisans: Artisan[];
  onSelectProduct: (product: Product, artisan: Artisan) => void;
  onEnquireProduct: (product: Product, artisan: Artisan) => void;
  onGoToSmartMatch: () => void;
}

export const BrowseProducts: React.FC<BrowseProductsProps> = ({
  products,
  artisans,
  onSelectProduct,
  onEnquireProduct,
  onGoToSmartMatch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [bulkOnly, setBulkOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'qty-desc'>('featured');

  const artisanMap = useMemo(() => new Map(artisans.map(a => [a.id, a])), [artisans]);

  // Extract unique categories, crafts, locations
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  const craftTypes = useMemo(() => {
    return Array.from(new Set(products.map(p => p.craftType))).sort();
  }, [products]);

  const locations = useMemo(() => {
    const locSet = new Set<string>();
    artisans.forEach(a => {
      if (a.state) locSet.add(a.state);
    });
    return Array.from(locSet).sort();
  }, [artisans]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const artisan = artisanMap.get(product.artisanId);
      const searchLower = searchQuery.toLowerCase().trim();

      if (searchLower) {
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDesc = product.description.toLowerCase().includes(searchLower);
        const matchesCraft = product.craftType.toLowerCase().includes(searchLower);
        const matchesCategory = product.category.toLowerCase().includes(searchLower);
        const matchesArtisan = artisan ? artisan.name.toLowerCase().includes(searchLower) : false;
        const matchesLocation = product.location.toLowerCase().includes(searchLower);

        if (!matchesName && !matchesDesc && !matchesCraft && !matchesCategory && !matchesArtisan && !matchesLocation) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (selectedCraft !== 'all' && product.craftType !== selectedCraft) {
        return false;
      }

      if (selectedLocation !== 'all' && artisan && artisan.state !== selectedLocation) {
        return false;
      }

      if (bulkOnly && !product.bulkOrderAvailable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'qty-desc') return b.availableQuantity - a.availableQuantity;
      return 0; // featured original order
    });
  }, [products, artisanMap, searchQuery, selectedCategory, selectedCraft, selectedLocation, bulkOnly, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Product Catalogue
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5D4F] mt-0.5">
            Handcrafted traditional products directly from Indian artisans.
          </p>
        </div>

        <button
          onClick={onGoToSmartMatch}
          className="px-4 py-2 bg-[#1E3F20] hover:bg-[#152E17] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
          <span>Smart Match Request</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E3D4BC] shadow-sm space-y-3.5">
        
        {/* Search input + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6B5D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, product name, artisan, or location (e.g. cotton bags, terracotta, Jaipur)..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-lg text-xs sm:text-sm text-[#2C241E] placeholder:text-[#8C7D70] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A6B5D] hover:text-[#2C241E]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-lg text-xs text-[#5D5043]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7A6B5D]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none text-[#2C241E] font-medium cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="qty-desc">Quantity Available</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EFE5D7] text-xs">
          
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-md text-[#46392D] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Craft Type */}
          <select
            value={selectedCraft}
            onChange={(e) => setSelectedCraft(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-md text-[#46392D] focus:outline-none"
          >
            <option value="all">All Craft Traditions</option>
            {craftTypes.map(craft => (
              <option key={craft} value={craft}>{craft}</option>
            ))}
          </select>

          {/* Location State */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-md text-[#46392D] focus:outline-none"
          >
            <option value="all">All States</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Bulk only filter */}
          <label className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAF7F2] border border-[#D5C6AF] rounded-md cursor-pointer text-[#46392D] select-none hover:bg-[#F3EADB]">
            <input
              type="checkbox"
              checked={bulkOnly}
              onChange={(e) => setBulkOnly(e.target.checked)}
              className="rounded text-[#96371D] focus:ring-0"
            />
            <span className="font-medium">Bulk Orders Ready</span>
          </label>

          {/* Reset all filters */}
          {(selectedCategory !== 'all' || selectedCraft !== 'all' || selectedLocation !== 'all' || bulkOnly || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCraft('all');
                setSelectedLocation('all');
                setBulkOnly(false);
                setSearchQuery('');
              }}
              className="text-xs text-[#96371D] hover:underline font-semibold ml-auto"
            >
              Reset Filters
            </button>
          )}

        </div>

      </div>

      {/* Product count */}
      <div className="flex items-center justify-between text-xs text-[#7A6B5D] px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> products</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E3D4BC] p-12 text-center space-y-3">
          <Package className="w-12 h-12 text-[#B5A593] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#2C241E]">
            No products found
          </h3>
          <p className="text-xs text-[#6C5D4F] max-w-sm mx-auto">
            Try adjusting your search keywords or clearing filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCraft('all');
              setSelectedLocation('all');
              setBulkOnly(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#96371D] text-white text-xs font-semibold rounded-lg hover:bg-[#7D2C15] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const artisan = artisanMap.get(product.artisanId);
            if (!artisan) return null;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E3D4BC] hover:border-[#C2593F] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col overflow-hidden"
              >
                {/* Product Image */}
                <div 
                  onClick={() => onSelectProduct(product, artisan)}
                  className="aspect-4/3 relative overflow-hidden bg-[#F2ECE1] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle benchmark tag if applicable */}
                  {artisan.benchmarkRole && (
                    <div className="absolute top-2.5 left-2.5 bg-[#96371D]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {artisan.benchmarkRole}
                    </div>
                  )}

                  {product.bulkOrderAvailable && (
                    <div className="absolute top-2.5 right-2.5 bg-[#1E3F20]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Bulk Ready
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet typographic metadata without pills */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7A6B5D] truncate">
                      <span>{product.craftType}</span>
                      <span>·</span>
                      <span>{product.category}</span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onSelectProduct(product, artisan)}
                      className="font-serif text-base font-bold text-[#2C241E] mt-1 line-clamp-1 hover:text-[#96371D] cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Artisan info */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-[#5D5043]">
                      <Store className="w-3.5 h-3.5 text-[#C2593F] shrink-0" />
                      <span className="font-medium truncate">{artisan.name}</span>
                      <span className="text-[#8C7D70]">·</span>
                      <span className="text-[#7A6B5D] truncate">{artisan.city}</span>
                    </div>

                    {/* Short Description */}
                    <p className="mt-2 text-xs text-[#6C5D4F] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Stock Bar */}
                  <div className="mt-4 pt-3 border-t border-[#EFE5D7]">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                          Artisan Price
                        </span>
                        <span className="font-serif text-lg font-bold text-[#2C241E]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                          In Stock
                        </span>
                        <span className={`text-xs font-semibold ${product.availableQuantity < 30 ? 'text-[#D97706]' : 'text-[#1E3F20]'}`}>
                          {product.availableQuantity} units
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct(product, artisan)}
                        className="w-full py-1.5 px-2 bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#D5C6AF] text-xs font-semibold text-[#5D5043] rounded-lg transition-colors text-center"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onEnquireProduct(product, artisan)}
                        className="w-full py-1.5 px-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center"
                      >
                        Enquire
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
