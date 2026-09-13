import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Canais de Integração | Certus Engine Docs' };

export default function CanaisIntegracaoPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Canais de Integração Oficial
      </div>
      
      <h1 className="text-4xl font-black text-white mb-6">Canais de Integração Oficial</h1>
      
      <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-8 mb-12">
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          O Certus Engine <strong>não distribui packages npm/pip públicos</strong>. A integração oficial acontece exclusivamente por 3 canais de produto:
        </p>
        
        <ul className="space-y-4 mb-8">
          <li className="flex gap-4">
            <span className="text-emerald-500 font-bold">1.</span>
            <div>
              <strong className="text-white block mb-1">IDE Sovereign</strong>
              <span className="text-slate-400 text-sm">Para desenvolvedores júnior, low-code e pequenas empresas.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-emerald-500 font-bold">2.</span>
            <div>
              <strong className="text-white block mb-1">IDE Command Standard</strong>
              <span className="text-slate-400 text-sm">Para desenvolvedores sênior, startups, Deep Techs e empresas de médio porte.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-emerald-500 font-bold">3.</span>
            <div>
              <strong className="text-white block mb-1">Modalidade Enterprise/Government</strong>
              <span className="text-slate-400 text-sm">Para instituições reguladas (prefeituras, bancos, hospitais, escolas, universidades, tribunais e defesa).</span>
            </div>
          </li>
        </ul>
        
        <p className="text-slate-400 text-sm mb-8 p-4 bg-black/40 border border-slate-800 rounded-lg">
          Para integração headless em backends, consulte a <Link href="/documentacao/api-reference" className="text-emerald-400 hover:underline">API REST documentada</Link>.
        </p>

        <Link href="/pricing" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-lg transition-colors">
          Ver níveis de produto
        </Link>
      </div>

      <DocsFooter />
    </div>
  );
}