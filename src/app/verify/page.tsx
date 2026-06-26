'use client'

import React, { useState } from 'react';
import { ShieldCheck, UploadCloud, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/i18n/I18nProvider';

// Um simples calculador SHA-256 no browser
async function calculateSHA256(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function VerifyPage() {
  const { t, locale } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const checkAgainstLazarus = async (computedHash: string) => {
    try {
      const res = await fetch('/downloads/hashes.json');
      if (res.ok) {
        const data = await res.json();
        return data.documents.some((doc: any) => doc.sha256 === computedHash);
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsVerifying(true);
      setIsValid(null);

      try {
        const computedHash = await calculateSHA256(selectedFile);
        setHash(computedHash);
        const valid = await checkAgainstLazarus(computedHash);
        setIsValid(valid);
      } catch (err) {
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-emerald-500 hover:underline mb-8 inline-block text-sm">
          &larr; {locale === 'en' ? 'Back to home' : locale === 'es' ? 'Volver al inicio' : 'Voltar ao início'}
        </Link>
        
        <div className="text-center mb-10">
          <ShieldCheck className="mx-auto text-emerald-400 mb-4" size={48} />
          <h1 className="text-3xl font-black text-white mb-4">
            {locale === 'en' ? 'Authenticity Verification' : locale === 'es' ? 'Verificación de Autenticidad' : 'Verificação de Autenticidade'}
          </h1>
          <p className="text-gray-400">
            {locale === 'en' 
              ? 'Upload a Certus Engine PDF to verify its cryptographic integrity via the LAZARUS Vault.' 
              : locale === 'es' 
              ? 'Sube un PDF de Certus Engine para verificar su integridad criptográfica a través del LAZARUS Vault.' 
              : 'Faça upload de um PDF do Certus Engine para verificar sua integridade criptográfica no LAZARUS Vault.'}
          </p>
        </div>

        <div className="bg-navy-900/50 border border-navy-800 rounded-2xl p-8 shadow-xl">
          <div className="border-2 border-dashed border-navy-600 rounded-xl p-10 text-center hover:bg-navy-800/30 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="application/pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={handleFileUpload}
            />
            <UploadCloud className="mx-auto text-navy-400 mb-4" size={32} />
            <p className="text-white font-bold mb-2">
              {locale === 'en' ? 'Select a PDF document' : locale === 'es' ? 'Selecciona un documento PDF' : 'Selecione um documento PDF'}
            </p>
            <p className="text-xs text-gray-500">
              {file ? file.name : (locale === 'en' ? 'Or drag and drop here' : locale === 'es' ? 'O arrastra y suelta aquí' : 'Ou arraste e solte aqui')}
            </p>
          </div>

          {isVerifying && (
            <div className="mt-8 text-center text-emerald-400 font-mono text-sm animate-pulse">
              [CALCULATING SHA-256 HASH...]
            </div>
          )}

          {hash && !isVerifying && (
            <div className="mt-8">
              <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-400 break-all mb-4 border border-navy-800">
                <span className="text-emerald-500">SHA-256:</span> {hash}
              </div>

              {isValid ? (
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-6 flex items-start gap-4">
                  <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
                  <div>
                    <h3 className="text-emerald-400 font-bold mb-1">
                      {locale === 'en' ? 'Authentic Document' : locale === 'es' ? 'Documento Auténtico' : 'Documento Autêntico'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {locale === 'en' 
                        ? 'This document is intact. The hash matches a sealed record in the LAZARUS Vault.' 
                        : locale === 'es' 
                        ? 'Este documento está intacto. El hash coincide con un registro sellado en el LAZARUS Vault.' 
                        : 'Este documento está intacto. O hash coincide com um registro selado no LAZARUS Vault.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 flex items-start gap-4">
                  <AlertTriangle className="text-red-400 shrink-0" size={24} />
                  <div>
                    <h3 className="text-red-400 font-bold mb-1">
                      {locale === 'en' ? 'Unrecognized Document' : locale === 'es' ? 'Documento No Reconocido' : 'Documento Não Reconhecido'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {locale === 'en' 
                        ? 'This file was not found in the LAZARUS Vault. It may have been tampered with or is not an official Certus document.' 
                        : locale === 'es' 
                        ? 'Este archivo no se encontró en el LAZARUS Vault. Puede haber sido alterado o no es un documento oficial de Certus.' 
                        : 'Este arquivo não foi encontrado no LAZARUS Vault. Ele pode ter sido adulterado ou não é um documento oficial do Certus.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
