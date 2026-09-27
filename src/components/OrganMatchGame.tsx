import React, { useState } from 'react';
import { ORGANS_DATA } from '../data/respiratoryData';
import { OrganInfo } from '../types';
import { CheckCircle2, RotateCcw, Award, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playVoiceNarration } from '../utils/speech';

interface OrganMatchGameProps {
  soundEnabled: boolean;
}

export const OrganMatchGame: React.FC<OrganMatchGameProps> = ({ soundEnabled }) => {
  const [targetOrganIndex, setTargetOrganIndex] = useState<number>(0);
  const [completedOrganIds, setCompletedOrganIds] = useState<string[]>([]);
  const [wrongAttemptId, setWrongAttemptId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Shuffle list or present sequentially
  const currentTarget = ORGANS_DATA[targetOrganIndex];

  const handleSelectAnswer = (organ: OrganInfo) => {
    if (isFinished) return;

    if (organ.id === currentTarget.id) {
      // Correct!
      const newCompleted = [...completedOrganIds, organ.id];
      setCompletedOrganIds(newCompleted);
      setWrongAttemptId(null);

      if (soundEnabled) {
        playVoiceNarration(`Tepat sekali! Ini adalah ${organ.name}.`);
      }

      if (newCompleted.length >= ORGANS_DATA.length) {
        setIsFinished(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } else {
        setTargetOrganIndex((prev) => prev + 1);
      }
    } else {
      // Incorrect
      setWrongAttemptId(organ.id);
      setTimeout(() => setWrongAttemptId(null), 1000);
      if (soundEnabled) {
        playVoiceNarration('Belum tepat, coba pilih organ yang lain.');
      }
    }
  };

  const handleRestart = () => {
    setTargetOrganIndex(0);
    setCompletedOrganIds([]);
    setWrongAttemptId(null);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            Game Edukasi Interaktif
          </span>
          <h2 className="text-2xl font-black font-display tracking-tight text-white mt-1">
            Tebak & Pasang Organ Pernapasan
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
            Uji ingatanmu dari letak dan fungsi organ yang ada di poster!
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <Award className="text-amber-300" size={24} />
          <div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold">Progres</div>
            <div className="text-lg font-black text-white">{completedOrganIds.length} / {ORGANS_DATA.length}</div>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Clue & Challenge Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Tantangan #{targetOrganIndex + 1}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Sisa: {ORGANS_DATA.length - completedOrganIds.length} Organ
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 my-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  Petunjuk Ciri-Ciri & Fungsi:
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  "{currentTarget.description}"
                </p>
                <div className="mt-2 text-xs text-emerald-700 bg-white/70 p-2 rounded-xl border border-emerald-100 font-medium">
                  💡 <strong>Fungsi Utama:</strong> {currentTarget.functions[0]}
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium text-center mt-2">
                Pilihlah nama organ yang tepat dari kotak pilihan di sebelah kanan!
              </p>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-6">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedOrganIds.length / ORGANS_DATA.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right: Grid of Organ Choices */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">
              Pilih Organ yang Sesuai:
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {ORGANS_DATA.map((organ) => {
                const isCompleted = completedOrganIds.includes(organ.id);
                const isWrong = wrongAttemptId === organ.id;

                return (
                  <button
                    key={organ.id}
                    type="button"
                    onClick={() => handleSelectAnswer(organ)}
                    disabled={isCompleted}
                    className={`p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 opacity-60 cursor-default'
                        : isWrong
                        ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake'
                        : 'bg-slate-50 hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300 text-slate-800 hover:shadow-xs'
                    }`}
                  >
                    <span className="truncate">{organ.name}</span>
                    {isCompleted && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Finish Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-4xl shadow-lg shadow-emerald-500/30">
            🎉
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              Selamat! Kamu Berhasil Menemukan Semua Organ!
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
              Kamu telah mengidentifikasi seluruh 10 bagian sistem pernapasan manusia dengan sempurna.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 transition shadow-md shadow-emerald-600/20"
          >
            <RotateCcw size={16} />
            <span>Mainkan Lagi</span>
          </button>
        </div>
      )}

    </div>
  );
};
