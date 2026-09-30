import { QuantumService } from '../backend-design/interfaces';
import { QuantumCircuitGate, QuantumExecutionJob } from '../types';
import { MOCK_QUANTUM_JOBS } from './mockData';

class MockQuantumServiceImpl implements QuantumService {
  async buildCircuit(qubits: number, gates: QuantumCircuitGate[]): Promise<{ circuitQasm: string; depth: number; gateCount: number }> {
    const qasmLines = [
      'OPENQASM 2.0;',
      'include "qelib1.inc";',
      `qreg q[${qubits}];`,
      `creg c[${qubits}];`
    ];

    gates.forEach(g => {
      if (g.gateType === 'H') qasmLines.push(`h q[${g.qubit}];`);
      else if (g.gateType === 'RZ') qasmLines.push(`rz(pi/4) q[${g.qubit}];`);
      else if (g.gateType === 'RY') qasmLines.push(`ry(0.785) q[${g.qubit}];`);
      else if (g.gateType === 'RX') qasmLines.push(`rx(0.523) q[${g.qubit}];`);
      else if (g.gateType === 'CNOT_CONTROL' && g.targetQubit !== undefined) {
        qasmLines.push(`cx q[${g.qubit}],q[${g.targetQubit}];`);
      } else if (g.gateType === 'M') {
        qasmLines.push(`measure q[${g.qubit}] -> c[${g.qubit}];`);
      }
    });

    return {
      circuitQasm: qasmLines.join('\n'),
      depth: Math.max(12, gates.length + 4),
      gateCount: gates.length
    };
  }

  async transpileCircuit(circuitQasm: string, targetBackend: string): Promise<{
    originalDepth: number;
    transpiledDepth: number;
    cnotReductionPct: number;
    optimizedQasm: string;
  }> {
    return {
      originalDepth: 22,
      transpiledDepth: 16,
      cnotReductionPct: 27.3,
      optimizedQasm: circuitQasm + '\n// Optimization Level: 3 applied for backend: ' + targetBackend
    };
  }

  async executeCircuit(params: {
    circuitQasm: string;
    backend: string;
    shots: number;
  }): Promise<QuantumExecutionJob> {
    // Generate realistic simulated probabilities
    const newJob: QuantumExecutionJob = {
      id: `QJOB-SIM-${Date.now().toString().slice(-4)}`,
      circuitName: 'Variational-Ansatz-Sim',
      backend: params.backend as QuantumExecutionJob['backend'],
      qubits: 4,
      shots: params.shots,
      depth: 18,
      gateCount: 36,
      executionTimeMs: Math.floor(120 + Math.random() * 80),
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      isSimulated: true,
      probabilities: [
        { state: '|0000⟩', probability: 0.418, count: Math.round(params.shots * 0.418) },
        { state: '|0001⟩', probability: 0.186, count: Math.round(params.shots * 0.186) },
        { state: '|0010⟩', probability: 0.271, count: Math.round(params.shots * 0.271) },
        { state: '|0011⟩', probability: 0.125, count: Math.round(params.shots * 0.125) }
      ]
    };
    return newJob;
  }

  async getMeasurements(jobId: string): Promise<QuantumExecutionJob> {
    const job = MOCK_QUANTUM_JOBS.find(j => j.id === jobId);
    return job || MOCK_QUANTUM_JOBS[0];
  }
}

export const mockQuantumService = new MockQuantumServiceImpl();
