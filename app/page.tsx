'use client';

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import FileUpload from '@/app/components/FileUpload';
import Dashboard from '@/app/components/Dashboard';
import { useAnalysisStore } from '@/app/store/analysisStore';

interface AnalysisResult {
  metrics: Record<string, number | string>;
  insights: string[];
  charts: Array<{
    type: string;
    title: string;
    data: any;
  }>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { analyses } = useAnalysisStore();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      // Send to API route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
      setActiveTab('dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze file';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-700 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'upload'
                ? 'border-b-2 border-cyan-500 text-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Upload CSV
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-cyan-500 text-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-slate-800 bg-opacity-50 border border-slate-700 rounded-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400">
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload Your Data</h2>
                <p className="text-slate-400">
                  Upload a CSV or Excel file to analyze with our AI-powered data insights engine.
                </p>
              </div>
              <FileUpload onUpload={handleFileUpload} isLoading={isLoading} />
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && analysisResult ? (
            <Dashboard data={analysisResult} />
          ) : activeTab === 'dashboard' && !analysisResult ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No data analyzed yet. Upload a file to get started.
              </p>
            </div>
          ) : null}
        </div>

        {/* Recent Analyses */}
        {analyses.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Recent Analyses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyses.slice(0, 6).map((analysis, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-cyan-500 transition-colors"
                  onClick={() => {
                    setAnalysisResult(analysis.result);
                    setActiveTab('dashboard');
                  }}
                >
                  <h4 className="font-semibold text-white text-sm mb-2">{analysis.filename}</h4>
                  <p className="text-xs text-slate-400">
                    {new Date(analysis.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
