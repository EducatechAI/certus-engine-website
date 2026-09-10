import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Policy Language | Certus Engine Docs' };

export default function PolicyPage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Policy Language
      </div>
      
      <h1 id="policy-language" className="text-4xl font-black text-white mb-6">Policy Language (YAML)</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        O Certus Engine utiliza YAML declarativo para definir regras de governança. Políticas definem exatamente quais detectores estão ativos e quais ações tomar em caso de violação.
      </p>

      <h2 id="schema" className="text-2xl font-bold text-white mt-12 mb-4">Spec Base</h2>
      <pre className="bg-[#050b08] border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-emerald-300/90 mb-8">
{`version: "1.0"
governance:
  pii_shield:
    mode: "redact" # ou "block"
    targets: ["cpf", "credit_card", "email"]
  prompt_injection:
    threshold: 0.85
    action: "block" # SEC-PI-001
  fail_closed:
    timeout_ms: 50 # SEC-FC-001`}
      </pre>

      <h2 id="cookbook" className="text-2xl font-bold text-white mt-12 mb-4">Cookbook por Setor</h2>
      
      <div className="space-y-8 mb-12">
        <div className="bg-black/40 border border-slate-800 rounded-xl p-6">
          <h3 className="font-bold text-white mb-2">Financeiro (BACEN 4.893)</h3>
          <p className="text-sm text-slate-400 mb-4">Bloqueio estrito de PAN, CVV e dados de conta.</p>
          <pre className="bg-[#050b08] border border-slate-800 p-4 rounded-lg font-mono text-[10px] text-slate-300">
{`pii_shield:
  mode: "block"
  targets: ["credit_card", "bank_account", "cpf"]
  on_violation: "throw_500"`}
          </pre>
        </div>

        <div className="bg-black/40 border border-slate-800 rounded-xl p-6">
          <h3 className="font-bold text-white mb-2">Saúde (HIPAA)</h3>
          <p className="text-sm text-slate-400 mb-4">Redação dinâmica de identificadores de paciente.</p>
          <pre className="bg-[#050b08] border border-slate-800 p-4 rounded-lg font-mono text-[10px] text-slate-300">
{`pii_shield:
  mode: "redact"
  targets: ["name", "ssn", "medical_record_id", "date_of_birth"]
  redaction_format: "[PHI_{TYPE}]"`}
          </pre>
        </div>
      </div>

      <DocsFooter />
    </div>
  );
}
