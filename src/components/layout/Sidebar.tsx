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
  Sparkles
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onRoleChange,
  onStartDemo
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'patients', label: 'Patients / Cases', icon: Users, badge: 'Synthetic' },
    { key: 'datasets', label: 'Dataset', icon: Database },
    { key: 'models', label: 'Models', icon: Layers },
    { key: 'qml-lab', label: 'QML Lab', icon: Atom },
    { key: 'quantum-exec', label: 'Quantum Execution', icon: Cpu },
    { key: 'evaluation', label: 'Evaluation', icon: CheckSquare, badge: 'Locked CV' },
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight tracking-tight">QuantumML</h1>
            <p className="text-[11px] text-slate-500 font-medium">Healthcare Decision Platform</p>
          </div>
        </div>
      </div>

      {/* Guided Walkthrough Callout Button */}
      <div className="p-3">
        <button
          onClick={onStartDemo}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-200/80 transition-all shadow-2xs group"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
          <span>Launch Guided Demo Tour</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
          Workspace Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-indigo-200/60 text-indigo-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile & Role Bar */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 truncate">{currentUser.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-500 truncate">{currentUser.role}</span>
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <div className="pt-1">
          <label className="text-[10px] text-slate-400 block mb-1">Active Prototype Role:</label>
          <select
            value={currentUser.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full text-[11px] font-medium py-1 px-2 bg-white border border-slate-200 rounded text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Prototype Simulator
          </span>
          <span className="font-mono text-slate-400">v0.9.4-alpha</span>
        </div>
      </div>
    </aside>
  );
};
