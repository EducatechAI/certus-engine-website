import Link from 'next/link';
import { DocsFooter } from '@/components/docs/DocsFooter';

export const metadata = { title: 'Compliance Mappings | Certus Engine Docs' };

export default function CompliancePage() {
  return (
    <div className="max-w-prose mx-auto xl:max-w-none">
      <div className="text-[10px] font-mono text-slate-500 mb-4">
        <Link href="/documentacao" className="hover:text-emerald-400">Docs</Link> &gt; Compliance
      </div>
      
      <h1 id="compliance" className="text-4xl font-black text-white mb-6">Compliance Mappings</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Como as capacidades técnicas do Certus Engine se alinham com regulações globais de proteção de dados. Mapeamento direto de Artigo Jurídico para Controle Técnico (SEC-ID).
      </p>

      <h2 id="lgpd" className="text-2xl font-bold text-white mt-12 mb-6">LGPD (Brasil)</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-black/40 border border-emerald-900/30 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-bold text-white">Art. 46 — Medidas de Segurança</h3>
            <a href="/security#SEC-PII-001" className="shrink-0 bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-2 py-1 rounded text-[10px] font-mono hover:bg-emerald-900/50">SEC-PII-001</a>
          </div>
          <p className="text-sm text-slate-400 mb-4">"Os agentes de tratamento devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais..."</p>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
            <strong>Implementação Certus:</strong> O motor PII-Zero atua como medida técnica intransponível antes do dado sair da infraestrutura (anonimização determinística via FPE).<br/>
            <strong>Verificação do Auditor:</strong> Simulação de injeção de CPF; falha aciona <a href="/security#SEC-FC-001" className="text-emerald-400 hover:underline">SEC-FC-001 (Fail-Closed)</a>.
          </div>
        </div>

        <div className="bg-black/40 border border-emerald-900/30 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-bold text-white">Art. 37 — Registro de Operações</h3>
            <a href="/security#SEC-LAZ-001" className="shrink-0 bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-2 py-1 rounded text-[10px] font-mono hover:bg-emerald-900/50">SEC-LAZ-001</a>
          </div>
          <p className="text-sm text-slate-400 mb-4">"O controlador e o operador devem manter registro das operações de tratamento de dados pessoais que realizarem..."</p>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
            <strong>Implementação Certus:</strong> O LAZARUS Vault gera hashes encadeados imutáveis para cada dispatch, formando trilha de auditoria criptográfica incontestável.
          </div>
        </div>
      </div>

      <h2 id="hipaa" className="text-2xl font-bold text-white mt-12 mb-6">HIPAA (EUA)</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-black/40 border border-emerald-900/30 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-bold text-white">45 CFR § 164.312(a)(1) — Access Control</h3>
            <a href="/security#SEC-PII-001" className="shrink-0 bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-2 py-1 rounded text-[10px] font-mono hover:bg-emerald-900/50">SEC-PII-001</a>
          </div>
          <p className="text-sm text-slate-400 mb-4">Requer políticas técnicas que permitam apenas o acesso a PHI (Protected Health Information) por pessoas/sistemas autorizados.</p>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
            <strong>Implementação Certus:</strong> A LLM processando o prompt (entidade externa) recebe apenas tokens mascarados matematicamente. O dado clínico real nunca aterrissa nos servidores do provedor de IA.
          </div>
        </div>
      </div>

      <DocsFooter />
    </div>
  );
}
