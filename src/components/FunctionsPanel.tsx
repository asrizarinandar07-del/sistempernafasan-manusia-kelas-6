import React, { useState } from 'react';
import { FUNCTIONS_LIST } from '../data/respiratoryData';
import { CheckCircle2, ChevronDown, ChevronUp, Volume2, Flame, ShieldAlert, Sparkles, Wind } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface FunctionsPanelProps {
  soundEnabled: boolean;
}

export const FunctionsPanel: React.FC<FunctionsPanelProps> = ({ soundEnabled }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    const newIdx = expandedIndex === idx ? null : idx;
    setExpandedIndex(newIdx);
    if (newIdx !== null && soundEnabled) {
      const item = FUNCTIONS_LIST[newIdx];
      playVoiceNarration(`${item.title}. ${item.desc}`);
    }
  };

  const getIconForIndex = (idx: number) => {
    switch (idx) {
      case 0: return <Wind size={16} className="text-sky-600" />;
      case 1: return <ShieldAlert size={16} className="text-rose-600" />;
      case 2: return <Sparkles size={16} className="text-indigo-600" />;
      case 3: return <Flame size={16} className="text-amber-600" />;
      default: return <CheckCircle2 size={16} className="text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col justify-between">
      
      {/* Title Banner matching poster */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-sky-600 text-white font-display font-bold text-sm sm:text-base shadow-xs">
          <span>Fungsi Sistem Pernapasan</span>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          4 Peran Utama Kehidupan
        </span>
      </div>

      {/* 4 Functions with Green Circle Checkmarks */}
      <div className="flex flex-col gap-2.5">
        {FUNCTIONS_LIST.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-100 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-3 flex items-start gap-3 justify-between"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  {/* Green Checkmark Circle matching poster */}
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full inline-block mt-1">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 text-slate-400 mt-1">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expandable Explanation Details */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0 text-xs text-slate-600 border-t border-sky-100 mt-1.5 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white shadow-xs shrink-0 mt-1">
                    {getIconForIndex(idx)}
                  </div>
                  <p className="leading-relaxed text-slate-700 pt-1">
                    {item.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-slate-500 text-center font-medium bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100">
        💡 Klik setiap fungsi untuk membaca penjelasan sains lengkap
      </div>

    </div>
  );
};
