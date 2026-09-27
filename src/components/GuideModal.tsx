import React from 'react';
import { X, Layers, Activity, Sparkles, Award, BookOpen, Volume2, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              📖
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                MPI Sistem Pernafasan Manusia
              </h3>
              <p className="text-xs text-sky-100">Panduan Media Pembelajaran & Identitas</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Developer Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
            <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>👨‍🏫 Identitas Pengembang</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              Bapak Asriza Rinandar, S.Pd
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Unit Tugas: <strong className="text-slate-800">UPT SPF SD Inpres 105285 Tandam Hilir I</strong>
            </div>
            <div className="mt-2 text-[11px] text-sky-900 bg-white/80 p-2 rounded-xl border border-sky-100">
              Media Pembelajaran Interaktif (MPI) ini dikembangkan untuk menunjang pembelajaran IPA Biologi materi sistem pernapasan manusia agar lebih interaktif, mudah dipahami siswa, dan menarik secara visual.
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed">
            Aplikasi ini dilengkapi dengan diagram anatomi wajah & pernapasan manusia realistis, simulasi gerak napas, mikroskop alveolus, serta kuis evaluasi.
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                <Layers size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">1. Poster Interaktif</h4>
                <p className="text-slate-600 mt-0.5">
                  Klik organ atau tombol nama di diagram untuk membuka penjelasan detail, fungsi organ, dan fakta unik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <Activity size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">2. Simulasi Napas (Inspirasi & Ekspirasi)</h4>
                <p className="text-slate-600 mt-0.5">
                  Eksplorasi bagaimana otot diafragma mendatar atau melengkung serta volume paru-paru berubah saat menghirup dan membuang udara.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">3. Mikroskop Alveolus</h4>
                <p className="text-slate-600 mt-0.5">
                  Pelajari difusi oksigen (O₂) dan karbon dioksida (CO₂) di antara kantung alveolus dan jaring kapiler darah.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700 shrink-0 mt-0.5">
                <Award size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">4. Kuis Evaluasi (3 Versi Pilihan Soal)</h4>
                <p className="text-slate-600 mt-0.5">
                  Tersedia 3 versi paket soal bervariasi dengan masing-masing 10 soal (Total 30 soal): <strong>Paket A</strong> (Organ & Jalur Udara), <strong>Paket B</strong> (Mekanisme Napas & Alveolus), dan <strong>Paket C</strong> (Fisiologi & Fakta Sains), lengkap dengan petunjuk, pembahasan, dan audio narasi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                <Volume2 size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">5. Narasi Suara Bahasa Indonesia</h4>
                <p className="text-slate-600 mt-0.5">
                  Dengarkan pembacaan teks otomatis dalam bahasa Indonesia untuk mempermudah belajar mandiri maupun di kelas.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition text-xs sm:text-sm shadow-xs"
          >
            Mengerti & Mulai Belajar
          </button>

        </div>

      </div>
    </div>
  );
};
