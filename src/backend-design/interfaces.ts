/**
 * ARCHITECTURAL SPECIFICATION & BACKEND SERVICE CONTRACTS
 * 
 * Notice: This is a FRONTEND-FIRST PROTOTYPE.
 * The interfaces defined below represent the target microservice contracts 
 * for the future production backend. The current frontend connects to typed 
 * mock implementations honoring these exact abstractions.
 */

import { Dataset, Model, QuantumCircuitGate, QuantumExecutionJob, EvaluationRun, PatientCase, AuditLogEntry, User } from '../types';

export interface AuthService {
  authenticate(credentials: { email: string; token?: string; ssoProvider?: string }): Promise<User>;
  getCurrentUser(): Promise<User>;
  getPermissions(role: string): Promise<string[]>;
  logout(): Promise<void>;
  switchRole(role: string): Promise<User>;
}

export interface UserService {
  getUser(userId: string): Promise<User>;
  listUsers(): Promise<User[]>;
  updateRole(userId: string, newRole: string): Promise<void>;
}

export interface DatasetService {
  listDatasets(): Promise<Dataset[]>;
  getDataset(id: string): Promise<Dataset>;
  uploadDataset(file: File, metadata: Partial<Dataset>): Promise<Dataset>;
  validateDataset(id: string): Promise<{ valid: boolean; qualityScore: number; warnings: string[] }>;
  createVersion(id: string, description: string): Promise<Dataset>;
}

export interface PreprocessingService {
  runPipeline(datasetId: string, steps: string[]): Promise<{ status: string; appliedTransforms: string[]; durationMs: number }>;
  getFeatureStatistics(datasetId: string): Promise<Record<string, { mean: number; std: number; min: number; max: number }>>;
}

export interface FeatureStoreService {
  extractFeatures(datasetId: string, featureNames: string[]): Promise<number[][]>;
  encodeQuantumFeatures(features: number[][], method: 'AngleEncoding' | 'AmplitudeEncoding' | 'IQPEncoding'): Promise<number[][]>;
}

export interface ModelService {
  listModels(): Promise<Model[]>;
  getModel(id: string): Promise<Model>;
  registerModel(model: Partial<Model>): Promise<Model>;
}

export interface TrainingService {
  startTraining(params: {
    modelId: string;
    datasetId: string;
    hyperparameters: Record<string, unknown>;
    quantumConfig?: { qubits: number; ansatz: string; shots: number };
  }): Promise<{ jobId: string; status: 'queued' | 'running' }>;
  getTrainingStatus(jobId: string): Promise<{ progress: number; currentEpoch: number; metrics: Record<string, number> }>;
}

export interface QuantumService {
  buildCircuit(qubits: number, gates: QuantumCircuitGate[]): Promise<{ circuitQasm: string; depth: number; gateCount: number }>;
  transpileCircuit(circuitQasm: string, targetBackend: string): Promise<{
    originalDepth: number;
    transpiledDepth: number;
    cnotReductionPct: number;
    optimizedQasm: string;
  }>;
  executeCircuit(params: {
    circuitQasm: string;
    backend: string;
    shots: number;
  }): Promise<QuantumExecutionJob>;
  getMeasurements(jobId: string): Promise<QuantumExecutionJob>;
}

export interface EvaluationService {
  createEvaluation(params: {
    modelId: string;
    datasetId: string;
    crossValidationFolds: number;
    calibrationMethod: string;
  }): Promise<EvaluationRun>;
  runCrossValidation(evaluationId: string): Promise<{ foldAccuracies: number[]; meanAuc: number }>;
  calibrateModel(evaluationId: string): Promise<{ brierScore: number; expectedCalibrationError: number }>;
  lockTestSet(evaluationId: string): Promise<{ testSetHash: string; lockedAt: string; samplesCount: number }>;
  calculateFinalMetrics(evaluationId: string): Promise<EvaluationRun['metrics']>;
}

export interface PredictionService {
  predictRisk(patientCase: Partial<PatientCase>, modelId: string): Promise<{
    riskProbability: number;
    riskTier: 'Low Risk' | 'Moderate Risk' | 'High Risk';
    confidence: number;
    isSimulated: true;
  }>;
}

export interface ExplainabilityService {
  computeShapContributions(patientCaseId: string, modelId: string): Promise<{
    baseValue: number;
    features: { feature: string; impact: number; value: string }[];
  }>;
}

export interface ReportService {
  generateEvaluationReport(evaluationId: string, format: 'PDF' | 'JSON' | 'CSV'): Promise<{ downloadUrl: string; filename: string }>;
  generateClinicalSummary(patientCaseId: string): Promise<{ markdownSummary: string; disclaimer: string }>;
}

export interface AuditService {
  logAction(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void>;
  listAuditLogs(filters?: { role?: string; status?: string }): Promise<AuditLogEntry[]>;
}

export interface GovernanceService {
  checkEthicsCompliance(modelId: string): Promise<{
    biasDisparityRatio: number;
    fairnessScore: number;
    transparencyRating: 'PASS' | 'REVIEW' | 'FLAGGED';
    regulatoryAuditTrail: string;
  }>;
}
