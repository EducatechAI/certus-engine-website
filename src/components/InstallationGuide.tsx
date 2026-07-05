'use client'

import React from 'react'
import { useTranslation } from '@/i18n/I18nProvider'

const InstallationGuide = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
          {t('install_title').split(' ').slice(0,-1).join(' ')} <span className="text-emerald-500">{t('install_title').split(' ').slice(-1)[0]}</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">{t('install_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">01</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">{t('install_step1_label')}</h4>
            <h3 className="text-xl font-bold text-white mb-4">{t('install_step1_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t('install_step1_desc')}</p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-emerald-400">
               Extrair Certus_Studio_Command_SDK_v1.3.6_LIMPA.zip
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">02</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">{t('install_step2_label')}</h4>
            <h3 className="text-xl font-bold text-white mb-4">{t('install_step2_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t('install_step2_desc')}</p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 overflow-x-auto">
              Windows: Botão Direito &gt; Executar com o PowerShell<br/>
              Terminal: .\certus_command_installer.ps1
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">03</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">{t('install_step3_label')}</h4>
            <h3 className="text-xl font-bold text-white mb-4">{t('install_step3_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t('install_step3_desc')}</p>
            <div className="flex gap-2 items-center">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{t('install_step3_status')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallationGuide
