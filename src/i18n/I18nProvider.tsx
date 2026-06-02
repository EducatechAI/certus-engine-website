'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Locale, TranslationKey } from './translations'

// ─── Context ─────────────────────────────────────────────────────────────────

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

// ─── Provider ────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR')

  // Auto-detect from browser language and restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('certus-locale') as Locale | null
    if (saved && saved in translations) {
      setLocaleState(saved)
      return
    }
    const browser = navigator.language
    if (browser.startsWith('es')) setLocaleState('es')
    else if (browser.startsWith('en')) setLocaleState('en')
    else setLocaleState('pt-BR')
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('certus-locale', newLocale)
  }

  const t = (key: TranslationKey): string => translations[locale][key]

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used inside <I18nProvider>')
  return ctx
}
