import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Download,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { AddPolicyModal } from './AddPolicyModal';
import { ViewPolicyModal } from './ViewPolicyModal';

interface Policy {
  id: number;
  title: string;
  version: string;
  category: string;
  status: string;
  lastUpdated: string;
  nextReview: string;
  owner: string;
  description: string;
  compliance: string[];
}

export const PolicyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 1,
      title: "Politique de Confidentialité",
      version: "1.0",
      category: "RGPD",
      status: "Actif",
      lastUpdated: "01/03/2024",
      nextReview: "01/03/2025",
      owner: "Karim lganag",
      description: "Cette politique définit les règles de protection des données personnelles conformément au RGPD.",
      compliance: ["RGPD", "ISO 27001"]
    },
    {
      id: 2,
      title: "Politique de Sécurité",
      version: "2.1",
      category: "Sécurité",
      status: "En révision",
      lastUpdated: "15/02/2024",
      nextReview: "15/08/2024",
      owner: "Karim lganag",
      description: "Directives pour la sécurité des systèmes d'information et la protection des données.",
      compliance: ["ISO 27001", "NIS 2"]
    }
  ]);

  const handleAddPolicy = (newPolicy: Policy) => {
    setPolicies([...policies, {
      ...newPolicy,
      id: policies.length + 1,
      lastUpdated: new Date().toLocaleDateString('fr-FR'),
    }]);
    setIsAddModalOpen(false);
  };

  const handleViewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsViewModalOpen(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    // TODO: Implement edit functionality
    console.log('Edit policy:', policy);
  };

  const handleDownloadPolicy = (policy: Policy) => {
    // TODO: Implement direct download functionality
    console.log('Download policy:', policy);
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || policy.category === selectedCategory;
    const matchesStatus = !selectedStatus || policy.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Under Review':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'Draft':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-orange-100 text-orange-800';
      case 'Draft':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-satim-primary">Gestion des Politiques</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle Politique</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des politiques..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              <option value="RGPD">RGPD</option>
              <option value="Sécurité">Sécurité</option>
              <option value="Conformité">Conformité</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
            >
              <option value="">Tous les statuts</option>
              <option value="Actif">Actif</option>
              <option value="En révision">En révision</option>
              <option value="Expiré">Expiré</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Titre</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Version</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Catégorie</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Dernière mise à jour</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Prochaine révision</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Propriétaire</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{policy.title}</div>
                      <div className="text-sm text-gray-500">{policy.description}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{policy.version}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {policy.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                        policy.status === 'En Révision' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{policy.lastUpdated}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{policy.nextReview}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-satim-primary to-satim-secondary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">{policy.owner}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => handleViewPolicy(policy)}
                          className="p-1 text-gray-400 hover:text-satim-primary transition-colors duration-200"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditPolicy(policy)}
                          className="p-1 text-gray-400 hover:text-satim-primary transition-colors duration-200"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadPolicy(policy)}
                          className="p-1 text-gray-400 hover:text-satim-primary transition-colors duration-200"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddPolicyModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPolicy}
        />
      )}

      {isViewModalOpen && selectedPolicy && (
        <ViewPolicyModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedPolicy(null);
          }}
          policy={selectedPolicy}
        />
      )}
    </div>
  );
};