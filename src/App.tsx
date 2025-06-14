import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PolicyManagement } from './components/PolicyManagement';
import { RiskAssessment } from './components/RiskAssessment';
import { ComplianceStatus } from './components/ComplianceStatus';
import { GapAnalysis } from './components/GapAnalysis';
import { AIAssistant } from './components/AIAssistant';
import { Reports } from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'policies':
        return <PolicyManagement />;
      case 'risk':
        return <RiskAssessment />;
      case 'compliance':
        return <ComplianceStatus />;
      case 'gap-analysis':
        return <GapAnalysis />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;