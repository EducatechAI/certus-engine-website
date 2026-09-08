import React from 'react';
import Link from 'next/link';

export default function CisoPersonaPage() {
  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402]"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 border-b border-emerald-900/30 pb-8">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">
            [ CERTUS FOR ENTERPRISE ]
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Arquitetura para <span className="text-emerald-500">CISOs</span>.
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            Neutralize a superfície de risco introduzida pela Inteligência Artificial. O Certus Engine é um Middleware de Governança (Zero-Trust) desenhado para enforcing rigoroso de DLP, mitigação de ameaças OWASP para LLMs e resposta a incidentes matematicamente auditável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Threat Model */}
          <div className="bg-navy-900/30 border border-emerald-900/20 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Threat Model & Mitigação
            </h2>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><strong className="text-emerald-400">PII Exfiltration (Prompt Injection):</strong> Interceptado na borda pelo <span className="text-white">PII-Zero 2.0</span>. Dados confidenciais são anonimizados em milissegundos antes de atingirem a rede da LLM.</li>
              <li><strong className="text-emerald-400">Model Denial of Service:</strong> Mitigado via <span className="text-white">Dynamic Token Controller</span>. Interrupção fail-closed em loops infinitos ou consumos anômalos.</li>
              <li><strong className="text-emerald-400">Data Poisoning:</strong> Validação em <span className="text-white">Cross-LLM Consensus</span> (Tribunal de CPUs). Outputs tóxicos são rejeitados antes da entrega.</li>
            </ul>
          </div>

          {/* Incident Response */}
          <div className="bg-navy-900/30 border border-emerald-900/20 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Incident Response (LAZARUS)
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Notificação à ANPD em horas, com evidências forenses inquestionáveis.
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>✓ Auditoria Imutável via Hash Chain (SHA-256)</li>
              <li>✓ Assinatura Digital de Eventos (Ed25519)</li>
              <li>✓ Isolamento Automático de Anomalias via Guardiões (Kangal)</li>
              <li>✓ Exportação imediata para Dossiê de Cumprimento do Art. 48 (LGPD)</li>
            </ul>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-gradient-to-r from-emerald-900/10 to-transparent border-l-4 border-emerald-500 p-8 rounded-r-2xl mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Integration Guide & Redução de Risco</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-3xl">
            A arquitetura Certus opera como um proxy reverso (API Gateway) agnóstico em relação à nuvem subjacente, aplicando segurança antes do roteamento BYOK (Bring Your Own Key).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-bold text-sm mb-2">1. Configuração BYOK</h3>
              <p className="text-xs text-slate-500">Sem lock-in de provedor. Você conecta suas próprias chaves (Azure, AWS, OpenRouter) em nosso cofre criptografado localmente.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-2">2. Fail-Closed Invariante</h3>
              <p className="text-xs text-slate-500">Se o linter de borda falhar ou uma política de DLP for violada, o gateway adota drop-policy imediata. Nenhum dado vaza silenciosamente.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-2">3. Zero Telemetry</h3>
              <p className="text-xs text-slate-500">A Educatech AI não espelha, não treina e não armazena payloads. Nossa arquitetura é air-gapped logicamente para os dados em trânsito.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/pricing" className="inline-block bg-emerald-600 text-black font-bold px-8 py-4 rounded-lg hover:bg-emerald-500 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Agendar Due Diligence Técnica
          </Link>
          <p className="text-xs text-slate-500 mt-4">
            Acesso root ao laboratório PoC fornecido após assinatura de NDA mútuo.
          </p>
        </div>
      </div>
    </div>
  );
}
