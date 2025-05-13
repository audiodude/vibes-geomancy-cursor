import { create } from 'zustand';

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

interface PatternStore extends PatternParameters {
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
  setParameter: (parameter, value) =>
    set((state) => ({ ...state, [parameter]: value })),
  resetParameters: () => set(defaultParameters),
}));
