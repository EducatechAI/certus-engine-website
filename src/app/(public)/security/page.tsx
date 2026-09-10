import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Postura Pública de Segurança | Certus Engine',
  description: 'Threat Model, Incident Response, Bug Bounty e metodologias de teste da arquitetura Certus Engine.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="mb-14 border-b border-emerald-900/30 pb-10 text-center md:text-left">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">
            [ SECURITY POSTURE & TRANSPARENCY ]
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Postura Pública de <span className="text-emerald-500">Segurança</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Transparência radical sobre nossas defesas arquiteturais, respostas a incidentes e programas de validação contínua.
          </p>
        </div>

        <div className="space-y-12">
          {/* THREAT MODEL */}
          <section id="threat-model" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">01.</span> Threat Model (Modelo de Ameaças)
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              A arquitetura do Certus Engine opera sob a premissa de <strong>Zero Trust</strong>. Assumimos que o ambiente externo, incluindo as LLMs de destino, é hostil.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-widest">Exfiltração de PII</h3>
                <p className="text-xs text-slate-500">Mitigado pelo <strong>Wolfdog PII-Zero</strong> na borda. Nenhum dado sensível (CPF, cartões, nomes) trafega sem passar por criptografia determinística (FPE) antes do dispatch para LLMs de terceiros.</p>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-widest">Alucinação Injetada</h3>
                <p className="text-xs text-slate-500">Prevenido via <strong>Tribunal de CPUs</strong>. Resultados estocásticos são submetidos a consenso e validados matematicamente. Se houver divergência das regras de governança, o Circuit Breaker aplica o Fail-Closed.</p>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-widest">Adversarial Prompts</h3>
                <p className="text-xs text-slate-500">Defesa através do <strong>Sentinel Prime</strong>. O Master Prompt do Certus é imutável (Iron Header). Tentativas de envenenamento (Prompt Injection) são detectadas em &lt; 50ms e a sessão é aniquilada.</p>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-widest">Repúdio de Auditoria</h3>
                <p className="text-xs text-slate-500">Eliminado pelo <strong>LAZARUS Vault</strong>. Toda transação gera prova criptográfica Ed25519 e hashes em cadeia, impedindo adulteração retroativa de logs de auditoria.</p>
              </div>
            </div>
          </section>

          {/* INCIDENT RESPONSE */}
          <section id="incident-response" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">02.</span> Incident Response Policy
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Em caso de anomalia grave confirmada que afete o isolamento de dados ou a integridade determinística, nossa SLA de resposta imediata é ativada.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 border-b border-emerald-900/20 pb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T0</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Contenção Fail-Closed</h4>
                  <p className="text-xs text-slate-500 mt-1">O tráfego de saída do Gateway Rust é suspenso imediatamente. Nenhum pacote novo é despachado para a rede externa.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-emerald-900/20 pb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T+2h</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Notificação Ativa (DPO/CISO)</h4>
                  <p className="text-xs text-slate-500 mt-1">Contato direto com os diretores de segurança dos clientes afetados, fornecendo hashes preliminares da falha capturados no LAZARUS.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold shrink-0">T+48h</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Post-Mortem Criptográfico</h4>
                  <p className="text-xs text-slate-500 mt-1">Relatório forense validável matematicamente. Sem discursos; apenas a cadeia de eventos comprovável e os patches (CVEs internas) aplicados.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* BUG BOUNTY & DISCLOSURE */}
          <section id="bug-bounty" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
              <h2 className="text-xl font-bold text-white mb-3">Bug Bounty Program</h2>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Nós desafiamos a comunidade global de segurança a testar nossos invariants. Foco especial em contorno do <strong>PII-Zero</strong> e fugas determinísticas.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Critical (Bypass PII)</span>
                  <span className="text-emerald-400 font-mono font-bold">US$ 10,000+</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">High (LAZARUS Manipulation)</span>
                  <span className="text-emerald-400 font-mono font-bold">US$ 5,000</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Medium / Low</span>
                  <span className="text-slate-400 font-mono">Swag & Wall of Fame</span>
                </div>
              </div>
              <a href="mailto:security@certus.engine?subject=Bug%20Bounty%20Report" className="block text-center w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2 rounded text-xs uppercase tracking-widest font-bold hover:bg-emerald-500/20 transition">
                Submeter Vulnerabilidade
              </a>
            </div>

            <div className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Disclosure Policy</h2>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Adotamos o <strong>Coordinated Vulnerability Disclosure (CVD)</strong>.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4 mb-4">
                  <li>Não explore vulnerabilidades contra dados de clientes reais (apenas em ambientes de staging autorizados).</li>
                  <li>Dê-nos 90 dias razoáveis para correção antes da publicação do PoC (Proof of Concept).</li>
                  <li>Evite testes destrutivos de DDoS/Stress Test em nós de produção.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* TESTS METRICS & HISTORY */}
          <section id="testing-methods" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">03.</span> Metodologias de Teste
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Baterias Executadas</h3>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white text-sm font-bold">IDE Command (Integração)</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">91 Testes</span>
                    </div>
                    <p className="text-xs text-slate-500">Validação empírica contínua do Pipeline de integração, coerência de contexto e fail-closed state.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white text-sm font-bold">Módulo Diamante (Seg. Ofensiva)</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">18 Testes (Hard Level)</span>
                    </div>
                    <p className="text-xs text-slate-500">Isolamento governamental e resiliência a injeção cruzada na Frota APEX.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white text-sm font-bold">Stress BFT (Em Preparação)</h4>
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-mono">200 Testes Planejados</span>
                    </div>
                    <p className="text-xs text-slate-500">Tolerância a Faltas Bizantinas no Tribunal de CPUs simulando alucinação em massa.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Auditorias Públicas</h3>
                <div className="bg-emerald-950/10 border border-emerald-900/30 p-6 rounded-xl flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center">
                  <div className="text-4xl font-black text-white mb-2">135</div>
                  <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">Critérios de Auditoria Aceitos</p>
                  <p className="text-xs text-slate-500">Nossa infraestrutura é construída para a transparência. Aceitamos e documentamos auditorias baseadas em ISO 27001, SOC2 Type II (em roadmap) e metodologias OVAL/CVE padrão de mercado.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECURITY.TXT */}
          <section id="security-txt" className="bg-black/40 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-emerald-500">04.</span> security.txt
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Mantemos o padrão <code className="text-emerald-500 bg-emerald-900/30 px-1 rounded">RFC 9116</code> para relatórios de segurança. Você também pode acessar nosso arquivo em <a href="/.well-known/security.txt" className="text-emerald-400 hover:underline">/.well-known/security.txt</a>.
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
