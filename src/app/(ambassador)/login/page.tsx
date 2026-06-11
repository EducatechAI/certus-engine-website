"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Registrar ação no LAZARUS
      await fetch("/api/lazarus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actor: email,
          action: "LOGIN",
          metadata: {
            timestamp: new Date().toISOString(),
            user_agent: typeof window !== "undefined" ? navigator.userAgent : "unknown"
          }
        })
      }).catch((err) => console.log("LAZARUS offline or pending:", err));

      // Define cookie para Next.js Middleware identificar autenticação
      document.cookie = "certus_token=mock_token_embaixador; path=/; max-age=86400"; // 24h

      // Redireciona para o Dashboard principal
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Falha ao autenticar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="bg-navy-800 border border-navy-700 w-full max-w-md rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-navy-900 border border-navy-700 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-inner">
            <Shield size={32} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">Acesso Soberano</h1>
          <p className="text-gray-400 mt-2">Identifique-se para acessar o motor financeiro.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">E-mail Institucional</label>
            <input 
              type="email" 
              placeholder="seu.nome@certus.link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Chave de Acesso (Senha)</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none transition-colors font-mono"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-navy-700 bg-navy-900 text-emerald-500 focus:ring-emerald-500/50" />
              <span>Manter conectado</span>
            </label>
            <a href="#" className="text-emerald-400 hover:text-emerald-300">Esqueci a chave</a>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold py-3 px-4 rounded-lg transition-colors mt-6 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                <span>Autenticando...</span>
              </>
            ) : (
              <span>Autenticar e Entrar</span>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8 font-mono relative z-10">
          CERTUS ENGINE v2.4.1 • AMBIENTE BLINDADO
        </p>
      </div>
    </div>
  );
}
