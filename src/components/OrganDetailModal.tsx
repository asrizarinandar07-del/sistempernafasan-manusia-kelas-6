import React from 'react';
import { OrganInfo } from '../types';
import { ORGANS_DATA } from '../data/respiratoryData';
import { X, Volume2, Sparkles, CheckCircle2, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface OrganDetailModalProps {
  organ: OrganInfo | null;
  onClose: () => void;
  onSelectOrgan: (organ: OrganInfo) => void;
  soundEnabled: boolean;
}

export const OrganDetailModal: React.FC<OrganDetailModalProps> = ({
  organ,
  onClose,
  onSelectOrgan,
  soundEnabled,
}) => {
  if (!organ) return null;

  const currentIndex = ORGANS_DATA.findIndex((o) => o.id === organ.id);
  const prevOrgan = ORGANS_DATA[currentIndex > 0 ? currentIndex - 1 : ORGANS_DATA.length - 1];
  const nextOrgan = ORGANS_DATA[currentIndex < ORGANS_DATA.length - 1 ? currentIndex + 1 : 0];

  const handleSpeak = () => {
    const text = `${organ.name}. ${organ.description}. Fungsinya antara lain: ${organ.functions.join('. ')}. Fakta penting: ${organ.keyFact}`;
    playVoiceNarration(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              🫁
            </div>
            <div>
              <div className="flex items-center gap-2">
                {organ.pathwayOrder && (
                  <span className="px-2 py-0.5 rounded-md bg-white/25 text-white font-bold text-[10px] tracking-wider uppercase">
                    Jalur Udara #{organ.pathwayOrder}
                  </span>
                )}
                {organ.altName && (
                  <span className="text-sky-100 text-xs italic">
                    ({organ.altName})
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white mt-0.5">
                {organ.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              title="Dengarkan Penjelasan"
            >
              <Volume2 size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              title="Tutup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Main Description */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-slate-800 text-sm leading-relaxed">
            {organ.description}
          </div>

          {/* Functions list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Fungsi Utama Organ</span>
            </h4>
            <div className="space-y-2">
              {organ.functions.map((fn, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{fn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Fact / Tahukah Kamu */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="p-1.5 rounded-xl bg-amber-200/60 text-amber-800 shrink-0 mt-0.5">
              <Sparkles size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Tahukah Kamu?
              </h5>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed font-medium">
                {organ.keyFact}
              </p>
            </div>
          </div>

          {/* Health Tip */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-emerald-200/60 text-emerald-800 shrink-0">
              <Heart size={16} />
            </div>
            <p className="text-xs text-emerald-900 font-medium">
              <strong>Tips Sehat:</strong> Hirup udara bersih, hindari asap rokok dan polusi, serta minum cukup air putih agar lapisan lendir organ pernapasan tetap lembap dan optimal menyaring kuman.
            </p>
          </div>

        </div>

        {/* Modal Footer with Organ Stepper Navigation */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectOrgan(prevOrgan)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition"
          >
            <ArrowLeft size={14} />
            <span className="truncate max-w-[120px]">{prevOrgan.name}</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium">
            {currentIndex + 1} dari {ORGANS_DATA.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectOrgan(nextOrgan)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 rounded-xl transition"
          >
            <span className="truncate max-w-[120px]">{nextOrgan.name}</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
