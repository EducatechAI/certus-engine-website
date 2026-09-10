'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DocsSidebar() {
  const pathname = usePathname();
  
  const SECTIONS = [
    { title: 'Overview', links: [
      { name: 'Hub da Documentação', path: '/documentacao' },
      { name: 'Getting Started', path: '/documentacao/getting-started' }
    ]},
    { title: 'Core', links: [
      { name: 'Architecture & Failure', path: '/documentacao/architecture' },
      { name: 'Security & Crypto', path: '/documentacao/security-cryptography' },
      { name: 'Policy Language', path: '/documentacao/policy-language' }
    ]},
    { title: 'Integration', links: [
      { name: 'API Reference', path: '/documentacao/api-reference' },
      { name: 'SDKs & CLI', path: '/documentacao/sdks' }
    ]},
    { title: 'Governance', links: [
      { name: 'Compliance Mappings', path: '/documentacao/compliance' },
      { name: 'Operations & Runbook', path: '/documentacao/operations' }
    ]}
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 overflow-y-auto pr-6 border-r border-emerald-900/20 py-8">
      
      <div className="mb-8">
        <select className="w-full bg-black/40 border border-emerald-900/50 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono outline-none focus:border-emerald-500/50 cursor-pointer">
          <option value="v3.4.0">v3.4.0 (latest)</option>
          <option value="v3.3.0">v3.3.0 (legacy)</option>
        </select>
      </div>

      <nav className="flex-1 space-y-8">
        {SECTIONS.map((sec, i) => (
          <div key={i}>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{sec.title}</h4>
            <ul className="space-y-1.5">
              {sec.links.map(link => {
                const active = pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link 
                      href={link.path}
                      className={`block text-sm px-3 py-1.5 rounded-md transition-colors border-l-2 ${
                        active 
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-medium' 
                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Status Widget */}
      <div className="mt-8 pt-6 border-t border-emerald-900/20">
        <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Status
        </h4>
        <ul className="space-y-2 text-xs font-mono text-slate-400 mb-3">
          <li className="flex justify-between"><span>Core Engine</span><span className="text-emerald-400">ONLINE ✓</span></li>
          <li className="flex justify-between"><span>PII Shield</span><span className="text-emerald-400">ONLINE ✓</span></li>
          <li className="flex justify-between"><span>LAZARUS</span><span className="text-emerald-400">ONLINE ✓</span></li>
        </ul>
        <Link href="/status" className="text-[10px] text-emerald-500 hover:underline uppercase tracking-widest">Ver relatorio completo →</Link>
      </div>

    </aside>
  );
}
