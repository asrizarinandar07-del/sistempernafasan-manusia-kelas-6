import React, { useState } from 'react';
import { ViewMode, OrganInfo } from './types';
import { Header } from './components/Header';
import { PosterOverview } from './components/PosterOverview';
import { BreathingSimulator } from './components/BreathingSimulator';
import { AlveolusDetailedView } from './components/AlveolusDetailedView';
import { QuizSection } from './components/QuizSection';
import { OrganMatchGame } from './components/OrganMatchGame';
import { OrganDetailModal } from './components/OrganDetailModal';
import { GuideModal } from './components/GuideModal';
import { stopVoiceNarration } from './utils/speech';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ViewMode>('poster');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedOrgan, setSelectedOrgan] = useState<OrganInfo | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      if (prev) {
        stopVoiceNarration();
      }
      return !prev;
    });
  };

  const handleSelectMode = (mode: ViewMode) => {
    setCurrentMode(mode);
    stopVoiceNarration();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Application Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Learning Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentMode === 'poster' && (
          <PosterOverview
            soundEnabled={soundEnabled}
            onSelectOrgan={(organ) => setSelectedOrgan(organ)}
            selectedOrgan={selectedOrgan}
          />
        )}

        {currentMode === 'simulator' && (
          <BreathingSimulator soundEnabled={soundEnabled} />
        )}

        {currentMode === 'alveolus' && (
          <AlveolusDetailedView soundEnabled={soundEnabled} />
        )}

        {currentMode === 'game' && (
          <OrganMatchGame soundEnabled={soundEnabled} />
        )}

        {currentMode === 'quiz' && (
          <QuizSection soundEnabled={soundEnabled} />
        )}
      </main>

      {/* Modal for Organ Details */}
      <OrganDetailModal
        organ={selectedOrgan}
        onClose={() => setSelectedOrgan(null)}
        onSelectOrgan={(organ) => setSelectedOrgan(organ)}
        soundEnabled={soundEnabled}
      />

      {/* Guide & Tutorial Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Educational Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl border border-sky-100 shadow-2xs">
              🫁
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                MPI Sistem Pernafasan Manusia
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Pengembang: <strong className="text-sky-800">Bapak Asriza Rinandar, S.Pd</strong> • Unit Tugas: <strong className="text-slate-700">UPT SPF SD Inpres 105285 Tandam Hilir I</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
              IPA Biologi SD
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="text-sky-600 hover:text-sky-700 font-bold hover:underline"
            >
              Panduan & Profil Pengembang
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
