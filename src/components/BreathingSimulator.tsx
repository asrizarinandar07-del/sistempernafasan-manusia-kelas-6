import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, ArrowDown, ArrowUp, Activity, Gauge, Sparkles } from 'lucide-react';
import { playVoiceNarration } from '../utils/speech';

interface BreathingSimulatorProps {
  soundEnabled: boolean;
}

export const BreathingSimulator: React.FC<BreathingSimulatorProps> = ({ soundEnabled }) => {
  const [isInhaling, setIsInhaling] = useState<boolean>(true);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [breathPace, setBreathPace] = useState<'relax' | 'normal' | 'exercise'>('normal');
  const [breathCount, setBreathCount] = useState<number>(1);

  // Speed timings in ms
  const paceTiming = {
    relax: 4500,
    normal: 3000,
    exercise: 1500,
  }[breathPace];

  useEffect(() => {
    let interval: any;
    if (isAutoCycling) {
      interval = setInterval(() => {
        setIsInhaling((prev) => {
          if (!prev) {
            setBreathCount((c) => c + 1);
          }
          return !prev;
        });
      }, paceTiming);
    }
    return () => clearInterval(interval);
  }, [isAutoCycling, paceTiming]);

  const handleManualToggle = (inhale: boolean) => {
    setIsAutoCycling(false);
    setIsInhaling(inhale);
    if (soundEnabled) {
      if (inhale) {
        playVoiceNarration('Inspirasi: Diafragma berkontraksi dan mendatar. Rongga dada membesar, tekanan turun, udara kaya oksigen masuk.');
      } else {
        playVoiceNarration('Ekspirasi: Diafragma berelaksasi dan melengkung ke atas. Rongga dada mengecil, tekanan naik, udara kaya karbon dioksida dihembuskan keluar.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Laboratorium Virtual
              </span>
              <span className="text-xs text-sky-100">Fisiologi Biologi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Simulasi Mekanisme Pernapasan
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Amati bagaimana diafragma, rongga dada, dan paru-paru bekerja sama dalam proses <strong>Inspirasi</strong> (menarik napas) dan <strong>Ekspirasi</strong> (menghembuskan napas).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <Activity className="text-white animate-pulse" size={20} />
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-bold">Total Siklus</div>
              <div className="text-lg font-black text-white">{breathCount} Siklus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Graphic Animation of Lungs, Ribcage, and Diaphragm */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Status Badge */}
          <div className="w-full flex items-center justify-between mb-2">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                isInhaling
                  ? 'bg-sky-100 text-sky-800 border border-sky-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {isInhaling ? <ArrowDown size={14} className="text-sky-600" /> : <ArrowUp size={14} className="text-amber-600" />}
              <span>{isInhaling ? 'INSPIRASI (Menarik Napas / Udara Masuk)' : 'EKSPIRASI (Membuang Napas / Udara Keluar)'}</span>
            </div>

            <div className="text-xs text-slate-400 font-semibold">
              {isAutoCycling ? 'Siklus Otomatis' : 'Mode Manual'}
            </div>
          </div>

          {/* SVG Animated Breathing Model */}
          <div className="w-full max-w-md aspect-square relative my-2">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-md"
            >
              <defs>
                <linearGradient id="lungSimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="diaphragmSimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>
              </defs>

              {/* Human Torso, Neck & Chest outline */}
              <path
                d="M 60,370 
                   C 60,300 95,240 145,220 
                   L 165,60 
                   C 165,40 180,30 200,30 
                   C 220,30 235,40 235,60 
                   L 255,220 
                   C 305,240 340,300 340,370 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* Clavicle / Collarbone lines */}
              <path d="M 140,230 Q 170,245 195,235" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              <path d="M 205,235 Q 230,245 260,230" stroke="#cbd5e1" strokeWidth="2" fill="none" />

              {/* Trachea tube */}
              <rect x="190" y="30" width="20" height="90" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              {[42, 54, 66, 78, 90, 102].map((y, i) => (
                <line key={i} x1="190" y1={y} x2="210" y2={y} stroke="#0284c7" strokeWidth="1.5" />
              ))}

              {/* Bronchial forks */}
              <path d="M 200,120 L 160,160 M 200,120 L 240,160" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />

              {/* Lungs - Expanding / Contracting dynamically */}
              {/* Right Lung */}
              <g
                style={{
                  transformOrigin: '150px 210px',
                  transform: isInhaling ? 'scale(1.12)' : 'scale(0.92)',
                  transition: `transform ${paceTiming * 0.9}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <path
                  d="M 190,140 C 150,130 110,160 110,230 C 110,275 160,285 188,270 Z"
                  fill="url(#lungSimGradient)"
                  stroke="#be123c"
                  strokeWidth="2"
                />
              </g>

              {/* Left Lung */}
              <g
                style={{
                  transformOrigin: '250px 210px',
                  transform: isInhaling ? 'scale(1.12)' : 'scale(0.92)',
                  transition: `transform ${paceTiming * 0.9}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <path
                  d="M 210,140 C 250,130 290,160 290,230 C 290,275 240,285 212,270 Z"
                  fill="url(#lungSimGradient)"
                  stroke="#be123c"
                  strokeWidth="2"
                />
              </g>

              {/* Otot Diafragma: Flattened down during Inhalation, Domed up during Exhalation */}
              <path
                d={
                  isInhaling
                    ? 'M 100,310 Q 200,305 300,310 L 300,330 Q 200,325 100,330 Z'
                    : 'M 100,310 Q 200,265 300,310 L 300,330 Q 200,285 100,330 Z'
                }
                fill="url(#diaphragmSimGradient)"
                stroke="#9a3412"
                strokeWidth="2.5"
                style={{
                  transition: `all ${paceTiming * 0.9}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />

              {/* Diaphragm motion arrow */}
              <g
                style={{
                  transformOrigin: '200px 335px',
                  transition: `all ${paceTiming * 0.9}ms ease-in-out`,
                }}
              >
                {isInhaling ? (
                  <path d="M 200,320 L 200,345 M 195,340 L 200,345 L 205,340" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                ) : (
                  <path d="M 200,305 L 200,280 M 195,285 L 200,280 L 205,285" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                )}
              </g>

              {/* Airflow Particles inside trachea */}
              {isInhaling ? (
                // Blue O2 flowing down
                <g className="animate-pulse">
                  <circle cx="200" cy="45" r="3.5" fill="#0284c7" />
                  <circle cx="200" cy="70" r="3.5" fill="#0284c7" />
                  <circle cx="200" cy="95" r="3.5" fill="#0284c7" />
                  <path d="M 197,110 L 175,145 M 203,110 L 225,145" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" />
                </g>
              ) : (
                // Orange CO2 flowing up
                <g className="animate-pulse">
                  <circle cx="200" cy="95" r="3.5" fill="#ea580c" />
                  <circle cx="200" cy="70" r="3.5" fill="#ea580c" />
                  <circle cx="200" cy="45" r="3.5" fill="#ea580c" />
                  <path d="M 175,145 L 197,110 M 225,145 L 203,110" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="3 3" />
                </g>
              )}

              {/* Annotations */}
              <text x="200" y="22" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">
                {isInhaling ? 'Udara Masuk (O₂)' : 'Udara Keluar (CO₂)'}
              </text>
              <text x="200" y="365" textAnchor="middle" fill="#9a3412" fontSize="12" fontWeight="bold">
                {isInhaling ? 'Diafragma Mendatar (Kontraksi)' : 'Diafragma Melengkung ke Atas (Relaksasi)'}
              </text>
            </svg>
          </div>

          {/* Interactive Control Buttons */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleManualToggle(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isInhaling && !isAutoCycling
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <ArrowDown size={14} />
              <span>Tarik Napas (Inspirasi)</span>
            </button>

            <button
              type="button"
              onClick={() => handleManualToggle(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                !isInhaling && !isAutoCycling
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <ArrowUp size={14} />
              <span>Buang Napas (Ekspirasi)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isAutoCycling
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {isAutoCycling ? <Pause size={14} /> : <Play size={14} />}
              <span>{isAutoCycling ? 'Jeda Siklus Otomatis' : 'Mulai Siklus Otomatis'}</span>
            </button>
          </div>

        </div>

        {/* Right: Scientific Physics & Fisiologi Meters */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Dynamic Mechanics Summary Box */}
          <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Mekanisme Saat Ini:
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isInhaling ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {isInhaling ? 'Fase Inspirasi' : 'Fase Ekspirasi'}
              </span>
            </div>

            {/* Parameter Meters */}
            <div className="space-y-2.5 text-xs">
              
              {/* Diafragma State */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Otot Diafragma:</span>
                <span className="font-bold text-slate-900">
                  {isInhaling ? 'Berkontraksi (Mendatar)' : 'Berelaksasi (Melengkung)'}
                </span>
              </div>

              {/* Volume Rongga Dada */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Volume Rongga Dada:</span>
                <span className="font-bold text-slate-900">
                  {isInhaling ? 'Membesar (Mengembang)' : 'Mengecil (Mengempis)'}
                </span>
              </div>

              {/* Tekanan Udara */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Tekanan Paru-paru:</span>
                <span className="font-bold text-slate-900">
                  {isInhaling ? 'Menurun (< Tekanan Luar)' : 'Meningkat (> Tekanan Luar)'}
                </span>
              </div>

              {/* Arah Aliran Gas */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Arah Aliran Gas:</span>
                <span className="font-bold text-slate-900">
                  {isInhaling ? 'O₂ Masuk ke Paru-Paru' : 'CO₂ Keluar ke Udara Bebas'}
                </span>
              </div>

            </div>

            {/* Educational Law of Physics Note */}
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900 leading-relaxed">
              <strong>Hukum Fisika (Hukum Boyle):</strong> Saat volume rongga dada membesar, tekanan di dalam paru-paru menurun, sehingga udara dari luar terhisap masuk secara alami.
            </div>
          </div>

          {/* Speed / Pace Selector */}
          <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Pilih Kecepatan Bernapas
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBreathPace('relax')}
                className={`p-2.5 rounded-2xl border text-center transition ${
                  breathPace === 'relax'
                    ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">Santai</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~12x / menit</div>
              </button>

              <button
                type="button"
                onClick={() => setBreathPace('normal')}
                className={`p-2.5 rounded-2xl border text-center transition ${
                  breathPace === 'normal'
                    ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">Normal</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~16x / menit</div>
              </button>

              <button
                type="button"
                onClick={() => setBreathPace('exercise')}
                className={`p-2.5 rounded-2xl border text-center transition ${
                  breathPace === 'exercise'
                    ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">Olahraga</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~30x / menit</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
