'use client';
import { useEffect, useState } from 'react';

interface Props {
  releasedCount: number;
  lockedCount: number;
  totalCount: number;
  nextRelease: string | null;
}

export default function CommandCenterDashboard({ releasedCount, lockedCount, totalCount, nextRelease }: Props) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!nextRelease) {
      setCountdown('MATRIZ 100% LIBERADA');
      return;
    }

    const interval = setInterval(() => {
      const diff = new Date(nextRelease).getTime() - Date.now();
      if (diff > 0) {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      } else {
        setCountdown('INICIANDO FORJA...');
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [nextRelease]);

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      
      {/* Box 1: Documentos Vivos */}
      <div className="p-8 border border-emerald-500/40 rounded-2xl bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col justify-center items-center text-center group hover:border-emerald-400 transition-colors">
        <span className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">Documentos Vivos</span>
        <span className="text-emerald-400 font-mono text-5xl font-bold drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          {releasedCount}
        </span>
      </div>

      {/* Box 2: Timer Regressivo (Destaque Central) */}
      <div className="p-8 border-2 border-emerald-500/60 rounded-2xl bg-[#011409]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
        <span className="text-emerald-500 text-xs uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Próxima Liberação Soberana
        </span>
        <span className="text-emerald-300 font-mono text-4xl lg:text-5xl font-bold tracking-wider">
          {countdown || '--:--:--'}
        </span>
      </div>

      {/* Box 3: Quarentena Criptográfica */}
      <div className="p-8 border border-emerald-900/60 rounded-2xl bg-black/60 backdrop-blur-xl flex flex-col justify-center items-center text-center relative">
        <span className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-4">Em Quarentena Criptográfica</span>
        <span className="text-emerald-800 font-mono text-5xl font-bold">
          {lockedCount}
        </span>
        <div className="absolute bottom-4 text-[10px] text-emerald-900/80 font-mono uppercase tracking-widest">
          Capacidade Total: {totalCount} Nós
        </div>
      </div>

    </div>
  );
}
