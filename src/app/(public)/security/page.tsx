import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata = {
  title: 'Postura Publica de Seguranca | Certus Engine',
  description: 'Threat Model, Incident Response, Bug Bounty, SEC-IDs verificaveis e metodologias de teste da arquitetura Certus Engine.',
};

function ResultBadge({ result }: { result: string | null }) {
  if (!result) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-bold uppercase tracking-widest">Aguardando</span>;
  return result === 'PASS'
    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>PASS</span>
    : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>FAIL</span>;
}

export default function SecurityPage() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'security.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const { integrity_notice, controls, test_summary, audit_matrix_summary, certifications } = data;

  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* AJUSTE 10 — Aviso de Integridade */}
        <div className="mb-8 border border-emerald-500/20 bg-emerald-500/5 rounded-lg p-4 text-xs text-emerald-200/80 font-mono">
          <strong className="text-emerald-400">Aviso de Integridade:</strong> {integrity_notice}
        </div>

        <div className="mb-14 border-b border-emerald-900/30 pb-10">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">[ SECURITY POSTURE & TRANSPARENCY ]</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Postura Publica de <span className="text-emerald-500">Seguranca</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Transparencia radical sobre nossas defesas arquiteturais, respostas a incidentes e programas de validacao continua.
          </p>
        </div>

        <div className="space-y-12">

          {/* AJUSTE 2 e 8 — SEC-IDs com Evidence Registry */}
          <section id="controls">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-emerald-500">01.</span> Controles de Seguranca (Evidence Registry)
            </h2>
            <p className="text-xs text-slate-500 mb-6 font-mono">Cada controle possui identificador unico, invariante formal, testes associados e evidencia verificavel.</p>
            <div className="space-y-6">
              {controls.map((c: any) => (
                <div key={c.sec_id} className="bg-black/40 border border-emerald-900/30 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">{c.sec_id}</span>
                    <h3 className="text-white font-bold">{c.name}</h3>
                    <ResultBadge result={c.last_result} />
                  </div>
                  <p className="text-xs font-mono text-slate-500 italic mb-3">Invariante: "{c.invariant}"</p>
                  <p className="text-sm text-slate-400 mb-4">{c.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                    <div className="bg-black/60 rounded-xl p-4 border border-slate-800 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-500">Testes Associados</span>
                        <span className="font-mono text-slate-300">{c.tests.join(', ')}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-500">Ultima Validacao</span>
                        <span className="font-mono text-slate-300">{c.last_validated}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-500">Build</span>
                        <span className="font-mono text-emerald-400">{c.build}</span>
                      </div>
                      {c.hash_evidence && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Hash Evidencia</span>
                          <a href={`/verify/${c.hash_evidence}`} className="font-mono text-emerald-500 hover:text-emerald-400">{c.hash_evidence}...</a>
                        </div>
                      )}
                    </div>

                    <div className="bg-black/60 rounded-xl p-4 border border-slate-800 space-y-2">
                      {c.run_id === 'aguardando-benchmark' ? (
                        <div className="flex items-center gap-2 text-yellow-400">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="text-xs font-mono">Aguardando benchmark em ambiente operacional</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span className="text-slate-500">Run ID</span>
                            <span className="font-mono text-slate-300 text-right">{c.run_id}</span>
                          </div>
                          {c.benchmark_p99 && (
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-500">p99 Medido</span>
                              <span className="font-mono text-emerald-400 font-bold">{c.benchmark_p99}ms</span>
                            </div>
                          )}
                          {c.benchmark_samples && (
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-500">Amostras</span>
                              <span className="font-mono text-slate-300">{c.benchmark_samples.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ambiente</span>
                            <span className="font-mono text-slate-400 text-right text-[10px] max-w-[160px] truncate" title={c.benchmark_env}>{c.benchmark_env}</span>
                          </div>
                        </>
                      )}
                      {c.benchmark_link && (
                        <Link href={c.benchmark_link} className="mt-2 block text-center text-[10px] text-emerald-500 hover:text-emerald-400 border border-emerald-900/30 rounded px-3 py-1 hover:bg-emerald-500/5">
                          Ver Medicao em /benchmarks
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AJUSTE 1 — Threat Model (linguagem corrigida) */}
          <section id="threat-model" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">02.</span> Threat Model
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              A arquitetura opera sob <strong>Zero Trust</strong>. O ambiente externo — incluindo as LLMs de destino — e tratado como hostil ate prova contraria.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'SEC-PII-001', title: 'Exfiltracao de PII', text: 'Mitigado pelo Wolfdog PII-Zero na borda. Nenhum dado sensivel trafega sem passar por criptografia deterministica (FPE) antes do dispatch para LLMs de terceiros.', color: 'emerald' },
                { id: 'SEC-PI-001', title: 'Alucinacao Injetada', text: 'Prevenido via Tribunal de CPUs. Resultados estocasticos sao submetidos a consenso BFT. Se houver divergencia das regras de governanca, o Circuit Breaker bloqueia o fluxo de saida.', color: 'emerald' },
                { id: 'SEC-FC-001', title: 'Adversarial Prompts', text: 'O Master Prompt do Certus e imutavel (Iron Header). Tentativas de envenenamento (Prompt Injection) sao classificadas pelo Sentinel Prime e a sessao e encerrada e o fluxo e bloqueado.', color: 'emerald' },
                { id: 'SEC-LAZ-001', title: 'Repudio de Auditoria', text: 'Todo log e registrado com Ed25519 e cadeia de hashes SHA-256. Alteracoes retroativas sao detectaveis mediante verificacao da cadeia criptografica — tornando adulteracoes identificaveis.', color: 'emerald' },
              ].map(item => (
                <div key={item.id} className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] bg-emerald-900/30 text-emerald-500 border border-emerald-800 px-1.5 py-0.5 rounded">{item.id}</span>
                    <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AJUSTE 5 — Incident Response */}
          <section id="incident-response" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">03.</span> Incident Response Policy
            </h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-4 border-b border-emerald-900/20 pb-4">
                <span className="w-10 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T0</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Contencao Fail-Closed</h4>
                  <p className="text-xs text-slate-500 mt-1">O trafego de saida do Gateway Rust e suspenso. Nenhum pacote novo e despachado para a rede externa. Controle via <span className="font-mono text-emerald-500">SEC-FC-001</span>.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-emerald-900/20 pb-4">
                <span className="w-10 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T+2h</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Comunicacao Operacional (DPO/CISO)</h4>
                  <p className="text-xs text-slate-500 mt-1">Contato com os diretores de seguranca dos clientes afetados e fornecimento de hashes preliminares para verificacao independente.</p>
                  <div className="mt-3 bg-yellow-950/20 border border-yellow-900/20 rounded p-3 text-xs text-yellow-200/70">
                    <strong className="text-yellow-400">Nota:</strong> Comunicacoes regulatorias (ANPD, autoridades competentes) seguem os prazos legais especificos de cada jurisdicao, conforme legislacao aplicavel — incluindo o prazo de 3 dias uteis previsto no Art. 48 da LGPD.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T+48h</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Post-Mortem Criptografico</h4>
                  <p className="text-xs text-slate-500 mt-1">Relatorio forense validavel matematicamente com a cadeia de eventos comprovavel extraida do LAZARUS Vault e os patches (CVEs internas) aplicados.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* AJUSTE 4 — Bug Bounty com escopo detalhado */}
          <section id="bug-bounty" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">04.</span> Bug Bounty Program
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">In Scope</h3>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li>certusengine.ia.br (producao)</li>
                    <li>API publica (api.certusengine.ia.br)</li>
                    <li>Certus Studio (studio.certusengine.ia.br)</li>
                    <li>Componentes publicos documentados em /docs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-2">Out of Scope</h3>
                  <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                    <li>Infraestrutura de clientes</li>
                    <li>Provedores de LLM (OpenAI, Anthropic, Google, etc.)</li>
                    <li>Servicos de terceiros integrados via BYOK</li>
                    <li>Ataques DDoS / stress destrutivo</li>
                    <li>Engenharia social contra funcionarios</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white mb-2">Recompensas (CVSS 3.1)</h3>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Critical (9.0-10)</span>
                  <span className="text-emerald-400 font-mono font-bold">US$ 10.000+</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">High (7.0-8.9)</span>
                  <span className="text-emerald-400 font-mono font-bold">US$ 5.000</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Medium (4.0-6.9)</span>
                  <span className="text-slate-400 font-mono">US$ 500</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Low (0.1-3.9)</span>
                  <span className="text-slate-500 font-mono">Swag & Hall of Fame</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs text-slate-500 mb-4 space-y-1">
              <p><strong className="text-slate-300">Reproducao:</strong> Toda submissao deve incluir PoC reproduzivel.</p>
              <p><strong className="text-slate-300">Duplicatas:</strong> Primeiro pesquisador a reportar recebe credito.</p>
              <p><strong className="text-slate-300">Disclosure:</strong> 90 dias para corrrecao antes de publicacao do PoC (Coordinated Vulnerability Disclosure).</p>
              <p><strong className="text-slate-300">Pagamento:</strong> PIX (BR) ou USDC (global) — processado em ate 30 dias apos verificacao.</p>
            </div>
            <a href="mailto:security@certus.engine?subject=Bug%20Bounty%20Report" className="block text-center w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3 rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-emerald-500/20 transition">
              Submeter Vulnerabilidade
            </a>
          </section>

          {/* AJUSTE 7 — Testes Verificaveis */}
          <section id="testing-methods" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">05.</span> Metodologias de Teste
            </h2>
            <div className="space-y-6">
              {Object.values(test_summary as Record<string, any>).map((suite: any) => (
                <div key={suite.label} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <h3 className="text-white font-bold">{suite.label}</h3>
                    <div className="flex items-center gap-3">
                      {suite.status === 'executed' ? (
                        <>
                          <span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900">{suite.total} testes</span>
                          <span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900">{suite.pass} PASS</span>
                          {suite.last_run && <span className="font-mono text-xs text-slate-500">{suite.last_run}</span>}
                        </>
                      ) : (
                        <span className="font-mono text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-900">{suite.total} planejados — em preparacao</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{suite.coverage_note}</p>
                  {suite.categories && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-[9px] uppercase tracking-widest text-slate-600">
                            <th className="text-left pb-2 pr-4">Categoria</th>
                            <th className="text-center pb-2 pr-4">Total</th>
                            <th className="text-center pb-2">PASS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {suite.categories.map((cat: any) => (
                            <tr key={cat.name}>
                              <td className="py-1.5 pr-4 text-slate-400">{cat.name}</td>
                              <td className="py-1.5 pr-4 text-center font-mono text-slate-400">{cat.count}</td>
                              <td className="py-1.5 text-center font-mono text-emerald-400">{cat.pass}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {suite.build && (
                    <p className="mt-3 font-mono text-[10px] text-slate-600">Build: {suite.build}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* AJUSTE 6 — Matriz de Criterios */}
          <section id="audit-matrix" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-emerald-500">06.</span> Criterios de Auditoria Aceitos
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-black text-white">135</div>
              <div>
                <p className="text-emerald-400 font-bold text-sm">Criterios Validados</p>
                <p className="text-xs text-slate-500 mt-1">Resumo por categoria. Matriz completa disponivel sob NDA para auditores autorizados.</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Categoria</th>
                    <th className="px-4 py-3 text-center">Criterios</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {audit_matrix_summary.map((row: any) => (
                    <tr key={row.category} className="bg-black/20 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-slate-300">{row.category}</td>
                      <td className="px-4 py-3 text-center font-mono text-white font-bold">{row.count}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Validado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* AJUSTE 9 — Certificacoes */}
          <section id="certifications" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">07.</span> Certificacoes e Frameworks
            </h2>
            <div className="space-y-4">
              {certifications.map((cert: any) => (
                <div key={cert.name} className="flex items-start gap-4 border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border shrink-0 ${
                    cert.status === 'aligned' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                    cert.status === 'planned' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}>
                    {cert.status === 'aligned' ? 'Alinhado' : cert.status === 'planned' ? 'Planejado' : 'Certificado'}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{cert.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{cert.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* security.txt */}
          <section id="security-txt" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">08.</span> security.txt
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Padrao <code className="text-emerald-500 bg-emerald-900/30 px-1 rounded">RFC 9116</code>. Tambem disponivel em <a href="/.well-known/security.txt" className="text-emerald-400 hover:underline">/.well-known/security.txt</a>.
            </p>
            <pre className="bg-[#050b08] border border-slate-800 p-6 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
{`Contact: mailto:security@certus.engine
Contact: https://certusengine.ia.br/security#bug-bounty
Expires: 2027-12-31T23:59:59.000Z
Acknowledgments: https://certusengine.ia.br/security/hall-of-fame
Preferred-Languages: pt-BR, en, es
Canonical: https://certusengine.ia.br/.well-known/security.txt
Policy: https://certusengine.ia.br/security#disclosure-policy`}
            </pre>
          </section>

        </div>
      </div>
    </div>
  );
}
