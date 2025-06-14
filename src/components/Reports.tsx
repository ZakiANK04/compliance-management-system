import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter,
  FileText,
  TrendingUp,
  PieChart,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';
import { ComingSoonBadge } from './ComingSoonBadge';

export const Reports: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-30-days');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportTemplates = [
    {
      id: 1,
      title: 'Executive Dashboard',
      description: 'High-level overview of compliance status and key metrics',
      icon: BarChart3,
      category: 'Executive',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'Risk Assessment Report',
      description: 'Detailed analysis of organizational risks and mitigation strategies',
      icon: TrendingUp,
      category: 'Risk Management',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-10',
      size: '4.7 MB'
    },
    {
      id: 3,
      title: 'Compliance Status Report',
      description: 'Framework-specific compliance levels and gap analysis',
      icon: CheckCircle,
      category: 'Compliance',
      frequency: 'Monthly',
      lastGenerated: '2024-01-12',
      size: '3.1 MB'
    },
    {
      id: 4,
      title: 'Audit Readiness Report',
      description: 'Pre-audit assessment and recommendations',
      icon: FileText,
      category: 'Audit',
      frequency: 'On-demand',
      lastGenerated: '2024-01-08',
      size: '5.2 MB'
    },
    {
      id: 5,
      title: 'Policy Management Report',
      description: 'Policy status, reviews, and update tracking',
      icon: Activity,
      category: 'Policy',
      frequency: 'Monthly',
      lastGenerated: '2024-01-14',
      size: '1.8 MB'
    },
    {
      id: 6,
      title: 'Incident Response Report',
      description: 'Security incidents and response effectiveness analysis',
      icon: Clock,
      category: 'Security',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-05',
      size: '2.9 MB'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Q4 2023 Compliance Report',
      type: 'Compliance Status Report',
      generatedDate: '2024-01-15',
      generatedBy: 'John Smith',
      status: 'Ready',
      downloads: 12
    },
    {
      id: 2,
      title: 'January Risk Assessment',
      type: 'Risk Assessment Report',
      generatedDate: '2024-01-10',
      generatedBy: 'Sarah Johnson',
      status: 'Ready',
      downloads: 8
    },
    {
      id: 3,
      title: 'Executive Summary - January',
      type: 'Executive Dashboard',
      generatedDate: '2024-01-08',
      generatedBy: 'Mike Chen',
      status: 'Processing',
      downloads: 0
    },
    {
      id: 4,
      title: 'ISO 27001 Audit Preparation',
      type: 'Audit Readiness Report',
      generatedDate: '2024-01-05',
      generatedBy: 'Lisa Wang',
      status: 'Ready',
      downloads: 15
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      title: 'Monthly Compliance Dashboard',
      schedule: 'Monthly on 1st',
      nextRun: '2024-02-01',
      recipients: ['executives@company.com', 'compliance@company.com'],
      status: 'Active'
    },
    {
      id: 2,
      title: 'Quarterly Risk Report',
      schedule: 'Quarterly',
      nextRun: '2024-04-01',
      recipients: ['risk-committee@company.com'],
      status: 'Active'
    },
    {
      id: 3,
      title: 'Weekly Policy Updates',
      schedule: 'Weekly on Monday',
      nextRun: '2024-01-22',
      recipients: ['policy-owners@company.com'],
      status: 'Paused'
    }
  ];

  const timeRanges = [
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'last-year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Risk Management': 'bg-red-100 text-red-800',
      'Compliance': 'bg-green-100 text-green-800',
      'Audit': 'bg-blue-100 text-blue-800',
      'Policy': 'bg-orange-100 text-orange-800',
      'Security': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports and analyze compliance data</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Custom Report</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Schedule Report
          </button>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <div className="absolute -top-2 -right-2">
              <ComingSoonBadge />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {formats.map(format => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>
            <div className="absolute -top-2 -right-2">
              <ComingSoonBadge />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Frameworks</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Frameworks</option>
              <option>ISO 27001</option>
              <option>ISO 9001</option>
              <option>RGPD</option>
              <option>ISO 14001</option>
            </select>
            <div className="absolute -top-2 -right-2">
              <ComingSoonBadge />
            </div>
          </div>

          <div className="relative">
            <button className="w-full btn-primary mt-6">
              Generate Report
            </button>
            <div className="absolute -top-2 -right-2">
              <ComingSoonBadge />
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{template.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium">{template.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Generated:</span>
                    <span className="font-medium">{template.lastGenerated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{template.size}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    Generate
                  </button>
                  <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports and Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">{report.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>{report.type}</div>
                    <div>Generated: {report.generatedDate} by {report.generatedBy}</div>
                    <div>Downloads: {report.downloads}</div>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage
            </button>
          </div>
          
          <div className="space-y-3">
            {scheduledReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{report.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Schedule:</span>
                    <span className="font-medium">{report.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Run:</span>
                    <span className="font-medium">{report.nextRun}</span>
                  </div>
                  <div>
                    <span>Recipients: </span>
                    <span className="font-medium">{report.recipients.length} recipients</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};