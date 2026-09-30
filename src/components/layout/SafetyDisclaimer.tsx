import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SafetyDisclaimerProps {
  compact?: boolean;
}

export const SafetyDisclaimer: React.FC<SafetyDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50/90 backdrop-blur-md border border-amber-300/60 text-amber-950 rounded-lg text-xs font-medium shadow-2xs">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>RESEARCH PROTOTYPE — Not for Clinical Diagnosis. Synthetic Data Only.</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3.5 sm:p-4 glass-card border border-amber-300/60 rounded-xl text-amber-950 shadow-xs mb-4">
      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed space-y-0.5">
        <p className="font-bold text-amber-950 tracking-wide font-mono text-[11px] uppercase">
          REGULATORY NOTICE: FRONTEND RESEARCH & DECISION-SUPPORT PROTOTYPE
        </p>
        <p className="text-stone-700 leading-normal">
          This system is an investigational software prototype demonstrating quantum machine learning pipelines on synthetic patient cohorts. 
          Predictions, quantum circuit simulations, and risk assessments are simulated. This platform does not provide medical diagnosis, 
          has not been cleared by the FDA or CE regulatory bodies, and must never be utilized for primary clinical decisions.
        </p>
      </div>
    </div>
  );
};
