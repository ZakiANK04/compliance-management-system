import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GapAnalysisFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (analysis: any) => void;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const GapAnalysisForm: React.FC<GapAnalysisFormProps> = ({ isOpen, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    complianceTitle: '',
    code: '',
    implementation: 'Not Implemented',
    norm: '',
    priority: '',
    description: '',
    effort: '',
    timeline: '',
    recommendation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear any previous errors
  };

  const generateAIAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!formData.complianceTitle || !formData.code || !formData.norm) {
        setError('Veuillez remplir tous les champs requis avant de lancer l\'analyse');
        return;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Analyze this compliance gap and provide recommendations:
        Compliance Title: ${formData.complianceTitle}
        Code: ${formData.code}
        Implementation Status: ${formData.implementation}
        Norm: ${formData.norm}

        Please provide:
        1. Priority level (Critical, High, Medium, Low)
        2. A brief description of the gap
        3. Effort required (High, Medium, Low)
        4. Timeline needed to fix
        5. Specific recommendations

        Format the response as a JSON object with these keys: priority, description, effort, timeline, recommendation.
        Do not include any markdown formatting or code blocks. Just return the raw JSON object.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Clean the response text by removing any markdown formatting
        const cleanedText = text
          .replace(/```json\s*/g, '') // Remove ```json prefix
          .replace(/```\s*$/g, '')    // Remove ``` suffix
          .trim();                    // Remove extra whitespace

        const aiAnalysis = JSON.parse(cleanedText);
        
        // Validate the required fields
        if (!aiAnalysis.priority || !aiAnalysis.description || !aiAnalysis.effort || 
            !aiAnalysis.timeline || !aiAnalysis.recommendation) {
          throw new Error('Réponse IA incomplète');
        }

        setFormData(prev => ({
          ...prev,
          priority: aiAnalysis.priority,
          description: aiAnalysis.description,
          effort: aiAnalysis.effort,
          timeline: aiAnalysis.timeline,
          recommendation: aiAnalysis.recommendation
        }));
      } catch (error) {
        console.error('Error parsing AI response:', error);
        setError('Erreur lors de l\'analyse de la réponse IA. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      setError('Erreur lors de la génération de l\'analyse. Veuillez vérifier votre clé API et réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Nouvelle Analyse d'Écart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre de Conformité
              </label>
              <input
                type="text"
                name="complianceTitle"
                value={formData.complianceTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut d'Implémentation
              </label>
              <select
                name="implementation"
                value={formData.implementation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              >
                <option value="Not Implemented">Non Implémenté</option>
                <option value="Partially Implemented">Partiellement Implémenté</option>
                <option value="Fully Implemented">Totalement Implémenté</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Norme
              </label>
              <input
                type="text"
                name="norm"
                value={formData.norm}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={generateAIAnalysis}
              disabled={isLoading || !formData.complianceTitle || !formData.code || !formData.norm}
              className="btn-secondary flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyse en cours...</span>
                </>
              ) : (
                <>
                  <span>Lancer l'Analyse IA</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              >
                <option value="">Sélectionner...</option>
                <option value="Critical">Critique</option>
                <option value="High">Élevée</option>
                <option value="Medium">Moyenne</option>
                <option value="Low">Basse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Effort Requis
              </label>
              <select
                name="effort"
                value={formData.effort}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
                required
              >
                <option value="">Sélectionner...</option>
                <option value="High">Élevé</option>
                <option value="Medium">Moyen</option>
                <option value="Low">Faible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description de l'Écart
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Délai Nécessaire
            </label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recommandations
            </label>
            <textarea
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-satim-primary focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
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