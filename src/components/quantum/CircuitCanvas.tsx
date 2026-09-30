import React from 'react';
import { QuantumCircuitGate } from '../../types';
import { Plus, Trash2, Cpu } from 'lucide-react';

interface CircuitCanvasProps {
  qubitsCount: number;
  gates: QuantumCircuitGate[];
  onAddGate: (gate: Omit<QuantumCircuitGate, 'id'>) => void;
  onRemoveGate: (id: string) => void;
  isReadOnly?: boolean;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  qubitsCount = 4,
  gates,
  onAddGate,
  onRemoveGate,
  isReadOnly = false
}) => {
  const stepsCount = 8;
  const qubits = Array.from({ length: qubitsCount }, (_, i) => i);

  // Group gates by qubit and step
  const getGateAt = (qubit: number, step: number) => {
    return gates.find(g => g.qubit === qubit && g.step === step);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 overflow-x-auto shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-semibold text-slate-800">Parameterized Variational Circuit Canvas</h4>
          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 font-mono">
            {qubitsCount} Qubits · {gates.length} Gates · Depth: 18
          </span>
        </div>
        {!isReadOnly && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 mr-1">Quick Add:</span>
            {(['H', 'RZ', 'RY', 'RX', 'M'] as const).map(g => (
              <button
                key={g}
                onClick={() => {
                  // Find next open step
                  const targetStep = Math.min(stepsCount - 1, gates.length % stepsCount);
                  const targetQubit = (gates.length) % qubitsCount;
                  onAddGate({
                    qubit: targetQubit,
                    step: targetStep,
                    gateType: g,
                    param: g.startsWith('R') ? 'θ_i' : undefined
                  });
                }}
                className="px-2 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-slate-700 font-mono font-medium rounded border border-slate-200 transition-colors"
              >
                +{g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Circuit Grid Wire Area */}
      <div className="min-w-[620px] py-3">
        {qubits.map((qubitIndex) => (
          <div key={qubitIndex} className="flex items-center h-14 relative group">
            {/* Qubit identifier badge */}
            <div className="w-14 shrink-0 font-mono text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              |q{qubitIndex}⟩
            </div>

            {/* Horizontal Quantum Wire Line */}
            <div className="absolute left-16 right-4 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-300 z-0"></div>

            {/* Step Slots */}
            <div className="flex items-center justify-between w-full pl-6 pr-2 z-10">
              {Array.from({ length: stepsCount }, (_, stepIndex) => {
                const gate = getGateAt(qubitIndex, stepIndex);
                return (
                  <div
                    key={stepIndex}
                    className="w-12 h-12 flex items-center justify-center relative"
                  >
                    {gate ? (
                      <div className="relative group/gate">
                        <div
                          className={`w-9 h-9 rounded flex flex-col items-center justify-center font-mono text-xs font-bold shadow-xs border transition-transform hover:scale-105 ${
                            gate.gateType === 'H'
                              ? 'bg-blue-50 border-blue-400 text-blue-700'
                              : gate.gateType.startsWith('R')
                              ? 'bg-purple-50 border-purple-400 text-purple-700'
                              : gate.gateType === 'M'
                              ? 'bg-slate-100 border-slate-400 text-slate-800'
                              : 'bg-indigo-50 border-indigo-400 text-indigo-700'
                          }`}
                        >
                          <span>{gate.gateType}</span>
                          {gate.param && <span className="text-[8px] font-normal leading-none opacity-80">{gate.param}</span>}
                        </div>
                        {!isReadOnly && (
                          <button
                            onClick={() => onRemoveGate(gate.id)}
                            className="absolute -top-1.5 -right-1.5 hidden group-hover/gate:flex w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center text-[10px] hover:bg-red-600 shadow-xs"
                            title="Remove gate"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ) : (
                      !isReadOnly && (
                        <button
                          onClick={() =>
                            onAddGate({
                              qubit: qubitIndex,
                              step: stepIndex,
                              gateType: 'H'
                            })
                          }
                          className="w-6 h-6 rounded-full border border-dashed border-slate-300 opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:border-indigo-400 hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all text-xs"
                          title="Place gate"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-100 border border-blue-400 rounded-xs"></span> Hadamard (H)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-purple-100 border border-purple-400 rounded-xs"></span> Rotation (Rx, Ry, Rz)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-indigo-100 border border-indigo-400 rounded-xs"></span> Entanglement (CNOT)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-200 border border-slate-400 rounded-xs"></span> Measurement (M)
          </span>
        </div>
        <span className="font-mono text-slate-400">ZZFeatureMap + RealAmplitudes Topology</span>
      </div>
    </div>
  );
};
