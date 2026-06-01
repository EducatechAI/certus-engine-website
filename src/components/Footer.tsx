'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-emerald-900/10 bg-[#000402]/80 backdrop-blur-xl py-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-black font-black text-xs">C</div>
              <span className="font-black text-lg tracking-tighter text-white">Certus<span className="text-emerald-500">Engine</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">
              O motor de governança soberana que transforma probabilidade em determinismo absoluto. 
            </p>
            <div className="flex gap-4">
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
               <div className="w-4 h-4 bg-emerald-900/20 border border-emerald-500/20 rounded" />
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">Plataforma</h4>
            <ul className="space-y-4">
              {[
                { name: 'O Cérebro', href: '/o-cerebro' },
                { name: 'Frota Soberana', href: '/projetos' },
                { name: 'Certus Studio', href: '/studio' },
                { name: 'API Privada', href: '/api-privada' }
              ].map(link => (
                <li key={link.name}><Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links Group 2 */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">Governança</h4>
            <ul className="space-y-4">
              {[
                { name: 'Documentação', href: '/documentacao' },
                { name: 'Recursos', href: '/api-privada' },
                { name: 'Auditoria RR1', href: '#' },
                { name: 'FAQ', href: '/faq' }
              ].map(link => (
                <li key={link.name}><Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">Newsletter Soberana</h4>
            <p className="text-xs text-slate-500 mb-4 font-medium">Receba atualizações do Tier A+ e novos gateways.</p>
            <div className="flex gap-2">
               <input type="text" placeholder="Email institucional" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50 w-full" />
               <button className="bg-emerald-600 text-black px-3 py-2 rounded-lg text-[10px] font-bold">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/20 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">© 2026 CERTUS ENGINE // SOVEREIGN MASTER EDITION</p>
           <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <Link href="/faq" className="hover:text-emerald-500">FAQ</Link>
              <Link href="/documentacao" className="hover:text-emerald-500">Soberania</Link>
              <Link href="#" className="hover:text-emerald-500">Apex Guardian</Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
