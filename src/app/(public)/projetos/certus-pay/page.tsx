'use client'

import React from 'react'
import Link from 'next/link'

export default function CertusPayPage() {
  return (
    <main className="relative z-10 pt-32 pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Gateway de Pagamento Ativado</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
          Certus<span className="text-emerald-500">Pay.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          A infraestrutura definitiva para transações financeiras imunes a IDOR, BOLA e vazamentos de dados sensíveis. Compre sua licença da IDE diretamente pelo protocolo Soberano.
        </p>
      </section>

      {/* THE ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="ultra-glass rounded-3xl p-10 border border-emerald-500/10 bg-black/40">
            <h2 className="text-3xl font-bold text-white mb-8">Arquitetura ZK-ID Auth Gateway</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">1</div>
                <div>
                   <h3 className="text-white font-bold mb-2">Geração Local de Prova</h3>
                   <p className="text-sm text-slate-400">O Certus Engine local gera uma prova de conhecimento zero (ZKP) atestando saldo e autoridade sem expor o número da conta.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">2</div>
                <div>
                   <h3 className="text-white font-bold mb-2">Validação Trustless</h3>
                   <p className="text-sm text-slate-400">O Gateway recebe apenas o hash da prova. A validação é matemática, não baseada em acesso direto ao banco de dados.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">3</div>
                <div>
                   <h3 className="text-white font-bold mb-2">Liquidação Fail-Closed</h3>
                   <p className="text-sm text-slate-400">Se houver qualquer discrepância na prova ou latência de reconciliação, a transação é bloqueada instantaneamente.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-black text-white leading-tight">Privacidade que escala com a <span className="text-emerald-500">segurança institucional.</span></h2>
            <p className="text-slate-400 text-lg">
              Diferente de gateways comuns que armazenam seus dados para "facilitar o checkout", o CertusPay descentraliza a confiança. Seus dados financeiros permanecem no seu Sovereign Vault.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                 <p className="text-2xl font-black text-white mb-1">0%</p>
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Risco de PII Leak</p>
               </div>
               <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                 <p className="text-2xl font-black text-white mb-1">100%</p>
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Auditabilidade ZK</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <h2 className="text-center text-3xl font-black text-white mb-16">Casos de Uso Soberanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#010804] border border-emerald-500/10 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🏦</div>
            <h3 className="text-xl font-bold text-white mb-4">Banking & FinTech</h3>
            <p className="text-sm text-slate-400">Proteção contra ataques de State Confusion em sistemas de alta volumetria.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#010804] border border-emerald-500/10 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎓</div>
            <h3 className="text-xl font-bold text-white mb-4">Educação & Taxas</h3>
            <p className="text-sm text-slate-400">Pagamento de mensalidades e taxas acadêmicas com anonimato garantido para o aluno.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#010804] border border-emerald-500/10 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚖️</div>
            <h3 className="text-xl font-bold text-white mb-4">Governança Pública</h3>
            <p className="text-sm text-slate-400">Transferências governamentais auditáveis via blockchain ou Real Digital.</p>
          </div>
        </div>
      </section>

      {/* LOJA SOBERANA EMBARCADA (iFrame) */}
      <section id="loja" className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-32">
        <div className="w-full rounded-[2rem] overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 bg-[#000804] min-h-[900px] relative">
           <iframe 
             src="https://certus-site-five.vercel.app" 
             className="w-full h-full min-h-[900px] absolute inset-0 border-0"
             allow="payment"
             title="CertusPay Sovereign Store"
             sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
           />
        </div>
      </section>
    </main>
  )
}
