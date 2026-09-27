import React, { useState, useEffect } from 'react';
import { AIRWAY_STEPS } from '../data/respiratoryData';
import { Play, Pause, Volume2, ArrowRight } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface PathwayPanelProps {
  soundEnabled: boolean;
  onSelectOrganById?: (id: string) => void;
}

export const PathwayPanel: React.FC<PathwayPanelProps> = ({
  soundEnabled,
  onSelectOrganById,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto]);

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
    setIsPlayingAuto(false);
    const stepData = AIRWAY_STEPS.find((s) => s.step === stepNum);
    if (soundEnabled && stepData) {
      playVoiceNarration(`Nomor ${stepData.step}, ${stepData.name}. ${stepData.description}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col justify-between">
      
      {/* Header Pill Banner matching poster */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-sky-600 text-white font-display font-bold text-sm sm:text-base shadow-xs">
          <span>Jalur Udara Pernapasan</span>
        </div>
        <button
          type="button"
          onClick={() => setIsPlayingAuto(!isPlayingAuto)}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-xl border transition ${
            isPlayingAuto
              ? 'bg-amber-50 text-amber-700 border-amber-300'
              : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
          }`}
        >
          {isPlayingAuto ? <Pause size={13} /> : <Play size={13} />}
          <span>{isPlayingAuto ? 'Jeda Alur' : 'Putar Jalur (1-5)'}</span>
        </button>
      </div>

      {/* Main Content Layout: Head Cross-Section Illustration on Left, Step List on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Left: Cutaway Head / Neck Cross-Section Graphic */}
        <div className="sm:col-span-5 bg-gradient-to-b from-sky-50 to-blue-50/60 rounded-2xl p-3 border border-sky-100 flex flex-col items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 200 240"
            className="w-full max-w-[185px] h-auto drop-shadow-sm"
          >
            <defs>
              <linearGradient id="pathSkinFace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="40%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="pathHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <radialGradient id="pathIris" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#1c1917" />
              </radialGradient>
            </defs>

            {/* Realistic Human Head & Face Contour Profile */}
            <path
              d="M 55,100
                 C 48,50 70,20 110,15 
                 C 135,12 155,25 162,40 
                 C 166,48 168,58 167,68 
                 C 165,72 163,75 162,78 
                 C 163,80 174,90 185,98 
                 C 187,100 186,103 182,105 
                 C 178,107 175,108 172,108 
                 C 173,112 178,116 177,120 
                 C 177,122 173,124 169,124 
                 C 172,127 174,131 173,135 
                 C 171,138 166,139 163,139 
                 C 167,143 170,148 168,153 
                 C 166,157 158,162 146,162 
                 C 134,162 122,154 116,145 
                 L 116,230 
                 L 60,230 
                 L 60,180 
                 C 50,155 50,125 55,100 Z"
              fill="url(#pathSkinFace)"
              stroke="#fb923c"
              strokeWidth="1.5"
            />

            {/* Realistic Hair */}
            <path
              d="M 50,110 
                 C 45,60 65,22 105,12 
                 C 132,6 155,18 165,35 
                 C 168,44 166,52 154,52 
                 C 140,52 130,42 110,42 
                 C 85,42 72,65 70,95 
                 C 68,110 60,115 50,110 Z"
              fill="url(#pathHair)"
            />
            {/* Sideburn in front of ear */}
            <rect x="95" y="80" width="4" height="15" fill="#1e293b" rx="1" />

            {/* Cheek & Soft Shading */}
            <ellipse cx="135" cy="105" rx="14" ry="10" fill="#fb7185" opacity="0.2" />

            {/* Eyebrow */}
            <path d="M 142,66 Q 155,62 164,66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Realistic Eye in Profile */}
            <g className="pathway-eye">
              <path d="M 146,76 Q 154,71 160,76 Q 154,81 146,76 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="154" cy="76" r="3" fill="url(#pathIris)" />
              <circle cx="155" cy="76" r="1.4" fill="#020617" />
              <circle cx="155.8" cy="75.2" r="0.7" fill="#ffffff" />
              <path d="M 144,75 Q 154,69 162,75" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>

            {/* Realistic Nose tip highlight & Nostril */}
            <ellipse cx="182" cy="98" rx="2" ry="1.5" fill="#ffffff" opacity="0.5" />
            <ellipse cx="174" cy="106" rx="3" ry="1.6" fill="#431407" transform="rotate(-15 174 106)" />

            {/* Realistic Lips */}
            <path d="M 171,116 C 175,116 178,118 177,121 C 175,122 171,123 168,123 Z" fill="#e11d48" />
            <line x1="168" y1="123" x2="175" y2="122" stroke="#881337" strokeWidth="1" strokeLinecap="round" />
            <path d="M 168,124 C 173,124 176,128 174,132 C 171,134 166,134 163,133 Z" fill="#e11d48" />

            {/* Realistic Ear Profile */}
            <path
              d="M 88,88 
                 C 80,90 77,98 78,108 
                 C 79,116 85,119 89,117 
                 C 92,115 93,110 92,106 
                 C 90,102 86,101 86,94 
                 C 86,91 90,89 88,88 Z"
              fill="#fdb883"
              stroke="#ea580c"
              strokeWidth="1.2"
            />
            <ellipse cx="88" cy="104" rx="2.5" ry="3.5" fill="#c2410c" opacity="0.3" />

            {/* Internal Cavities Translucent Mask */}
            {/* Nasal Cavity (1) */}
            <path
              d="M 174,105 C 150,95 125,98 110,105 C 100,115 115,125 135,125 C 155,125 168,120 172,114 Z"
              fill={activeStep === 1 ? '#0284c7' : '#bae6fd'}
              stroke="#0369a1"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />

            {/* Oral Cavity & Tongue (2) */}
            <path
              d="M 168,125 C 155,124 135,128 120,135 C 115,145 125,150 140,150 C 155,150 165,142 168,136 Z"
              fill={activeStep === 2 ? '#0284c7' : '#fbcfe8'}
              stroke="#be185d"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />
            {/* Tongue */}
            <path d="M 130,145 C 145,140 160,142 165,145" stroke="#e11d48" strokeWidth="2.5" fill="none" />

            {/* Pharynx (Faring - 3) */}
            <path
              d="M 110,105 C 100,118 98,145 105,175 L 118,175 C 112,150 112,125 120,112 Z"
              fill={activeStep === 3 ? '#0284c7' : '#93c5fd'}
              stroke="#1d4ed8"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />

            {/* Larynx (Laring - 4) */}
            <rect
              x="104"
              y="178"
              width="18"
              height="20"
              rx="4"
              fill={activeStep === 4 ? '#0284c7' : '#c7d2fe'}
              stroke="#4338ca"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />

            {/* Trachea (Trakea - 5) */}
            <rect
              x="105"
              y="202"
              width="16"
              height="35"
              rx="3"
              fill={activeStep === 5 ? '#0284c7' : '#7dd3fc'}
              stroke="#0284c7"
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />
            <line x1="105" y1="210" x2="121" y2="210" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="105" y1="218" x2="121" y2="218" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="105" y1="226" x2="121" y2="226" stroke="#0369a1" strokeWidth="1.5" />

            {/* Number Badges On Diagram */}
            {/* 1 - Hidung */}
            <circle cx="155" cy="108" r="8" fill="#1d4ed8" />
            <text x="155" y="111" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1</text>
            
            {/* 2 - Mulut */}
            <circle cx="155" cy="138" r="8" fill="#1d4ed8" />
            <text x="155" y="141" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">2</text>

            {/* 3 - Faring */}
            <circle cx="92" cy="148" r="8" fill="#1d4ed8" />
            <text x="92" y="151" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">3</text>

            {/* 4 - Laring */}
            <circle cx="92" cy="188" r="8" fill="#1d4ed8" />
            <text x="92" y="191" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">4</text>

            {/* 5 - Trakea */}
            <circle cx="92" cy="222" r="8" fill="#1d4ed8" />
            <text x="92" y="225" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">5</text>

            {/* Airway Blue Arrows (Matching the exact blue arrows in the poster) */}
            <path
              d="M 185,98 Q 165,100 145,108 T 115,130 T 112,175 T 113,225"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="4 3"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
          </svg>

          <span className="text-[10px] text-slate-500 mt-1 font-medium text-center">
            Aliran udara masuk dari hidung/mulut menuju paru-paru
          </span>
        </div>

        {/* Right: The 5-Step List Matching the Poster */}
        <div className="sm:col-span-7 flex flex-col gap-2">
          {AIRWAY_STEPS.map((item) => {
            const isSelected = activeStep === item.step;
            return (
              <div
                key={item.step}
                onClick={() => handleStepClick(item.step)}
                className={`p-2.5 rounded-2xl cursor-pointer transition-all duration-200 border flex items-start gap-3 ${
                  isSelected
                    ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-200 shadow-xs scale-101'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {/* Numbered circular badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-sky-700 text-white'
                  }`}
                >
                  {item.step}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    {soundEnabled && isSelected && (
                      <Volume2 size={13} className="text-sky-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
