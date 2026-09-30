import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Atom, 
  Database, 
  Layers, 
  Cpu, 
  Lock, 
  Activity, 
  FileText,
  RotateCw,
  X
} from 'lucide-react';
import { NavItemKey } from '../../components/layout/Sidebar';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab: (tab: NavItemKey) => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({ isOpen, onClose, onJumpToTab }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 11;

  const steps = [
    {
      step: 1,
      title: 'Select Synthetic Clinical Cohort',
      category: 'Data Layer',
      tab: 'datasets' as NavItemKey,
      icon: Database,
      desc: 'Select "Cardiovascular Risk — Synthetic Dataset" (4,200 records, 14 continuous biomarkers, differential privacy ε=0.5).',
      detail: 'Dataset schema validated. Continuous clinical features normalized and mapped to [0, 2π] for quantum state embedding.'
    },
    {
      step: 2,
      title: 'Select Model Family & Algorithm',
      category: 'ML / QML Layer',
      tab: 'models' as NavItemKey,
      icon: Layers,
      desc: 'Select "Hybrid Quantum-Classical Model" (ResNet feature extractor combined with a Variational Quantum Classifier).',
      detail: 'Hybrid architecture marries deep classical representational learning with parameterized quantum Hilbert space projections.'
    },
    {
      step: 3,
      title: 'Configure Quantum Hyperparameters',
      category: 'QML Lab',
      tab: 'qml-lab' as NavItemKey,
      icon: Atom,
      desc: 'Configure 8 continuous features, 4 active qubits, RealAmplitudes ansatz (Depth=3), and ZZFeatureMap.',
      detail: 'Entangling topology arranged in nearest-neighbor circular CNOT ladder for non-linear correlation capture.'
    },
    {
      step: 4,
      title: 'Simulate Variational Model Training',
      category: 'Model Laboratory',
      tab: 'models' as NavItemKey,
      icon: RotateCw,
      desc: 'Dispatch simulated parameter optimization across 20 epochs using the COBYLA optimizer with analytical gradient updates.',
      detail: 'Training loss converged from 0.693 down to 0.241 with cross-entropy cost function on training folds.'
    },
    {
      step: 5,
      title: 'Execute Circuit on Aer Simulator',
      category: 'Quantum Execution',
      tab: 'quantum-exec' as NavItemKey,
      icon: Cpu,
      desc: 'Run 2,048 shots on the simulated Qiskit Aer GPU Statevector backend with full transpilation optimization.',
      detail: 'Circuit depth transpiled from 22 down to 16 with a 27.3% CNOT count reduction adhering to basis gates [cx, id, rz, sx, x].'
    },
    {
      step: 6,
      title: 'Execute 5-Fold Stratified Cross-Validation',
      category: 'Evaluation Protocol',
      tab: 'evaluation' as NavItemKey,
      icon: Layers,
      desc: 'Run repeated 5-fold cross-validation across training splits for robust parameter selection without touching test cases.',
      detail: 'Mean validation ROC-AUC measured at 0.942 ± 0.013 across all 5 folds.'
    },
    {
      step: 7,
      title: 'Lock & Isolate Held-Out Test Set',
      category: 'Evaluation Protocol',
      tab: 'evaluation' as NavItemKey,
      icon: Lock,
      desc: 'Cryptographically lock the 840-case held-out test cohort to enforce strict zero-leakage research integrity.',
      detail: 'SHA-256 Checksum generated: sha256:7f83b1657ff1... Test set sealed against any subsequent hyperparameter tuning.'
    },
    {
      step: 8,
      title: 'Generate Unbiased Test Metrics',
      category: 'Evaluation Protocol',
      tab: 'evaluation' as NavItemKey,
      icon: CheckCircle2,
      desc: 'Evaluate calibrated model on the locked test set. Accuracy: 91.4%, Sensitivity: 89.2%, Specificity: 92.8%, ROC-AUC: 0.942.',
      detail: '95% Bootstrap Confidence Intervals: [0.929, 0.955]. Platt scaling achieves low Brier loss (0.078).'
    },
    {
      step: 9,
      title: 'Infer Clinical Case Risk Prediction',
      category: 'Results & Decision',
      tab: 'results' as NavItemKey,
      icon: Activity,
      desc: 'Evaluate synthetic case SYN-PT-8491 (62yo Male, Troponin 0.086 ng/mL, BP 154 mmHg). Predicted Risk: 72.4% (High Risk).',
      detail: 'Prompt clinical warning: Research prototype decision support only — not a clinical diagnosis.'
    },
    {
      step: 10,
      title: 'Generate SHAP Feature Attribution',
      category: 'Explainability',
      tab: 'results' as NavItemKey,
      icon: Sparkles,
      desc: 'Compute Shapley values: Troponin (+0.28), Systolic BP (+0.21), Vessel Occlusion (+0.17), Glucose (+0.09).',
      detail: 'Explainability transparently shows clinicians the physiological drivers behind the quantum expectation value.'
    },
    {
      step: 11,
      title: 'Compile Research Evaluation Dossier',
      category: 'Reports & Governance',
      tab: 'reports' as NavItemKey,
      icon: FileText,
      desc: 'Export formal reproducible research report with cryptographic hashes, QASM listings, and peer-review ready audit logs.',
      detail: 'Simulated PDF / JSON dossier export ready for conference review or regulatory submission.'
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      onJumpToTab(steps[currentStep].tab);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      onJumpToTab(steps[currentStep - 2].tab);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Guided Clinical QML Workflow Tour</h2>
              <p className="text-[11px] text-slate-500">Step {currentStep} of {totalSteps} · End-to-End Traceable Architecture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="flex gap-1 w-full">
          {steps.map((s) => (
            <div
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                onJumpToTab(s.tab);
              }}
              className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                s.step === currentStep
                  ? 'bg-indigo-600'
                  : s.step < currentStep
                  ? 'bg-indigo-300'
                  : 'bg-slate-200'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            ></div>
          ))}
        </div>

        {/* Step Body */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              {currentStepData.category}
            </span>
            <span className="text-[11px] font-mono text-slate-500">Step {currentStepData.step}/{totalSteps}</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-2xs shrink-0 mt-0.5">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{currentStepData.title}</h3>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">{currentStepData.desc}</p>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded font-mono text-xs text-slate-600 leading-relaxed">
            <span className="text-indigo-600 font-bold mr-1.5">VERIFIED STATE:</span>
            {currentStepData.detail}
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded text-xs font-semibold text-slate-700 disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onJumpToTab(currentStepData.tab);
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Explore This Screen
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{currentStep === totalSteps ? 'Complete Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
