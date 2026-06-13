"use client";

import { Shield, ChevronRight, Activity, DollarSign, Lock, FileCode } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function LandingPage() {
  const { locale } = useTranslation();
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
            {locale === 'en' ? 'Monetize Your Influence with' : locale === 'es' ? 'Monetiza tu Influencia con' : 'Monetize sua Influência com'} <br/> <span className="text-emerald-500">{locale === 'en' ? 'Deterministic Sovereignty' : locale === 'es' ? 'Soberanía Determinista' : 'Soberania Determinística'}</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en' 
              ? 'Abandon ordinary affiliate programs based on "probabilities". Certus Engine tracks, processes, and executes commissions in a closed, shielded, and mathematically unbreakable environment.'
              : locale === 'es'
              ? 'Abandona los programas de afiliados comunes basados en "probabilidades". Certus Engine rastrea, procesa y ejecuta comisiones en un entorno cerrado, blindado y matemáticamente inquebrable.'
              : 'Abandone os programas de afiliados comuns baseados em "probabilidades". A Certus Engine rastreia, processa e executa comissões em um ambiente fechado, blindado e matematicamente inquebrável.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/register" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-lg text-lg transition-colors flex items-center space-x-2">
              <span>{locale === 'en' ? 'I Want to Become an Ambassador' : locale === 'es' ? 'Quiero ser Embajador' : 'Quero me tornar Embaixador'}</span>
              <ChevronRight size={20} />
            </a>
            <a href="#solucao" className="px-8 py-4 bg-navy-800 border border-navy-700 hover:bg-navy-700 text-gray-100 font-bold rounded-lg text-lg transition-colors">
              {locale === 'en' ? 'Understand the Engineering' : locale === 'es' ? 'Entender la Ingeniería' : 'Entender a Engenharia'}
            </a>
          </div>
        </div>
      </section>

      {/* A Dor do Mercado & Solução */}
      <section id="solucao" className="py-24 bg-navy-800/50 border-y border-navy-800">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'en' ? 'Why selling traditional AI is a minefield?' : locale === 'es' ? '¿Por qué vender IA tradicional es un campo minado?' : 'Por que vender IA tradicional é um campo minado?'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Government systems handle critical data. Conventional solutions suffer from flawed auditing and compromised privacy. We designed the opposite.'
                : locale === 'es'
                ? 'Los sistemas gubernamentales manejan datos críticos. Las soluciones convencionales sufren de auditorías deficientes y privacidad comprometida. Diseñamos lo opuesto.'
                : 'Sistemas governamentais lidam com dados críticos. Soluções convencionais sofrem com auditoria falha e privacidade comprometida. Nós projetamos o avesso.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={32} className="text-emerald-500" />}
              title="PII-Zero Architecture"
              desc={locale === 'en' ? 'No Personally Identifiable Information of leads or users travels in plain text. Everything operated via AES-256.' : locale === 'es' ? 'Ninguna Información de Identificación Personal de leads o usuarios viaja en texto plano. Todo operado vía AES-256.' : 'Nenhum Dado Pessoal Identificável de leads ou usuários trafega em texto puro. Tudo operado via AES-256.'}
            />
            <FeatureCard 
              icon={<Activity size={32} className="text-emerald-500" />}
              title={locale === 'en' ? 'Immutable Auditing' : locale === 'es' ? 'Auditoría Inmutable' : 'Auditoria Imutável'}
              desc={locale === 'en' ? 'Every click, conversion, and withdrawal maturation is recorded in protected audit trails.' : locale === 'es' ? 'Cada clic, conversión y maduración de retiro se registran en pistas de auditoría protegidas.' : 'Cada clique, conversão e maturação de saque são registrados em trilhas de auditoria protegidas.'}
            />
            <FeatureCard 
              icon={<Lock size={32} className="text-emerald-500" />}
              title={locale === 'en' ? 'Fail-Closed Philosophy' : locale === 'es' ? 'Filosofía Fail-Closed' : 'Filosofia Fail-Closed'}
              desc={locale === 'en' ? 'If mathematical or cryptographic validation fails, the system blocks instead of taking risks.' : locale === 'es' ? 'Si la validación matemática o criptográfica falla, el sistema se bloquea en lugar de asumir riesgos.' : 'Se a validação matemática ou criptográfica falhar, o sistema bloqueia em vez de assumir riscos.'}
            />
          </div>
        </div>
      </section>

      {/* Comissões */}
      <section id="comissoes" className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                {locale === 'en' ? 'Real Financial Opportunity' : locale === 'es' ? 'Oportunidad Financiera Real' : 'Oportunidade Financeira Real'}
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                {locale === 'en' 
                  ? 'Our ambassadors do not rely on fragile cookies. The Tracking Engine embedded in the Certus gateway features Anti-Stuffing mechanisms and First-Click commissioning for GovTech and CPSI.'
                  : locale === 'es'
                  ? 'Nuestros embajadores no dependen de cookies frágiles. El Tracking Engine integrado en la pasarela de Certus cuenta con mecanismos Anti-Stuffing y comisiones de First-Click para GovTech y CPSI.'
                  : 'Nossos embaixadores não dependem de cookies frágeis. O Tracking Engine embutido no gateway da Certus possui mecanismos Anti-Stuffing e comissionamento First-Click para GovTech e CPSI.'}
              </p>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 mt-1"><FileCode size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">
                      {locale === 'en' ? '50% on Agent IDE' : locale === 'es' ? '50% en el IDE de Agentes' : '50% na IDE de Agentes'}
                    </h4>
                    <p className="text-gray-400">
                      {locale === 'en' ? 'Referenced developers who subscribe to our digital sovereignty IDE.' : locale === 'es' ? 'Desarrolladores referenciados que se suscriben a nuestro IDE de soberanía digital.' : 'Desenvolvedores referenciados que assinam nossa IDE de soberania digital.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 mt-1"><DollarSign size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">
                      {locale === 'en' ? '10-15% in GovTech/CPSI Contracts' : locale === 'es' ? '10-15% en Contratos GovTech/CPSI' : '10-15% em Contratos GovTech/CPSI'}
                    </h4>
                    <p className="text-gray-400">
                      {locale === 'en' ? 'High-ticket contracts with municipalities and public bodies, closed by our tactical team based on your lead referral.' : locale === 'es' ? 'Contratos de alto valor con municipios y organismos públicos, cerrados por nuestro escuadrón táctico basado en tu referencia (Lead).' : 'Contratos de alto ticket com prefeituras e órgãos públicos, fechados pelo nosso esquadrão tático com base na sua indicação (Lead).'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 bg-navy-800 border border-navy-700 rounded-2xl p-8">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-navy-700 pb-2 text-gray-400">
                  <span>{locale === 'en' ? 'Product' : locale === 'es' ? 'Producto' : 'Produto'}</span>
                  <span>{locale === 'en' ? 'Average Ticket' : locale === 'es' ? 'Ticket Promedio' : 'Ticket Médio'}</span>
                  <span>{locale === 'en' ? 'Your Share' : locale === 'es' ? 'Tu Parte' : 'Sua Parte'}</span>
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
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' ? 'Ready for Sovereignty?' : locale === 'es' ? '¿Listo para la Soberanía?' : 'Pronto para a Soberania?'}
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {locale === 'en' ? 'Registration involves strict KYC and tax validation. Serious professionals only.' : locale === 'es' ? 'El registro implica KYC estricto y validación fiscal. Solo profesionales serios.' : 'O registro envolve KYC estrito e validação fiscal. Apenas profissionais sérios.'}
          </p>
          <a href="/register" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-lg text-xl transition-colors inline-block shadow-[0_0_40px_rgba(0,201,167,0.3)] hover:shadow-[0_0_60px_rgba(0,201,167,0.5)]">
            {locale === 'en' ? 'Start Registration Process' : locale === 'es' ? 'Iniciar Proceso de Registro' : 'Iniciar Processo de Cadastro'}
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
