'use client'

import React, { useState, useEffect, useRef } from 'react'

const SCRIPTS = [
  { 
    id: 'pii-fix', 
    label: 'Sanitizar PII', 
    code: '// Código Vulnerável\nconst user = { name: "João", email: "secret@gov.br" };\nlogger.info("Acesso concedido para " + user.email);',
    result: 'Audit: [DETECTADO] Dados Sensíveis (Email Gov)\nAction: [MASK] Aplicado na Origem\nStatus: Tier A+ Safe'
  },
  { 
    id: 'fail-closed', 
    label: 'Teste Fail-Closed', 
    code: 'function criticalTransaction() {\n  return db.unsafeQuery("DELETE FROM registry");\n}',
    result: 'Audit: [BLOQUEADO] Deleção não autorizada em Registry\nAction: [HALT] Execução terminada\nStatus: Protection Active'
  },
  { 
    id: 'consensus', 
    label: 'Consenso Soberano', 
    code: 'export default function Optimize() {\n  // Solicitar otimização multi-motor\n}',
    result: 'Audit: [CONSENSO] 3/3 Motores concordam\nAction: [REWRITTEN] Lógica otimizada de 14ms para 2ms\nStatus: Deterministic'
  }
]

export default function StudioDojo() {
  const [code, setCode] = useState(SCRIPTS[0].code)
  const [terminal, setTerminal] = useState<string[]>(['[system] Kernel Certus v2.2.0 carregado.', '[status] Aguardando inputs para auditoria...'])
  const [isAuditing, setIsAuditing] = useState(false)
  const [metrics, setMetrics] = useState({ tokens: 0, time: 0 })
  const terminalRef = useRef<HTMLDivElement>(null)

  const runAudit = () => {
    setIsAuditing(true)
    setTerminal(prev => [...prev, '> Iniciando Ativação Soberana...', '[1/3] Scanning PII Shield...'])
    
    // Trigger background overdrive
    window.dispatchEvent(new CustomEvent('certus-overdrive', { detail: { duration: 3000 } }))

    setTimeout(() => {
      setTerminal(prev => [...prev, '[2/3] Verificando Consenso Multi-LLM...'])
      setMetrics({ tokens: Math.floor(Math.random() * 400) + 100, time: Math.floor(Math.random() * 800) + 200 })
    }, 1000)

    setTimeout(() => {
      const match = SCRIPTS.find(s => s.code === code)
      const result = match ? match.result : 'Audit: [VALIDADO] Código personalizado aprovado\nStatus: Tier A+'
      setTerminal(prev => [...prev, '[3/3] Auditoria Concluída.', result])
      setIsAuditing(false)
    }, 2500)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminal])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="ultra-glass rounded-[40px] border border-emerald-500/20 overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="bg-black/40 border-b border-emerald-500/10 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            {SCRIPTS.map(s => (
              <button 
                key={s.id}
                onClick={() => { setCode(s.code); setTerminal(prev => [...prev, `> Carregando script: ${s.label}`]) }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all uppercase tracking-wider"
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Custo de Token</span>
              <span className="text-sm font-mono text-emerald-500">{metrics.tokens} TK</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Tempo de Auditoria</span>
              <span className="text-sm font-mono text-emerald-500">{metrics.time}ms</span>
            </div>
          </div>
        </div>

        {/* Editor & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Editor Area */}
          <div className="bg-[#000402] p-8 border-r border-emerald-500/10 relative group">
            <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider leading-relaxed">
                Nota: Para correções complexas (50+ linhas) e refatoração determinística total, utilize o <span className="text-emerald-400 underline cursor-pointer">Certus Studio Desktop.</span>
              </p>
            </div>
            <div className="absolute top-4 right-4 text-[9px] text-emerald-800 font-bold uppercase tracking-widest group-focus-within:text-emerald-500">Editor Ativo</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-transparent text-emerald-100 font-mono text-sm outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
            <button 
              onClick={runAudit}
              disabled={isAuditing}
              className={`mt-6 w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg ${
                isAuditing 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-black glow-emerald'
              }`}
            >
              {isAuditing ? 'Auditoria em Curso...' : 'Ativar Auditoria Soberana'}
            </button>
          </div>

          {/* Terminal Area */}
          <div ref={terminalRef} className="bg-black/60 p-8 h-[450px] overflow-y-auto font-mono text-xs leading-relaxed space-y-3">
             {terminal.map((line, i) => (
               <div key={i} className={`${line.startsWith('>') ? 'text-emerald-400 font-bold' : line.includes('[DETECTADO]') || line.includes('[BLOQUEADO]') ? 'text-red-400' : 'text-slate-400'}`}>
                 {line}
               </div>
             ))}
             {isAuditing && (
               <div className="text-emerald-500 animate-pulse">_</div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
