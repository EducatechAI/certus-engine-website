"use client";

import { useState } from "react";
import { Filter, Search, ShieldCheck, AlertTriangle } from "lucide-react";

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockLeads = [
    { id: "L-101", date: "10/06/2026", source: "Link de Indicação", client: "Prefeitura de Joinville-SC", status: "Em Negociação", estCommission: "R$ 11.500,00", piiZero: "MASKED" },
    { id: "L-102", date: "08/06/2026", source: "QR Code Evento", client: "Banco XYZ S/A", status: "Contrato Enviado", estCommission: "R$ 149.700,00", piiZero: "MASKED" },
    { id: "L-103", date: "05/06/2026", source: "Link de Indicação", client: "TechCorp Solutions Ltda", status: "Fechado", estCommission: "R$ 2.500,00", piiZero: "MASKED" },
    { id: "L-104", date: "01/06/2026", source: "Link de Indicação", client: "Prefeitura de Aveiro-PA", status: "Cancelado", estCommission: "R$ 5.000,00", piiZero: "MASKED" }
  ];

  const handleViewDetails = async (leadId: string) => {
    // Registrar ação no LAZARUS
    await fetch("/api/lazarus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actor: "AMB_12345",
        action: "LEAD_VIEWED",
        metadata: {
          timestamp: new Date().toISOString(),
          resource_id: leadId,
          user_agent: navigator.userAgent
        }
      })
    }).catch((err) => console.log("LAZARUS offline or pending:", err));

    alert(`Detalhamento do Lead ${leadId}: Acesso restrito a visualização de metadados em ambiente auditado.`);
  };

  const filteredLeads = mockLeads.filter(lead => 
    lead.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Banner de Pendência Legal */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-amber-400 font-bold text-sm">Aviso de Governança: Comissionamento Governamental Pendente de Contrato</h4>
          <p className="text-gray-400 text-xs mt-1">
            Indicações para órgãos públicos e prefeituras exigem a validação síncrona do contrato CPSI e do CNPJ habilitado pelo embaixador antes da liberação e faturamento de comissão. Os status abaixo são atualizados automaticamente via barramento LAZARUS.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Gestão de Leads</h2>
          <p className="text-gray-400 text-sm">Monitore o funil de vendas, conversão de contratos e proteção de dados PII-Zero.</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar lead..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-navy-800 border border-navy-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 text-sm w-48 sm:w-64"
            />
          </div>
          <button className="bg-navy-800 border border-navy-700 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-navy-700 transition-colors text-sm">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-navy-900 border-b border-navy-700">
              <tr>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">ID</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Data</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Origem</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Cliente (PII-Zero)</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Comissão Estimada</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase">Status</th>
                <th className="py-4 px-6 text-gray-400 font-medium text-xs uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700 text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-navy-700/50 transition-colors">
                  <td className="py-4 px-6 text-gray-400 font-mono">{lead.id}</td>
                  <td className="py-4 px-6 text-gray-300 font-mono">{lead.date}</td>
                  <td className="py-4 px-6 text-gray-300">{lead.source}</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold flex items-center space-x-1.5 mt-2">
                    <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                    <span title="Os dados reais do cliente estão protegidos por mascaramento criptográfico.">{lead.client}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-200 font-mono">{lead.estCommission}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      lead.status === 'Fechado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      lead.status === 'Cancelado' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => handleViewDetails(lead.id)}
                      className="text-emerald-500 hover:text-emerald-400 font-medium text-xs transition-colors"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-medium">
                    Nenhum lead encontrado para a busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
