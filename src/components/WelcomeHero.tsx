import React from 'react';
import { UserRole } from '../types';
import { Store, ShoppingBag, ArrowRight, HelpCircle } from 'lucide-react';

interface WelcomeHeroProps {
  onSelectRole: (role: UserRole) => void;
  onOpenGuide: () => void;
  onQuickRunBenchmark: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onSelectRole,
  onOpenGuide,
  onQuickRunBenchmark
}) => {
  return (
    <div className="py-12 sm:py-20 max-w-3xl mx-auto text-center">
      
      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2C241E]">
        Artisan Connect
      </h1>

      {/* Two Direct Options with NO descriptions under them */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
        
        {/* Continue as Artisan */}
        <button
          onClick={() => onSelectRole('artisan')}
          className="p-8 bg-white hover:bg-[#FAF4EB] rounded-2xl border-2 border-[#E3D4BC] hover:border-[#C2593F] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#C2593F] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Store className="w-7 h-7" />
          </div>
          <span className="font-serif text-xl font-bold text-[#2C241E] group-hover:text-[#C2593F] transition-colors">
            Continue as Artisan
          </span>
        </button>

        {/* Continue as Buyer */}
        <button
          onClick={() => onSelectRole('buyer')}
          className="p-8 bg-white hover:bg-[#F2F6F3] rounded-2xl border-2 border-[#D2E2D5] hover:border-[#1E3F20] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1E3F20] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <span className="font-serif text-xl font-bold text-[#2C241E] group-hover:text-[#1E3F20] transition-colors">
            Continue as Buyer
          </span>
        </button>

      </div>

      {/* Quick Benchmark Button */}
      <div className="mt-12 flex items-center justify-center gap-3">
        <button
          onClick={onQuickRunBenchmark}
          className="px-4 py-2 bg-[#1E3F20] hover:bg-[#152E17] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Run Demo Benchmark (100 Cotton Bags)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onOpenGuide}
          className="px-3.5 py-2 bg-white hover:bg-[#FAF7F2] border border-[#D5C6AF] text-[#6C5D4F] text-xs font-medium rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Guide</span>
        </button>
      </div>

    </div>
  );
};
