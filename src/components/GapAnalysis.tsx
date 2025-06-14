import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  BarChart3,
  Filter,
  Download,
  Eye,
  Plus,
  Search,
  Play
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { GapAnalysisForm } from './GapAnalysisForm';

interface GapAnalysis {
  id: number;
  complianceTitle: string;
  code: string;
  implementation: string;
  norm: string;
  priority: string;
  description: string;
  effort: string;
  timeline: string;
  recommendation: string;
}

export const GapAnalysis: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedImplementation, setSelectedImplementation] = useState('');
  const [gaps, setGaps] = useState<GapAnalysis[]>([
    {
      id: 1,
      complianceTitle: "Contrôle d'Accès",
      code: "A.9.1.2",
      implementation: "Partially Implemented",
      norm: "ISO 27001",
      priority: "High",
      description: "Network segmentation not fully implemented for all critical systems",
      effort: "Medium",
      timeline: "2-4 weeks",
      recommendation: "Implement comprehensive network segmentation for critical systems"
    }
  ]);

  const frameworkGaps = [
    {
      framework: 'ISO 27001',
      totalControls: 114,
      implemented: 107,
      gaps: 7,
      complianceRate: 94,
      priority: 'Medium'
    },
    {
      framework: 'SOC 2',
      totalControls: 67,
      implemented: 59,
      gaps: 8,
      complianceRate: 88,
      priority: 'High'
    },
    {
      framework: 'GDPR',
      totalControls: 25,
      implemented: 24,
      gaps: 1,
      complianceRate: 96,
      priority: 'Low'
    },
    {
      framework: 'HIPAA',
      totalControls: 45,
      implemented: 41,
      gaps: 4,
      complianceRate: 91,
      priority: 'Medium'
    }
  ];

  const gapsByCategory = [
    { category: 'Access Control', gaps: 5, severity: 'High' },
    { category: 'Data Protection', gaps: 3, severity: 'Critical' },
    { category: 'Risk Management', gaps: 4, severity: 'Medium' },
    { category: 'Incident Response', gaps: 2, severity: 'High' },
    { category: 'Business Continuity', gaps: 6, severity: 'Medium' },
    { category: 'Vendor Management', gaps: 3, severity: 'Low' },
  ];

  const maturityAssessment = [
    { control: 'Access Management', current: 85, target: 95, gap: 10 },
    { control: 'Data Encryption', current: 92, target: 98, gap: 6 },
    { control: 'Risk Assessment', current: 78, target: 90, gap: 12 },
    { control: 'Incident Response', current: 88, target: 95, gap: 7 },
    { control: 'Monitoring', current: 82, target: 92, gap: 10 },
    { control: 'Training', current: 75, target: 85, gap: 10 },
  ];

  const detailedGaps = [
    {
      id: 1,
      control: 'A.9.1.2',
      title: 'Access to networks and network services',
      framework: 'ISO 27001',
      currentStatus: 'Partially Implemented',
      gapDescription: 'Network segmentation not fully implemented for all critical systems',
      priority: 'High',
      effort: 'Medium',
      timeline: '2-3 months',
      recommendation: 'Implement network micro-segmentation and zero-trust architecture'
    },
    {
      id: 2,
      control: 'CC6.1',
      title: 'Logical and Physical Access Controls',
      framework: 'SOC 2',
      currentStatus: 'Not Implemented',
      gapDescription: 'Privileged access management system not in place',
      priority: 'Critical',
      effort: 'High',
      timeline: '4-6 months',
      recommendation: 'Deploy privileged access management (PAM) solution'
    },
    {
      id: 3,
      control: 'Art. 32',
      title: 'Security of processing',
      framework: 'GDPR',
      currentStatus: 'Implemented',
      gapDescription: 'Regular security assessments not documented properly',
      priority: 'Low',
      effort: 'Low',
      timeline: '2-4 weeks',
      recommendation: 'Enhance documentation and audit trail processes'
    },
    {
      id: 4,
      control: '164.312(e)',
      title: 'Transmission security',
      framework: 'HIPAA',
      currentStatus: 'Partially Implemented',
      gapDescription: 'End-to-end encryption not enforced for all PHI transmissions',
      priority: 'High',
      effort: 'Medium',
      timeline: '1-2 months',
      recommendation: 'Implement comprehensive encryption for all PHI data flows'
    }
  ];

  const frameworks = ['all', 'ISO 27001', 'SOC 2', 'GDPR', 'HIPAA'];

  const filteredGaps = selectedFramework === 'all' 
    ? detailedGaps 
    : detailedGaps.filter(gap => gap.framework === selectedFramework);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      case 'Implemented':
        return 'bg-green-100 text-green-800';
      case 'Partially Implemented':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Implemented':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddGap = (newGap: any) => {
    const gapWithId = {
      id: `gap-${Date.now()}`,
      title: newGap.complianceTitle,
      code: newGap.code,
      category: newGap.norm,
      status: newGap.implementation,
      priority: newGap.priority,
      effort: newGap.effort,
      description: newGap.description,
      recommendation: newGap.recommendation,
      lastUpdated: new Date().toISOString(),
      nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    setGaps(prevGaps => [gapWithId, ...prevGaps]);
    setIsFormOpen(false);
  };

  // Prepare data for charts
  const implementationData = [
    { name: 'Non Implémenté', value: gaps.filter(g => g.implementation === 'Not Implemented').length },
    { name: 'Partiellement Implémenté', value: gaps.filter(g => g.implementation === 'Partially Implemented').length },
    { name: 'Totalement Implémenté', value: gaps.filter(g => g.implementation === 'Fully Implemented').length }
  ];

  const priorityData = [
    { name: 'Critique', value: gaps.filter(g => g.priority === 'Critical').length },
    { name: 'Élevée', value: gaps.filter(g => g.priority === 'High').length },
    { name: 'Moyenne', value: gaps.filter(g => g.priority === 'Medium').length },
    { name: 'Basse', value: gaps.filter(g => g.priority === 'Low').length }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gap Analysis</h1>
          <p className="text-gray-600 mt-1">Identify and prioritize compliance gaps across frameworks</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Lancer l'Analyse</span>
          </button>
        </div>
      </div>

      {/* Gap Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">20</div>
              <div className="text-sm text-gray-600">Total Gaps</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Critical Gaps</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Avg Compliance</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Remediation Rate</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Framework Gap Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Framework Gap Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {frameworkGaps.map((framework, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{framework.framework}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(framework.priority)}`}>
                  {framework.priority}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Controls:</span>
                  <span className="font-medium">{framework.totalControls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Implemented:</span>
                  <span className="font-medium text-green-600">{framework.implemented}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gaps:</span>
                  <span className="font-medium text-red-600">{framework.gaps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compliance:</span>
                  <span className="font-medium">{framework.complianceRate}%</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${framework.complianceRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statut d'Implémentation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={implementationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution des Priorités</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={priorityData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Priorités" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by framework:</span>
          </div>
          
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {frameworks.map(framework => (
              <option key={framework} value={framework}>
                {framework === 'all' ? 'All Frameworks' : framework}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detailed Gap Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Gap Analysis</h3>
        <div className="space-y-4">
          {filteredGaps.map((gap) => (
            <div key={gap.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{gap.control}</span>
                    <h4 className="font-medium text-gray-900">{gap.title}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {gap.framework}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gap.currentStatus)}`}>
                      {gap.currentStatus}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                      {gap.priority} Priority
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{gap.gapDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Effort Required:</span>
                      <div className="font-medium">{gap.effort}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <div className="font-medium">{gap.timeline}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Recommendation:</span>
                      <div className="font-medium text-blue-600">{gap.recommendation}</div>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Eye className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
          />
        </div>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-satim-primary focus:border-transparent"
        >
          <option value="">Toutes les priorités</option>
          <option value="Critical">Critique</option>
          <option value="High">Élevée</option>
          <option value="Medium">Moyenne</option>
          <option value="Low">Basse</option>
        </select>
        <select
          value={selectedImplementation}
          onChange={(e) => setSelectedImplementation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-satim-primary focus:border-transparent"
        >
          <option value="">Tous les statuts</option>
          <option value="Not Implemented">Non Implémenté</option>
          <option value="Partially Implemented">Partiellement Implémenté</option>
          <option value="Fully Implemented">Totalement Implémenté</option>
        </select>
      </div>

      {/* Gaps Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Norme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effort</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Délai</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGaps.map((gap) => (
                <tr key={gap.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{gap.title}</div>
                    <div className="text-sm text-gray-500">{gap.gapDescription}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gap.control}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      gap.currentStatus === 'Fully Implemented' ? 'bg-green-100 text-green-800' :
                      gap.currentStatus === 'Partially Implemented' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {gap.currentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gap.framework}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      gap.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      gap.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      gap.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {gap.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gap.effort}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gap.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <GapAnalysisForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddGap}
      />
    </div>
  );
};