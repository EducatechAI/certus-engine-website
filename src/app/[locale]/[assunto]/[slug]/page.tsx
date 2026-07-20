import { notFound } from 'next/navigation';
import { matrixLegado } from '@/data/matrix-legado';
import { matrixB2b } from '@/data/matrix-b2b';
import { matrixSoberana } from '@/data/matrix-soberana';
import type { Metadata } from 'next';
import DripFeedDashboard from '@/components/ui/DripFeedDashboard';

const ALL_MATRICES = [...matrixLegado, ...matrixB2b, ...matrixSoberana];

export async function generateStaticParams() {
  const highPriority = matrixSoberana.concat(matrixB2b.slice(0, 50)); 
  // No roteamento i18n estático, devemos gerar para os 3 locales
  const params: { locale: string; assunto: string; slug: string }[] = [];
  
  for (const locale of ['pt', 'en', 'es']) {
    for (const item of highPriority) {
      params.push({ locale, assunto: item.assunto, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { locale: string; assunto: string; slug: string } }): Promise<Metadata> {
  const page = ALL_MATRICES.find((p) => p.assunto === params.assunto && p.slug === params.slug);
  if (!page) return { title: 'Não Encontrado | Certus Engine' };
  
  return {
    title: `${page.title} | Certus Engine`,
    description: page.description,
  };
}

export default async function Page({ params }: { params: { locale: string; assunto: string; slug: string } }) {
  const page = ALL_MATRICES.find((p) => p.assunto === params.assunto && p.slug === params.slug);

  if (!page) {
    notFound(); 
  }

  // Se a página já possui o campo contentMarkdown (gerado pela Frota APEX), renderiza ele.
  // Caso contrário, faz um fallback elegante para o contentBlocks.
  const contentHtml = page.contentMarkdown 
    ? page.contentMarkdown 
    : page.contentBlocks.map((b: string) => `<p class="mb-6">${b}</p>`).join('');

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
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">{page.title}</h1>
          <p className="text-xl md:text-2xl text-emerald-100/70 font-light leading-relaxed">{page.description}</p>
        </header>
        
        <div 
          className="prose prose-lg prose-invert prose-emerald max-w-none
                     prose-headings:font-bold prose-headings:text-emerald-50
                     prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 hover:prose-a:underline
                     prose-strong:text-emerald-200
                     prose-code:text-emerald-300 prose-code:bg-emerald-900/30 prose-code:px-1 prose-code:rounded
                     prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-900/10 prose-blockquote:py-2 prose-blockquote:px-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        <div className="mt-16 p-6 bg-black/40 border border-emerald-900/50 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-slate-500 font-mono">
            <strong>ID Criptográfico:</strong> {page.id} <br/>
            <strong>Nicho Catalogado:</strong> {page.niche} <br/>
            <strong>Integridade:</strong> ZK-Ready Verified
          </p>
        </div>
      </article>

      <DripFeedDashboard totalPages={4680} />
    </div>
  );
}
