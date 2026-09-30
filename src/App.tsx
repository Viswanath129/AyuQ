import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { OverviewDashboard } from './features/overview/OverviewDashboard';
import { PatientsWorkspace } from './features/patients/PatientsWorkspace';
import { DatasetManagement } from './features/datasets/DatasetManagement';
import { ModelLaboratory } from './features/models/ModelLaboratory';
import { QuantumLabWorkspace } from './features/quantum-lab/QuantumLabWorkspace';
import { QuantumExecutionWorkspace } from './features/quantum-exec/QuantumExecutionWorkspace';
import { EvaluationWorkspace } from './features/evaluation/EvaluationWorkspace';
import { ResultsWorkspace } from './features/results/ResultsWorkspace';
import { ReportsWorkspace } from './features/reports/ReportsWorkspace';
import { GovernanceWorkspace } from './features/governance/GovernanceWorkspace';
import { InfrastructureWorkspace } from './features/infrastructure/InfrastructureWorkspace';
import { BackendArchitectureView } from './features/architecture/BackendArchitectureView';
import { SettingsWorkspace } from './features/settings/SettingsWorkspace';
import { GuidedDemoModal } from './features/demo/GuidedDemoModal';
import { MOCK_USERS } from './services/mockData';
import { User, UserRole } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    const userForRole = MOCK_USERS.find(u => u.role === newRole);
    if (userForRole) {
      setCurrentUser(userForRole);
    } else {
      setCurrentUser(prev => ({
        ...prev,
        role: newRole
      }));
    }
  };

  const renderActiveWorkspace = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewDashboard onNavigate={setCurrentTab} onStartDemo={() => setIsDemoOpen(true)} />;
      case 'patients':
        return <PatientsWorkspace />;
      case 'datasets':
        return <DatasetManagement />;
      case 'models':
        return <ModelLaboratory />;
      case 'qml-lab':
        return <QuantumLabWorkspace />;
      case 'quantum-exec':
        return <QuantumExecutionWorkspace />;
      case 'evaluation':
        return <EvaluationWorkspace />;
      case 'results':
        return <ResultsWorkspace />;
      case 'reports':
        return <ReportsWorkspace />;
      case 'governance':
        return <GovernanceWorkspace />;
      case 'infrastructure':
        return <InfrastructureWorkspace />;
      case 'architecture':
        return <BackendArchitectureView />;
      case 'settings':
        return <SettingsWorkspace />;
      default:
        return <OverviewDashboard onNavigate={setCurrentTab} onStartDemo={() => setIsDemoOpen(true)} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans text-stone-900 antialiased overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      {/* 1. Golden Hour Ambient Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-30 pointer-events-none brightness-[0.98] contrast-[1.02]"
      >
        <source src="/golden-hour.mp4" type="video/mp4" />
      </video>

      {/* 2. Warm Liquid Glass Frosted Scrim Overlay (Ensures WCAG 4.5:1+ contrast) */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/75 via-amber-50/55 to-orange-50/65 backdrop-blur-[4px] -z-20 pointer-events-none"></div>

      {/* 3. Subtle Warm Golden Ambient Radial Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-400/15 via-orange-400/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Main Layout Container */}
      <div className="flex h-screen w-full overflow-hidden">
        {/* Persistent Desktop Sidebar & Mobile Slide-over Drawer */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentUser={currentUser}
          onRoleChange={handleRoleChange}
          onStartDemo={() => setIsDemoOpen(true)}
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Main Workspace Frame */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Top Bar with Mobile Hamburger Toggle */}
          <TopBar
            currentTab={currentTab}
            currentUser={currentUser}
            onStartDemo={() => setIsDemoOpen(true)}
            onOpenMobileNav={() => setIsMobileNavOpen(true)}
          />

          {/* Scrollable Page Body */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6">
            <div className="max-w-7xl mx-auto pb-16">
              {renderActiveWorkspace()}
            </div>
          </main>
        </div>
      </div>

      {/* Interactive 11-Step Guided Demo Modal */}
      <GuidedDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onJumpToTab={(tab) => {
          setCurrentTab(tab);
          setIsMobileNavOpen(false);
        }}
      />
    </div>
  );
}

export default App;
