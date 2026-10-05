import React, { useState } from 'react';
import { 
  Database, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Sliders
} from 'lucide-react';

interface QMLPipelineFlowProps {
  currentStep?: number;
  onSelectStage?: (stageIndex: number) => void;
  predictedRiskScore?: number;
}

export const QMLPipelineFlow: React.FC<QMLPipelineFlowProps> = ({
  currentStep = 3,
  onSelectStage,
  predictedRiskScore = 0.284
}) => {
  const [activeStage, setActiveStage] = useState(2);

  const stages = [
    {
      id: 0,
      title: '1. Patient Features',
      icon: Database,
      short: 'ECG, HR, ST, Troponin',
      description: '4 continuous clinical biomarkers extracted from patient electronic health records and normalized to [-π, π].',
      metrics: 'x = [0.82, -1.24, 0.45, 1.88]'
    },
    {
      id: 1,
      title: '2. Angle Encoding',
      icon: Layers,
      short: 'U_Φ(x) Feature Map',
      description: 'Encodes classical vectors into high-dimensional Hilbert space via single-qubit rotations: |ψ(x)⟩ = ⊗ Ry(xi)|0⟩.',
      metrics: 'Dim(H) = 2⁴ = 16 states'
    },
    {
      id: 2,
      title: '3. Variational Ansatz',
      icon: Cpu,
      short: 'Entanglement & Rotations',
      description: 'Parameterized unitary U(θ) combining nearest-neighbor CNOT entanglers with tunable rotation layers Rz(θ), Ry(φ).',
      metrics: '18 Params · Depth 14'
    },
    {
      id: 3,
      title: '4. Measurement',
      icon: Activity,
      short: 'Observable ⟨Z₀⟩',
      description: 'Projects quantum state onto computational Z-basis, computing expectation value ⟨Z₀⟩ = Tr(ρ σ_z) via statistical shots.',
      metrics: '2,048 Shots · Aer Statevector'
    },
    {
      id: 4,
      title: '5. Decision Output',
      icon: CheckCircle2,
      short: 'Clinical Risk Prediction',
      description: 'Converts observable expectation into calibrated cardiac arrhythmia probability with confidence intervals.',
      metrics: `P(Risk) = ${(predictedRiskScore * 100).toFixed(1)}%`
    }
  ];

  return (
    <div className="scientific-card rounded-2xl p-5 space-y-4 shadow-xs border border-amber-200/50">
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
            End-to-End QML Healthcare Decision Flow
          </h4>
        </div>
        <span className="text-[10px] font-mono text-amber-950 bg-amber-500/15 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/40">
          Hilbert Space Embedding
        </span>
      </div>

      {/* Stepper Diagram Horizontal Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => {
                setActiveStage(stage.id);
                if (onSelectStage) onSelectStage(stage.id);
              }}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 shadow-xs ring-1 ring-amber-400/60'
                  : 'border-amber-200/60 bg-white/70 hover:border-amber-300 hover:bg-amber-50/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-600 text-white shadow-2xs' : 'bg-amber-500/15 text-amber-800'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono font-extrabold text-stone-400">
                  0{stage.id + 1}
                </span>
              </div>

              <div className="text-xs font-extrabold text-stone-900 leading-tight">
                {stage.title.split('. ')[1]}
              </div>
              <div className="text-[10px] text-stone-500 font-mono mt-0.5 truncate">
                {stage.short}
              </div>

              <div className="mt-2.5 pt-1.5 border-t border-amber-200/40 text-[10px] font-mono font-bold text-amber-800">
                {stage.metrics}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Drawer */}
      <div className="p-3.5 bg-white/80 rounded-xl border border-amber-200/60 text-xs flex items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="font-extrabold text-stone-900 mr-2">{stages[activeStage].title}:</span>
          <span className="text-stone-600 text-[11px]">{stages[activeStage].description}</span>
        </div>
        <span className="font-mono text-[10px] px-2.5 py-1 bg-amber-500/15 border border-amber-400/40 rounded-lg shrink-0 text-amber-950 font-extrabold">
          {stages[activeStage].metrics}
        </span>
      </div>
    </div>
  );
};
