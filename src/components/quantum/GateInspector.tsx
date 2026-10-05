import React from 'react';
import { CircuitGate, QuantumSimulator } from '../../services/quantum/QuantumSimulator';
import { Sliders, Trash2, Code2, Cpu, Info } from 'lucide-react';

interface GateInspectorProps {
  gate: CircuitGate | null;
  onUpdateGate: (updatedGate: CircuitGate) => void;
  onRemoveGate: (id: string) => void;
  onClose: () => void;
  qubitsCount: number;
}

export const GateInspector: React.FC<GateInspectorProps> = ({
  gate,
  onUpdateGate,
  onRemoveGate,
  onClose,
  qubitsCount
}) => {
  if (!gate) {
    return (
      <div className="glass-card rounded-2xl p-5 text-center border border-amber-200/50 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-800 mx-auto mb-2.5">
          <Cpu className="w-5 h-5" />
        </div>
        <p className="text-xs font-bold text-stone-900">No Gate Selected</p>
        <p className="text-[11px] text-stone-600 mt-1 max-w-sm mx-auto">
          Click any quantum gate on the circuit canvas to inspect parameters, view its unitary matrix, or adjust rotation angles.
        </p>
      </div>
    );
  }

  const isRotation = ['RX', 'RY', 'RZ'].includes(gate.gateType);
  const currentAngle = gate.angle ?? 0;
  const angleDeg = Math.round((currentAngle * 180) / Math.PI);
  const matrix = QuantumSimulator.getGateMatrix(gate.gateType, currentAngle);

  // Common angle presets
  const presets = [
    { label: '0', val: 0 },
    { label: 'π/4 (45°)', val: Math.PI / 4 },
    { label: 'π/2 (90°)', val: Math.PI / 2 },
    { label: 'π (180°)', val: Math.PI },
    { label: '3π/2 (270°)', val: (3 * Math.PI) / 2 }
  ];

  return (
    <div className="scientific-card rounded-2xl p-5 space-y-4 shadow-xs border border-amber-200/50">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
            <Sliders className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">Quantum Gate Inspector</h4>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-950 font-extrabold rounded-md border border-amber-400/50">
            {gate.gateType}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-md hover:bg-stone-100"
        >
          ✕
        </button>
      </div>

      {/* Target & Wire Info */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[10px] text-stone-600 font-bold uppercase block mb-1">
            Target Wire
          </label>
          <select
            value={gate.qubit}
            onChange={(e) => onUpdateGate({ ...gate, qubit: parseInt(e.target.value, 10) })}
            className="w-full bg-white/85 border border-amber-200/80 rounded-xl px-2.5 py-1.5 font-mono text-stone-900 font-bold text-xs focus:ring-1 focus:ring-amber-500"
          >
            {Array.from({ length: qubitsCount }, (_, i) => (
              <option key={i} value={i}>
                Qubit |q{i}⟩
              </option>
            ))}
          </select>
        </div>

        {gate.gateType === 'CNOT' && (
          <div>
            <label className="text-[10px] text-stone-600 font-bold uppercase block mb-1">
              Target Qubit
            </label>
            <select
              value={gate.targetQubit ?? (gate.qubit + 1) % qubitsCount}
              onChange={(e) => onUpdateGate({ ...gate, targetQubit: parseInt(e.target.value, 10) })}
              className="w-full bg-white/85 border border-amber-200/80 rounded-xl px-2.5 py-1.5 font-mono text-stone-900 font-bold text-xs focus:ring-1 focus:ring-amber-500"
            >
              {Array.from({ length: qubitsCount }, (_, i) => i)
                .filter((q) => q !== gate.qubit)
                .map((q) => (
                  <option key={q} value={q}>
                    Target |q{q}⟩
                  </option>
                ))}
            </select>
          </div>
        )}

        <div>
          <label className="text-[10px] text-stone-600 font-bold uppercase block mb-1">
            Execution Step
          </label>
          <div className="px-2.5 py-1.5 bg-white/80 border border-amber-200/80 rounded-xl font-mono text-stone-800 font-bold text-xs">
            Step {gate.step + 1}
          </div>
        </div>
      </div>

      {/* Rotation Angle Parameter Slider */}
      {isRotation && (
        <div className="space-y-2.5 bg-amber-500/10 p-3.5 rounded-xl border border-amber-300/40">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-800">Rotation Angle (θ):</span>
            <span className="font-mono font-extrabold text-amber-900">
              {angleDeg}° · {(currentAngle / Math.PI).toFixed(3)}π rad
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="6.28318"
            step="0.05"
            value={currentAngle}
            onChange={(e) => onUpdateGate({ ...gate, angle: parseFloat(e.target.value) })}
            className="w-full accent-amber-600 h-1.5 bg-amber-200/80 rounded-lg cursor-pointer"
          />

          <div className="flex flex-wrap gap-1 mt-1.5">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => onUpdateGate({ ...gate, angle: p.val })}
                className={`text-[10px] px-2 py-0.5 rounded-lg font-mono border transition-all ${
                  Math.abs(currentAngle - p.val) < 0.05
                    ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-xs'
                    : 'bg-white/85 text-stone-700 border-amber-200/80 hover:bg-amber-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2x2 Unitary Matrix Preview */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
            Unitary Operator Matrix U({gate.gateType})
          </span>
          <span className="text-[9px] font-mono text-emerald-900 bg-emerald-500/15 px-1.5 py-0.2 rounded font-bold border border-emerald-500/30">
            U†U = I
          </span>
        </div>

        <div className="bg-stone-900 text-amber-100 font-mono text-[10px] p-3 rounded-xl grid grid-cols-2 gap-2 text-center border border-amber-900/40 shadow-xs">
          <div className="bg-stone-800/90 p-2 rounded-lg border border-stone-700/60 font-bold">
            {matrix[0][0].re.toFixed(2)} {matrix[0][0].im !== 0 ? `${matrix[0][0].im >= 0 ? '+' : ''}${matrix[0][0].im.toFixed(2)}i` : ''}
          </div>
          <div className="bg-stone-800/90 p-2 rounded-lg border border-stone-700/60 font-bold">
            {matrix[0][1].re.toFixed(2)} {matrix[0][1].im !== 0 ? `${matrix[0][1].im >= 0 ? '+' : ''}${matrix[0][1].im.toFixed(2)}i` : ''}
          </div>
          <div className="bg-stone-800/90 p-2 rounded-lg border border-stone-700/60 font-bold">
            {matrix[1][0].re.toFixed(2)} {matrix[1][0].im !== 0 ? `${matrix[1][0].im >= 0 ? '+' : ''}${matrix[1][0].im.toFixed(2)}i` : ''}
          </div>
          <div className="bg-stone-800/90 p-2 rounded-lg border border-stone-700/60 font-bold">
            {matrix[1][1].re.toFixed(2)} {matrix[1][1].im !== 0 ? `${matrix[1][1].im >= 0 ? '+' : ''}${matrix[1][1].im.toFixed(2)}i` : ''}
          </div>
        </div>
      </div>

      {/* OpenQASM Export Snippet */}
      <div className="text-[10px] font-mono bg-white/80 p-2.5 rounded-xl border border-amber-200/60 text-stone-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-bold">
            {gate.gateType === 'CNOT'
              ? `cx q[${gate.qubit}], q[${gate.targetQubit ?? (gate.qubit + 1) % qubitsCount}];`
              : isRotation
              ? `${gate.gateType.toLowerCase()}(${(currentAngle).toFixed(3)}) q[${gate.qubit}];`
              : `${gate.gateType.toLowerCase()} q[${gate.qubit}];`}
          </span>
        </span>
        <span className="text-amber-700 font-bold">OpenQASM 2.0</span>
      </div>

      {/* Delete Action */}
      <div className="pt-2 border-t border-amber-200/30 flex justify-end">
        <button
          onClick={() => onRemoveGate(gate.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove Gate</span>
        </button>
      </div>
    </div>
  );
};

