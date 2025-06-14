import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  MessageCircle, 
  Lightbulb, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { RAGService, RAGResponse } from '../lib/rag/ragService';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  sources?: RAGResponse['sources'];
}

export const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [ragService, setRagService] = useState<RAGService | null>(null);
  const [expandedSources, setExpandedSources] = useState<number[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRAG = async () => {
      try {
        setIsInitializing(true);
        setInitError(null);
        
        // Debug: Check if environment variable is loaded
        console.log('Environment check:', {
          hasApiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
          apiKeyLength: import.meta.env.VITE_GEMINI_API_KEY?.length,
          apiKeyPrefix: import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 4),
          envKeys: Object.keys(import.meta.env)
        });

        const service = await RAGService.getInstance();
        setRagService(service);
      } catch (error) {
        console.error('Failed to initialize RAG service:', error);
        setInitError('Failed to initialize AI service. Please check your Gemini API key and try again.');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeRAG();
  }, []);

  const quickActions = [
    {
      title: 'Risk Assessment Help',
      description: 'Get guidance on conducting risk assessments',
      icon: AlertTriangle,
      prompt: 'How do I conduct a comprehensive risk assessment for my organization?'
    },
    {
      title: 'Policy Templates',
      description: 'Find compliance policy templates',
      icon: FileText,
      prompt: 'Can you provide a template for a data privacy policy that complies with GDPR?'
    },
    {
      title: 'Compliance Guidance',
      description: 'Ask about specific compliance requirements',
      icon: TrendingUp,
      prompt: 'What are the key requirements for SOC 2 Type II compliance?'
    },
    {
      title: 'Gap Analysis Insights',
      description: 'Understand how to address compliance gaps',
      icon: Lightbulb,
      prompt: 'What are the most effective ways to address compliance gaps in ISO 27001?'
    }
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      if (!ragService) {
        throw new Error('AI service is not initialized');
      }

      const response = await ragService.query(message);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString(),
        sources: response.sources,
      };

      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I encountered an error while processing your request. Please make sure your Gemini API key is set correctly and try again.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
  };

  const toggleSources = (messageId: number) => {
    setExpandedSources(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const formatSourceName = (source: string) => {
    return source.split('/').pop()?.replace(/\.[^/.]+$/, '') || source;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-satim-primary">AI Compliance Assistant</h1>
          <p className="text-gray-600 mt-1">Get instant guidance on compliance, risk management, and regulatory requirements</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-satim-light to-satim-primary/10 px-4 py-2 rounded-lg">
          <Sparkles className="h-4 w-4 text-satim-primary" />
          <span className="text-sm text-satim-primary font-medium">AI-Powered</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h3 className="text-lg font-display font-semibold text-satim-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-satim-primary hover:bg-satim-light transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-satim-light rounded-lg">
                        <Icon className="h-4 w-4 text-satim-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-satim-light to-satim-primary/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="h-4 w-4 text-satim-primary" />
                <span className="text-sm font-medium text-satim-primary">AI Capabilities</span>
              </div>
              <ul className="text-xs text-satim-primary/80 space-y-1">
                <li>• Compliance framework guidance</li>
                <li>• Risk assessment methodologies</li>
                <li>• Policy template generation</li>
                <li>• Regulatory requirement explanations</li>
                <li>• Best practice recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="card h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-satim-primary to-satim-secondary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Compliance Assistant</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    {isInitializing ? (
                      <span className="text-yellow-600">Initializing...</span>
                    ) : initError ? (
                      <span className="text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {initError}
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                        Online
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {conversation.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${msg.type === 'user' ? 'bg-satim-primary text-white' : 'bg-gray-100 text-gray-900'} rounded-lg`}>
                    <div className="p-4">
                      <div className="whitespace-pre-line text-sm">{msg.content}</div>
                      <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-satim-light' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                    
                    {msg.type === 'ai' && msg.sources && msg.sources.length > 0 && (
                      <div className="border-t border-gray-200">
                        <button
                          onClick={() => toggleSources(msg.id)}
                          className="w-full px-4 py-2 text-xs text-gray-500 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span>View Sources ({msg.sources.length})</span>
                          {expandedSources.includes(msg.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        
                        {expandedSources.includes(msg.id) && (
                          <div className="px-4 py-2 bg-gray-50">
                            {msg.sources.map((source, index) => (
                              <div key={index} className="mb-2 last:mb-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-gray-700">
                                    {formatSourceName(source.metadata.source)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Score: {Math.round(source.score * 100)}%
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 bg-white p-2 rounded border border-gray-200">
                                  {source.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isInitializing ? "Initializing AI service..." : initError ? "AI service unavailable" : "Ask me about compliance, risk management, or regulatory requirements..."}
                  disabled={isInitializing || !!initError}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-satim-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isInitializing || !!initError}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};