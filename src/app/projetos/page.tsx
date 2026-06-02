'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/I18nProvider'

export default function ProjetosPage() {
  const { t } = useTranslation()

  const PROJECTS = [
    {
      id: 'educatech-ai',
      name: 'Educatech AI',
      category: 'Sovereign Education',
      status: '✅ Produção Tier A+',
      desc: t('projects_label') === 'Vitrine de Capacidade Real'
        ? 'O site raiz do ecossistema. Implementa navegação tri-node e auditoria pública de decisões pedagógicas assistidas por IA.'
        : t('projects_label') === 'Real Capability Showcase'
          ? 'The root site of the ecosystem. Implements tri-node navigation and public auditing of AI-assisted pedagogical decisions.'
          : 'El sitio raíz del ecosistema. Implementa navegación tri-node y auditoría pública de decisiones pedagógicas asistidas por IA.',
      metrics: ['PII-Zero Active', '99.9% Uptime']
    },
    {
      id: 'civitas-gov',
      name: 'Civitas Governamental',
      category: 'GovTech Sovereign',
      status: '✅ Auditado RR2',
      desc: t('projects_label') === 'Vitrine de Capacidade Real'
        ? 'Portal administrativo para gestão pública com isolamento total de bancos de dados sensíveis e trilha imutável.'
        : t('projects_label') === 'Real Capability Showcase'
          ? 'Administrative portal for public management with total isolation of sensitive databases and immutable trail.'
          : 'Portal administrativo para gestión pública con aislamiento total de bases de datos sensibles y rastro inmutable.',
      metrics: ['ZK-ID Integrated', 'Postgres Isolated']
    },
    {
      id: 'zk-id',
      name: 'ZK-ID Protocol',
      category: 'Identity Infrastructure',
      status: '🛡️ Segurança Máxima',
      desc: t('projects_label') === 'Vitrine de Capacidade Real'
        ? 'O coração da autenticação do Certus. Validação de identidade via provas de conhecimento zero sem exposição de dados.'
        : t('projects_label') === 'Real Capability Showcase'
          ? 'The heart of Certus authentication. Identity validation via zero-knowledge proofs without data exposure.'
          : 'El corazón de la autenticación de Certus. Validación de identidad mediante pruebas de conocimiento cero sin exposición de datos.',
      metrics: ['Nullifier Base', 'Hardware Binding']
    },
    {
      id: 'atlas-city',
      name: 'Atlas City',
      category: 'Smart Governance',
      status: '🚧 Em Auditoria Genesis',
      desc: t('projects_label') === 'Vitrine de Capacidade Real'
        ? 'Ecossistema urbano orquestrado por múltiplos agentes Certus para gestão de recursos e transparência fiscal.'
        : t('projects_label') === 'Real Capability Showcase'
          ? 'Urban ecosystem orchestrated by multiple Certus agents for resource management and fiscal transparency.'
          : 'Ecosistema urbano orquestado por múltiples agentes Certus para gestión de recursos y transparencia fiscal.',
      metrics: ['Multi-Agent Mesh', 'Drafting Phase']
    },
  ]

  return (
    <main className="relative z-10 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          {t('projects_page_title').split(' ').slice(0,-2).join(' ')} <br />
          <span className="gradient-text">{t('projects_page_title').split(' ').slice(-2).join(' ')}</span>
        </h1>
        <p className="text-lg text-emerald-200/60 max-w-2xl mx-auto font-medium">
          {t('projects_page_subtitle')}
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
               <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-400">{p.status}</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-3 mb-8">
               {p.metrics.map(m => (
                 <span key={m} className="px-2 py-1 rounded bg-black/40 border border-emerald-900/50 text-[9px] font-mono text-emerald-600 uppercase tracking-tighter">{m}</span>
               ))}
            </div>
            <Link href={`https://${p.id}.vercel.app`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-white transition-colors">
              {t('projects_view_prod')}
            </Link>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="ultra-glass rounded-3xl p-12 border border-emerald-500/10">
           <h2 className="text-2xl font-bold text-white mb-6">{t('projects_audit_title')}</h2>
           <p className="text-slate-400 mb-8">{t('projects_audit_desc')}</p>
           <Link href="/contato" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all text-sm uppercase tracking-wider">
             {t('projects_audit_cta')}
           </Link>
        </div>
      </section>
    </main>
  )
}
