import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';

export const ReportsWorkspace: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('EVALUATION');
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerExport = (format: 'PDF' | 'JSON' | 'CSV') => {
    setIsExporting(format);
    setTimeout(() => {
      setIsExporting(null);
      setToastMessage(`Exported ${format} artifact successfully (Simulated Download).`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Research Reports & Peer-Review Dossiers</h2>
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-medium">
              Documentation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate reproducible clinical AI evaluation dossiers, quantum circuit benchmarks, and governance audits.
          </p>
        </div>

        {/* Export Formats */}
        <div className="flex items-center gap-2">
          {(['PDF', 'JSON', 'CSV'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => triggerExport(fmt)}
              disabled={isExporting !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting === fmt ? 'animate-bounce' : ''}`} />
              <span>Export {fmt}</span>
            </button>
          ))}
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Report Types Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: 'EVALUATION', label: 'Model Evaluation Dossier', desc: 'CV results, ROC-AUC, CI & Brier Score' },
          { key: 'DATASET', label: 'Dataset Quality Audit', desc: 'Synthetic distribution & differential privacy' },
          { key: 'QUANTUM', label: 'Quantum Circuit Benchmark', desc: 'Transpilation depth & QASM listing' },
          { key: 'GOVERNANCE', label: 'Ethical & Regulatory Dossier', desc: 'HIPAA, bias disparity & audit trails' }
        ].map((rep) => (
          <div
            key={rep.key}
            onClick={() => setSelectedReportType(rep.key)}
            className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
              selectedReportType === rep.key
                ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-500'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-800">{rep.label}</div>
            <div className="text-[11px] text-slate-500 mt-1">{rep.desc}</div>
          </div>
        ))}
      </div>

      {/* Document Preview Canvas */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-xs max-w-4xl mx-auto space-y-6 text-slate-800 font-sans">
        <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono text-indigo-600 uppercase font-bold tracking-wider">
              QUANTUM-ML CLINICAL RESEARCH DOSSIER · REF #QML-2026-DOC-09
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              {selectedReportType === 'EVALUATION' && 'Formal Model Evaluation & Validation Dossier'}
              {selectedReportType === 'DATASET' && 'Synthetic Biomarker Cohort Quality & Differential Privacy Audit'}
              {selectedReportType === 'QUANTUM' && 'Variational Quantum Circuit Optimization & Transpilation Benchmark'}
              {selectedReportType === 'GOVERNANCE' && 'Ethical AI Fairness & Governance Compliance Audit'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Protocol: 5-Fold Stratified Cross-Validation on Held-out Cryptographically Locked Test Set
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded font-medium">
            Research Prototype
          </span>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md font-mono text-[11px] space-y-1">
            <div>Model Identifier: Cardio-Hybrid VQC (ResNet + RealAmplitudes Depth=3)</div>
            <div>Target Cohort: Cardiovascular Risk — Synthetic Dataset (N=4,200)</div>
            <div>Held-out Isolated Test Set: 840 Cases (SHA-256 Verified)</div>
            <div>Hardware Backend: Qiskit Aer GPU Statevector Simulator (Simulated)</div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 border-b pb-1">1. Executive Summary & Verification</h3>
          <p>
            This evaluation protocol rigorously evaluates the generalization ability of the hybrid variational quantum classifier (VQC) 
            against classical baselines (XGBoost, SVM). In simulated 5-fold cross-validation, the quantum model achieved an 
            unbiased test set ROC-AUC of <strong>0.942 (95% CI: 0.929–0.955)</strong> with a Brier calibration loss of <strong>0.078</strong>.
          </p>

          <h3 className="text-sm font-bold text-slate-900 border-b pb-1 pt-2">2. Provenance & Reproducibility</h3>
          <p>
            All experiments were conducted with random seed <code>42</code> under environment snapshot <code>sha256:e3b0c44...</code>. 
            The test set was cryptographically sealed prior to hyperparameter optimization to eliminate data leakage.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-4 flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Signed: AI Governance & Research Board</span>
          <span>Generated: 2026-09-30 20:54 UTC</span>
        </div>
      </div>
    </div>
  );
};
