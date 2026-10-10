import React from 'react';
import { X, CheckCircle2, AlertTriangle, Cpu, Terminal, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface EvaluationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickRunBenchmark: () => void;
}

export const EvaluationGuideModal: React.FC<EvaluationGuideModalProps> = ({
  isOpen,
  onClose,
  onQuickRunBenchmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECFB5] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#96371D] to-[#C2593F] text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F7D8C4] block">
              Evaluator & Hackathon Guide
            </span>
            <h2 className="font-serif text-2xl font-bold mt-1">
              Artisan Connect Evaluation Manual
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-[#46392D] leading-relaxed">
          
          {/* Section 1: The Benchmark Verification */}
          <div className="bg-white p-5 rounded-xl border border-[#E3D4BC] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-[#2C241E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1E3F20]" />
                1. Hackathon Demonstration Benchmark Test
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onQuickRunBenchmark();
                }}
                className="px-3 py-1.5 bg-[#1E3F20] text-white text-xs font-semibold rounded-lg hover:bg-[#152E17] transition-colors flex items-center gap-1.5"
              >
                <span>Run Test Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-xs text-[#6C5D4F] mb-4">
              When a buyer requests <strong>100 Handmade cotton bags</strong>:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#EFF6F0] border-l-4 border-[#1E3F20] rounded-r-lg">
                <p className="font-bold text-[#1E3F20]">
                  ✅ Artisan A (Rameshwar Lal Chhipa) — Strong Match (~96%)
                </p>
                <p className="text-[#365039] mt-0.5">
                  150 bags in stock (&gt;100 requested), bulk orders accepted, exact craft match.
                </p>
              </div>

              <div className="p-3 bg-[#FEF2F2] border-l-4 border-[#DC2626] rounded-r-lg">
                <p className="font-bold text-[#DC2626]">
                  ❌ Artisan B (Bhaskarachari V.) — Not a Strong Match (&lt;25%)
                </p>
                <p className="text-[#7F1D1D] mt-0.5">
                  Artisan specializes in Channapatna Wooden Toys. Marked as craft mismatch and excluded from strong recommendations.
                </p>
              </div>

              <div className="p-3 bg-[#FFFBEB] border-l-4 border-[#D97706] rounded-r-lg">
                <p className="font-bold text-[#D97706]">
                  ⚠️ Artisan C (Sunita Devi Meena) — Partial Match (Insufficient Stock) (~68%)
                </p>
                <p className="text-[#92400E] mt-0.5">
                  Exact craft match for handmade cotton bags, but only <strong>20 units available</strong> (80 unit shortfall). Explicitly labeled as <em>Partial match (Insufficient stock)</em>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Step-by-Step Buyer to Artisan Workflow */}
          <div className="bg-white p-5 rounded-xl border border-[#E3D4BC] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#2C241E] mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C2593F]" />
              2. End-to-End Buyer-to-Artisan Workflow
            </h3>
            
            <ol className="space-y-3 text-xs list-decimal list-inside text-[#5D5043]">
              <li className="pl-1">
                <strong>Submit Smart Match Request:</strong> In Buyer view, go to <em>Smart Match Engine</em>, enter "Handmade cotton bags" (or click the 1-click Benchmark button), quantity 100, and click <em>Find Artisan Matches</em>.
              </li>
              <li className="pl-1">
                <strong>Send Direct Enquiry:</strong> On Artisan A's match card, click <em>Send Enquiry / Order Request</em>. Add a custom message and hit Submit.
              </li>
              <li className="pl-1">
                <strong>Switch Role to Artisan:</strong> Click <em>Artisan</em> in the top navigation bar. Select <em>Artisan A</em> in the profile switcher and go to <em>Buyer Enquiries</em>.
              </li>
              <li className="pl-1">
                <strong>Accept & Progress Order:</strong> Click <em>Accept Enquiry</em>. Notice the status change. Next, click <em>Start Discussion</em>, then <em>Confirm Order</em>, and finally <em>Mark Completed</em>.
              </li>
              <li className="pl-1">
                <strong>Verify Persistence:</strong> Switch back to <em>Buyer</em> &rarr; <em>My Enquiries</em>. The status is immediately updated. Refresh the browser page (F5) — all demo state remains intact via localStorage!
              </li>
            </ol>
          </div>

          {/* Section 3: Transparent Architecture & Future Backend Hooks */}
          <div className="bg-white p-5 rounded-xl border border-[#E3D4BC] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#2C241E] mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#8C3A20]" />
              3. Working Demo vs External Production Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <h4 className="font-bold text-[#1E3F20] mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Working In This Prototype
                </h4>
                <ul className="space-y-1 text-[#5D5043]">
                  <li>• Transparent JS Smart Matching algorithm</li>
                  <li>• Stock capacity checks & partial match labeling</li>
                  <li>• 16 artisans & 32 authentic Indian products</li>
                  <li>• AI Catalogue Heuristic Synthesizer</li>
                  <li>• Voice input prompts & Web Speech API</li>
                  <li>• 6-stage Enquiry-to-Order lifecycle</li>
                  <li>• LocalStorage persistence across reloads</li>
                  <li>• Seamless role switching without auth barriers</li>
                </ul>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <h4 className="font-bold text-[#8C3A20] mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  Production Backend (Future Step)
                </h4>
                <ul className="space-y-1 text-[#5D5043]">
                  <li>• Python FastAPI backend service</li>
                  <li>• Scikit-Learn TF-IDF & cosine similarity</li>
                  <li>• Pandas multi-criteria ranking pipeline</li>
                  <li>• Direct Gemini API server-side endpoint</li>
                  <li>• Multilingual speech-to-text in 12 Indian languages</li>
                  <li>• UPI Escrow & Logistics tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Rule Reminder */}
          <div className="p-4 bg-[#FAF1E3] border border-[#DECFB5] rounded-xl text-xs text-[#7A4B29]">
            <strong>Core Platform Principle:</strong> Artisan Connect never prompts the buyer to input a budget. The artisan sets their price, and conscious buyers negotiate directly with the artisan.
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2EADB] border-t border-[#DECFB5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Got it, Let's Test!
          </button>
        </div>

      </div>
    </div>
  );
};
