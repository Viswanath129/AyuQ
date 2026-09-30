# Quantum ML Healthcare Decision & Research Platform (SIH 2026)

> **High-Fidelity Research Prototype**  
> AI-assisted clinical research, quantum machine learning, and reproducible model evaluation on synthetic biomarker cohorts.

---

## ⚠️ Implementation Status: Frontend-First Prototype

This platform is currently a **Frontend-First Prototype**:
- The UI/UX is fully implemented, interactive, and powered by deterministic mock datasets and simulated pipelines.
- Predictions, quantum circuits, medical decision rules, and model evaluations are **simulated**.
- Clean microservice abstractions, REST API contracts, typed data models, and Python pseudocode are defined in [`src/backend-design/`](file:///B:/projects/QML-SIH2026/src/backend-design/) so the backend can later be extracted without redesigning the user interface.
- Prominent safety notices clarify: **DEMO / RESEARCH PROTOTYPE — Not for Clinical Diagnosis. Synthetic Patient Data Only.**

---

## 🏛️ Layered Architectural Flow

The platform maps directly to the 7 core architectural layers:

```
[Users & Access] (RBAC Roles: Clinician, Researcher, ML Eng, Quantum Res, Admin)
       ↓
 [Data Layer] (Synthetic Cardiovascular, Oncology, Diabetes & Multi-Modal Cohorts)
       ↓
 [ML / QML Layer] (Classical Baselines, Pure QML, & Hybrid VQC Classifiers)
       ↓
[Quantum Execution Layer] (Transpilation, Bloch Sphere, Aer Simulator Gateway)
       ↓
[Results & Decision Support] (Calibrated Risk Probability & SHAP Explainability)
       ↓
[Security & Governance] (HIPAA Safe Harbor, GDPR, Ethics & Audit Trails)
       ↓
[Infrastructure] (CPU, GPU, Simulated QPU Telemetry & Monitoring)
```

**Cross-Cutting Evaluation Protocol:**  
Train/Val Split → Repeated 5-Fold Cross-Validation → Model Selection → Calibration (Platt Scaling) → **Cryptographically Locked Held-Out Test Set** → Unbiased Final Metrics & CIs.

---

## 🚀 Key Features

1. **Research Overview Dashboard**: Realtime KPIs, interactive pipeline flow, model benchmarks, quantum activity telemetry, and microservice status.
2. **Synthetic Cohort & Patient Cases**: Synthetic cases with physiological biomarkers (Troponin, Systolic BP, BMI, Glucose, Vessel Occlusion) for clinical risk stratification.
3. **Dataset Registry & Preprocessing**: Quality metrics (missing values, duplicates, outliers), differential privacy (ε=0.5), and sequential preprocessing pipeline.
4. **Model Laboratory**: 6-step creation wizard with live simulation mode, comparing Classical ML (XGBoost, SVM) with Quantum ML (VQC, QNN, Quantum Kernel).
5. **QML Circuit Studio**: Interactive parameterized circuit canvas (H, RZ, RY, RX, CNOT, M gates), real-time interactive 3D **Bloch Sphere** state vector viewer, and transpilation stage visualizer.
6. **Quantum Execution Gateway**: Transpilation metrics (depth reduction, CNOT elimination), Aer Statevector & QASM shot simulation, and computational basis measurement probabilities.
7. **Rigorous Evaluation Vault**: Leakage-proof methodology with cryptographically isolated held-out test cohort (SHA-256 sealed), 95% bootstrap confidence intervals, and reproducibility parameters (seed, environment hash).
8. **Explainable Clinical Decision Support**: SHAP feature attribution waterfall, calibrated risk tiers, and decision rules.
9. **Research Reports & Dossiers**: Formal evaluation report generation with simulated PDF, JSON, and CSV export.
10. **Security, HIPAA & Ethics Governance**: RBAC role permissions, demographic parity audit, and immutable audit logs.
11. **Backend Design & REST API Contracts**: Target OpenAPI routes and production Python (FastAPI / Qiskit / PyTorch) pseudocode.
12. **11-Step Guided Demo Tour**: One-click guided walkthrough following the complete end-to-end clinical workflow.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Clinical light-theme research lab aesthetic)
- **Icons**: Lucide React
- **Quantum Visualization**: Custom SVG Bloch Sphere, Circuit Canvas & Probability Bar Visualizers
- **Package Manager**: pnpm

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

### 3. Build for Production
```bash
pnpm build
```

---

## 🔬 Regulatory & Ethics Notice
*This software is an investigational research prototype for Smart India Hackathon (SIH 2026). It does not provide medical advice and is not intended for primary clinical diagnosis.*
