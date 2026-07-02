'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/i18n/I18nProvider'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t, locale } = useTranslation()

  const NAV_LINKS = [
    { href: '/o-cerebro', label: t('nav_brain') },
    { href: '/governance', label: locale === 'en' ? 'Governance' : locale === 'es' ? 'Gobernanza' : 'Governança' },
    { href: '/projetos',  label: t('nav_projects') },
    { href: '/#materiais', label: locale === 'en' ? 'Resources' : locale === 'es' ? 'Recursos' : 'Recursos' },
    { href: '/#embaixadores', label: locale === 'en' ? 'Ambassadors' : locale === 'es' ? 'Embajadores' : 'Embaixadores' },
    { href: '/documentacao', label: t('nav_docs') },
    { href: '/faq',       label: t('nav_faq') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'ultra-glass border-b border-emerald-500/10 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img src="/certus_nova_logo.png" alt="Certus Engine Logo" className="h-16 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform duration-500 group-hover:scale-105" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 ultra-glass px-2 py-1.5 rounded-2xl border border-emerald-500/5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                pathname === link.href
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-slate-500 hover:text-emerald-200 hover:bg-emerald-500/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs, Language Switcher & Vault Health */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Vault Health Widget */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#000804] border border-emerald-500/30" title="Sovereign Vault Online | 5TB">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{t('vault_status')}</span>
          </div>

          <Link
            href="/studio"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {t('header_ide')}
          </Link>
          <Link
            href="/api-privada"
            className="px-5 py-2.5 rounded-xl bg-transparent border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {t('header_api')}
          </Link>
          <Link
            href="/projetos/certus-pay#loja"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest transition-all shadow-lg glow-emerald"
          >
            COMPRAR LICENÇA
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden ultra-glass border-t border-emerald-500/10 mt-1 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-emerald-500/10 mt-2 flex flex-col gap-2">
            {/* Mobile Language Switcher */}
            <div className="flex justify-center py-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/studio"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-lg bg-white/5 text-white text-sm font-semibold"
            >
              {t('header_ide')}
            </Link>
            <Link
              href="/api-privada"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-lg border border-emerald-500/50 text-emerald-400 text-sm font-bold"
            >
              {t('header_api')}
            </Link>
            <Link
              href="/projetos/certus-pay#loja"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-400 text-black text-sm font-bold shadow-lg glow-emerald"
            >
              COMPRAR LICENÇA
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
