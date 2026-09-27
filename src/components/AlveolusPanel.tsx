import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface AlveolusPanelProps {
  soundEnabled: boolean;
}

export const AlveolusPanel: React.FC<AlveolusPanelProps> = ({ soundEnabled }) => {
  const [isDiffusing, setIsDiffusing] = useState<boolean>(true);
  const [diffusionCount, setDiffusionCount] = useState<number>(0);

  const handleSpeak = () => {
    if (soundEnabled) {
      playVoiceNarration(
        'Alveolus adalah tempat pertukaran gas. Oksigen dari udara masuk ke dalam kapiler darah, sedangkan karbon dioksida keluar dari darah untuk dihembuskan. Paru-paru kita memiliki ratusan juta alveolus yang bergerombol seperti buah anggur.'
      );
    }
  };

  const handleSimulatePulse = () => {
    setDiffusionCount((c) => c + 1);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col justify-between">
      
      {/* Header Banner matching poster */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-sky-600 text-white font-display font-bold text-sm sm:text-base shadow-xs">
          <span>Alveolus (Tempat Pertukaran Gas)</span>
        </div>
        <button
          type="button"
          onClick={handleSpeak}
          className="p-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition"
          title="Dengarkan Penjelasan"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Interactive Microscopic Alveolus Graphic */}
      <div className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 rounded-2xl p-4 overflow-hidden border border-slate-800">
        
        {/* SVG Graphic of Grape-Like Alveolus Cluster & Capillary Network */}
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto drop-shadow-md"
        >
          <defs>
            <radialGradient id="alveolusSphere" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="40%" stopColor="#f43f5e" />
              <stop offset="80%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>

            <radialGradient id="rbcGradient" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>

            <linearGradient id="capillaryRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <linearGradient id="capillaryBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Background Capillaries Network Wrapping the Alveolus */}
          <g className="capillary-network" opacity="0.85">
            {/* Blue deoxygenated vessel coming in */}
            <path
              d="M 20,40 C 60,60 70,120 110,140 C 140,160 160,190 200,210"
              stroke="#0284c7"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            {/* Capillary mesh transition */}
            <path
              d="M 110,140 C 150,110 180,110 220,130 C 260,150 280,180 320,180"
              stroke="#9333ea"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Red oxygenated vessel leaving */}
            <path
              d="M 220,130 C 260,100 290,80 370,60"
              stroke="#ef4444"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Cluster of Alveolus Sacs (Like Grapes) */}
          <g className="alveolus-cluster">
            {/* Back spheres */}
            <circle cx="160" cy="90" r="28" fill="url(#alveolusSphere)" />
            <circle cx="210" cy="85" r="32" fill="url(#alveolusSphere)" />
            <circle cx="250" cy="115" r="30" fill="url(#alveolusSphere)" />
            <circle cx="145" cy="130" r="26" fill="url(#alveolusSphere)" />

            {/* Front spheres */}
            <circle cx="180" cy="120" r="35" fill="url(#alveolusSphere)" stroke="#fda4af" strokeWidth="1" />
            <circle cx="225" cy="125" r="33" fill="url(#alveolusSphere)" stroke="#fda4af" strokeWidth="1" />
            <circle cx="195" cy="155" r="30" fill="url(#alveolusSphere)" stroke="#fda4af" strokeWidth="1" />
            <circle cx="160" cy="165" r="24" fill="url(#alveolusSphere)" stroke="#fda4af" strokeWidth="1" />
            
            {/* Specular highlight spots */}
            <ellipse cx="170" cy="110" rx="9" ry="5" fill="#ffffff" opacity="0.4" transform="rotate(-20 170 110)" />
            <ellipse cx="215" cy="115" rx="8" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-20 215 115)" />
          </g>

          {/* Animated Gas Diffusion Particles */}
          {isDiffusing && (
            <g className="diffusion-particles">
              {/* Oxygen (O2) diffusing OUT of Alveolus INTO Capillary (Red path) */}
              <g className="o2-particles animate-pulse">
                <circle cx="270" cy="115" r="5" fill="#ef4444" />
                <circle cx="295" cy="100" r="6" fill="#f87171" />
                <circle cx="320" cy="80" r="5.5" fill="#ef4444" />
              </g>

              {/* Carbon Dioxide (CO2) diffusing OUT of Blood INTO Alveolus (Blue path) */}
              <g className="co2-particles animate-pulse">
                <circle cx="115" cy="160" r="5" fill="#38bdf8" />
                <circle cx="135" cy="140" r="6" fill="#0284c7" />
                <circle cx="150" cy="115" r="5" fill="#38bdf8" />
              </g>
            </g>
          )}

          {/* Dynamic Gas Exchange Arrows Matching Poster */}
          
          {/* O2 Arrow (Red) */}
          <g className="o2-arrow">
            <path
              d="M 255,115 C 290,105 315,100 340,95"
              stroke="#ef4444"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#arrowRed)"
            />
            <polygon points="345,95 335,88 335,102" fill="#ef4444" />
          </g>

          {/* CO2 Arrow (Blue) */}
          <g className="co2-arrow">
            <path
              d="M 330,155 C 300,165 270,165 240,160"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="235,160 245,153 245,167" fill="#38bdf8" />
          </g>

          {/* Text Labels on Graphic */}
          <g className="svg-labels font-display">
            {/* Alveolus Tag */}
            <rect x="300" y="25" width="85" height="24" rx="12" fill="#0284c7" />
            <text x="342" y="41" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Alveolus</text>
            <line x1="300" y1="37" x2="235" y2="85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Kapiler Darah Tag */}
            <rect x="25" y="195" width="105" height="24" rx="12" fill="#0284c7" />
            <text x="77" y="211" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kapiler darah</text>
            <line x1="120" y1="195" x2="160" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </svg>

        {/* Dynamic Legend Tags on Right matching poster */}
        <div className="absolute right-3 top-16 flex flex-col gap-2.5">
          {/* O2 Label */}
          <div className="bg-slate-900/90 backdrop-blur-xs border border-rose-500/40 rounded-xl px-2.5 py-1.5 shadow-sm text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-extrabold text-rose-400 text-xs">O₂ (oksigen)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-300">masuk ke darah</p>
          </div>

          {/* CO2 Label */}
          <div className="bg-slate-900/90 backdrop-blur-xs border border-sky-500/40 rounded-xl px-2.5 py-1.5 shadow-sm text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-extrabold text-sky-400 text-xs">CO₂ (karbon dioksida)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-300">keluar dari darah</p>
          </div>
        </div>

      </div>

      {/* Inset Note Callout: "Paru-paru terdiri dari jutaan alveolus yang sangat kecil seperti anggur." */}
      <div className="mt-3 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center shrink-0 text-xl">
          🍇
        </div>
        <p className="text-xs text-sky-950 font-medium leading-relaxed">
          <strong className="text-sky-700 font-bold">Tahukah Kamu?</strong> Paru-paru kita tersusun dari sekitar <span className="font-bold text-sky-800">300–500 juta</span> alveolus mikroskopis yang bergerombol seperti buah anggur, memberikan permukaan kontak gas yang sangat luas!
        </p>
      </div>

    </div>
  );
};
