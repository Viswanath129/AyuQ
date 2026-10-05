import React, { useState, useRef, useEffect } from 'react';
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
import { ClickSpark, TargetCursor, GradualBlur } from './components/react-bits';
import { AtomLoader } from './components/common/AtomLoader';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialProgress, setInitialProgress] = useState(25);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth dynamic boot progression
  useEffect(() => {
    const t1 = setTimeout(() => setInitialProgress(60), 220);
    const t2 = setTimeout(() => setInitialProgress(90), 500);
    const t3 = setTimeout(() => setInitialProgress(100), 800);
    const t4 = setTimeout(() => setIsInitialLoading(false), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Guarantee browser autoplay by programmatically ensuring muted & calling play()
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video auto-playback was restricted by browser:', err);
        });
      }
    }
  }, []);

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
    <div className="relative min-h-screen w-full font-sans text-slate-900 antialiased overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* LAYER 0: Atmospheric Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover -z-30 pointer-events-none brightness-105 contrast-[1.02]"
      >
        <source src="/golden-hour.mp4" type="video/mp4" />
      </video>

      {/* LAYER 1: Subtle Readability Veil & Scientific Micro-Grid */}
      <div className="fixed inset-0 glass-readability-veil -z-20 pointer-events-none" />
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.12] -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Initial Boot Loading Screen with AtomLoader */}
      {isInitialLoading && (
        <AtomLoader 
          fullscreen={true}
          size={145} 
          text="Clinical Quantum Decision Studio"
          subtext="Initializing Qiskit Aer & VQC variational circuits..."
          progress={initialProgress}
          speed={1.3}
        />
      )}

      {/* Main Layout Container with ClickSpark Interaction */}
      <ClickSpark sparkColor="#f59e0b" sparkSize={12} sparkRadius={22} sparkCount={7} duration={450}>
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
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
            {/* Top Bar with Mobile Hamburger Toggle & Workflow Stepper */}
            <TopBar
              currentTab={currentTab}
              currentUser={currentUser}
              onSelectTab={setCurrentTab}
              onStartDemo={() => setIsDemoOpen(true)}
              onOpenMobileNav={() => setIsMobileNavOpen(true)}
            />

            {/* Scrollable Page Body with Subtle Edge Feathering */}
            <div className="relative flex-1 min-h-0 overflow-hidden">
              <GradualBlur preset="top" height="1.75rem" strength={1.2} zIndex={30} />
              <main className="h-full overflow-y-auto p-3 sm:p-6">
                <div className="max-w-7xl mx-auto pb-16">
                  {renderActiveWorkspace()}
                </div>
              </main>
              <GradualBlur preset="bottom" height="2rem" strength={1.2} zIndex={30} />
            </div>
          </div>
        </div>
      </ClickSpark>

      {/* Interactive 11-Step Guided Demo Modal */}
      <GuidedDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onJumpToTab={(tab) => {
          setCurrentTab(tab);
          setIsMobileNavOpen(false);
        }}
      />

      {/* High-Precision TargetCursor: Normal pointer when idle, corner lock-on on button/box hover */}
      <TargetCursor
        targetSelector="button, .glass-card, .scientific-card, [role='button'], a, input, select"
        cursorColor="#f59e0b"
        cursorColorOnTarget="#d97706"
        hideDefaultCursor={false}
        hoverDuration={0.22}
        parallaxOn={true}
      />
    </div>
  );
}

export default App;
