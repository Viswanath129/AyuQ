/**
 * REST API CONTRACTS SPECIFICATION (OPENAPI / FASTAPI TARGET)
 * 
 * Base URL: /api/v1
 * All endpoints return simulated deterministic payloads in prototype mode.
 */

export const API_ENDPOINTS = {
  // Authentication & RBAC
  AUTH_LOGIN: { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate user with role credentials' },
  AUTH_LOGOUT: { method: 'POST', path: '/api/v1/auth/logout', description: 'Revoke active session token' },
  AUTH_ME: { method: 'GET', path: '/api/v1/auth/me', description: 'Retrieve current session profile & role permissions' },

  // Data Layer
  DATASETS_LIST: { method: 'GET', path: '/api/v1/datasets', description: 'List synthetic/clinical research datasets' },
  DATASETS_GET: { method: 'GET', path: '/api/v1/datasets/:id', description: 'Get dataset metadata, schema & distribution' },
  DATASETS_UPLOAD: { method: 'POST', path: '/api/v1/datasets', description: 'Upload synthetic research dataset (CSV/Parquet)' },
  DATASETS_PREPROCESS: { method: 'POST', path: '/api/v1/datasets/:id/preprocess', description: 'Trigger feature normalization & encoding pipeline' },

  // ML / QML Layer
  MODELS_LIST: { method: 'GET', path: '/api/v1/models', description: 'List registered Classical, QML & Hybrid models' },
  MODELS_CREATE: { method: 'POST', path: '/api/v1/models', description: 'Initialize new model architecture definition' },
  MODELS_TRAIN_RUN: { method: 'POST', path: '/api/v1/training/run', description: 'Dispatch model training simulation job' },
  MODELS_TRAIN_STATUS: { method: 'GET', path: '/api/v1/training/:jobId/status', description: 'Poll training loss/accuracy telemetry' },

  // Quantum Execution Layer
  QUANTUM_BUILD_CIRCUIT: { method: 'POST', path: '/api/v1/quantum/circuit', description: 'Assemble variational ansatz & feature map QASM' },
  QUANTUM_TRANSPILE: { method: 'POST', path: '/api/v1/quantum/transpile', description: 'Synthesize circuit for target quantum backend topology' },
  QUANTUM_EXECUTE: { method: 'POST', path: '/api/v1/quantum/execute', description: 'Submit circuit execution to simulator or quantum provider' },
  QUANTUM_MEASUREMENTS: { method: 'GET', path: '/api/v1/quantum/jobs/:id', description: 'Retrieve state measurement distribution & probabilities' },

  // Evaluation Protocol
  EVALUATION_CREATE: { method: 'POST', path: '/api/v1/evaluations', description: 'Instantiate cross-validation & model selection protocol' },
  EVALUATION_GET: { method: 'GET', path: '/api/v1/evaluations/:id', description: 'Retrieve evaluation metrics, ROC-AUC, PR-AUC and CIs' },
  EVALUATION_LOCK_TESTSET: { method: 'POST', path: '/api/v1/evaluations/:id/lock-test-set', description: 'Cryptographically isolate and lock held-out test cohort' },

  // Results & Decision Support
  PREDICTIONS_INFER: { method: 'POST', path: '/api/v1/predictions', description: 'Infer clinical risk probability with hybrid quantum model' },
  EXPLAINABILITY_SHAP: { method: 'POST', path: '/api/v1/explainability/shap', description: 'Compute Shapley feature contribution vectors' },

  // Reports & Governance
  REPORTS_GENERATE: { method: 'POST', path: '/api/v1/reports/generate', description: 'Compile peer-reviewable research evaluation report' },
  GOVERNANCE_AUDIT_LOGS: { method: 'GET', path: '/api/v1/governance/audit-logs', description: 'Fetch immutable compliance and access trail' },
  INFRASTRUCTURE_METRICS: { method: 'GET', path: '/api/v1/infrastructure/telemetry', description: 'Read CPU, GPU, QPU and memory utilization metrics' }
} as const;

export type EndpointKey = keyof typeof API_ENDPOINTS;
