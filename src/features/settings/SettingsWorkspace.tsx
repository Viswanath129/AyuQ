import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Cpu, Sliders, CheckCircle2 } from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';

export const SettingsWorkspace: React.FC = () => {
  const [simulationDelayMs, setSimulationDelayMs] = useState(800);
  const [defaultShots, setDefaultShots] = useState(2048);
  const [differentialPrivacyEpsilon, setDifferentialPrivacyEpsilon] = useState(0.5);
  const [autoLockTestSet, setAutoLockTestSet] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Platform Settings & Simulation Preferences</h2>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium">
              Prototype Config
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure simulation latency parameters, privacy budgets (differential privacy), and evaluation rigor enforcement.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
        >
          Save Configuration
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simulation Timing */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Quantum Simulation Runtime</span>
          </h3>

          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Simulated Execution Latency:</span>
              <span className="font-mono text-slate-900 font-bold">{simulationDelayMs} ms</span>
            </div>
            <input
              type="range"
              min="200"
              max="3000"
              step="100"
              value={simulationDelayMs}
              onChange={(e) => setSimulationDelayMs(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">Simulates queue and circuit synthesis delay for realistic UX testing.</p>
          </div>

          <div>
            <label className="text-slate-600 block mb-1">Default Quantum Shots:</label>
            <select
              value={defaultShots}
              onChange={(e) => setDefaultShots(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
            >
              <option value={1024}>1,024 Shots (Rapid)</option>
              <option value={2048}>2,048 Shots (Standard)</option>
              <option value={4096}>4,096 Shots (High Precision)</option>
              <option value={8192}>8,192 Shots (Deep Statistical Sample)</option>
            </select>
          </div>
        </div>

        {/* Clinical Safety & Privacy */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Clinical Integrity & Privacy Bounds</span>
          </h3>

          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Differential Privacy Budget (Epsilon ε):</span>
              <span className="font-mono text-slate-900 font-bold">{differentialPrivacyEpsilon}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={differentialPrivacyEpsilon}
              onChange={(e) => setDifferentialPrivacyEpsilon(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">Lower ε provides stronger mathematical privacy guarantees for synthetic patient generators.</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
            <div>
              <div className="font-semibold text-slate-800">Auto-Seal Held-Out Test Cohort</div>
              <p className="text-[11px] text-slate-500">Automatically isolate and hash test set before model selection runs.</p>
            </div>
            <input
              type="checkbox"
              checked={autoLockTestSet}
              onChange={(e) => setAutoLockTestSet(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
