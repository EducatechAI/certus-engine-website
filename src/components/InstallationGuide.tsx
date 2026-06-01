'use client'

import React from 'react'

const InstallationGuide = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Injeção da <span className="text-emerald-500">Soberania.</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Siga os 3 passos simples abaixo para injetar e ativar o Certus Studio no seu ambiente local de desenvolvimento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">01</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">Extração</h4>
            <h3 className="text-xl font-bold text-white mb-4">Prepare seu Core</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Extraia o arquivo ZIP do SDK baixado na mesma pasta raiz onde você possui o código-fonte do VS Code OSS ou VSCodium.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-emerald-400">
               Unzip Certus_Studio_SDK.zip -d ./
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">02</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">Injeção</h4>
            <h3 className="text-xl font-bold text-white mb-4">Injete e Compile</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Execute o script de injeção correspondente à sua plataforma para acoplar a IA e o painel de governança no núcleo do editor, e compile.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 overflow-x-auto">
              Windows: powershell ./sovereign_inject.ps1<br/>
              Linux/Mac: ./sovereign_inject.sh<br/>
              Build: yarn run build
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-9xl font-black text-white/5 select-none transition-all group-hover:text-emerald-500/10">03</div>
          <div className="relative">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-emerald-500">Ativação</h4>
            <h3 className="text-xl font-bold text-white mb-4">Soberania Ativa</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Inicialize a IDE compilada, cole seu token de 30 dias na chave <code>certus.premium.licenseToken</code> nas Configurações (Ctrl + ,) e comece a forjar.
            </p>
            <div className="flex gap-2 items-center">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Certus Studio 100% Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallationGuide
