import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { ComingSoonBadge } from './ComingSoonBadge';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="bg-white shadow-satim border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-satim-light transition-colors"
          >
            <Menu className="h-5 w-5 text-satim-primary" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-satim-primary" />
            <input
              type="text"
              placeholder="Search policies, risks, compliance items..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">System Online</span>
          </div>
          
          <button className="relative p-2 rounded-lg hover:bg-satim-light transition-colors group">
            <Bell className="h-5 w-5 text-satim-primary" />
            <span className="absolute -top-1 -right-1 bg-satim-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ComingSoonBadge />
            </div>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Karim lgang</div>
              <div className="text-xs text-gray-500">Compliance Manager</div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-satim-primary to-satim-secondary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};