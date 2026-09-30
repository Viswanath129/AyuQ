import React, { useState } from 'react';
import { Search, Bell, Sparkles, Check, Info, Menu } from 'lucide-react';
import { NavItemKey } from './Sidebar';
import { User } from '../../types';

interface TopBarProps {
  currentTab: NavItemKey;
  currentUser: User;
  onStartDemo: () => void;
  onOpenMobileNav?: () => void;
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  currentUser,
  onStartDemo,
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

  return (
    <header className="h-14 glass-nav border-b border-amber-200/40 px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-20 sticky top-0">
      {/* Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenMobileNav}
          className="p-1.5 -ml-1 text-stone-600 hover:text-stone-900 rounded-lg md:hidden hover:bg-amber-100/50"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="text-amber-900/60 font-medium hidden sm:inline">{breadcrumb.parent}</span>
          <span className="text-amber-400 hidden sm:inline">/</span>
          <span className="text-stone-900 font-bold truncate text-xs sm:text-sm">{breadcrumb.title}</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Prototype Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/70 border border-amber-300/60 rounded-full text-[11px] font-mono font-medium text-amber-950">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
          <span>Prototype Mode</span>
        </div>

        {/* Global Search Box */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets, models, cases..."
            className="w-48 pl-8 pr-3 py-1 bg-white/80 border border-amber-300/40 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

        {/* Guided Demo Button */}
        <button
          onClick={onStartDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Demo Tour</span>
          <span className="sm:hidden">Tour</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-amber-100/50 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 absolute top-1 right-1"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl p-3 z-50 text-xs shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/40 font-semibold text-stone-900">
                <span>Recent System Events</span>
                <span className="text-[10px] text-amber-700 cursor-pointer">Mark read</span>
              </div>
              <div className="space-y-2 text-stone-600">
                <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-200/50 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-800">Quantum Aer Circuit Simulated</p>
                    <p className="text-[11px] text-stone-500">Cardio-VQC-Ansatz (2048 shots) completed in 142ms</p>
                  </div>
                </div>
                <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-200/50 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-800">Test Cohort Sealed</p>
                    <p className="text-[11px] text-stone-500">Evaluation EVAL-2026-089 SHA-256 verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-amber-200/40">
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
