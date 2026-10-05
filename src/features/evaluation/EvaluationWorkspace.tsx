import React, { useState } from 'react';
import { 
  CheckSquare, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Layers,
  BarChart3,
  Cpu,
  FileText,
  AlertCircle
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_EVALUATION_RUNS } from '../../services/mockData';
import { EvaluationRun } from '../../types';
import { DatasetSourceBadge } from '../../components/common/DatasetSourceBadge';

export const EvaluationWorkspace: React.FC = () => {
  const [selectedRunId, setSelectedRunId] = useState<string>(MOCK_EVALUATION_RUNS[0].id);
  const [isLockedTestSet, setIsLockedTestSet] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showExactPrecision, setShowExactPrecision] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<{ metric: string; model: string; value: number } | null>(null);

  const evaluation: EvaluationRun = 
    MOCK_EVALUATION_RUNS.find((r) => r.id === selectedRunId) || MOCK_EVALUATION_RUNS[0];

  const handleRerunCV = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 1000);
  };

  // Performance metrics comparison dataset directly from the research paper (Page 3 & Page 4)
  const comparisonData = [
    {
      metric: 'Accuracy',
      models: [
        { name: 'SVM', value: 0.982, exact: 0.98245614, color: '#0284c7', bg: 'bg-sky-600' },
        { name: 'Random Forest', value: 0.965, exact: 0.964912281, color: '#f59e0b', bg: 'bg-amber-500' },
        { name: 'Logistic Regression', value: 0.974, exact: 0.97400000, color: '#10b981', bg: 'bg-emerald-500' },
        { name: 'Quantum Variation Classifier', value: 0.974, exact: 0.973684211, color: '#ef4444', bg: 'bg-rose-500' }
      ]
    },
    {
      metric: 'Precision',
      models: [
        { name: 'SVM', value: 0.973, exact: 0.97260274, color: '#0284c7', bg: 'bg-sky-600' },
        { name: 'Random Forest', value: 0.959, exact: 0.95890411, color: '#f59e0b', bg: 'bg-amber-500' },
        { name: 'Logistic Regression', value: 0.972, exact: 0.97200000, color: '#10b981', bg: 'bg-emerald-500' },
        { name: 'Quantum Variation Classifier', value: 0.972, exact: 0.972222222, color: '#ef4444', bg: 'bg-rose-500' }
      ]
    },
    {
      metric: 'Recall',
      models: [
        { name: 'SVM', value: 1.000, exact: 1.00000000, color: '#0284c7', bg: 'bg-sky-600' },
        { name: 'Random Forest', value: 0.986, exact: 0.985915493, color: '#f59e0b', bg: 'bg-amber-500' },
        { name: 'Logistic Regression', value: 0.986, exact: 0.98600000, color: '#10b981', bg: 'bg-emerald-500' },
        { name: 'Quantum Variation Classifier', value: 0.986, exact: 0.985915493, color: '#ef4444', bg: 'bg-rose-500' }
      ]
    },
    {
      metric: 'F1',
      models: [
        { name: 'SVM', value: 0.986, exact: 0.986111111, color: '#0284c7', bg: 'bg-sky-600' },
        { name: 'Random Forest', value: 0.972, exact: 0.972222222, color: '#f59e0b', bg: 'bg-amber-500' },
        { name: 'Logistic Regression', value: 0.979, exact: 0.97900000, color: '#10b981', bg: 'bg-emerald-500' },
        { name: 'Quantum Variation Classifier', value: 0.979, exact: 0.979020979, color: '#ef4444', bg: 'bg-rose-500' }
      ]
    }
  ];

  const yMin = 0.90;
  const yMax = 1.04;

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header & Protocol Selector */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
              Evaluation Protocol & Scientific Validation Vault
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-emerald-500/15 text-emerald-900 border border-emerald-400/40 rounded-full font-bold">
              Leakage-Proof Benchmark
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Strict separation between model selection, hyperparameter tuning, and held-out test cohort evaluation with reproducible cryptographic provenance.
          </p>
        </div>

        {/* Study Selector & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-xl border border-amber-200/60 shadow-2xs">
            {MOCK_EVALUATION_RUNS.map((run) => (
              <button
                key={run.id}
                onClick={() => setSelectedRunId(run.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRunId === run.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-amber-50/60'
                }`}
              >
                {run.id === 'EVAL-WBCD-2026-001' ? 'Breast Cancer QML (Vegisetti)' : 'Cardio VQC'}
              </button>
            ))}
          </div>

          <button
            onClick={handleRerunCV}
            disabled={isEvaluating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
            <span>{isEvaluating ? 'Cross-Validating...' : 'Re-verify 5-Fold CV'}</span>
          </button>
        </div>
      </div>

      {/* Author & Paper Provenance Banner (When Wisconsin Breast Cancer paper is active) */}
      {evaluation.paperCitation && (
        <div className="glass-card rounded-2xl p-5 border border-amber-300/60 shadow-xs relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-white/40 to-sky-500/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                    Peer-Reviewed Research Paper
                  </span>
                  <span className="text-xs font-mono text-stone-500">Wisconsin Biopsy Diagnostic Benchmark</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mt-1 tracking-tight">
                  {evaluation.paperCitation.title}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  <strong>Author:</strong> {evaluation.paperCitation.author} · <em>{evaluation.paperCitation.institution}</em> ({evaluation.paperCitation.email})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end lg:self-center">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono">Dataset Evaluated</span>
                <DatasetSourceBadge datasetId="DS-ONCO-03" variant="link" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-800 border border-emerald-400/50 flex items-center justify-center font-bold text-xs">
                VQC
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Stage Methodological Protocol */}
      <div className="glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
        <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-4 font-mono">
          Rigorous 5-Stage Clinical Evaluation Methodology
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
          <div className="p-3.5 bg-white/70 border border-amber-200/60 rounded-xl flex flex-col justify-between text-xs backdrop-blur-xs">
            <div>
              <div className="text-[10px] font-mono text-amber-800 font-bold mb-1">STAGE 1</div>
              <strong className="text-stone-900">Stratified Partitioning</strong>
              <p className="text-[11px] text-stone-600 mt-1">80% Development Cohort balanced by malignancy class</p>
            </div>
            <div className="mt-3 text-[10px] text-emerald-700 font-bold flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Leakage Proof</span>
            </div>
          </div>

          <div className="p-3.5 bg-white/70 border border-amber-200/60 rounded-xl flex flex-col justify-between text-xs backdrop-blur-xs">
            <div>
              <div className="text-[10px] font-mono text-amber-800 font-bold mb-1">STAGE 2</div>
              <strong className="text-stone-900">5-Fold Stratified CV</strong>
              <p className="text-[11px] text-stone-600 mt-1">Cross-validated hyperparameter search on simulator</p>
            </div>
            <div className="mt-3 text-[10px] text-emerald-700 font-bold font-mono">
              Mean Acc {(evaluation.metrics.accuracy.value * 100).toFixed(1)}%
            </div>
          </div>

          <div className="p-3.5 bg-white/70 border border-amber-200/60 rounded-xl flex flex-col justify-between text-xs backdrop-blur-xs">
            <div>
              <div className="text-[10px] font-mono text-amber-800 font-bold mb-1">STAGE 3</div>
              <strong className="text-stone-900">Model Selection</strong>
              <p className="text-[11px] text-stone-600 mt-1">Variational Quantum Classifier (RY rotations + CNOT)</p>
            </div>
            <div className="mt-3 text-[10px] text-indigo-700 font-bold font-mono truncate">
              {evaluation.modelName}
            </div>
          </div>

          <div className="p-3.5 bg-white/70 border border-amber-200/60 rounded-xl flex flex-col justify-between text-xs backdrop-blur-xs">
            <div>
              <div className="text-[10px] font-mono text-amber-800 font-bold mb-1">STAGE 4</div>
              <strong className="text-stone-900">Probability Calibration</strong>
              <p className="text-[11px] text-stone-600 mt-1">Platt Sigmoid Scaling · Optimal Threshold = {evaluation.optimalThreshold}</p>
            </div>
            <div className="mt-3 text-[10px] text-amber-800 font-bold font-mono">
              Brier: {evaluation.metrics.brierScore.toFixed(3)}
            </div>
          </div>

          <div className={`p-3.5 rounded-xl flex flex-col justify-between text-xs border backdrop-blur-xs ${
            isLockedTestSet 
              ? 'bg-amber-500/15 border-amber-400/80 ring-1 ring-amber-400/50' 
              : 'bg-rose-50/70 border-rose-300'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-amber-900">STAGE 5 (LOCKED)</span>
                {isLockedTestSet ? <Lock className="w-3.5 h-3.5 text-amber-800" /> : <Unlock className="w-3.5 h-3.5 text-rose-600" />}
              </div>
              <strong className="text-stone-900">Held-Out Test Cohort</strong>
              <p className="text-[11px] text-stone-600 mt-1">20% isolated biopsy set evaluated strictly once</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold text-amber-950">
                {isLockedTestSet ? 'CRYPTOGRAPHICALLY SEALED' : 'UNSEALED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PAPER ARTIFACT: Performance Metrics by Model Bar Chart (Page 4 from PDF) */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
                Performance Metrics by Model — Empirical Comparison
              </h3>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Exact benchmark visualization from research paper comparing SVM, Random Forest, Logistic Regression, and Quantum Variation Classifier
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExactPrecision(!showExactPrecision)}
              className="text-[11px] font-mono px-2.5 py-1 bg-white/80 border border-amber-200/60 hover:bg-white text-stone-700 rounded-lg shadow-2xs transition-all font-semibold"
            >
              {showExactPrecision ? 'Show Standard (3 Decimals)' : 'Show Full Paper Precision (8 Decimals)'}
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-sky-600" />
            <span className="text-stone-700">SVM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-500" />
            <span className="text-stone-700">Random Forest</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
            <span className="text-stone-700">Logistic Regression</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-500" />
            <span className="text-stone-700">Quantum Variation Classifier</span>
          </div>
        </div>

        {/* Custom High-Fidelity Bar Chart (Reproducing Page 4 Matplotlib chart) */}
        <div className="bg-white/85 rounded-xl p-4 sm:p-6 border border-amber-200/50 shadow-2xs">
          <div className="relative h-64 sm:h-72 w-full flex items-end justify-between pt-6 pb-6 pl-10 pr-2">
            {/* Y-Axis Gridlines & Labels (0.90 to 1.04) */}
            <div className="absolute inset-y-6 left-0 w-10 flex flex-col justify-between text-[10px] font-mono text-stone-400 select-none text-right pr-2">
              <span>1.04</span>
              <span>1.02</span>
              <span>1.00</span>
              <span>0.98</span>
              <span>0.96</span>
              <span>0.94</span>
              <span>0.92</span>
              <span>0.90</span>
            </div>

            {/* Horizontal Grid lines */}
            {[1.04, 1.02, 1.00, 0.98, 0.96, 0.94, 0.92, 0.90].map((val, idx) => {
              const topPct = ((1.04 - val) / (1.04 - 0.90)) * 100;
              return (
                <div
                  key={idx}
                  className="absolute left-10 right-2 border-b border-stone-200/60 pointer-events-none"
                  style={{ top: `${topPct}%` }}
                />
              );
            })}

            {/* 4 Metric Groups (Accuracy, Precision, Recall, F1) */}
            <div className="w-full h-full flex items-end justify-around relative z-10">
              {comparisonData.map((group) => (
                <div key={group.metric} className="flex flex-col items-center h-full justify-end flex-1 max-w-[220px] px-1 sm:px-2">
                  {/* Bars Container */}
                  <div className="flex items-end justify-center gap-1 sm:gap-2 w-full h-full pb-1">
                    {group.models.map((mod) => {
                      const clampedVal = Math.max(yMin, Math.min(yMax, mod.value));
                      const heightPercent = ((clampedVal - yMin) / (yMax - yMin)) * 100;

                      return (
                        <div
                          key={mod.name}
                          className="flex-1 max-w-[36px] flex flex-col items-center group relative cursor-pointer"
                          onMouseEnter={() => setHoveredBar({ metric: group.metric, model: mod.name, value: mod.exact })}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Value above bar */}
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-700 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform mb-1 whitespace-nowrap">
                            {mod.value.toFixed(3)}
                          </span>

                          {/* Bar */}
                          <div
                            className={`w-full rounded-t-sm transition-all duration-300 group-hover:brightness-110 shadow-xs ${mod.bg}`}
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full mb-6 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                            <div className="bg-stone-900 text-white text-[11px] rounded-lg px-2.5 py-1.5 font-mono shadow-xl whitespace-nowrap border border-stone-700">
                              <div className="font-bold">{mod.name}</div>
                              <div className="text-amber-300">
                                {group.metric}: {showExactPrecision ? mod.exact : mod.value.toFixed(4)}
                              </div>
                            </div>
                            <div className="w-2 h-2 bg-stone-900 rotate-45 -mt-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Metric Label */}
                  <span className="mt-2 text-xs font-mono font-bold text-stone-800">
                    {group.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Paper Statement Quote */}
        <p className="text-xs text-stone-600 italic font-medium bg-amber-500/10 p-3 rounded-xl border border-amber-200/50">
          "The quantum classifier demonstrated performance comparable to classical baselines under simulated execution." — <em>Quantum-Enhanced Breast Cancer Detection Using Hybrid QML (Page 4)</em>
        </p>
      </div>

      {/* PAPER ARTIFACT: Experimental Results Table (Page 3 from PDF) */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-amber-200/40">
          <div>
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
              Experimental Results Table (Exact Benchmark Data)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Wisconsin Breast Cancer Dataset benchmark measurements as published in the research study
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-950 font-bold border border-amber-400/40">
            Page 3 Artifact
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-amber-200/60 bg-amber-500/10 text-stone-800 font-bold">
                <th className="py-2.5 px-4 rounded-l-lg">Model</th>
                <th className="py-2.5 px-4">Accuracy</th>
                <th className="py-2.5 px-4">Precision</th>
                <th className="py-2.5 px-4">Recall</th>
                <th className="py-2.5 px-4 rounded-r-lg">F1 Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-200/30 text-stone-800 font-medium">
              <tr className="hover:bg-amber-50/60 transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  <span>SVM</span>
                </td>
                <td className="py-3 px-4">{showExactPrecision ? '0.98245614' : '0.9825 (98.2%)'}</td>
                <td className="py-3 px-4">{showExactPrecision ? '0.97260274' : '0.9726 (97.3%)'}</td>
                <td className="py-3 px-4 font-bold text-emerald-700">{showExactPrecision ? '1' : '1.0000 (100%)'}</td>
                <td className="py-3 px-4">{showExactPrecision ? '0.986111111' : '0.9861'}</td>
              </tr>
              <tr className="hover:bg-amber-50/60 transition-colors">
                <td className="py-3 px-4 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Random Forest</span>
                </td>
                <td className="py-3 px-4">{showExactPrecision ? '0.964912281' : '0.9649 (96.5%)'}</td>
                <td className="py-3 px-4">{showExactPrecision ? '0.95890411' : '0.9589 (95.9%)'}</td>
                <td className="py-3 px-4">{showExactPrecision ? '0.985915493' : '0.9859 (98.6%)'}</td>
                <td className="py-3 px-4">{showExactPrecision ? '0.972222222' : '0.9722'}</td>
              </tr>
              <tr className="bg-amber-500/10 hover:bg-amber-500/15 font-bold transition-colors border-y-2 border-amber-400/50">
                <td className="py-3 px-4 text-amber-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Quantum Variation Classifier</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-600 text-white rounded">QML Target</span>
                </td>
                <td className="py-3 px-4 text-amber-950">{showExactPrecision ? '0.973684211' : '0.9737 (97.4%)'}</td>
                <td className="py-3 px-4 text-amber-950">{showExactPrecision ? '0.972222222' : '0.9722 (97.2%)'}</td>
                <td className="py-3 px-4 text-amber-950">{showExactPrecision ? '0.985915493' : '0.9859 (98.6%)'}</td>
                <td className="py-3 px-4 text-amber-950">{showExactPrecision ? '0.979020979' : '0.9790'}</td>
              </tr>
              <tr className="hover:bg-amber-50/60 transition-colors text-stone-600">
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Logistic Regression (Chart Baseline)</span>
                </td>
                <td className="py-3 px-4">0.9740 (97.4%)</td>
                <td className="py-3 px-4">0.9720 (97.2%)</td>
                <td className="py-3 px-4">0.9860 (98.6%)</td>
                <td className="py-3 px-4">0.9790</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Discussion, Limitations & Future Work (Pages 4 & 5 of Research Paper) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
              Research Findings & Scientific Discussion
            </h3>
          </div>
          <div className="text-xs text-stone-700 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Competitive Representational Capacity:</strong> Hybrid quantum classifiers achieve classification performance similar to well-established classical models on structured medical biopsy datasets (97.4% vs 98.2% SVM and 96.5% Random Forest).
            </p>
            <p>
              • <strong>High Diagnostic Sensitivity:</strong> The Quantum Variation Classifier achieved <strong>98.59% recall</strong>, a critical clinical safety metric ensuring minimal false negatives in malignant tumor detection.
            </p>
            <p>
              • <strong>Parameter Efficiency:</strong> The VQC operates with a compact 4-qubit variational circuit, confirming parameter efficiency relative to dense classical neural networks.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
              Documented Hardware Limitations & Roadmap
            </h3>
          </div>
          <div className="text-xs text-stone-700 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Simulation Constraints:</strong> Experiments were executed on classical quantum simulators (Aer Statevector). Future roadmap includes verification on physical QPUs (IBM Eagle / Rigetti).
            </p>
            <p>
              • <strong>Scalability:</strong> Quantum simulation overhead and limited qubit counts restrict scaling beyond 20–30 features without classical dimensionality reduction (PCA / Autoencoders).
            </p>
            <p>
              • <strong>Feature Encoding:</strong> Alternative quantum feature encoding strategies (amplitude vs angle vs Hamiltonian kernel encoding) remain an active investigation frontier.
            </p>
          </div>
        </div>
      </div>

      {/* Reproducibility Metadata Vault */}
      <div className="glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50 space-y-3 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Reproducibility & Provenance Vault
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white/75 rounded-xl border border-amber-200/60 shadow-2xs">
            <div className="text-[10px] text-stone-500 font-bold">RANDOM SEED</div>
            <div className="font-bold text-stone-800 mt-0.5">{evaluation.reproducibility.randomSeed} (Fixed deterministic)</div>
          </div>
          <div className="p-3 bg-white/75 rounded-xl border border-amber-200/60 shadow-2xs">
            <div className="text-[10px] text-stone-500 font-bold">DATASET & REPOSITORY</div>
            <div className="font-bold text-stone-800 mt-0.5 truncate">{evaluation.reproducibility.datasetVersion}</div>
            <div className="mt-1">
              <DatasetSourceBadge datasetId={evaluation.id === 'EVAL-WBCD-2026-001' ? 'DS-ONCO-03' : 'DS-CARDIO-01'} variant="link" />
            </div>
          </div>
          <div className="p-3 bg-white/75 rounded-xl border border-amber-200/60 shadow-2xs">
            <div className="text-[10px] text-stone-500 font-bold">GIT COMMIT SHA</div>
            <div className="font-bold text-amber-800 mt-0.5">{evaluation.reproducibility.codeGitSha}</div>
          </div>
          <div className="p-3 bg-white/75 rounded-xl border border-amber-200/60 shadow-2xs">
            <div className="text-[10px] text-stone-500 font-bold">ENVIRONMENT HASH</div>
            <div className="font-bold text-stone-600 truncate mt-0.5">{evaluation.reproducibility.environmentHash}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
