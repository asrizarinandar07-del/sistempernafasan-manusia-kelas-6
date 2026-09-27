import React, { useState } from 'react';
import { AnatomyDiagram } from './AnatomyDiagram';
import { PathwayPanel } from './PathwayPanel';
import { AlveolusPanel } from './AlveolusPanel';
import { FunctionsPanel } from './FunctionsPanel';
import { ProcessBanner } from './ProcessBanner';
import { OrganInfo } from '../types';
import { ORGANS_DATA, FUN_FACTS } from '../data/respiratoryData';
import { Sparkles, Wind, Info, HeartPulse } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface PosterOverviewProps {
  soundEnabled: boolean;
  onSelectOrgan: (organ: OrganInfo) => void;
  selectedOrgan: OrganInfo | null;
}

export const PosterOverview: React.FC<PosterOverviewProps> = ({
  soundEnabled,
  onSelectOrgan,
  selectedOrgan,
}) => {
  const [isBreathingIn, setIsBreathingIn] = useState<boolean>(true);

  const handleSpeakTitle = () => {
    if (soundEnabled) {
      playVoiceNarration(
        'MPI Sistem Pernafasan Manusia. Media Pembelajaran Interaktif IPA Biologi oleh Bapak Asriza Rinandar, Sarjana Pendidikan, UPT SPF SD Inpres 105285 Tandam Hilir Satu.'
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Matching the Poster Top-Left Title */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
        
        {/* Background decorative air swirl */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <Wind size={220} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Media Pembelajaran Interaktif (MPI)</span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/30 text-white text-xs font-semibold backdrop-blur-xs">
              IPA Biologi
            </span>
          </div>

          <h2
            onClick={handleSpeakTitle}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white drop-shadow-xs cursor-pointer hover:opacity-95 transition"
            title="Klik untuk mendengarkan judul"
          >
            MPI Sistem Pernafasan <span className="text-yellow-300">Manusia</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-sky-100 font-medium mt-2 leading-relaxed max-w-xl">
            Menghirup oksigen, mengeluarkan karbon dioksida untuk menjaga kehidupan.
          </p>

          {/* Developer Credit Badges */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold flex items-center gap-1.5 border border-white/20">
              <span>👨‍🏫 Pengembang:</span>
              <strong className="text-yellow-200">Bapak Asriza Rinandar, S.Pd</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md text-sky-100 font-medium border border-white/15">
              🏫 Unit Tugas: <strong>UPT SPF SD Inpres 105285 Tandam Hilir I</strong>
            </span>
          </div>

          {/* Quick interactive breath toggle */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBreathingIn(!isBreathingIn)}
              className="px-3.5 py-1.5 rounded-xl bg-white text-sky-800 text-xs font-bold hover:bg-sky-50 transition shadow-xs flex items-center gap-1.5"
            >
              <HeartPulse size={14} className="text-rose-500" />
              <span>Ganti Gerak Napas: {isBreathingIn ? 'Tarik Napas (Inspirasi)' : 'Buang Napas (Ekspirasi)'}</span>
            </button>
            <span className="text-xs text-sky-100 hidden sm:inline">
              Klik organ pada diagram untuk melihat detail fungsi
            </span>
          </div>
        </div>

      </div>

      {/* Main Two-Column Layout matching the Poster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Anatomical Model + Underneath: Functions Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Anatomical Model with Left/Right Labels matching poster */}
          <AnatomyDiagram
            selectedOrganId={selectedOrgan?.id || null}
            onSelectOrgan={onSelectOrgan}
            isBreathingIn={isBreathingIn}
            showAirflow={true}
          />

          {/* Fungsi Sistem Pernapasan Panel matching lower left of poster */}
          <FunctionsPanel soundEnabled={soundEnabled} />

        </div>

        {/* Right Column: Pathway Panel + Alveolus Gas Exchange Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Jalur Udara Pernapasan (Top Right of poster) */}
          <PathwayPanel
            soundEnabled={soundEnabled}
            onSelectOrganById={(id) => {
              const o = ORGANS_DATA.find((x) => x.id === id);
              if (o) onSelectOrgan(o);
            }}
          />

          {/* Alveolus (Tempat Pertukaran Gas) (Middle Right of poster) */}
          <AlveolusPanel soundEnabled={soundEnabled} />

        </div>

      </div>

      {/* Bottom Section: Proses Pernapasan (6-Step Flow Banner matching poster bottom) */}
      <ProcessBanner soundEnabled={soundEnabled} />

      {/* Fun Facts Row */}
      <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">✨</span>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
            Fakta Menarik Seputar Paru-Paru & Pernapasan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FUN_FACTS.slice(0, 3).map((fact, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-start gap-3"
            >
              <div className="text-2xl shrink-0 p-1">{fact.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-sky-950">{fact.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{fact.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
