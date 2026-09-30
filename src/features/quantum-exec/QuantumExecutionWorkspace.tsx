import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Layers, 
  BarChart2, 
  ExternalLink,
  RotateCw
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ProbabilityChart } from '../../components/quantum/ProbabilityChart';
import { MOCK_QUANTUM_JOBS } from '../../services/mockData';
import { QuantumExecutionJob } from '../../types';

export const QuantumExecutionWorkspace: React.FC = () => {
  const [jobs, setJobs] = useState<QuantumExecutionJob[]>(MOCK_QUANTUM_JOBS);
  const [selectedJob, setSelectedJob] = useState<QuantumExecutionJob>(MOCK_QUANTUM_JOBS[0]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleTriggerSimulatedJob = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const newJob: QuantumExecutionJob = {
        id: `QJOB-2026-${Math.floor(100 + Math.random() * 900)}`,
        circuitName: 'VQC-Cardiac-AngleEncoded',
        backend: 'Statevector Simulator',
        qubits: 4,
        shots: 4096,
        depth: 20,
        gateCount: 38,
        executionTimeMs: 165,
        status: 'completed',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        isSimulated: true,
        probabilities: [
          { state: '|0000⟩', probability: 0.442, count: 1810 },
          { state: '|0001⟩', probability: 0.175, count: 717 },
          { state: '|0010⟩', probability: 0.255, count: 1045 },
          { state: '|0011⟩', probability: 0.128, count: 524 }
        ]
      };
      setJobs((prev) => [newJob, ...prev]);
      setSelectedJob(newJob);
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Quantum Hardware & Simulation Gateway</h2>
            <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-medium">
              Simulation Mode Only
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dispatch variational circuit jobs, review transpilation telemetry, and analyze shot-noise probability distributions.
          </p>
        </div>

        <button
          onClick={handleTriggerSimulatedJob}
          disabled={isExecuting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
          <span>{isExecuting ? 'Executing Simulation...' : 'Submit New Job (Simulated)'}</span>
        </button>
      </div>

      {/* Telemetry KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
          <span className="text-slate-400 text-[10px] block uppercase">Selected Circuit Depth</span>
          <span className="text-xl font-bold text-slate-900">{selectedJob.depth}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Basis gate operations</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
          <span className="text-slate-400 text-[10px] block uppercase">Gate Count</span>
          <span className="text-xl font-bold text-slate-900">{selectedJob.gateCount} gates</span>
          <span className="text-[10px] text-indigo-600 block mt-0.5">8 CNOTs entangling</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
          <span className="text-slate-400 text-[10px] block uppercase">Shots Executed</span>
          <span className="text-xl font-bold text-slate-900">{selectedJob.shots.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Statistical sampling</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
          <span className="text-slate-400 text-[10px] block uppercase">Execution Latency</span>
          <span className="text-xl font-bold text-emerald-600">{selectedJob.executionTimeMs} ms</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">Statevector simulator</span>
        </div>
      </div>

      {/* Main Split: Job Execution List & Live Probability Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job History List (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Job Execution History</h3>
          <div className="space-y-2">
            {jobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-3 rounded-md border text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-semibold text-slate-800">{job.id}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {job.qubits} Qubits
                    </span>
                  </div>
                  <div className="font-medium text-slate-700">{job.circuitName}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>{job.backend}</span>
                    <span>{job.shots} shots</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Probability Chart & Raw Output (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <ProbabilityChart
            probabilities={selectedJob.probabilities}
            shots={selectedJob.shots}
            title={`Simulated Measurement Distribution — ${selectedJob.circuitName}`}
          />

          {/* Raw QASM / Output Snippet */}
          <div className="bg-slate-900 text-slate-200 rounded-lg p-4 font-mono text-xs shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Raw Aer Simulator Output JSON (Simulated)
              </span>
              <span className="text-emerald-400">STATUS_COMPLETED</span>
            </div>
            <pre className="text-[11px] text-indigo-300 overflow-x-auto leading-relaxed pt-1">
{`{
  "job_id": "${selectedJob.id}",
  "backend_name": "${selectedJob.backend}",
  "circuit": "${selectedJob.circuitName}",
  "shots": ${selectedJob.shots},
  "qobj_id": "b18f4a-circ-vqc",
  "success": true,
  "simulation_mode": true,
  "execution_time_ms": ${selectedJob.executionTimeMs}
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
