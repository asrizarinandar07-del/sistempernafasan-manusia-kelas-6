import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, Activity, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface AlveolusDetailedViewProps {
  soundEnabled: boolean;
}

export const AlveolusDetailedView: React.FC<AlveolusDetailedViewProps> = ({ soundEnabled }) => {
  const [pulseSpeed, setPulseSpeed] = useState<'normal' | 'fast'>('normal');
  const [activeTab, setActiveTab] = useState<'diffusion' | 'facts' | 'hemoglobin'>('diffusion');

  const handleSpeak = () => {
    if (soundEnabled) {
      playVoiceNarration(
        'Alveolus adalah kantung udara mikroskopis di ujung paru-paru yang tersusun seperti buah anggur. Di sinilah oksigen menembus dinding kapiler menuju sel darah merah, dan karbon dioksida dikeluarkan dari tubuh.'
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Mikroskop Elektron Virtual
              </span>
              <span className="text-xs text-rose-100">Pertukaran Gas Seluler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Alveolus & Jaringan Kapiler Darah
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Paru-paru manusia terdiri dari 300–500 juta kantung alveolus yang sangat tipis, dibalut jaring kapiler untuk memaksimalkan transfer oksigen dan pengeluaran karbon dioksida.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeak}
            className="self-start sm:self-center px-4 py-2 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <Volume2 size={16} />
            <span>Dengarkan Penjelasan</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Zoom Stage */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-lg relative overflow-hidden flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between text-xs mb-3 text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-sky-400">
              <Sparkles size={14} />
              Simulasi Mikroskopis Alveolus & Kapiler
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPulseSpeed(pulseSpeed === 'normal' ? 'fast' : 'normal')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-semibold hover:bg-slate-700"
              >
                Aliran: {pulseSpeed === 'normal' ? 'Normal' : 'Cepat'}
              </button>
            </div>
          </div>

          {/* Large Interactive SVG Microscopic View */}
          <div className="w-full max-w-xl aspect-[16/10] relative my-2">
            <svg
              viewBox="0 0 500 320"
              className="w-full h-full"
            >
              <defs>
                {/* Radial for Alveolus */}
                <radialGradient id="alveolusBig" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#fecdd3" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#9f1239" />
                </radialGradient>

                <linearGradient id="vesselInflow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Capillary vessel channel passing along alveolus */}
              <path
                d="M 20,270 C 120,290 220,260 300,240 C 380,220 440,160 480,120"
                stroke="url(#vesselInflow)"
                strokeWidth="50"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />

              {/* Alveolar Cluster (Grape bunches) */}
              <g className="alveolus-spheres">
                {/* Back clusters */}
                <circle cx="210" cy="110" r="45" fill="url(#alveolusBig)" />
                <circle cx="280" cy="90" r="50" fill="url(#alveolusBig)" />
                <circle cx="150" cy="140" r="40" fill="url(#alveolusBig)" />
                <circle cx="330" cy="140" r="44" fill="url(#alveolusBig)" />

                {/* Main front sacs */}
                <circle cx="210" cy="165" r="55" fill="url(#alveolusBig)" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="290" cy="160" r="52" fill="url(#alveolusBig)" stroke="#fda4af" strokeWidth="1.5" />

                {/* Light reflections */}
                <ellipse cx="195" cy="145" rx="15" ry="8" fill="#ffffff" opacity="0.35" transform="rotate(-30 195 145)" />
                <ellipse cx="275" cy="140" rx="14" ry="7" fill="#ffffff" opacity="0.35" transform="rotate(-30 275 140)" />
              </g>

              {/* Red Blood Cells moving in capillary */}
              <g className={`rbc-cells ${pulseSpeed === 'fast' ? 'animate-pulse' : ''}`}>
                {/* Deoxygenated cells (blue-ish red) entering */}
                <ellipse cx="60" cy="275" rx="16" ry="10" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                <ellipse cx="130" cy="280" rx="16" ry="10" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                
                {/* Mid-exchange cells */}
                <ellipse cx="220" cy="265" rx="17" ry="10" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
                <ellipse cx="300" cy="245" rx="17" ry="10" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />

                {/* Highly oxygenated bright red cells leaving */}
                <ellipse cx="380" cy="205" rx="18" ry="10" fill="#f43f5e" stroke="#dc2626" strokeWidth="1.5" />
                <ellipse cx="450" cy="145" rx="18" ry="10" fill="#f43f5e" stroke="#dc2626" strokeWidth="1.5" />
              </g>

              {/* Diffusion Flow Arrows */}
              {/* O2 entering Blood: Red curved arrows */}
              <path d="M 230,205 C 240,225 245,240 250,255" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
              <polygon points="252,260 245,248 257,248" fill="#ef4444" />
              <text x="262" y="240" fill="#fca5a5" fontSize="13" fontWeight="bold">O₂</text>

              <path d="M 295,200 C 310,215 320,225 330,235" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
              <polygon points="334,238 325,228 335,225" fill="#ef4444" />
              <text x="340" y="225" fill="#fca5a5" fontSize="13" fontWeight="bold">O₂</text>

              {/* CO2 entering Alveolus: Blue curved arrows */}
              <path d="M 170,270 C 175,250 180,230 185,210" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
              <polygon points="186,205 178,215 190,215" fill="#38bdf8" />
              <text x="150" y="235" fill="#7dd3fc" fontSize="13" fontWeight="bold">CO₂</text>

              {/* Microscopic Labels */}
              <rect x="210" y="30" width="130" height="26" rx="13" fill="#0284c7" />
              <text x="275" y="47" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Alveolus (Udara)</text>

              <rect x="25" y="290" width="140" height="24" rx="12" fill="#0369a1" />
              <text x="95" y="306" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Kapiler Darah Halus</text>
            </svg>
          </div>

          {/* Quick Floating Indicators */}
          <div className="w-full flex items-center justify-around gap-2 mt-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse"></span>
              <span className="text-slate-300"><strong>Oksigen (O₂):</strong> Masuk menembus dinding kapiler ke sel darah merah</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50 animate-pulse"></span>
              <span className="text-slate-300"><strong>Karbon Dioksida (CO₂):</strong> Berdifusi keluar dari darah ke rongga alveolus</span>
            </div>
          </div>

        </div>

        {/* Right Tabbed Explanations */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col justify-between">
          
          <div>
            {/* Tabs */}
            <div className="flex rounded-2xl bg-slate-100 p-1 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('diffusion')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                  activeTab === 'diffusion' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Proses Difusi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hemoglobin')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                  activeTab === 'hemoglobin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Hemoglobin
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('facts')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                  activeTab === 'facts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Fakta Unik
              </button>
            </div>

            {/* Tab 1: Proses Difusi */}
            {activeTab === 'diffusion' && (
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <h4 className="font-bold text-sky-900 text-sm mb-1">Apa itu Difusi Gas?</h4>
                  <p className="leading-relaxed">
                    Difusi adalah perpindahan molekul gas dari area yang berkonsentrasi tinggi ke area berkonsentrasi rendah secara pasif tanpa memerlukan energi.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <p>
                      <strong>Dinding Sangat Tipis:</strong> Dinding alveolus dan kapiler hanya setebal satu lapis sel (kurang dari 1 mikrometer)!
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <p>
                      <strong>Kecepatan Kilat:</strong> Pertukaran gas selesai hanya dalam waktu sekitar 0,25 detik saat sel darah melintas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Hemoglobin & Sel Darah Merah */}
            {activeTab === 'hemoglobin' && (
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-bold text-rose-950 text-sm mb-1">Pengangkut Oksigen (Hb)</h4>
                  <p className="leading-relaxed">
                    Oksigen tidak larut begitu saja di dalam air darah, melainkan diikat oleh protein <strong>Hemoglobin</strong> di dalam sel darah merah menjadi <em>Oksihemoglobin</em> (HbO₂).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="leading-relaxed">
                    Setiap satu molekul hemoglobin memiliki 4 atom zat besi (Fe) yang mampu mengikat hingga 4 molekul oksigen sekaligus.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Fakta Anggur Alveolus */}
            {activeTab === 'facts' && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <span className="text-xl">🍇</span>
                  <div>
                    <h5 className="font-bold text-amber-950">Bentuk Mirip Anggur</h5>
                    <p className="text-amber-900 leading-snug mt-0.5">
                      Struktur berlekuk-lekuk seperti buah anggur sengaja dirancang alam untuk melipatgandakan luas area sentuh hingga ratusan kali lipat.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <span className="text-xl">🎾</span>
                  <div>
                    <h5 className="font-bold text-emerald-950">Luas Lapangan Tenis</h5>
                    <p className="text-emerald-900 leading-snug mt-0.5">
                      Jika ratusan juta alveolus di tubuh kita diratakan, permukaannya cukup untuk menutupi seluruh lapangan tenis!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs text-center font-medium">
            ✅ Sesuai kurikulum IPA Biologi tentang Sistem Pernapasan Manusia.
          </div>

        </div>

      </div>

    </div>
  );
};
