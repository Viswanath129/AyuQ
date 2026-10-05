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
    <div className="scientific-card rounded-2xl p-5 shadow-xs border border-amber-200/50">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">Transpilation & Topology Optimization</h4>
        </div>
        <span className="text-[10px] font-mono text-amber-950 bg-amber-500/15 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/40">
          Target: {backendName}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative items-stretch">
        {/* Stage 1: Abstract High-Level Circuit */}
        <div className="p-3.5 bg-white/75 border border-amber-200/60 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Stage 1</div>
            <div className="text-xs font-extrabold text-stone-900 mb-1">High-Level Circuit</div>
            <p className="text-[11px] text-stone-600 leading-snug">Algorithmic gates (H, RX, RY, RZ, Multi-Controlled CNOT)</p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-200/40 font-mono text-xs text-stone-600 flex justify-between">
            <span>Raw Depth:</span>
            <span className="font-extrabold text-stone-900">{originalDepth}</span>
          </div>
        </div>

        {/* Stage 2: Synthesis & Cancellation */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-300/60 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">Stage 2</div>
            <div className="text-xs font-extrabold text-stone-900 mb-1">Pass Manager (Level 3)</div>
            <p className="text-[11px] text-stone-700 leading-snug">Commutative cancellation, 2-qubit unitary synthesis & routing</p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-300/40 font-mono text-xs text-amber-900 flex justify-between">
            <span className="font-bold">Gate Reduction:</span>
            <span className="font-extrabold">-{cnotReduction}% CNOTs</span>
          </div>
        </div>

        {/* Stage 3: Hardware-Native Basis Gates */}
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-300/60 rounded-xl flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Stage 3
            </div>
            <div className="text-xs font-extrabold text-stone-900 mb-1">Hardware Native Basis</div>
            <p className="text-[11px] text-stone-700 leading-snug">Mapped to basis [cx, id, rz, sx, x] adhering to coupling map</p>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-300/40 font-mono text-xs text-emerald-900 flex justify-between">
            <span className="font-bold">Transpiled Depth:</span>
            <span className="font-extrabold">{optimizedDepth}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
