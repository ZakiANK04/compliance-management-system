import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (policy: any) => void;
}

export const AddPolicyModal: React.FC<AddPolicyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [policy, setPolicy] = useState({
    title: '',
    version: '',
    category: '',
    status: 'Active',
    description: '',
    owner: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    nextReview: '',
    compliance: [] as string[]
  });

  const categories = ['Confidentialité', 'Sécurité', 'RH', 'Opérationnel', 'Conformité'];
  const statuses = ['Active', 'En Révision', 'Inactif'];
  const complianceOptions = ['ISO 27001', 'ISO 9001', 'RGPD', 'ISO 14001', 'ISO 45001', 'Loi Informatique et Libertés'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(policy);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Ajouter une nouvelle politique</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la politique</label>
              <input
                type="text"
                required
                value={policy.title}
                onChange={(e) => setPolicy({ ...policy, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
              <input
                type="text"
                required
                value={policy.version}
                onChange={(e) => setPolicy({ ...policy, version: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                required
                value={policy.category}
                onChange={(e) => setPolicy({ ...policy, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                required
                value={policy.status}
                onChange={(e) => setPolicy({ ...policy, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Propriétaire</label>
              <input
                type="text"
                required
                value={policy.owner}
                onChange={(e) => setPolicy({ ...policy, owner: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de révision</label>
              <input
                type="date"
                required
                value={policy.nextReview}
                onChange={(e) => setPolicy({ ...policy, nextReview: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={policy.description}
              onChange={(e) => setPolicy({ ...policy, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Normes respectées</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {complianceOptions.map(option => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={policy.compliance.includes(option)}
                    onChange={(e) => {
                      const newCompliance = e.target.checked
                        ? [...policy.compliance, option]
                        : policy.compliance.filter(c => c !== option);
                      setPolicy({ ...policy, compliance: newCompliance });
                    }}
                    className="rounded border-gray-300 text-satim-primary focus:ring-satim-primary"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 