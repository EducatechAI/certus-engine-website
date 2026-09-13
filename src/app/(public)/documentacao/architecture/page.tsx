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

            <h2 id="frota-apex" className="text-2xl font-bold text-white mt-12 mb-4">Frota APEX — Defesa Ativa</h2>
      <p className="text-slate-400 mb-6">
        O núcleo defensivo do Certus Engine é composto pela <strong>Frota APEX</strong>, um exército de 14 agentes especializados em orquestração, governança e segurança em tempo real.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">1. Wolfdog</h4>
          <p className="text-xs text-slate-400">Persistência de kernel (watchdog) + sanitização PII-Zero (<Link href="/security#SEC-PII-001" className="text-emerald-500 hover:underline">SEC-PII-001</Link>).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">2. Kangal</h4>
          <p className="text-xs text-slate-400">Interceptação de rede (WFP/iptables) e bloqueio heurístico de PII na borda.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">3. Pitbull</h4>
          <p className="text-xs text-slate-400">Hardening ativo (ETW) e encerramento implacável de processos maliciosos.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">4. Sentinel Prime</h4>
          <p className="text-xs text-slate-400">Análise estrutural de padrões de ataque e coordenação de respostas.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">5. Sentinel Defense</h4>
          <p className="text-xs text-slate-400">Defesa ativa e mitigação (detalhes sob NDA).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">6. LAZARUS Auditor</h4>
          <p className="text-xs text-slate-400">Auditoria imutável e cadeia de evidência criptográfica (<Link href="/security#SEC-LAZ-001" className="text-emerald-500 hover:underline">SEC-LAZ-001</Link>).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">7. GHOST Recon</h4>
          <p className="text-xs text-slate-400">Mapeamento furtivo e análise silenciosa de infraestrutura.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">8. FORGE Exploit</h4>
          <p className="text-xs text-slate-400">Laboratório de ataque ético diário para fortalecimento contínuo.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">9. CIVITAS-GOVERNOR</h4>
          <p className="text-xs text-slate-400">Governança cívica e regulatória (detalhes sob NDA).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">10. ZK-SOVEREIGN-GUARD</h4>
          <p className="text-xs text-slate-400">Guarda de provas Zero-Knowledge e arquitetura ZK-ID.</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">11. EDUCATECH-BUILDER</h4>
          <p className="text-xs text-slate-400">Construção e fluxos de educação técnica (detalhes sob NDA).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">12. ANALYST Deep</h4>
          <p className="text-xs text-slate-400">Análise profunda e forense (detalhes sob NDA).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">13. SCRIBE Intel</h4>
          <p className="text-xs text-slate-400">Inteligência documental estruturada (detalhes sob NDA).</p>
        </div>
        <div className="p-4 bg-black/40 border border-slate-800 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-1">14. GUARDIAN Ethical</h4>
          <p className="text-xs text-slate-400">Guarda ética e compliance moral (detalhes sob NDA).</p>
        </div>
      </div>
      
      <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-6 mb-6">
        <h4 className="text-emerald-400 font-bold mb-2">Presa Canário (Root of Trust)</h4>
        <p className="text-sm text-slate-300">
          O <strong>Presa Canário</strong> é um módulo de integridade de filesystem, distinto da Frota APEX. Sua função exclusiva é atuar como cão de guarda da Raiz de Confiança (Root of Trust) do sistema de arquivos, impedindo adulterações de estado persistente.
        </p>
      </div>

      <p className="text-xs text-slate-500 mb-12 p-4 border-l-2 border-emerald-500 bg-emerald-950/10">
        <strong>Disponibilidade:</strong> A Frota APEX está disponível nos níveis <strong>IDE Command Standard</strong> (deploy compartilhado) e <strong>Enterprise/Government</strong> (deploy dedicado). Para agentes marcados <em>'sob NDA'</em>, detalhes completos são fornecidos após assinatura de acordo de confidencialidade (exclusivo no nível Enterprise/Government).
      </p>

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
