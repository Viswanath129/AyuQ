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
  Cpu, 
  ExternalLink,
  Sparkles,
  Play
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ThreeHilbertLattice } from '../../components/quantum/ThreeHilbertLattice';
import { MOCK_MODELS, MOCK_DATASETS, MOCK_QUANTUM_JOBS } from '../../services/mockData';
import { NavItemKey } from '../../components/layout/Sidebar';
import { Strands } from '../../components/react-bits';
import { DatasetSourceBadge } from '../../components/common/DatasetSourceBadge';

interface OverviewDashboardProps {
  onNavigate: (tab: NavItemKey) => void;
  onStartDemo: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigate, onStartDemo }) => {
  const kpis = [
    { label: 'Active Datasets', value: MOCK_DATASETS.length.toString(), sub: 'Synthetic & De-identified', icon: Database, color: 'text-amber-800', bg: 'bg-amber-500/15' },
    { label: 'Models in Registry', value: MOCK_MODELS.length.toString(), sub: 'Classical, QML & Hybrid', icon: Layers, color: 'text-indigo-700', bg: 'bg-indigo-500/15' },
    { label: 'QML Experiments', value: '48', sub: 'Variational circuits tested', icon: Atom, color: 'text-purple-700', bg: 'bg-purple-500/15' },
    { label: 'Evaluation Runs', value: '12', sub: 'Cross-validated & locked', icon: CheckSquare, color: 'text-emerald-800', bg: 'bg-emerald-500/15' },
    { label: 'Prediction Inferences', value: '1,280', sub: 'Simulated clinical cases', icon: Activity, color: 'text-rose-700', bg: 'bg-rose-500/15' },
    { label: 'System Health', value: '99.9%', sub: 'All 6 microservices healthy', icon: Server, color: 'text-teal-800', bg: 'bg-teal-500/15' }
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

      {/* Hero Welcome Banner with 3D Quantum Topology: Translucent Warm Glass */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden border border-amber-200/50">
        {/* React Bits Strands: Luminous flowing ribbon strands */}
        <div className="absolute inset-0 pointer-events-none opacity-35 z-0 overflow-hidden">
          <Strands colors={['#f59e0b', '#d97706', '#0284c7', '#fbbf24']} count={3} speed={0.3} glow={2.4} opacity={0.6} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 text-amber-900 rounded-full text-xs font-semibold mb-3 border border-amber-400/40 backdrop-blur-xs">
              <img src="/logo.png" alt="AyuQ Logo" className="w-4 h-4 object-contain drop-shadow-2xs" />
              <span>AyuQ · Hybrid Quantum Intelligence for Early Disease Detection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              AyuQ Quantum Healthcare Research OS
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
              AI-assisted clinical research, parameterized quantum variational circuits, verified public dataset benchmarks (UCI WDBC & Cleveland Heart Disease), and mathematically locked model validation.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={onStartDemo}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs group"
              >
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
                <span>Launch Guided Tour (Cardio VQC)</span>
              </button>
              <button
                onClick={() => onNavigate('qml-lab')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/85 hover:bg-white text-stone-800 border border-amber-300/60 rounded-xl text-xs font-bold transition-all shadow-2xs backdrop-blur-xs hover:border-amber-400"
              >
                <Atom className="w-4 h-4 text-amber-700" />
                <span>Open 3D Quantum Circuit Studio</span>
              </button>
            </div>
          </div>

          {/* Three.js Quantum Lattice */}
          <div className="lg:col-span-1">
            <ThreeHilbertLattice qubitsCount={4} className="shadow-2xs rounded-xl overflow-hidden border border-amber-200/40" />
          </div>
        </div>
      </div>

      {/* KPI Cards: Translucent Warm Glass Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="glass-card glass-card-hover rounded-xl p-3.5 shadow-2xs border border-amber-200/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-stone-600 truncate">{k.label}</span>
                <div className={`w-7 h-7 rounded-lg ${k.bg} ${k.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-extrabold text-stone-900 font-mono tracking-tight">{k.value}</div>
              <div className="text-[10px] text-stone-500 mt-0.5 truncate font-mono">{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* End-to-End Pipeline Overview */}
      <div className="glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">End-to-End Architectural Pipeline</h3>
            <p className="text-xs text-stone-600">Traceable workflow connecting clinical data to quantum simulation and validated decision support</p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 bg-emerald-500/15 text-emerald-950 border border-emerald-500/30 rounded-full font-bold">
            Pipeline Verified
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {pipelineStages.map((stage, i) => (
            <div
              key={i}
              onClick={() => onNavigate(stage.tab)}
              className="p-3 bg-white/75 hover:bg-amber-50/90 border border-amber-200/60 hover:border-amber-400 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-2xs backdrop-blur-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-900 mb-1">
                  <span>{stage.title}</span>
                  <ArrowRight className="w-3 h-3 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-stone-600 leading-tight line-clamp-2">{stage.desc}</p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-amber-200/30 flex items-center justify-between text-[10px]">
                <span className="text-stone-500 font-medium">Status:</span>
                <span className="font-mono text-emerald-900 bg-emerald-500/15 px-1.5 py-0.5 rounded font-bold border border-emerald-500/25">
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
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">Recent Model Benchmarks</h3>
              <p className="text-[11px] text-stone-500">Cross-validated healthcare diagnostic architectures</p>
            </div>
            <button
              onClick={() => onNavigate('models')}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 hover:underline"
            >
              <span>View All Models</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/60 text-stone-600 font-bold border-b border-amber-200/60">
                <tr>
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Family</th>
                  <th className="py-2.5 px-3">Dataset Source</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3">ROC-AUC</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200/30">
                {MOCK_MODELS.map((m) => (
                  <tr key={m.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-stone-900">{m.name}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        m.family === 'HYBRID' 
                          ? 'bg-purple-500/15 text-purple-950 border border-purple-400/40' 
                          : m.family === 'QUANTUM_ML' 
                          ? 'bg-amber-500/20 text-amber-950 border border-amber-400/50' 
                          : 'bg-stone-200/70 text-stone-700'
                      }`}>
                        {m.family}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <DatasetSourceBadge datasetId={m.datasetId} datasetName={m.datasetName} variant="badge" />
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-stone-800">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-800 font-extrabold">{m.auc.toFixed(3)}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-900 bg-emerald-500/15 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
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
          <div className="glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-700" />
                Quantum Activity
              </h3>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full font-bold">
                Simulation Mode
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_QUANTUM_JOBS.map((j) => (
                <div key={j.id} className="p-3 bg-white/80 border border-amber-200/60 rounded-xl text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-start font-bold">
                    <div>
                      <span className="text-stone-900 block font-extrabold">{j.circuitName}</span>
                      {j.modelName && <span className="text-[10px] text-stone-500 font-mono">Model: {j.modelName}</span>}
                    </div>
                    <span className="font-mono text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full text-[10px] font-bold">{j.qubits} Qubits</span>
                  </div>

                  {/* Explicit Dataset Association */}
                  <div className="flex items-center gap-1.5 text-[11px] pt-0.5">
                    <span className="text-stone-500 font-medium">Dataset:</span>
                    <DatasetSourceBadge datasetId={j.datasetId} datasetName={j.datasetName} variant="link" />
                  </div>

                  <div className="flex justify-between text-[11px] text-stone-500 font-mono pt-1 border-t border-amber-100">
                    <span>{j.backend}</span>
                    <span>{j.shots} shots · {j.executionTimeMs}ms</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('quantum-exec')}
              className="w-full mt-3 py-2 text-center text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl transition-all border border-amber-400/50 shadow-2xs flex items-center justify-center gap-1.5"
            >
              <span>Open Quantum Execution Gateway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Microservices Health */}
          <div className="glass-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
            <h3 className="text-sm font-extrabold text-stone-900 mb-3">Microservice Health</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Core REST API', status: 'Healthy', latency: '12ms' },
                { name: 'Synthetic Data Layer', status: 'Healthy', latency: '18ms' },
                { name: 'PyTorch / Qiskit Runtime', status: 'Healthy', latency: '34ms' },
                { name: 'Aer Simulator Cluster', status: 'Healthy', latency: '42ms' },
                { name: 'Evaluation Verification Vault', status: 'Healthy', latency: '8ms' }
              ].map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-amber-200/20 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs"></span>
                    <span className="text-stone-700 font-medium">{svc.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">{svc.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

