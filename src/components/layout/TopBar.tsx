import React, { useState } from 'react';
import { Search, Bell, Sparkles, Check, Info, Menu, ChevronRight } from 'lucide-react';
import { NavItemKey } from './Sidebar';
import { User } from '../../types';

interface TopBarProps {
  currentTab: NavItemKey;
  currentUser: User;
  onStartDemo: () => void;
  onSelectTab?: (tab: NavItemKey) => void;
  onOpenMobileNav?: () => void;
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  currentUser,
  onStartDemo,
  onSelectTab,
  onOpenMobileNav
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumb = (tab: NavItemKey) => {
    switch (tab) {
      case 'overview': return { title: 'Research Overview & KPI Dashboard', parent: 'Platform' };
      case 'patients': return { title: 'Synthetic Cohort & Patient Cases', parent: 'Clinical' };
      case 'datasets': return { title: 'Dataset Registry & Preprocessing', parent: 'Data Layer' };
      case 'models': return { title: 'Model Laboratory (Classical & QML)', parent: 'ML/QML' };
      case 'qml-lab': return { title: '3D QML Lab & Variational Circuit Studio', parent: 'Quantum' };
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

  // Key workflow steps for fast one-click progression
  const workflowSteps: { key: NavItemKey; label: string; stepNum: string }[] = [
    { key: 'patients', label: 'Cohort', stepNum: '1' },
    { key: 'models', label: 'Models', stepNum: '2' },
    { key: 'qml-lab', label: 'QML Lab', stepNum: '3' },
    { key: 'quantum-exec', label: 'Execution', stepNum: '4' },
    { key: 'results', label: 'Decisions', stepNum: '5' }
  ];

  return (
    <header className="h-14 glass-topbar px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-20 sticky top-0">
      {/* Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenMobileNav}
          className="p-1.5 -ml-1 text-stone-600 hover:text-stone-900 rounded-lg md:hidden hover:bg-stone-100/60"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="md:hidden flex items-center shrink-0">
          <img src="/logo.png" alt="QuantumML" className="w-6 h-6 object-contain drop-shadow-xs" />
        </div>

        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="text-stone-500 font-medium hidden sm:inline">{breadcrumb.parent}</span>
          <span className="text-amber-400 hidden sm:inline">/</span>
          <span className="text-stone-900 font-bold truncate text-xs sm:text-sm">{breadcrumb.title}</span>
        </div>
      </div>

      {/* Center: Interactive Clinical-Quantum Workflow Stepper (visible on md+) */}
      {onSelectTab && (
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-white/70 backdrop-blur-md rounded-full border border-amber-200/50 shadow-2xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 mr-1.5">
            Pipeline:
          </span>
          {workflowSteps.map((step, idx) => {
            const isActive = currentTab === step.key;
            return (
              <React.Fragment key={step.key}>
                <button
                  onClick={() => onSelectTab(step.key)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/80'
                  }`}
                  title={`Jump to ${step.label} stage`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-mono ${
                    isActive ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {step.stepNum}
                  </span>
                  <span>{step.label}</span>
                </button>
                {idx < workflowSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-stone-300" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Prototype Environment Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/35 rounded-full text-[11px] font-mono font-semibold text-amber-950 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
          <span>Prototype Environment</span>
        </div>

        {/* Global Search Box */}
        <div className="relative hidden xl:block">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets, circuits..."
            className="w-48 pl-8 pr-3 py-1 bg-white/75 border border-amber-200/60 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all backdrop-blur-xs"
          />
        </div>

        {/* Guided Demo Button */}
        <button
          onClick={onStartDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span className="hidden sm:inline">Guided Tour</span>
          <span className="sm:hidden">Tour</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-white/60 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 absolute top-1 right-1"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-modal rounded-xl p-3 z-50 text-xs shadow-xl border border-amber-200/60">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/40 font-semibold text-stone-900">
                <span>Recent System Events</span>
                <span className="text-[10px] text-amber-700 cursor-pointer hover:underline">Mark read</span>
              </div>
              <div className="space-y-2 text-stone-600">
                <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-200/60 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900">Aer Circuit Simulated</p>
                    <p className="text-[11px] text-stone-600">Cardio-VQC-Ansatz (2048 shots) completed in 142ms</p>
                  </div>
                </div>
                <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900">Test Cohort Sealed</p>
                    <p className="text-[11px] text-stone-600">Evaluation EVAL-2026-089 SHA-256 verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-amber-200/50">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full border border-amber-300 object-cover shadow-2xs"
          />
        </div>
      </div>
    </header>
  );
};

