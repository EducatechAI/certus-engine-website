import Link from 'next/link';
import { DocsPlayground } from '@/components/docs/DocsPlayground';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'API Reference | Certus Engine Docs' };

export default function ApiReferencePage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; API Reference
      </div>
      
      <h1 id="api-overview" className="text-4xl font-black text-white mb-6">API Reference</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        A API REST do Certus Engine fornece acesso pragmático aos módulos de governança, auditoria e sanitização PII.
      </p>

      <DocsPlayground />

      <h2 id="authentication" className="text-2xl font-bold text-white mt-12 mb-4">Autenticação</h2>
      <p className="text-slate-400 mb-4">Todas as requisições requerem um token de portador (Bearer Token) enviado no header <code>Authorization</code>.</p>
      
      <h2 id="endpoints" className="text-2xl font-bold text-white mt-12 mb-6">Core Endpoints</h2>
      
      <div className="space-y-12 mb-12">
        <div id="endpoint-sanitize" className="border border-slate-800 rounded-xl overflow-hidden">
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-emerald-400">POST</span>
            <span className="font-mono text-sm text-slate-200">/v1/pii/sanitize</span>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-400 mb-4">Inspeciona e mascara PIIs em um payload de texto. Ativa o controle <a href="/security#SEC-PII-001" className="text-emerald-500">SEC-PII-001</a>.</p>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Request Body (JSON)</h4>
            <pre className="bg-[#050b08] border border-slate-800 p-4 rounded-lg font-mono text-xs text-slate-300">
{`{
  "text": "string (required)"
}`}
            </pre>
          </div>
        </div>

        <div id="endpoint-inference" className="border border-slate-800 rounded-xl overflow-hidden">
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-emerald-400">POST</span>
            <span className="font-mono text-sm text-slate-200">/v1/inference</span>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-400 mb-4">Wrapper compatível com a API da OpenAI para roteamento seguro (Fail-Closed ativado: <a href="/security#SEC-FC-001" className="text-emerald-500">SEC-FC-001</a>).</p>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Request Body (JSON)</h4>
            <pre className="bg-[#050b08] border border-slate-800 p-4 rounded-lg font-mono text-xs text-slate-300">
{`{
  "model": "string (required)",
  "messages": [
    { "role": "string", "content": "string" }
  ]
}`}
            </pre>
          </div>
        </div>
        
        <div id="endpoint-evidence" className="border border-slate-800 rounded-xl overflow-hidden">
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-blue-400">GET</span>
            <span className="font-mono text-sm text-slate-200">/v1/evidence/&#123;hash&#125;</span>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-400 mb-4">Recupera a prova criptográfica LAZARUS (<a href="/security#SEC-LAZ-001" className="text-emerald-500">SEC-LAZ-001</a>) associada a uma transação.</p>
          </div>
        </div>
      </div>

      <DocsFooter />
    </div>
  );
}
