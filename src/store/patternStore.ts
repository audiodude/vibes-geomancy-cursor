import { create } from 'zustand';

export interface Oscillator {
  id: string;
  name: string;
  targetParameter: keyof PatternParameters;
  frequency: number;
  amplitude: number;
  enabled: boolean;
}

export interface PatternParameters {
  // Geometric parameters
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  size: number;
  rotation: number;
  scale: number;

  // Animation parameters
  position: number; // Static position value
  opacity: number;
  color: string;

  // Pattern parameters
  density: number;
  spacing: number;
  symmetry: number;

  // Advanced parameters
  noise: number;
  complexity: number;
  numShapes: number;
}

export interface PatternStore extends PatternParameters {
  oscillators: Oscillator[];
  addOscillator: (oscillator: Omit<Oscillator, 'id'>) => void;
  updateOscillator: (id: string, updates: Partial<Oscillator>) => void;
  removeOscillator: (id: string) => void;
  setParameter: <K extends keyof PatternParameters>(
    parameter: K,
    value: PatternParameters[K],
  ) => void;
  resetParameters: () => void;
}

const defaultParameters: PatternParameters = {
  shape: 'circle',
  size: 50,
  rotation: 0,
  scale: 1,
  position: 0, // Default static position
  opacity: 0.8,
  color: '#0ea5e9',
  density: 5,
  spacing: 20,
  symmetry: 4,
  noise: 0.2,
  complexity: 3,
  numShapes: 12,
};

export const usePatternStore = create<PatternStore>((set) => ({
  ...defaultParameters,
  oscillators: [],
  addOscillator: (oscillator) =>
    set((state) => ({
      ...state,
      oscillators: [
        ...state.oscillators,
        { ...oscillator, id: Math.random().toString() },
      ],
    })),
  updateOscillator: (id, updates) =>
    set((state) => ({
      ...state,
      oscillators: state.oscillators.map((oscillator) =>
        oscillator.id === id ? { ...oscillator, ...updates } : oscillator,
      ),
    })),
  removeOscillator: (id) =>
    set((state) => ({
      ...state,
      oscillators: state.oscillators.filter(
        (oscillator) => oscillator.id !== id,
      ),
    })),
  setParameter: (parameter, value) =>
    set((state) => ({ ...state, [parameter]: value })),
  resetParameters: () => set(defaultParameters),
}));
