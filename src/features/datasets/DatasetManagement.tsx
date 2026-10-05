import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_DATASETS } from '../../services/mockData';
import { Dataset } from '../../types';
import { DatasetSourceBadge } from '../../components/common/DatasetSourceBadge';
import { ALL_DATASET_METADATA } from '../../services/datasetRegistry';

export const DatasetManagement: React.FC = () => {
  const [datasets] = useState<Dataset[]>(MOCK_DATASETS);
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(MOCK_DATASETS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'quality' | 'preprocessing' | 'features' | 'sources'>('overview');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-stone-900">Clinical & Synthetic Dataset Registry</h2>
            <span className="text-xs px-2.5 py-0.5 bg-amber-500/15 text-amber-950 border border-amber-400/40 rounded-full font-bold backdrop-blur-xs">
              Verified Public Benchmarks
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed max-w-2xl">
            Authoritative clinical research cohorts from the <strong>UCI Machine Learning Repository</strong> and <strong>PhysioNet</strong>, along with de-identified cohorts synthesized with differential privacy (ε=0.5) for hybrid quantum variational classifiers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sources')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/85 hover:bg-white text-stone-800 border border-amber-200/80 rounded-xl text-xs font-bold shadow-2xs backdrop-blur-xs transition-all hover:border-amber-400"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Dataset Sources ({ALL_DATASET_METADATA.length})</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Synthetic Cohort</span>
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
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'glass-card border-amber-500 ring-2 ring-amber-400/40 shadow-xs'
                  : 'bg-white/80 border-amber-200/50 hover:bg-white/95 hover:border-amber-300 shadow-2xs backdrop-blur-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-900 border border-amber-300/40 rounded-full font-bold">
                    {ds.version}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/15 border border-emerald-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {ds.status}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-stone-900 line-clamp-1 mb-1">{ds.name}</h3>
                <p className="text-[11px] text-stone-600 line-clamp-2 mb-3 leading-relaxed">{ds.description}</p>
              </div>
              
              <div>
                {/* Verified Source Direct Link & Popover */}
                <div className="mb-3 pt-1 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-mono">Source:</span>
                  <DatasetSourceBadge datasetId={ds.id} variant="link" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-amber-200/40 font-mono text-stone-700">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Records</span>
                    <span className="font-extrabold text-stone-900">{ds.records.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Features</span>
                    <span className="font-extrabold text-stone-900">{ds.features} vars</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dataset Details Workspace with Tabs */}
      <div className="glass-card rounded-2xl shadow-xs overflow-hidden border border-amber-200/60">
        {/* Workspace Tab Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 pt-3 border-b border-amber-200/40 gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'schema', label: 'Schema & Types' },
              { key: 'quality', label: 'Data Quality' },
              { key: 'preprocessing', label: 'Preprocessing Pipeline' },
              { key: 'features', label: 'Quantum Feature Encoding' },
              { key: 'sources', label: 'Verified Public Sources (All)' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap -mb-px ${
                  activeTab === tab.key
                    ? 'border-amber-600 text-amber-950 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-900 hover:border-amber-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-amber-800 font-bold self-end sm:self-center pb-2 sm:pb-0">
            Active ID: {selectedDataset.id}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Verified Authoritative Dataset Source Card */}
              <DatasetSourceBadge datasetId={selectedDataset.id} variant="card" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Target Clinical Endpoint</div>
                  <div className="text-sm font-black text-stone-900 mt-1">{selectedDataset.targetVariable}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Binary Classification Target</div>
                </div>
                <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Quality Score</div>
                  <div className="text-sm font-black text-emerald-700 mt-1">{selectedDataset.qualityScore}% Validated</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Zero critical integrity faults</div>
                </div>
                <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Anonymization Standard</div>
                  <div className="text-sm font-black text-stone-900 mt-1">HIPAA Safe Harbor + Diff-Privacy</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Synthetic differential privacy (ε=0.5)</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-2">Class Distribution</h4>
                <div className="space-y-2">
                  {selectedDataset.dataDistribution.map((d, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between font-mono mb-1">
                        <span className="font-bold text-stone-800">{d.label}</span>
                        <span className="text-stone-500">{d.count} ({d.percentage}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-amber-100/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 0 ? 'bg-amber-600' : 'bg-rose-500'}`}
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
            <div className="overflow-x-auto rounded-xl border border-amber-200/60 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-500/15 text-stone-900 font-extrabold border-b border-amber-200/60">
                  <tr>
                    <th className="py-2.5 px-3">Feature Name</th>
                    <th className="py-2.5 px-3">Data Type</th>
                    <th className="py-2.5 px-3">Cohort Mean</th>
                    <th className="py-2.5 px-3">Standard Deviation</th>
                    <th className="py-2.5 px-3">Missing Records</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200/30 font-mono bg-white/70">
                  {selectedDataset.schema.map((f, i) => (
                    <tr key={i} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-2 px-3 font-bold text-stone-900">{f.feature}</td>
                      <td className="py-2 px-3 text-stone-500">{f.type}</td>
                      <td className="py-2 px-3 text-stone-700">{f.mean}</td>
                      <td className="py-2 px-3 text-stone-700">{f.std}</td>
                      <td className="py-2 px-3 text-emerald-700 font-bold">{f.missing} (0%)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Missing Values</span>
                <div className="text-2xl font-black text-emerald-700">{selectedDataset.missingValuesPct}%</div>
                <p className="text-[11px] text-stone-500">Pre-screened and imputed via KNN median baseline.</p>
              </div>
              <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Duplicate Rows</span>
                <div className="text-2xl font-black text-stone-900">{selectedDataset.duplicateRows}</div>
                <p className="text-[11px] text-stone-500">Cryptographic hash check applied across all features.</p>
              </div>
              <div className="p-4 bg-white/70 border border-amber-200/60 rounded-xl space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Outliers (IQR 3x)</span>
                <div className="text-2xl font-black text-amber-700">{selectedDataset.outliersPct}%</div>
                <p className="text-[11px] text-stone-500">Winsorized at 1st and 99th percentiles to avoid quantum gradient divergence.</p>
              </div>
            </div>
          )}

          {activeTab === 'preprocessing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                    Data Preprocessing & Encoding Pipeline
                  </h4>
                  <p className="text-xs text-stone-500">Automated cleaning and continuous feature scaling for quantum feature maps.</p>
                </div>
                <button
                  onClick={runSimulatedPreprocessing}
                  disabled={isPreprocessingRunning}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
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
                  <div key={idx} className="p-3 bg-white/70 border border-amber-200/60 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-amber-900">{s.step}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">{s.action}</p>
                    </div>
                    <span className="mt-2 text-[9px] font-mono text-emerald-800 font-bold uppercase">Ready</span>
                  </div>
                ))}
              </div>

              {preprocessingSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-400/50 text-emerald-950 text-xs rounded-xl flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Preprocessing pipeline executed successfully. Features mapped to rotation angles for quantum circuit embedding.</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-500/15 border border-amber-300/50 rounded-xl">
                <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1">
                  Quantum Feature Map Projection
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed mb-3">
                  Clinical continuous features are projected into Hilbert state space via non-linear quantum kernels. 
                  Currently using <strong>ZZFeatureMap</strong> (Order 2) with rotational phase angle embedding.
                </p>
                <div className="font-mono text-xs bg-white/80 p-3 rounded-lg border border-amber-200/80 text-stone-900">
                  U_Φ(x) = exp( i ∑_(j) x_j Z_j + i ∑_(j,k) (π - x_j)(π - x_k) Z_j Z_k )
                </div>
              </div>
            </div>
          )}

          {/* New Tab: Verified Public Sources & Citations */}
          {activeTab === 'sources' && (
            <div className="space-y-6">
              <div className="border-b border-amber-200/50 pb-3">
                <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Authoritative Public Dataset Repositories & Scientific Citations</span>
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Verified public registries, canonical creators, DOIs, and institutional repositories for all clinical datasets represented in AyuQ.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {ALL_DATASET_METADATA.map((meta) => (
                  <div key={meta.id} className="p-4 rounded-xl glass-panel border border-amber-200/60 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-900 bg-amber-500/15 border border-amber-400/40 px-2 py-0.5 rounded-full">
                          {meta.sourceName}
                        </span>
                        <span className="text-[10px] font-bold text-stone-600 font-mono">
                          ID: {meta.id}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-stone-900">{meta.name}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">{meta.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-amber-200/40">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/70 p-2 rounded-lg border border-amber-200/50">
                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase font-bold">Instances</span>
                          <span className="font-extrabold text-stone-800">{meta.recordCount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase font-bold">Features</span>
                          <span className="font-extrabold text-stone-800">{meta.featureCount} vars</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-stone-600 font-mono bg-amber-50/50 p-2 rounded border border-amber-200/40">
                        <span className="font-bold text-stone-800 block mb-0.5">Citation:</span>
                        {meta.citation}
                        {meta.doi && (
                          <div className="text-amber-800 font-bold mt-0.5">
                            DOI: <a href={`https://doi.org/${meta.doi}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{meta.doi}</a>
                          </div>
                        )}
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[10px] text-stone-500 font-bold">
                          {meta.isSynthetic ? 'Synthetic (Diff-Privacy ε=0.5)' : 'Canonical Real Benchmark'}
                        </span>
                        <a
                          href={meta.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${meta.shortName} dataset source on ${meta.sourceName}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors"
                        >
                          <span>Official Repository</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Synthetic Dataset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-2xl border border-amber-200/60 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Upload Synthetic Research Dataset</h3>
            <p className="text-xs text-stone-600">
              Only synthetic, de-identified or mock research data formatted in CSV, Parquet, or HDF5 may be uploaded in prototype mode.
            </p>

            <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 text-center hover:border-amber-500 cursor-pointer transition-colors bg-white/70">
              <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-800">Drag & drop synthetic dataset file here</p>
              <p className="text-[11px] text-stone-500 mt-1">Accepts .csv, .parquet, .json (Max 50MB)</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs"
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
