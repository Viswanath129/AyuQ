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
  const navSections = [
    {
      title: 'Clinical Research',
      items: [
        { key: 'overview' as NavItemKey, label: 'Overview', icon: LayoutDashboard },
        { key: 'patients' as NavItemKey, label: 'Patients / Cohort', icon: Users, badge: 'Synthetic' },
        { key: 'datasets' as NavItemKey, label: 'Datasets & EHR', icon: Database },
        { key: 'results' as NavItemKey, label: 'Decision Support', icon: Activity, badge: 'Live' },
        { key: 'reports' as NavItemKey, label: 'Reports & Audits', icon: FileText }
      ]
    },
    {
      title: 'Quantum & ML Studio',
      items: [
        { key: 'models' as NavItemKey, label: 'Model Laboratory', icon: Layers },
        { key: 'qml-lab' as NavItemKey, label: 'QML Circuit Studio', icon: Atom, badge: '3D' },
        { key: 'quantum-exec' as NavItemKey, label: 'Hardware Execution', icon: Cpu },
        { key: 'evaluation' as NavItemKey, label: 'Locked Evaluation', icon: CheckSquare, badge: 'Vault' }
      ]
    },
    {
      title: 'Governance & Systems',
      items: [
        { key: 'governance' as NavItemKey, label: 'Security & HIPAA', icon: Shield },
        { key: 'infrastructure' as NavItemKey, label: 'Infrastructure', icon: Server },
        { key: 'architecture' as NavItemKey, label: 'Backend Contracts', icon: Code2, badge: 'Specs' },
        { key: 'settings' as NavItemKey, label: 'Settings', icon: Settings }
      ]
    }
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
          className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container: Warm Champagne Glass */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:static w-72 glass-sidebar flex flex-col h-screen shrink-0 select-none transition-transform duration-300 ease-in-out ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-amber-200/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white/90 border border-amber-300/60 p-1 flex items-center justify-center shadow-xs backdrop-blur-xs overflow-hidden group">
              <img 
                src="/logo.png" 
                alt="QuantumML Logo" 
                className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-indigo-500/10 pointer-events-none rounded-xl" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-stone-900 leading-tight tracking-tight flex items-center gap-1.5">
                <span>AyuQ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Online"></span>
              </h1>
              <p className="text-[10px] text-amber-700 font-mono tracking-wider uppercase font-semibold">
                Quantum ML Research OS
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-stone-400 hover:text-stone-700 md:hidden rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Guided Walkthrough Tour Button */}
        <div className="p-3 pb-2">
          <button
            onClick={() => {
              onStartDemo();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-700 hover:from-amber-700 hover:to-indigo-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all duration-200 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:scale-110 transition-transform" />
            <span>Guided Prototype Tour</span>
          </button>
        </div>

        {/* Sectioned Navigation List with Superior UX */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest px-3 mb-1">
                {section.title}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      onSelectTab(item.key);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full min-h-[38px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-stone-950 font-bold border border-amber-400/40 shadow-2xs backdrop-blur-xs'
                        : 'text-stone-700 hover:bg-white/60 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-amber-500/25 text-amber-950 font-semibold' : 'bg-stone-100/80 text-stone-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Profile & Role Bar */}
        <div className="p-3 border-t border-amber-200/30 bg-white/40 backdrop-blur-md space-y-2">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-amber-300/80 object-cover shadow-2xs"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-stone-900 truncate">{currentUser.name}</p>
              <span className="text-[10px] text-amber-700 font-mono truncate">{currentUser.role}</span>
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <select
              value={currentUser.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="w-full text-[11px] font-medium py-1.5 px-2 bg-white/85 border border-amber-200/80 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-amber-200/20">
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
