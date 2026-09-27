import React, { useState, useEffect } from 'react';
import { PROCESS_STEPS } from '../data/respiratoryData';
import { Play, Pause, ChevronRight, ChevronLeft, Volume2, Sparkles, CheckCircle } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface ProcessBannerProps {
  soundEnabled: boolean;
}

export const ProcessBanner: React.FC<ProcessBannerProps> = ({ soundEnabled }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= 6) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectStep = (stepNum: number) => {
    setActiveStep(stepNum);
    setIsPlaying(false);
    const step = PROCESS_STEPS.find((s) => s.step === stepNum);
    if (soundEnabled && step) {
      playVoiceNarration(`Langkah ${step.step}: ${step.title}. ${step.subtitle}. ${step.description}`);
    }
  };

  const handlePrev = () => {
    const nextStep = activeStep <= 1 ? 6 : activeStep - 1;
    handleSelectStep(nextStep);
  };

  const handleNext = () => {
    const nextStep = activeStep >= 6 ? 1 : activeStep + 1;
    handleSelectStep(nextStep);
  };

  // Helper graphics for each step matching the poster
  const renderStepGraphic = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        // Boy inhaling air through nose/mouth
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-100 flex items-center justify-center relative overflow-hidden border border-sky-200">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              {/* Profile head */}
              <circle cx="35" cy="40" r="22" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 20,30 Q 35,15 50,30 Q 45,45 35,45 Z" fill="#1e293b" />
              {/* Nose profile */}
              <path d="M 45,35 L 56,42 L 48,46" stroke="#fb923c" strokeWidth="2" fill="none" />
              {/* Air entering arrows */}
              <path d="M 68,36 L 56,40 M 68,43 L 56,44 M 68,50 L 56,47" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-sky-700 bg-white/90 px-1 rounded-sm">Masuk</span>
          </div>
        );
      case 2:
        // Lungs diagram with trachea and bronchi
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-50 flex items-center justify-center relative overflow-hidden border border-rose-200">
            <svg viewBox="0 0 80 80" className="w-full h-full p-1.5">
              {/* Trachea */}
              <rect x="37" y="10" width="6" height="22" rx="2" fill="#38bdf8" />
              {/* Right & left lungs */}
              <path d="M 37,28 C 25,25 15,35 15,55 C 15,68 32,70 38,62 Z" fill="#f43f5e" />
              <path d="M 43,28 C 55,25 65,35 65,55 C 65,68 48,70 42,62 Z" fill="#e11d48" />
              {/* Bronchi forks */}
              <path d="M 40,28 L 28,45 M 40,28 L 52,45" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-rose-700 bg-white/90 px-1 rounded-sm">Paru</span>
          </div>
        );
      case 3:
        // Alveoli grape cluster
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-50 flex items-center justify-center relative overflow-hidden border border-red-200">
            <svg viewBox="0 0 80 80" className="w-full h-full p-2">
              <circle cx="34" cy="32" r="10" fill="#fb7185" />
              <circle cx="48" cy="34" r="11" fill="#fda4af" />
              <circle cx="36" cy="48" r="12" fill="#f43f5e" />
              <circle cx="48" cy="48" r="11" fill="#e11d48" />
              <circle cx="42" cy="40" r="9" fill="#fecdd3" stroke="#e11d48" strokeWidth="1" />
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-red-700 bg-white/90 px-1 rounded-sm">Gas</span>
          </div>
        );
      case 4:
        // Red Blood Cells carrying O2
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-100 flex items-center justify-center relative overflow-hidden border border-rose-300">
            <svg viewBox="0 0 80 80" className="w-full h-full p-1.5">
              {/* Blood vessel */}
              <rect x="5" y="20" width="70" height="40" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              {/* Red blood cell disc */}
              <ellipse cx="38" cy="40" rx="18" ry="12" fill="#dc2626" />
              <ellipse cx="38" cy="40" rx="10" ry="6" fill="#b91c1c" />
              {/* O2 molecule badge */}
              <circle cx="48" cy="34" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <text x="48" y="38" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">O₂</text>
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-rose-800 bg-white/90 px-1 rounded-sm">Darah</span>
          </div>
        );
      case 5:
        // Boy exhaling CO2 out through nose/mouth
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-100 flex items-center justify-center relative overflow-hidden border border-sky-200">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <circle cx="35" cy="40" r="22" fill="#fed7aa" />
              <path d="M 20,30 Q 35,15 50,30 Q 45,45 35,45 Z" fill="#1e293b" />
              <path d="M 45,35 L 56,42 L 48,46" stroke="#fb923c" strokeWidth="2" fill="none" />
              {/* Exhaled air leaving */}
              <path d="M 52,40 L 68,36 M 52,44 L 68,43 M 52,47 L 68,50" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-sky-700 bg-white/90 px-1 rounded-sm">Keluar</span>
          </div>
        );
      case 6:
        // Cheerful healthy energetic student
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-100 flex items-center justify-center relative overflow-hidden border border-amber-300">
            <svg viewBox="0 0 80 80" className="w-full h-full p-1">
              {/* Raised arms */}
              <path d="M 22,35 L 14,18 M 58,35 L 66,18" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              {/* Cheerful head */}
              <circle cx="40" cy="32" r="16" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 26,26 Q 40,14 54,26" fill="#1e293b" />
              {/* Smile */}
              <path d="M 33,36 Q 40,44 47,36" stroke="#ea580c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Eyes */}
              <circle cx="34" cy="30" r="2" fill="#1e293b" />
              <circle cx="46" cy="30" r="2" fill="#1e293b" />
              {/* Shirt collar */}
              <polygon points="40,48 30,58 50,58" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <polygon points="40,54 38,68 42,68" fill="#ef4444" />
            </svg>
            <span className="absolute bottom-1 right-1 text-[10px] font-bold text-amber-700 bg-white/90 px-1 rounded-sm">Sehat</span>
          </div>
        );
      default:
        return null;
    }
  };

  const currentStepData = PROCESS_STEPS.find((s) => s.step === activeStep)!;

  return (
    <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm">
      
      {/* Top Banner Header matching poster */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-sky-600 text-white font-display font-bold text-base sm:text-lg shadow-xs self-start">
          <span>Proses Pernapasan</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Langkah Sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              isPlaying
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-sky-600 hover:bg-sky-700 text-white border-sky-700 shadow-xs'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Jeda Otomatis' : 'Putar Alur 1-6'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Langkah Selanjutnya"
          >
            <ChevronRight size={16} />
          </button>

          {soundEnabled && (
            <button
              type="button"
              onClick={() => handleSelectStep(activeStep)}
              className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition"
              title="Dengarkan Langkah Aktif"
            >
              <Volume2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* The 6 Responsive Step Cards - Grid Layout matching the bottom row of the poster */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PROCESS_STEPS.map((item) => {
          const isSelected = activeStep === item.step;
          return (
            <div
              key={item.step}
              onClick={() => handleSelectStep(item.step)}
              className={`p-3 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center text-center border relative ${
                isSelected
                  ? 'bg-sky-50/90 border-sky-400 ring-2 ring-sky-300 shadow-md scale-102 z-10'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Number Badge at Top matching poster */}
              <div className="w-full flex items-center justify-start gap-1.5 mb-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                    isSelected ? 'bg-sky-600 ring-2 ring-sky-200' : 'bg-sky-700'
                  }`}
                >
                  {item.step}
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate text-left">
                  {item.title}
                </h4>
              </div>

              {/* Graphic Icon Thumbnail */}
              <div className="my-1 transition-transform group-hover:scale-105">
                {renderStepGraphic(item.step)}
              </div>

              {/* Subtitle text matching poster */}
              <p className="text-[11px] text-slate-600 font-medium mt-2 line-clamp-3 leading-snug">
                {item.subtitle}
              </p>

              {/* Step indicator bar */}
              <div
                className={`w-full h-1 rounded-full mt-2.5 transition-colors ${
                  isSelected ? 'bg-sky-600' : 'bg-slate-200'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Expanded Active Step Detail Box */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
            {currentStepData.step}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                {currentStepData.badge}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-sm font-bold text-slate-900">
                {currentStepData.title} ({currentStepData.subtitle})
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-3xl">
              {currentStepData.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="px-3 py-1.5 rounded-xl bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 font-bold text-xs shrink-0 self-end sm:self-center transition shadow-2xs"
        >
          Lanjut ke Langkah {activeStep >= 6 ? 1 : activeStep + 1} →
        </button>
      </div>

    </div>
  );
};
