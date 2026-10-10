import React, { useState } from 'react';
import { Artisan, Enquiry, Product } from '../types';
import { X, Send, Store, Package, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  artisan: Artisan;
  initialQuantity?: number;
  initialRequirements?: string;
  onSubmitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  artisan,
  initialQuantity = 1,
  initialRequirements = '',
  onSubmitEnquiry
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity || 1);
  const [buyerName, setBuyerName] = useState<string>('Priya Sharma');
  const [buyerEmail, setBuyerEmail] = useState<string>('priya.sharma@example.com');
  const [buyerPhone, setBuyerPhone] = useState<string>('+91 98765 43210');
  const [buyerOrganization, setBuyerOrganization] = useState<string>('Conscious Living Co.');
  const [specialRequirements, setSpecialRequirements] = useState<string>(initialRequirements);
  const [message, setMessage] = useState<string>(
    `Namaste ${artisan.name}, I am interested in sourcing ${quantity} units of your ${product.name}. Please let us know the production timeline and delivery details.`
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry({
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerOrganization,
      artisanId: artisan.id,
      productId: product.id,
      productName: product.name,
      requestedQuantity: quantity,
      message,
      specialRequirements,
      status: 'New enquiry',
      agreedPricePerUnit: product.price
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECFB5] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#96371D] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F7D8C4] block">
              Direct Connection · No Middlemen
            </span>
            <h2 className="font-serif text-xl font-bold mt-0.5">
              Contact Artisan & Send Enquiry
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#1E3F20]/10 text-[#1E3F20] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C241E]">
              Enquiry Sent Successfully!
            </h3>
            <p className="text-sm text-[#6C5D4F] max-w-md mx-auto">
              Your inquiry has been dispatched directly to <strong>{artisan.name}</strong>.
              You can track status updates in your <em>My Enquiries</em> tab, or switch to the Artisan view to accept it.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Product & Artisan summary badge */}
            <div className="p-4 bg-white rounded-xl border border-[#E3D4BC] flex items-start gap-3.5">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg border border-[#E8DEC8] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-bold text-[#2C241E] truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-[#7A6B5D] flex items-center gap-1.5 mt-0.5">
                  <Store className="w-3.5 h-3.5 text-[#C2593F]" />
                  <span>{artisan.name} · {artisan.location}</span>
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <span className="font-semibold text-[#8C3A20]">
                    ₹{product.price.toLocaleString('en-IN')} / unit
                  </span>
                  <span className="text-[#8C7D70]">·</span>
                  <span className="text-[#4F6851]">
                    {product.availableQuantity} units currently ready
                  </span>
                </div>
              </div>
            </div>

            {/* Price policy note */}
            <div className="flex items-start gap-2.5 p-3 bg-[#FAF1E3] rounded-lg border border-[#E9DAC3] text-xs text-[#7A4B29]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#C2593F]" />
              <span>
                <strong>Artisan-Set Pricing:</strong> Artisans set all prices. Final wholesale and shipping terms can be negotiated directly during discussion.
              </span>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-[#46392D] mb-1.5">
                Requested Quantity <span className="text-[#C2593F]">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(val);
                    setMessage(`Namaste ${artisan.name}, I am interested in sourcing ${val} units of your ${product.name}. Please let us know the production timeline and delivery details.`);
                  }}
                  className="w-32 px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
                <span className="text-xs text-[#6C5D4F]">
                  Est. Base Total: <strong className="text-[#2C241E]">₹{(quantity * product.price).toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            {/* Buyer Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Your Full Name <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Email Address <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Phone / WhatsApp <span className="text-[#C2593F]">*</span>
                </label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#46392D] mb-1">
                  Organization / Purpose (Optional)
                </label>
                <input
                  type="text"
                  value={buyerOrganization}
                  onChange={(e) => setBuyerOrganization(e.target.value)}
                  placeholder="e.g. Corporate Gifting / Retail / Wedding"
                  className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-xs font-bold text-[#46392D] mb-1">
                Special Requirements or Customizations
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="e.g. Custom screen print logo, sustainable packaging, specific size"
                className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-[#46392D] mb-1">
                Message to Artisan
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#96371D]/30 leading-relaxed"
                required
              />
            </div>

            {/* Form actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E3D4BC]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#D5C6AF] text-xs font-medium text-[#6C5D4F] hover:bg-[#FAF4EA] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Enquiry</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
