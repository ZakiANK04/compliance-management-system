import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  FileCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

export const ComplianceStatus: React.FC = () => {
  const frameworkData = [
    { name: 'ISO 27001', score: 92, color: '#10b981' },
    { name: 'ISO 9001', score: 88, color: '#3b82f6' },
    { name: 'RGPD', score: 95, color: '#8b5cf6' },
    { name: 'ISO 14001', score: 89, color: '#f59e0b' },
    { name: 'ISO 45001', score: 87, color: '#ef4444' },
  ];

  const complianceTrends = [
    { month: 'Jan', overall: 85, iso27001: 88, iso9001: 82, rgpd: 90 },
    { month: 'Feb', overall: 87, iso27001: 90, iso9001: 84, rgpd: 92 },
    { month: 'Mar', overall: 90, iso27001: 91, iso9001: 86, rgpd: 93 },
    { month: 'Apr', overall: 89, iso27001: 90, iso9001: 85, rgpd: 94 },
    { month: 'May', overall: 91, iso27001: 92, iso9001: 87, rgpd: 95 },
    { month: 'Jun', overall: 92, iso27001: 92, iso9001: 88, rgpd: 95 },
  ];

  const auditStatus = [
    {
      framework: 'ISO 27001',
      nextAudit: '2024-03-15',
      status: 'Scheduled',
      type: 'Annual Surveillance',
      auditor: 'AFNOR Certification',
      daysUntil: 45
    },
    {
      framework: 'ISO 9001',
      nextAudit: '2024-06-20',
      status: 'In Planning',
      type: 'Annual Review',
      auditor: 'Bureau Veritas',
      daysUntil: 142
    },
    {
      framework: 'RGPD',
      nextAudit: '2024-02-10',
      status: 'Scheduled',
      type: 'Internal Assessment',
      auditor: 'CNIL',
      daysUntil: 21
    }
  ];

  const complianceItems = [
    {
      id: 1,
      title: 'Quarterly Access Review',
      framework: 'ISO 27001',
      dueDate: '2024-01-31',
      status: 'Complete',
      progress: 100,
      owner: 'Security Team'
    },
    {
      id: 2,
      title: 'Data Retention Policy Update',
      framework: 'RGPD',
      dueDate: '2024-02-15',
      status: 'In Progress',
      progress: 75,
      owner: 'Legal Team'
    },
    {
      id: 3,
      title: 'Vendor Security Assessment',
      framework: 'ISO 9001',
      dueDate: '2024-02-28',
      status: 'Not Started',
      progress: 0,
      owner: 'Procurement'
    },
    {
      id: 4,
      title: 'Incident Response Testing',
      framework: 'ISO 27001',
      dueDate: '2024-01-20',
      status: 'Overdue',
      progress: 45,
      owner: 'IT Operations'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'text-green-600 bg-green-50';
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Not Started':
        return 'text-gray-600 bg-gray-50';
      case 'Overdue':
        return 'text-red-600 bg-red-50';
      case 'Scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'In Planning':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complete':
        return <CheckCircle className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      case 'Overdue':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Status</h1>
          <p className="text-gray-600 mt-1">Monitor compliance levels across all frameworks and regulations</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Schedule Audit
          </button>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Overall Compliance Score</h2>
            <p className="text-gray-600">Weighted average across all frameworks</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">94%</div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.3% from last month
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '94%' }} />
        </div>
      </div>

      {/* Framework Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Compliance Scores</h3>
          <div className="space-y-4">
            {frameworkData.map((framework, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: framework.color }} />
                  <span className="font-medium text-gray-900">{framework.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${framework.score}%`,
                        backgroundColor: framework.color
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 w-10">{framework.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="overall" fill="#3b82f6" name="Overall" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Audits */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Audits</h3>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {auditStatus.map((audit, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">{audit.framework}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                  {audit.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{audit.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auditor:</span>
                  <span className="font-medium">{audit.auditor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{audit.nextAudit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Until:</span>
                  <span className="font-medium text-blue-600">{audit.daysUntil} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Items */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Active Compliance Items</h3>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {item.framework}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span>Due Date: </span>
                      <span className="font-medium">{item.dueDate}</span>
                    </div>
                    <div>
                      <span>Owner: </span>
                      <span className="font-medium">{item.owner}</span>
                    </div>
                    <div>
                      <span>Progress: </span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  <span>{item.status}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.progress === 100 ? 'bg-green-500' :
                    item.progress > 50 ? 'bg-blue-500' :
                    item.progress > 0 ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};