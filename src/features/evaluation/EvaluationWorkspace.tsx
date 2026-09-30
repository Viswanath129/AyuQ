import React, { useState } from 'react';
import { 
  CheckSquare, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Sliders, 
  ArrowDown, 
  RefreshCw, 
  CheckCircle2, 
  GitBranch, 
  Hash, 
  Database,
  BarChart3
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_EVALUATION_RUNS } from '../../services/mockData';
import { EvaluationRun } from '../../types';

export const EvaluationWorkspace: React.FC = () => {
  const [evaluation, setEvaluation] = useState<EvaluationRun>(MOCK_EVALUATION_RUNS[0]);
  const [isLockedTestSet, setIsLockedTestSet] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedThreshold, setSelectedThreshold] = useState(evaluation.optimalThreshold);

  const handleRerunCV = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Evaluation Protocol & Reproducibility Vault</h2>
            <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-medium">
              Leakage-Proof Methodology
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enforces strict separation between model selection, probability calibration, and cryptographically isolated test-set evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRerunCV}
            disabled={isEvaluating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
            <span>Re-run 5-Fold CV</span>
          </button>
        </div>
      </div>

      {/* Methodological Flow Pipeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
          Strict Clinical Model Evaluation Methodology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative items-stretch">
          {/* Stage 1 */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between text-xs">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-semibold mb-1">STAGE 1</div>
              <strong className="text-slate-800">Train/Val Split</strong>
              <p className="text-[11px] text-slate-500 mt-1">80% Development Cohort (Stratified)</p>
            </div>
            <div className="mt-2 text-[10px] text-emerald-600 font-medium">Completed</div>
          </div>

          {/* Stage 2 */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between text-xs">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-semibold mb-1">STAGE 2</div>
              <strong className="text-slate-800">Repeated Cross-Val</strong>
              <p className="text-[11px] text-slate-500 mt-1">5-Fold CV across hyperparameter space</p>
            </div>
            <div className="mt-2 text-[10px] text-emerald-600 font-medium">AUC 0.942 ± 0.013</div>
          </div>

          {/* Stage 3 */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between text-xs">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-semibold mb-1">STAGE 3</div>
              <strong className="text-slate-800">Model Selection</strong>
              <p className="text-[11px] text-slate-500 mt-1">Ansatz Depth=3 chosen on inner validation</p>
            </div>
            <div className="mt-2 text-[10px] text-emerald-600 font-medium">Cardio-Hybrid VQC</div>
          </div>

          {/* Stage 4 */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between text-xs">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-semibold mb-1">STAGE 4</div>
              <strong className="text-slate-800">Calibration & Tuning</strong>
              <p className="text-[11px] text-slate-500 mt-1">Platt Scaling · Optimal Threshold = {selectedThreshold}</p>
            </div>
            <div className="mt-2 text-[10px] text-indigo-600 font-medium">Brier Score: 0.078</div>
          </div>

          {/* Stage 5: Isolated Locked Test Set */}
          <div className={`p-3 rounded-md flex flex-col justify-between text-xs border ${
            isLockedTestSet 
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30' 
              : 'bg-red-50 border-red-300'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-amber-800">STAGE 5 (LOCKED)</span>
                {isLockedTestSet ? <Lock className="w-3.5 h-3.5 text-amber-700" /> : <Unlock className="w-3.5 h-3.5 text-red-600" />}
              </div>
              <strong className="text-slate-900">Isolated Test Cohort</strong>
              <p className="text-[11px] text-slate-600 mt-1">20% Held-out test set (840 cases)</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-900">
                {isLockedTestSet ? 'CRYPTOGRAPHICALLY SEALED' : 'UNSEALED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Metrics Grid (With Confidence Intervals) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Held-Out Test Set Performance Metrics</h3>
            <p className="text-xs text-slate-500">Computed strictly on isolated test data with 95% bootstrap confidence intervals</p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
            N = 840 Cases
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-[10px] text-slate-400 block uppercase">Classification Accuracy</span>
            <span className="text-lg font-bold text-slate-900">{(evaluation.metrics.accuracy.value * 100).toFixed(1)}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              95% CI: [{(evaluation.metrics.accuracy.ci[0] * 100).toFixed(1)}%, {(evaluation.metrics.accuracy.ci[1] * 100).toFixed(1)}%]
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-[10px] text-slate-400 block uppercase">Sensitivity (Recall)</span>
            <span className="text-lg font-bold text-emerald-600">{(evaluation.metrics.sensitivity.value * 100).toFixed(1)}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              95% CI: [{(evaluation.metrics.sensitivity.ci[0] * 100).toFixed(1)}%, {(evaluation.metrics.sensitivity.ci[1] * 100).toFixed(1)}%]
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-[10px] text-slate-400 block uppercase">Specificity</span>
            <span className="text-lg font-bold text-slate-900">{(evaluation.metrics.specificity.value * 100).toFixed(1)}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              95% CI: [{(evaluation.metrics.specificity.ci[0] * 100).toFixed(1)}%, {(evaluation.metrics.specificity.ci[1] * 100).toFixed(1)}%]
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-[10px] text-slate-400 block uppercase">ROC-AUC</span>
            <span className="text-lg font-bold text-indigo-600">{evaluation.metrics.rocAuc.value.toFixed(3)}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              95% CI: [{evaluation.metrics.rocAuc.ci[0].toFixed(3)}, {evaluation.metrics.rocAuc.ci[1].toFixed(3)}]
            </span>
          </div>
        </div>

        {/* Secondary metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center text-xs">
          <div className="p-2.5 bg-slate-50/70 border border-slate-200 rounded">
            <span className="text-[9px] text-slate-400 block">PRECISION</span>
            <strong className="text-slate-800">{(evaluation.metrics.precision.value * 100).toFixed(1)}%</strong>
          </div>
          <div className="p-2.5 bg-slate-50/70 border border-slate-200 rounded">
            <span className="text-[9px] text-slate-400 block">F1 SCORE</span>
            <strong className="text-slate-800">{evaluation.metrics.f1Score.value.toFixed(3)}</strong>
          </div>
          <div className="p-2.5 bg-slate-50/70 border border-slate-200 rounded">
            <span className="text-[9px] text-slate-400 block">PR-AUC</span>
            <strong className="text-slate-800">{evaluation.metrics.prAuc.value.toFixed(3)}</strong>
          </div>
          <div className="p-2.5 bg-slate-50/70 border border-slate-200 rounded">
            <span className="text-[9px] text-slate-400 block">CALIBRATION BRIER</span>
            <strong className="text-emerald-600">{evaluation.metrics.brierScore.toFixed(3)} (Low)</strong>
          </div>
        </div>
      </div>

      {/* Reproducibility Metadata Panel */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Reproducibility & Provenance Vault
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400">RANDOM SEED</div>
            <div className="font-bold text-slate-800 mt-0.5">{evaluation.reproducibility.randomSeed} (Fixed deterministic)</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400">DATASET VERSION</div>
            <div className="font-bold text-slate-800 mt-0.5">{evaluation.reproducibility.datasetVersion}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400">GIT COMMIT SHA</div>
            <div className="font-bold text-indigo-600 mt-0.5">{evaluation.reproducibility.codeGitSha}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400">ENVIRONMENT HASH</div>
            <div className="font-bold text-slate-600 truncate mt-0.5">{evaluation.reproducibility.environmentHash}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
