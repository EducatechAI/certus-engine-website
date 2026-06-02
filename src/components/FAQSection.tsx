'use client'

import React, { useState } from 'react'
import { FAQ_ITEMS_I18N } from '@/data/faq'
import { useTranslation } from '@/i18n/I18nProvider'
import type { Locale } from '@/i18n/translations'

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const { t, locale } = useTranslation()
  const items = FAQ_ITEMS_I18N[locale as Locale] ?? FAQ_ITEMS_I18N['pt-BR']

  return (
    <section className="py-24 relative z-10 border-t border-emerald-900/20 bg-black/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">{t('faq_label')}</p>
          <h2 className="text-4xl font-black text-white mb-4">{t('faq_title').replace('Frequentes.', '')}<span className="gradient-text">Frequentes.</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto">{t('faq_subtitle')}</p>
        </div>

        <div className="space-y-4">
          {items.slice(0, 8).map((item, idx) => (
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
                className="w-full text-left p-6 flex justify-between items-center group"
              >
                <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                  activeIndex === idx ? 'text-white' : 'text-slate-300 group-hover:text-emerald-400'
                }`}>
                  {item.q}
                </span>
                <span className={`text-xl transition-transform duration-500 ${
                  activeIndex === idx ? 'rotate-180 text-emerald-400' : 'text-slate-600'
                }`}>
                  {activeIndex === idx ? '−' : '+'}
                </span>
              </button>

              <div className={`transition-all duration-500 ease-in-out ${
                activeIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 border-t border-emerald-500/10">
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/faq"
            className="text-sm font-bold text-emerald-500 hover:text-emerald-400 border-b border-emerald-500/30 transition-all pb-1 uppercase tracking-wider"
          >
            {t('faq_see_all')}
          </a>
        </div>
      </div>
    </section>
  )
}
