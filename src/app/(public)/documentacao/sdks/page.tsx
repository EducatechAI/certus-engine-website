import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'SDKs | Certus Engine Docs' };

export default function SdksPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; SDKs
      </div>
      
      <h1 id="sdks" className="text-4xl font-black text-white mb-6">SDKs oficiais</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Interfaces nativas para integração do Certus na sua stack.
      </p>

      <h2 id="node" className="text-2xl font-bold text-white mt-12 mb-4">Node.js / TypeScript</h2>
      <div className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-sm mb-4">
        <div className="text-slate-500 mb-1"># NPM</div>
        <div className="text-emerald-300">npm install @certus/governor-kernel</div>
      </div>
      <p className="text-xs text-slate-500 mb-8">Requer Node 18+. Tipagem completa incluída.</p>

      <h2 id="python" className="text-2xl font-bold text-white mt-12 mb-4">Python (Beta)</h2>
      <div className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-sm mb-4">
        <div className="text-slate-500 mb-1"># PIP</div>
        <div className="text-emerald-300">pip install certus-engine</div>
      </div>
      <p className="text-xs text-slate-500 mb-12">Requer Python 3.9+. Síncrono e Assíncrono (asyncio).</p>

      <DocsFooter />
    </div>
  );
}
