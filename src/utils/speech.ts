export const playVoiceNarration = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): (() => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return () => {};
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95; // slightly slower for educational clarity
  utterance.pitch = 1.0;

  // Try finding an Indonesian voice if available
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
};

export const stopVoiceNarration = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
