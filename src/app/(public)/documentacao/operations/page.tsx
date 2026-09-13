import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Operations & Runbook | Certus Engine Docs' };

export default function OpsPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Operations
      </div>
      
      <h1 id="ops" className="text-4xl font-black text-white mb-6">Operations & Runbook</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Procedimentos de SRE, observabilidade e resposta a incidentes (integrado à nossa postura pública em <a href="/security#incident-response" className="text-emerald-500">/security</a>).
      </p>

            <h2 id="support-levels" className="text-2xl font-bold text-white mt-12 mb-4">Suporte e SLA por Nível</h2>
      <p className="text-slate-400 mb-6">O nível de suporte e SLA depende da modalidade do produto contratado.</p>

      <div className="overflow-x-auto border border-slate-800 rounded-xl mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-4 py-3">Nível</th>
              <th className="px-4 py-3">Horário</th>
              <th className="px-4 py-3">Canal</th>
              <th className="px-4 py-3">SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="bg-black/20">
              <td className="px-4 py-3 font-semibold text-emerald-400">IDE Sovereign</td>
              <td className="px-4 py-3 text-slate-300">comunidade</td>
              <td className="px-4 py-3 text-slate-300">docs + forum</td>
              <td className="px-4 py-3 text-slate-400">best-effort</td>
            </tr>
            <tr className="bg-black/20">
              <td className="px-4 py-3 font-semibold text-emerald-400">IDE Command Standard</td>
              <td className="px-4 py-3 text-slate-300">8h-18h BRT</td>
              <td className="px-4 py-3 text-slate-300">email + chat</td>
              <td className="px-4 py-3 text-slate-400">best-effort</td>
            </tr>
            <tr className="bg-emerald-950/20">
              <td className="px-4 py-3 font-semibold text-blue-400">Enterprise/Government</td>
              <td className="px-4 py-3 text-white font-bold">24/7</td>
              <td className="px-4 py-3 text-white">dedicado + DPO/CISO</td>
              <td className="px-4 py-3 text-emerald-400 font-bold">99,9% + trein.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-red-950/20 border-l-4 border-red-500 p-4 mb-12 rounded-r-lg">
        <p className="text-sm text-red-200 font-semibold uppercase tracking-wide mb-1">Nota Crítica de Serviço</p>
        <p className="text-xs text-red-300/80">
          Suporte 24/7, treinamento exclusivo e DPO/CISO dedicado são benefícios <strong>RESTRITOS</strong> ao nível Enterprise/Government. Não disponíveis em Sovereign ou Command Standard.
        </p>
      </div>

      <h2 id="monitoring" className="text-2xl font-bold text-white mt-12 mb-4">Monitoring</h2>
      <p className="text-slate-400 mb-4">O Certus exporta métricas Prometheus nativamente na porta <code>:9090/metrics</code> quando em deploy On-Premise. Métricas chave:</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400 mb-12">
        <li><code>certus_pii_detected_total</code></li>
        <li><code>certus_fail_closed_events_total</code></li>
        <li><code>certus_inference_latency_ms</code> (acompanhe os <a href="/benchmarks" className="text-emerald-500">benchmarks</a>)</li>
      </ul>

      <h2 id="runbook" className="text-2xl font-bold text-white mt-12 mb-4">Incident Runbook (T0)</h2>
      <div className="bg-black/40 border border-red-900/30 rounded-xl p-6 mb-12">
        <h3 className="font-bold text-red-400 mb-2">Evento: Circuit Breaker Aberto (SEC-FC-001)</h3>
        <p className="text-sm text-slate-300 mb-4">Quando a latência da LLM sobe ou ocorre anomalia de contexto.</p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
          1. Tráfego é suspenso (HTTP 503 Service Unavailable).<br/>
          2. Alerta severidade CRITICAL no PagerDuty.<br/>
          3. Analisar logs no LAZARUS via `/v1/audit`.<br/>
          4. Se LLM indisponível, chavear fallback policy.
        </div>
      </div>

      <DocsFooter />
    </div>
  );
}
