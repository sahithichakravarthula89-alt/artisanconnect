import React from 'react';
import { Artisan, Product } from '../types';
import { Store, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Clock, Package, Languages } from 'lucide-react';

interface ArtisanDirectoryProps {
  artisan: Artisan;
  products: Product[];
  onSelectProduct: (product: Product, artisan: Artisan) => void;
  onEnquireProduct: (product: Product, artisan: Artisan) => void;
}

export const ArtisanDirectory: React.FC<ArtisanDirectoryProps> = ({
  artisan,
  products,
  onSelectProduct,
  onEnquireProduct
}) => {
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Artisan Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5D4F] mt-0.5">
            Workshop details and listed products.
          </p>
        </div>
      </div>

      {/* Artisan Profile Card - NO face photo, only authentic details */}
      <div className="bg-white rounded-2xl border border-[#E3D4BC] shadow-sm p-6 sm:p-7 space-y-6">
        
        {/* Profile Header without face photo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE5D7] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl font-bold text-[#2C241E]">
                {artisan.name}
              </h3>
              <span title="Verified Artisan">
                <ShieldCheck className="w-5 h-5 text-[#1E3F20]" />
              </span>
            </div>

            <p className="text-sm font-semibold text-[#8C3A20] mt-1">
              {artisan.craftType}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[#7A6B5D]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C2593F]" />
                {artisan.location}
              </span>
              <span>·</span>
              <span>{artisan.yearsOfExperience} years craft experience</span>
            </div>
          </div>

          {/* Key metrics badge */}
          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DEC8] flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                Preparation Time
              </span>
              <span className="font-bold text-[#8C3A20] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                {artisan.preparationDays || 7} days
              </span>
            </div>

            <div className="border-l border-[#DECFB5] pl-4">
              <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                Language
              </span>
              <span className="font-bold text-[#2C241E] flex items-center gap-1 mt-0.5">
                <Languages className="w-3.5 h-3.5" />
                {artisan.preferredLanguage || 'Hindi'}
              </span>
            </div>
          </div>
        </div>

        {/* Bio & Craft Story */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A6B5D] block mb-1.5">
            About
          </span>
          <p className="text-xs sm:text-sm text-[#46392D] leading-relaxed">
            {artisan.bio}
          </p>
        </div>

        {/* Specialties */}
        {artisan.specialties && artisan.specialties.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6B5D] block mb-2">
              Craft Specialties
            </span>
            <div className="flex flex-wrap gap-2">
              {artisan.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs bg-[#FAF4EB] border border-[#E8DEC8] text-[#6C5D4F] rounded-lg"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Coordinates */}
        <div className="pt-4 border-t border-[#EFE5D7] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#5D5043]">
          <span className="flex items-center gap-1.5 font-medium">
            <Phone className="w-4 h-4 text-[#7A6B5D]" />
            <a href={`tel:${artisan.phone}`} className="hover:underline text-[#2C241E]">
              {artisan.phone}
            </a>
          </span>

          <span className="flex items-center gap-1.5 font-medium">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{artisan.whatsapp}</span>
          </span>

          <span className="flex items-center gap-1.5 font-medium">
            <Mail className="w-4 h-4 text-[#7A6B5D]" />
            <a href={`mailto:${artisan.email}`} className="hover:underline text-[#2C241E]">
              {artisan.email}
            </a>
          </span>
        </div>

      </div>

      {/* Products Listed by this Artisan */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#2C241E]">
          Products Listed by {artisan.name} ({artisanProducts.length})
        </h3>

        {artisanProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E3D4BC] p-8 text-center text-xs text-[#6C5D4F]">
            No products listed yet by this artisan.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artisanProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E3D4BC] shadow-sm p-4 flex flex-col justify-between hover:border-[#C2593F] transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onClick={() => onSelectProduct(product, artisan)}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F2ECE1] border border-[#E8DEC8] shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#7A6B5D] block">
                      {product.category}
                    </span>
                    <h4
                      onClick={() => onSelectProduct(product, artisan)}
                      className="font-serif text-sm font-bold text-[#2C241E] hover:text-[#96371D] cursor-pointer truncate mt-0.5"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-baseline justify-between mt-2 text-xs">
                      <span className="font-serif font-bold text-[#2C241E]">
                        ₹{product.price}
                      </span>
                      <span className="text-[#1E3F20] font-semibold">
                        {product.availableQuantity} in stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EFE5D7] flex items-center justify-end gap-2">
                  <button
                    onClick={() => onSelectProduct(product, artisan)}
                    className="px-3 py-1.5 border border-[#D5C6AF] text-xs font-semibold text-[#5D5043] hover:bg-[#FAF4EA] rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onEnquireProduct(product, artisan)}
                    className="px-3.5 py-1.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Send Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
