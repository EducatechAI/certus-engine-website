import fs from 'fs';
import path from 'path';
import CommandCenterDashboard from '@/components/ui/CommandCenterDashboard';

// Otimização SEO
export const metadata = {
  title: 'Status Operacional | OMNI MATRIX V3',
  description: 'Acompanhe em tempo real a geração autônoma de documentos soberanos do Certus Engine. Arquitetura ZK-SNARKs e PII-Zero.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function StatusPage() {
  const seedsPath = path.join(process.cwd(), 'src', 'data', 'seeds.json');
  let seeds = [];
  try {
    seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));
  } catch (e) {
    console.error('Erro ao ler seeds no status page', e);
  }

  const now = Date.now();
  const releasedSeeds = seeds.filter((s: any) => new Date(s.releaseDate).getTime() <= now && s.contentMarkdown);
  const lockedCount = seeds.length - releasedSeeds.length;
  
  // Acha a próxima semente que será liberada
  const nextSeed = seeds.find((s: any) => new Date(s.releaseDate).getTime() > now);
  const nextRelease = nextSeed ? nextSeed.releaseDate : null;

  return (
    <main className="min-h-screen bg-[#030d08] relative overflow-hidden flex flex-col font-sans selection:bg-emerald-500/30">
      {/* Background Animated SVG Circuit (Simplified for scale) */}
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

      <div className="relative z-10 container mx-auto px-6 py-16 flex-grow flex flex-col">
        
        {/* HEADER / STATUS LINE */}
        <div className="w-full border border-emerald-900/50 bg-black/40 backdrop-blur-md rounded-lg p-3 mb-10 flex flex-wrap items-center justify-between text-xs font-mono text-emerald-500/70 uppercase tracking-widest">
          <span>Sistema Operacional: OMNI MATRIX V3</span>
          <span className="hidden md:inline">•</span>
          <span>Protocolo: Drip-Feed JIT</span>
          <span className="hidden md:inline">•</span>
          <span>Criptografia: PII-Zero + ZK-SNARK</span>
          <span className="hidden md:inline">•</span>
          <span className="text-emerald-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Status: ATIVO
          </span>
        </div>

        {/* DASHBOARD CORE */}
        <CommandCenterDashboard 
          releasedCount={releasedSeeds.length} 
          lockedCount={lockedCount} 
          totalCount={seeds.length} 
          nextRelease={nextRelease} 
        />

        {/* LISTA DE DOCUMENTOS VIVOS */}
        <div className="mt-16 w-full max-w-5xl mx-auto">
          <h2 className="text-xl font-mono text-emerald-400 uppercase tracking-widest mb-6 border-b border-emerald-900/50 pb-2">
            Terminal Log: Documentos Vivos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {releasedSeeds.length === 0 ? (
              <div className="col-span-full p-8 text-center border border-emerald-900/30 rounded-xl bg-black/20 text-emerald-600/50 font-mono">
                Aguardando autorização temporal para a primeira liberação...
              </div>
            ) : (
              releasedSeeds.slice().reverse().map((seed: any) => (
                <a 
                  key={seed.id} 
                  href={`/${seed.locale}/${seed.assunto}/${seed.slug}`}
                  className="group block p-4 border border-emerald-900/40 rounded-lg bg-black/40 hover:bg-emerald-950/20 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-emerald-600 uppercase">[{seed.locale.toUpperCase()}] • {seed.law}</span>
                    <span className="text-[10px] font-mono text-slate-500">{new Date(seed.releaseDate).toLocaleString()}</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-300 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {seed.title}
                  </h3>
                </a>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
