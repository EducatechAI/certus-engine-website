import { maskPII } from "@/lib/utils/maskPII";
import { Filter, Search } from "lucide-react";

export default function LeadsPage() {
  const mockLeads = [
    { id: "L-101", date: "08/06/2026", source: "Link de Indicação", client: "Prefeitura de Xinguara-PA", status: "Em Negociação", estCommission: "R$ 5.000,00" },
    { id: "L-102", date: "07/06/2026", source: "QR Code Evento", client: "TechCorp Solutions Ltda", status: "Contrato Enviado", estCommission: "R$ 2.500,00" },
    { id: "L-103", date: "05/06/2026", source: "Link de Indicação", client: "Governo do Estado da Bahia", status: "Fechado", estCommission: "R$ 15.000,00" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Gestão de Leads</h2>
          <p className="text-gray-400">Acompanhe suas indicações e status de conversão.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar lead..." 
              className="bg-navy-800 border border-navy-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="bg-navy-800 border border-navy-700 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-navy-700 transition-colors">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-navy-900 border-b border-navy-700">
            <tr>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Data</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Origem</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Cliente (PII-Zero)</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Status</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm">Comissão Est.</th>
              <th className="py-4 px-6 text-gray-400 font-medium text-sm text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-700">
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-navy-700/50 transition-colors">
                <td className="py-4 px-6 text-gray-300">{lead.date}</td>
                <td className="py-4 px-6 text-gray-300">{lead.source}</td>
                <td className="py-4 px-6 font-mono text-emerald-400">{maskPII(lead.client)}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-navy-900 text-gray-300 rounded-full text-xs border border-navy-700">
                    {lead.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-100 font-medium">{lead.estCommission}</td>
                <td className="py-4 px-6 text-right">
                  <button className="text-emerald-500 hover:text-emerald-400 font-medium text-sm">
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
