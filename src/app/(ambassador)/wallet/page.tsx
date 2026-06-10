import { Download, ArrowUpRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function WalletPage() {
  const mockTransactions = [
    { id: "TX-991", date: "08/06/2026", desc: "Comissão IDE - Governo da Bahia", amount: "R$ 15.000,00", status: "AVAILABLE" },
    { id: "TX-992", date: "05/06/2026", desc: "Saque Solicitado", amount: "-R$ 5.000,00", status: "PROCESSING" },
    { id: "TX-993", date: "01/06/2026", desc: "Comissão CPSI - TechCorp", amount: "R$ 2.500,00", status: "PENDING_MATURITY" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Carteira Financeira</h2>
          <p className="text-gray-400">Gestão de saldo, maturação e saques via PIX.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">Saldo Disponível para Saque</h3>
              <p className="text-4xl font-bold text-emerald-400 font-mono">R$ 10.000,00</p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors">
              <ArrowUpRight size={20} />
              <span>Solicitar Saque</span>
            </button>
          </div>
          
          <div className="flex space-x-8 pt-6 border-t border-navy-700">
            <div>
              <p className="text-gray-400 text-sm mb-1">Saldo Total Acumulado</p>
              <p className="text-xl font-semibold text-gray-100 font-mono">R$ 27.500,00</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Sacado</p>
              <p className="text-xl font-semibold text-gray-100 font-mono">R$ 15.000,00</p>
            </div>
          </div>
        </div>

        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock size={100} />
          </div>
          <h3 className="text-gray-400 font-medium text-sm mb-2 relative z-10">Em Maturação (Anti-Chargeback)</h3>
          <p className="text-3xl font-bold text-gray-100 font-mono relative z-10">R$ 2.500,00</p>
          <p className="text-sm text-gray-400 mt-4 relative z-10">Próxima liberação: 01/07/2026</p>
        </div>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <div className="p-6 border-b border-navy-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-100">Histórico de Transações</h3>
          <button className="text-gray-400 hover:text-gray-100 flex items-center space-x-2 text-sm">
            <Download size={16} />
            <span>Exportar CSV</span>
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-navy-900 border-b border-navy-700">
            <tr>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Data</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Descrição</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Status</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-700">
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-navy-700/50 transition-colors">
                <td className="py-4 px-6 text-gray-300">{tx.date}</td>
                <td className="py-4 px-6 text-gray-300">{tx.desc}</td>
                <td className="py-4 px-6">
                  {tx.status === 'AVAILABLE' && <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20 flex w-max items-center space-x-1"><CheckCircle size={12}/> <span>Disponível</span></span>}
                  {tx.status === 'PROCESSING' && <span className="px-3 py-1 bg-status-info/10 text-status-info rounded-full text-xs border border-status-info/20 flex w-max items-center space-x-1"><ArrowUpRight size={12}/> <span>Processando Saque</span></span>}
                  {tx.status === 'PENDING_MATURITY' && <span className="px-3 py-1 bg-status-warning/10 text-status-warning rounded-full text-xs border border-status-warning/20 flex w-max items-center space-x-1"><Clock size={12}/> <span>Em Maturação</span></span>}
                </td>
                <td className={`py-4 px-6 font-mono font-medium text-right ${tx.amount.startsWith('-') ? 'text-gray-100' : 'text-emerald-400'}`}>
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
