import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProcessedDocument } from './documentLoader';

interface VectorDocument extends ProcessedDocument {
  embedding?: number[];
}

export class VectorStore {
  private static instance: VectorStore;
  private documents: VectorDocument[] = [];
  private model: any;
  private isInitialized: boolean = false;

  private constructor() {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key not found in environment variables');
    }

    // Initialize Gemini with the API key
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    
    // Get the embedding model
    this.model = genAI.getGenerativeModel({ 
      model: "embedding-001",
      generationConfig: {
        temperature: 0.0,
      },
    });
  }

  public static getInstance(): VectorStore {
    if (!VectorStore.instance) {
      VectorStore.instance = new VectorStore();
    }
    return VectorStore.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  public async addDocuments(documents: ProcessedDocument[]): Promise<void> {
    try {
      // Generate embeddings for each document
      const vectorDocs = await Promise.all(
        documents.map(async (doc) => {
          const embedding = await this.generateEmbedding(doc.content);
          return {
            ...doc,
            embedding
          };
        })
      );

      this.documents.push(...vectorDocs);
    } catch (error) {
      console.error('Error adding documents:', error);
      throw error;
    }
  }

  public async search(query: string, k: number = 3): Promise<ProcessedDocument[]> {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.generateEmbedding(query);

      // Calculate similarity scores
      const scoredDocs = this.documents.map(doc => ({
        document: doc,
        score: this.cosineSimilarity(queryEmbedding, doc.embedding || [])
      }));

      // Sort by similarity score and return top k
      return scoredDocs
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(result => result.document);
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const result = await this.model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async save(path: string) {
    try {
      const data = JSON.stringify(this.documents);
      localStorage.setItem('vector_store', data);
      console.log('Vector store saved successfully');
    } catch (error) {
      console.error('Error saving vector store:', error);
      throw error;
    }
  }

  async load(path: string) {
    try {
      const data = localStorage.getItem('vector_store');
      if (data) {
        this.documents = JSON.parse(data);
        console.log('Vector store loaded successfully');
      }
    } catch (error) {
      console.error('Error loading vector store:', error);
      throw error;
    }
  }
} 