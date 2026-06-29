'use client'

import React from 'react'

const EDITIONS = [
  {
    id: 'sovereign',
    label: 'Sovereign SDK',
    description: 'Focado em Estética Emerald Ultra-Glass, Governança PII-Zero e Advisor de Arquitetura em tempo real.',
    icon: '🛡️',
    version: 'v1.3.5',
    size: '74 MB',
    badge: 'Recomendado',
    badgeClass: 'bg-emerald-500 text-black'
  },
  {
    id: 'command',
    label: 'Command SDK',
    description: 'Edição Premium para Operações Ofensivas e Auditoria Ativa de Segurança (FORGE: BOLA, IDOR, GraphQL).',
    icon: '⚔️',
    version: 'v1.3.5',
    size: '~71 MB',
    badge: 'Premium',
    badgeClass: 'bg-purple-500 text-white'
  }
]

export default function DownloadSelector() {
  const handleDownload = (edition: string) => {
    // Redireciona para o nosso proxy blindado do Vault, com timestamp para quebrar cache do navegador
    window.location.href = `/api/download?platform=${edition}&t=${Date.now()}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {EDITIONS.map((os) => (
        <button
          key={os.id}
          onClick={() => handleDownload(os.id)}
          className="group relative p-8 md:p-10 rounded-[32px] border transition-all duration-500 text-left overflow-hidden ultra-glass border-white/5 hover:border-emerald-500/20 hover:scale-[1.02] shadow-xl hover:shadow-emerald-500/5"
        >
          {/* Badge de Destaque */}
          <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${os.badgeClass}`}>
            {os.badge}
          </div>
          
          {/* Ícone Gigante */}
          <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">
            {os.icon}
          </div>
          
          {/* Detalhes da Versão */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono font-bold">
              Versão {os.version}
            </span>
            <span className="text-slate-600 text-[10px] font-mono">•</span>
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono font-bold">
              {os.size}
            </span>
          </div>
          
          {/* Título e Descrição */}
          <h4 className="text-white font-black text-2xl mb-4 group-hover:text-emerald-400 transition-colors">
            {os.label}
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {os.description}
          </p>

          {/* Botão de Download */}
          <div className="flex items-center gap-3 text-emerald-500">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
              <span className="text-sm font-bold">⬇</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
              Baixar SDK com 1 Clique
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
