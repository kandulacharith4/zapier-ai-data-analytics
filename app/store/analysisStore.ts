import { create } from 'zustand';

export interface AnalysisResult {
  id: string;
  input: string;
  analysisType: 'complete' | 'statistics' | 'trend';
  insights: string;
  timestamp: Date;
  statistics?: {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
  };
}

interface AnalysisStore {
  analyses: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
  addAnalysis: (analysis: AnalysisResult) => void;
  clearAnalyses: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analyses: [],
  isLoading: false,
  error: null,
  addAnalysis: (analysis) =>
    set((state) => ({
      analyses: [analysis, ...state.analyses],
    })),
  clearAnalyses: () => set({ analyses: [] }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
