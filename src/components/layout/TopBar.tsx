import React, { useState } from 'react';
import { Search, Bell, Sparkles, Check, Info } from 'lucide-react';
import { NavItemKey } from './Sidebar';
import { User } from '../../types';

interface TopBarProps {
  currentTab: NavItemKey;
  currentUser: User;
  onStartDemo: () => void;
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  currentUser,
  onStartDemo,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumb = (tab: NavItemKey) => {
    switch (tab) {
      case 'overview': return { title: 'Research Overview & KPI Dashboard', parent: 'Platform' };
      case 'patients': return { title: 'Synthetic Cohort & Patient Cases', parent: 'Clinical' };
      case 'datasets': return { title: 'Dataset Registry & Preprocessing', parent: 'Data Layer' };
      case 'models': return { title: 'Model Laboratory (Classical & QML)', parent: 'ML/QML' };
      case 'qml-lab': return { title: 'QML Lab & Variational Circuit Studio', parent: 'Quantum' };
      case 'quantum-exec': return { title: 'Quantum Execution & Hardware Simulator', parent: 'Execution' };
      case 'evaluation': return { title: 'Rigorous Evaluation Protocol & Locked Test Set', parent: 'Validation' };
      case 'results': return { title: 'Inference & Explainable Decision Support', parent: 'Results' };
      case 'reports': return { title: 'Research Reports & Regulatory Dossiers', parent: 'Governance' };
      case 'governance': return { title: 'Security, HIPAA/GDPR & Model Ethics', parent: 'Governance' };
      case 'infrastructure': return { title: 'Compute, QPU & Container Infrastructure', parent: 'Systems' };
      case 'architecture': return { title: 'Backend Architecture & API Contracts', parent: 'Engineering' };
      case 'settings': return { title: 'Platform Configuration & Preferences', parent: 'Admin' };
      default: return { title: 'Quantum ML Platform', parent: 'Home' };
    }
  };

  const breadcrumb = getBreadcrumb(currentTab);

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Title & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">{breadcrumb.parent}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-semibold text-sm">{breadcrumb.title}</span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Environment Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] font-medium text-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Prototype Environment</span>
        </div>

        {/* Global Search Box */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets, models, cases..."
            className="w-56 pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Guided Demo Button */}
        <button
          onClick={onStartDemo}
          className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md shadow-2xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Tour</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 absolute top-1 right-1"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 font-semibold text-slate-800">
                <span>Recent System Events</span>
                <span className="text-[10px] text-indigo-600 cursor-pointer">Mark read</span>
              </div>
              <div className="space-y-2 text-slate-600">
                <div className="p-2 bg-slate-50 rounded border border-slate-100 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">Circuit Simulation Finished</p>
                    <p className="text-[11px] text-slate-500">Cardio-VQC-Ansatz-L3 on Aer QASM (2048 shots)</p>
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">Test Set Cryptographically Sealed</p>
                    <p className="text-[11px] text-slate-500">Evaluation EVAL-2026-089 SHA-256 verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full border border-slate-200 object-cover"
          />
        </div>
      </div>
    </header>
  );
};
