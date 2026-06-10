'use client'

import React from 'react'
import Link from 'next/link'

const DOCS = [
  { group: 'Início', items: ['O que é Certus?', 'Guia de Inicialização', 'Manifesto Soberano'] },
  { group: 'Arquitetura', items: ['Tribunal de CPUs', 'Protocolo Tier A+', 'PII-Zero Shield'] },
  { group: 'API & Studio', items: ['Integração de SDK', 'Comandos de Governança', 'Logs de Auditoria'] },
]

export default function DocumentacaoPage() {
  return (
    <main className="relative z-10 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-64 space-y-8">
           {DOCS.map(group => (
             <div key={group.group}>
                <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4">{group.group}</h4>
                <ul className="space-y-2">
                   {group.items.map(item => (
                     <li key={item}>
                        <Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{item}</Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </aside>

        {/* Content */}
        <div className="flex-grow">
           <div className="ultra-glass rounded-[40px] p-8 md:p-12 border border-emerald-500/10 min-h-[60vh]">
              <div className="max-w-3xl">
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Guia de <span className="gradient-text">Inicialização.</span></h1>
                 <p className="text-slate-300 mb-8 leading-relaxed">
                    Bem-vindo ao centro de documentação do Certus Engine. Aqui você encontrará os protocolos necessários para elevar sua infraestrutura técnica ao nível de Soberania Tier A+.
                 </p>
                 
                 <div className="bg-black/60 rounded-2xl border border-emerald-900/50 p-6 font-mono text-sm mb-12">
                    <div className="text-emerald-500 mb-2"># Instalação do SDK Universal</div>
                    <div className="text-slate-400">npm install @certus/governor-kernel</div>
                 </div>

                 <h2 className="text-2xl font-bold text-white mb-4">O que define um Kernel Soberano?</h2>
                 <p className="text-slate-400 mb-6">
                    Um Kernel Soberano não apenas executa instruções; ele as audita. Cada requisição enviada a uma IA através do adaptador Certus é interceptada, validada sintaticamente e higienizada em termos de PII.
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <Link href="/o-cerebro" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                       <h4 className="font-bold text-white mb-2 italic">← Leia o Manifesto</h4>
                       <p className="text-xs text-slate-500">Entenda a filosofia por trás do determinismo.</p>
                    </Link>
                    <Link href="/api-privada" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                       <h4 className="font-bold text-white mb-2 italic">Gerar Credenciais →</h4>
                       <p className="text-xs text-slate-500">Comece a integrar a API Privada hoje.</p>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  )
}
