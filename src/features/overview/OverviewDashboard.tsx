import React from 'react';
import { 
  Database, 
  Layers, 
  Atom, 
  CheckSquare, 
  Activity, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ThreeHilbertLattice } from '../../components/quantum/ThreeHilbertLattice';
import { MOCK_MODELS, MOCK_DATASETS, MOCK_QUANTUM_JOBS, MOCK_EVALUATION_RUNS } from '../../services/mockData';
import { NavItemKey } from '../../components/layout/Sidebar';

interface OverviewDashboardProps {
  onNavigate: (tab: NavItemKey) => void;
  onStartDemo: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigate, onStartDemo }) => {
  const kpis = [
    { label: 'Active Datasets', value: MOCK_DATASETS.length.toString(), sub: 'Synthetic & De-identified', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Models in Registry', value: MOCK_MODELS.length.toString(), sub: 'Classical, QML & Hybrid', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'QML Experiments', value: '48', sub: 'Variational circuits tested', icon: Atom, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Evaluation Runs', value: '12', sub: 'Cross-validated & locked', icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Prediction Inferences', value: '1,280', sub: 'Simulated clinical cases', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'System Health', value: '99.9%', sub: 'All 6 microservices healthy', icon: Server, color: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  const pipelineStages = [
    { title: '1. Data Layer', desc: 'Synthetic Cohort & Quality Audit', tab: 'datasets' as NavItemKey, status: 'Ready' },
    { title: '2. Preprocessing', desc: 'Standardization & Angle Encoding', tab: 'datasets' as NavItemKey, status: 'Active' },
    { title: '3. ML / QML Layer', desc: 'Variational & Kernel Models', tab: 'models' as NavItemKey, status: 'Trained' },
    { title: '4. Quantum Execution', desc: 'Transpilation & Aer Simulation', tab: 'quantum-exec' as NavItemKey, status: 'Verified' },
    { title: '5. Evaluation Protocol', desc: '5-Fold CV & Locked Test Set', tab: 'evaluation' as NavItemKey, status: 'Locked' },
    { title: '6. Decision Support', desc: 'Explainable Clinical Risk', tab: 'results' as NavItemKey, status: 'Calibrated' },
  ];

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Hero Welcome Banner with 3D Quantum Topology */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50/80 text-indigo-700 rounded-full text-xs font-semibold mb-3 border border-indigo-100/80">
              <Atom className="w-3.5 h-3.5" />
              <span>Quantum Machine Learning for Healthcare</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Quantum ML Healthcare Platform
            </h2>
            <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
              AI-assisted clinical research, quantum machine learning, and reproducible model evaluation. 
              Designed for translational healthcare researchers, clinical scientists, and quantum physicists.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={onStartDemo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Guided Workflow (Cardio VQC)</span>
              </button>
              <button
                onClick={() => onNavigate('qml-lab')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg text-xs font-semibold transition-all"
              >
                <Atom className="w-3.5 h-3.5 text-indigo-600" />
                <span>Open 3D Quantum Studio</span>
              </button>
            </div>
          </div>

          {/* Three.js Quantum Lattice */}
          <div className="lg:col-span-1">
            <ThreeHilbertLattice qubitsCount={4} className="shadow-2xs" />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="glass-card glass-card-hover rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-stone-600 truncate">{k.label}</span>
                <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-bold text-stone-900 font-mono tracking-tight">{k.value}</div>
              <div className="text-[10px] text-amber-900/60 mt-0.5 truncate font-mono">{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* End-to-End Pipeline Overview */}
      <div className="glass-card rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-serif-title tracking-tight">End-to-End Architectural Pipeline</h3>
            <p className="text-xs text-stone-600">Traceable workflow connecting clinical data to quantum simulation and validated decision support</p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-100/80 text-emerald-800 border border-emerald-300/50 rounded-full font-medium">
            Pipeline Validated
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {pipelineStages.map((stage, i) => (
            <div
              key={i}
              onClick={() => onNavigate(stage.tab)}
              className="p-3 bg-white/70 hover:bg-amber-50/80 border border-amber-200/50 hover:border-amber-300 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-800 mb-1">
                  <span>{stage.title}</span>
                  <ArrowRight className="w-3 h-3 text-amber-600/70 group-hover:text-amber-700 transition-colors" />
                </div>
                <p className="text-[11px] text-stone-600 leading-tight line-clamp-2">{stage.desc}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/30 flex items-center justify-between text-[10px]">
                <span className="text-stone-400">Status:</span>
                <span className="font-mono text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded font-medium">
                  {stage.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Recent Experiments & Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Experiments (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-stone-900 font-serif-title">Recent Model Benchmarks</h3>
            <button
              onClick={() => onNavigate('models')}
              className="text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1"
            >
              <span>View All Models</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Family</th>
                  <th className="py-2.5 px-3">Dataset</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3">ROC-AUC</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MODELS.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-800">{m.name}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        m.family === 'HYBRID' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                          : m.family === 'QUANTUM_ML' 
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {m.family}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 truncate max-w-[140px]">{m.datasetName}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-600 font-semibold">{m.auc.toFixed(3)}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quantum Activity & System Health (1 Col) */}
        <div className="space-y-6">
          {/* Quantum Activity */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-600" />
                Quantum Activity
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Simulation Mode</span>
            </div>

            <div className="space-y-3">
              {MOCK_QUANTUM_JOBS.map((j) => (
                <div key={j.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-md text-xs space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-800">{j.circuitName}</span>
                    <span className="font-mono text-indigo-600">{j.qubits} Qubits</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{j.backend}</span>
                    <span>{j.shots} shots · {j.executionTimeMs}ms</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('quantum-exec')}
              className="w-full mt-3 py-1.5 text-center text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 rounded transition-colors"
            >
              Open Quantum Execution Gateway →
            </button>
          </div>

          {/* Microservices Health */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Microservice Health</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Core REST API', status: 'Healthy', latency: '12ms' },
                { name: 'Synthetic Data Layer', status: 'Healthy', latency: '18ms' },
                { name: 'PyTorch / Qiskit Runtime', status: 'Healthy', latency: '34ms' },
                { name: 'Aer Simulator Cluster', status: 'Healthy', latency: '42ms' },
                { name: 'Evaluation Verification Vault', status: 'Healthy', latency: '8ms' }
              ].map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-700">{svc.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{svc.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
