export interface OrganInfo {
  id: string;
  name: string;
  altName?: string;
  description: string;
  functions: string[];
  keyFact: string;
  pathwayOrder?: number;
  position: { x: number; y: number }; // percentage on anatomy diagram
  labelPos: 'left' | 'right';
  badgeColor?: string;
}

export interface AirwayStep {
  step: number;
  name: string;
  description: string;
  detail: string;
  iconType: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  tag: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface QuizPackage {
  id: 'paket-a' | 'paket-b' | 'paket-c';
  title: string;
  badge: string;
  description: string;
  iconName: string;
  colorTheme: string;
  questions: QuizQuestion[];
}

export type ViewMode = 'poster' | 'simulator' | 'alveolus' | 'game' | 'quiz';
