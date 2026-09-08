import React from 'react';
import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
          Trust Center & <span className="text-emerald-500">Legal</span>
        </h1>
        <p className="text-sm text-slate-400 mb-12 max-w-2xl">
          Transparência, conformidade e governança. Todas as informações institucionais e regulatórias da Educatech AI Digital Sovereign Ltda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Dados Corporativos */}
          <div className="bg-navy-900/40 border border-emerald-900/30 p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Identificação Corporativa
            </h2>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><strong className="text-white">Razão Social:</strong> Educatech AI Digital Sovereign Ltda.</li>
              <li><strong className="text-white">CNPJ:</strong> 67.747.504/0001-40</li>
              <li><strong className="text-white">Insc. Municipal (C.C.M):</strong> 0.390.527-6</li>
              <li><strong className="text-white">Endereço:</strong> Avenida Brig. Faria Lima, 1811 - Conj 115</li>
              <li><strong className="text-white">Bairro:</strong> Jardim Paulistano, São Paulo - SP</li>
              <li><strong className="text-white">CEP:</strong> 01452-001</li>
              <li><strong className="text-white">Jurisdição de Operação:</strong> LATAM</li>
            </ul>
          </div>

          {/* Dados DPO */}
          <div className="bg-navy-900/40 border border-emerald-900/30 p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Privacidade de Dados (LGPD)
            </h2>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><strong className="text-white">Papel Legal:</strong> Controlador de Dados (Data Controller)</li>
              <li><strong className="text-white">DPO Nomeado:</strong> Paulino Gerlack</li>
              <li><strong className="text-white">Telefone DPO:</strong> +55 (93) 98427-9211</li>
              <li><strong className="text-white">Contato Direcionado:</strong> Canal do Titular ativo</li>
            </ul>
          </div>
        </div>

        {/* Links de Políticas */}
        <h2 className="text-2xl font-bold text-white mb-6">Documentos Regulatórios & Compliance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Termos de Uso', href: '/termos' },
            { title: 'Política de Privacidade', href: '/privacidade' },
            { title: 'Política de Cookies', href: '/cookies' },
            { title: 'Lista de Subprocessadores', href: '/subprocessadores' },
            { title: 'SLA por Tier', href: '/sla' },
            { title: 'Canal do Titular', href: '/contato' }
          ].map(doc => (
            <Link key={doc.title} href={doc.href} className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-colors">
              <span className="text-sm font-semibold text-emerald-400 block mb-1">{doc.title}</span>
              <span className="text-xs text-slate-500">Acessar documento →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
