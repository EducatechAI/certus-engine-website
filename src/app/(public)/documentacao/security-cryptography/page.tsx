import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Security & Cryptography | Certus Engine Docs' };

export default function SecurityCryptoPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Security & Cryptography
      </div>
      
      <h1 id="security" className="text-4xl font-black text-white mb-6">Security & Cryptography</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Deep dive nos mecanismos criptográficos que garantem as propriedades <a href="/security#SEC-PII-001" className="text-emerald-500 hover:underline">PII-Zero</a> e de auditoria irrefutável do Certus.
      </p>

      <h2 id="fpe" className="text-2xl font-bold text-white mt-12 mb-4">Format-Preserving Encryption (FPE)</h2>
      <p className="text-slate-400 mb-4">O PII Shield utiliza FF3-1 (NIST SP 800-38G) para tokenizar dados sensíveis garantindo que o output preserve o formato original (ex: XXX.XXX.XXX-XX continua formatado como CPF), o que evita quebrar o contexto da LLM.</p>

      <h2 id="lazarus" className="text-2xl font-bold text-white mt-12 mb-4">LAZARUS Audit Chain</h2>
      <p className="text-slate-400 mb-4">O <a href="/security#SEC-LAZ-001" className="text-emerald-500 hover:underline">SEC-LAZ-001</a> é implementado como uma estrutura Merkle-like de alta performance. Cada transação é assinada via <code>Ed25519</code> e encadeada com o <code>SHA-256</code> da transação anterior.</p>
      
      <div className="bg-[#050b08] border border-slate-800 rounded-lg p-6 font-mono text-[10px] sm:text-xs text-emerald-400 overflow-x-auto mb-8 whitespace-pre">
{`H_n = SHA256( Payload_n || H_{n-1} || Timestamp )
Sig_n = Ed25519_Sign( PrivateKey, H_n )`}
      </div>

      <p className="text-slate-400 mb-4">Isso torna qualquer adulteração do banco de dados detectável retroativamente, garantindo integridade forense.</p>

            <h2 id="zk" className="text-2xl font-bold text-white mt-12 mb-4">ZK Protocols (Roadmap)</h2>
      <p className="text-slate-400 mb-12">Integração com <code>Groth16</code> e curvas <code>BN254</code> está em andamento para permitir Zero-Knowledge Identity proofs, onde atributos podem ser verificados pela política sem jamais serem revelados ao motor do Certus.</p>

      <h2 id="integracao-apex" className="text-2xl font-bold text-white mt-12 mb-4">Integração com Frota APEX</h2>
      <p className="text-slate-400 mb-6">
        Os mecanismos criptográficos operam como as fundações para os agentes de defesa autônomos da <strong>Frota APEX</strong>:
      </p>

      <ul className="list-disc pl-5 space-y-3 text-slate-300 mb-8">
        <li><strong>Ed25519 (Assinatura):</strong> Utilizado pelo <Link href="/documentacao/architecture#frota-apex" className="text-emerald-400 hover:underline">LAZARUS Auditor</Link> para validar autoridade e Consenso BFT.</li>
        <li><strong>SHA-256 Chain:</strong> Mantido ativamente pelo LAZARUS Auditor e protegido em repouso pelo <strong>Presa Canário</strong> (Root of Trust).</li>
        <li><strong>FPE-FF3-1 (Tokenização PII):</strong> Motor matemático alimentado aos agentes <Link href="/documentacao/architecture#frota-apex" className="text-emerald-400 hover:underline">Wolfdog</Link> e Kangal para higienização em memória.</li>
        <li><strong>ZK Proofs:</strong> Infraestrutura baseada nas curvas Groth16 operada pelo agente ZK-SOVEREIGN-GUARD.</li>
      </ul>

      <p className="text-xs text-slate-500 mb-12 p-4 border-l-2 border-emerald-500 bg-emerald-950/10">
        <strong>Disponibilidade:</strong> A Frota APEX e o Módulo Diamante estão disponíveis tanto no nível <strong>IDE Command Standard</strong> (deploy compartilhado) quanto no nível <strong>Enterprise/Government</strong> (deploy dedicado com air-gapped opcional).
      </p>
      <DocsFooter />
    </div>
  );
}
