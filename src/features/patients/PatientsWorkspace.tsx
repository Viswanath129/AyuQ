import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Activity, 
  ArrowRight, 
  ShieldAlert, 
  Heart,
  Sparkles
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_PATIENT_CASES } from '../../services/mockData';
import { PatientCase } from '../../types';

interface PatientsWorkspaceProps {
  onSelectCaseForInference?: (pt: PatientCase) => void;
}

export const PatientsWorkspace: React.FC<PatientsWorkspaceProps> = ({ onSelectCaseForInference }) => {
  const [cases, setCases] = useState<PatientCase[]>(MOCK_PATIENT_CASES);
  const [selectedCase, setSelectedCase] = useState<PatientCase>(MOCK_PATIENT_CASES[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(c => 
    c.syntheticId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Synthetic Cohort & Patient Cases</h2>
            <span className="text-xs px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md font-medium">
              Synthetic Clinical Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated patient records with physiological biomarkers, vitals, and verified ground-truth endpoints for quantum clinical inference testing.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search synthetic case..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 w-52 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Cases Table & Selected Case Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Synthetic Patients</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Patient ID</th>
                  <th className="py-2.5 px-3">Age / Gender</th>
                  <th className="py-2.5 px-3">Clinical Indication</th>
                  <th className="py-2.5 px-3">Systolic BP</th>
                  <th className="py-2.5 px-3">Simulated Risk</th>
                  <th className="py-2.5 px-3">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((pt) => {
                  const isSelected = selectedCase.id === pt.id;
                  return (
                    <tr
                      key={pt.id}
                      onClick={() => setSelectedCase(pt)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/60 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">{pt.syntheticId}</td>
                      <td className="py-2.5 px-3 text-slate-600">{pt.age}y / {pt.gender}</td>
                      <td className="py-2.5 px-3 text-slate-600 max-w-[150px] truncate">{pt.condition}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{pt.systolicBp} mmHg</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{(pt.riskProbability * 100).toFixed(1)}%</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          pt.riskTier === 'High Risk'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : pt.riskTier === 'Moderate Risk'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {pt.riskTier}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Case Inspection Card (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 font-mono">SELECTED SYNTHETIC CASE</span>
              <h3 className="text-base font-bold text-slate-900">{selectedCase.syntheticId}</h3>
            </div>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-mono">
              {selectedCase.age}y {selectedCase.gender}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Systolic Blood Pressure:</span>
                <span className="font-semibold text-slate-800">{selectedCase.systolicBp} mmHg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Serum Cholesterol:</span>
                <span className="font-semibold text-slate-800">{selectedCase.cholesterol} mg/dL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fasting Blood Glucose:</span>
                <span className="font-semibold text-slate-800">{selectedCase.fastingGlucose} mg/dL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Body Mass Index (BMI):</span>
                <span className="font-semibold text-slate-800">{selectedCase.bmi} kg/m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Troponin Biomarker:</span>
                <span className="font-semibold text-indigo-600">{selectedCase.cardiacBiomarker} ng/mL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vessel Occlusion:</span>
                <span className="font-semibold text-slate-800">{selectedCase.vesselOcclusionPct}%</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/50 rounded border border-indigo-200 text-indigo-900 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider">Simulated VQC Prediction</span>
                <span className="text-sm font-bold font-mono">{(selectedCase.riskProbability * 100).toFixed(1)}%</span>
              </div>
              <p className="text-[11px] leading-tight text-indigo-800/90">{selectedCase.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
