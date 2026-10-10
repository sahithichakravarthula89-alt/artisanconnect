import React from 'react';
import { Artisan, Enquiry, Product } from '../types';
import { Inbox, Clock, CheckCircle2, MessageCircle, AlertCircle, ArrowRight, Store, Phone, Mail, HelpCircle } from 'lucide-react';

interface BuyerEnquiriesProps {
  enquiries: Enquiry[];
  artisans: Artisan[];
  products: Product[];
  onSwitchToArtisan: () => void;
  onOpenGuide: () => void;
}

export const BuyerEnquiries: React.FC<BuyerEnquiriesProps> = ({
  enquiries,
  artisans,
  products,
  onSwitchToArtisan,
  onOpenGuide
}) => {
  const artisanMap = new Map(artisans.map(a => [a.id, a]));
  const productMap = new Map(products.map(p => [p.id, p]));

  // Status progression badge styling
  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'New enquiry':
        return { label: 'New enquiry', bg: 'bg-[#FAF1E3] text-[#8C3A20] border-[#DECFB5]' };
      case 'Accepted':
        return { label: 'Accepted by Artisan', bg: 'bg-[#EFF6F0] text-[#1E3F20] border-[#1E3F20]' };
      case 'Discussion in progress':
        return { label: 'Discussion in progress', bg: 'bg-[#EBF5FB] text-[#2980B9] border-[#A9CCE3]' };
      case 'Order confirmed':
        return { label: 'Order confirmed', bg: 'bg-[#F4ECF7] text-[#8E44AD] border-[#D7BDE2]' };
      case 'In progress':
        return { label: 'In production', bg: 'bg-[#FEF9E7] text-[#B7950B] border-[#F9E79F]' };
      case 'Completed':
        return { label: 'Order Completed', bg: 'bg-[#E8F8F5] text-[#117A65] border-[#A3E4D7]' };
      case 'Declined':
        return { label: 'Declined by Artisan', bg: 'bg-[#FDEDEC] text-[#C0392B] border-[#F5B7B1]' };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  const stages: Enquiry['status'][] = [
    'New enquiry',
    'Accepted',
    'Discussion in progress',
    'Order confirmed',
    'In progress',
    'Completed'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            My Enquiries
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5D4F] mt-0.5">
            Track communication and order status directly with artisans.
          </p>
        </div>

        <button
          onClick={onSwitchToArtisan}
          className="px-3.5 py-1.5 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
        >
          Switch to Artisan
        </button>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E3D4BC] p-12 text-center space-y-3">
          <Inbox className="w-12 h-12 text-[#B5A593] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#2C241E]">
            No enquiries submitted yet
          </h3>
          <p className="text-xs text-[#6C5D4F] max-w-sm mx-auto">
            Browse handcrafted creations or run a Smart Match to send your first direct enquiry to an artisan.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map(enquiry => {
            const artisan = artisanMap.get(enquiry.artisanId);
            const product = productMap.get(enquiry.productId);
            const badge = getStatusBadge(enquiry.status);

            const currentStageIndex = stages.indexOf(enquiry.status);

            return (
              <div
                key={enquiry.id}
                className="bg-white rounded-2xl border border-[#E3D4BC] shadow-sm hover:shadow-md transition-all overflow-hidden p-6 space-y-5"
              >
                {/* Top Info Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EFE5D7] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#2C241E]">
                        {enquiry.productName}
                      </h3>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>

                    <p className="text-xs text-[#7A6B5D] mt-1 flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-[#C2593F]" />
                      <span>Artisan: <strong>{artisan ? artisan.name : 'Master Artisan'}</strong></span>
                      {artisan && <span>({artisan.location})</span>}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                      Quantity Requested
                    </span>
                    <span className="font-serif text-lg font-bold text-[#2C241E]">
                      {enquiry.requestedQuantity} units
                    </span>
                    {enquiry.agreedPricePerUnit && (
                      <span className="text-xs text-[#1E3F20] font-semibold block">
                        ₹{enquiry.agreedPricePerUnit} / unit
                      </span>
                    )}
                  </div>
                </div>

                {/* Workflow Stepper Bar */}
                {enquiry.status !== 'Declined' && (
                  <div className="py-2">
                    <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block mb-2 tracking-wider">
                      Progress:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[11px]">
                      {stages.map((stg, i) => {
                        const isPastOrCurrent = currentStageIndex >= i;
                        const isCurrent = currentStageIndex === i;

                        return (
                          <div
                            key={stg}
                            className={`p-2 rounded-lg border transition-colors ${
                              isCurrent
                                ? 'bg-[#1E3F20] text-white font-bold border-[#1E3F20]'
                                : isPastOrCurrent
                                ? 'bg-[#EFF6F0] text-[#1E3F20] font-semibold border-[#C5DEC8]'
                                : 'bg-[#FAF7F2] text-[#8C7D70] border-[#E8DEC8]'
                            }`}
                          >
                            <span className="block text-[9px] opacity-75">Step {i + 1}</span>
                            <span className="line-clamp-1">{stg}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Buyer enquiry details & notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                    <span className="font-bold text-[#46392D] block mb-1">
                      Your Message:
                    </span>
                    <p className="text-[#5D5043] leading-relaxed">
                      {enquiry.message}
                    </p>
                    {enquiry.specialRequirements && (
                      <div className="mt-2 pt-2 border-t border-[#E8DEC8] text-[#7A4B29]">
                        <strong>Requirements:</strong> {enquiry.specialRequirements}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-[#FAF4EB] rounded-xl border border-[#E5D7C2]">
                    <span className="font-bold text-[#8C3A20] block mb-1">
                      Artisan Response & Notes:
                    </span>
                    {enquiry.artisanNotes ? (
                      <p className="text-[#5D5043] leading-relaxed">
                        {enquiry.artisanNotes}
                      </p>
                    ) : (
                      <p className="text-[#8C7D70]">
                        {enquiry.status === 'New enquiry'
                          ? 'Awaiting artisan review.'
                          : 'Order active.'}
                      </p>
                    )}

                    {artisan && (
                      <div className="mt-3 pt-2 border-t border-[#E5D7C2] flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-[#2C241E]">Direct Contact:</span>
                        <a
                          href={`tel:${artisan.phone}`}
                          className="flex items-center gap-1 text-[#8C3A20] hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" /> {artisan.phone}
                        </a>
                        <span className="flex items-center gap-1 text-[#25D366]">
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Active
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline History */}
                {enquiry.timeline && enquiry.timeline.length > 0 && (
                  <div className="pt-2 border-t border-[#EFE5D7]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5D] block mb-2">
                      Timeline:
                    </span>
                    <div className="space-y-1.5 text-xs text-[#5D5043]">
                      {enquiry.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#C2593F] shrink-0 mt-0.5" />
                          <span className="font-semibold text-[#2C241E]">{event.status}:</span>
                          <span>{event.note}</span>
                          <span className="text-[10px] text-[#8C7D70] ml-auto">
                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
