import React, { useState } from 'react';
import { Artisan, Enquiry, EnquiryStatus } from '../types';
import { getArtisanText } from '../i18n/artisanTranslations';
import { Inbox, CheckCircle2, XCircle, MessageCircle, Clock, Phone, Mail } from 'lucide-react';

interface ArtisanEnquiriesProps {
  artisan: Artisan;
  enquiries: Enquiry[];
  onUpdateEnquiryStatus: (enquiryId: string, status: EnquiryStatus, note?: string, agreedPrice?: number) => void;
}

export const ArtisanEnquiries: React.FC<ArtisanEnquiriesProps> = ({
  artisan,
  enquiries,
  onUpdateEnquiryStatus
}) => {
  const lang = artisan.languageCode;
  const [workshopNote, setWorkshopNote] = useState('');

  // Filter enquiries for the active artisan
  const artisanEnquiries = enquiries.filter(e => e.artisanId === artisan.id);

  const handleAdvanceStatus = (enquiry: Enquiry, nextStatus: EnquiryStatus, defaultNote: string) => {
    onUpdateEnquiryStatus(
      enquiry.id,
      nextStatus,
      workshopNote || defaultNote,
      enquiry.agreedPricePerUnit
    );
    setWorkshopNote('');
  };

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'New enquiry':
        return { label: status, bg: 'bg-[#FAF1E3] text-[#8C3A20] border-[#DECFB5]' };
      case 'Accepted':
        return { label: status, bg: 'bg-[#EFF6F0] text-[#1E3F20] border-[#1E3F20]' };
      case 'Discussion in progress':
        return { label: status, bg: 'bg-[#EBF5FB] text-[#2980B9] border-[#A9CCE3]' };
      case 'Order confirmed':
        return { label: status, bg: 'bg-[#F4ECF7] text-[#8E44AD] border-[#D7BDE2]' };
      case 'In progress':
        return { label: status, bg: 'bg-[#FEF9E7] text-[#B7950B] border-[#F9E79F]' };
      case 'Completed':
        return { label: status, bg: 'bg-[#E8F8F5] text-[#117A65] border-[#A3E4D7]' };
      case 'Declined':
        return { label: status, bg: 'bg-[#FDEDEC] text-[#C0392B] border-[#F5B7B1]' };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
          {getArtisanText(lang, 'buyerEnquiries')}
        </h2>
        <p className="text-xs sm:text-sm text-[#6C5D4F] mt-0.5">
          {artisan.name} ({artisan.craftType})
        </p>
      </div>

      {artisanEnquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E3D4BC] p-10 text-center space-y-2">
          <Inbox className="w-10 h-10 text-[#B5A593] mx-auto" />
          <h3 className="font-serif text-base font-bold text-[#2C241E]">
            {getArtisanText(lang, 'noEnquiries')}
          </h3>
        </div>
      ) : (
        <div className="space-y-4">
          {artisanEnquiries.map(enquiry => {
            const badge = getStatusBadge(enquiry.status);

            return (
              <div
                key={enquiry.id}
                className="bg-white rounded-2xl border border-[#E3D4BC] shadow-sm p-5 space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EFE5D7] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C241E]">
                        {enquiry.productName}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>

                    <p className="text-xs text-[#7A6B5D] mt-0.5">
                      {enquiry.buyerName} {enquiry.buyerOrganization ? `(${enquiry.buyerOrganization})` : ''}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                      {getArtisanText(lang, 'quantity')}
                    </span>
                    <span className="font-serif text-base font-bold text-[#2C241E]">
                      {enquiry.requestedQuantity}
                    </span>
                    {enquiry.agreedPricePerUnit && (
                      <span className="text-xs text-[#1E3F20] font-semibold block">
                        ₹{enquiry.agreedPricePerUnit} / unit
                      </span>
                    )}
                  </div>
                </div>

                {/* Buyer Message & Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                    <span className="font-bold text-[#46392D] block mb-1">
                      {getArtisanText(lang, 'buyerMessage')}:
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

                  <div className="p-3 bg-[#FAF4EB] rounded-xl border border-[#E5D7C2] space-y-1.5">
                    <span className="font-bold text-[#8C3A20] block">
                      {getArtisanText(lang, 'buyerCoordinates')}:
                    </span>
                    <div className="space-y-1 text-[#5D5043]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#7A6B5D]" />
                        <span>{enquiry.buyerEmail}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7A6B5D]" />
                        <span>{enquiry.buyerPhone}</span>
                      </div>
                    </div>

                    {enquiry.artisanNotes && (
                      <div className="pt-2 border-t border-[#E5D7C2]">
                        <span className="font-bold text-[#2C241E]">{getArtisanText(lang, 'yourNotes')}:</span>
                        <p className="text-[#5D5043] mt-0.5">{enquiry.artisanNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#EFE5D7] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#6C5D4F]">
                    {getArtisanText(lang, 'currentStatus')}: <strong className="text-[#2C241E]">{enquiry.status}</strong>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {enquiry.status === 'New enquiry' && (
                      <>
                        <button
                          onClick={() => handleAdvanceStatus(enquiry, 'Accepted', 'Artisan accepted enquiry.')}
                          className="px-4 py-1.5 bg-[#1E3F20] hover:bg-[#152E17] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{getArtisanText(lang, 'accept')}</span>
                        </button>
                        <button
                          onClick={() => handleAdvanceStatus(enquiry, 'Declined', 'Artisan declined.')}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>{getArtisanText(lang, 'decline')}</span>
                        </button>
                      </>
                    )}

                    {enquiry.status === 'Accepted' && (
                      <button
                        onClick={() => handleAdvanceStatus(enquiry, 'Discussion in progress', 'Discussion started.')}
                        className="px-4 py-1.5 bg-[#2980B9] hover:bg-[#1F618D] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{getArtisanText(lang, 'startDiscussion')}</span>
                      </button>
                    )}

                    {enquiry.status === 'Discussion in progress' && (
                      <button
                        onClick={() => handleAdvanceStatus(enquiry, 'Order confirmed', 'Order confirmed.')}
                        className="px-4 py-1.5 bg-[#8E44AD] hover:bg-[#71368A] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{getArtisanText(lang, 'confirmOrder')}</span>
                      </button>
                    )}

                    {enquiry.status === 'Order confirmed' && (
                      <button
                        onClick={() => handleAdvanceStatus(enquiry, 'In progress', 'In production.')}
                        className="px-4 py-1.5 bg-[#B7950B] hover:bg-[#9A7D0A] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Clock className="w-4 h-4" />
                        <span>{getArtisanText(lang, 'markInProgress')}</span>
                      </button>
                    )}

                    {enquiry.status === 'In progress' && (
                      <button
                        onClick={() => handleAdvanceStatus(enquiry, 'Completed', 'Order completed and ready.')}
                        className="px-4 py-1.5 bg-[#117A65] hover:bg-[#0E6251] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{getArtisanText(lang, 'markCompleted')}</span>
                      </button>
                    )}

                    {enquiry.status === 'Completed' && (
                      <span className="text-xs font-semibold text-[#117A65] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {getArtisanText(lang, 'orderCompleted')}
                      </span>
                    )}
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
