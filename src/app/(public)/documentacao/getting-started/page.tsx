import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Getting Started | Certus Engine Docs' };

export default function GettingStartedPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Getting Started
      </div>
      
      <h1 id="quickstart" className="text-4xl font-black text-white mb-6">Caminhos de Inicialização</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        O ecossistema Certus Engine é distribuído em três níveis de maturidade e governança. Escolha o caminho aplicável ao seu caso de uso.
      </p>

      <div className="space-y-12">
        
        {/* CAMINHO 1 */}
        <section>
          <h2 id="caminho-sovereign" className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-300">Nível 1</span>
            IDE Sovereign
          </h2>
          <p className="text-sm text-emerald-400 font-mono mb-4">TEMPO ESTIMADO: 5 MINUTOS</p>
          <p className="text-slate-400 mb-4">
            Voltado para desenvolvedores júnior, low-code e pequenas empresas. Instalação rápida da <strong>Sovereign Edition (Emerald Glass)</strong> focada em criação e ensino.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-6">
            <li>Instalação do ambiente local.</li>
            <li>Execução do primeiro dispatch governado.</li>
            <li>Acesso aos <Link href="/documentacao/policy-language" className="text-emerald-400 hover:underline">documentos de política básica</Link>.</li>
          </ul>
        </section>

        {/* CAMINHO 2 */}
        <section>
          <h2 id="caminho-command" className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-emerald-900/50 text-xs px-2 py-1 rounded text-emerald-300 border border-emerald-800">Nível 2</span>
            IDE Command Standard
          </h2>
          <p className="text-sm text-emerald-400 font-mono mb-4">TEMPO ESTIMADO: 15 MINUTOS</p>
          <p className="text-slate-400 mb-4">
            Voltado para desenvolvedores sênior, startups, Deep Techs e empresas de médio porte. Ativa a <strong>Command Edition (Hacker Edition)</strong> para orquestração avançada.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-6">
            <li>Ativação do fluxo completo + integração de CI/CD.</li>
            <li>Configuração do <strong>Middleware Rust</strong> (acoplado) para PII Shield e Circuit Breaker.</li>
            <li>Ativação da <strong>Frota APEX</strong> (14 agentes autônomos em deploy compartilhado).</li>
            <li>Inicialização do <strong>Módulo Diamante</strong> como componente base para segurança defensiva.</li>
            <li>Seu primeiro projeto blindado com governança Tier A+.</li>
          </ul>
        </section>

        {/* CAMINHO 3 */}
        <section>
          <h2 id="caminho-enterprise" className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-blue-900/50 text-xs px-2 py-1 rounded text-blue-300 border border-blue-800">Nível 3</span>
            Modalidade Enterprise/Government
          </h2>
          <p className="text-sm text-blue-400 font-mono mb-4">IMPLEMENTAÇÃO CONSULTIVA</p>
          <p className="text-slate-400 mb-4">
            Nível máximo de soberania destinado a instituições reguladas: Prefeituras, Hospitais, Bancos, Universidades, Tribunais (TCU/TCE) e Defesa.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-6">
            <li>Deploy de <strong>Módulo Diamante Dedicado</strong> (Single-Tenant).</li>
            <li>Disponibilização de Frota APEX e LAZARUS em ambiente <strong>Air-Gapped</strong>.</li>
            <li>Conformidade com TCU/TCE via <strong>Auditoria Cega</strong> e criptografia avançada.</li>
            <li>Contratação via <strong>CPSI (LC 182/2021)</strong>.</li>
          </ul>
          
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl mt-4">
            <p className="text-slate-300 mb-4 text-sm">
              Devido aos rigorosos controles de conformidade e necessidades de deploy dedicado (air-gapped), a modalidade Enterprise/Government não possui quickstart automático.
            </p>
            <Link href="/pricing" className="inline-block bg-white text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors">
              Agendar sessão com vendas
            </Link>
          </div>
        </section>

      </div>

      <DocsFooter />
    </div>
  );
}