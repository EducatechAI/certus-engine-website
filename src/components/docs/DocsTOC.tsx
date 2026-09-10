'use client';
import { useEffect, useState } from 'react';

export function DocsTOC() {
  const [headings, setHeadings] = useState<{id: string, text: string, level: string}[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .filter(el => el.id)
      .map(el => ({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName.toLowerCase()
      }));
    setHeadings(elements);
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="w-48 shrink-0 hidden xl:block sticky top-24 self-start h-[calc(100vh-100px)] overflow-y-auto pl-6 border-l border-emerald-900/20">
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Nesta página</h4>
      <ul className="space-y-2.5 text-xs">
        {headings.map(h => (
          <li key={h.id} className={`${h.level === 'h3' ? 'ml-3' : ''}`}>
            <a href={`#${h.id}`} className="text-slate-400 hover:text-emerald-400 transition-colors line-clamp-2">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
