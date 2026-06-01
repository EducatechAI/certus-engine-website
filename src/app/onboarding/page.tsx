'use client'

import React, { useState } from 'react'

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative z-10 pt-32 pb-24 min-h-screen flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <section className="max-w-3xl w-full px-4 sm:px-6 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          Divisão <span className="gradient-text">Command.</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium">
          Acesso especializado para Auditores de Segurança e Pesquisadores de Elite. Requer validação de autoridade.
        </p>
      </section>

      {!submitted ? (
        <section className="w-full max-w-xl px-4 mb-24">
          <form onSubmit={handleSubmit} className="ultra-glass rounded-3xl p-8 md:p-12 border border-emerald-500/20 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Seu Nome Real</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Paulo Silva"
                  className="w-full bg-black/40 border border-emerald-500/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">E-mail Corporativo ou Educacional</label>
                <input 
                  type="email" 
                  required
                  placeholder="nome@exemplo.com"
                  className="w-full bg-black/40 border border-emerald-500/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Hardware ID (Opcional - Para Trial)</label>
                <input 
                  type="text" 
                  placeholder="Obtenha na IDE (Ex: 8F2A-9B3C)"
                  className="w-full bg-black/40 border border-emerald-500/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-lg transition-all uppercase tracking-wide glow-emerald"
                >
                  Solicitar Credencial Command
                </button>
              </div>
            </div>
            <p className="mt-8 text-[10px] text-slate-500 text-center leading-relaxed">
              Ao solicitar, você concorda com o Código de Conduta do Hacker do Bem e aceita que sua atividade será auditada pelo motor Certus.
            </p>
          </form>
        </section>
      ) : (
        <section className="w-full max-w-xl px-4 text-center mb-24">
          <div className="ultra-glass rounded-3xl p-12 border border-emerald-500/30 glow-emerald">
            <div className="text-5xl mb-6">🎫</div>
            <h2 className="text-3xl font-bold text-white mb-4">Solicitação Enviada!</h2>
            <p className="text-slate-400 mb-8">
              Sua candidatura está sendo processada pelo **Sentinela**. Verifique seu e-mail nas próximas 24 horas para receber sua chave e o certificado de autoridade.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-emerald-400 font-bold uppercase tracking-widest text-xs"
            >
              Fazer outra solicitação
            </button>
          </div>
        </section>
      )}

      {/* --- SEÇÃO DE EXPLICAÇÃO E FAQ --- */}
      <section className="max-w-4xl w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="ultra-glass p-8 rounded-3xl border border-emerald-500/10">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">Como Implementar sua Chave</h3>
            <ol className="text-slate-400 text-sm space-y-4 list-decimal list-inside">
              <li>Abra o **Certus Studio Command Edition**.</li>
              <li>Acesse a aba **Sentinel** na barra lateral esquerda.</li>
              <li>Clique em **"Ativar Credencial Soberana"**.</li>
              <li>Cole o token recebido por e-mail e clique em **Validar**.</li>
              <li>O sistema reiniciará com o **Módulo FORGE** desbloqueado.</li>
            </ol>
          </div>
          <div className="ultra-glass p-8 rounded-3xl border border-emerald-500/10 shadow-2xl glow-emerald">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">O Poder da Edição Command</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Diferente da versão Sovereign, a **Command Edition** é um aparato de guerra ética.
            </p>
            <ul className="text-slate-300 text-xs font-bold space-y-2 uppercase tracking-tight">
              <li>⚡ Desbloqueio do Módulo FORGE (Exploit PoC)</li>
              <li>🔍 Probes de BOLA e IDOR Automáticos</li>
              <li>🛡️ Vault Criptográfico de Hardening Ativo</li>
              <li>👤 Assinatura ZK-ID em Relatórios de Auditoria</li>
            </ul>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-white mb-12 text-center">FAQ do <span className="text-emerald-500">Desenvolvedor.</span></h2>
          <div className="space-y-6">
            <div className="ultra-glass p-8 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">A licença tem custo?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Durante a fase Beta, a credencial Command é gratuita para pesquisadores validados. No futuro, planos corporativos sustentarão o desenvolvimento do motor.
              </p>
            </div>
            <div className="ultra-glass p-8 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">Posso usar em mais de uma máquina?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Não. Para evitar vazamento de ferramentas ofensivas, cada chave é vinculada ao seu **Hardware ID (HWID)**. Se precisar trocar de máquina, deverá solicitar uma nova credencial.
              </p>
            </div>
            <div className="ultra-glass p-8 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">O que acontece se a licença expirar?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                A IDE retornará automaticamente para o modo **Sovereign** (Apenas Defesa). Seus projetos não serão perdidos, mas as ferramentas de auditoria ofensiva serão bloqueadas até a renovação.
              </p>
            </div>
            <div className="ultra-glass p-8 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">Minhas ações são monitoradas?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                O motor Certus audita localmente todas as ações para garantir conformidade com as Regras de Engajamento (ROE). Em caso de violação ética (ataques a alvos proibidos), a licença é revogada instantaneamente pelo **Sentinela**.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
