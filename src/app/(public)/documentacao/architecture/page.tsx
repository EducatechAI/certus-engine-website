import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Architecture & Failure Modes | Certus Engine Docs' };

export default function ArchitecturePage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Architecture
      </div>
      
      <h1 id="overview" className="text-4xl font-black text-white mb-6">Architecture & Failure Modes</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        A arquitetura do Certus Engine foi desenhada como um <em>Reverse Proxy / Gateway Defensivo</em> que se posiciona entre sua infraestrutura e os provedores de LLM.
      </p>

      <h2 id="componentes" className="text-2xl font-bold text-white mt-12 mb-4">Componentes Core</h2>
      <div className="bg-[#050b08] border border-slate-800 rounded-lg p-6 font-mono text-[10px] sm:text-xs text-slate-400 overflow-x-auto mb-8 whitespace-pre">
{`[ SUA APLICAÇÃO ] ───(JSON)───> [ CERTUS GATEWAY ] ───(Sanitized JSON)───> [ LLM PROVIDER ]
                                     │
                             ┌───────┴───────┐
                             │ 1. PII Shield │ (SEC-PII-001)
                             │ 2. Sentinel   │ (SEC-PI-001) 
                             │ 3. LAZARUS    │ (SEC-LAZ-001)
                             └───────────────┘`}
      </div>

      <h2 id="failure-modes" className="text-2xl font-bold text-white mt-12 mb-4">Failure Modes (Modos de Falha)</h2>
      <p className="text-slate-400 mb-4">Sistemas complexos falham. A diferença do Certus é nossa abordagem determinística para essas falhas, operando sempre sob a diretriz de <a href="/security#SEC-FC-001" className="text-emerald-400 hover:underline">Fail-Closed</a>.</p>

      <div className="overflow-x-auto border border-slate-800 rounded-xl mb-12">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-4 py-3">Componente / Falha</th>
              <th className="px-4 py-3">Detecção</th>
              <th className="px-4 py-3">Ação (Automática)</th>
              <th className="px-4 py-3">Recuperação & Evidência</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="bg-black/20">
              <td className="px-4 py-3 font-semibold text-white">PII Shield<br/><span className="text-xs text-slate-500 font-normal">Falha na tokenização FPE</span></td>
              <td className="px-4 py-3 text-slate-400 text-xs">Validação cruzada de integridade de token pré-dispatch</td>
              <td className="px-4 py-3 text-red-400 text-xs font-bold">FAIL-CLOSED (HTTP 500)</td>
              <td className="px-4 py-3 text-slate-400 text-xs">Recuperação manual (retentativa com payload quebrado). Evidência salva no <a href="/security#SEC-LAZ-001" className="text-emerald-400">LAZARUS</a>.</td>
            </tr>
            <tr className="bg-black/20">
              <td className="px-4 py-3 font-semibold text-white">Gateway Network<br/><span className="text-xs text-slate-500 font-normal">Latência > SLO (50ms)</span></td>
              <td className="px-4 py-3 text-slate-400 text-xs">Monitoramento de RTT ativo</td>
              <td className="px-4 py-3 text-yellow-400 text-xs font-bold">CIRCUIT BREAKER OPEN</td>
              <td className="px-4 py-3 text-slate-400 text-xs">Failover para nó secundário (veja <Link href="/status" className="text-emerald-400">Status</Link>).</td>
            </tr>
            <tr className="bg-black/20">
              <td className="px-4 py-3 font-semibold text-white">Sentinel Prime<br/><span className="text-xs text-slate-500 font-normal">Detecção de Prompt Injection</span></td>
              <td className="px-4 py-3 text-slate-400 text-xs">Classificador heurístico + regras regex estritas</td>
              <td className="px-4 py-3 text-red-400 text-xs font-bold">REJECT (HTTP 403)</td>
              <td className="px-4 py-3 text-slate-400 text-xs">Sessão encerrada. IP sujeito a rate-limiting agressivo. Hash registrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="topologies" className="text-2xl font-bold text-white mt-12 mb-4">Deployment Topologies</h2>
      <ul className="space-y-4 text-slate-400 text-sm mb-12">
        <li><strong>SaaS Public (Default):</strong> API Multi-tenant isolada lógicamente via RBAC. Ideal para PMEs.</li>
        <li><strong>On-Premise (Enterprise):</strong> Binário Rust implantado no cluster Kubernetes do cliente. Zero dados trafegam pela internet pública até atingirem a LLM.</li>
        <li><strong>Air-Gapped:</strong> Para infraestruturas críticas (Governo/Defesa), implantado com LLMs locais (ex: Llama 3) sem placa de rede externa conectada.</li>
      </ul>

      <DocsFooter />
    </div>
  );
}
