'use client'

import React from 'react'
import { useTranslation } from '@/i18n/I18nProvider'

export default function OCerebro() {
  const { t } = useTranslation()

  return (
    <main className="relative z-10 pt-32 pb-24">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-8">
          <span className="gradient-text">{t('brain_title')}</span>
        </h1>
        <p className="text-xl text-emerald-200/60 max-w-3xl mx-auto font-medium leading-relaxed">
          {t('brain_subtitle')}
        </p>
      </section>

      {/* CORE PHILOSOPHY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="ultra-glass rounded-3xl p-8 border border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 font-bold border border-emerald-500/20">01</div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('brain_card1_title')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{t('brain_card1_desc')}</p>
        </div>

        <div className="ultra-glass rounded-3xl p-8 border border-emerald-500/20 shadow-2xl glow-emerald">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 font-bold border border-emerald-500/30">02</div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('brain_card2_title')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{t('brain_card2_desc')}</p>
        </div>

        <div className="ultra-glass rounded-3xl p-8 border border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 font-bold border border-emerald-500/20">03</div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('brain_card3_title')}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{t('brain_card3_desc')}</p>
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="ultra-glass rounded-[40px] p-12 border border-emerald-500/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-black text-white mb-6">{t('brain_arch_title')}</h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-1 h-12 bg-emerald-500" />
                      <div>
                        <h4 className="font-bold text-emerald-400">Kernel Sovereign</h4>
                        <p className="text-xs text-slate-500">{t('brain_layer1')}</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1 h-12 bg-emerald-700" />
                      <div>
                        <h4 className="font-bold text-emerald-600">Adapter Mesh</h4>
                        <p className="text-xs text-slate-500">{t('brain_layer2')}</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1 h-12 bg-emerald-900" />
                      <div>
                        <h4 className="font-bold text-emerald-800">PII Shield 2.0</h4>
                        <p className="text-xs text-slate-500">{t('brain_layer3')}</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full aspect-square ultra-glass rounded-3xl border border-emerald-500/20 flex items-center justify-center p-8">
                 <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/40">
                       <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                       <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                       <path d="M 50 10 L 50 90 M 10 50 L 90 50" stroke="currentColor" strokeWidth="0.2" />
                       <circle cx="50" cy="10" r="1.5" fill="currentColor" className="animate-pulse" />
                       <circle cx="90" cy="50" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
                       <circle cx="50" cy="90" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '2s' }} />
                       <circle cx="10" cy="50" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '3s' }} />
                    </svg>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  )
}
