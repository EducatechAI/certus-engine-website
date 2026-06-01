'use client'

import React from 'react'

const SentinelRedundancy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="ultra-glass rounded-[40px] p-8 md:p-16 border border-emerald-500/20 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Protocolo Nunca às Cegas</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Soberania em <span className="text-emerald-500">Redundância.</span>
            </h2>
            
            <p className="text-emerald-100/60 text-lg leading-relaxed mb-8">
              A dependência de uma única CPU (LLM) é o maior ponto cego da engenharia moderna. No Certus Studio, sua IA paga é o músculo, mas o OpenRouter é o seu **Sentinela Silenciosa**.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Redundância Tripla: Se seu provedor principal cair, o Sentinela assume.",
                "Consenso Tier A+: Validação cruzada para eliminar alucinações.",
                "Custo Otimizado: Use sua própria chave para transparência total."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-[10px]">✓</span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl">
              <h4 className="text-white font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">01</span>
                Sua IA Pessoal (Premium)
              </h4>
              <div className="relative">
                <input 
                  type="text" 
                  disabled
                  placeholder="sk-ant-api03-xxxx..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-500 font-mono"
                />
                <p className="mt-3 text-[11px] text-slate-500">
                  Suporta: Claude 3.5, GPT-4o, Gemini 1.5 Pro. Use sua chave para performance bruta.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-black/40 border border-emerald-500/30 backdrop-blur-xl relative group">
              <div className="absolute -inset-0.5 bg-emerald-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all" />
              <h4 className="text-emerald-400 font-bold mb-6 flex items-center gap-3 relative">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/40 flex items-center justify-center text-black">02</span>
                Sentinela Certus (OpenRouter)
              </h4>
              <div className="relative">
                <input 
                  type="text" 
                  disabled
                  placeholder="sk-or-v1-xxxx..."
                  className="w-full bg-emerald-950/20 border border-emerald-500/40 rounded-xl px-4 py-3 text-sm text-emerald-400/50 font-mono"
                />
                <p className="mt-3 text-[11px] text-emerald-500/60 font-medium">
                  MANDATÓRIO: O Sentinela (Qwen 2.5) garante que você nunca opere às cegas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SentinelRedundancy
