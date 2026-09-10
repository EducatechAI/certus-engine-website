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
