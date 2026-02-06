'use client';

import { useState } from 'react';
import { DynamicDashboard } from '@/app/utils/dashboardGenerator';
import { DashboardMetrics } from '@/app/utils/dataParser';

export function FileUpload() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const text = await file.text();
      const formData = new FormData();
      formData.append('data', text);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process file');
      }

      const data: DashboardMetrics = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* File Upload Section */}
      {!metrics && (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">📄 Data Analytics</h1>
              <p className="text-lg text-slate-400">Upload your CSV file and get instant insights</p>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 scale-105'
                  : 'border-slate-600 bg-slate-800 bg-opacity-50'
              }`}
            >
              <input
                type="file"
                id="fileInput"
                accept=".csv"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
              />

              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="mb-4 text-5xl">{📁}</div>
                <h2 className="text-2xl font-bold text-white mb-2">Drop your CSV file here</h2>
                <p className="text-slate-400 mb-6">or click to browse</p>

                <button
                  type="button"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? '⏳ Processing...' : '📤 Select CSV File'}
                </button>
              </label>
            </div>

            {/* File Name Display */}
            {fileName && (
              <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-slate-300">
                  <span className="font-semibold">File: </span>
                  {fileName}
                </p>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
                <p className="text-red-300 font-semibold">❌ Error: {error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-6 p-4 bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg">
                <p className="text-blue-300 font-semibold">⏳ Analyzing your data...</p>
              </div>
            )}

            {/* Sample CSV Info */}
            <div className="mt-12 p-6 bg-slate-800 bg-opacity-50 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">📋 CSV Format Example:</h3>
              <pre className="bg-slate-900 p-4 rounded text-sm text-slate-300 overflow-x-auto">
{`Month,Sales,Units,Profit
Jan,5000,100,1200
Feb,6500,150,1600
Mar,4800,120,1100
Apr,7200,180,1800`}
              </pre>
              <p className="text-slate-400 text-sm mt-4">
                💾 First row should be column headers. Numbers will be analyzed automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Section */}
      {metrics && (
        <div className="p-8">
          <div className="mb-8">
            <button
              onClick={() => {
                setMetrics(null);
                setFileName(null);
                setError(null);
              }}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              ⮐ Upload Another File
            </button>
          </div>
          <DynamicDashboard metrics={metrics} />
        </div>
      )}
    </div>
  );
}
