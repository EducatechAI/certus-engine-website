import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import DripFeedDashboard from '@/components/ui/DripFeedDashboard';
import ReactMarkdown from 'react-markdown';
import { KnowledgeGraphFooter } from '@/components/KnowledgeGraphFooter';

// Função para ler o seeds.json
function getSeeds() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'seeds.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error('Erro ao ler seeds.json na rota dinâmica', error);
    return [];
  }
}

export async function generateStaticParams() {
  const seeds = getSeeds();
  // Gera estaticamente apenas as páginas que já têm conteúdo (forjadas)
  const released = seeds.filter((s: any) => s.contentMarkdown);
  
  return released.map((seed: any) => ({
    locale: seed.locale,
    assunto: seed.assunto,
    slug: seed.slug,
  }));
}

export async function generateMetadata({ params }: { params: { locale: string; assunto: string; slug: string } }): Promise<Metadata> {
  const seeds = getSeeds();
  const page = seeds.find((p: any) => p.locale === params.locale && p.assunto === params.assunto && p.slug === params.slug);
  
  if (!page || !page.contentMarkdown) return { title: 'Não Encontrado | Certus Engine' };
  
  return {
    title: `${page.title} | Certus Engine`,
    description: `Dossiê Técnico sobre mitigação de ${page.painPoint} para o setor de ${page.niche}.`,
  };
}

export default async function Page({ params }: { params: { locale: string; assunto: string; slug: string } }) {
  const seeds = getSeeds();
  const page = seeds.find((p: any) => p.locale === params.locale && p.assunto === params.assunto && p.slug === params.slug);

  // Se a página não existe no seeds, ou se existe mas NÃO FOI forjada ainda (contentMarkdown = null), retorna 404 (Acesso Negado)
  if (!page || !page.contentMarkdown) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-[#030d08] text-slate-300 font-sans relative overflow-hidden">
      
      {/* Background Animated Circuits */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 h 80 v 80 h -80 Z" fill="none" stroke="%2310b981" stroke-width="0.5"/><circle cx="10" cy="10" r="2" fill="%2310b981"/><circle cx="90" cy="90" r="2" fill="%2310b981"/></svg>')`, backgroundSize: '100px 100px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <article className="relative z-10 max-w-4xl mx-auto p-8 pt-20 pb-32">
        <header className="mb-12 border-b border-emerald-900/50 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              Cluster {page.assunto}
            </span>
            <span className="px-3 py-1 rounded bg-slate-900/40 border border-slate-700/50 text-slate-400 text-xs font-mono uppercase tracking-widest">
              Locale: {params.locale}
            </span>
            <span className="px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              ZK-Ready
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md leading-tight">{page.title}</h1>
        </header>
        
        <div className="prose prose-lg prose-invert prose-emerald max-w-none
                     prose-headings:font-bold prose-headings:text-emerald-50 prose-headings:border-b prose-headings:border-emerald-900/30 prose-headings:pb-2
                     prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 hover:prose-a:underline
                     prose-strong:text-emerald-200
                     prose-code:text-emerald-300 prose-code:bg-emerald-900/30 prose-code:px-1 prose-code:rounded
                     prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-900/10 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                     prose-table:border prose-table:border-emerald-900/40 prose-th:bg-emerald-900/20 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-emerald-900/40">
          <ReactMarkdown>{page.contentMarkdown}</ReactMarkdown>
        </div>
        
        <KnowledgeGraphFooter seed={page} />

      </article>

      {/* Como DripFeedDashboard está estático e não foi atualizado, usamos um link direto para o Command Center */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="/status" className="px-6 py-3 border border-emerald-500/40 rounded-full bg-black/80 backdrop-blur-xl text-emerald-400 font-mono text-xs uppercase tracking-widest hover:bg-emerald-900/50 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          [Retornar ao Command Center]
        </a>
      </div>
    </div>
  );
}
