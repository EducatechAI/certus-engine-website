import React from 'react';
import Link from 'next/link';

export default function DpoPersonaPage() {
  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 border-b border-emerald-900/30 pb-8 text-center md:text-left">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">
            [ CERTUS FOR COMPLIANCE ]
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Mapeamento Regulat�rio para <span className="text-emerald-500">DPOs</span>.
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            Uma infraestrutura institucional multi-jurisdi��o. O Certus Engine consolida mais de 40 leis e 10+ normas ISO em um �nico Middleware Determin�stico, permitindo auditorias baseadas em matem�tica (ZK-Proofs) ao inv�s de promessas de fornecedores.
          </p>
        </div>

        {/* Diferenciais Regulat�rios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-navy-900/30 border border-emerald-900/30 p-6 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <span className="text-emerald-400 font-bold">1</span>
            </div>
            <h3 className="text-white font-bold mb-2">Multi-jurisdi��o Simult�nea</h3>
            <p className="text-xs text-slate-400">Executa DPIA (GDPR), FRIA (EU AI Act) e RIPD (LGPD) em um �nico fluxo criptogr�fico integrado.</p>
          </div>
          <div className="bg-navy-900/30 border border-emerald-900/30 p-6 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <span className="text-emerald-400 font-bold">2</span>
            </div>
            <h3 className="text-white font-bold mb-2">Prova Sem Exposi��o (ZK-Proofs)</h3>
            <p className="text-xs text-slate-400">Permite auditar a conformidade de ponta a ponta sem nunca revelar os dados sens�veis subjacentes.</p>
          </div>
          <div className="bg-navy-900/30 border border-emerald-900/30 p-6 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <span className="text-emerald-400 font-bold">3</span>
            </div>
            <h3 className="text-white font-bold mb-2">Evid�ncia Admiss�vel (LAZARUS)</h3>
            <p className="text-xs text-slate-400">Gera prova criptogr�fica imut�vel (Hash Chain + Ed25519) com trilha de auditoria determinística.</p>
          </div>
        </div>

        {/* Leis e Normas Grid */}
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4">Cobertura Geogr�fica e Setorial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Brasil */}
          <div className="bg-navy-900/20 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">???? Brasil</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><strong className="text-emerald-400 block">LGPD (Lei 13.709/18)</strong>Arts. 12, 37, 39, 46, 48, 50</li>
              <li><strong className="text-emerald-400">Marco Civil da Internet</strong></li>
              <li><strong className="text-emerald-400">Resolu��o BACEN 4.893</strong></li>
              <li><strong className="text-emerald-400">LC 182/2021 (CPSI)</strong></li>
              <li><strong className="text-emerald-400">Lei 14.133/21 (Licita��es)</strong></li>
            </ul>
          </div>

          {/* EUA & Europa */}
          <div className="bg-navy-900/20 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">???? EUA & ???? Europa</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><strong className="text-emerald-400 block">GDPR</strong>Arts. 25, 32, 35</li>
              <li><strong className="text-emerald-400">EU AI Act (FRIA)</strong></li>
              <li><strong className="text-emerald-400">HIPAA (45 CFR � 164)</strong></li>
              <li><strong className="text-emerald-400">CCPA & SOX</strong></li>
              <li><strong className="text-emerald-400">NIST 800-53</strong></li>
            </ul>
          </div>

          {/* LATAM */}
          <div className="bg-navy-900/20 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">?? LATAM</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><strong className="text-emerald-400 block">???? Argentina</strong>Ley 25.326 / 27.741</li>
              <li><strong className="text-emerald-400 block">???? Col�mbia</strong>Ley 1581 / Decreto 1377</li>
              <li><strong className="text-emerald-400 block">???? Peru</strong>Ley 29733</li>
              <li><strong className="text-emerald-400 block">???? Chile & ???? M�xico</strong>Ley 21.719 / LFPDPPP</li>
            </ul>
          </div>

          {/* Padr�es ISO */}
          <div className="bg-navy-900/20 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">?? ISO Standards</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><strong className="text-emerald-400">Seguran�a:</strong> 27001, 27701, 27017, 27018</li>
              <li><strong className="text-emerald-400">IA & Riscos:</strong> 42001, 23894, 31000</li>
              <li><strong className="text-emerald-400">Continuidade:</strong> 22301</li>
              <li><strong className="text-emerald-400">Auditoria:</strong> 19011</li>
            </ul>
          </div>
        </div>

        {/* Matriz de Conformidade */}
        <div className="bg-navy-900/30 border border-slate-800 rounded-2xl overflow-hidden mb-16">
          <div className="p-6 border-b border-slate-800 bg-black/40">
            <h2 className="text-xl font-bold text-white">Matriz de Conformidade por Tier</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-navy-900/50 text-slate-300">
                <tr>
                  <th className="p-4 font-bold">Tier</th>
                  <th className="p-4 font-bold">Regulamenta��es Suportadas</th>
                  <th className="p-4 font-bold">Arquitetura Base</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-mono">Sovereign (R$ 79,90)</td>
                  <td className="p-4">IDE b�sica, para Devs Juniors e Pequenas Empresas</td>
                  <td className="p-4">Qualidade Certus Engine</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-mono">Command (R$ 499,90)</td>
                  <td className="p-4 text-emerald-400">LGPD completa, GDPR completo, HIPAA b�sico, BACEN 4.893</td>
                  <td className="p-4">Frota Apex, Middleware Rust, M�dulo Diamante</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-mono">Command + Enterprise</td>
                  <td className="p-4 text-emerald-400 font-bold">Todas + ISO 27001 path + SOC 2 Type II</td>
                  <td className="p-4">Implanta��o on-premise e Treinamento In-Company</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/contato" className="inline-block bg-emerald-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-emerald-500 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Acessar Documenta��o de Compliance
          </Link>
          <p className="text-xs text-slate-500 mt-4">
            Relat�rios DPIA/RIPD e laudos de auditoria de 3� parte dispon�veis sob NDA.
          </p>
        </div>
      </div>
    </div>
  );
}
