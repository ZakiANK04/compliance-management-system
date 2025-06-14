import React from 'react';
import { X, Download, FileText, Calendar, User, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ViewPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: any;
}

export const ViewPolicyModal: React.FC<ViewPolicyModalProps> = ({ isOpen, onClose, policy }) => {
  if (!isOpen || !policy) return null;

  const handleDownloadPDF = () => {
    try {
      // Create a new instance each time
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(policy.title, 20, 20);
      
      // Add version
      doc.setFontSize(12);
      doc.text(`Version: ${policy.version}`, 20, 30);
      
      // Add metadata
      doc.setFontSize(10);
      doc.text(`Catégorie: ${policy.category}`, 20, 40);
      doc.text(`Statut: ${policy.status}`, 20, 45);
      doc.text(`Dernière mise à jour: ${policy.lastUpdated}`, 20, 50);
      doc.text(`Prochaine révision: ${policy.nextReview}`, 20, 55);
      doc.text(`Propriétaire: ${policy.owner}`, 20, 60);
      
      // Add description
      doc.setFontSize(12);
      doc.text('Description:', 20, 70);
      const splitDescription = doc.splitTextToSize(policy.description, 170);
      doc.setFontSize(10);
      doc.text(splitDescription, 20, 80);
      
      // Add compliance standards
      doc.setFontSize(12);
      doc.text('Normes respectées:', 20, 90 + splitDescription.length * 5);
      doc.setFontSize(10);
      policy.compliance.forEach((standard: string, index: number) => {
        doc.text(`• ${standard}`, 25, 100 + splitDescription.length * 5 + (index * 5));
      });
      
      // Save the PDF with a unique timestamp
      const timestamp = new Date().getTime();
      const filename = `${policy.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${timestamp}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{policy.title}</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger PDF</span>
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Version</div>
              <div className="font-medium">{policy.version}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Catégorie</div>
              <div className="font-medium">{policy.category}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Statut</div>
              <div className="font-medium">{policy.status}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Propriétaire</div>
              <div className="font-medium">{policy.owner}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{policy.description}</p>
          </div>

          {/* Compliance Standards */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Normes respectées</h3>
            <div className="flex flex-wrap gap-2">
              {policy.compliance.map((standard: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-satim-light text-satim-primary"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {standard}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Dernière mise à jour</div>
              <div className="font-medium">{policy.lastUpdated}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Prochaine révision</div>
              <div className="font-medium">{policy.nextReview}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 