'use client';
import { useEffect, useState } from 'react';
import { getDripFeedStats, ZERO_DAY } from '@/utils/dripFeedMath';

export default function DripFeedDashboard({ totalPages = 4680 }: { totalPages?: number }) {
  const [stats, setStats] = useState({ released: 0, total: totalPages, nextRelease: '' });
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    setStats(getDripFeedStats(ZERO_DAY, totalPages));
    
    const interval = setInterval(() => {
      const currentStats = getDripFeedStats(ZERO_DAY, totalPages);
      setStats(currentStats);
      
      if (currentStats.nextRelease) {
        const diff = new Date(currentStats.nextRelease).getTime() - Date.now();
        if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        } else {
          setCountdown('00:00:00');
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 p-5 border border-emerald-500/40 rounded-2xl bg-black/70 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] font-sans">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-emerald-500 text-xs tracking-[0.2em] uppercase font-bold">Matriz Soberana Ativa</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Documentos Vivos</span>
            <span className="text-emerald-400 font-mono text-2xl font-bold">{stats.released} <span className="text-emerald-900 text-lg">/ {stats.total}</span></span>
          </div>
          <div className="h-10 w-px bg-emerald-800/60"></div>
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Próximo Nó em</span>
            <span className="text-emerald-300 font-mono text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{countdown || '--:--:--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
