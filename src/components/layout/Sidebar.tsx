import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  Layers, 
  Atom, 
  Cpu, 
  CheckSquare, 
  Activity, 
  FileText, 
  Shield, 
  Server, 
  Settings,
  Code2,
  Sparkles,
  X
} from 'lucide-react';
import { User, UserRole } from '../../types';

export type NavItemKey = 
  | 'overview' 
  | 'patients' 
  | 'datasets' 
  | 'models' 
  | 'qml-lab' 
  | 'quantum-exec' 
  | 'evaluation' 
  | 'results' 
  | 'reports' 
  | 'governance' 
  | 'infrastructure' 
  | 'architecture' 
  | 'settings';

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  currentUser: User;
  onRoleChange: (newRole: UserRole) => void;
  onStartDemo: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onRoleChange,
  onStartDemo,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'patients', label: 'Patients / Cases', icon: Users, badge: 'Synthetic' },
    { key: 'datasets', label: 'Dataset', icon: Database },
    { key: 'models', label: 'Models', icon: Layers },
    { key: 'qml-lab', label: 'QML Lab', icon: Atom },
    { key: 'quantum-exec', label: 'Quantum Execution', icon: Cpu },
    { key: 'evaluation', label: 'Evaluation', icon: CheckSquare, badge: 'Locked' },
    { key: 'results', label: 'Results & Decision', icon: Activity },
    { key: 'reports', label: 'Reports', icon: FileText },
    { key: 'governance', label: 'Security & Governance', icon: Shield },
    { key: 'infrastructure', label: 'Infrastructure', icon: Server },
    { key: 'architecture', label: 'Backend Design & APIs', icon: Code2, badge: 'Specs' },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  const roles: UserRole[] = [
    'Patient',
    'Clinician',
    'Researcher',
    'ML Engineer',
    'Quantum Researcher',
    'Administrator'
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:static w-72 glass-nav border-r border-amber-200/50 flex flex-col h-screen shrink-0 select-none transition-transform duration-300 ease-in-out ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-amber-200/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xs">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-stone-900 leading-tight tracking-tight font-serif-title">
                QuantumML
              </h1>
              <p className="text-[10px] text-amber-800/80 font-mono tracking-wider uppercase">
                Clinical Research OS
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-stone-400 hover:text-stone-700 md:hidden rounded-lg hover:bg-amber-100/50"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Guided Walkthrough Callout Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onStartDemo();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all duration-200 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100 group-hover:scale-110 transition-transform" />
            <span>Launch Guided Demo Tour</span>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
          <div className="text-[9px] font-mono font-bold text-amber-900/60 uppercase tracking-widest px-3 mb-1.5">
            Core Layers
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onSelectTab(item.key);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full min-h-[40px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-950 font-bold border border-amber-400/40 shadow-2xs'
                    : 'text-stone-700 hover:bg-amber-100/40 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-amber-500/25 text-amber-950 font-semibold' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile & Role Bar */}
        <div className="p-3 border-t border-amber-200/40 bg-white/50 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-amber-300/60 object-cover shadow-2xs"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-stone-900 truncate">{currentUser.name}</p>
              <span className="text-[10px] text-amber-800/80 font-mono truncate">{currentUser.role}</span>
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <select
              value={currentUser.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="w-full text-[11px] font-medium py-1.5 px-2 bg-white/90 border border-amber-300/50 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-amber-200/30">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Quantum Aer Active
            </span>
            <span className="font-mono text-stone-400">SIH 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
};
