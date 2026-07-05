'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import StudioDojo from '@/components/StudioDojo'
import DiamondPortal from '@/components/studio/DiamondPortal'
import SentinelRedundancy from '@/components/SentinelRedundancy'
import InstallationGuide from '@/components/InstallationGuide'
import DownloadSelector from '@/components/studio/DownloadSelector'
import { useTranslation } from '@/i18n/I18nProvider'

export default function StudioPage() {
  const { t } = useTranslation()
  const [isUnlocked, setIsUnlocked] = useState(false)

  const scrollToDownload = () => {
    const element = document.getElementById('download-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="relative z-10 pt-32 pb-24">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t('studio_page_badge')}</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-white">
          {t('studio_page_title').split(' ').slice(0, -3).join(' ')} <br />
          <span className="gradient-text">{t('studio_page_title').split(' ').slice(-3).join(' ')}</span>
        </h1>

        <p className="text-xl text-emerald-200/60 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
          {t('studio_page_subtitle')}
        </p>

        <div className="flex justify-center flex-col sm:flex-row gap-6">
          <button
            onClick={scrollToDownload}
            className="px-10 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-lg transition-all uppercase tracking-wide glow-emerald"
          >
            {t('studio_page_cta1')}
          </button>
          <Link
            href="/documentacao"
            className="px-10 py-5 rounded-2xl ultra-glass border border-emerald-500/30 text-emerald-400 font-bold text-lg hover:bg-emerald-500/10 transition-all uppercase tracking-wide flex items-center justify-center gap-3"
          >
            {t('studio_page_cta2')}
          </Link>
        </div>
      </section>

      {/* DOJO SECTION / DIAMOND PORTAL */}
      <section className="mb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
            <h2 className="text-3xl font-black text-white mb-4">Studio <span className="text-emerald-500">{t('studio_dojo_title').replace('Studio ', '')}</span></h2>
            <p className="text-slate-500 text-sm font-medium">{t('studio_dojo_sub')}</p>
         </div>
         {isUnlocked ? (
            <StudioDojo />
         ) : (
            <DiamondPortal onUnlock={() => setIsUnlocked(true)} />
         )}
      </section>

      {/* COMMAND EDITION */}
      <section className="mb-24 bg-emerald-500/5 py-24 border-y border-emerald-500/10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h4 className="text-emerald-500 font-bold mb-4 uppercase text-xs tracking-widest">{t('studio_cmd_label')}</h4>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Certus Studio <span className="text-red-500">Command.</span></h2>
               <p className="text-slate-400 mb-8 leading-relaxed">{t('studio_cmd_desc')}</p>
               <Link
                  href="/onboarding"
                  className="inline-flex px-8 py-4 rounded-xl border border-red-500/40 text-red-400 font-bold uppercase tracking-widest text-xs hover:bg-red-500/10 transition-all"
               >
                  {t('studio_cmd_cta')}
               </Link>
            </div>
            <div className="ultra-glass p-8 rounded-3xl border border-red-500/20 shadow-2xl">
               <div className="flex gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
               </div>
               <div className="space-y-4 font-mono text-[11px]">
                  <p className="text-red-400"># Initializing Forge Module...</p>
                  <p className="text-slate-500">[SYSTEM] Probing target: api.educatech.ai</p>
                  <p className="text-emerald-500">[SUCCESS] BOLA Vulnerability found in /v1/user/keys</p>
                  <p className="text-slate-500">[LOG] Report signed with ZK-ID: 882f...a12</p>
               </div>
            </div>
         </div>
      </section>

      {/* SOVEREIGN REDUNDANCY */}
      <section className="mb-24">
         <SentinelRedundancy />
      </section>

      {/* INSTALLATION GUIDE */}
      <section className="mb-24">
         <InstallationGuide />
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download-section" className="max-w-7xl mx-auto px-4 sm:px-6 text-center pb-24">
         <div className="ultra-glass rounded-[40px] p-12 md:p-24 border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">{t('studio_dl_title').split(' ').slice(0,-2).join(' ')} <span className="text-emerald-500">{t('studio_dl_title').split(' ').slice(-2).join(' ')}</span></h3>
            <p className="text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">{t('studio_dl_desc')}</p>
            <DownloadSelector />
            <p className="mt-12 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">{t('studio_dl_footer')}</p>
         </div>
      </section>
    </main>
  )
}
