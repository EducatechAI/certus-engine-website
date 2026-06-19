'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/I18nProvider'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative z-10 border-t border-emerald-900/10 bg-[#000402]/80 backdrop-blur-xl py-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group mb-2">
              <img src="/certus_nova_logo.png" alt="Certus Engine Logo" className="h-16 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">{t('footer_desc')}</p>
            <div className="flex gap-4">
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">{t('footer_platform')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('footer_brain'),  href: '/o-cerebro' },
                { name: t('footer_fleet'),  href: '/projetos' },
                { name: 'Certus Studio',    href: '/studio' },
                { name: t('footer_api') ?? t('header_api'), href: '/api-privada' }
              ].map(link => (
                <li key={link.name}><Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links Group 2 */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">{t('footer_governance')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('footer_docs'),       href: '/documentacao' },
                { name: t('footer_resources'),  href: '/api-privada' },
                { name: t('footer_audit'),      href: '#' },
                { name: 'FAQ',                  href: '/faq' }
              ].map(link => (
                <li key={link.name}><Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">{t('footer_newsletter')}</h4>
            <p className="text-xs text-slate-500 mb-4 font-medium">{t('footer_newsletter_desc')}</p>
            <div className="flex gap-2">
               <input type="text" placeholder={t('footer_email_placeholder')} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50 w-full" />
               <button className="bg-emerald-600 text-black px-3 py-2 rounded-lg text-[10px] font-bold">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/20 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-col gap-1 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
             <p>{t('footer_copyright')}</p>
             <p className="text-[8px] text-slate-700 font-mono mt-1">CNPJ: [AGUARDANDO VALIDAÇÃO] • Educatech AI Digital Sovereign</p>
           </div>
           <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <Link href="/faq" className="hover:text-emerald-500">FAQ</Link>
              <Link href="/documentacao" className="hover:text-emerald-500">{t('footer_sovereignty')}</Link>
              <Link href="/privacidade" className="hover:text-emerald-500">{t('compliance_privacy')}</Link>
              <Link href="/termos" className="hover:text-emerald-500">{t('compliance_terms')}</Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
