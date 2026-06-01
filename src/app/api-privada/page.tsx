'use client'

import React, { useState } from 'react'
import FreeKeyGenerator from '@/components/FreeKeyGenerator'
import RestrictedResources from '@/components/RestrictedResources'

export default function ApiPrivadaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <main className="relative z-10 pt-32 pb-24">
      {/* HEADER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Acesso Restrito - Tier A+</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Integração da <br /><span className="gradient-text">API Privada</span></h1>
        <p className="text-lg text-emerald-200/60 max-w-2xl mx-auto font-medium">
          O gateway para o determinismo. Este portal permite a geração de credenciais efêmeras e acesso ao Kit de Sobrevivência Técnica para integradores autorizados.
        </p>
      </section>

      {/* GENERATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <FreeKeyGenerator onAuth={() => setIsAuthenticated(true)} />
        </div>
        
        <div className="order-1 lg:order-2 space-y-8">
          <div className="ultra-glass rounded-3xl p-8 border border-emerald-500/20 glow-emerald">
            <h3 className="text-2xl font-bold text-white mb-4">Protocolo de Segurança</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Cada chave gerada é assinada usando o protocolo <strong className="text-emerald-400">ZK-ID</strong>. A autenticação Master também libera o acesso às ferramentas de kernel e documentação soberana.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">SHA</span>
                Hashing Criptográfico SHA-256
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">PII</span>
                Mascaramento Nativo PII-Zero
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">AUD</span>
                Logs imutáveis de Auditoria
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESTRICTED RESOURCES (Conditional) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
         {isAuthenticated ? (
            <RestrictedResources />
         ) : (
            <div className="mt-24 text-center p-12 rounded-3xl border border-dashed border-emerald-500/20 bg-black/20">
               <div className="text-3xl mb-4">🔒</div>
               <h3 className="text-white font-bold text-lg mb-2">Conteúdo Bloqueado</h3>
               <p className="text-slate-500 text-sm">Autentique-se com a Senha Mestra para liberar o Kit de Sobrevivência Técnica.</p>
            </div>
         )}
      </section>

      {/* FOOTER CALLOUT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mt-24">
        <p className="text-sm text-slate-500 font-mono italic">
          // Todas as requisições são auditadas em tempo real pelo Kernel Certus
        </p>
      </section>
    </main>
  )
}
