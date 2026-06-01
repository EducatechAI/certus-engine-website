import Link from 'next/link'
import { ArrowLeft, Monitor, Smartphone, Tablet } from 'lucide-react'
import IDEWorkbench from '@/components/studio/IDEWorkbench'

export default function StudioPreviewPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[200px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 p-4 md:p-8 flex flex-col h-screen">
        
        {/* Top Control Bar */}
        <header className="flex items-center justify-between mb-8 ultra-glass px-6 py-4 rounded-2xl border border-emerald-500/10">
          <div className="flex items-center gap-6">
            <Link href="/studio" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-bold uppercase text-[10px] tracking-widest">
              <ArrowLeft size={16} />
              Sair do Preview
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-3">
              <span className="text-white font-black text-sm tracking-tighter">Certus Studio</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">PREVIEW v1.1.0</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
            <button className="p-2 rounded bg-emerald-500/20 text-emerald-400"><Monitor size={16} /></button>
            <button className="p-2 rounded text-slate-500 hover:text-slate-300"><Tablet size={16} /></button>
            <button className="p-2 rounded text-slate-500 hover:text-slate-300"><Smartphone size={16} /></button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Status da Engine</div>
              <div className="text-xs text-emerald-400 font-bold">Resiliência Máxima (100%)</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-xs">
              M
            </div>
          </div>
        </header>

        {/* Simulator Container */}
        <main className="flex-1 flex items-center justify-center relative group">
           {/* Shadow Glow */}
           <div className="absolute inset-0 bg-emerald-500/10 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           
           <div className="w-full max-w-6xl">
              <IDEWorkbench />
           </div>
        </main>

        {/* Bottom Status */}
        <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2">
            <div className="flex items-center gap-6">
                <span className="text-emerald-500/60 font-black">Sovereign Edition</span>
                <span>Audit Level: Tier A+</span>
                <span>PII-Zero Enforced</span>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Reforja: Ociosa
                </div>
                <span>Telemetria: Bloqueada</span>
            </div>
        </footer>
      </div>
    </div>
  )
}
