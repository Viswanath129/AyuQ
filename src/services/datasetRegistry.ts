import { DatasetMetadata } from '../types';

/**
 * Centralized, authoritative dataset registry for AyuQ Quantum ML Healthcare OS.
 * Maps application datasets and model benchmarks to their verified public repositories,
 * canonical citations, DOIs, and clinical provenance notes.
 */
export const DATASET_REGISTRY: Record<string, DatasetMetadata> = {
  'DS-ONCO-03': {
    id: 'DS-ONCO-03',
    name: 'Breast Cancer Wisconsin (Diagnostic) Dataset (WDBC)',
    shortName: 'Wisconsin Breast Cancer (WDBC)',
    category: 'Oncology',
    description: 'Computed from digitized images of fine needle aspirates (FNA) of breast masses describing cell nuclei characteristics (radius, texture, perimeter, area, smoothness, compactness, concavity, concave points, symmetry, fractal dimension). Canonical clinical benchmark for evaluating Quantum Variational Classifiers (VQC) against SVM, Random Forest, and Logistic Regression.',
    sourceOrganization: 'University of Wisconsin Clinical Sciences Center & Computer Sciences Department',
    sourceName: 'UCI Machine Learning Repository',
    sourceUrl: 'https://archive.ics.uci.edu',
    repositoryUrl: 'https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic',
    doi: '10.24432/C5DW2B',
    citation: 'Wolberg, W., Street, W., & Mangasarian, O. (1995). Breast Cancer Wisconsin (Diagnostic). UCI Machine Learning Repository. https://doi.org/10.24432/C5DW2B',
    datasetType: 'Real Clinical Benchmark',
    featureCount: 30,
    recordCount: 569,
    targetVariable: 'Diagnosis (Malignant [212] vs Benign [357])',
    isSynthetic: false,
    provenanceBasis: 'Canonical UCI WDBC archive donated by Dr. William H. Wolberg, W. Nick Street, and Olvi L. Mangasarian (1995)',
    derivationNote: 'Directly evaluated in research paper "Quantum-Enhanced Breast Cancer Detection Using Hybrid Quantum Machine Learning" (Vegisetti, 2026) using Qiskit Aer GPU Statevector simulation.',
    tags: ['Oncology', 'FNA Biopsy', 'WDBC', 'UCI Benchmark', 'Hybrid QML', 'VQC Target'],
    paperReference: {
      title: 'Quantum-Enhanced Breast Cancer Detection Using Hybrid Quantum Machine Learning',
      author: 'Kasi Viswanath Vegisetti (Dept. of ECE, Avanthi Institute of Engineering and Technology)',
      publicationYear: 2026,
      url: 'https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic'
    }
  },

  'DS-CARDIO-01': {
    id: 'DS-CARDIO-01',
    name: 'Cardiovascular Disease & Heart Risk Clinical Benchmark',
    shortName: 'Cardiovascular Risk (Heart Disease / Cleveland)',
    category: 'Cardiovascular',
    description: 'De-identified synthetic cardiovascular biomarker cohort modeled upon the canonical 14-feature Heart Disease clinical database protocol (Cleveland Clinic Foundation / UCI) and Framingham risk determinants, synthesized with differential privacy (ε=0.5) for variational quantum classifier testing.',
    sourceOrganization: 'Cleveland Clinic Foundation, University Hospital Zurich & Hungarian Institute of Cardiology',
    sourceName: 'UCI Machine Learning Repository (Heart Disease Database)',
    sourceUrl: 'https://archive.ics.uci.edu',
    repositoryUrl: 'https://archive.ics.uci.edu/dataset/45/heart+disease',
    doi: '10.24432/C52P4X',
    citation: 'Janosi, A., Steinbrunn, W., Pfisterer, M., & Detrano, R. (1988). Heart Disease. UCI Machine Learning Repository. https://doi.org/10.24432/C52P4X',
    datasetType: 'Synthetic Benchmark Cohort',
    featureCount: 14,
    recordCount: 4200,
    targetVariable: 'Major Adverse Cardiac Event (MACE 1-yr) / Heart Disease Presence',
    isSynthetic: true,
    provenanceBasis: 'Modeled upon the canonical 14 clinical features of the UCI Heart Disease (Cleveland subset) and Framingham cardiovascular risk metrics',
    derivationNote: 'Prototype synthetic cohort generated with differential privacy (ε=0.5) adhering strictly to standard 14 clinical cardiovascular variables (systolic BP, cholesterol, fasting glucose, troponin, vessel score, ejection fraction).',
    tags: ['Cardiology', 'MACE', 'Cleveland Protocol', 'UCI Benchmark', 'Differential Privacy', 'Hybrid VQC']
  },

  'DS-DIABETES-02': {
    id: 'DS-DIABETES-02',
    name: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) Diabetes Cohort',
    shortName: 'Diabetes Prediction (UCI / NIDDK)',
    category: 'Endocrinology',
    description: 'Benchmarked metabolic diagnostic panel dataset modeled upon the canonical NIDDK / Pima Indians Diabetes database for quantum kernel estimation and metabolic support vector classification.',
    sourceOrganization: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
    sourceName: 'UCI Machine Learning Repository',
    sourceUrl: 'https://archive.ics.uci.edu',
    repositoryUrl: 'https://archive.ics.uci.edu/dataset/34/diabetes',
    doi: '10.24432/C53P42',
    citation: 'Smith, J.W., Everhart, J.E., Dickson, W.C., Knowler, W.C., & Johannes, R.S. (1988). Using the ADAP Learning Algorithm to Forecast the Onset of Diabetes Mellitus. In Proceedings of the Symposium on Computer Applications and Medical Care (pp. 261-265).',
    datasetType: 'Synthetic Benchmark Cohort',
    featureCount: 10,
    recordCount: 2850,
    targetVariable: 'Type 2 Diabetes Onset (5-yr)',
    isSynthetic: true,
    provenanceBasis: 'Modeled on NIDDK diagnostic features (glucose tolerance, serum insulin, BMI, age)',
    derivationNote: 'Synthetic metabolic research cohort created for quantum kernel benchmark simulations and support vector classifiers.',
    tags: ['Endocrinology', 'Diabetes', 'NIDDK', 'UCI Benchmark', 'Quantum Kernel']
  },

  'DS-MULTI-04': {
    id: 'DS-MULTI-04',
    name: 'PhysioNet MIMIC Multi-Parameter Critical Care Clinical Database',
    shortName: 'Patient Risk Multi-Modal (PhysioNet / MIMIC)',
    category: 'General Clinical',
    description: 'Multi-modal synthetic clinical cohort synthesized according to PhysioNet MIMIC critical care benchmarks, integrating demographic, laboratory, and telemetry parameters for readmission stratification.',
    sourceOrganization: 'PhysioNet / MIT Laboratory for Computational Physiology',
    sourceName: 'PhysioNet Research Data Portal',
    sourceUrl: 'https://physionet.org',
    repositoryUrl: 'https://physionet.org/content/mimiciii/',
    doi: '10.1038/sdata.2016.35',
    citation: 'Johnson, A. E. W., Pollard, T. J., Shen, L., Lehman, L. H., Feng, M., Ghassemi, M., Moody, B., Szolovits, P., Celi, L. A., & Mark, R. G. (2016). MIMIC-III, a freely accessible critical care database. Scientific Data, 3, 160035.',
    datasetType: 'De-identified Multi-Modal Cohort',
    featureCount: 24,
    recordCount: 5400,
    targetVariable: '30-Day ICU Readmission Risk',
    isSynthetic: true,
    provenanceBasis: 'Synthesized following PhysioNet MIMIC-III ICU telemetry standards and Charlson comorbidity scoring',
    derivationNote: 'Synthetic multi-modal clinical cohort used for evaluating generalizability of high-dimensional quantum embeddings.',
    tags: ['Critical Care', 'Readmission', 'PhysioNet', 'MIMIC-III', 'Multi-Modal']
  }
};

export const ALL_DATASET_METADATA: DatasetMetadata[] = Object.values(DATASET_REGISTRY);

/**
 * Lookup dataset metadata by dataset ID or normalized name
 */
export function getDatasetMetadata(idOrName?: string): DatasetMetadata | undefined {
  if (!idOrName) return undefined;
  
  // Direct ID match
  if (DATASET_REGISTRY[idOrName]) {
    return DATASET_REGISTRY[idOrName];
  }

  // Name or keyword match
  const lower = idOrName.toLowerCase();
  if (lower.includes('wisconsin') || lower.includes('breast') || lower.includes('wbcd') || lower.includes('onco')) {
    return DATASET_REGISTRY['DS-ONCO-03'];
  }
  if (lower.includes('cardio') || lower.includes('heart') || lower.includes('mace')) {
    return DATASET_REGISTRY['DS-CARDIO-01'];
  }
  if (lower.includes('diabet') || lower.includes('niddk') || lower.includes('pima')) {
    return DATASET_REGISTRY['DS-DIABETES-02'];
  }
  if (lower.includes('multi') || lower.includes('mimic') || lower.includes('readmission') || lower.includes('icu')) {
    return DATASET_REGISTRY['DS-MULTI-04'];
  }

  return undefined;
}

/**
 * Returns the verified repository URL for a given dataset ID or name.
 * Defaults to the UCI Machine Learning Repository if not found.
 */
export function getDatasetSourceUrl(idOrName?: string): string {
  const meta = getDatasetMetadata(idOrName);
  return meta ? meta.repositoryUrl : 'https://archive.ics.uci.edu';
}

/**
 * Returns formatted source organization for UI badges
 */
export function getDatasetSourceName(idOrName?: string): string {
  const meta = getDatasetMetadata(idOrName);
  return meta ? meta.sourceName : 'UCI ML Repository';
}
