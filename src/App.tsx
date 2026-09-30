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
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        onStartDemo={() => setIsDemoOpen(true)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Navigation */}
        <TopBar
          currentTab={currentTab}
          currentUser={currentUser}
          onStartDemo={() => setIsDemoOpen(true)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/70">
          <div className="max-w-7xl mx-auto pb-12">
            {renderActiveWorkspace()}
          </div>
        </main>
      </div>

      {/* Interactive 11-Step Guided Demo Modal */}
      <GuidedDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onJumpToTab={(tab) => setCurrentTab(tab)}
      />
    </div>
  );
}

export default App;
