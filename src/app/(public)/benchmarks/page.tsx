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

  // SVG chart calcs
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

  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* AJUSTE 9 — Aviso de integridade */}
        <div className="mb-8 border border-emerald-500/20 bg-emerald-500/5 rounded-lg p-4 text-xs text-emerald-200/80 font-mono">
          <strong className="text-emerald-400">Aviso de Integridade:</strong> Esta página exibe apenas métricas medidas em ambiente real de execução. Métricas que ainda não puderam ser medidas em ambiente operacional permanecem sem valores até validação completa. Nenhum número publicado aqui é estimativa ou projeção.
        </div>

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

        {/* SEÇÃO 2 — Métricas Medidas (AJUSTES 2 e 3) */}
        <div className="mb-14" id="metodologia-detalhada">
          <h2 className="text-xl font-bold text-white mb-2">Métricas Medidas em Ambiente Operacional</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">Valores validados em ambiente real de execução. Reproduzíveis localmente.</p>
          
          <div className="space-y-6">
            {measured.map((m: any) => (
              <div key={m.id} className="bg-black/40 border border-emerald-900/30 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{m.name}</h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Medido
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{m.description}</p>
                    <div className="flex gap-8">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">p50</div>
                        <div className="text-xl font-mono text-emerald-300">{m.p50_ms}ms</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">p95</div>
                        <div className="text-xl font-mono text-emerald-300">{m.p95_ms}ms</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">p99</div>
                        <div className="text-2xl font-mono font-bold text-white">{m.p99_ms}ms</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 bg-black/60 rounded-xl p-4 border border-slate-800 text-xs">
                    <p className="font-bold text-slate-300 mb-2 border-b border-slate-800 pb-2">Metodologia</p>
                    <p className="text-slate-400 mb-3">{m.methodology_summary}</p>
                    <p className="text-slate-500 leading-relaxed">{m.methodology_detail}</p>
                  </div>
                </div>

                {/* Bloco de Identificação e Hashes */}
                <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-[11px]">
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Run ID</span>
                        <span className="font-mono text-emerald-400">{m.run_id}</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Release / Commit</span>
                        <span className="font-mono text-slate-300">v{m.release} ({m.commit_hash})</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Timestamp</span>
                        <span className="font-mono text-slate-300">{m.timestamp}</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Ambiente</span>
                        <span className="font-mono text-slate-300 text-right max-w-[200px] truncate" title={m.environment}>{m.environment}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Dataset</span>
                        <span className="font-mono text-slate-300">{m.dataset}</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Hash do Dataset</span>
                        <a href={`/verify/${m.hash_dataset}`} className="font-mono text-emerald-500 hover:text-emerald-400">{m.hash_dataset.substring(0, 16)}...</a>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Script / Runner</span>
                        <span className="font-mono text-slate-300">{m.script}</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/10 pb-1">
                        <span className="text-slate-500">Hash do Script</span>
                        <a href={`/verify/${m.hash_script}`} className="font-mono text-emerald-500 hover:text-emerald-400">{m.hash_script.substring(0, 16)}...</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 3 — Métricas em Staging */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2">Métricas Aguardando Ambiente Operacional</h2>
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

        {/* SEÇÃO 4 e 8 — Gráfico de Evolução e Evidências */}
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

          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full mb-8" preserveAspectRatio="xMidYMid meet">
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
            <polyline points={polyline} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <polygon points={`${padX},${padY + innerH} ${polyline} ${chartW - padX},${padY + innerH}`} fill="url(#areaGrad)" opacity="0.15" />
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            {points.map((p: any) => (
              <g key={p.release}>
                <circle cx={p.x} cy={p.y} r="5" fill="#10b981" stroke="#000" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" />
                <text x={p.x} y={p.y - 10} fontSize="10" fill="#34d399" textAnchor="middle" fontWeight="bold">{p.val}ms</text>
                <text x={p.x} y={chartH - 4} fontSize="10" fill="#4a6a5a" textAnchor="middle">{p.release}</text>
              </g>
            ))}
          </svg>

          {/* AJUSTE 8 - Tabela de evidências da evolução */}
          <div className="overflow-x-auto border border-emerald-900/20 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-black/50 text-[9px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-2">Release</th>
                  <th className="px-4 py-2 text-center">p99</th>
                  <th className="px-4 py-2">Benchmark Run ID</th>
                  <th className="px-4 py-2">Hash do Artefato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/10">
                {evolution.map((e: any) => (
                  <tr key={e.release} className="bg-black/20 hover:bg-emerald-900/10">
                    <td className="px-4 py-2 font-bold text-white">{e.release}</td>
                    <td className="px-4 py-2 text-center font-mono text-emerald-400">{e.p99_ms}ms</td>
                    <td className="px-4 py-2 font-mono text-slate-400">{e.run_id}</td>
                    <td className="px-4 py-2 font-mono text-slate-500">
                      <a href={`/verify/${e.hash_result}`} className="hover:text-emerald-400">{e.hash_result.substring(0, 16)}...</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEÇÃO 5 — SLO Público (AJUSTE 6) */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meta.slo?.map((s: any) => (
              <div key={s.metric_name} className="bg-black/40 border border-emerald-900/30 rounded-2xl p-6 flex flex-col justify-between">
                <div className="mb-4">
                  <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-1 font-bold">SLO PÚBLICO</p>
                  <h3 className="text-lg font-bold text-white">{s.metric_name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500 text-sm">Objetivo</span>
                    <span className="font-mono text-white text-sm font-bold">p99 &lt; {s.target_p99_ms}ms</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500 text-sm">Valor Atual</span>
                    <span className="font-mono text-emerald-400 text-sm font-bold">{s.current_value_ms}ms</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500 text-sm">Amostras (Run)</span>
                    <span className="font-mono text-slate-400 text-xs">{s.samples.toLocaleString()} — {s.run_id}</span>
                  </div>
                  <div className="pt-2">
                    <SloStatus current={s.current_value_ms} target={s.target_p99_ms} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 7 — Comparação com Categoria (AJUSTE 5 e 7) */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2">Comparação com a Categoria</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">Faixas de referência baseadas na literatura pública do setor. Nenhum concorrente é nomeado.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-5 py-3">Métrica & Categoria</th>
                  <th className="px-4 py-3 text-center">Certus</th>
                  <th className="px-4 py-3 text-center">Faixa da Categoria</th>
                  <th className="px-4 py-3 text-center">Fonte e Comparabilidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {category_comparison.map((c: any) => (
                  <tr key={c.metric} className="bg-black/20 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-white font-semibold">{c.metric}</div>
                      <div className="text-xs text-slate-500 mt-1">Ref: {c.category_name}</div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border border-${c.status_color}-500/30 text-${c.status_color}-400 bg-${c.status_color}-500/10`}>
                          {c.status_label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-mono text-emerald-400 font-bold align-top">{c.certus}</td>
                    <td className="px-4 py-4 text-center font-mono text-slate-400 align-top">{c.category_range}</td>
                    <td className="px-4 py-4 text-xs text-slate-500 align-top max-w-[250px]">
                      <p className="mb-1">{c.source}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[9px] uppercase tracking-widest font-bold">
                        Comparabilidade: {c.comparability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AJUSTE 1 — Seção Runner Local */}
        <div id="runner" className="mb-14 border border-emerald-900/30 bg-black/40 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Executar Medição Local (Harness)</h2>
          <p className="text-sm text-slate-400 mb-6">Todos os benchmarks do Certus Engine podem ser reproduzidos em ambiente local caso você tenha acesso ao SDK Privado. Utilizamos um harness em Rust integrado ao <code className="text-emerald-400 bg-emerald-900/20 px-1 rounded">wrk2</code>.</p>
          
          <div className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="text-slate-500 mb-2"># Clone o repositório de benchmarks</div>
            <div><span className="text-emerald-500">$</span> git clone https://github.com/EducatechAI/certus-engine-benchmarks.git</div>
            <div><span className="text-emerald-500">$</span> cd certus-engine-benchmarks</div>
            <div className="text-slate-500 mt-3 mb-2"># Execute a bateria de testes (requer wrk2 e Rust)</div>
            <div><span className="text-emerald-500">$</span> ./scripts/bench_all.sh --samples=10000 --export-json=resultados_locais.json</div>
          </div>
        </div>

        {/* SEÇÃO 8 — CTA (Ajuste 1) */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="#metodologia-detalhada" className="inline-block bg-emerald-600 text-black font-bold px-8 py-4 rounded-lg hover:bg-emerald-500 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Ver Metodologia Completa
          </a>
          <a href="#runner" className="inline-block bg-transparent border border-emerald-500/40 text-emerald-400 font-bold px-8 py-4 rounded-lg hover:bg-emerald-500/10 transition-colors uppercase tracking-widest text-sm">
            Executar Medição Local
          </a>
        </div>

      </div>
    </div>
  );
}
