'use client'

import { useState } from 'react'

export default function FreeKeyGenerator({ onAuth }: { onAuth?: () => void }) {
  const [key, setKey] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const generateKey = async () => {
    if (!password) {
      setError('Credenciais Inválidas. Acesso Negado.')
      return
    }

    setLoading(true)
    setError(null)
    setCopied(false)
    try {
      // A validação da senha ocorre APENAS no servidor (process.env.MASTER_KEY).
      // Nunca comparar a senha no cliente — seria exposta no bundle JS público.
      const res = await fetch('/api/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterKey: password }),
      })
      if (!res.ok) {
        if (res.status === 401) {
          setError('Credenciais Inválidas. Acesso Negado.')
        } else if (res.status === 403) {
          setError('Acesso ao Trial Temporário Indisponível. Tente novamente em breve.')
        } else {
          setError('Erro ao gerar chave. Tente novamente.')
        }
        return
      }
      const data = await res.json()
      setKey(data.key)
      if (onAuth) onAuth() // Notifica a página pai do sucesso
    } catch (err) {
      setError('Problema de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!key) return
    navigator.clipboard.writeText(key)
    setCopied(true)
    // Protocolo de Segurança: A chave some em 2 segundos após a cópia
    setTimeout(() => {
      setKey(null)
      setCopied(false)
      setPassword('')
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto ultra-glass p-8 rounded-3xl border border-emerald-500/20 shadow-2xl glow-emerald">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full border border-emerald-500/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 text-center tracking-tight">Autorização Necessária</h3>
      <p className="text-emerald-200/60 text-xs mb-6 text-center leading-relaxed">
        Gere sua chave de acesso soberano temporário. Requer credenciais de Admin.
      </p>

      {!key ? (
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Senha Mestra"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-white placeholder-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono text-center tracking-widest text-sm"
          />
          <button
            onClick={generateKey}
            disabled={loading || !password}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 tracking-wider text-sm uppercase"
          >
            {loading ? 'Validando...' : 'Autenticar & Gerar'}
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          <div className="bg-black/80 rounded-xl p-4 border border-emerald-500/40 font-mono text-sm break-all text-emerald-400 text-center glow-neon">
            {key}
          </div>
          <button
            onClick={copyToClipboard}
            className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-wider text-sm ${
              copied 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/50' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            {copied ? '✓ Copiado com Sucesso' : 'Copiar Chave'}
          </button>
          <p className="text-[10px] text-emerald-500/70 text-center uppercase tracking-widest font-semibold animate-pulse-glow">
            Auto-destruição em 2s
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-xs text-red-500 text-center font-bold tracking-wide animate-pulse">
          ■ {error}
        </p>
      )}

      <div className="mt-8 pt-6 border-t border-emerald-900/50">
        <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-3 text-center">Protocolo de Uso</p>
        <ol className="text-[11px] text-emerald-200/50 space-y-2 text-left list-decimal list-inside font-mono">
          <li>Autenticação via Master Password.</li>
          <li>Cópia de Key temporária para clipboard.</li>
          <li>Injeção na Certus Studio IDE.</li>
        </ol>
      </div>
    </div>
  )
}
