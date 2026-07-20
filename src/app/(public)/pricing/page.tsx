'use client'

import { useState, Suspense } from 'react';
import { Shield, Zap, Lock, Cpu, Server, Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/I18nProvider';

const translations = {
  'pt-BR': {
    title: 'Soberania em Código',
    sub: 'Licenças flexíveis para a IDE definitiva. Sem telemetria, sem vazamento de dados, 100% blindado.',
    sov_desc: 'Para desenvolvedores de elite',
    cmd_desc: 'A ferramenta tática definitiva',
    dia_desc: 'Enterprise & Governos',
    buy: 'Comprar Licença',
    featured: 'Mais Escolhido',
    sob: 'Sob Consulta',
    speak: 'Falar com Especialista',
    d: 'd'
  },
  'en': {
    title: 'Sovereignty in Code',
    sub: 'Flexible licenses for the ultimate IDE. No telemetry, no data leaks, 100% shielded.',
    sov_desc: 'For elite developers',
    cmd_desc: 'The ultimate tactical tool',
    dia_desc: 'Enterprise & Governments',
    buy: 'Buy License',
    featured: 'Most Popular',
    sob: 'On Request',
    speak: 'Talk to an Expert',
    d: 'd'
  },
  'es': {
    title: 'Soberanía en Código',
    sub: 'Licencias flexibles para el IDE definitivo. Sin telemetría, sin filtración de datos, 100% blindado.',
    sov_desc: 'Para desarrolladores de élite',
    cmd_desc: 'La herramienta táctica definitiva',
    dia_desc: 'Enterprise & Gobiernos',
    buy: 'Comprar Licencia',
    featured: 'Más Elegido',
    sob: 'A Consultar',
    speak: 'Hablar con Especialista',
    d: 'd'
  }
};

export function PricingContent() {
  const router = useRouter();
  const { locale } = useTranslation();
  const langKey = locale || 'pt-BR';
  const t = translations[langKey as keyof typeof translations] || translations['pt-BR'];

  // Estados para os seletores de tempo (duração em dias)
  const [sovereignDuration, setSovereignDuration] = useState<30 | 90 | 180 | 365>(30);
  const [commandDuration, setCommandDuration] = useState<30 | 90 | 180 | 365>(30);

  // Tabela de Preços Soberana Oficial
  const getPrice = (plan: 'sovereign' | 'command', duration: 30 | 90 | 180 | 365) => {
    if (plan === 'sovereign') {
      if (duration === 30) return 79.90;
      if (duration === 90) return 239.70;
      if (duration === 180) return 479.40;
      if (duration === 365) return 799.90;
    } else {
      if (duration === 30) return 499.90;
      if (duration === 90) return 1499.70;
      if (duration === 180) return 2999.40;
      if (duration === 365) return 4999.90;
    }
    return 0;
  };

  const handleBuy = (plan: 'sovereign' | 'command') => {
    const duration = plan === 'sovereign' ? sovereignDuration : commandDuration;
    router.push(`/checkout?plan=${plan}&duration=${duration}`);
  };

  return (
    <div className="min-h-screen relative bg-[#000804] pt-32 pb-16">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400">
            {t.sub}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          
          {/* Sovereign Plan */}
          <div className="ultra-glass rounded-2xl p-8 flex flex-col relative group hover:border-emerald-500/50 transition-colors duration-500">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Sovereign</h3>
              <p className="text-slate-400 text-sm">{t.sov_desc}</p>
            </div>

            {/* Seletor de Tempo */}
            <div className="flex bg-black/40 rounded-lg p-1 mb-6 border border-white/5">
              {[30, 90, 180, 365].map(d => (
                <button
                  key={`sov-${d}`}
                  onClick={() => setSovereignDuration(d as any)}
                  className={`flex-1 text-xs py-2 rounded-md transition-colors ${sovereignDuration === d ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {d}{t.d}
                </button>
              ))}
            </div>

            <div className="mb-8 flex items-baseline">
              <span className="text-4xl font-bold text-white">R$ {getPrice('sovereign', sovereignDuration).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-sm text-gray-300"><Cpu className="w-5 h-5 mr-3 text-emerald-400" /> IDE Certus Studio (Sovereign Mode)</li>
              <li className="flex items-center text-sm text-gray-300"><Fingerprint className="w-5 h-5 mr-3 text-emerald-400" /> 1 Dispositivo (HWID Bind)</li>
              <li className="flex items-center text-sm text-gray-300"><Shield className="w-5 h-5 mr-3 text-emerald-400" /> LAZARUS Vault (Local)</li>
              <li className="flex items-center text-sm text-gray-300"><Zap className="w-5 h-5 mr-3 text-emerald-400" /> Updates de Segurança</li>
            </ul>
            <button 
              onClick={() => handleBuy('sovereign')}
              className="w-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-emerald-500 hover:text-black text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
            >
              {t.buy}
            </button>
          </div>

          {/* Command Plan (Featured) */}
          <div className="ultra-glass rounded-2xl p-8 flex flex-col relative border-emerald-500/50 shadow-2xl shadow-emerald-500/10 transform md:-translate-y-4 glow-emerald">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg shadow-emerald-500/20 z-10">
              {t.featured}
            </div>
            <div className="mb-6 mt-2">
              <h3 className="text-2xl font-bold text-white mb-2">Command</h3>
              <p className="text-slate-400 text-sm">{t.cmd_desc}</p>
            </div>

            {/* Seletor de Tempo */}
            <div className="flex bg-black/40 rounded-lg p-1 mb-6 border border-emerald-500/10">
              {[30, 90, 180, 365].map(d => (
                <button
                  key={`cmd-${d}`}
                  onClick={() => setCommandDuration(d as any)}
                  className={`flex-1 text-xs py-2 rounded-md transition-colors ${commandDuration === d ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  {d}{t.d}
                </button>
              ))}
            </div>

            <div className="mb-8 flex items-baseline">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">R$ {getPrice('command', commandDuration).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-sm text-gray-300"><Cpu className="w-5 h-5 mr-3 text-emerald-500" /> IDE Certus Studio (Command Mode)</li>
              <li className="flex items-center text-sm text-gray-300"><Server className="w-5 h-5 mr-3 text-emerald-500" /> PII-Zero Middleware Incluso</li>
              <li className="flex items-center text-sm text-gray-300"><Shield className="w-5 h-5 mr-3 text-emerald-500" /> Auditoria LAZARUS Vault (Rede)</li>
              <li className="flex items-center text-sm text-gray-300"><Lock className="w-5 h-5 mr-3 text-emerald-500" /> Criptografia FPE-FF3-1</li>
              <li className="flex items-center text-sm text-gray-300"><Zap className="w-5 h-5 mr-3 text-emerald-500" /> ZK-Proofs, Sha256, Ed25519</li>
              <li className="flex items-center text-sm text-gray-300"><Lock className="w-5 h-5 mr-3 text-emerald-500" /> Blinding LGPD, LAI, GRC, GRT +</li>
              <li className="flex items-center text-sm text-gray-300"><Shield className="w-5 h-5 mr-3 text-emerald-500" /> Frota Apex Guardian</li>
            </ul>
            <button 
              onClick={() => handleBuy('command')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              {t.buy}
            </button>
          </div>

          {/* Diamante Plan */}
          <div className="ultra-glass rounded-2xl p-8 flex flex-col relative group hover:border-white/30 transition-colors duration-500">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Diamante</h3>
              <p className="text-slate-400 text-sm">{t.dia_desc}</p>
            </div>
            <div className="mb-8 flex items-baseline">
              <span className="text-4xl font-bold text-white">{t.sob}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-sm text-emerald-400 font-bold"><Zap className="w-5 h-5 mr-3 text-emerald-400" /> Tudo da Command +</li>
              <li className="flex items-center text-sm text-gray-300"><Cpu className="w-5 h-5 mr-3 text-gray-400" /> IDE Certus Studio (Custom Build)</li>
              <li className="flex items-center text-sm text-gray-300"><Fingerprint className="w-5 h-5 mr-3 text-gray-400" /> Dispositivos sob demanda</li>
              <li className="flex items-center text-sm text-gray-300"><Server className="w-5 h-5 mr-3 text-gray-400" /> Infraestrutura Dedicada</li>
              <li className="flex items-center text-sm text-gray-300"><Shield className="w-5 h-5 mr-3 text-gray-400" /> Suporte 24/7 Red Team</li>
              <li className="flex items-center text-sm text-gray-300"><Lock className="w-5 h-5 mr-3 text-gray-400" /> Middleware em Rust Diamante</li>
            </ul>
            <button className="w-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300">
              {t.speak}
            </button>
          </div>

        </div>

        {/* Sovereignty Seals */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            <div className="flex flex-col items-center justify-center text-center">
              <Shield className="w-10 h-10 mb-4 text-emerald-400" />
              <h4 className="font-semibold text-sm">LAZARUS Vault</h4>
              <p className="text-xs text-slate-400 mt-2">Auditoria Imutável</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Lock className="w-10 h-10 mb-4 text-emerald-500" />
              <h4 className="font-semibold text-sm">PII-Zero Engine</h4>
              <p className="text-xs text-slate-400 mt-2">Tokenização Criptográfica</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Fingerprint className="w-10 h-10 mb-4 text-white" />
              <h4 className="font-semibold text-sm">100% LGPD</h4>
              <p className="text-xs text-slate-400 mt-2">Conformidade Absoluta</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Cpu className="w-10 h-10 mb-4 text-gray-400" />
              <h4 className="font-semibold text-sm">Zero Telemetry</h4>
              <p className="text-xs text-slate-400 mt-2">Código isolado do mundo</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000804] pt-32 text-center text-white">Carregando Soberania...</div>}>
      <PricingContent />
    </Suspense>
  )
}
