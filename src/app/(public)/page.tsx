'use client'

import Link from 'next/link'
import { FAQSection } from '@/components/FAQSection'
import { useTranslation } from '@/i18n/I18nProvider'

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { t } = useTranslation()

  const PROJECTS = [
    { name: 'Certus Studio', tag: '✅ Validado', desc: 'IDE governada com co-pilot soberano e controle de execução.', href: '/studio' },
    { name: 'CertusPay',     tag: '⚡ Em Ativação', desc: 'Gateway de pagamentos auditáveis com ZK-ID e PII-Zero.',   href: '/projetos/certus-pay' },
  ]

  const COMPLIANCE_ITEMS = [
    { icon: '🔒', title: 'Privacidade by Design', desc: 'Seus dados não treinam modelos externos. PII-Zero ativo em todas as camadas.' },
    { icon: '🛡️', title: 'Fail-Closed Nativo',    desc: 'Em caso de incerteza, a execução é interrompida. Zero alucinação em produção.' },
    { icon: '📜', title: 'Auditoria Criptográfica', desc: 'Logs imutáveis com hashes SHA-256 para total transparência de decisão arquitetural.' },
  ]

  return (
    <>
      {/* 🟦 BANNER 1: Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-neon" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t('hero_badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            {t('hero_title_1')} <br />
            <span className="gradient-text">{t('hero_title_2')}</span>
          </h1>
          
          <p
            className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl font-medium"
            dangerouslySetInnerHTML={{ __html: t('hero_desc') }}
          />

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16 w-full">
            <Link
              href="/studio"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-black font-bold shadow-2xl hover:shadow-emerald-500/30 transition-all text-center uppercase tracking-wide text-sm glow-emerald block w-full sm:w-auto"
            >
              {t('hero_cta_primary')}
            </Link>
            <Link
              href="/api-privada"
              className="px-8 py-4 rounded-xl ultra-glass border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white font-bold transition-all text-center uppercase tracking-wide text-sm block w-full sm:w-auto"
            >
              {t('hero_cta_secondary')}
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-navy-800 hover:bg-navy-750 border border-emerald-500/30 hover:border-emerald-500/75 text-emerald-400 font-bold transition-all text-center uppercase tracking-wide text-sm block w-full sm:w-auto"
            >
              Dashboard Embaixador
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-emerald-900/30 pt-8">
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400 mb-1">99.9%</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{t('stat_uptime')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400 mb-1">100k+</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{t('stat_zk')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400 mb-1">2</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{t('stat_projects')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400 mb-1">14ms</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{t('stat_latency')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 2: O Problema vs. A Solução */}
      <section className="py-24 border-y border-emerald-900/20 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-4">{t('chaos_label')}</p>
              <h2 className="text-3xl font-black text-white mb-8">{t('chaos_title')}</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="text-xl">❌</div>
                  <div>
                     <strong className="text-slate-200 block mb-1">{t('chaos_item1_title')}</strong>
                     <p className="text-sm text-slate-400">{t('chaos_item1_desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-xl">❌</div>
                  <div>
                     <strong className="text-slate-200 block mb-1">{t('chaos_item2_title')}</strong>
                     <p className="text-sm text-slate-400">{t('chaos_item2_desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-xl">❌</div>
                  <div>
                     <strong className="text-slate-200 block mb-1">{t('chaos_item3_title')}</strong>
                     <p className="text-sm text-slate-400">{t('chaos_item3_desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="ultra-glass rounded-3xl p-8 border border-emerald-500/20 glow-emerald">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">{t('order_label')}</p>
              <h2 className="text-3xl font-black text-white mb-8">{t('order_title')}</h2>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4">
                  <div className="text-xl">✅</div>
                  <div>
                     <strong className="text-white block mb-1">{t('order_item1_title')}</strong>
                     <p className="text-sm text-slate-400">{t('order_item1_desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-xl">✅</div>
                  <div>
                     <strong className="text-white block mb-1">{t('order_item2_title')}</strong>
                     <p className="text-sm text-slate-400">{t('order_item2_desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-xl">✅</div>
                  <div>
                     <strong className="text-white block mb-1">{t('order_item3_title')}</strong>
                     <p className="text-sm text-slate-400">{t('order_item3_desc')}</p>
                  </div>
                </li>
              </ul>
              <Link href="/o-cerebro" className="inline-block text-emerald-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                {t('order_arch_link')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 3: O Que Já Construímos */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('projects_label')}</p>
            <h2 className="text-4xl font-black text-white mb-4">{t('projects_title').replace('Engine Funciona.', '')}<span className="gradient-text">Engine Funciona.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {PROJECTS.map(p => (
              <Link key={p.name} href={p.href} className="group">
                <div className="h-full glass-bright rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors tracking-tight">{p.name}</h3>
                    <span className={`text-[10px] font-mono border rounded px-2 py-0.5 ${p.tag === '✅ Validado' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-slate-500/40 text-slate-400 bg-slate-500/10'}`}>
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projetos" className="inline-flex px-8 py-3 rounded-xl border border-emerald-500/20 text-white font-bold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all text-sm uppercase tracking-wider">
              {t('projects_cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 4: Certus Studio em Ação */}
      <section className="py-32 relative z-10 border-y border-emerald-900/30 !bg-black/60 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('studio_label')}</p>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">{t('studio_title_1')}<br />É um ambiente de <span className="text-emerald-400">execução governada.</span></h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t('studio_desc')}
              </p>
              <Link href="/studio" className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm uppercase tracking-wider glow-emerald">
                {t('studio_cta')}
              </Link>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="ultra-glass rounded-2xl border border-emerald-500/20 shadow-2xl p-2 md:p-4 aspect-video flex flex-col glow-emerald relative">
                {/* Fake IDE Header */}
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <div className="ml-4 font-mono text-[10px] text-slate-500 tracking-widest font-bold">CERTUS-STUDIO-V2.2 // SOVEREIGN ENGINE</div>
                </div>
                {/* Fake IDE Body */}
                <div className="flex-1 bg-[#010409] rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-hidden relative">
                   <div className="text-emerald-400 mb-2">{`> SYSTEM.GOVERNANCE.CHECK(PROTOCOL='PII-ZERO')`}</div>
                   <div className="text-slate-400 mb-1">{`[sys] analyzing context for sensitive data...`}</div>
                   <div className="text-emerald-400 mb-1">{`[ok] PII-Zero protocol active. No leaks detected.`}</div>
                   <div className="text-slate-400 mb-1">{`[sys] executing sovereign multi-agent compilation...`}</div>
                   <div className="text-indigo-400 mt-4 mb-2">{`// Circuit Breaker active. Token cap: $0.05/cycle`}</div>
                   <div className="text-slate-300 opacity-50 flex items-center gap-2 mt-4"><span className="w-1 h-3 bg-white animate-pulse"></span>_</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 5: Acesso Seletivo & Princípios de Parceria */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('partner_label')}</p>
          <h2 className="text-3xl font-black text-white mb-8">{t('partner_title').split('. ')[0]}.<br/>{t('partner_title').split('. ')[1]}</h2>
          <p
            className="text-lg text-slate-300 leading-relaxed mb-12"
            dangerouslySetInnerHTML={{ __html: t('partner_desc') }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
            {[t('partner_item1'), t('partner_item2'), t('partner_item3'), t('partner_item4')].map((item) => (
              <div key={item} className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <span className="text-emerald-400 mt-1">▹</span>
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>

          <Link href="/contato" className="inline-flex px-8 py-4 rounded-xl ultra-glass border border-emerald-500/20 text-white font-bold hover:bg-emerald-500 hover:text-black transition-all text-sm uppercase tracking-wider">
            {t('partner_cta')}
          </Link>
        </div>
      </section>

      {/* 🟦 BANNER 6: Transparência & Compliance */}
      <section className="py-24 relative z-10 border-t border-emerald-900/20 bg-gradient-to-b from-black/40 to-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('compliance_label')}</p>
            <h2 className="text-3xl font-black text-white mb-6">{t('compliance_title').split('. ')[0]}.<br/><span className="text-slate-400">{t('compliance_title').split('. ')[1]}</span></h2>
            <p className="text-slate-300">{t('compliance_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {COMPLIANCE_ITEMS.map(item => (
              <div key={item.title} className="text-center p-6 bg-emerald-900/5 rounded-2xl border border-emerald-500/10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6">
            <Link href="/privacidade" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 border-b border-emerald-500/30 transition-all pb-1 uppercase tracking-wider">{t('compliance_privacy')}</Link>
            <Link href="/transparencia" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 border-b border-emerald-500/30 transition-all pb-1 uppercase tracking-wider">{t('compliance_audit')}</Link>
            <Link href="/termos" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 border-b border-emerald-500/30 transition-all pb-1 uppercase tracking-wider">{t('compliance_terms')}</Link>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 7: FAQ Estratégico */}
      <FAQSection />

      {/* 🟦 BANNER 7.5: CertusPay */}
      <section className="py-24 relative z-10 border-t border-emerald-900/20 bg-[#000502]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('pay_label')}</p>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">Certus<span className="text-emerald-500">Pay.</span><br />A última fronteira da <span className="text-emerald-400">privacidade transacional.</span></h2>
              <p
                className="text-lg text-slate-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: t('pay_desc') }}
              />
              
              <div className="space-y-4 mb-10">
                {[t('pay_step1'), t('pay_step2'), t('pay_step3')].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-400">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <Link href="/projetos/certus-pay" className="inline-flex px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-emerald-500 hover:text-black transition-all text-sm uppercase tracking-wider">
                {t('pay_cta')}
              </Link>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative ultra-glass rounded-3xl p-8 border border-emerald-500/20 bg-black/80">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">C</div>
                      <span className="text-white font-bold tracking-tight">CertusPay Terminal</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">ZK-ID Ativo</div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t('pay_status')}</p>
                      <div className="flex items-center justify-between">
                         <span className="text-white font-medium">{t('pay_validating')}</span>
                         <span className="text-emerald-400 animate-pulse font-mono">0.014s</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-[10px] text-emerald-500/60 uppercase font-bold tracking-widest mb-1">{t('pay_identity')}</p>
                      <div className="font-mono text-xs text-emerald-400 break-all">
                        zk-proof-8a2b...f92e (PII-Zero Shielded)
                      </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-emerald-500 text-black font-black uppercase tracking-widest text-xs glow-emerald">
                      {t('pay_confirm')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 8: CTA Final */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="ultra-glass rounded-3xl p-12 glow-emerald relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">{t('cta_title')}</h2>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6">
                <Link
                  href="/studio"
                  className="px-8 py-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider transition-all"
                >
                  {t('cta_ide')}
                </Link>
                <Link
                  href="/api-privada"
                  className="px-8 py-5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-black font-bold text-sm uppercase tracking-wider glow-emerald transition-all"
                >
                  {t('cta_api')}
                </Link>
              </div>
              <p className="text-[10px] text-emerald-400/80 font-mono font-bold tracking-widest uppercase">{t('cta_notice')}</p>
            </div>
        </div>
      </section>
    </>
  )
}
