import React from 'react';
import { CircuitGate, GateTypeName } from '../../services/quantum/QuantumSimulator';
import { Plus, Trash2, Cpu, Sparkles, RotateCcw, Layers } from 'lucide-react';

interface CircuitCanvasProps {
  qubitsCount: number;
  gates: CircuitGate[];
  selectedGateId: string | null;
  onSelectGate: (gate: CircuitGate | null) => void;
  onAddGate: (gate: Omit<CircuitGate, 'id'>) => void;
  onRemoveGate: (id: string) => void;
  onLoadPreset: (presetName: string) => void;
  onQubitsCountChange: (count: number) => void;
  onClearCircuit: () => void;
  isReadOnly?: boolean;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  qubitsCount = 4,
  gates,
  selectedGateId,
  onSelectGate,
  onAddGate,
  onRemoveGate,
  onLoadPreset,
  onQubitsCountChange,
  onClearCircuit,
  isReadOnly = false
}) => {
  const stepsCount = 8;
  const qubits = Array.from({ length: qubitsCount }, (_, i) => i);

  // Helper to find gate at coordinate
  const getGateAt = (qubit: number, step: number) => {
    return gates.find((g) => g.qubit === qubit && g.step === step);
  };

  // Find CNOT connections for drawing SVG vertical link lines
  const cnotGates = gates.filter(
    (g) => g.gateType === 'CNOT' && g.targetQubit !== undefined
  );

  return (
    <div className="glass-quantum-surface rounded-2xl p-5 space-y-4 shadow-sm border border-amber-200/50">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
            <Cpu className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
            Interactive Quantum Circuit Canvas
          </h4>
          <span className="text-[10px] px-2.5 py-0.5 bg-amber-500/15 text-amber-950 font-mono rounded-full font-bold border border-amber-400/40 backdrop-blur-xs">
            {qubitsCount} Qubits · {gates.length} Gates · Depth {gates.length > 0 ? Math.max(...gates.map(g => g.step)) + 1 : 0}
          </span>
        </div>

        {/* Qubit count selector & presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs p-0.5 rounded-xl border border-amber-200/70">
            <span className="text-[10px] text-stone-500 px-1.5 font-bold">Qubits:</span>
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => onQubitsCountChange(count)}
                className={`px-2 py-0.5 text-xs font-mono rounded-lg transition-all ${
                  qubitsCount === count
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50'
                }`}
              >
                {count}Q
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onLoadPreset('bell')}
              className="px-2.5 py-1 bg-white/85 hover:bg-white text-stone-800 border border-amber-200/80 rounded-xl text-[11px] font-bold transition-all backdrop-blur-xs shadow-2xs hover:border-amber-400"
            >
              Bell State
            </button>
            <button
              onClick={() => onLoadPreset('ghz')}
              className="px-2.5 py-1 bg-white/85 hover:bg-white text-stone-800 border border-amber-200/80 rounded-xl text-[11px] font-bold transition-all backdrop-blur-xs shadow-2xs hover:border-amber-400"
            >
              GHZ
            </button>
            <button
              onClick={() => onLoadPreset('cardiac')}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 border border-amber-400/60 rounded-xl text-[11px] font-extrabold transition-all backdrop-blur-xs shadow-2xs"
            >
              Cardiac Map
            </button>
            <button
              onClick={() => onLoadPreset('wbcd')}
              className="px-2.5 py-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-950 border border-rose-300/60 rounded-xl text-[11px] font-extrabold transition-all backdrop-blur-xs shadow-2xs"
              title="Wisconsin Breast Cancer VQC (Vegisetti et al. 2026)"
            >
              WBCD VQC (Paper)
            </button>
            <button
              onClick={onClearCircuit}
              className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors hover:bg-rose-50"
              title="Clear Circuit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gate Placement Palette: Translucent Warm Glass */}
      {!isReadOnly && (
        <div className="flex items-center gap-1.5 flex-wrap p-2.5 bg-white/75 backdrop-blur-md rounded-xl border border-amber-200/60 text-xs">
          <span className="text-[11px] font-bold text-stone-700 mr-1 flex items-center gap-1">
            <Plus className="w-3 h-3 text-amber-700" /> Place Gate:
          </span>

          {(['H', 'X', 'Y', 'Z', 'RX', 'RY', 'RZ', 'CNOT', 'M'] as GateTypeName[]).map((gType) => (
            <button
              key={gType}
              onClick={() => {
                const targetQubit = 0;
                let targetStep = 0;
                while (targetStep < stepsCount && getGateAt(targetQubit, targetStep)) {
                  targetStep++;
                }
                onAddGate({
                  qubit: targetQubit,
                  step: Math.min(stepsCount - 1, targetStep),
                  gateType: gType,
                  angle: gType.startsWith('R') ? Math.PI / 4 : undefined,
                  targetQubit: gType === 'CNOT' ? (qubitsCount > 1 ? 1 : 0) : undefined
                });
              }}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] border transition-all hover:scale-105 backdrop-blur-xs shadow-2xs ${
                gType === 'H'
                  ? 'bg-blue-500/15 border-blue-400/50 text-blue-900 hover:bg-blue-500/25'
                  : gType.startsWith('R')
                  ? 'bg-purple-500/15 border-purple-400/50 text-purple-900 hover:bg-purple-500/25'
                  : gType === 'CNOT'
                  ? 'bg-amber-600 border-amber-700 text-white hover:bg-amber-700'
                  : gType === 'M'
                  ? 'bg-stone-800 border-stone-900 text-white hover:bg-stone-900'
                  : 'bg-emerald-500/15 border-emerald-400/50 text-emerald-900 hover:bg-emerald-500/25'
              }`}
            >
              +{gType}
            </button>
          ))}
          <span className="text-[10px] text-stone-500 ml-auto hidden sm:inline font-mono">
            Click any gate to inspect parameters
          </span>
        </div>
      )}

      {/* Circuit Grid Wire Area: Floating Translucent Glass */}
      <div className="relative overflow-x-auto min-w-[580px] py-4 bg-white/75 backdrop-blur-md rounded-2xl border border-amber-200/50 shadow-2xs">
        {/* Step indicator header */}
        <div className="flex pl-20 pr-4 pb-2 mb-2 border-b border-amber-200/30 text-[10px] font-mono text-stone-500">
          {Array.from({ length: stepsCount }, (_, s) => (
            <div key={s} className="w-12 text-center font-bold">
              S{s + 1}
            </div>
          ))}
        </div>

        {/* Wires */}
        <div className="relative space-y-4">
          {qubits.map((qubitIndex) => (
            <div key={qubitIndex} className="flex items-center h-12 relative group pl-4">
              {/* Wire Label Badge */}
              <div className="w-14 shrink-0 font-mono text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs"></span>
                |q{qubitIndex}⟩
              </div>

              {/* Horizontal Wire Line */}
              <div className="absolute left-18 right-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-stone-300/80 z-0"></div>

              {/* Step Slots */}
              <div className="flex items-center w-full pl-4 pr-4 z-10">
                {Array.from({ length: stepsCount }, (_, stepIndex) => {
                  const gate = getGateAt(qubitIndex, stepIndex);
                  const isSelected = gate && selectedGateId === gate.id;

                  const isCnotTarget = gates.some(
                    (g) => g.gateType === 'CNOT' && g.step === stepIndex && g.targetQubit === qubitIndex
                  );
                  const cnotControlGate = gates.find(
                    (g) => g.gateType === 'CNOT' && g.step === stepIndex && g.targetQubit === qubitIndex
                  );

                  return (
                    <div
                      key={stepIndex}
                      className="w-12 h-12 flex items-center justify-center relative"
                    >
                      {gate ? (
                        <div
                          onClick={() => onSelectGate(gate)}
                          className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-extrabold shadow-xs border cursor-pointer transition-all ${
                            isSelected
                              ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-amber-50 scale-110 z-20 shadow-md shadow-amber-500/30 bg-white'
                              : 'hover:scale-105 backdrop-blur-xs'
                          } ${
                            gate.gateType === 'H'
                              ? 'bg-blue-500/15 border-blue-400/60 text-blue-950'
                              : gate.gateType.startsWith('R')
                              ? 'bg-purple-500/15 border-purple-400/60 text-purple-950'
                              : gate.gateType === 'CNOT'
                              ? 'bg-amber-600 border-amber-700 text-white'
                              : gate.gateType === 'M'
                              ? 'bg-stone-800 border-stone-900 text-white'
                              : 'bg-emerald-500/15 border-emerald-400/60 text-emerald-950'
                          }`}
                          title={`Click to inspect ${gate.gateType}`}
                        >
                          {gate.gateType === 'CNOT' ? (
                            <span className="text-base leading-none">●</span>
                          ) : (
                            <span>{gate.gateType}</span>
                          )}

                          {gate.angle !== undefined && (
                            <span className="text-[7px] font-bold leading-none opacity-90">
                              {Math.round((gate.angle * 180) / Math.PI)}°
                            </span>
                          )}
                        </div>
                      ) : isCnotTarget ? (
                        <div
                          onClick={() => {
                            if (cnotControlGate) onSelectGate(cnotControlGate);
                          }}
                          className="w-7 h-7 rounded-full bg-white/95 border-2 border-amber-600 text-amber-700 flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer z-10 hover:scale-110"
                          title="CNOT Target Operation ⊕"
                        >
                          ⊕
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
                            className="w-5 h-5 rounded-full border border-dashed border-stone-300 opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:border-amber-500 hover:bg-amber-50 flex items-center justify-center text-stone-400 hover:text-amber-700 transition-all text-xs"
                            title="Insert Hadamard gate here"
                          >
                            <Plus className="w-2.5 h-2.5" />
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

        {/* SVG Overlay for CNOT connecting vertical lines */}
        <svg
          className="absolute inset-0 pointer-events-none z-5"
          style={{ width: '100%', height: '100%' }}
        >
          {cnotGates.map((cGate) => {
            if (cGate.targetQubit === undefined) return null;
            const xPos = 84 + cGate.step * 48;
            const y1 = 38 + cGate.qubit * 48;
            const y2 = 38 + cGate.targetQubit * 48;

            return (
              <line
                key={`cnot-line-${cGate.id}`}
                x1={xPos}
                y1={y1}
                x2={xPos}
                y2={y2}
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-2 border-t border-amber-200/40 text-[11px] text-stone-600 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-100 border border-blue-400 rounded-xs"></span> Hadamard (H)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-purple-100 border border-purple-400 rounded-xs"></span> Parameterized (Rx, Ry, Rz)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-600 rounded-full"></span> CNOT Entanglement (●—⊕)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-stone-800 rounded-xs"></span> Measurement (M)
          </span>
        </div>
      </div>
    </div>
  );
};

