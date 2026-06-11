"use client";

import { useState } from "react";
import { Copy, TrendingUp, Users, MousePointerClick, Award, Download, MessageSquare, ExternalLink, HelpCircle } from "lucide-react";

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [isCertified, setIsCertified] = useState(true); // Pode ser modificado pelo usuário para testar
  const referralUrl = "https://certusengine.vercel.app/register?ref=AMB_12345";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Registrar ação no LAZARUS
      await fetch("/api/lazarus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actor: "AMB_12345",
          action: "LINK_COPIED",
          metadata: {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        })
      }).catch((err) => console.log("LAZARUS offline or pending:", err));
    } catch (err) {
      console.error("Falha ao copiar link:", err);
    }
  };

  const handleDownloadMaterial = async (nome: string) => {
    // Registrar ação no LAZARUS
    await fetch("/api/lazarus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actor: "AMB_12345",
        action: "MATERIAL_DOWNLOADED",
        metadata: {
          timestamp: new Date().toISOString(),
          resource_id: nome,
          user_agent: navigator.userAgent
        }
      })
    }).catch((err) => console.log("LAZARUS offline or pending:", err));
  };

  const openBot = () => {
    window.open("/bot?role=embaixador", "_blank");
  };

  const materiaisVenda = [
    { nome: 'Pitch Deck', arquivo: 'pitch-deck-v3.pdf', tamanho: '2.3 MB' },
    { nome: 'One-Pager', arquivo: 'one-pager-certus.pdf', tamanho: '450 KB' },
    { nome: 'Whitepaper Técnico v3.1.0', arquivo: 'whitepaper-v3.pdf', tamanho: '1.8 MB' },
    { nome: 'Calculadora de ROI', arquivo: 'roi-calculator.xlsx', tamanho: '120 KB' },
    { nome: 'Template de Proposta', arquivo: 'proposal-template.docx', tamanho: '85 KB' },
    { nome: 'Vídeo de Demo (5 min)', arquivo: 'demo-certus.mp4', tamanho: '45 MB' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Bot Link */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-1">Painel do Embaixador Certus</h2>
          <p className="text-gray-400 text-sm">Monitore suas conversões e acesse materiais oficiais de prospecção.</p>
        </div>
        <button 
          onClick={openBot}
          className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
        >
          <MessageSquare size={20} />
          <span>Consultar Assistente Certus</span>
        </button>
      </div>

      {/* Link de Afiliado & Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-200 font-semibold mb-4">🔗 Seu Link de Afiliado Exclusivo</h3>
            <div className="flex items-center space-x-3 mb-6">
              <input 
                type="text" 
                value={referralUrl} 
                readOnly 
                className="bg-navy-900 border border-navy-700 px-4 py-3 rounded-lg font-mono text-emerald-400 text-sm flex-1 focus:outline-none"
              />
              <button 
                onClick={handleCopyLink}
                className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-5 py-3 rounded-lg transition-colors flex items-center space-x-2 shrink-0"
              >
                <Copy size={18} />
                <span>{copied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-navy-700 pt-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">Cliques no Link</p>
              <p className="text-xl font-bold text-gray-100 font-mono">127</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Cadastros</p>
              <p className="text-xl font-bold text-gray-100 font-mono">23</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Conversões</p>
              <p className="text-xl font-bold text-gray-100 font-mono">3</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Taxa de Conversão</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">13.0%</p>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-white rounded-lg p-3 flex items-center justify-center shadow-lg mb-3">
            {/* SVG Simulado do QR Code do Link de Produção */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-navy-900">
              <rect x="0" y="0" width="25" height="25" fill="currentColor" />
              <rect x="0" y="75" width="25" height="25" fill="currentColor" />
              <rect x="75" y="0" width="25" height="25" fill="currentColor" />
              <rect x="10" y="10" width="5" height="5" fill="white" />
              <rect x="10" y="85" width="5" height="5" fill="white" />
              <rect x="85" y="10" width="5" height="5" fill="white" />
              {/* Random QR pixels */}
              <rect x="35" y="10" width="10" height="15" fill="currentColor" />
              <rect x="55" y="5" width="5" height="20" fill="currentColor" />
              <rect x="30" y="40" width="20" height="10" fill="currentColor" />
              <rect x="60" y="35" width="15" height="15" fill="currentColor" />
              <rect x="10" y="45" width="15" height="10" fill="currentColor" />
              <rect x="40" y="65" width="25" height="15" fill="currentColor" />
              <rect x="15" y="60" width="10" height="5" fill="currentColor" />
              <rect x="70" y="60" width="25" height="25" fill="currentColor" />
            </svg>
          </div>
          <p className="text-gray-300 text-xs font-semibold">QR Code para Divulgação Rápida</p>
          <p className="text-gray-500 text-[10px] mt-1 font-mono">AMB_12345 • VERCEL_LIVE</p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Comissões Recebidas" 
          value="R$ 1.500,00" 
          trend="+15% este mês" 
          icon={<TrendingUp size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title="Leads Totais" 
          value="42" 
          trend="+3 esta semana" 
          icon={<Users size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title="Cliques Totais" 
          value="1.240" 
          trend="3.4% conv. rate" 
          icon={<MousePointerClick size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title="Nível Atual" 
          value="Bronze" 
          trend="70% para Prata" 
          icon={<Award size={24} className="text-emerald-500" />} 
        />
      </div>

      {/* Gráfico & Atividades & Treinamento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Desempenho em SVG */}
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-100">Desempenho Semanal (Cliques vs. Conversões)</h3>
            <span className="text-xs text-gray-400">Últimos 7 dias</span>
          </div>
          <div className="h-64 flex items-end justify-between px-4 pb-2 border-b border-navy-700 relative">
            {/* Linha guia de background */}
            <div className="absolute left-0 right-0 top-1/4 border-t border-navy-700/40"></div>
            <div className="absolute left-0 right-0 top-2/4 border-t border-navy-700/40"></div>
            <div className="absolute left-0 right-0 top-3/4 border-t border-navy-700/40"></div>
            
            {/* Colunas do gráfico SVG/CSS */}
            <Bar day="Seg" clicks={45} conversions={5} height="40%" />
            <Bar day="Ter" clicks={62} conversions={8} height="55%" />
            <Bar day="Qua" clicks={89} conversions={12} height="80%" />
            <Bar day="Qui" clicks={55} conversions={6} height="50%" />
            <Bar day="Sex" clicks={98} conversions={14} height="90%" />
            <Bar day="Sáb" clicks={32} conversions={3} height="30%" />
            <Bar day="Dom" clicks={24} conversions={2} height="20%" />
          </div>
          <div className="flex items-center space-x-6 text-xs text-gray-400 mt-4 px-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span>Cliques (Volume Relativo)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-300 rounded"></div>
              <span>Conversões</span>
            </div>
          </div>
        </div>

        {/* Status de Treinamento */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">🎓 Status de Treinamento</h3>
            {isCertified ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <span className="text-emerald-400 font-bold text-sm block mb-1">✓ CERTIFICAÇÃO ATIVA</span>
                  <p className="text-xs text-gray-400">Você concluiu a trilha do Certus Trainer e está habilitado a vender.</p>
                </div>
                <div className="text-xs text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Pontuação Média:</span>
                    <span className="font-semibold text-gray-200">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status LAZARUS:</span>
                    <span className="font-semibold text-emerald-400">Assinado Criptograficamente</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                  <span className="text-yellow-400 font-bold text-sm block mb-1">⏳ PENDENTE</span>
                  <p className="text-xs text-gray-400">Complete o desafio de treinamento no bot para validar seu perfil.</p>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={openBot}
            className="w-full mt-6 bg-navy-900 hover:bg-navy-950 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <span>🤖 {isCertified ? "Consultar Bot Treinador" : "Iniciar Treinamento"}</span>
          </button>
        </div>
      </div>

      {/* Materiais de Venda & Suporte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Materiais de Venda */}
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700">
          <h3 className="font-semibold text-gray-100 mb-4">📦 Materiais de Venda & Prospecção</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {materiaisVenda.map((mat) => (
              <a 
                key={mat.nome}
                href={`/downloads/${mat.arquivo}`}
                download
                onClick={() => handleDownloadMaterial(mat.nome)}
                className="flex items-center justify-between p-4 bg-navy-900 hover:bg-navy-950 border border-navy-700 rounded-xl group transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-navy-800 border border-navy-700 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-navy-900 transition-colors">
                    <Download size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors">{mat.nome}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{mat.arquivo} • {mat.tamanho}</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Central de Suporte */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">🆘 Central de Suporte</h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-navy-700">
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Comercial & Vendas</span>
                <p className="text-sm font-semibold text-gray-300 font-mono">embaixadores@educatech.ai</p>
              </div>
              <div className="pb-4 border-b border-navy-700">
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Suporte Técnico</span>
                <p className="text-sm font-semibold text-gray-300 font-mono">suporte@educatech.ai</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Slack Oficial</span>
                <p className="text-sm font-semibold text-emerald-400">Canal #embaixadores</p>
                <p className="text-[10px] text-gray-500 mt-1">Disponível após certificação e ativação KYC</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-2 text-xs text-gray-500 bg-navy-900 p-3 rounded-lg border border-navy-700">
            <HelpCircle size={16} className="text-emerald-500 shrink-0" />
            <span>Precisa de ajuda em uma licitação? Fale com nosso suporte.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: any) {
  return (
    <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-navy-900 rounded-lg">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-100 font-mono mb-1">{value}</p>
      <p className="text-xs text-emerald-500 font-medium">{trend}</p>
    </div>
  );
}

function Bar({ day, clicks, conversions, height }: { day: string; clicks: number; conversions: number; height: string }) {
  return (
    <div className="flex flex-col items-center h-full justify-end w-8">
      <div className="w-full flex items-end justify-center space-x-0.5" style={{ height }}>
        <div className="w-2 bg-emerald-500 rounded-t" style={{ height: "100%" }} title={`Cliques: ${clicks}`}></div>
        <div className="w-2 bg-emerald-300 rounded-t" style={{ height: `${conversions * 6}%` }} title={`Conversões: ${conversions}`}></div>
      </div>
      <span className="text-[10px] text-gray-500 mt-2 font-mono">{day}</span>
    </div>
  );
}
