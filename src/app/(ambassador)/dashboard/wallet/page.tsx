"use client";

import { useState } from "react";
import { Download, ArrowUpRight, Clock, CheckCircle, AlertTriangle, X } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function WalletPage() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const mockTransactions = [
    { id: "TX-991", date: "10/06/2026", client: "Prefeitura de Joinville", product: "CPSI", amount: "R$ 115.000,00", commission: "R$ 11.500,00", status: "PAID" },
    { id: "TX-992", date: "08/06/2026", client: "Banco XYZ", product: "Command Edition", amount: "R$ 499.000,00", commission: "R$ 149.700,00", status: "MATURING" },
    { id: "TX-993", date: "05/06/2026", client: "TechCorp Solutions Ltda", product: "Sovereign IDE", amount: "R$ 25.000,00", commission: "R$ 2.500,00", status: "MATURING" },
    { id: "TX-994", date: "01/06/2026", client: "Prefeitura de Aveiro", product: "CPSI (Setup)", amount: "R$ 50.000,00", commission: "R$ 5.000,00", status: "CANCELLED" }
  ];

  const handleWithdrawClick = async () => {
    setShowModal(true);

    // Registrar ação no LAZARUS
    await fetch("/api/lazarus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actor: "AMB_12345",
        action: "WITHDRAW_REQUESTED",
        metadata: {
          timestamp: new Date().toISOString(),
          amount: 10000,
          status: "BLOCKED_KYC_PENDING",
          user_agent: navigator.userAgent
        }
      })
    }).catch((err) => console.log("LAZARUS offline or pending:", err));
  };

  return (
    <div className="space-y-8">
      {/* Alerta de Pendência Tributária */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-amber-400 font-bold text-sm">{t('wallet_warning_title')}</h4>
          <p className="text-gray-400 text-xs mt-1">
            {t('wallet_warning_desc')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">{t('wallet_title')}</h2>
          <p className="text-gray-400 text-sm font-medium">{t('wallet_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
            <div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">{t('saldo_disponivel')}</h3>
              <p className="text-4xl font-bold text-emerald-400 font-mono">R$ 11.500,00</p>
            </div>
            <button 
              onClick={handleWithdrawClick}
              className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-navy-900 px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <ArrowUpRight size={20} />
              <span>{t('solicitar_saque')}</span>
            </button>
          </div>
          
          <div className="flex space-x-8 pt-6 border-t border-navy-700">
            <div>
              <p className="text-gray-400 text-xs mb-1">{t('total_faturado')}</p>
              <p className="text-lg font-bold text-gray-200 font-mono">R$ 163.700,00</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">{t('total_sacado')}</p>
              <p className="text-lg font-bold text-gray-200 font-mono">R$ 11.500,00</p>
            </div>
          </div>
        </div>

        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Clock size={100} />
          </div>
          <h3 className="text-gray-400 font-medium text-sm mb-2 relative z-10">{t('em_maturacao')}</h3>
          <p className="text-3xl font-bold text-gray-100 font-mono relative z-10">R$ 152.200,00</p>
          <p className="text-xs text-gray-400 mt-4 relative z-10">{t('prazo_seguranca')}</p>
        </div>
      </div>

      {/* Histórico de Vendas e Comissões */}
      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <div className="p-6 border-b border-navy-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-100">{t('historico_comissionamento')}</h3>
          <button className="text-gray-400 hover:text-gray-100 flex items-center space-x-2 text-xs">
            <Download size={16} />
            <span>{t('exportar_relatorio')}</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-navy-900 border-b border-navy-700">
              <tr>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Data</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">{t('cliente')}</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Produto</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">{t('valor_total')}</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">{t('sua_comissao')}</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700 text-sm">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-navy-700/50 transition-colors">
                  <td className="py-4 px-6 text-gray-300 font-mono">{tx.date}</td>
                  <td className="py-4 px-6 text-gray-300 font-medium">{tx.client}</td>
                  <td className="py-4 px-6 text-gray-400">{tx.product}</td>
                  <td className="py-4 px-6 text-gray-300 font-mono">{tx.amount}</td>
                  <td className="py-4 px-6 text-emerald-400 font-mono font-semibold">{tx.commission}</td>
                  <td className="py-4 px-6">
                    {tx.status === 'PAID' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle size={10} />
                        <span>{t('paga')}</span>
                      </span>
                    )}
                    {tx.status === 'MATURING' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock size={10} />
                        <span>{t('maturando')}</span>
                      </span>
                    )}
                    {tx.status === 'CANCELLED' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <X size={10} />
                        <span>{t('cancelada')}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Alerta de CNPJ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-800 border border-navy-700 max-w-md w-full rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl mx-auto flex items-center justify-center mb-4">
                <AlertTriangle className="text-amber-500" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">{t('modal_saque_titulo')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('modal_saque_desc')}
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold py-2.5 rounded-lg transition-colors"
              >
                {t('entendido')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
