'use client';

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import DataForm from '@/app/components/DataForm';
import Results from '@/app/components/Results';
import Dashboard from '@/app/components/Dashboard';
import { useAnalysisStore } from '@/app/store/analysisStore';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard'>('form');
  const { analyses } = useAnalysisStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'form'
                  ? 'border-b-2 border-cyan-500 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Analyze Data
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-b-2 border-cyan-500 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              History ({analyses.length})
            </button>
          </div>
        </div>

        {activeTab === 'form' ? (
          <>
            <DataForm />
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </main>
  );
}
