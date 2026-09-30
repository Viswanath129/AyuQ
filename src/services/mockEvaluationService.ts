import { EvaluationService, PredictionService, ExplainabilityService } from '../backend-design/interfaces';
import { EvaluationRun, PatientCase } from '../types';
import { MOCK_EVALUATION_RUNS, MOCK_PATIENT_CASES } from './mockData';

class MockEvaluationServiceImpl implements EvaluationService {
  private currentRuns: EvaluationRun[] = [...MOCK_EVALUATION_RUNS];

  async createEvaluation(params: {
    modelId: string;
    datasetId: string;
    crossValidationFolds: number;
    calibrationMethod: string;
  }): Promise<EvaluationRun> {
    const run: EvaluationRun = {
      id: `EVAL-${Date.now().toString().slice(-4)}`,
      modelId: params.modelId,
      modelName: 'Cardio-Hybrid VQC (ResNet + Variational)',
      datasetName: 'Cardiovascular Risk — Synthetic Dataset',
      strategy: `${params.crossValidationFolds}-Fold Stratified CV` as EvaluationRun['strategy'],
      calibrationMethod: params.calibrationMethod as EvaluationRun['calibrationMethod'],
      optimalThreshold: 0.485,
      testSetStatus: 'LOCKED & ISOLATED',
      metrics: {
        accuracy: { value: 0.914, ci: [0.898, 0.930] },
        sensitivity: { value: 0.892, ci: [0.871, 0.913] },
        specificity: { value: 0.928, ci: [0.911, 0.945] },
        precision: { value: 0.901, ci: [0.882, 0.920] },
        f1Score: { value: 0.910, ci: [0.894, 0.926] },
        rocAuc: { value: 0.942, ci: [0.929, 0.955] },
        prAuc: { value: 0.931, ci: [0.916, 0.946] },
        brierScore: 0.078
      },
      reproducibility: {
        randomSeed: 42,
        datasetVersion: 'v2.1',
        modelVersion: 'v2.4.0',
        codeGitSha: 'b4a8e29f',
        environmentHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: new Date().toISOString()
      }
    };
    this.currentRuns.unshift(run);
    return run;
  }

  async runCrossValidation(evaluationId: string): Promise<{ foldAccuracies: number[]; meanAuc: number }> {
    return {
      foldAccuracies: [0.908, 0.921, 0.915, 0.899, 0.927],
      meanAuc: 0.942
    };
  }

  async calibrateModel(evaluationId: string): Promise<{ brierScore: number; expectedCalibrationError: number }> {
    return {
      brierScore: 0.078,
      expectedCalibrationError: 0.024
    };
  }

  async lockTestSet(evaluationId: string): Promise<{ testSetHash: string; lockedAt: string; samplesCount: number }> {
    return {
      testSetHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      lockedAt: new Date().toISOString(),
      samplesCount: 840
    };
  }

  async calculateFinalMetrics(evaluationId: string): Promise<EvaluationRun['metrics']> {
    return this.currentRuns[0].metrics;
  }
}

class MockPredictionServiceImpl implements PredictionService, ExplainabilityService {
  async predictRisk(patientCase: Partial<PatientCase>, modelId: string): Promise<{
    riskProbability: number;
    riskTier: 'Low Risk' | 'Moderate Risk' | 'High Risk';
    confidence: number;
    isSimulated: true;
  }> {
    // Determine risk based on systolic BP & biomarker
    const bp = patientCase.systolicBp || 130;
    const bio = patientCase.cardiacBiomarker || 0.04;
    
    let prob = 0.35;
    if (bp > 145 || bio > 0.06) {
      prob = 0.724;
      return { riskProbability: prob, riskTier: 'High Risk', confidence: 0.942, isSimulated: true };
    } else if (bp < 120 && bio < 0.02) {
      prob = 0.146;
      return { riskProbability: prob, riskTier: 'Low Risk', confidence: 0.978, isSimulated: true };
    }
    return { riskProbability: 0.442, riskTier: 'Moderate Risk', confidence: 0.885, isSimulated: true };
  }

  async computeShapContributions(patientCaseId: string, modelId: string): Promise<{
    baseValue: number;
    features: { feature: string; impact: number; value: string }[];
  }> {
    const pt = MOCK_PATIENT_CASES.find(p => p.id === patientCaseId) || MOCK_PATIENT_CASES[0];
    return {
      baseValue: 0.38,
      features: pt.shapContributions
    };
  }
}

export const mockEvaluationService = new MockEvaluationServiceImpl();
export const mockPredictionService = new MockPredictionServiceImpl();
