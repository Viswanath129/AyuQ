# AyuQ — Hybrid Quantum Intelligence for Early Disease Detection

> **High-Fidelity Clinical Quantum Research Operating System**  
> AI-assisted clinical research, parameterized quantum variational circuits, verified public dataset benchmarks, and mathematically locked model validation for early oncology and cardiovascular detection.

---

## ⚠️ Implementation Status: Frontend-First Prototype

This platform is an **Investigational Research Prototype**:
- The UI/UX is interactive, and powered by deterministic mock datasets, verified public dataset benchmarks, and simulated pipelines.
- Predictions, quantum circuits, medical decision rules, and model evaluations are **simulated** (Qiskit Aer GPU Statevector Simulator baseline).
- Clean microservice abstractions, REST API contracts, typed data models, and Python pseudocode are defined in [`src/backend-design/`](src/backend-design/) so the backend can later be extracted without redesigning the user interface.
- Prominent safety notices clarify: **DEMO / RESEARCH PROTOTYPE — Not for Clinical Diagnosis. Synthetic & Anonymized Patient Data Only.**

---

## 📊 Verified Authoritative Dataset Sources & Citations

All clinical benchmarks, models, and quantum circuits in AyuQ reference verified public dataset repositories through a centralized typed registry (`src/services/datasetRegistry.ts`):

| Dataset Name | Category | Instances / Features | Source Organization & Repository | Canonical Citation & DOI |
| :--- | :--- | :--- | :--- | :--- |
| **Breast Cancer Wisconsin (Diagnostic) (WDBC)** | Oncology | 569 cases / 30 features | **UCI Machine Learning Repository** (Univ. of Wisconsin) | Wolberg, Street, & Mangasarian (1995). *Breast Cancer Wisconsin (Diagnostic)*. [DOI: 10.24432/C5DW2B](https://doi.org/10.24432/C5DW2B) |
| **Cardiovascular Risk Benchmark** | Cardiology | 4,200 cases / 14 features | **UCI Machine Learning Repository** (Cleveland Clinic Foundation) | Janosi, Steinbrunn, Pfisterer, & Detrano (1988). *Heart Disease Database*. [DOI: 10.24432/C52P4X](https://doi.org/10.24432/C52P4X) |
| **Diabetes Prediction Cohort** | Endocrinology | 2,850 cases / 10 features | **UCI Machine Learning Repository** (NIDDK) | Smith et al. (1988). *Using the ADAP Learning Algorithm to Forecast Onset of Diabetes Mellitus*. [DOI: 10.24432/C53P42](https://doi.org/10.24432/C53P42) |
| **Patient Risk Multi-Modal Cohort** | Critical Care | 5,400 cases / 24 features | **PhysioNet Research Data Portal** (MIT LCP) | Johnson et al. (2016). *MIMIC-III, a freely accessible critical care database*. Scientific Data. [DOI: 10.1038/sdata.2016.35](https://doi.org/10.1038/sdata.2016.35) |

*Note: Datasets labeled "Synthetic" are synthesized with differential privacy (ε=0.5) modeled strictly upon the corresponding canonical clinical feature distributions and protocol specifications.*

---

## 🏛️ Layered Architectural Flow

The platform maps directly to 7 core architectural layers:

```
[Users & Access] (RBAC Roles: Clinician, Researcher, ML Eng, Quantum Res, Admin)
       ↓
 [Data Layer] (Centralized Dataset Registry: UCI WDBC, Cleveland Heart, NIDDK, MIMIC)
       ↓
 [ML / QML Layer] (Classical Baselines: SVM, RF, LR; Pure QML & Hybrid VQC Classifiers)
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

1. **Research Overview Dashboard**: Realtime KPIs, interactive pipeline flow, model benchmarks with direct links to verified public dataset repositories, quantum activity telemetry, and microservice status.
2. **Centralized Dataset Registry**: Accessible `DatasetSourceBadge` components linking all models and quantum circuits to their authoritative UCI/PhysioNet source records.
3. **Synthetic Cohort & Patient Cases**: Physiological biomarkers (Troponin, Systolic BP, BMI, Glucose, Vessel Occlusion) for clinical risk stratification.
4. **Dataset Registry & Preprocessing**: Quality metrics (missing values, duplicates, outliers), differential privacy (ε=0.5), and sequential preprocessing pipeline.
5. **Model Laboratory**: 6-step creation wizard with live simulation mode, comparing Classical ML (SVM, RF, XGBoost) with Hybrid QML (VQC, QNN, Quantum Kernel).
6. **QML Circuit Studio**: Interactive parameterized circuit canvas (H, RZ, RY, RX, CNOT, M gates), real-time interactive 3D **Bloch Sphere** state vector viewer, and transpilation stage visualizer with Wisconsin Breast Cancer (WDBC) presets.
7. **Quantum Execution Gateway**: Transpilation metrics (depth reduction, CNOT elimination), Aer Statevector & QASM shot simulation, and computational basis measurement probabilities.
8. **Rigorous Evaluation Vault**: Leakage-proof methodology with cryptographically isolated held-out test cohort (SHA-256 sealed), 95% bootstrap confidence intervals, and reproducibility parameters.
9. **Explainable Clinical Decision Support**: SHAP feature attribution waterfall, calibrated risk tiers, and decision rules.
10. **Research Reports & Dossiers**: Formal peer-reviewed research dossier (*Quantum-Enhanced Breast Cancer Detection Using Hybrid QML*, Vegisetti 2026) with simulated PDF, JSON, and BibTeX citation export.
11. **Security, HIPAA & Ethics Governance**: RBAC role permissions, demographic parity audit, and immutable audit logs.
12. **Backend Design & REST API Contracts**: Target OpenAPI routes and production Python (FastAPI / Qiskit / PyTorch) pseudocode.
13. **11-Step Guided Demo Tour**: One-click guided walkthrough following the complete end-to-end clinical workflow.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Warm champagne liquid-glass scientific lab aesthetic)
- **Visuals**: Three.js (3D Bloch Sphere & Hilbert Lattice), React Bits (Strands, ClickSpark, TargetCursor, GradualBlur), Lottie Web
- **Icons**: Lucide React
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
