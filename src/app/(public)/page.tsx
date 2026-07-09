'use client'

import Link from 'next/link'
import { FAQSection } from '@/components/FAQSection'
import { DocumentDownload } from '@/components/DocumentDownload'
import { useTranslation } from '@/i18n/I18nProvider'

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { t, locale } = useTranslation()

  const PROJECTS = [
    { name: 'Certus Studio', tag: '✅ Validado', desc: 'IDE governada com co-pilot soberano e controle de execução.', href: '/studio', icon: '💻' },
    { name: 'CertusPay',     tag: '⚡ ZK-Ready', desc: 'Gateway auditável arquitetado para ZK-ID (Cardano) e PII-Zero.',   href: '/projetos/certus-pay', icon: '🔒' },
    { name: 'Certus APEX Guardian', tag: '🛡️ Ativo', desc: 'Frota de defesa (Wolfdog, Kangal, Pitbull) operando em tempo real na borda.', href: '/projetos/apex', icon: '🐺' },
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
              {locale === 'en' ? 'Ambassador Dashboard' : locale === 'es' ? 'Panel de Embajador' : 'Dashboard Embaixador'}
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
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
            {PROJECTS.map(p => (
              <Link key={p.name} href={p.href} className="group relative z-10">
                <div className="h-full glass-bright rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/50 hover:bg-emerald-900/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">{p.icon}</span>
                      <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors tracking-tight">{p.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono border rounded px-2 py-0.5 border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse" style={{ animationDuration: '3s' }}>
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center relative z-10">
            <Link href="/projetos" className="inline-flex px-8 py-3 rounded-xl border border-emerald-500/20 text-white font-bold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">
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
                  <div className="ml-4 font-mono text-[10px] text-slate-500 tracking-widest font-bold">CERTUS-STUDIO-V3.0.0 // SOVEREIGN ENGINE</div>
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
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">ZK-Ready (Q3)</div>
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
                        zk-simulated-8a2b...f92e (PII-Zero Shielded)
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

      {/* 🟦 BANNER 7.6: Torne-se um Embaixador Certus */}
      <section id="embaixadores" className="py-24 relative z-10 bg-navy-900/40 border-t border-emerald-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            {locale === 'en' ? 'Partnership Program' : locale === 'es' ? 'Programa de Alianzas' : 'Programa de Parcerias'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            {locale === 'en' ? 'Become a Certus Ambassador' : locale === 'es' ? 'Conviértete en Embajador de Certus' : 'Torne-se um Embaixador Certus'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            {locale === 'en'
              ? 'Earn recurring commissions by promoting deterministic AI governance. Get access to active training, official technical materials, and prospecting support.'
              : locale === 'es'
              ? 'Gana comisiones recurrentes promoviendo la gobernanza de IA determinista. Obtén acceso a capacitación activa, materiales técnicos oficiales y soporte de prospección.'
              : 'Ganhe comissões recorrentes promovendo a governança de IA determinística. Tenha acesso a treinamento ativo, materiais técnicos oficiais e suporte na prospecção.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-2xl">
              <span className="text-3xl block mb-2">💰</span>
              <h4 className="font-bold text-white text-lg">{locale === 'en' ? '50% Commission' : locale === 'es' ? '50% de Comisión' : '50% Comissão'}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {locale === 'en' ? 'On the first year of corporate commercial licenses.' : locale === 'es' ? 'En el primer año de licencias comerciales corporativas.' : 'No primeiro ano de licenças comerciais corporativas.'}
              </p>
            </div>
            <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-2xl">
              <span className="text-3xl block mb-2">🔄</span>
              <h4 className="font-bold text-white text-lg">{locale === 'en' ? '20% Recurring' : locale === 'es' ? '20% Recurrente' : '20% Recorrente'}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {locale === 'en' ? 'Guaranteed with each active renewal of the account.' : locale === 'es' ? 'Garantizado en cada renovación activa de la cuenta.' : 'Garantido a cada renovação contratual ativa da conta.'}
              </p>
            </div>
            <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-2xl">
              <span className="text-3xl block mb-2">🏛️</span>
              <h4 className="font-bold text-white text-lg">10-15% CPSI Gov</h4>
              <p className="text-xs text-gray-500 mt-1">
                {locale === 'en' ? 'For innovative public contracts closed with municipalities.' : locale === 'es' ? 'Para contratos públicos innovadores cerrados con municipios.' : 'Para contratos públicos inovadores fechados com municípios.'}
              </p>
            </div>
          </div>
          
          <Link href="/login" className="inline-flex px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold text-sm uppercase tracking-wider transition-all glow-emerald">
            {locale === 'en' ? 'I Want to Be an Ambassador' : locale === 'es' ? 'Quiero ser Embajador' : 'Quero Ser Embaixador'}
          </Link>
        </div>
      </section>

      {/* 🟦 BANNER 7.7: Recursos & Materiais para Embaixadores */}
      <section id="materiais" className="py-24 relative z-10 border-t border-emerald-900/20 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
              {locale === 'en' ? 'Prospecting Kit' : locale === 'es' ? 'Kit de Prospección' : 'Kit de Prospecção'}
            </p>
            <h2 className="text-3xl font-black text-white">
              {locale === 'en' ? 'Resources and Materials' : locale === 'es' ? 'Recursos y Materiales' : 'Recursos e Materiais'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                title: "Dossiê Institucional v3.0", 
                desc: locale === 'en' ? "Focused on C-Levels and VCs: BYOK economy, 99.95% SLA and financial ROI metrics." : locale === 'es' ? "Enfocado en C-Levels y VCs: Economía BYOK, 99.95% SLA y métricas de ROI." : "Focado em C-Levels e VCs: Economia BYOK, SLA de 99.95% e métricas de ROI financeiro.", 
                file: "dossie-institucional-v3.0.0.pdf", 
                size: "1.2 MB", 
                format: "PDF" 
              },
              { 
                title: "Dossiê LATAM v3.0", 
                desc: locale === 'en' ? "GovTech vision for governments: PII-Zero, compliance and the secure CivitasVote system." : locale === 'es' ? "Visión GovTech para gobiernos: PII-Zero, cumplimiento y el sistema seguro CivitasVote." : "Visão GovTech para governos: PII-Zero, LGPD e o sistema CivitasVote blindado.", 
                file: "dossie-latam-v3.0.0.pdf", 
                size: "1.4 MB", 
                format: "PDF" 
              },
              { 
                title: "Dossiê Mestre Soberano v3.0", 
                desc: locale === 'en' ? "Tactical access for CISOs and Red Teams. The mathematics of Layer 7 interception." : locale === 'es' ? "Acceso táctico para CISOs y Red Teams. Matemáticas de intercepción Capa 7." : "Acesso tático para CISOs e Red Teams. A matemática da interceptação HTTP Layer 7.", 
                file: "dossie-mestre-soberano-v3.0.0.pdf", 
                size: "980 KB", 
                format: "PDF" 
              },
              { 
                title: "Dossiê Certus Studio v3.0", 
                desc: locale === 'en' ? "Ambassador Manual: How to configure BYOK natively and use the Sovereign IDE." : locale === 'es' ? "Manual del Embajador: Cómo configurar BYOK nativamente y usar el IDE Soberano." : "Manual do Embaixador: Como configurar o BYOK nativo e usar a IDE Soberana.", 
                file: "dossie-certus-studio-v3.0.0.pdf", 
                size: "1.1 MB", 
                format: "PDF" 
              },
              { 
                title: "Dossiê de Transparência v1.0", 
                desc: locale === 'en' ? "135 public tests of Security, Governance, QA, and the 14 patent applications." : locale === 'es' ? "135 pruebas públicas de Seguridad, QA, y las 14 solicitudes de patentes." : "135 testes públicos de Segurança, Governança, QA e os 14 pedidos de patente.", 
                file: "dossie-transparencia-v1.0.0.pdf", 
                size: "850 KB", 
                format: "PDF" 
              },
              { 
                title: "Whitepaper Técnico v3.0", 
                desc: locale === 'en' ? "Complete architecture mapping: Rust Gateway, Tribunals, and the 12-agent APEX Fleet." : locale === 'es' ? "Mapeo de arquitectura: Gateway Rust, Tribunales y la Flota APEX de 12 agentes." : "Mapeamento da arquitetura: Gateway Rust, Tribunais e a Frota APEX de 12 agentes.", 
                file: "whitepaper-v3.0.0.pdf", 
                size: "1.8 MB", 
                format: "PDF" 
              }
            ].map(mat => (
              <DocumentDownload
                key={mat.title}
                baseName={mat.file.replace('.pdf', '')}
                version="v3.0.0"
                locale={locale}
                title={mat.title}
                desc={mat.desc}
                size={mat.size}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 7.8: Prova Social */}
      <section id="clientes" className="py-24 relative z-10 border-t border-emerald-900/20 bg-navy-900/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
              {locale === 'en' ? 'Partnerships and Credibility' : locale === 'es' ? 'Alianzas y Credibilidad' : 'Parcerias e Credibilidade'}
            </p>
            <h2 className="text-3xl font-black text-white">
              {locale === 'en' ? 'Who Trusts Certus Sovereignty' : locale === 'es' ? 'Quién Confía en la Soberanía de Certus' : 'Quem Confia na Soberania Certus'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16 justify-items-center opacity-60">
            <span className="font-black text-gray-400 text-lg sm:text-xl tracking-tight">Prefeitura de Joinville</span>
            <span className="font-black text-gray-400 text-lg sm:text-xl tracking-tight">StartupES</span>
            <span className="font-black text-gray-400 text-lg sm:text-xl tracking-tight">Prefeitura de Aveiro</span>
            <span className="font-black text-gray-400 text-lg sm:text-xl tracking-tight">EducaTech AI Corp</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-navy-800/40 border border-navy-700/60 p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                {locale === 'en' 
                  ? '"Certus Engine neutralized 100% of data leak (PII) risks in our IT support department and automated regulatory verification."'
                  : locale === 'es'
                  ? '"Certus Engine neutralizó el 100% de los riesgos de filtración de datos (PII) en nuestro departamento de soporte de TI y automatizó la verificación regulatoria."'
                  : '"O Certus Engine neutralizou 100% dos riscos de vazamento de dados (PII) em nosso setor de suporte de TI e automatizou a verificação regulatória."'}
              </p>
              <div className="mt-6">
                <span className="font-bold text-white text-xs block">
                  {locale === 'en' ? 'Digital Innovation Manager' : locale === 'es' ? 'Gestor de Innovación Digital' : 'Gestor de Inovação Digital'}
                </span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  {locale === 'en' ? 'Department of Administration' : locale === 'es' ? 'Secretaría de Administración' : 'Secretaria de Administração'}
                </span>
              </div>
            </div>
            <div className="bg-navy-800/40 border border-navy-700/60 p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                {locale === 'en' 
                  ? '"Hiring via CPSI simplified the regulatory process. The continuous auditing of Lazarus ensures that the system strictly complies with GDPR/LGPD."'
                  : locale === 'es'
                  ? '"La contratación a través de CPSI simplificó el proceso regulatorio. La auditoría continua de Lazarus garantiza que el sistema cumpla estrictamente con la LGPD."'
                  : '"A contratação via CPSI simplificou o processo regulatório. A auditoria contínua do Lazarus garante que o sistema atenda rigorosamente à LGPD."'}
              </p>
              <div className="mt-6">
                <span className="font-bold text-white text-xs block">
                  {locale === 'en' ? 'IT and Compliance Advisor' : locale === 'es' ? 'Asesor de TI y Cumplimiento' : 'Assessor de TI e Compliance'}
                </span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  {locale === 'en' ? 'Associated Public Sector' : locale === 'es' ? 'Sector Público Asociado' : 'Setor Público Associado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 BANNER 8: CTA Final */}
      <section className="py-32 relative z-10 border-t border-emerald-900/20">
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
