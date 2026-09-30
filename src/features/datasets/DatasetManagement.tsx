import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Sliders, 
  ArrowRight, 
  FileText, 
  Layers, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_DATASETS } from '../../services/mockData';
import { Dataset } from '../../types';

export const DatasetManagement: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>(MOCK_DATASETS);
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(MOCK_DATASETS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'quality' | 'preprocessing' | 'features'>('overview');
  const [isPreprocessingRunning, setIsPreprocessingRunning] = useState(false);
  const [preprocessingSuccess, setPreprocessingSuccess] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const runSimulatedPreprocessing = () => {
    setIsPreprocessingRunning(true);
    setPreprocessingSuccess(false);
    setTimeout(() => {
      setIsPreprocessingRunning(false);
      setPreprocessingSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Synthetic Dataset Management</h2>
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-medium">
              Data Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered de-identified synthetic clinical research cohorts ready for quantum feature map encoding and classical ML baselines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Synthetic Dataset</span>
          </button>
        </div>
      </div>

      {/* Dataset Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {datasets.map((ds) => {
          const isSelected = selectedDataset.id === ds.id;
          return (
            <div
              key={ds.id}
              onClick={() => setSelectedDataset(ds)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                  {ds.version}
                </span>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {ds.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 line-clamp-1 mb-1">{ds.name}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{ds.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100 font-mono text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Records</span>
                  <span className="font-semibold">{ds.records.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Features</span>
                  <span className="font-semibold">{ds.features} vars</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dataset Details Workspace with Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Workspace Tab Bar */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-200">
          <div className="flex items-center gap-1">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'schema', label: 'Schema & Types' },
              { key: 'quality', label: 'Data Quality' },
              { key: 'preprocessing', label: 'Preprocessing Pipeline' },
              { key: 'features', label: 'Quantum Feature Encoding' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${
                  activeTab === tab.key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            ID: {selectedDataset.id}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                  <div className="text-xs font-medium text-slate-500">Target Clinical Endpoint</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{selectedDataset.targetVariable}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Binary Classification Target</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                  <div className="text-xs font-medium text-slate-500">Quality Score</div>
                  <div className="text-sm font-bold text-emerald-600 mt-1">{selectedDataset.qualityScore}% Validated</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Zero critical integrity faults</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                  <div className="text-xs font-medium text-slate-500">Anonymization Standard</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">HIPAA Safe Harbor + Diff-Privacy</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Synthetic differential privacy (ε=0.5)</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Class Distribution</h4>
                <div className="space-y-2">
                  {selectedDataset.dataDistribution.map((d, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between font-mono mb-1">
                        <span className="font-semibold text-slate-700">{d.label}</span>
                        <span className="text-slate-500">{d.count} ({d.percentage}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                          style={{ width: `${d.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Feature Name</th>
                    <th className="py-2.5 px-3">Data Type</th>
                    <th className="py-2.5 px-3">Cohort Mean</th>
                    <th className="py-2.5 px-3">Standard Deviation</th>
                    <th className="py-2.5 px-3">Missing Records</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {selectedDataset.schema.map((f, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-800">{f.feature}</td>
                      <td className="py-2 px-3 text-slate-500">{f.type}</td>
                      <td className="py-2 px-3 text-slate-700">{f.mean}</td>
                      <td className="py-2 px-3 text-slate-700">{f.std}</td>
                      <td className="py-2 px-3 text-emerald-600">{f.missing} (0%)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">MISSING VALUES</div>
                  <div className="text-lg font-bold text-slate-800 mt-1">{selectedDataset.missingValuesPct}%</div>
                  <div className="text-emerald-600 text-[10px]">Within tolerance (&lt;1%)</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">DUPLICATE ROWS</div>
                  <div className="text-lg font-bold text-slate-800 mt-1">{selectedDataset.duplicateRows}</div>
                  <div className="text-emerald-600 text-[10px]">Zero duplicates detected</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">OUTLIER FREQUENCY</div>
                  <div className="text-lg font-bold text-slate-800 mt-1">{selectedDataset.outliersPct}%</div>
                  <div className="text-slate-500 text-[10px]">Winsorized at 99.5%</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">INTEGRITY AUDIT</div>
                  <div className="text-lg font-bold text-emerald-600 mt-1">PASSED</div>
                  <div className="text-emerald-600 text-[10px]">SHA-256 Verified</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preprocessing' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Pipeline Stages</h4>
                  <p className="text-xs text-slate-500">Sequential transformations converting raw clinical tables to quantum-ready tensors</p>
                </div>
                <button
                  onClick={runSimulatedPreprocessing}
                  disabled={isPreprocessingRunning}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded text-xs font-semibold transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPreprocessingRunning ? 'animate-spin' : ''}`} />
                  <span>{isPreprocessingRunning ? 'Simulating Pipeline...' : 'Run Preprocessing Pipeline'}</span>
                </button>
              </div>

              {/* Preprocessing visual pipeline steps */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                {[
                  { step: '1. Ingestion', action: 'Schema validation & type casting', done: true },
                  { step: '2. Imputation', action: 'KNN median imputation', done: true },
                  { step: '3. Encoding', action: 'One-hot & Ordinal categorical encoding', done: true },
                  { step: '4. Scaling', action: 'RobustScaler (median centered)', done: true },
                  { step: '5. Selection', action: 'Mutual info feature filtering', done: true },
                  { step: '6. Quantum Prep', action: 'Angle-range mapping [0, 2π]', done: preprocessingSuccess || true },
                ].map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-indigo-700">{s.step}</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">{s.action}</p>
                    </div>
                    <span className="mt-2 text-[9px] font-mono text-emerald-700 uppercase">Ready</span>
                  </div>
                ))}
              </div>

              {preprocessingSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Preprocessing pipeline executed successfully. Features mapped to rotation angles for quantum circuit embedding.</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-lg">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
                  Quantum Feature Map Projection
                </h4>
                <p className="text-xs text-indigo-800 leading-relaxed mb-3">
                  Clinical continuous features are projected into Hilbert state space via non-linear quantum kernels. 
                  Currently using <strong>ZZFeatureMap</strong> (Order 2) with rotational phase angle embedding.
                </p>
                <div className="font-mono text-xs bg-white p-3 rounded border border-indigo-200/80 text-slate-800">
                  U_Φ(x) = exp( i ∑_(j) x_j Z_j + i ∑_(j,k) (π - x_j)(π - x_k) Z_j Z_k )
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Synthetic Dataset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upload Synthetic Research Dataset</h3>
            <p className="text-xs text-slate-500">
              Only synthetic, de-identified or mock research data formatted in CSV, Parquet, or HDF5 may be uploaded in prototype mode.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-500 cursor-pointer transition-colors bg-slate-50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-700">Drag & drop synthetic dataset file here</p>
              <p className="text-[11px] text-slate-400 mt-1">Accepts .csv, .parquet, .json (Max 50MB)</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-xs"
              >
                Ingest & Validate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
