'use client'

import React from 'react'

const RESOURCES = [
  { 
    title: 'Governor Kernel SDK', 
    version: 'v2.2.0',
    desc: 'O núcleo de execução para integração nativa com o motor Certus.',
    type: 'SDK'
  },
  { 
    title: 'Sovereign Manifesto', 
    version: 'PDF',
    desc: 'As bases teóricas do determinismo técnico e governança de IA.',
    type: 'Doc'
  },
  { 
    title: 'Certus CLI', 
    version: 'v1.4.2',
    desc: 'Ferramenta de terminal para auditoria local de patches e gestão de chaves.',
    type: 'Tool'
  },
  { 
    title: 'Emerald UI Kit', 
    version: 'Figma',
    desc: 'Biblioteca de componentes visual para interfaces de alta autoridade.',
    type: 'Design'
  },
]

export default function RestrictedResources() {
  return (
    <div className="mt-24 animate-fade-in-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black text-white mb-4">Kit de <span className="text-emerald-500">Sobrevivência Técnica.</span></h2>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Recursos restritos liberados após validação de autoridade Master.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {RESOURCES.map(res => (
          <div key={res.title} className="ultra-glass rounded-3xl p-8 border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
             <div>
                <div className="flex justify-between items-start mb-6">
                   <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{res.title}</h3>
                   <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      {res.version}
                   </span>
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{res.desc}</p>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{res.type}</span>
                <button className="px-6 py-2 rounded-lg bg-emerald-600 text-black text-xs font-black hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
                   Download
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
