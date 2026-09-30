export type UserRole = 
  | 'Patient' 
  | 'Clinician' 
  | 'Researcher' 
  | 'ML Engineer' 
  | 'Quantum Researcher' 
  | 'Administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institution: string;
}

export interface Dataset {
  id: string;
  name: string;
  category: 'Cardiovascular' | 'Oncology' | 'Endocrinology' | 'General Clinical';
  records: number;
  features: number;
  version: string;
  status: 'Ready' | 'Processing' | 'Validated' | 'Draft';
  lastUpdated: string;
  qualityScore: number;
  description: string;
  targetVariable: string;
  dataDistribution: { label: string; count: number; percentage: number }[];
  missingValuesPct: number;
  duplicateRows: number;
  outliersPct: number;
  schema: { feature: string; type: string; mean: string; std: string; missing: number }[];
}

export type ModelFamily = 'CLASSICAL_ML' | 'QUANTUM_ML' | 'HYBRID';

export interface Model {
  id: string;
  name: string;
  version: string;
  family: ModelFamily;
  algorithm: string;
  datasetId: string;
  datasetName: string;
  status: 'Trained' | 'Training' | 'Draft' | 'Evaluated' | 'Registered';
  accuracy: number;
  auc: number;
  sensitivity: number;
  specificity: number;
  f1Score: number;
  updatedAt: string;
  quantumSpecs?: {
    qubits: number;
    ansatz: string;
    featureMap: string;
    shots: number;
    depth: number;
    backend: string;
  };
}

export interface QuantumCircuitGate {
  id: string;
  qubit: number;
  step: number;
  gateType: 'H' | 'X' | 'Y' | 'Z' | 'RX' | 'RY' | 'RZ' | 'CNOT_CONTROL' | 'CNOT_TARGET' | 'M';
  param?: string;
  targetQubit?: number;
}

export interface QuantumExecutionJob {
  id: string;
  circuitName: string;
  backend: 'Statevector Simulator' | 'Aer QASM Simulator' | 'IBM Quantum (Eagle r3)' | 'AWS Braket (Rigetti)' | 'Azure Quantum (IonQ)';
  qubits: number;
  shots: number;
  depth: number;
  gateCount: number;
  executionTimeMs: number;
  status: 'queued' | 'running' | 'completed' | 'failed';
  timestamp: string;
  isSimulated: true;
  probabilities: { state: string; probability: number; count: number }[];
}

export interface EvaluationRun {
  id: string;
  modelId: string;
  modelName: string;
  datasetName: string;
  strategy: '5-Fold Stratified CV' | '10-Fold Stratified CV' | 'Repeated 5x5 CV';
  calibrationMethod: 'Platt Scaling (Sigmoid)' | 'Isotonic Regression';
  optimalThreshold: number;
  testSetStatus: 'LOCKED & ISOLATED' | 'UNLOCKED';
  metrics: {
    accuracy: { value: number; ci: [number, number] };
    sensitivity: { value: number; ci: [number, number] };
    specificity: { value: number; ci: [number, number] };
    precision: { value: number; ci: [number, number] };
    f1Score: { value: number; ci: [number, number] };
    rocAuc: { value: number; ci: [number, number] };
    prAuc: { value: number; ci: [number, number] };
    brierScore: number;
  };
  reproducibility: {
    randomSeed: number;
    datasetVersion: string;
    modelVersion: string;
    codeGitSha: string;
    environmentHash: string;
    timestamp: string;
  };
}

export interface PatientCase {
  id: string;
  syntheticId: string;
  age: number;
  gender: 'M' | 'F';
  condition: string;
  systolicBp: number;
  cholesterol: number;
  fastingGlucose: number;
  bmi: number;
  smokingStatus: 'Never' | 'Former' | 'Active';
  vesselOcclusionPct: number;
  cardiacBiomarker: number;
  riskProbability: number;
  riskTier: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  confidence: number;
  decisionRule: string;
  recommendation: string;
  shapContributions: { feature: string; impact: number; value: string }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  ipAddress: string;
}

export interface InfrastructureNode {
  category: 'Compute' | 'Storage' | 'Containers' | 'Cloud' | 'Monitoring';
  name: string;
  type: string;
  status: 'HEALTHY' | 'DEGRADED' | 'STANDBY';
  utilization: number;
  specs: string;
}
