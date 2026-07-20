export interface ContentMatrixItem {
  id: string;
  assunto: 'legado' | 'b2b' | 'soberana';
  slug: string;
  niche: string;
  painPoint: string;
  title: string;
  description: string;
  contentBlocks: string[];
  contentMarkdown?: string;
  releaseDate?: string;
  locale?: 'pt' | 'en' | 'es';
  priority: '0.9' | '0.8' | '0.7' | '0.5';
}
