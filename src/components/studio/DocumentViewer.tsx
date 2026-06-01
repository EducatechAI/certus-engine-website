'use client'

import Link from 'next/link'
import { FileText, ArrowLeft, Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

interface DocumentViewerProps {
  content: string;
  title: string;
}

export default function DocumentViewer({ content, title }: DocumentViewerProps) {
  
  const downloadPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(content, 180);
    doc.setFontSize(16);
    doc.text(title, 10, 20);
    doc.setFontSize(10);
    doc.text(splitText, 10, 30);
    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  }

  // Simple Markdown to HTML parser (Zero-Dep)
  const renderMarkdown = (src: string) => {
    return src
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black text-white mb-8 mt-12">{line.slice(2)}</h1>
        if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-black text-emerald-400 mb-6 mt-10">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-slate-200 mb-4 mt-8">{line.slice(4)}</h3>
        
        // Blockquotes
        if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-emerald-500 pl-6 py-2 my-6 italic text-slate-300 bg-emerald-500/5">{line.slice(2)}</blockquote>
        
        // Horizontal Rule
        if (line.startsWith('---')) return <hr key={i} className="border-slate-800 my-12" />

        // Tables (Simplified detection)
        if (line.includes('|') && line.includes('---')) return null // Separator row
        if (line.startsWith('|')) {
          const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
          return (
            <div key={i} className="grid grid-cols-2 gap-4 border-b border-slate-800 py-3 text-sm">
                <span className="font-mono text-emerald-500 font-bold">{cells[0]}</span>
                <span className="text-slate-400">{cells[1]}</span>
            </div>
          )
        }

        // List items
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            return <li key={i} className="ml-6 text-slate-400 mb-2 list-disc">{line.trim().slice(2)}</li>
        }

        // Bold and Code inlines
        const formattedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="font-mono bg-slate-800 px-1 rounded text-emerald-400">$1</code>')

        return (
          <p 
            key={i} 
            className="text-slate-400 leading-relaxed mb-4 text-justify"
            dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }}
          />
        )
      })
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 overflow-x-hidden">
       {/* Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="aurora opacity-30" />
        <div className="grid-bg opacity-10 h-full w-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/studio" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-bold uppercase text-xs tracking-widest">
            <ArrowLeft size={16} />
            Voltar ao Studio
          </Link>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full ultra-glass border border-emerald-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Documento Autenticado</span>
             </div>
             <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all font-bold text-sm"
             >
                <Download size={16} />
                PDF
             </button>
          </div>
        </div>

        {/* Paper Container */}
        <article className="ultra-glass rounded-[40px] p-8 md:p-16 border border-emerald-500/10 shadow-3xl">
          <div className="flex items-center gap-4 mb-12 opacity-50">
            <FileText className="text-emerald-500" size={32} />
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500 to-transparent" />
          </div>
          
          <div className="prose prose-invert max-w-none">
            {renderMarkdown(content)}
          </div>

          {/* Footer Signature */}
          <div className="mt-20 pt-10 border-t border-slate-800 text-center">
             <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] mb-4">
                © 2026 CERTUS ENGINE • INFRAESTRUTURA SOBERANA
             </p>
             <div className="inline-block px-4 py-1 rounded-md border border-slate-800 text-[10px] font-mono text-slate-500">
                HASH ORIGEM: SHA-256_{Math.random().toString(36).substring(7).toUpperCase()}
             </div>
          </div>
        </article>
      </div>
    </div>
  )
}
