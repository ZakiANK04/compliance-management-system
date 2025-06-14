import { GoogleGenerativeAI } from '@google/generative-ai';
import { DocumentLoader, ProcessedDocument } from './documentLoader';
import { VectorStore } from './vectorStore';

export interface RAGResponse {
  answer: string;
  sources: Array<{
    name: string;
    content: string;
    metadata: Record<string, any>;
  }>;
}

export class RAGService {
  private static instance: RAGService;
  private model: any;
  private vectorStore: VectorStore;
  private documentLoader: DocumentLoader;
  private isInitialized: boolean = false;

  private constructor() {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key not found in environment variables');
    }

    // Initialize Gemini with the API key
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    // Get the model
    this.model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    this.vectorStore = new VectorStore();
    this.documentLoader = new DocumentLoader();
  }

  public static async getInstance(): Promise<RAGService> {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService();
      await RAGService.instance.initialize();
    }
    return RAGService.instance;
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize vector store
      await this.vectorStore.initialize();

      // Load and index documents
      await this.loadAndIndexDocuments();

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize RAG service:', error);
      throw error;
    }
  }

  private async loadAndIndexDocuments(): Promise<void> {
    try {
      // For now, we'll use a mock document since we can't access the file system in the browser
      const mockDocument: ProcessedDocument = {
        content: "SATIM is committed to maintaining the highest standards of corporate governance and compliance.",
        metadata: {
          source: "SATIM GRC Guidelines",
          page: 1
        }
      };

      // Add the mock document to the vector store
      await this.vectorStore.addDocuments([mockDocument]);

      console.log('Documents loaded and indexed successfully');
    } catch (error) {
      console.error('Error loading and indexing documents:', error);
      throw error;
    }
  }

  public async query(question: string): Promise<RAGResponse> {
    if (!this.isInitialized) {
      throw new Error('RAG service not initialized');
    }

    try {
      // Search for relevant documents
      const relevantDocs = await this.vectorStore.search(question, 3);

      // Construct prompt with context and instructions
      let prompt = `You are an AI specialized in regulations, laws, and compliance. You have expertise in ISO standards, cybersecurity regulations, and general compliance frameworks. 
      
If the provided context contains specific information about SATIM's implementation or policies, use that information. However, you can also provide general knowledge about regulations and laws even if they're not specifically mentioned in the context.

Context:
${relevantDocs.length > 0 ? relevantDocs.map(doc => doc.content).join('\n\n') : 'No specific context available.'}

Question: ${question}

Please provide a clear and concise answer that:
1. Directly addresses the question
2. Uses specific information from the context if available
3. Includes relevant regulatory knowledge
4. Keeps the response medium-length (2-3 paragraphs)
5. Avoids markdown formatting
6. Uses simple, clear language
7. Focuses on practical information

Format your response as plain text with:
- A clear opening statement
- Supporting details in simple paragraphs
- No bullet points or special formatting
- No technical jargon unless necessary

Answer:`;

      // Get response from Gemini
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      // Format sources
      const sources = relevantDocs.map(doc => ({
        name: doc.metadata.source || 'Unknown Source',
        content: doc.content,
        metadata: doc.metadata
      }));

      return {
        answer: response,
        sources
      };
    } catch (error) {
      console.error('Error querying RAG service:', error);
      throw error;
    }
  }
} 