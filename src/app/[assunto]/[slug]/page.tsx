import { notFound } from 'next/navigation';
import { matrixLegado } from '@/data/matrix-legado';
import { matrixB2b } from '@/data/matrix-b2b';
import { matrixSoberana } from '@/data/matrix-soberana';
import type { Metadata } from 'next';

const ALL_MATRICES = [...matrixLegado, ...matrixB2b, ...matrixSoberana];

// OTIMIZAÇÃO CRÍTICA: Gerar apenas as páginas de alta prioridade no build da Vercel.
// O resto será gerado sob demanda (fallback: 'blocking') na primeira visita.
export async function generateStaticParams() {
  const highPriority = matrixSoberana.concat(matrixB2b.slice(0, 50)); // Soberana + Top 50 B2B
  return highPriority.map((item) => ({
    assunto: item.assunto,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: { assunto: string; slug: string } }): Promise<Metadata> {
  const page = ALL_MATRICES.find((p) => p.assunto === params.assunto && p.slug === params.slug);
  if (!page) return { title: 'Não Encontrado | Certus Engine' };
  
  return {
    title: `${page.title} | Certus Engine`,
    description: page.description,
  };
}

export default async function Page({ params }: { params: { assunto: string; slug: string } }) {
  // fallback: 'blocking' é implícito quando generateStaticParams não retorna tudo.
  const page = ALL_MATRICES.find((p) => p.assunto === params.assunto && p.slug === params.slug);

  if (!page) {
    notFound(); 
  }

  return (
    <article className="max-w-4xl mx-auto p-8 prose prose-lg prose-slate">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <p className="text-xl text-gray-600 mb-8 font-medium">{page.description}</p>
      
      <div className="mb-8">
        {page.contentBlocks.map((block, index) => (
          <p key={index} className="mb-4">{block}</p>
        ))}
      </div>
      
      <div className="mt-12 p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r">
        <p className="text-sm text-slate-700">
          <strong>Cluster:</strong> {page.assunto.toUpperCase()} | 
          <strong> Nicho:</strong> {page.niche}
        </p>
      </div>
    </article>
  );
}
