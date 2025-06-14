import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Bot, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'policies', label: 'Policy Management', icon: FileText },
    { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
    { id: 'compliance', label: 'Compliance Status', icon: CheckCircle },
    { id: 'gap-analysis', label: 'Gap Analysis', icon: TrendingUp },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white shadow-satim z-30 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-satim-primary to-satim-secondary rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-satim-primary">SATIM GRC</span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg hover:bg-satim-light transition-colors"
            >
              {isOpen ? <X className="h-5 w-5 text-satim-primary" /> : <Menu className="h-5 w-5 text-satim-primary" />}
            </button>
          </div>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-satim-light text-satim-primary border-r-2 border-satim-primary'
                    : 'text-gray-600 hover:bg-satim-light hover:text-satim-primary'
                }`}
              >
                <Icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
        
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-satim-primary to-satim-secondary rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <p className="text-sm text-satim-light mb-3">
                Get instant compliance guidance and risk insights
              </p>
              <button 
                onClick={() => setActiveTab('ai-assistant')}
                className="bg-white text-satim-primary px-3 py-1 rounded-md text-sm font-medium hover:bg-satim-light transition-colors"
              >
                Ask AI
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};