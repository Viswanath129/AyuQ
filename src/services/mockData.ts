import { Dataset, Model, QuantumExecutionJob, EvaluationRun, PatientCase, AuditLogEntry, InfrastructureNode, User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@quantumhealth.org',
    role: 'Quantum Researcher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    institution: 'Institute for Quantum Medical Systems'
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
    ]
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
    ]
  },
  {
    id: 'DS-ONCO-03',
    name: 'Breast Cancer Classification — Synthetic Biomarkers',
    category: 'Oncology',
    records: 1680,
    features: 18,
    version: 'v3.0',
    status: 'Ready',
    lastUpdated: '2026-09-18',
    qualityScore: 99.1,
    description: 'High-dimensional nuclear pleomorphism and genomic score synthetic dataset evaluated against quantum neural network backends.',
    targetVariable: 'Malignancy (Benign vs Malignant)',
    dataDistribution: [
      { label: 'Benign', count: 1058, percentage: 63.0 },
      { label: 'Malignant', count: 622, percentage: 37.0 }
    ],
    missingValuesPct: 0.00,
    duplicateRows: 0,
    outliersPct: 0.45,
    schema: [
      { feature: 'radius_mean', type: 'float64', mean: '14.12 mm', std: '3.52', missing: 0 },
      { feature: 'texture_mean', type: 'float64', mean: '19.28', std: '4.30', missing: 0 },
      { feature: 'perimeter_mean', type: 'float64', mean: '91.96 mm', std: '24.29', missing: 0 }
    ]
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
    ]
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
    id: 'MDL-QML-QVNN-05',
    name: 'Quantum Variational Neural Network (QVNN)',
    version: 'v1.0.0',
    family: 'QUANTUM_ML',
    algorithm: 'Strongly Entangling Layered Ansatz',
    datasetId: 'DS-ONCO-03',
    datasetName: 'Breast Cancer Classification — Synthetic Biomarkers',
    status: 'Registered',
    accuracy: 0.886,
    auc: 0.918,
    sensitivity: 0.870,
    specificity: 0.896,
    f1Score: 0.883,
    updatedAt: '2026-09-20',
    quantumSpecs: {
      qubits: 6,
      ansatz: 'StronglyEntanglingLayers',
      featureMap: 'ChebyshevFeatureMap',
      shots: 2048,
      depth: 26,
      backend: 'Aer Statevector Simulator'
    }
  }
];

export const MOCK_EVALUATION_RUNS: EvaluationRun[] = [
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
  }
];

export const MOCK_QUANTUM_JOBS: QuantumExecutionJob[] = [
  {
    id: 'QJOB-2026-042',
    circuitName: 'Cardio-VQC-Ansatz-L3',
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
