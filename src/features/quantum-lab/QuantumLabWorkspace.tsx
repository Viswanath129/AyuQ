import React, { useState } from 'react';
import { 
  Atom, 
  Cpu, 
  Play, 
  Sliders, 
  Code, 
  RotateCcw, 
  CheckCircle2, 
  Zap,
  Sparkles
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ThreeBlochSphere } from '../../components/quantum/ThreeBlochSphere';
import { CircuitCanvas } from '../../components/quantum/CircuitCanvas';
import { ProbabilityChart } from '../../components/quantum/ProbabilityChart';
import { TranspilationPipeline } from '../../components/quantum/TranspilationPipeline';
import { QuantumCircuitGate, QuantumExecutionJob } from '../../types';
import { mockQuantumService } from '../../services/mockQuantumService';

export const QuantumLabWorkspace: React.FC = () => {
  const [qubitsCount, setQubitsCount] = useState(4);
  const [shots, setShots] = useState(2048);
  const [backend, setBackend] = useState('Aer Statevector Simulator');
  const [ansatzType, setAnsatzType] = useState('RealAmplitudes');

  // Initial gates
  const [gates, setGates] = useState<QuantumCircuitGate[]>([
    { id: 'g-1', qubit: 0, step: 0, gateType: 'H' },
    { id: 'g-2', qubit: 1, step: 0, gateType: 'H' },
    { id: 'g-3', qubit: 2, step: 0, gateType: 'H' },
    { id: 'g-4', qubit: 3, step: 0, gateType: 'H' },
    { id: 'g-5', qubit: 0, step: 1, gateType: 'RZ', param: 'θ_0' },
    { id: 'g-6', qubit: 1, step: 1, gateType: 'RZ', param: 'θ_1' },
    { id: 'g-7', qubit: 2, step: 1, gateType: 'RZ', param: 'θ_2' },
    { id: 'g-8', qubit: 3, step: 1, gateType: 'RZ', param: 'θ_3' },
    { id: 'g-9', qubit: 0, step: 2, gateType: 'CNOT_CONTROL', targetQubit: 1 },
    { id: 'g-10', qubit: 1, step: 2, gateType: 'CNOT_TARGET' },
    { id: 'g-11', qubit: 0, step: 3, gateType: 'RY', param: 'φ_0' },
    { id: 'g-12', qubit: 1, step: 3, gateType: 'RY', param: 'φ_1' },
    { id: 'g-13', qubit: 0, step: 4, gateType: 'M' },
    { id: 'g-14', qubit: 1, step: 4, gateType: 'M' },
    { id: 'g-15', qubit: 2, step: 4, gateType: 'M' },
    { id: 'g-16', qubit: 3, step: 4, gateType: 'M' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<QuantumExecutionJob | null>({
    id: 'QJOB-INIT-01',
    circuitName: 'Cardio-Ansatz-Sim',
    backend: 'Statevector Simulator',
    qubits: 4,
    shots: 2048,
    depth: 18,
    gateCount: 16,
    executionTimeMs: 142,
    status: 'completed',
    timestamp: '2026-09-30 20:30',
    isSimulated: true,
    probabilities: [
      { state: '|0000⟩', probability: 0.421, count: 862 },
      { state: '|0001⟩', probability: 0.184, count: 377 },
      { state: '|0010⟩', probability: 0.268, count: 549 },
      { state: '|0011⟩', probability: 0.127, count: 260 }
    ]
  });

  const handleAddGate = (gate: Omit<QuantumCircuitGate, 'id'>) => {
    const newGate: QuantumCircuitGate = {
      ...gate,
      id: `g-${Date.now()}`
    };
    setGates((prev) => [...prev, newGate]);
  };

  const handleRemoveGate = (id: string) => {
    setGates((prev) => prev.filter((g) => g.id !== id));
  };

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setTimeout(async () => {
      const result = await mockQuantumService.executeCircuit({
        circuitQasm: 'OPENQASM 2.0; ...',
        backend,
        shots
      });
      setExecutionResult(result);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Quantum Circuit Studio & QML Lab</h2>
            <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md font-medium">
              Quantum Execution Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Construct parameterized variational circuits, inspect state vectors on the Bloch sphere, and execute simulated shots on Qiskit Aer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setGates([
                { id: 'g-1', qubit: 0, step: 0, gateType: 'H' },
                { id: 'g-2', qubit: 1, step: 0, gateType: 'H' },
                { id: 'g-3', qubit: 0, step: 1, gateType: 'CNOT_CONTROL', targetQubit: 1 },
                { id: 'g-4', qubit: 1, step: 1, gateType: 'CNOT_TARGET' },
                { id: 'g-5', qubit: 0, step: 2, gateType: 'M' },
                { id: 'g-6', qubit: 1, step: 2, gateType: 'M' },
              ]);
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium transition-colors"
          >
            Load Bell State
          </button>
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Simulating Circuit...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Circuit Canvas + Bloch Sphere */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Circuit Builder Canvas (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <CircuitCanvas
            qubitsCount={qubitsCount}
            gates={gates}
            onAddGate={handleAddGate}
            onRemoveGate={handleRemoveGate}
          />

          {/* Transpilation Visualizer */}
          <TranspilationPipeline
            originalDepth={18}
            optimizedDepth={14}
            cnotReduction={28.5}
            backendName={backend}
          />
        </div>

        {/* Right Sidebar: 3D Three.js Bloch Sphere & Execution Config (1 col) */}
        <div className="space-y-4">
          {/* Interactive 3D Three.js Bloch Sphere */}
          <ThreeBlochSphere qubitLabel="q0" initialTheta={45} initialPhi={60} />

          {/* Configuration Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Hardware & Ansatz</h4>

            <div>
              <label className="text-slate-500 block mb-1">Target Backend:</label>
              <select
                value={backend}
                onChange={(e) => setBackend(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
              >
                <option value="Aer Statevector Simulator">Qiskit Aer Statevector (Local Sim)</option>
                <option value="Aer QASM Simulator">Qiskit Aer QASM (Shot-based)</option>
                <option value="IBM Quantum (Eagle r3)">IBM Quantum Eagle r3 (Cloud Placeholder)</option>
                <option value="AWS Braket (Rigetti)">AWS Braket Rigetti (Cloud Placeholder)</option>
                <option value="Azure Quantum (IonQ)">Azure Quantum IonQ (Cloud Placeholder)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Ansatz Topology:</label>
              <select
                value={ansatzType}
                onChange={(e) => setAnsatzType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
              >
                <option value="RealAmplitudes">RealAmplitudes (Depth=3)</option>
                <option value="StronglyEntangling">StronglyEntanglingLayers</option>
                <option value="TwoLocal">TwoLocal (Ry-Rz Entangled)</option>
                <option value="EfficientSU2">EfficientSU2</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-500 mb-1">
                <span>Shots:</span>
                <span className="font-mono text-slate-800 font-semibold">{shots}</span>
              </div>
              <input
                type="range"
                min="512"
                max="8192"
                step="512"
                value={shots}
                onChange={(e) => setShots(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Results Section */}
      {executionResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulated Measurement Output</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Completed in {executionResult.executionTimeMs}ms · {executionResult.shots} shots
            </span>
          </div>

          <ProbabilityChart
            probabilities={executionResult.probabilities}
            shots={executionResult.shots}
            title="Computational Basis Measurement Probabilities"
          />
        </div>
      )}
    </div>
  );
};
