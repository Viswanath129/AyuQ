import React, { useState } from 'react';
import { 
  Layers, 
  Atom, 
  Cpu, 
  Sliders, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  TrendingUp,
  Activity
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { ThreeBlochSphere } from '../../components/quantum/ThreeBlochSphere';
import { MOCK_MODELS, MOCK_DATASETS } from '../../services/mockData';
import { Model, ModelFamily } from '../../types';

export const ModelLaboratory: React.FC = () => {
  const [models, setModels] = useState<Model[]>(MOCK_MODELS);
  const [selectedModel, setSelectedModel] = useState<Model>(MOCK_MODELS[0]);
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<'ALL' | ModelFamily>('ALL');
  const [detailTab, setDetailTab] = useState<'overview' | 'architecture' | 'parameters' | 'training' | 'performance'>('overview');

  // Interactive Model Creation / Simulation Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [trainDataset, setTrainDataset] = useState(MOCK_DATASETS[0].name);
  const [trainFamily, setTrainFamily] = useState<ModelFamily>('HYBRID');
  const [trainAlgo, setTrainAlgo] = useState('Variational Quantum Classifier (VQC)');
  const [trainQubits, setTrainQubits] = useState(4);
  const [trainShots, setTrainShots] = useState(2048);
  const [isTraining, setIsTraining] = useState(false);
  const [trainProgress, setTrainProgress] = useState(0);
  const [trainEpoch, setTrainEpoch] = useState(0);

  const filteredModels = models.filter(m => selectedFamilyFilter === 'ALL' || m.family === selectedFamilyFilter);

  const handleStartSimulatedTraining = () => {
    setIsTraining(true);
    setTrainProgress(10);
    setTrainEpoch(1);

    const interval = setInterval(() => {
      setTrainProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setWizardStep(6);
          return 100;
        }
        return prev + 18;
      });
      setTrainEpoch((e) => Math.min(20, e + 3));
    }, 400);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Model Laboratory</h2>
            <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-medium">
              ML / QML Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Design, configure, and benchmark Classical ML, pure Quantum ML (QNN, VQC), and Hybrid architectures on clinical synthetic data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsWizardOpen(true);
              setWizardStep(1);
              setTrainProgress(0);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Model Experiment</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-200 text-xs">
        {(['ALL', 'HYBRID', 'QUANTUM_ML', 'CLASSICAL_ML'] as const).map((fam) => (
          <button
            key={fam}
            onClick={() => setSelectedFamilyFilter(fam)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedFamilyFilter === fam
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {fam === 'ALL' ? 'All Models (5)' : fam.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((m) => {
          const isSelected = selectedModel.id === m.id;
          return (
            <div
              key={m.id}
              onClick={() => setSelectedModel(m)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  m.family === 'HYBRID'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : m.family === 'QUANTUM_ML'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {m.family}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  {m.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1">{m.name}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-3">{m.algorithm}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center font-mono">
                <div className="p-1.5 bg-slate-50 rounded">
                  <span className="text-[9px] text-slate-400 block uppercase">Accuracy</span>
                  <span className="text-xs font-bold text-slate-800">{(m.accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="p-1.5 bg-slate-50 rounded">
                  <span className="text-[9px] text-slate-400 block uppercase">ROC-AUC</span>
                  <span className="text-xs font-bold text-emerald-600">{m.auc.toFixed(3)}</span>
                </div>
                <div className="p-1.5 bg-slate-50 rounded">
                  <span className="text-[9px] text-slate-400 block uppercase">F1-Score</span>
                  <span className="text-xs font-bold text-slate-800">{m.f1Score.toFixed(3)}</span>
                </div>
              </div>

              {m.quantumSpecs && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-indigo-700 font-mono">
                  <span>{m.quantumSpecs.qubits} Qubits · {m.quantumSpecs.ansatz.split(' ')[0]}</span>
                  <span>{m.quantumSpecs.shots} shots</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Model Workspace Details */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Detail Tabs */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-200">
          <div className="flex items-center gap-1">
            {[
              { key: 'overview', label: 'Model Overview' },
              { key: 'architecture', label: 'Layered Architecture' },
              { key: 'parameters', label: 'Hyperparameters & Quantum Ansatz' },
              { key: 'training', label: 'Training Convergence (Simulated)' },
              { key: 'performance', label: 'Clinical Metrics' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setDetailTab(tab.key as any)}
                className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${
                  detailTab === tab.key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400">{selectedModel.id}</span>
        </div>

        <div className="p-6">
          {detailTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Model Specifications</h4>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div><strong>Algorithm:</strong> {selectedModel.algorithm}</div>
                    <div><strong>Dataset:</strong> {selectedModel.datasetName}</div>
                    <div><strong>Version:</strong> {selectedModel.version}</div>
                    <div><strong>Registry Status:</strong> {selectedModel.status}</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-md space-y-2">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Quantum Acceleration Specs</h4>
                  {selectedModel.quantumSpecs ? (
                    <div className="text-xs space-y-1 text-indigo-900 font-mono">
                      <div>Qubits: {selectedModel.quantumSpecs.qubits} active wires</div>
                      <div>Ansatz: {selectedModel.quantumSpecs.ansatz}</div>
                      <div>Feature Map: {selectedModel.quantumSpecs.featureMap}</div>
                      <div>Circuit Depth: {selectedModel.quantumSpecs.depth}</div>
                      <div>Execution Backend: {selectedModel.quantumSpecs.backend}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Classical baseline — No quantum circuit hardware mapped.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {detailTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                End-to-End Quantum Machine Learning Architecture
              </h4>

              {/* Visual Architecture Flow Diagram */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-center font-mono">
                  <div className="p-3 bg-white border border-slate-200 rounded-md w-full md:w-36 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">STEP 1</span>
                    <strong className="text-slate-800">Input Features</strong>
                    <div className="text-[10px] text-slate-500">8 Biomarkers</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md w-full md:w-36 shadow-2xs text-blue-900">
                    <span className="text-[10px] text-blue-500 block">STEP 2</span>
                    <strong>Feature Encoding</strong>
                    <div className="text-[10px] text-blue-600">Angle [0, 2π]</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md w-full md:w-36 shadow-2xs text-indigo-900">
                    <span className="text-[10px] text-indigo-500 block">STEP 3</span>
                    <strong>Quantum Map</strong>
                    <div className="text-[10px] text-indigo-600">ZZFeatureMap</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md w-full md:w-36 shadow-2xs text-purple-900">
                    <span className="text-[10px] text-purple-500 block">STEP 4</span>
                    <strong>VQC Ansatz</strong>
                    <div className="text-[10px] text-purple-600">RealAmplitudes</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md w-full md:w-36 shadow-2xs text-emerald-900">
                    <span className="text-[10px] text-emerald-500 block">STEP 5</span>
                    <strong>Measurement</strong>
                    <div className="text-[10px] text-emerald-600">Expectation ⟨Z⟩</div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

                  <div className="p-3 bg-slate-900 text-white rounded-md w-full md:w-36 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">STEP 6</span>
                    <strong>Risk Output</strong>
                    <div className="text-[10px] text-emerald-400">P(Risk=1)</div>
                  </div>
                </div>
              </div>

              {selectedModel.quantumSpecs && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-2">
                  <ThreeBlochSphere qubitLabel="q0 (Ansatz State)" initialTheta={54} initialPhi={120} />
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Variational Quantum State Projection
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Clinical features are parameterized into SU(2) rotations on qubit wires. 
                      Entangling CNOT ladders generate Hilbert space correlations inaccessible to linear classical kernels.
                    </p>
                    <div className="font-mono text-[11px] p-2.5 bg-white border border-slate-200 rounded space-y-1 text-slate-700">
                      <div>Ansatz: {selectedModel.quantumSpecs.ansatz}</div>
                      <div>Feature Map: {selectedModel.quantumSpecs.featureMap}</div>
                      <div>Circuit Depth: {selectedModel.quantumSpecs.depth} basis gates</div>
                      <div>Sampling: {selectedModel.quantumSpecs.shots} shots</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {detailTab === 'training' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Optimization Trajectory (Simulated 20 Epochs)
                  </h4>
                  <p className="text-xs text-slate-500">Loss function minimization with COBYLA / Adam parameter updates</p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                  Converged at Epoch 18
                </span>
              </div>

              {/* Convergence Metric Bars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">INITIAL LOSS</div>
                  <div className="text-base font-bold text-slate-700">0.693</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">FINAL LOSS</div>
                  <div className="text-base font-bold text-emerald-600">0.241</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">OPTIMIZER</div>
                  <div className="text-base font-bold text-indigo-600">COBYLA / Adam</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-400 text-[10px]">EXECUTION TIME</div>
                  <div className="text-base font-bold text-slate-700">14.2s (Sim)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Creation 6-Step Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">New Model Experiment Wizard</h3>
                <span className="text-[11px] text-slate-500 font-mono">Step {wizardStep} of 6 — Simulation Mode</span>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Step 1: Select Dataset */}
            {wizardStep === 1 && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Step 1: Select Synthetic Dataset</label>
                <div className="space-y-2">
                  {MOCK_DATASETS.map((ds) => (
                    <div
                      key={ds.id}
                      onClick={() => setTrainDataset(ds.name)}
                      className={`p-3 rounded border text-xs cursor-pointer transition-colors ${
                        trainDataset === ds.name ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold text-slate-800">{ds.name}</div>
                      <div className="text-[11px] text-slate-500">{ds.records} records · {ds.features} features · {ds.version}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Family */}
            {wizardStep === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Step 2: Select Model Family</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { fam: 'HYBRID', title: 'Hybrid QML', desc: 'Classical features + Variational ansatz' },
                    { fam: 'QUANTUM_ML', title: 'Pure Quantum ML', desc: 'Full Hilbert space encoding' },
                    { fam: 'CLASSICAL_ML', title: 'Classical ML', desc: 'XGBoost, SVM or Random Forest' },
                  ].map((f) => (
                    <div
                      key={f.fam}
                      onClick={() => setTrainFamily(f.fam as ModelFamily)}
                      className={`p-3 rounded border text-xs cursor-pointer ${
                        trainFamily === f.fam ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-slate-800">{f.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Algorithm */}
            {wizardStep === 3 && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Step 3: Select Algorithm</label>
                <select
                  value={trainAlgo}
                  onChange={(e) => setTrainAlgo(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800"
                >
                  <option value="Variational Quantum Classifier (VQC)">Variational Quantum Classifier (VQC)</option>
                  <option value="Quantum Kernel SVM">Quantum Kernel SVM (Pauli Kernel)</option>
                  <option value="Quantum Neural Network (QNN)">Quantum Neural Network (QNN)</option>
                  <option value="XGBoost Classifier">XGBoost Classifier (Baseline)</option>
                </select>
              </div>
            )}

            {/* Step 4: Configure Hyperparameters */}
            {wizardStep === 4 && (
              <div className="space-y-3 text-xs">
                <label className="font-semibold text-slate-700">Step 4: Configure Hyperparameters</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block mb-1">Number of Qubits:</span>
                    <input
                      type="number"
                      value={trainQubits}
                      onChange={(e) => setTrainQubits(Number(e.target.value))}
                      className="w-full p-2 border border-slate-200 rounded bg-slate-50 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Quantum Shots:</span>
                    <input
                      type="number"
                      value={trainShots}
                      onChange={(e) => setTrainShots(Number(e.target.value))}
                      className="w-full p-2 border border-slate-200 rounded bg-slate-50 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Simulated Training */}
            {wizardStep === 5 && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Step 5: Model Training Execution</label>
                  <span className="font-mono text-indigo-600 font-semibold">{trainProgress}%</span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${trainProgress}%` }}
                  ></div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1">
                  <div>[SIMULATION] Dispatching statevector circuit to Qiskit Aer...</div>
                  <div>[EPOCH {trainEpoch}/20] Cross-entropy loss: {(0.69 - (trainProgress / 220)).toFixed(3)}</div>
                  <div>[STATUS] {trainProgress < 100 ? 'Iterating parameter gradients...' : 'Optimization converged successfully!'}</div>
                </div>

                {!isTraining && trainProgress === 0 && (
                  <button
                    onClick={handleStartSimulatedTraining}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Simulated Training</span>
                  </button>
                )}
              </div>
            )}

            {/* Step 6: Evaluation Preview */}
            {wizardStep === 6 && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Model trained successfully in simulation mode!</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono pt-2">
                  <div className="p-2 bg-slate-50 rounded border">
                    <span className="text-[9px] text-slate-400 block">ACCURACY</span>
                    <strong className="text-slate-800">91.4%</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border">
                    <span className="text-[9px] text-slate-400 block">ROC-AUC</span>
                    <strong className="text-emerald-600">0.942</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border">
                    <span className="text-[9px] text-slate-400 block">STATUS</span>
                    <strong className="text-indigo-600">Ready for CV</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="flex justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setWizardStep((s) => Math.max(1, s - 1))}
                disabled={wizardStep === 1 || isTraining}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 disabled:opacity-40"
              >
                Back
              </button>

              {wizardStep < 5 ? (
                <button
                  onClick={() => setWizardStep((s) => s + 1)}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                >
                  Next
                </button>
              ) : wizardStep === 6 ? (
                <button
                  onClick={() => setIsWizardOpen(false)}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                >
                  Finish & Register Model
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
