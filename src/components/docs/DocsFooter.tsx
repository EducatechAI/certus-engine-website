'use client';
import { usePathname } from 'next/navigation';

export function DocsFooter() {
  const pathname = usePathname();
  const editUrl = `https://github.com/EducatechAI/certus-engine-website/edit/main/src/app/(public)${pathname}/page.tsx`;

  return (
    <footer className="mt-16 pt-8 border-t border-emerald-900/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
      <div className="space-y-1 text-center md:text-left">
        <p>Última atualização: <span className="text-slate-300">2026-09-10</span></p>
        <p>Autor: <span className="text-emerald-400">Paulino Gerlack</span></p>
        <p>Revisão: <span className="text-emerald-400">✓ Revisado</span> | Versão: <span className="text-slate-300">3.4.0</span></p>
      </div>
      <div className="flex gap-4">
        <a href={editUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-black/40 hover:bg-slate-800 hover:text-white transition-colors">
          Edit on GitHub ↗
        </a>
        <a href="https://github.com/EducatechAI/certus-engine-website/issues/new?labels=docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-black/40 hover:bg-slate-800 hover:text-white transition-colors">
          Report issue ↗
        </a>
      </div>
    </footer>
  );
}
