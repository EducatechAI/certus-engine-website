import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030d08] relative overflow-hidden flex flex-col justify-center items-center font-sans">
      {/* Background Animated SVG Circuit */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L90 10 M50 10 L50 90 M10 90 L90 90" stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.3"/>
              <circle cx="50" cy="50" r="2" fill="#10b981" className="animate-pulse" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 p-10 max-w-2xl text-center border border-emerald-500/40 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border border-red-500/50 bg-red-950/30 animate-pulse">
            <span className="text-red-500 font-mono text-xl font-bold">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-mono text-emerald-400 uppercase tracking-widest mb-4">
          Acesso Negado
        </h1>
        
        <p className="text-slate-300 font-mono text-sm leading-relaxed mb-8">
          O Dossiê requisitado ainda está em <strong className="text-emerald-500">Quarentena Criptográfica</strong>, 
          ou o protocolo de descompressão (Vercel Build) ainda está em andamento. 
          Aguarde a liberação temporal e tente novamente.
        </p>

        <Link 
          href="/status"
          className="inline-block px-8 py-3 border border-emerald-600 text-emerald-400 font-mono text-xs uppercase tracking-widest hover:bg-emerald-900/40 hover:text-emerald-300 transition-colors"
        >
          [Retornar ao Centro de Comando]
        </Link>
      </div>
    </main>
  );
}
