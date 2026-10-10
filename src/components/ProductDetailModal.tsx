import React from 'react';
import { Artisan, Product } from '../types';
import { X, Store, MapPin, Package, Clock, ShieldCheck, Send, CheckCircle2, Phone, Mail, MessageCircle } from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  artisan: Artisan | null;
  onOpenEnquiry: (product: Product, artisan: Artisan) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  artisan,
  onOpenEnquiry
}) => {
  if (!isOpen || !product || !artisan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECFB5] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-white p-5 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#96371D]">
              {product.craftType} · {product.category}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E] truncate mt-0.5">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6B5D] hover:text-[#2C241E] hover:bg-[#F2EADB] rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Photo Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#E3D4BC] bg-[#F5EFEB]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images[1] ? (
              <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#E3D4BC] bg-[#F5EFEB]">
                <img
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-4 bg-[#FAF4EB] rounded-xl border border-[#E5D7C2] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#8C3A20] tracking-wider mb-2">
                    Direct Artisan Pricing
                  </h4>
                  <div className="font-serif text-3xl font-bold text-[#2C241E]">
                    ₹{product.price.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-[#7A6B5D] font-sans ml-1">/ piece</span>
                  </div>
                  <p className="text-xs text-[#6C5D4F] mt-2">
                    Artisan sets price directly. No commission added.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DEC8] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#7A6B5D]">Inventory in stock:</span>
                    <strong className="text-[#1E3F20]">{product.availableQuantity} units ready</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6B5D]">Bulk orders:</span>
                    <span className="font-semibold text-[#2C241E]">
                      {product.bulkOrderAvailable ? `Yes (Min ${product.bulkMinQuantity || 10} pcs)` : 'Small batches only'}
                    </span>
                  </div>
                  {product.bulkLeadTimeDays && (
                    <div className="flex justify-between">
                      <span className="text-[#7A6B5D]">Bulk Lead Time:</span>
                      <span className="text-[#2C241E]">~{product.bulkLeadTimeDays} days</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#8C3A20] tracking-wider mb-1.5">
              Product Description & Craft Story
            </h3>
            <p className="text-sm text-[#46392D] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs & Materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E3D4BC]">
            <div>
              <span className="text-xs font-bold text-[#6C5D4F] block mb-1">
                Raw Materials Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.materials.map((mat, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-[#F2ECE1] text-[#5D5043] rounded">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {product.dimensions && (
              <div>
                <span className="text-xs font-bold text-[#6C5D4F] block mb-1">
                  Dimensions / Sizing
                </span>
                <p className="text-xs text-[#2C241E] font-medium">
                  {product.dimensions}
                </p>
              </div>
            )}
          </div>

          {/* Artisan Card & Heritage */}
          <div className="p-4 bg-[#FAF4EB] rounded-xl border border-[#E5D7C2]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C2593F] text-white flex items-center justify-center shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-[#2C241E]">
                    {artisan.name}
                  </h4>
                  {artisan.benchmarkRole && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#96371D] text-white rounded">
                      {artisan.benchmarkRole}
                    </span>
                  )}
                  {artisan.verifiedArtisan && (
                    <span title="Verified Traditional Artisan">
                      <ShieldCheck className="w-4 h-4 text-[#1E3F20]" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#7A6B5D] flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C2593F]" />
                  <span>{artisan.location}</span>
                  <span>·</span>
                  <span>{artisan.yearsOfExperience} yrs experience</span>
                  {artisan.preparationDays && (
                    <>
                      <span>·</span>
                      <span>{artisan.preparationDays} days lead time</span>
                    </>
                  )}
                </p>

                <p className="text-xs text-[#5D5043] mt-2 leading-relaxed">
                  {artisan.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#5D5043]">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#7A6B5D]" /> {artisan.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> {artisan.whatsapp}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#7A6B5D]" /> {artisan.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] flex items-center justify-between">
          <div className="text-xs text-[#7A6B5D]">
            Set price: <strong className="text-sm font-serif font-bold text-[#2C241E]">₹{product.price}</strong>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#D5C6AF] text-xs font-medium text-[#6C5D4F] hover:bg-[#FAF4EA] rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry(product, artisan);
              }}
              className="px-5 py-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Artisan / Enquire</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
