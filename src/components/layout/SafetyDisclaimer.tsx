import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface SafetyDisclaimerProps {
  compact?: boolean;
}

export const SafetyDisclaimer: React.FC<SafetyDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50/90 border border-amber-200 text-amber-800 rounded-md text-xs font-medium">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>RESEARCH PROTOTYPE — Not for Clinical Diagnosis. Synthetic Patient Data Only.</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3.5 bg-amber-50/90 border border-amber-200/80 rounded-lg text-amber-900 shadow-xs mb-4">
      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed space-y-0.5">
        <p className="font-semibold text-amber-900">
          REGULATORY NOTICE: FRONTEND RESEARCH & DECISION-SUPPORT PROTOTYPE
        </p>
        <p className="text-amber-800/90">
          This system is an investigational software prototype demonstrating quantum machine learning pipelines on synthetic patient cohorts. 
          Predictions, quantum circuit executions, and risk assessments are simulated. This platform does not provide medical diagnosis, 
          has not been cleared by the FDA or CE regulatory bodies, and must never be utilized for primary patient clinical decisions.
        </p>
      </div>
    </div>
  );
};
