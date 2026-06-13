'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/I18nProvider'

export default function DocumentacaoPage() {
  const { locale } = useTranslation()

  const DOCS = [
    { 
      group: locale === 'en' ? 'Get Started' : locale === 'es' ? 'Inicio' : 'Início', 
      items: [
        locale === 'en' ? 'What is Certus?' : locale === 'es' ? '¿Qué es Certus?' : 'O que é Certus?', 
        locale === 'en' ? 'Quickstart Guide' : locale === 'es' ? 'Guía de Inicio Rápido' : 'Guia de Inicialização', 
        locale === 'en' ? 'Sovereign Manifesto' : locale === 'es' ? 'Manifiesto Soberano' : 'Manifesto Soberano'
      ] 
    },
    { 
      group: locale === 'en' ? 'Architecture' : locale === 'es' ? 'Arquitectura' : 'Arquitetura', 
      items: [
        locale === 'en' ? 'CPU Tribunal' : locale === 'es' ? 'Tribunal de CPUs' : 'Tribunal de CPUs', 
        locale === 'en' ? 'Tier A+ Protocol' : locale === 'es' ? 'Protocolo Tier A+' : 'Protocolo Tier A+', 
        locale === 'en' ? 'PII-Zero Shield' : locale === 'es' ? 'PII-Zero Shield' : 'PII-Zero Shield'
      ] 
    },
    { 
      group: 'API & Studio', 
      items: [
        locale === 'en' ? 'SDK Integration' : locale === 'es' ? 'Integración de SDK' : 'Integração de SDK', 
        locale === 'en' ? 'Governance Commands' : locale === 'es' ? 'Comandos de Gobernanza' : 'Comandos de Governança', 
        locale === 'en' ? 'Audit Logs' : locale === 'es' ? 'Logs de Auditoría' : 'Logs de Auditoria'
      ] 
    },
  ]

  return (
    <main className="relative z-10 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-64 space-y-8">
           {DOCS.map(group => (
             <div key={group.group}>
                <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4">{group.group}</h4>
                <ul className="space-y-2">
                   {group.items.map(item => (
                     <li key={item}>
                        <Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{item}</Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </aside>

        {/* Content */}
        <div className="flex-grow">
           <div className="ultra-glass rounded-[40px] p-8 md:p-12 border border-emerald-500/10 min-h-[60vh]">
              <div className="max-w-3xl">
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                   {locale === 'en' ? 'Quickstart' : locale === 'es' ? 'Guía de' : 'Guia de'}{' '}
                   <span className="gradient-text">{locale === 'en' ? 'Guide.' : locale === 'es' ? 'Inicio Rápido.' : 'Inicialização.'}</span>
                 </h1>
                 <p className="text-slate-300 mb-8 leading-relaxed">
                    {locale === 'en' 
                      ? 'Welcome to the Certus Engine documentation center. Here you will find the necessary protocols to raise your technical infrastructure to the Tier A+ Sovereignty level.'
                      : locale === 'es'
                      ? 'Bienvenido al centro de documentación de Certus Engine. Aquí encontrará los protocolos necesarios para elevar su infraestructura técnica al nivel de Soberanía Tier A+.'
                      : 'Bem-vindo ao centro de documentação do Certus Engine. Aqui você encontrará os protocolos necessários para elevar sua infraestrutura técnica ao nível de Soberania Tier A+.'}
                 </p>
                 
                 <div className="bg-black/60 rounded-2xl border border-emerald-900/50 p-6 font-mono text-sm mb-12">
                    <div className="text-emerald-500 mb-2">
                      {locale === 'en' ? '# Universal SDK Installation' : locale === 'es' ? '# Instalación del SDK Universal' : '# Instalação do SDK Universal'}
                    </div>
                    <div className="text-slate-400">npm install @certus/governor-kernel</div>
                 </div>

                 <h2 className="text-2xl font-bold text-white mb-4">
                   {locale === 'en' ? 'What defines a Sovereign Kernel?' : locale === 'es' ? '¿Qué define a un Kernel Soberano?' : 'O que define um Kernel Soberano?'}
                 </h2>
                 <p className="text-slate-400 mb-6">
                    {locale === 'en'
                      ? 'A Sovereign Kernel not only executes instructions; it audits them. Every request sent to an AI through the Certus adapter is intercepted, syntactically validated, and sanitized in terms of PII.'
                      : locale === 'es'
                      ? 'Un Kernel Soberano no solo ejecuta instrucciones; las audita. Cada solicitud enviada a una IA a través del adaptador Certus es interceptada, validada sintácticamente e higienizada en términos de PII.'
                      : 'Um Kernel Soberano não apenas executa instruções; ele as audita. Cada requisição enviada a uma IA através do adaptador Certus é interceptada, validada sintaticamente e higienizada em termos de PII.'}
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <Link href="/o-cerebro" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                       <h4 className="font-bold text-white mb-2 italic">
                         {locale === 'en' ? '← Read the Manifesto' : locale === 'es' ? '← Leer el Manifiesto' : '← Leia o Manifesto'}
                       </h4>
                       <p className="text-xs text-slate-500">
                         {locale === 'en' ? 'Understand the philosophy behind determinism.' : locale === 'es' ? 'Entienda la filosofía detrás del determinismo.' : 'Entenda a filosofia por trás do determinismo.'}
                       </p>
                    </Link>
                    <Link href="/api-privada" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                       <h4 className="font-bold text-white mb-2 italic">
                         {locale === 'en' ? 'Generate Credentials →' : locale === 'es' ? 'Generar Credenciales →' : 'Gerar Credenciais →'}
                       </h4>
                       <p className="text-xs text-slate-500">
                         {locale === 'en' ? 'Start integrating the Private API today.' : locale === 'es' ? 'Comience a integrar la API Privada hoy.' : 'Comece a integrar a API Privada hoje.'}
                       </p>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  )
}
