import React from 'react';
import { ViewMode } from '../types';
import { 
  BookOpen, 
  Activity, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Award,
  Layers,
  Info
} from 'lucide-react';

interface HeaderProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  soundEnabled,
  onToggleSound,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 ring-2 ring-sky-100">
                <span className="text-2xl" role="img" aria-label="Lungs">🫁</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 rounded-md">
                    Media Pembelajaran Interaktif
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-md">
                    IPA Biologi SD
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 font-display">
                  MPI Sistem Pernafasan <span className="text-sky-600">Manusia</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                  Pengembang: <span className="font-semibold text-slate-700">Bapak Asriza Rinandar, S.Pd</span> • <span className="text-slate-500">UPT SPF SD Inpres 105285 Tandam Hilir I</span>
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                id="btn-sound-mobile"
                onClick={onToggleSound}
                className={`p-2 rounded-xl transition border ${
                  soundEnabled
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
                title={soundEnabled ? 'Matikan Suara Narasi' : 'Aktifkan Suara Narasi'}
                aria-label="Toggle suara"
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button
                type="button"
                id="btn-guide-mobile"
                onClick={onOpenGuide}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200"
                title="Panduan Belajar"
                aria-label="Panduan"
              >
                <HelpCircle size={18} />
              </button>
            </div>
          </div>

          {/* Mode Switcher Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              id="tab-poster"
              onClick={() => onSelectMode('poster')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition whitespace-nowrap ${
                currentMode === 'poster'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-1 ring-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Layers size={16} />
              <span>Poster Interaktif</span>
            </button>

            <button
              type="button"
              id="tab-simulator"
              onClick={() => onSelectMode('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition whitespace-nowrap ${
                currentMode === 'simulator'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-1 ring-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Activity size={16} />
              <span>Simulasi Napas</span>
            </button>

            <button
              type="button"
              id="tab-alveolus"
              onClick={() => onSelectMode('alveolus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition whitespace-nowrap ${
                currentMode === 'alveolus'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-1 ring-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Sparkles size={16} />
              <span>Mikroskop Alveolus</span>
            </button>

            <button
              type="button"
              id="tab-game"
              onClick={() => onSelectMode('game')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition whitespace-nowrap ${
                currentMode === 'game'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-1 ring-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Award size={16} />
              <span>Tebak Organ</span>
            </button>

            <button
              type="button"
              id="tab-quiz"
              onClick={() => onSelectMode('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition whitespace-nowrap ${
                currentMode === 'quiz'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-1 ring-sky-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen size={16} />
              <span>Kuis Evaluasi</span>
            </button>

            {/* Desktop Quick Sound & Guide */}
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-200">
              <button
                type="button"
                id="btn-sound-desktop"
                onClick={onToggleSound}
                className={`p-2 rounded-xl transition border text-xs font-semibold flex items-center gap-1.5 ${
                  soundEnabled
                    ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
                title={soundEnabled ? 'Suara Narasi Aktif (Klik untuk Matikan)' : 'Suara Narasi Nonaktif (Klik untuk Aktifkan)'}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span className="hidden lg:inline">{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
              </button>
              <button
                type="button"
                id="btn-guide-desktop"
                onClick={onOpenGuide}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Panduan Belajar"
              >
                <Info size={16} />
                <span className="hidden lg:inline">Panduan</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
