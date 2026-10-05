import React from 'react';
import { WorkforceProvider, useWorkforce } from './context/WorkforceContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RootCauseModal } from './components/RootCauseModal';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { Toast } from './components/Toast';

// Modules
import { Overview } from './modules/Overview';
import { WorkforceAnalytics } from './modules/WorkforceAnalytics';
import { WorkloadPlanner } from './modules/WorkloadPlanner';
import { TeamsDetail } from './modules/TeamsDetail';
import { ProjectsView } from './modules/ProjectsView';
import { AiInsights } from './modules/AiInsights';
import { Recommendations } from './modules/Recommendations';
import { SimulationLab } from './modules/SimulationLab';
import { Reports } from './modules/Reports';
import { Settings } from './modules/Settings';
import { EmployeeProfile360 } from './modules/EmployeeProfile360';

const MainContent: React.FC = () => {
  const { activeTab, selectedEmployeeId, closeEmployeeProfile } = useWorkforce();

  const renderModule = () => {
    if (selectedEmployeeId) {
      return (
        <EmployeeProfile360
          employeeId={selectedEmployeeId}
          onBack={closeEmployeeProfile}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'workforce':
        return <WorkforceAnalytics />;
      case 'workload':
        return <WorkloadPlanner />;
      case 'teams':
        return <TeamsDetail />;
      case 'projects':
        return <ProjectsView />;
      case 'insights':
        return <AiInsights />;
      case 'recommendations':
        return <Recommendations />;
      case 'simulations':
        return <SimulationLab />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100/70 overflow-hidden font-sans text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* 1. Left Enterprise Navigation */}
      <Sidebar />

      {/* 2. Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <RootCauseModal />
      <ExplainabilityModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <WorkforceProvider>
      <MainContent />
    </WorkforceProvider>
  );
}

export default App;
