import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Getting Started | Certus Engine Docs' };

export default function GettingStartedPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Getting Started
      </div>
      
      <h1 id="quickstart" className="text-4xl font-black text-white mb-6">Getting Started</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Bem-vindo ao Certus Engine. Este guia instalará o middleware em sua aplicação e fará o primeiro dispatch seguro para uma LLM, ativando as proteções de <a href="/security#SEC-PII-001" className="text-emerald-400 hover:underline">PII-Zero</a> e <a href="/security#SEC-FC-001" className="text-emerald-400 hover:underline">Fail-Closed</a> em 5 minutos.
      </p>

      <h2 id="instalacao" className="text-2xl font-bold text-white mt-12 mb-4">1. Instalação</h2>
      <p className="text-slate-400 mb-4">Recomendamos o uso do Node.js SDK (suporte a Python via REST API disponível). O SDK injeta o <code>Adapter Mesh</code> nativamente.</p>
      
      <div className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-sm mb-8">
        <div className="text-slate-500 mb-1"># Instale o pacote oficial via npm</div>
        <div className="text-emerald-300">npm install @certus/governor-kernel</div>
      </div>

      <h2 id="inicializacao" className="text-2xl font-bold text-white mt-12 mb-4">2. Inicialização do Kernel</h2>
      <p className="text-slate-400 mb-4">Instancie o cliente fornecendo sua API Key. Por padrão, o ambiente usará políticas de restrição máxima.</p>
      
      <pre className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-slate-300 mb-8">
{`import { CertusClient } from '@certus/governor-kernel';

const certus = new CertusClient({
  apiKey: process.env.CERTUS_API_KEY,
  // Para BYOK (Bring Your Own Key), defina a chave do provedor final
  llmProviderKey: process.env.OPENAI_API_KEY 
});`}
      </pre>

      <h2 id="primeiro-dispatch" className="text-2xl font-bold text-white mt-12 mb-4">3. Primeiro Dispatch Seguro</h2>
      <p className="text-slate-400 mb-4">Ao invés de chamar a LLM diretamente, você envia o payload para o Certus. Se houver PII, ele será tokenizado (FPE) antes de sair da sua rede. Teste com o código abaixo (dados sintéticos):</p>
      
      <pre className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-emerald-300/90 mb-8">
{`async function run() {
  const result = await certus.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { 
        role: 'user', 
        content: 'Resuma o contrato do cliente Joao Silva, CPF 123.456.789-00.' 
      }
    ]
  });

  console.log(result.choices[0].message.content);
  // O log de auditoria imutável já foi gravado no LAZARUS Vault.
  console.log('Run ID:', result.audit.lazarus_hash);
}
run();`}
      </pre>

      <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-6 mb-12">
        <h4 className="text-white font-bold mb-2">O que aconteceu nos bastidores?</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
          <li>O <a href="/security#SEC-PII-001" className="text-emerald-500 hover:underline">PII Shield</a> detectou o CPF e nome, substituindo por <code>[CPF_1]</code> e <code>[NOME_1]</code> em ~12ms (veja <a href="/benchmarks#pii_inspection" className="text-emerald-500 hover:underline">benchmarks de latência</a>).</li>
          <li>A LLM processou o texto anonimizado.</li>
          <li>O SDK re-hidratou os tokens originais no retorno para sua aplicação.</li>
        </ul>
      </div>

      <DocsFooter />
    </div>
  );
}
