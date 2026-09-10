'use client';
import { useState, useEffect } from 'react';
// Simulating search for Layer 1. Can plug fuse.js or Algolia later.
import searchIndex from '@/data/docs/index.json';

export function DocsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const lowerQ = query.toLowerCase();
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQ) || 
      item.content.toLowerCase().includes(lowerQ)
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="relative mb-8">
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between bg-black/40 border border-emerald-900/40 rounded-xl px-4 py-3 text-slate-400 hover:border-emerald-500/50 transition-colors"
      >
        <span className="flex items-center gap-3">
          <span>🔍</span>
          <span className="text-sm">Buscar na documentação...</span>
        </span>
        <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">⌘K</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#000402] border border-emerald-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-4">
              <span className="text-emerald-500">🔍</span>
              <input 
                autoFocus
                type="text" 
                placeholder="Busque por PII-Zero, LAZARUS, Ed25519..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg"
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white text-xs uppercase font-bold tracking-widest px-2 py-1 bg-slate-900 rounded">ESC</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {results.length > 0 ? (
                <ul className="space-y-1">
                  {results.map((res, i) => (
                    <li key={i}>
                      <a href={res.path} className="block p-3 rounded-lg hover:bg-emerald-900/20 transition-colors border border-transparent hover:border-emerald-900/50">
                        <h4 className="text-emerald-400 font-bold text-sm mb-1">{res.title}</h4>
                        <p className="text-slate-400 text-xs line-clamp-2">{res.content}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : query ? (
                <div className="p-8 text-center text-slate-500">Nenhum resultado para "{query}"</div>
              ) : (
                <div className="p-8 text-center text-slate-600 text-sm">Digite para buscar (client-side mock ready for Algolia)</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
