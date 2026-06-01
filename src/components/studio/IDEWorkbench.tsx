'use client'

import React, { useState, useEffect } from 'react'
import { 
  FileCode, 
  Search, 
  GitBranch, 
  Blocks, 
  Settings, 
  Terminal, 
  ChevronRight, 
  Folder, 
  X,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react'

export default function IDEWorkbench() {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Certus Engine v2.1.2 Booting...',
    '[AUTH] ZK-ID Hardware Binding Authenticated.',
    '[FLEET] Sentinel Qwen-3.6 Active.',
    '[REFORGE] Monitoring upstream microsoft/vscode...',
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        '[REFORGE] Applying Emerald Neon layer...',
        '[SHIELD] PII-Zero Scan: 0 vulnerabilities found.',
        '[TRIBUNAL] Cross-LLM Consensus established.',
        '[SINTAXE] Zero-Error Protocol Enforced.',
      ]
      setLogs(prev => [...prev.slice(-8), newLogs[Math.floor(Math.random() * newLogs.length)]])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex bg-[#010409] text-[#94a3b8] h-[800px] w-full rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl animate-fade-in-up">
      
      {/* Activity Bar */}
      <div className="w-12 bg-[#020617] flex flex-col items-center py-4 gap-6 border-r border-slate-900">
        <FileCode className="text-emerald-500" size={24} />
        <Search size={24} className="opacity-40 hover:opacity-100 transition-opacity" />
        <GitBranch size={24} className="opacity-40 hover:opacity-100 transition-opacity" />
        <Blocks size={24} className="opacity-40 hover:opacity-100 transition-opacity" />
        <div className="flex-1" />
        <Settings size={24} className="opacity-40 hover:opacity-100 transition-opacity" />
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-[#01060e] border-r border-slate-900 hidden md:flex flex-col">
        <div className="p-4 uppercase text-[10px] font-bold tracking-widest text-[#475569] flex justify-between items-center">
          Explorer
          <ChevronRight size={14} />
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          <div className="flex items-center gap-2 p-2 text-sm text-slate-200">
            <ChevronRight size={14} className="rotate-90" />
            <Folder size={16} className="text-emerald-500/60" />
            <span className="font-bold">certus-engine</span>
          </div>
          <div className="ml-6 flex flex-col gap-1 border-l border-slate-800">
            <div className="flex items-center gap-2 p-2 text-sm hover:bg-emerald-500/5 transition-colors group cursor-pointer">
              <span className="text-emerald-400 font-mono text-xs opacity-60">TSX</span>
              <span className="group-hover:text-emerald-400 transition-colors">IDEWorkbench.tsx</span>
            </div>
            <div className="flex items-center gap-2 p-2 text-sm hover:bg-emerald-500/5 transition-colors group cursor-pointer">
              <span className="text-emerald-400 font-mono text-xs opacity-60">CSS</span>
              <span className="group-hover:text-emerald-400 transition-colors">Sovereign.css</span>
            </div>
            <div className="flex items-center gap-2 p-2 text-sm bg-emerald-500/10 border-r-2 border-emerald-500">
              <span className="text-emerald-400 font-mono text-xs">ZK</span>
              <span className="text-white">Shield.proto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-[#020617]">
        {/* Tabs */}
        <div className="h-9 bg-[#010409] flex items-center px-4 border-b border-slate-900">
          <div className="flex items-center gap-3 bg-[#020617] px-4 h-full border-t-2 border-emerald-500 text-xs text-white">
            <span className="text-emerald-400 font-bold">ZK</span>
            Shield.proto
            <X size={12} className="opacity-40" />
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-8 font-mono text-sm overflow-hidden relative">
          <div className="absolute right-8 top-8 opacity-20 pointer-events-none">
            <ShieldCheck size={200} className="text-emerald-500" />
          </div>
          
          <div className="flex gap-6">
            <div className="text-slate-700 text-right select-none pr-4 border-r border-slate-900">
              {Array.from({ length: 15 }).map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="flex-1">
              <div className="text-emerald-400 italic mb-4">// Certus Sovereign Engine v2.1.2</div>
              <div className="mb-1"><span className="text-emerald-500 font-bold">protocol</span> <span className="text-white">Shield</span> {'{'}</div>
              <div className="ml-4 mb-1">
                <span className="text-emerald-500 font-bold">mode</span> sovereignty = <span className="text-amber-400">"absolute"</span>;
              </div>
              <div className="ml-4 mb-1">
                <span className="text-emerald-500 font-bold">guard</span> pii_zero_logic {'{'}
              </div>
              <div className="ml-8 mb-1">
                <span className="text-emerald-500">mask</span> sensitive_data;
              </div>
              <div className="ml-8 mb-1 text-emerald-300">
                <span className="text-white">deterministic_patch</span>(upstream_vscode);
              </div>
              <div className="ml-4 mb-1">{'}'}</div>
              <div className="mb-1">{'}'}</div>
              <div className="mt-6 flex items-center gap-2 text-emerald-400 animate-pulse">
                <ChevronRight size={14} />
                <span className="w-2 h-4 bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Area */}
        <div className="h-48 bg-[#010409] border-t border-slate-900 flex flex-col">
          <div className="px-4 py-2 flex gap-6 text-[10px] font-bold uppercase tracking-widest border-b border-slate-900">
            <span className="text-emerald-400 border-b border-emerald-500 pb-1">Terminal</span>
            <span className="text-slate-600">Problemas</span>
            <span className="text-slate-600">Console de Depuração</span>
            <div className="flex-1" />
            <div className="flex items-center gap-4 text-emerald-500/40">
                <Cpu size={12} />
                <Zap size={12} />
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('REFORGE') ? 'text-emerald-400' : 'text-slate-500'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sovereign Ribbon */}
      <div className="absolute top-20 right-10 flex flex-col gap-3 pointer-events-none">
         <div className="ultra-glass p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-3xl animate-float">
            <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Motor de Reforja</div>
            <div className="h-1 w-32 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-2/3 animate-pulse" />
            </div>
         </div>
      </div>

    </div>
  )
}
