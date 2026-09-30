import React from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface TranspilationPipelineProps {
  originalDepth?: number;
  optimizedDepth?: number;
  cnotReduction?: number;
  backendName?: string;
}

export const TranspilationPipeline: React.FC<TranspilationPipelineProps> = ({
  originalDepth = 22,
  optimizedDepth = 16,
  cnotReduction = 27.3,
  backendName = 'Aer Simulator (Falcon QPU Topology)'
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-semibold text-slate-800">Transpilation & Topology Optimization</h4>
        </div>
        <span className="text-xs font-mono text-slate-500">Target: {backendName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative items-stretch">
        {/* Stage 1: Abstract High-Level Circuit */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Stage 1</div>
            <div className="text-sm font-semibold text-slate-800 mb-1">High-Level Circuit</div>
            <p className="text-xs text-slate-500">Algorithmic gates (H, RX, RY, RZ, Multi-Controlled CNOT)</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 font-mono text-xs text-slate-600 flex justify-between">
            <span>Raw Depth:</span>
            <span className="font-semibold text-slate-800">{originalDepth}</span>
          </div>
        </div>

        {/* Stage 2: Synthesis & Cancellation */}
        <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-md flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-1">Stage 2</div>
            <div className="text-sm font-semibold text-slate-800 mb-1">Pass Manager (Level 3)</div>
            <p className="text-xs text-slate-600">Commutative cancellation, 2-qubit unitary synthesis & routing</p>
          </div>
          <div className="mt-3 pt-2 border-t border-indigo-200/60 font-mono text-xs text-indigo-700 flex justify-between">
            <span>Gate Reduction:</span>
            <span className="font-semibold">-{cnotReduction}% CNOTs</span>
          </div>
        </div>

        {/* Stage 3: Hardware-Native Basis Gates */}
        <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-md flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Stage 3
            </div>
            <div className="text-sm font-semibold text-slate-800 mb-1">Hardware Native Basis</div>
            <p className="text-xs text-slate-600">Mapped to basis [cx, id, rz, sx, x] adhering to coupling map</p>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-200/60 font-mono text-xs text-emerald-700 flex justify-between">
            <span>Transpiled Depth:</span>
            <span className="font-semibold">{optimizedDepth}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
