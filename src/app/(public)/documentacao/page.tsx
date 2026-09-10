import Link from 'next/link';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = {
  title: 'Documentação Técnica | Certus Engine',
  description: 'Plataforma institucional de referência técnica. Entenda a arquitetura, implemente políticas e explore a API privada.',
};

export default function DocumentacaoHub() {
  const SECTIONS = [
    { title: 'Getting Started', path: '/documentacao/getting-started', desc: 'Instalação, Quickstart e Conceitos fundamentais.', icon: '🚀' },
    { title: 'Architecture', path: '/documentacao/architecture', desc: 'Threat Model, Failure Modes e Deployment Topologies.', icon: '🏛️' },
    { title: 'API Reference', path: '/documentacao/api-reference', desc: 'Endpoints, schemas e autenticação REST.', icon: '🔌' },
    { title: 'Policy Language', path: '/documentacao/policy-language', desc: 'YAML specs e Policy Cookbook por setor.', icon: '📜' },
    { title: 'Security & Crypto', path: '/documentacao/security-cryptography', desc: 'FPE, LAZARUS Chain e ZK Protocols.', icon: '🔒' },
    { title: 'SDKs', path: '/documentacao/sdks', desc: 'Integração oficial via Node.js e Python.', icon: '📦' },
    { title: 'Compliance', path: '/documentacao/compliance', desc: 'Mapeamento LGPD, GDPR, HIPAA para SEC-IDs.', icon: '⚖️' },
    { title: 'Operations', path: '/documentacao/operations', desc: 'Monitoring, Incident Runbook e Troubleshooting.', icon: '⚙️' }
  ];

  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <DocsSearch />

      <div className="mb-12">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">[ TECHNICAL PLATFORM ]</p>
        <h1 className="text-4xl font-black text-white mb-4">Bem-vindo à Documentação</h1>
        <p className="text-lg text-slate-400">
          A referência completa para desenvolvedores, arquitetos e DPOs integrarem governança de IA com determinismo absoluto.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SECTIONS.map(s => (
          <Link key={s.path} href={s.path} className="group p-6 rounded-2xl bg-black/40 border border-emerald-900/30 hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all flex items-start gap-4">
            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{s.icon}</span>
            <div>
              <h3 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{s.title}</h3>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-8 text-center">
        <h3 className="text-white font-bold mb-2">Primeira vez aqui?</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">Siga o Quickstart para entender como o Fail-Closed e PII-Zero protegem seu tráfego de IA em menos de 5 minutos.</p>
        <Link href="/documentacao/getting-started" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-lg transition-colors">
          Iniciar Quickstart
        </Link>
      </div>

      <DocsFooter />
    </div>
  );
}
