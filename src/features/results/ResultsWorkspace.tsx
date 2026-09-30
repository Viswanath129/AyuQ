import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_PATIENT_CASES, MOCK_MODELS } from '../../services/mockData';
import { PatientCase } from '../../types';

export const ResultsWorkspace: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<PatientCase>(MOCK_PATIENT_CASES[0]);
  const [selectedModelId, setSelectedModelId] = useState(MOCK_MODELS[0].id);
  const [isInferring, setIsInferring] = useState(false);

  const handleRunInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Inference & Explainable Decision Support</h2>
            <span className="text-xs px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md font-medium">
              Results & Decision Support
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hybrid Quantum-Classical prediction engine with SHAP attribution, confidence intervals, and decision-support guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCase.id}
            onChange={(e) => {
              const pt = MOCK_PATIENT_CASES.find(c => c.id === e.target.value);
              if (pt) setSelectedCase(pt);
            }}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
          >
            {MOCK_PATIENT_CASES.map(c => (
              <option key={c.id} value={c.id}>Case: {c.syntheticId} ({c.riskTier})</option>
            ))}
          </select>

          <button
            onClick={handleRunInference}
            disabled={isInferring}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isInferring ? 'animate-spin' : ''}`} />
            <span>{isInferring ? 'Simulating Inference...' : 'Re-compute Inference'}</span>
          </button>
        </div>
      </div>

      {/* Primary Clinical Result Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Risk Probability Score */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              ESTIMATED 1-YR MACE RISK PROBABILITY
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                {(selectedCase.riskProbability * 100).toFixed(1)}%
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedCase.riskTier === 'High Risk'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : selectedCase.riskTier === 'Moderate Risk'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {selectedCase.riskTier}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Model Confidence: <strong className="font-mono text-slate-700">{(selectedCase.confidence * 100).toFixed(1)}%</strong> (Simulated)
            </p>
          </div>

          {/* Calibrated Decision Rule */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Decision Threshold Rule</span>
            </div>
            <p className="font-mono text-[11px] text-slate-600">{selectedCase.decisionRule}</p>
            <p className="text-[10px] text-slate-400">Tuned on 5-fold cross-validation with Platt Scaling</p>
          </div>

          {/* Clinical Action Recommendation */}
          <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-md text-xs space-y-1 text-indigo-900">
            <div className="font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-700" />
              <span>Recommended Next Clinical Step</span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">{selectedCase.recommendation}</p>
          </div>
        </div>

        {/* Prominent Safety Watermark */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 text-amber-700 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Decision-support prototype — Not a clinical diagnosis. Do not create autonomous medical decisions.
          </span>
          <span className="font-mono text-slate-400">Model: Cardio-Hybrid VQC (v2.4.0)</span>
        </div>
      </div>

      {/* SHAP-Style Explainability Dashboard */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Feature Attribution & SHAP Contribution Waterfall</h3>
            <p className="text-xs text-slate-500">
              Shapley feature importance values quantify positive or negative pushes toward the high-risk classification
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
            Base Value E[f(x)] = 0.380
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {selectedCase.shapContributions.map((s, idx) => {
            const isPositive = s.impact > 0;
            const barWidth = Math.min(100, Math.abs(s.impact) * 220);

            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-medium text-slate-800">{s.feature}</span>
                  <span className={`font-semibold ${isPositive ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {s.value}
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
                  <div className="w-1/2 flex justify-end pr-0.5">
                    {!isPositive && (
                      <div
                        className="bg-emerald-500 rounded-l-full h-full"
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    )}
                  </div>
                  <div className="w-0.5 h-full bg-slate-300 z-10"></div>
                  <div className="w-1/2 flex justify-start pl-0.5">
                    {isPositive && (
                      <div
                        className="bg-rose-500 rounded-r-full h-full"
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs"></span> Reduces Risk (Protective)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-xs"></span> Increases Risk (Adverse)
          </span>
        </div>
      </div>
    </div>
  );
};
