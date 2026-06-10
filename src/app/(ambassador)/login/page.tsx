import { Shield } from "lucide-react";

export default function LoginPage() {
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

        <form className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">E-mail Institucional</label>
            <input 
              type="email" 
              placeholder="seu.nome@certus.link"
              className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Chave de Acesso (Senha)</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none transition-colors font-mono"
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
            type="button"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold py-3 px-4 rounded-lg transition-colors mt-6 flex items-center justify-center"
          >
            Autenticar e Entrar
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8 font-mono relative z-10">
          CERTUS ENGINE v2.4.1 • AMBIENTE BLINDADO
        </p>
      </div>
    </div>
  );
}
