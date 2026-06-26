import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface DocumentDownloadProps {
  baseName: string;
  version: string;
  locale: string;
  title: string;
  desc: string;
  size: string;
}

export function DocumentDownload({ baseName, version, locale, title, desc, size }: DocumentDownloadProps) {
  const fileName = `${baseName}-${version}-${locale}.pdf`;
  const downloadUrl = `/downloads/${fileName}`;
  const hashUrl = `/downloads/${fileName}.sha256`;
  
  return (
    <div className="bg-navy-800/40 border border-navy-700/60 p-6 rounded-2xl flex flex-col justify-between hover:bg-navy-900/40 hover:border-emerald-500/30 transition-all group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20">PDF</span>
          <span className="text-[10px] text-gray-500 font-mono font-bold">{size}</span>
        </div>
        <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{desc}</p>
      </div>

      <div className="mt-6 space-y-3">
        <a 
          href={downloadUrl} 
          download
          className="w-full inline-flex justify-center items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 px-4 py-2 rounded-lg hover:bg-emerald-600/40 transition-colors text-sm font-bold"
        >
          <Download size={16} />
          {locale === 'en' ? 'Download PDF' : locale === 'es' ? 'Descargar PDF' : 'Baixar PDF'}
        </a>
        
        <div className="text-[10px] text-gray-400 font-mono bg-black/40 p-3 rounded-lg border border-navy-700">
          <div className="flex items-center gap-1.5 mb-2">
            <ShieldCheck className="text-emerald-500" size={14} />
            <span className="font-bold text-gray-300">
              {locale === 'en' ? 'Cryptographically signed' : locale === 'es' ? 'Firmado criptográficamente' : 'Assinado criptograficamente'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 overflow-hidden">
              <span className="text-emerald-500/70">SHA-256:</span>
              <a href={hashUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-emerald-400 truncate hover:underline" title="Ver hash na íntegra">
                [visualizar hash.sha256]
              </a>
            </div>
            <Link href="/verify" className="text-blue-400 hover:text-blue-300 hover:underline mt-1 inline-block">
              → {locale === 'en' ? 'Verify authenticity' : locale === 'es' ? 'Verificar autenticidad' : 'Verificar autenticidade no LAZARUS'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
