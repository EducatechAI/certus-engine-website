'use client'

import Link from 'next/link'

const PROJECTS = [
  { 
    id: 'educatech-ai',
    name: 'Educatech AI', 
    category: 'Sovereign Education',
    status: '✅ Produção Tier A+',
    desc: 'O site raiz do ecossistema. Implementa navegação tri-node e auditoria pública de decisões pedagógicas assistidas por IA.',
    metrics: ['PII-Zero Active', '99.9% Uptime']
  },
  { 
    id: 'civitas-gov',
    name: 'Civitas Governamental', 
    category: 'GovTech',
    category: 'GovTech Sovereign',
    status: '✅ Auditado RR2',
    desc: 'Portal administrativo para gestão pública com isolamento total de bancos de dados sensíveis e trilha imutável.',
    metrics: ['ZK-ID Integrated', 'Postgres Isolated']
  },
  { 
    id: 'zk-id',
    name: 'ZK-ID Protocol', 
    category: 'Identity Infrastructure',
    status: '🛡️ Segurança Máxima',
    desc: 'O coração da autenticação do Certus. Validação de identidade via provas de conhecimento zero sem exposição de dados.',
    metrics: ['Nullifier Base', 'Hardware Binding']
  },
  { 
    id: 'atlas-city',
    name: 'Atlas City', 
    category: 'Smart Governance',
    status: '🚧 Em Auditoria Genesis',
    desc: 'Ecossistema urbano orquestrado por múltiplos agentes Certus para gestão de recursos e transparência fiscal.',
    metrics: ['Multi-Agent Mesh', 'Drafting Phase']
  },
];

export default function ProjetosPage() {
  return (
    <main className="relative z-10 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Vitrine da <br /><span className="gradient-text">Frota Soberana.</span></h1>
        <p className="text-lg text-emerald-200/60 max-w-2xl mx-auto font-medium">
          Cada projeto da frota é uma demonstração de como o motor Certus governa aplicações complexas com erro zero e soberania total.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {PROJECTS.map(p => (
          <div key={p.id} className="ultra-glass rounded-3xl p-8 border border-emerald-500/20 group hover:glow-emerald transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{p.category}</span>
                 <h3 className="text-3xl font-bold text-white mt-2">{p.name}</h3>
               </div>
               <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                 {p.status}
               </span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">{p.desc}</p>
            
            <div className="flex flex-wrap gap-3 mb-8">
               {p.metrics.map(m => (
                 <span key={m} className="px-2 py-1 rounded bg-black/40 border border-emerald-900/50 text-[9px] font-mono text-emerald-600 uppercase tracking-tighter">
                   {m}
                 </span>
               ))}
            </div>

            <Link href={`https://${p.id}.vercel.app`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-white transition-colors">
              Ver em Produção <span className="text-xs">↗</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="ultra-glass rounded-3xl p-12 border border-emerald-500/10">
           <h2 className="text-2xl font-bold text-white mb-6">Deseja Auditar um Projeto?</h2>
           <p className="text-slate-400 mb-8">Oferecemos acesso aos logs de Hash SHA-256 para entidades verificadas que desejam atestar a integridade das decisões de IA.</p>
           <Link href="/contato" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all text-sm uppercase tracking-wider">
             Solicitar Acesso à Auditoria
           </Link>
        </div>
      </section>
    </main>
  )
}
