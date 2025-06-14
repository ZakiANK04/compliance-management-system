import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Shield,
  BarChart3,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const Dashboard: React.FC = () => {
  const complianceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 87 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 89 },
    { month: 'May', score: 94 },
    { month: 'Jun', score: 96 },
  ];

  const riskDistribution = [
    { name: 'Low', value: 45, color: '#10b981' },
    { name: 'Medium', value: 30, color: '#f59e0b' },
    { name: 'High', value: 20, color: '#ef4444' },
    { name: 'Critical', value: 5, color: '#dc2626' },
  ];

  const frameworkStatus = [
    { framework: 'ISO 27001', compliance: 94 },
    { framework: 'SOC 2', compliance: 88 },
    { framework: 'GDPR', compliance: 96 },
    { framework: 'HIPAA', compliance: 91 },
  ];

  const stats = [
    {
      title: 'Overall Compliance Score',
      value: '94%',
      change: '+2.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Active Policies',
      value: '147',
      change: '+12',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Open Risk Items',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Upcoming Audits',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-satim-primary">GRC Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your organization's governance, risk, and compliance status</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary">
            Generate Report
          </button>
          <button className="btn-secondary">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: 'bg-green-50 text-green-600',
            blue: 'bg-blue-50 text-blue-600',
            orange: 'bg-orange-50 text-orange-600',
            purple: 'bg-purple-50 text-purple-600'
          };

          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-satim-accent'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold text-satim-primary">Compliance Trend</h3>
              <p className="text-sm text-gray-600">Monthly compliance score progression</p>
            </div>
            <BarChart3 className="h-5 w-5 text-satim-primary" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#C41E3A" 
                fill="url(#gradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C41E3A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#C41E3A" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold text-satim-primary">Risk Distribution</h3>
              <p className="text-sm text-gray-600">Current risk levels across organization</p>
            </div>
            <Shield className="h-5 w-5 text-satim-primary" />
          </div>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={160}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Framework Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-semibold text-satim-primary">Compliance Framework Status</h3>
            <p className="text-sm text-gray-600">Current compliance levels by framework</p>
          </div>
          <Activity className="h-5 w-5 text-satim-primary" />
        </div>
        <div className="space-y-4">
          {frameworkStatus.map((framework, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{framework.framework}</span>
                  <span className="text-sm font-medium text-gray-600">{framework.compliance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-satim-primary to-satim-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${framework.compliance}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-satim-primary mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            { action: 'Policy Updated', item: 'Data Privacy Policy v2.1', time: '2 hours ago', type: 'update' },
            { action: 'Risk Assessment', item: 'Cloud Infrastructure Security', time: '4 hours ago', type: 'assessment' },
            { action: 'Compliance Check', item: 'GDPR Article 32 Implementation', time: '6 hours ago', type: 'check' },
            { action: 'Audit Scheduled', item: 'SOC 2 Type II Audit', time: '1 day ago', type: 'audit' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-satim-light rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'update' ? 'bg-blue-50 text-blue-600' :
                  activity.type === 'assessment' ? 'bg-orange-50 text-orange-600' :
                  activity.type === 'check' ? 'bg-green-50 text-green-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {activity.type === 'update' ? <FileText className="h-4 w-4" /> :
                   activity.type === 'assessment' ? <AlertTriangle className="h-4 w-4" /> :
                   activity.type === 'check' ? <CheckCircle className="h-4 w-4" /> :
                   <Clock className="h-4 w-4" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.item}</div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};