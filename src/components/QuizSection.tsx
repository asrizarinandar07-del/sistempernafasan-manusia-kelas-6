import React, { useState } from 'react';
import { QUIZ_PACKAGES } from '../data/respiratoryData';
import { QuizPackage } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  Layers, 
  Activity, 
  BookOpen, 
  ArrowRight,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playVoiceNarration } from '../utils/speech';

interface QuizSectionProps {
  soundEnabled: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ soundEnabled }) => {
  const [activePackageId, setActivePackageId] = useState<'paket-a' | 'paket-b' | 'paket-c'>('paket-a');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedPackages, setCompletedPackages] = useState<{ [pkgId: string]: number }>({});

  const activePackage = QUIZ_PACKAGES.find((p) => p.id === activePackageId) || QUIZ_PACKAGES[0];
  const questions = activePackage.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectPackage = (pkgId: 'paket-a' | 'paket-b' | 'paket-c') => {
    if (pkgId === activePackageId && !showResults) return;
    setActivePackageId(pkgId);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setShowResults(false);
    setShowHint(false);

    if (soundEnabled) {
      const selected = QUIZ_PACKAGES.find((p) => p.id === pkgId);
      if (selected) {
        playVoiceNarration(`Memilih ${selected.title}. Terdiri dari 10 soal.`);
      }
    }
  };

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(newScore);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: selectedOption,
    }));

    if (soundEnabled) {
      if (isCorrect) {
        playVoiceNarration('Jawaban kamu benar! ' + currentQ.explanation);
      } else {
        playVoiceNarration('Jawaban belum tepat. ' + currentQ.explanation);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      // Quiz finished
      setShowResults(true);
      const finalScorePoints = score * 10;
      setCompletedPackages((prev) => ({
        ...prev,
        [activePackageId]: Math.max(prev[activePackageId] || 0, finalScorePoints),
      }));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      if (soundEnabled) {
        playVoiceNarration(
          `Selamat! Kamu menyelesaikan ${activePackage.title} dengan nilai ${finalScorePoints} dari 100.`
        );
      }
    }
  };

  const handleRestartCurrentQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setShowResults(false);
    setShowHint(false);
  };

  const handleSpeakQuestion = () => {
    if (soundEnabled && currentQ) {
      playVoiceNarration(
        `Pertanyaan nomor ${currentQuestionIndex + 1}: ${currentQ.question}`
      );
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  const getPackageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers size={18} />;
      case 'Activity':
        return <Activity size={18} />;
      case 'Sparkles':
      default:
        return <Sparkles size={18} />;
    }
  };

  // Find next package to recommend after completion
  const packageOrder: Array<'paket-a' | 'paket-b' | 'paket-c'> = ['paket-a', 'paket-b', 'paket-c'];
  const currentPkgIndex = packageOrder.indexOf(activePackageId);
  const nextPkgId = packageOrder[(currentPkgIndex + 1) % packageOrder.length];
  const nextPackage = QUIZ_PACKAGES.find((p) => p.id === nextPkgId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header Banner with Evaluator Info */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 text-white rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              Asesmen & Evaluasi
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold">
              3 Pilihan Versi Kuis (10 Soal Tiap Paket)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Kuis Evaluasi Pernapasan Manusia
          </h2>
          <p className="text-sky-100 text-xs sm:text-sm mt-0.5 max-w-xl">
            Pilih paket soal di bawah untuk menguji pemahaman organ, mekanisme gerak inspirasi-ekspirasi, pertukaran gas alveolus, dan fakta sains.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shrink-0">
          <Award className="text-amber-300" size={24} />
          <div>
            <div className="text-[10px] text-sky-200 uppercase font-bold">Skor Paket Aktif</div>
            <div className="text-lg font-black text-white">{score} / {questions.length}</div>
          </div>
        </div>
      </div>

      {/* Package Selector Cards (3 Pilihan Versi Kuis) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-sky-600" />
            <span>Pilih Versi Paket Soal (Masing-masing 10 Soal):</span>
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            Total 30 Soal Bervariasi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUIZ_PACKAGES.map((pkg) => {
            const isActive = pkg.id === activePackageId;
            const completedScore = completedPackages[pkg.id];
            const isFinished = completedScore !== undefined;

            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => handleSelectPackage(pkg.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`p-1.5 rounded-xl ${
                      isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getPackageIcon(pkg.iconName)}
                    </span>
                    
                    {isFinished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Check size={10} />
                        <span>Nilai: {completedScore}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        10 Soal
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-xs sm:text-sm leading-snug ${
                    isActive ? 'text-sky-950' : 'text-slate-800'
                  }`}>
                    {pkg.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                  <span className={isActive ? 'text-sky-700' : 'text-slate-500'}>
                    {pkg.badge}
                  </span>
                  <span className={`text-xs ${isActive ? 'text-sky-700 font-bold' : 'text-slate-400'}`}>
                    {isActive ? '● Sedang Aktif' : 'Pilih Paket →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!showResults ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
          
          {/* Header of Active Package in Question Box */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-800 text-xs font-bold">
                {activePackage.title}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                • {activePackage.badge}
              </span>
            </div>
            
            {soundEnabled && (
              <button
                type="button"
                onClick={handleSpeakQuestion}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Dengarkan soal"
              >
                <Volume2 size={14} className="text-sky-600" />
                <span>Bacakan Soal</span>
              </button>
            )}
          </div>

          {/* Progress Bar & Counter */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Soal {currentQuestionIndex + 1} dari {questions.length}</span>
              <span>Skor Sementara: {score * 10} / 100 ({score} Benar)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-display">
              {currentQ.question}
            </h3>

            {showHint && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Petunjuk Guru:</strong> {currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswer;
              
              let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300 text-slate-800';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-200';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
                } else {
                  optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-sky-50 border-sky-500 text-sky-950 font-bold ring-2 ring-sky-200';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isSubmitted && isCorrectAnswer && (
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle size={20} className="text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box After Submitting */}
          {isSubmitted && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles size={16} />
                <span>{selectedOption === currentQ.correctAnswer ? 'Hebat! Jawaban Tepat' : 'Pembahasan Jawaban:'}</span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {!showHint && !isSubmitted ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-1 transition"
              >
                <HelpCircle size={14} />
                <span>Butuh Petunjuk?</span>
              </button>
            ) : (
              <div></div>
            )}

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs ${
                  selectedOption !== null
                    ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Kunci Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 transition shadow-xs cursor-pointer"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Asesmen'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Final Results Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center mx-auto text-3xl shadow-lg shadow-sky-500/30">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : '📚'}
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
              Hasil Asesmen: {activePackage.title}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-2">
              {percentage >= 80
                ? 'Luar Biasa! Pemahaman Materi Sangat Baik!'
                : percentage >= 60
                ? 'Bagus Sekali! Terus Tingkatkan!'
                : 'Tetap Semangat! Pelajari Kembali Materinya!'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Kamu telah menyelesaikan 10 pertanyaan pada {activePackage.title}.
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 max-w-sm mx-auto">
            <div className="text-4xl sm:text-5xl font-black font-display text-sky-600">
              {score * 10} <span className="text-lg text-slate-400 font-semibold">/ 100</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Benar {score} dari {questions.length} soal ({percentage}%)
            </div>
          </div>

          {/* Overview of All 3 Packages */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Status Capaian 3 Versi Kuis:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {QUIZ_PACKAGES.map((pkg) => {
                const pkgScore = completedPackages[pkg.id];
                return (
                  <div
                    key={pkg.id}
                    className={`p-2.5 rounded-xl border text-xs ${
                      pkg.id === activePackageId
                        ? 'bg-sky-50 border-sky-300 font-semibold text-sky-900'
                        : pkgScore !== undefined
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="font-bold truncate">{pkg.title.split(':')[0]}</div>
                    <div className="text-[11px] mt-0.5">
                      {pkgScore !== undefined ? `Nilai: ${pkgScore}/100` : 'Belum Dikerjakan'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestartCurrentQuiz}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <RotateCcw size={16} />
              <span>Ulangi Paket Ini</span>
            </button>

            {nextPackage && nextPackage.id !== activePackageId && (
              <button
                type="button"
                onClick={() => handleSelectPackage(nextPackage.id)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-sky-600/20"
              >
                <span>Lanjut ke {nextPackage.title.split(':')[0]}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
