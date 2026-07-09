'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/i18n/I18nProvider'
import { 
  Shield, 
  Activity, 
  Cpu, 
  Lock, 
  Zap, 
  ArrowRight, 
  Check, 
  X, 
  FileText, 
  Users, 
  HelpCircle,
  TrendingUp,
  Clock,
  ExternalLink
} from 'lucide-react'

export default function GovernancePage() {
  const { t } = useTranslation()
  const [activeTimeline, setActiveTimeline] = useState<'yes' | 'no'>('yes')

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Radial Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono mb-8 animate-pulse">
          <Shield className="w-4 h-4" />
          {t('gov_badge')}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          <span className="block text-2xl md:text-3xl font-medium text-emerald-400/80 mb-2">{t('gov_title_main')}</span>
          <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            {t('gov_title_sub')}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('gov_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#benchmark"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold text-base transition-transform hover:scale-105 active:scale-95 duration-200 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 glow-emerald"
          >
            {t('gov_cta_benchmark')}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-base transition-all hover:bg-slate-800 hover:border-slate-700 active:scale-95 duration-200 backdrop-blur-md flex items-center justify-center gap-2"
          >
            {t('gov_cta_demo')}
          </a>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('gov_problem_title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('gov_problem_desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t('gov_prob_card1_title')}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{t('gov_prob_card1_desc')}</p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t('gov_prob_card2_title')}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{t('gov_prob_card2_desc')}</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t('gov_prob_card3_title')}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{t('gov_prob_card3_desc')}</p>
          </div>
        </div>
      </section>

      {/* The Certus Solution Section (5 Pillars) */}
      <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('gov_sol_title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('gov_sol_desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">01</span>
              <h3 className="text-lg font-bold text-white">{t('gov_pillar_cobit')}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('gov_pillar_cobit_desc')}</p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">02</span>
              <h3 className="text-lg font-bold text-white">{t('gov_pillar_iso31000')}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('gov_pillar_iso31000_desc')}</p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">03</span>
              <h3 className="text-lg font-bold text-white">{t('gov_pillar_iso42001')}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('gov_pillar_iso42001_desc')}</p>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">04</span>
              <h3 className="text-lg font-bold text-white">{t('gov_pillar_tprm')}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('gov_pillar_tprm_desc')}</p>
          </div>

          {/* Pillar 5 */}
          <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 lg:col-span-1 md:col-span-2 lg:max-w-none md:max-w-md md:mx-auto lg:mx-0 w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">05</span>
              <h3 className="text-lg font-bold text-white">{t('gov_pillar_cyber')}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('gov_pillar_cyber_desc')}</p>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Table */}
      <section id="benchmark" className="relative z-10 py-20 px-4 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('gov_comp_title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('gov_comp_subtitle')}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="p-6 text-sm font-semibold text-slate-300 font-mono">CRITÉRIO</th>
                <th className="p-6 text-sm font-semibold text-red-400/80">{t('gov_comp_col_framework')}</th>
                <th className="p-6 text-sm font-semibold text-emerald-400">{t('gov_comp_col_certus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr>
                <td className="p-6 font-bold text-white">{t('gov_comp_row1_title')}</td>
                <td className="p-6 text-slate-400 text-sm flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                  {t('gov_comp_row1_fw')}
                </td>
                <td className="p-6 text-emerald-300 text-sm font-mono bg-emerald-500/5">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {t('gov_comp_row1_certus')}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">{t('gov_comp_row2_title')}</td>
                <td className="p-6 text-slate-400 text-sm flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                  {t('gov_comp_row2_fw')}
                </td>
                <td className="p-6 text-emerald-300 text-sm bg-emerald-500/5">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {t('gov_comp_row2_certus')}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">{t('gov_comp_row3_title')}</td>
                <td className="p-6 text-slate-400 text-sm flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                  {t('gov_comp_row3_fw')}
                </td>
                <td className="p-6 text-emerald-300 text-sm bg-emerald-500/5">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {t('gov_comp_row3_certus')}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">{t('gov_comp_row4_title')}</td>
                <td className="p-6 text-slate-400 text-sm flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                  {t('gov_comp_row4_fw')}
                </td>
                <td className="p-6 text-emerald-300 text-sm bg-emerald-500/5">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {t('gov_comp_row4_certus')}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Case Timeline Section */}
      <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('gov_timeline_title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            {t('gov_timeline_desc')}
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTimeline('yes')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTimeline === 'yes'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Check className="w-4 h-4" />
              Com Certus Engine
            </button>
            <button
              onClick={() => setActiveTimeline('no')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTimeline === 'no'
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <X className="w-4 h-4" />
              Sem Certus (Tradicional)
            </button>
          </div>
        </div>

        {/* Dynamic Timeline Content */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12 py-4 max-w-4xl mx-auto">
          {/* Timeline Node 1 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="md:absolute md:left-[-128px] md:top-1 font-mono text-emerald-400 text-sm mb-2 md:mb-0">
              {t('gov_timeline_step1_time')}
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <h4 className="text-white font-bold mb-3">{t('gov_timeline_step1_title')}</h4>
              <p className="text-sm text-slate-400">
                {activeTimeline === 'yes' ? t('gov_timeline_step1_yes') : t('gov_timeline_step1_no')}
              </p>
            </div>
          </div>

          {/* Timeline Node 2 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="md:absolute md:left-[-128px] md:top-1 font-mono text-emerald-400 text-sm mb-2 md:mb-0">
              {t('gov_timeline_step2_time')}
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <h4 className="text-white font-bold mb-3">{t('gov_timeline_step2_title')}</h4>
              <p className="text-sm text-slate-400">
                {activeTimeline === 'yes' ? t('gov_timeline_step2_yes') : t('gov_timeline_step2_no')}
              </p>
            </div>
          </div>

          {/* Timeline Node 3 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="md:absolute md:left-[-128px] md:top-1 font-mono text-emerald-400 text-sm mb-2 md:mb-0">
              {t('gov_timeline_step3_time')}
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <h4 className="text-white font-bold mb-3">{t('gov_timeline_step3_title')}</h4>
              <p className="text-sm text-slate-400">
                {activeTimeline === 'yes' ? t('gov_timeline_step3_yes') : t('gov_timeline_step3_no')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="demo" className="relative z-10 py-24 px-4 max-w-5xl mx-auto text-center scroll-mt-24">
        <div className="p-12 rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('gov_cta_final_title')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
            {t('gov_cta_final_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@certus.engine"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-base transition-transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              Falar com Engenharia de Governança
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
