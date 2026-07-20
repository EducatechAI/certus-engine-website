export interface ContentMatrixItem {
  id: string;
  assunto: 'legado' | 'b2b' | 'soberana';
  slug: string;
  niche: string;
  painPoint: string;
  title: string;
  description: string;
  contentBlocks: string[];
  priority: '0.9' | '0.8' | '0.7' | '0.5';
}
