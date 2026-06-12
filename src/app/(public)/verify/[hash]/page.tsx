'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Award, Calendar, Cpu, FileCheck, ArrowLeft, Database, Key } from 'lucide-react'
import { useTranslation } from '@/i18n/I18nProvider'

export default function VerifyCertificatePage() {
  const params = useParams()
  const hash = params?.hash as string || 'unknown'
  const { t } = useTranslation()

  // Generate a mock verification timestamp or format current/fixed date
  const dateStr = new Date('2026-06-10T14:32:00Z').toLocaleDateString()

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 text-sm group"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
        <span>{t('verify_btn_home')}</span>
      </Link>

      {/* Main Glassmorphic Container */}
      <div className="bg-navy-800/80 backdrop-blur-md border border-navy-700 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Verification Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
            <ShieldCheck size={44} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            {t('verify_title')}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg">
            {t('verify_subtitle')}
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-b border-navy-700/60 py-8">
          {/* Status Field */}
          <div className="bg-navy-900/50 border border-navy-800/80 rounded-2xl p-4 flex items-start space-x-3">
            <FileCheck className="text-emerald-400 shrink-0 mt-1" size={20} />
            <div>
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-0.5">
                {t('verify_status_label')}
              </span>
              <span className="text-emerald-400 font-bold text-sm">
                {t('verify_status_valid')}
              </span>
            </div>
          </div>

          {/* Authority Field */}
          <div className="bg-navy-900/50 border border-navy-800/80 rounded-2xl p-4 flex items-start space-x-3">
            <Cpu className="text-blue-400 shrink-0 mt-1" size={20} />
            <div>
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-0.5">
                {t('verify_authority')}
              </span>
              <span className="text-slate-300 font-semibold text-sm">
                {t('verify_authority_val')}
              </span>
            </div>
          </div>

          {/* Date/Time Field */}
          <div className="bg-navy-900/50 border border-navy-800/80 rounded-2xl p-4 flex items-start space-x-3">
            <Calendar className="text-purple-400 shrink-0 mt-1" size={20} />
            <div>
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-0.5">
                {t('verify_timestamp')}
              </span>
              <span className="text-slate-300 font-mono text-sm">
                {dateStr} (14:32:00 UTC)
              </span>
            </div>
          </div>

          {/* Verification Algorithm Field */}
          <div className="bg-navy-900/50 border border-navy-800/80 rounded-2xl p-4 flex items-start space-x-3">
            <Key className="text-amber-400 shrink-0 mt-1" size={20} />
            <div>
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-0.5">
                Protocol
              </span>
              <span className="text-slate-300 font-mono text-xs">
                Ed25519 Custody Chain
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Hash Banner */}
        <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 mb-8">
          <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-2">
            {t('verify_hash_label')}
          </span>
          <div className="bg-navy-950 border border-navy-800/60 rounded-xl px-4 py-3 font-mono text-emerald-400 text-xs break-all shadow-inner select-all">
            {hash}
          </div>
        </div>

        {/* Audit Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2">
            <Database size={16} className="text-emerald-500" />
            <span>{t('verify_audit_log')}</span>
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed bg-navy-900/30 p-4 border border-navy-850 rounded-xl">
            {t('verify_desc_val')}
          </p>
        </div>
      </div>
    </div>
  )
}
