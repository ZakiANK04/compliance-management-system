import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Shield, 
  TrendingUp, 
  Filter,
  ChevronRight,
  Calendar,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const RiskAssessment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const riskTrends = [
    { month: 'Jan', critical: 2, high: 8, medium: 15, low: 25 },
    { month: 'Feb', critical: 1, high: 6, medium: 18, low: 28 },
    { month: 'Mar', critical: 3, high: 9, medium: 12, low: 30 },
    { month: 'Apr', critical: 1, high: 7, medium: 14, low: 32 },
    { month: 'May', critical: 2, high: 5, medium: 16, low: 35 },
    { month: 'Jun', critical: 1, high: 4, medium: 12, low: 38 },
  ];

  const risksByCategory = [
    { category: 'Cybersécurité', count: 15, critical: 1, high: 3, medium: 6, low: 5 },
    { category: 'Opérationnel', count: 12, critical: 0, high: 2, medium: 4, low: 6 },
    { category: 'Financier', count: 8, critical: 0, high: 1, medium: 3, low: 4 },
    { category: 'Conformité', count: 10, critical: 0, high: 2, medium: 5, low: 3 },
    { category: 'Stratégique', count: 6, critical: 0, high: 1, medium: 2, low: 3 },
  ];

  const risks = [
    {
      id: 1,
      title: 'Inadequate Data Encryption',
      category: 'Cybersecurity',
      severity: 'High',
      probability: 'Medium',
      impact: 'High',
      riskScore: 8.5,
      owner: 'Security Team',
      dueDate: '2024-02-15',
      status: 'In Progress',
      description: 'Customer data stored without proper encryption protocols',
      mitigationActions: [
        'Implement AES-256 encryption for data at rest',
        'Deploy TLS 1.3 for data in transit',
        'Conduct encryption audit'
      ]
    },
    {
      id: 2,
      title: 'Third-Party Vendor Access',
      category: 'Operational',
      severity: 'Medium',
      probability: 'High',
      impact: 'Medium',
      riskScore: 6.2,
      owner: 'Procurement Team',
      dueDate: '2024-03-01',
      status: 'Open',
      description: 'Inadequate controls over third-party vendor system access',
      mitigationActions: [
        'Implement vendor access management system',
        'Establish regular access reviews',
        'Create vendor security agreements'
      ]
    },
    {
      id: 3,
      title: 'Regulatory Compliance Gap',
      category: 'Compliance',
      severity: 'High',
      probability: 'Medium',
      impact: 'High',
      riskScore: 7.8,
      owner: 'Compliance Team',
      dueDate: '2024-01-30',
      status: 'Overdue',
      description: 'Non-compliance with new GDPR requirements for data processing',
      mitigationActions: [
        'Update privacy policies',
        'Implement consent management',
        'Train staff on new requirements'
      ]
    },
    {
      id: 4,
      title: 'System Backup Failure',
      category: 'Operational',
      severity: 'Critical',
      probability: 'Low',
      impact: 'Critical',
      riskScore: 9.1,
      owner: 'IT Operations',
      dueDate: '2024-02-10',
      status: 'In Progress',
      description: 'Primary backup system showing signs of failure',
      mitigationActions: [
        'Implement redundant backup systems',
        'Test backup recovery procedures',
        'Establish offsite backup storage'
      ]
    }
  ];

  const categories = ['all', 'Cybersecurity', 'Operational', 'Financial', 'Compliance', 'Strategic'];
  const severities = ['all', 'Critical', 'High', 'Medium', 'Low'];

  const filteredRisks = risks.filter(risk => {
    const matchesCategory = selectedCategory === 'all' || risk.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || risk.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Open':
        return 'bg-gray-100 text-gray-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600 mt-1">Identify, assess, and monitor organizational risks</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Risk Assessment</span>
        </button>
      </div>

      {/* Risk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">51</div>
              <div className="text-sm text-gray-600">Total Risks</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">Critical Risks</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">High Risks</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Mitigation Rate</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={riskTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="critical" stroke="#dc2626" strokeWidth={2} />
              <Line type="monotone" dataKey="high" stroke="#ea580c" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#ca8a04" strokeWidth={2} />
              <Line type="monotone" dataKey="low" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risks by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risks by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={risksByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {severities.map(severity => (
              <option key={severity} value={severity}>
                {severity === 'all' ? 'All Severities' : severity}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div key={risk.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{risk.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{risk.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <div className="font-medium">{risk.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Risk Score:</span>
                    <div className="font-medium text-red-600">{risk.riskScore}/10</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Owner:</span>
                    <div className="font-medium">{risk.owner}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <div className="font-medium">{risk.dueDate}</div>
                  </div>
                </div>
              </div>
              
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 mb-1 block">Mitigation Actions:</span>
                  <div className="text-sm text-gray-700">
                    {risk.mitigationActions.length} actions planned
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    View Details
                  </button>
                  <button className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};