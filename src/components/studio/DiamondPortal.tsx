'use client'

import React, { useState } from 'react'

interface DiamondPortalProps {
  onUnlock: (key: string) => void;
}

export default function DiamondPortal({ onUnlock }: DiamondPortalProps) {
  const [key, setKey] = useState('')
  const [error, setError] = useState(false)

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (key.trim().startsWith('dia_')) {
      setError(false)
      onUnlock(key.trim())
    } else {
      setError(true)
      setKey('')
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl p-8 md:p-16 text-left font-mono">
      {/* Grade de fundo estilo terminal */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Painel de Login Brutalista */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h2 className="text-emerald-500 font-black text-xl tracking-[0.2em] uppercase">
              Certus Engine Gateway
            </h2>
          </div>

          <h3 className="text-white text-3xl font-black mb-6 uppercase tracking-tight">
            Acesso Restrito <br/><span className="text-emerald-500 text-4xl">Tier-1 Enterprise</span>
          </h3>

          <form onSubmit={handleUnlock} className="space-y-6">
            <div>
              <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">
                Insira a Chave Diamante
              </label>
              <input 
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="dia_XXXXXXXXXXXXXXXXXXXXX"
                className={`w-full bg-black border-2 ${error ? 'border-red-500 text-red-500' : 'border-emerald-500/30 text-emerald-400'} rounded-lg p-4 font-mono focus:outline-none focus:border-emerald-500 transition-colors`}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black text-emerald-500 font-black uppercase tracking-[0.3em] py-4 rounded-lg transition-all duration-300"
            >
              Descriptografar Acesso
            </button>
            
            {error && (
              <div className="mt-4 p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest rounded animate-pulse">
                [!] ACESSO NEGADO. TENTATIVA REGISTRADA IMUTAVELMENTE NO LAZARUS VAULT.
              </div>
            )}
          </form>
        </div>

        {/* Painel Institucional e Compliance */}
        <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
                // Ambiente de Soberania de Dados
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Este é um ambiente exclusivo, isolado em nuvem (Single-Tenant), desenhado estritamente para <strong>Prefeituras, Governos e Corporações (Enterprise)</strong> que necessitam de obediência cega aos marcos regulatórios LATAM.
              </p>
            </div>

            <div>
              <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
                // Compliance Regulatório Nativo
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><span className="text-emerald-500">■</span> <strong>LGPD (Lei Geral de Proteção de Dados):</strong> Anonimização PII-Zero de ponta a ponta.</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">■</span> <strong>LAI (Lei de Acesso à Informação):</strong> Auditoria via Lazarus Vault.</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">■</span> <strong>ISO 27001 & SOC-2:</strong> Criptografia e controle absoluto de tráfego.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
                // O Poder do Middleware em Rust
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                O acesso Diamante aciona a verdadeira inteligência do Certus Engine: Um <strong>Middleware Híbrido programado em linguagem Rust</strong> hospedado na nuvem. Ele garante processamento em nível de silício (baixa latência), atuando como um "Cofre Intermediário" que intercepta, higieniza e audita todos os dados antes que eles cheguem aos modelos de IA, impedindo o vazamento institucional.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
