import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata = {
  title: 'Benchmarks Públicos | Certus Engine',
  description: 'Métricas reais, metodologia reproduzível e evolução por release do Certus Engine. Transparência técnica verificável.',
};

function SloStatus({ current, target }: { current: number; target: number }) {
  const inside = current <= target;
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest ${
      inside
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
        : 'border-red-500/40 bg-red-500/10 text-red-400'
    }`}>
      <span className={`w-2 h-2 rounded-full ${inside ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
      {inside ? 'Dentro do SLO' : 'Fora do SLO'}
    </div>
  );
}

export default function BenchmarksPage() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'benchmarks.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const { meta, measured, pending, evolution, category_comparison } = data;

  const firstP99 = evolution[0].p99_ms;
  const lastP99 = evolution[evolution.length - 1].p99_ms;
  const improvement = (((firstP99 - lastP99) / firstP99) * 100).toFixed(1);

  // Simple SVG chart calculations
  const chartW = 600;
  const chartH = 160;
  const padX = 50;
  const padY = 20;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padY * 2;
  const maxVal = Math.max(...evolution.map((e: any) => e.p99_ms)) * 1.2;
  const minVal = 0;
  const points = evolution.map((e: any, i: number) => {
    const x = padX + (i / (evolution.length - 1)) * innerW;
    const y = padY + innerH - ((e.p99_ms - minVal) / (maxVal - minVal)) * innerH;
    return { x, y, release: e.release, val: e.p99_ms };
  });
  const polyline = points.map((p: any) => `${p.x},${p.y}`).join(' ');

  const measuredMax = Math.max(...measured.map((m: any) => m.p99_ms));
  const sloOk = measuredMax <= meta.slo_p99_ms;

  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* SEÇÃO 1 — Abertura */}
        <div className="mb-14 border-b border-emerald-900/30 pb-10">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">
            [ TRANSPARÊNCIA TÉCNICA VERIFICÁVEL ]
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Benchmarks <span className="text-emerald-500">Públicos</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mb-6">
            Métricas reais, metodologia reproduzível, evolução por release
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-500">
            <span>📅 Última medição: <span className="text-emerald-400">{new Date(meta.measured_at).toLocaleDateString('pt-BR')}</span></span>
            <span>🔖 Release: <span className="text-emerald-400">{meta.version}</span></span>
            <span>🧪 Amostras/métrica: <span className="text-emerald-400">{meta.samples_per_metric.toLocaleString()}</span></span>
          </div>
        </div>

        {/* SEÇÃO 2 — Métricas Medidas */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2">Métricas Medidas em Produção</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">Valores validados em ambiente real. Reproduzíveis localmente.</p>
          <div className="overflow-x-auto rounded-2xl border border-emerald-900/30">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-5 py-3">Métrica</th>
                  <th className="px-4 py-3 text-center">p50</th>
                  <th className="px-4 py-3 text-center">p95</th>
                  <th className="px-4 py-3 text-center">p99</th>
                  <th className="px-4 py-3 text-center">Amostras</th>
                  <th className="px-4 py-3">Metodologia</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20">
                {measured.map((m: any) => (
                  <tr key={m.id} className="bg-black/20 hover:bg-emerald-900/10 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold block">{m.name}</span>
                      <span className="text-slate-500 text-xs">{m.description}</span>
                    </td>
                    <td className="px-4 py-4 text-center font-mono text-emerald-300">{m.p50_ms}ms</td>
                    <td className="px-4 py-4 text-center font-mono text-emerald-300">{m.p95_ms}ms</td>
                    <td className="px-4 py-4 text-center font-mono text-white font-bold">{m.p99_ms}ms</td>
                    <td className="px-4 py-4 text-center font-mono text-slate-400">{m.samples.toLocaleString()}</td>
                    <td className="px-4 py-4 text-xs text-slate-500 max-w-[200px]">{m.methodology}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Medido
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEÇÃO 3 — Métricas em Staging */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2">Métricas Aguardando Produção</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">Publicadas apenas após validação em ambiente real. Nunca estimadas.</p>
          <div className="overflow-x-auto rounded-2xl border border-yellow-900/30">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-5 py-3">Métrica</th>
                  <th className="px-5 py-3">Metodologia Planejada</th>
                  <th className="px-4 py-3 text-center">p50 / p95 / p99</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-900/20">
                {pending.map((m: any) => (
                  <tr key={m.id} className="bg-black/20 hover:bg-yellow-900/5 transition-colors">
                    <td className="px-5 py-4 text-white font-semibold">{m.name}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{m.methodology_planned}</td>
                    <td className="px-4 py-4 text-center font-mono text-slate-600">— / — / —</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        Aguardando Medição
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEÇÃO 4 — Gráfico de Evolução */}
        <div className="mb-14 bg-black/40 border border-emerald-900/30 rounded-2xl p-8">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Evolução do p99 por Release</h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Inspeção PII-Zero (Wolfdog) — métrica canônica do Engine</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 text-center">
              <span className="text-2xl font-black text-emerald-400">-{improvement}%</span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Melhoria {evolution[0].release} → {evolution[evolution.length-1].release}</p>
            </div>
          </div>

          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = padY + innerH - frac * innerH;
              const val = (minVal + frac * (maxVal - minVal)).toFixed(0);
              return (
                <g key={frac}>
                  <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="#1a3a2a" strokeWidth="1" strokeDasharray="4,4" />
                  <text x={padX - 6} y={y + 4} fontSize="10" fill="#4a6a5a" textAnchor="end">{val}ms</text>
                </g>
              );
            })}
            {/* SLO line */}
            {(() => {
              const sloY = padY + innerH - ((meta.slo_p99_ms - minVal) / (maxVal - minVal)) * innerH;
              return (
                <g>
                  <line x1={padX} y1={sloY} x2={chartW - padX} y2={sloY} stroke="#eab308" strokeWidth="1" strokeDasharray="6,3" />
                  <text x={chartW - padX + 4} y={sloY + 4} fontSize="9" fill="#eab308">SLO</text>
                </g>
              );
            })()}
            {/* Polyline */}
            <polyline points={polyline} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {/* Area fill */}
            <polygon points={`${padX},${padY + innerH} ${polyline} ${chartW - padX},${padY + innerH}`} fill="url(#areaGrad)" opacity="0.15" />
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Data points + labels */}
            {points.map((p: any) => (
              <g key={p.release}>
                <circle cx={p.x} cy={p.y} r="5" fill="#10b981" stroke="#000" strokeWidth="2" />
                <text x={p.x} y={p.y - 10} fontSize="10" fill="#34d399" textAnchor="middle" fontWeight="bold">{p.val}ms</text>
                <text x={p.x} y={chartH - 4} fontSize="10" fill="#4a6a5a" textAnchor="middle">{p.release}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* SEÇÃO 5 — SLO Público */}
        <div className="mb-14">
          <div className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">SLO Público Declarado</h2>
              <p className="text-xs text-slate-500 font-mono">Objetivo de nível de serviço público verificável</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="font-mono text-slate-300 text-sm">
                Objetivo: <span className="text-white font-bold">p99 &lt; {meta.slo_p99_ms}ms</span>
              </p>
              <p className="font-mono text-slate-400 text-sm">
                Valor atual: <span className="text-white font-bold">{measuredMax}ms</span>
              </p>
              <SloStatus current={measuredMax} target={meta.slo_p99_ms} />
            </div>
          </div>
        </div>

        {/* SEÇÃO 6 — Metodologia */}
        <div className="mb-14 border-l-4 border-emerald-500 pl-8">
          <h2 className="text-xl font-bold text-white mb-4">Metodologia</h2>
          <dl className="space-y-4 text-sm text-slate-400">
            <div>
              <dt className="text-white font-semibold text-xs uppercase tracking-widest mb-1">Ambiente</dt>
              <dd className="font-mono">{meta.environment}</dd>
            </div>
            <div>
              <dt className="text-white font-semibold text-xs uppercase tracking-widest mb-1">Ferramentas</dt>
              <dd className="font-mono">{meta.tool}</dd>
            </div>
            <div>
              <dt className="text-white font-semibold text-xs uppercase tracking-widest mb-1">Amostras por Medição</dt>
              <dd className="font-mono">{meta.samples_per_metric.toLocaleString()} chamadas por métrica</dd>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <dt className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1">⚠ Aviso de Transparência</dt>
              <dd className="text-yellow-200/70">Métricas em staging são publicadas <strong>apenas após validação em ambiente de produção</strong>. Nunca são estimadas ou interpoladas. Valores sem medição real permanecem com badge amarelo até validação.</dd>
            </div>
          </dl>
        </div>

        {/* SEÇÃO 7 — Comparação com Categoria */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2">Comparação com a Categoria</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">Faixas da categoria baseadas em literatura pública do setor. Nenhum concorrente específico é nomeado.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-5 py-3">Métrica</th>
                  <th className="px-4 py-3 text-center">Certus</th>
                  <th className="px-4 py-3 text-center">Faixa da Categoria</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {category_comparison.map((c: any) => (
                  <tr key={c.metric} className="bg-black/20 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4 text-white font-semibold">{c.metric}</td>
                    <td className="px-4 py-4 text-center font-mono text-emerald-400 font-bold">{c.certus}</td>
                    <td className="px-4 py-4 text-center font-mono text-slate-500">{c.category_range}</td>
                    <td className="px-4 py-4 text-center">
                      {c.status === 'above' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                          ↑ Acima
                        </span>
                      )}
                      {c.status === 'expected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                          = Esperado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEÇÃO 8 — CTA */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/documentacao" className="inline-block bg-emerald-600 text-black font-bold px-8 py-4 rounded-lg hover:bg-emerald-500 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Ver Metodologia Completa
          </Link>
          <Link href="/documentacao#reproducir" className="inline-block bg-transparent border border-emerald-500/40 text-emerald-400 font-bold px-8 py-4 rounded-lg hover:bg-emerald-500/10 transition-colors uppercase tracking-widest text-sm">
            Executar Medição Local
          </Link>
        </div>

      </div>
    </div>
  );
}
