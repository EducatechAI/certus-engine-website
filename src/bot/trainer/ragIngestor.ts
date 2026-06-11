import * as fs from 'fs';
import * as path from 'path';

// Estrutura simulada para embeddings no vetor isolado
interface DocumentChunk {
  id: string;
  source: string;
  content: string;
  embedding?: number[];
}

export class RagIngestor {
  private kbPath: string;

  constructor(kbPath: string = path.join(process.cwd(), 'src', 'data', 'training-kb')) {
    this.kbPath = kbPath;
  }

  /**
   * Processa todos os arquivos .md e .json na pasta de treinamento.
   */
  public async ingestKnowledgeBase(): Promise<DocumentChunk[]> {
    console.log(`[RAG INGESTOR] Iniciando varredura na base de conhecimento: ${this.kbPath}`);
    
    if (!fs.existsSync(this.kbPath)) {
      console.warn('[RAG INGESTOR] Pasta /docs/training-kb/ não encontrada.');
      return [];
    }

    const files = fs.readdirSync(this.kbPath);
    const chunks: DocumentChunk[] = [];

    for (const file of files) {
      const fullPath = path.join(this.kbPath, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      console.log(`[RAG INGESTOR] Lendo ${file}...`);
      
      // Simula a quebra de chunks e geração de embeddings via API isolada
      const docChunks = this.chunkDocument(file, content);
      for (const chunk of docChunks) {
        chunk.embedding = await this.generateIsolatedEmbedding(chunk.content);
        chunks.push(chunk);
      }
    }

    console.log(`[RAG INGESTOR] Ingestão concluída. ${chunks.length} chunks vetorizados.`);
    return chunks;
  }

  private chunkDocument(source: string, content: string): DocumentChunk[] {
    // Quebra simples por parágrafos para efeito de isolamento RAG
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 20);
    return paragraphs.map((p, idx) => ({
      id: `${source}-chunk-${idx}`,
      source,
      content: p.trim()
    }));
  }

  private async generateIsolatedEmbedding(text: string): Promise<number[]> {
    // Simula a geração de embedding em um motor isolado e restrito (não o Wolfdog de prod)
    // Em produção, isso chamaria o modelo local via API
    return new Array(768).fill(0).map(() => Math.random());
  }
}
