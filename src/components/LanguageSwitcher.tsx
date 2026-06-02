'use client'

import { useTranslation } from '@/i18n/I18nProvider'
import type { Locale } from '@/i18n/translations'

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
  { code: 'en',    flag: '🇺🇸', label: 'EN' },
  { code: 'es',    flag: '🇪🇸', label: 'ES' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-xl bg-black/40 border border-emerald-500/10"
      title="Language / Idioma / Idioma"
    >
      {LOCALES.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          aria-label={`Switch to ${label}`}
          className={`
            flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest
            transition-all duration-200
            ${locale === code
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }
          `}
        >
          <span className="text-sm leading-none">{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
