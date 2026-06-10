import { Shield, ChevronRight, Activity, DollarSign, Lock, FileCode } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="text-gray-100">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-navy-800 border border-navy-700 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-400 font-mono">CERTUS ENGINE v2.4.1 LAUNCHED</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Monetize sua Influência com <br/> <span className="text-emerald-500">Soberania Determinística</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Abandone os programas de afiliados comuns baseados em "probabilidades". 
            A Certus Engine rastreia, processa e executa comissões em um ambiente fechado, blindado e matematicamente inquebrável.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/register" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold rounded-lg text-lg transition-colors flex items-center space-x-2">
              <span>Quero me tornar Embaixador</span>
              <ChevronRight size={20} />
            </a>
            <a href="#solucao" className="px-8 py-4 bg-navy-800 border border-navy-700 hover:bg-navy-700 text-gray-100 font-bold rounded-lg text-lg transition-colors">
              Entender a Engenharia
            </a>
          </div>
        </div>
      </section>

      {/* A Dor do Mercado & Solução */}
      <section id="solucao" className="py-24 bg-navy-800/50 border-y border-navy-800">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por que vender IA tradicional é um campo minado?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Sistemas governamentais lidam com dados críticos. Soluções convencionais sofrem com auditoria falha e privacidade comprometida. Nós projetamos o avesso.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={32} className="text-emerald-500" />}
              title="PII-Zero Architecture"
              desc="Nenhum Dado Pessoal Identificável de leads ou usuários trafega em texto puro. Tudo operado via AES-256."
            />
            <FeatureCard 
              icon={<Activity size={32} className="text-emerald-500" />}
              title="Auditoria Imutável"
              desc="Cada clique, conversão e maturação de saque são registrados em trilhas de auditoria protegidas."
            />
            <FeatureCard 
              icon={<Lock size={32} className="text-emerald-500" />}
              title="Filosofia Fail-Closed"
              desc="Se a validação matemática ou criptográfica falhar, o sistema bloqueia em vez de assumir riscos."
            />
          </div>
        </div>
      </section>

      {/* Comissões */}
      <section id="comissoes" className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Oportunidade Financeira Real</h2>
              <p className="text-gray-400 text-lg mb-8">
                Nossos embaixadores não dependem de cookies frágeis. O Tracking Engine embutido no gateway da Certus possui mecanismos Anti-Stuffing e comissionamento First-Click para GovTech e CPSI.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 mt-1"><FileCode size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">50% na IDE de Agentes</h4>
                    <p className="text-gray-400">Desenvolvedores referenciados que assinam nossa IDE de soberania digital.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 mt-1"><DollarSign size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">10-15% em Contratos GovTech/CPSI</h4>
                    <p className="text-gray-400">Contratos de alto ticket com prefeituras e órgãos públicos, fechados pelo nosso esquadrão tático com base na sua indicação (Lead).</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 bg-navy-800 border border-navy-700 rounded-2xl p-8">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-navy-700 pb-2 text-gray-400">
                  <span>Produto</span>
                  <span>Ticket Médio</span>
                  <span>Sua Parte</span>
                </div>
                <div className="flex justify-between py-2 text-gray-100">
                  <span>IDE Mensal</span>
                  <span>R$ 150/mês</span>
                  <span className="text-emerald-400">R$ 75/mês</span>
                </div>
                <div className="flex justify-between py-2 text-gray-100">
                  <span>IDE Anual</span>
                  <span>R$ 1.500/ano</span>
                  <span className="text-emerald-400">R$ 750/ano</span>
                </div>
                <div className="flex justify-between py-2 text-gray-100 bg-emerald-500/5 px-2 rounded -mx-2">
                  <span>GovTech CPSI</span>
                  <span>R$ 100.000+</span>
                  <span className="text-emerald-400 font-bold">R$ 10.000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-emerald-500/5 border-t border-navy-700 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-6">Pronto para a Soberania?</h2>
          <p className="text-xl text-gray-400 mb-10">O registro envolve KYC estrito e validação fiscal. Apenas profissionais sérios.</p>
          <a href="/register" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold rounded-lg text-xl transition-colors inline-block shadow-[0_0_40px_rgba(0,201,167,0.3)] hover:shadow-[0_0_60px_rgba(0,201,167,0.5)]">
            Iniciar Processo de Cadastro
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-navy-900 border border-navy-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
      <div className="mb-6 w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
