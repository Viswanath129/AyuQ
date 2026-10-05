import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Layers, 
  BarChart2, 
  RotateCw,
  Server,
  Zap,
  Activity,
  Code2
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ProbabilityChart } from '../../components/quantum/ProbabilityChart';
import { MOCK_QUANTUM_JOBS } from '../../services/mockData';
import { QuantumExecutionJob } from '../../types';
import { QuantumSimulator, CircuitGate } from '../../services/quantum/QuantumSimulator';
import { AtomLoader } from '../../components/common/AtomLoader';
import { DatasetSourceBadge } from '../../components/common/DatasetSourceBadge';

export const QuantumExecutionWorkspace: React.FC = () => {
  const [jobs, setJobs] = useState<QuantumExecutionJob[]>(MOCK_QUANTUM_JOBS);
  const [selectedJob, setSelectedJob] = useState<QuantumExecutionJob>(MOCK_QUANTUM_JOBS[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState<QuantumExecutionJob['backend']>('Statevector Simulator');
  const [selectedShots, setSelectedShots] = useState(4096);
  const [activeTab, setActiveTab] = useState<'chart' | 'qasm' | 'json'>('chart');
  const [executionPhase, setExecutionPhase] = useState<string | null>(null);

  const backends: { name: QuantumExecutionJob['backend']; provider: string; qubits: number; noiseModel: string }[] = [
    { name: 'Statevector Simulator', provider: 'Qiskit Aer (Local CPU)', qubits: 32, noiseModel: 'Ideal (Zero Noise)' },
    { name: 'Aer QASM Simulator', provider: 'Qiskit Aer (Shot Noise)', qubits: 32, noiseModel: 'Statistical Poissonian' },
    { name: 'IBM Quantum (Eagle r3)', provider: 'IBM Quantum Platform (Simulated)', qubits: 127, noiseModel: 'Thermal T1/T2 Relaxation' },
    { name: 'AWS Braket (Rigetti)', provider: 'Amazon Braket (Simulated)', qubits: 80, noiseModel: 'Depolarizing & Crosstalk' },
    { name: 'Azure Quantum (IonQ)', provider: 'Azure Quantum (Simulated)', qubits: 25, noiseModel: 'All-to-All Trapped Ion' }
  ];

  const handleTriggerSimulatedJob = () => {
    setIsExecuting(true);
    setExecutionPhase('Phase 1/5: Transpiling OpenQASM circuit to target coupling graph...');

    setTimeout(() => {
      setExecutionPhase('Phase 2/5: Optimizing 2-qubit CNOT depth and virtual RZ gates...');
      setTimeout(() => {
        setExecutionPhase(`Phase 3/5: Submitting job to ${selectedBackend} queue...`);
        setTimeout(() => {
          setExecutionPhase(`Phase 4/5: Sampling ${selectedShots.toLocaleString()} measurement shots...`);
          setTimeout(() => {
            // Generate deterministic result using QuantumSimulator with 4 qubits
            const sampleGates: CircuitGate[] = [
              { id: 'g1', qubit: 0, step: 0, gateType: 'H' },
              { id: 'g2', qubit: 1, step: 0, gateType: 'H' },
              { id: 'g3', qubit: 0, step: 1, gateType: 'RY', angle: 0.85 },
              { id: 'g4', qubit: 1, step: 1, gateType: 'RY', angle: 1.25 },
              { id: 'g5', qubit: 0, step: 2, gateType: 'CNOT', targetQubit: 1 },
              { id: 'g6', qubit: 2, step: 2, gateType: 'H' },
              { id: 'g7', qubit: 1, step: 3, gateType: 'CNOT', targetQubit: 2 },
              { id: 'g8', qubit: 0, step: 4, gateType: 'RZ', angle: Math.PI / 3 }
            ];

            const sim = QuantumSimulator.simulate(4, sampleGates, selectedShots);

            const newJob: QuantumExecutionJob = {
              id: `QJOB-2026-${Math.floor(100 + Math.random() * 900)}`,
              circuitName: `VQC-Cardiac-${selectedBackend.split(' ')[0]}`,
              backend: selectedBackend,
              qubits: 4,
              shots: selectedShots,
              depth: sim.circuitDepth + 12,
              gateCount: sim.totalGates + 18,
              executionTimeMs: Math.floor(140 + Math.random() * 90),
              status: 'completed',
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
              isSimulated: true,
              probabilities: sim.probabilities
            };

            setJobs((prev) => [newJob, ...prev]);
            setSelectedJob(newJob);
            setIsExecuting(false);
            setExecutionPhase(null);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  const sampleQasm = `OPENQASM 2.0;
include "qelib1.inc";
qreg q[4];
creg c[4];

// Feature Encoding Layer (Cardiac Biomarkers)
h q[0];
h q[1];
h q[2];
h q[3];
ry(0.8500) q[0];
ry(1.2500) q[1];

// Entangling Layer
cx q[0], q[1];
cx q[1], q[2];
rz(1.0472) q[0];

// Measurement
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];`;

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-amber-200/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-stone-900">
              Quantum Hardware & Simulation Execution Gateway
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-amber-500/15 text-amber-950 border border-amber-400/40 rounded-full font-bold backdrop-blur-xs">
              Simulation Mode Only
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed max-w-2xl">
            Dispatch variational circuit jobs to simulated Qiskit Aer or cloud quantum backends, monitor execution pipelines, and review measurement telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Backend Selector */}
          <select
            value={selectedBackend}
            onChange={(e) => setSelectedBackend(e.target.value as QuantumExecutionJob['backend'])}
            className="bg-white/85 border border-amber-200/80 text-xs font-bold text-stone-900 rounded-xl px-3 py-2 focus:ring-1 focus:ring-amber-500 shadow-2xs"
          >
            {backends.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Shots Selector */}
          <select
            value={selectedShots}
            onChange={(e) => setSelectedShots(parseInt(e.target.value, 10))}
            className="bg-white/85 border border-amber-200/80 text-xs font-mono font-bold text-stone-900 rounded-xl px-2.5 py-2 focus:ring-1 focus:ring-amber-500 shadow-2xs"
          >
            <option value={1024}>1,024 Shots</option>
            <option value={2048}>2,048 Shots</option>
            <option value={4096}>4,096 Shots</option>
            <option value={8192}>8,192 Shots</option>
          </select>

          <button
            onClick={handleTriggerSimulatedJob}
            disabled={isExecuting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Simulating...' : 'Submit Job (Simulated)'}</span>
          </button>
        </div>
      </div>

      {/* Execution Stepper Notice with AtomLoader (when executing) */}
      {isExecuting && (
        <div className="p-5 glass-card rounded-2xl border border-amber-400/60 shadow-md flex flex-col sm:flex-row items-center gap-5">
          <AtomLoader size={90} speed={1.3} />
          <div className="flex-1 text-center sm:text-left space-y-1.5 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-extrabold text-stone-900 text-sm">
              <span>Executing Quantum Simulation Pipeline</span>
              <span className="font-mono text-xs text-amber-950 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40 w-fit mx-auto sm:mx-0">
                {selectedBackend}
              </span>
            </div>
            <p className="text-stone-700 font-mono text-xs font-semibold">{executionPhase}</p>
            <div className="w-full bg-amber-200/50 h-2 rounded-full overflow-hidden mt-2 border border-amber-300/40">
              <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 h-full rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}

      {/* Active Job & Verified Dataset Association Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 glass-card rounded-2xl border border-amber-200/50">
        <div className="flex items-center gap-3">
          <span className="font-mono font-extrabold text-stone-900 bg-amber-500/15 px-2.5 py-1 rounded-xl text-xs">
            Active Job: {selectedJob.id}
          </span>
          <span className="font-bold text-stone-900 text-sm">{selectedJob.circuitName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-bold">Associated Dataset:</span>
          <DatasetSourceBadge datasetId={selectedJob.datasetId} datasetName={selectedJob.datasetName} variant="badge" />
        </div>
      </div>

      {/* Telemetry KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 glass-card rounded-2xl shadow-xs font-mono border border-amber-200/50">
          <span className="text-stone-500 text-[10px] block uppercase font-bold">Circuit Depth</span>
          <span className="text-2xl font-extrabold text-stone-900">{selectedJob.depth}</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Basis gate operations</span>
        </div>
        <div className="p-4 glass-card rounded-2xl shadow-xs font-mono border border-amber-200/50">
          <span className="text-stone-500 text-[10px] block uppercase font-bold">Gate Count</span>
          <span className="text-2xl font-extrabold text-stone-900">{selectedJob.gateCount} gates</span>
          <span className="text-[10px] text-amber-800 block mt-0.5 font-bold">CNOT entanglers mapped</span>
        </div>
        <div className="p-4 glass-card rounded-2xl shadow-xs font-mono border border-amber-200/50">
          <span className="text-stone-500 text-[10px] block uppercase font-bold">Shots Sampled</span>
          <span className="text-2xl font-extrabold text-stone-900">{selectedJob.shots.toLocaleString()}</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Statistical sampling</span>
        </div>
        <div className="p-4 glass-card rounded-2xl shadow-xs font-mono border border-amber-200/50">
          <span className="text-stone-500 text-[10px] block uppercase font-bold">Execution Latency</span>
          <span className="text-2xl font-extrabold text-emerald-800">{selectedJob.executionTimeMs} ms</span>
          <span className="text-[10px] text-emerald-900 block mt-0.5 font-bold">{selectedJob.backend}</span>
        </div>
      </div>

      {/* Main Split: Job Execution List & Live Probability Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Job History List (4 cols on desktop) */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-5 shadow-xs space-y-3 border border-amber-200/50">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/30">
            <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
              Job Execution History
            </h3>
            <span className="text-[10px] font-mono text-amber-900 font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">
              {jobs.length} Jobs
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {jobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-400/60 shadow-xs'
                      : 'border-amber-200/60 bg-white/70 hover:bg-amber-50/70 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-extrabold text-stone-900">{job.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/15 text-amber-950 font-bold rounded-md border border-amber-400/40">
                      {job.qubits} Qubits
                    </span>
                  </div>
                  <div className="font-bold text-stone-800 truncate">{job.circuitName}</div>

                  {/* Explicit Clickable Dataset Link */}
                  <div className="flex items-center gap-1 text-[11px] text-stone-600 mt-1">
                    <span className="text-stone-400 font-mono text-[10px]">Dataset:</span>
                    <DatasetSourceBadge datasetId={job.datasetId} datasetName={job.datasetName} variant="link" />
                  </div>

                  <div className="flex justify-between text-[11px] text-stone-500 mt-1.5 font-mono pt-1 border-t border-amber-100">
                    <span className="truncate max-w-[130px]">{job.backend}</span>
                    <span className="font-semibold text-stone-700">{job.shots} shots</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Probability Chart & Raw Output (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Subtabs: Distribution Chart vs OpenQASM vs Raw JSON */}
          <div className="flex items-center justify-between glass-card rounded-2xl p-2.5 px-4 shadow-xs border border-amber-200/50">
            <span className="text-xs font-extrabold text-stone-900">Telemetry & Inspection View:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'chart'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-amber-50 text-stone-700 border border-amber-200/60'
                }`}
              >
                Distribution Chart
              </button>
              <button
                onClick={() => setActiveTab('qasm')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'qasm'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-amber-50 text-stone-700 border border-amber-200/60'
                }`}
              >
                OpenQASM 2.0
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'json'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-amber-50 text-stone-700 border border-amber-200/60'
                }`}
              >
                Result JSON
              </button>
            </div>
          </div>

          {activeTab === 'chart' && (
            <ProbabilityChart
              probabilities={selectedJob.probabilities}
              shots={selectedJob.shots}
              title={`Simulated Measurement Distribution — ${selectedJob.circuitName}`}
            />
          )}

          {activeTab === 'qasm' && (
            <div className="scientific-card rounded-2xl p-5 space-y-3 border border-amber-200/50">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/30">
                <span className="font-extrabold text-stone-900 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-amber-700" />
                  Transpiled Circuit Specification
                </span>
                <span className="text-[10px] font-mono bg-amber-500/15 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-amber-950 font-bold">
                  Target: {selectedJob.backend}
                </span>
              </div>
              <pre className="bg-stone-900 text-amber-200 font-mono text-[11px] p-4 rounded-xl overflow-x-auto leading-relaxed border border-amber-900/40 shadow-xs">
                {sampleQasm}
              </pre>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="bg-stone-900 text-stone-200 rounded-2xl p-5 font-mono text-xs shadow-xs space-y-2.5 border border-amber-900/40">
              <div className="flex items-center justify-between text-stone-400 text-[11px] border-b border-stone-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Quantum Gateway Result Payload (Aer Statevector JSON)
                </span>
                <span className="text-emerald-400 font-bold">STATUS_COMPLETED</span>
              </div>
              <pre className="text-[11px] text-amber-200 overflow-x-auto leading-relaxed pt-1">
{`{
  "job_id": "${selectedJob.id}",
  "backend": "${selectedJob.backend}",
  "circuit_name": "${selectedJob.circuitName}",
  "shots": ${selectedJob.shots},
  "qubits": ${selectedJob.qubits},
  "circuit_depth": ${selectedJob.depth},
  "gate_count": ${selectedJob.gateCount},
  "execution_time_ms": ${selectedJob.executionTimeMs},
  "timestamp": "${selectedJob.timestamp}",
  "is_simulated": true,
  "top_measurement_states": ${JSON.stringify(selectedJob.probabilities.slice(0, 4), null, 2)}
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
