'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FAQ_ITEMS_I18N } from '@/data/faq'
import { useTranslation } from '@/i18n/I18nProvider'
import type { Locale } from '@/i18n/translations'

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const { t, locale } = useTranslation()
  const items = FAQ_ITEMS_I18N[locale as Locale] ?? FAQ_ITEMS_I18N['pt-BR']

  return (
    <main className="relative z-10 pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-4">{t('faq_page_label')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {t('faq_page_title').split(' ').slice(0,-1).join(' ')} <span className="gradient-text">{t('faq_page_title').split(' ').slice(-1)[0]}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('faq_page_subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`ultra-glass rounded-2xl border transition-all duration-500 overflow-hidden ${
                activeIndex === idx
                  ? 'border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.05)]'
                  : 'border-white/5 hover:border-emerald-500/20'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-center group"
              >
                <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                  activeIndex === idx ? 'text-white' : 'text-slate-300 group-hover:text-emerald-400'
                }`}>
                  {item.q}
                </span>
                <span className={`text-2xl transition-transform duration-500 ${
                  activeIndex === idx ? 'rotate-180 text-emerald-400' : 'text-slate-600'
                }`}>
                  {activeIndex === idx ? '−' : '+'}
                </span>
              </button>

              <div className={`transition-all duration-500 ease-in-out ${
                activeIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 md:p-8 pt-0 border-t border-emerald-500/10">
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-emerald-900/10 to-transparent border border-emerald-500/10 text-center">
          <h2 className="text-3xl font-black text-white mb-6">{t('faq_contact_title')}</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">{t('faq_contact_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              className="px-8 py-4 rounded-xl bg-emerald-600 text-black font-black text-sm uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-lg glow-emerald"
            >
              {t('faq_contact_cta1')}
            </Link>
            <Link
              href="/documentacao"
              className="px-8 py-4 rounded-xl ultra-glass border border-emerald-500/20 text-white font-black text-sm uppercase tracking-wider hover:bg-emerald-500/10 transition-all"
            >
              {t('faq_contact_cta2')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
