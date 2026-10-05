import { Dataset, Model, QuantumExecutionJob, EvaluationRun, PatientCase, AuditLogEntry, InfrastructureNode, User } from '../types';
import { DATASET_REGISTRY } from './datasetRegistry';

export const MOCK_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Kasi Viswanath Vegisetti',
    email: 'kasiviswanathvegisetti43@gmail.com',
    role: 'Quantum Researcher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    institution: 'Avanthi Institute of Engineering and Technology'
  },
  {
    id: 'USR-002',
    name: 'Dr. Evelyn Vasquez',
    email: 'e.vasquez@cardio-research.edu',
    role: 'Clinician',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80',
    institution: 'Department of Cardiology & AI Clinical Care'
  },
  {
    id: 'USR-003',
    name: 'Liam Chen, MSc',
    email: 'lchen@quantumlab.io',
    role: 'ML Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    institution: 'Translational Bioinformatics Core'
  },
  {
    id: 'USR-004',
    name: 'Prof. Sarah Jenkins',
    email: 'sjenkins@medschool.edu',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&q=80',
    institution: 'Health Research Governance Board'
  }
];

export const MOCK_DATASETS: Dataset[] = [
  {
    id: 'DS-CARDIO-01',
    name: 'Cardiovascular Risk — Synthetic Dataset',
    category: 'Cardiovascular',
    records: 4200,
    features: 14,
    version: 'v2.1',
    status: 'Ready',
    lastUpdated: '2026-09-28',
    qualityScore: 98.4,
    description: 'De-identified synthetic cardiovascular biomarker cohort generated with differential privacy (epsilon=0.5). Designed for variational quantum classifier testing.',
    targetVariable: 'Major Adverse Cardiac Event (MACE 1-yr)',
    dataDistribution: [
      { label: 'Low Risk', count: 2604, percentage: 62.0 },
      { label: 'High Risk', count: 1596, percentage: 38.0 }
    ],
    missingValuesPct: 0.12,
    duplicateRows: 0,
    outliersPct: 0.85,
    schema: [
      { feature: 'age_norm', type: 'float64', mean: '54.2 yr', std: '9.8', missing: 0 },
      { feature: 'systolic_bp', type: 'float64', mean: '132.4 mmHg', std: '16.5', missing: 0 },
      { feature: 'total_cholesterol', type: 'float64', mean: '215.1 mg/dL', std: '38.2', missing: 2 },
      { feature: 'fasting_glucose', type: 'float64', mean: '108.6 mg/dL', std: '24.1', missing: 0 },
      { feature: 'bmi_index', type: 'float64', mean: '28.4 kg/m²', std: '4.6', missing: 0 },
      { feature: 'troponin_biomarker', type: 'float64', mean: '0.042 ng/mL', std: '0.015', missing: 3 },
      { feature: 'ejection_fraction', type: 'float64', mean: '58.2 %', std: '7.4', missing: 0 },
      { feature: 'vessel_score', type: 'int64', mean: '1.2 vessels', std: '0.9', missing: 0 }
    ],
    metadata: DATASET_REGISTRY['DS-CARDIO-01']
  },
  {
    id: 'DS-DIABETES-02',
    name: 'Diabetes Prediction — Synthetic Cohort',
    category: 'Endocrinology',
    records: 2850,
    features: 10,
    version: 'v1.4',
    status: 'Ready',
    lastUpdated: '2026-09-21',
    qualityScore: 96.8,
    description: 'Benchmarked metabolic panel dataset for quantum kernel estimation and support vector classification.',
    targetVariable: 'Type 2 Diabetes Onset (5-yr)',
    dataDistribution: [
      { label: 'Non-Diabetic', count: 1852, percentage: 65.0 },
      { label: 'Diabetic', count: 998, percentage: 35.0 }
    ],
    missingValuesPct: 0.40,
    duplicateRows: 0,
    outliersPct: 1.10,
    schema: [
      { feature: 'glucose_tolerance', type: 'float64', mean: '124.8 mg/dL', std: '31.2', missing: 4 },
      { feature: 'insulin_serum', type: 'float64', mean: '88.3 µU/mL', std: '45.1', missing: 8 },
      { feature: 'bmi', type: 'float64', mean: '31.5 kg/m²', std: '6.2', missing: 0 }
    ],
    metadata: DATASET_REGISTRY['DS-DIABETES-02']
  },
  {
    id: 'DS-ONCO-03',
    name: 'Wisconsin Breast Cancer Dataset (WBCD)',
    category: 'Oncology',
    records: 569,
    features: 30,
    version: 'v1.0 (UCI Benchmark)',
    status: 'Ready',
    lastUpdated: '2026-10-01',
    qualityScore: 99.8,
    description: 'Wisconsin Breast Cancer Dataset containing numerical features computed from digitized images of fine needle aspirate (FNA) of breast mass biopsies. Benchmark cohort evaluated for Hybrid Quantum Variational Classifier (VQC) and classical baselines.',
    targetVariable: 'Diagnosis (Malignant vs Benign)',
    dataDistribution: [
      { label: 'Benign', count: 357, percentage: 62.7 },
      { label: 'Malignant', count: 212, percentage: 37.3 }
    ],
    missingValuesPct: 0.00,
    duplicateRows: 0,
    outliersPct: 0.28,
    schema: [
      { feature: 'radius_mean', type: 'float64', mean: '14.13 mm', std: '3.52', missing: 0 },
      { feature: 'texture_mean', type: 'float64', mean: '19.29', std: '4.30', missing: 0 },
      { feature: 'perimeter_mean', type: 'float64', mean: '91.97 mm', std: '24.30', missing: 0 },
      { feature: 'area_mean', type: 'float64', mean: '654.88 mm²', std: '351.91', missing: 0 },
      { feature: 'smoothness_mean', type: 'float64', mean: '0.096', std: '0.014', missing: 0 },
      { feature: 'compactness_mean', type: 'float64', mean: '0.104', std: '0.053', missing: 0 },
      { feature: 'concavity_mean', type: 'float64', mean: '0.089', std: '0.080', missing: 0 },
      { feature: 'concave_points_mean', type: 'float64', mean: '0.049', std: '0.039', missing: 0 },
      { feature: 'symmetry_mean', type: 'float64', mean: '0.181', std: '0.027', missing: 0 },
      { feature: 'fractal_dimension_mean', type: 'float64', mean: '0.063', std: '0.007', missing: 0 }
    ],
    metadata: DATASET_REGISTRY['DS-ONCO-03']
  },
  {
    id: 'DS-MULTI-04',
    name: 'Patient Risk Multi-Modal — Synthetic Cohort',
    category: 'General Clinical',
    records: 5400,
    features: 24,
    version: 'v1.1',
    status: 'Validated',
    lastUpdated: '2026-09-15',
    qualityScore: 97.2,
    description: 'Comprehensive synthetic patient cohort integrating demographic, laboratory, and vitals telemetry.',
    targetVariable: '30-Day ICU Readmission Risk',
    dataDistribution: [
      { label: 'Routine Discharge', count: 4158, percentage: 77.0 },
      { label: 'High Readmission Risk', count: 1242, percentage: 23.0 }
    ],
    missingValuesPct: 0.80,
    duplicateRows: 0,
    outliersPct: 1.40,
    schema: [
      { feature: 'charlson_comorbidity', type: 'int64', mean: '2.4', std: '1.8', missing: 0 },
      { feature: 'creatinine_level', type: 'float64', mean: '1.1 mg/dL', std: '0.4', missing: 5 }
    ],
    metadata: DATASET_REGISTRY['DS-MULTI-04']
  }
];

export const MOCK_MODELS: Model[] = [
  {
    id: 'MDL-HYBRID-VQC-01',
    name: 'Cardio-Hybrid VQC (ResNet + Variational)',
    version: 'v2.4.0',
    family: 'HYBRID',
    algorithm: 'Variational Quantum Classifier (Classical Pre-net + 4-Qubit Ansatz)',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk — Synthetic Dataset',
    status: 'Evaluated',
    accuracy: 0.914,
    auc: 0.942,
    sensitivity: 0.892,
    specificity: 0.928,
    f1Score: 0.910,
    updatedAt: '2026-09-29',
    quantumSpecs: {
      qubits: 4,
      ansatz: 'RealAmplitudes (Depth=3)',
      featureMap: 'ZZFeatureMap (Order 2)',
      shots: 2048,
      depth: 18,
      backend: 'Aer Statevector Simulator'
    }
  },
  {
    id: 'MDL-QML-KERNEL-02',
    name: 'Quantum Kernel SVM Classifier',
    version: 'v1.2.1',
    family: 'QUANTUM_ML',
    algorithm: 'Quantum Support Vector Machine (Fidelity Kernel)',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk — Synthetic Dataset',
    status: 'Trained',
    accuracy: 0.902,
    auc: 0.931,
    sensitivity: 0.875,
    specificity: 0.919,
    f1Score: 0.897,
    updatedAt: '2026-09-27',
    quantumSpecs: {
      qubits: 4,
      ansatz: 'IQP-Encoding Kernel',
      featureMap: 'PauliFeatureMap',
      shots: 4096,
      depth: 14,
      backend: 'Qiskit Aer QASM'
    }
  },
  {
    id: 'MDL-CLASSIC-XGB-03',
    name: 'Gradient Boosted Tree (XGBoost Baseline)',
    version: 'v3.0.0',
    family: 'CLASSICAL_ML',
    algorithm: 'XGBoost with Bayesian Hyperparameter Tuning',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk — Synthetic Dataset',
    status: 'Evaluated',
    accuracy: 0.891,
    auc: 0.925,
    sensitivity: 0.862,
    specificity: 0.908,
    f1Score: 0.884,
    updatedAt: '2026-09-25'
  },
  {
    id: 'MDL-CLASSIC-SVM-04',
    name: 'Support Vector Machine (Radial Basis Function)',
    version: 'v2.1.0',
    family: 'CLASSICAL_ML',
    algorithm: 'RBF-Kernel Classical SVM',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk — Synthetic Dataset',
    status: 'Trained',
    accuracy: 0.864,
    auc: 0.892,
    sensitivity: 0.835,
    specificity: 0.881,
    f1Score: 0.857,
    updatedAt: '2026-09-22'
  },
  {
    id: 'MDL-QML-VQC-WBCD',
    name: 'Breast Cancer Quantum Variational Classifier (VQC)',
    version: 'v1.0.0',
    family: 'HYBRID',
    algorithm: 'Variational Quantum Classifier (Angle Encoding + Parameterized Circuit)',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Wisconsin Breast Cancer Dataset (WBCD)',
    status: 'Evaluated',
    accuracy: 0.973684211,
    auc: 0.982,
    sensitivity: 0.985915493,
    specificity: 0.952,
    f1Score: 0.979020979,
    updatedAt: '2026-10-01',
    quantumSpecs: {
      qubits: 4,
      ansatz: 'Parameterized Variational Circuit (RY + CNOT Entanglement)',
      featureMap: 'Angle Encoding (Normalized Biopsy Features)',
      shots: 2048,
      depth: 16,
      backend: 'Aer Quantum Simulator'
    }
  },
  {
    id: 'MDL-CLASSIC-SVM-WBCD',
    name: 'Wisconsin Breast Cancer Support Vector Machine (SVM)',
    version: 'v1.0.0',
    family: 'CLASSICAL_ML',
    algorithm: 'Support Vector Machine (Radial Basis Function / Linear)',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Wisconsin Breast Cancer Dataset (WBCD)',
    status: 'Evaluated',
    accuracy: 0.98245614,
    auc: 0.988,
    sensitivity: 1.00000000,
    specificity: 0.965,
    f1Score: 0.986111111,
    updatedAt: '2026-10-01'
  },
  {
    id: 'MDL-CLASSIC-RF-WBCD',
    name: 'Wisconsin Breast Cancer Random Forest Classifier',
    version: 'v1.0.0',
    family: 'CLASSICAL_ML',
    algorithm: 'Random Forest Ensemble (Standard Hyperparameters)',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Wisconsin Breast Cancer Dataset (WBCD)',
    status: 'Evaluated',
    accuracy: 0.964912281,
    auc: 0.972,
    sensitivity: 0.985915493,
    specificity: 0.932,
    f1Score: 0.972222222,
    updatedAt: '2026-10-01'
  },
  {
    id: 'MDL-CLASSIC-LR-WBCD',
    name: 'Wisconsin Breast Cancer Logistic Regression Baseline',
    version: 'v1.0.0',
    family: 'CLASSICAL_ML',
    algorithm: 'Logistic Regression with L2 Regularization',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Wisconsin Breast Cancer Dataset (WBCD)',
    status: 'Evaluated',
    accuracy: 0.97400000,
    auc: 0.979,
    sensitivity: 0.98600000,
    specificity: 0.952,
    f1Score: 0.97900000,
    updatedAt: '2026-10-01'
  }
];

export const MOCK_EVALUATION_RUNS: EvaluationRun[] = [
  {
    id: 'EVAL-WBCD-2026-001',
    modelId: 'MDL-QML-VQC-WBCD',
    modelName: 'Quantum Variation Classifier (VQC)',
    datasetName: 'Wisconsin Breast Cancer Dataset (WBCD)',
    strategy: '5-Fold Stratified CV',
    calibrationMethod: 'Platt Scaling (Sigmoid)',
    optimalThreshold: 0.500,
    testSetStatus: 'LOCKED & ISOLATED',
    paperCitation: {
      title: 'Quantum-Enhanced Breast Cancer Detection Using Hybrid Quantum Machine Learning',
      author: 'Kasi Viswanath Vegisetti',
      institution: 'Department of Electronics and Communication Engineering, Avanthi Institute of Engineering and Technology, Makavarapalem, India',
      email: 'kasiviswanathvegisetti43@gmail.com'
    },
    metrics: {
      accuracy: { value: 0.973684211, ci: [0.956, 0.988] },
      sensitivity: { value: 0.985915493, ci: [0.968, 1.000] },
      specificity: { value: 0.952, ci: [0.930, 0.971] },
      precision: { value: 0.972222222, ci: [0.954, 0.987] },
      f1Score: { value: 0.979020979, ci: [0.965, 0.991] },
      rocAuc: { value: 0.982, ci: [0.970, 0.994] },
      prAuc: { value: 0.980, ci: [0.968, 0.992] },
      brierScore: 0.045
    },
    comparisonBenchmarks: [
      {
        modelName: 'SVM',
        modelType: 'Classical',
        accuracy: 0.98245614,
        precision: 0.97260274,
        recall: 1.00000000,
        f1Score: 0.986111111
      },
      {
        modelName: 'Random Forest',
        modelType: 'Classical',
        accuracy: 0.964912281,
        precision: 0.95890411,
        recall: 0.985915493,
        f1Score: 0.972222222
      },
      {
        modelName: 'Logistic Regression',
        modelType: 'Classical',
        accuracy: 0.97400000,
        precision: 0.97200000,
        recall: 0.98600000,
        f1Score: 0.97900000
      },
      {
        modelName: 'Quantum Variation Classifier',
        modelType: 'Quantum',
        accuracy: 0.973684211,
        precision: 0.972222222,
        recall: 0.985915493,
        f1Score: 0.979020979
      }
    ],
    reproducibility: {
      randomSeed: 42,
      datasetVersion: 'v1.0 (UCI Benchmark)',
      modelVersion: 'v1.0.0',
      codeGitSha: '7f91c3da',
      environmentHash: 'sha256:d8b2e1a4c9f0882e3f5b72189a6c7e3f89a4d1b8c2e5a7f9b0c2e4a6d8f1e3b5',
      timestamp: '2026-10-01T09:15:00Z'
    }
  },
  {
    id: 'EVAL-2026-089',
    modelId: 'MDL-HYBRID-VQC-01',
    modelName: 'Cardio-Hybrid VQC (ResNet + Variational)',
    datasetName: 'Cardiovascular Risk — Synthetic Dataset',
    strategy: '5-Fold Stratified CV',
    calibrationMethod: 'Platt Scaling (Sigmoid)',
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
      timestamp: '2026-09-29T14:22:10Z'
    }
  }
];

export const MOCK_PATIENT_CASES: PatientCase[] = [
  {
    id: 'CASE-SYNTH-8491',
    syntheticId: 'SYN-PT-8491',
    age: 62,
    gender: 'M',
    condition: 'Suspected Angina / Elevated Troponin',
    systolicBp: 154,
    cholesterol: 248,
    fastingGlucose: 138,
    bmi: 31.2,
    smokingStatus: 'Former',
    vesselOcclusionPct: 68,
    cardiacBiomarker: 0.086,
    riskProbability: 0.724,
    riskTier: 'High Risk',
    confidence: 0.942,
    decisionRule: 'Probability > 0.485 (Calibrated Threshold Rule #C-4)',
    recommendation: 'Recommend priority clinical review, confirmatory angiography, and structured cardiology consultation within 24h.',
    shapContributions: [
      { feature: 'Troponin Biomarker (0.086 ng/mL)', impact: 0.28, value: '+0.28' },
      { feature: 'Systolic Blood Pressure (154 mmHg)', impact: 0.21, value: '+0.21' },
      { feature: 'Vessel Occlusion (68%)', impact: 0.17, value: '+0.17' },
      { feature: 'Fasting Glucose (138 mg/dL)', impact: 0.09, value: '+0.09' },
      { feature: 'Age (62 yr)', impact: 0.06, value: '+0.06' },
      { feature: 'Total Cholesterol (248 mg/dL)', impact: 0.04, value: '+0.04' }
    ]
  },
  {
    id: 'CASE-SYNTH-5102',
    syntheticId: 'SYN-PT-5102',
    age: 48,
    gender: 'F',
    condition: 'Routine Annual Preventive Screening',
    systolicBp: 118,
    cholesterol: 182,
    fastingGlucose: 92,
    bmi: 23.4,
    smokingStatus: 'Never',
    vesselOcclusionPct: 12,
    cardiacBiomarker: 0.012,
    riskProbability: 0.146,
    riskTier: 'Low Risk',
    confidence: 0.978,
    decisionRule: 'Probability < 0.250 (Low Risk Standard Stratification)',
    recommendation: 'Standard lifestyle maintenance, re-evaluation at standard 24-month clinical interval.',
    shapContributions: [
      { feature: 'Troponin Biomarker (0.012 ng/mL)', impact: -0.24, value: '-0.24' },
      { feature: 'Systolic Blood Pressure (118 mmHg)', impact: -0.19, value: '-0.19' },
      { feature: 'BMI (23.4 kg/m²)', impact: -0.12, value: '-0.12' },
      { feature: 'Fasting Glucose (92 mg/dL)', impact: -0.08, value: '-0.08' }
    ]
  },
  {
    id: 'CASE-SYNTH-9311',
    syntheticId: 'SYN-PT-9311',
    age: 57,
    gender: 'F',
    condition: 'Borderline Hypertension & Dyslipidemia',
    systolicBp: 138,
    cholesterol: 226,
    fastingGlucose: 112,
    bmi: 27.8,
    smokingStatus: 'Active',
    vesselOcclusionPct: 35,
    cardiacBiomarker: 0.038,
    riskProbability: 0.442,
    riskTier: 'Moderate Risk',
    confidence: 0.885,
    decisionRule: 'Probability between 0.250 - 0.485 (Borderline Stratification)',
    recommendation: 'Lifestyle intervention protocol, statin therapy consideration, follow-up ambulatory BP monitoring in 90 days.',
    shapContributions: [
      { feature: 'Active Smoking Status', impact: 0.18, value: '+0.18' },
      { feature: 'Systolic Blood Pressure (138 mmHg)', impact: 0.14, value: '+0.14' },
      { feature: 'Total Cholesterol (226 mg/dL)', impact: 0.11, value: '+0.11' },
      { feature: 'Normal Troponin (0.038 ng/mL)', impact: -0.06, value: '-0.06' }
    ]
  },
  {
    id: 'CASE-WBCD-8423',
    syntheticId: 'WBCD-FNA-8423',
    age: 52,
    gender: 'F',
    condition: 'Wisconsin FNA Biopsy — Breast Mass Classification',
    systolicBp: 124,
    cholesterol: 198,
    fastingGlucose: 104,
    bmi: 26.4,
    smokingStatus: 'Never',
    vesselOcclusionPct: 0,
    cardiacBiomarker: 0.015,
    riskProbability: 0.974,
    riskTier: 'High Risk',
    confidence: 0.986,
    decisionRule: 'VQC Decision Margin > 0.500 (Malignancy Confirmed by Hybrid QML)',
    recommendation: 'Urgent histopathology review, core biopsy correlation, and oncological diagnostic review.',
    shapContributions: [
      { feature: 'Mean Concave Points (0.147)', impact: 0.34, value: '+0.34' },
      { feature: 'Worst Perimeter (158.8 mm)', impact: 0.29, value: '+0.29' },
      { feature: 'Mean Radius (17.99 mm)', impact: 0.22, value: '+0.22' },
      { feature: 'Mean Texture (24.54)', impact: 0.12, value: '+0.12' }
    ]
  }
];

export const MOCK_QUANTUM_JOBS: QuantumExecutionJob[] = [
  {
    id: 'QJOB-WBCD-2026-001',
    circuitName: 'Wisconsin-BreastCancer-VQC-Ansatz',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Wisconsin Breast Cancer (WDBC)',
    modelName: 'Breast Cancer VQC',
    backend: 'Statevector Simulator',
    qubits: 4,
    shots: 2048,
    depth: 16,
    gateCount: 36,
    executionTimeMs: 132,
    status: 'completed',
    timestamp: '2026-10-01 10:14:22',
    isSimulated: true,
    probabilities: [
      { state: '|0000⟩ (Benign)', probability: 0.627, count: 1284 },
      { state: '|0001⟩', probability: 0.082, count: 168 },
      { state: '|0010⟩', probability: 0.045, count: 92 },
      { state: '|1111⟩ (Malignant)', probability: 0.246, count: 504 }
    ]
  },
  {
    id: 'QJOB-2026-042',
    circuitName: 'Cardio-VQC-Ansatz-L3',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk (Heart Disease)',
    modelName: 'Cardio-Hybrid VQC',
    backend: 'Statevector Simulator',
    qubits: 4,
    shots: 2048,
    depth: 18,
    gateCount: 42,
    executionTimeMs: 148,
    status: 'completed',
    timestamp: '2026-09-30 20:30:14',
    isSimulated: true,
    probabilities: [
      { state: '|0000⟩', probability: 0.421, count: 862 },
      { state: '|0001⟩', probability: 0.184, count: 377 },
      { state: '|0010⟩', probability: 0.268, count: 549 },
      { state: '|0011⟩', probability: 0.127, count: 260 }
    ]
  },
  {
    id: 'QJOB-2026-041',
    circuitName: 'ZZ-FeatureMap-Encoding',
    datasetId: 'DS-CARDIO-01',
    datasetName: 'Cardiovascular Risk (Heart Disease)',
    modelName: 'Pauli ZZ-FeatureMap',
    backend: 'Aer QASM Simulator',
    qubits: 4,
    shots: 4096,
    depth: 14,
    gateCount: 32,
    executionTimeMs: 312,
    status: 'completed',
    timestamp: '2026-09-30 19:12:05',
    isSimulated: true,
    probabilities: [
      { state: '|00⟩', probability: 0.380, count: 1556 },
      { state: '|01⟩', probability: 0.220, count: 901 },
      { state: '|10⟩', probability: 0.250, count: 1024 },
      { state: '|11⟩', probability: 0.150, count: 615 }
    ]
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-8812',
    timestamp: '2026-09-30 20:45:12',
    user: 'Dr. Aris Thorne',
    role: 'Quantum Researcher',
    action: 'TRANSLATE_CIRCUIT_OPTIMIZATION',
    resource: 'Circuit: Cardio-VQC-Ansatz-L3',
    status: 'SUCCESS',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'LOG-8811',
    timestamp: '2026-09-30 20:41:08',
    user: 'Dr. Evelyn Vasquez',
    role: 'Clinician',
    action: 'INFER_PATIENT_RISK_PREDICTION',
    resource: 'Case: SYN-PT-8491',
    status: 'SUCCESS',
    ipAddress: '192.168.1.112'
  },
  {
    id: 'LOG-8810',
    timestamp: '2026-09-30 19:30:45',
    user: 'Liam Chen, MSc',
    role: 'ML Engineer',
    action: 'LOCK_EVALUATION_TEST_SET',
    resource: 'EvaluationRun: EVAL-2026-089',
    status: 'SUCCESS',
    ipAddress: '192.168.1.118'
  },
  {
    id: 'LOG-8809',
    timestamp: '2026-09-30 18:14:22',
    user: 'External System (API)',
    role: 'Administrator',
    action: 'DIRECT_HARDWARE_OVERRIDE_ATTEMPT',
    resource: 'Backend: IBM Quantum Eagle',
    status: 'DENIED',
    ipAddress: '10.0.4.88'
  }
];

export const MOCK_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
  { category: 'Compute', name: 'Intel Xeon Platinum 8480+ (Host Core)', type: 'CPU Cluster (64 Cores)', status: 'HEALTHY', utilization: 34, specs: '2.0 GHz Base / 512GB ECC DDR5' },
  { category: 'Compute', name: 'NVIDIA A100 Tensor Core 80GB (QML Accel)', type: 'GPU Acceleration Unit', status: 'HEALTHY', utilization: 68, specs: '19.5 TFLOPS FP64 / 80GB HBM2e' },
  { category: 'Compute', name: 'Qiskit Aer GPU Statevector Simulator', type: 'Simulated QPU Runtime', status: 'HEALTHY', utilization: 42, specs: 'Max 32 Qubits Statevector / 0.1ms fidelity' },
  { category: 'Compute', name: 'IBM Quantum Eagle r3 (Cloud Queue)', type: 'Remote QPU Placeholder', status: 'STANDBY', utilization: 12, specs: '127 Qubit Transmon / Cloud Gateway' },
  { category: 'Storage', name: 'HIPAA Enclave Encrypted Object Store', type: 'Encrypted S3 / MinIO Store', status: 'HEALTHY', utilization: 29, specs: 'AES-GCM-256 / SHA-256 Checksummed' },
  { category: 'Containers', name: 'Kubernetes Microservice Mesh', type: 'Orchestrator Cluster', status: 'HEALTHY', utilization: 51, specs: '8 Worker Nodes / Auto-scaling' },
  { category: 'Monitoring', name: 'Prometheus & Grafana Telemetry Gateway', type: 'Observability Daemon', status: 'HEALTHY', utilization: 18, specs: 'Realtime 1s scrape interval' }
];
