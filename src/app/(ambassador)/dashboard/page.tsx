"use client";

import { useState, useEffect } from "react";
import { Copy, TrendingUp, Users, MousePointerClick, Award, Download, MessageSquare, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Dashboard() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isCertified, setIsCertified] = useState(true);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [seals, setSeals] = useState<string[]>([]);
  const referralUrl = "https://certusengine.ia.br/register?ref=AMB_12345";

  // Carrega progresso do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("certus_questions_count");
      if (savedCount) setQuestionsCount(parseInt(savedCount, 10));

      const savedSeals = localStorage.getItem("certus_seals");
      if (savedSeals) setSeals(JSON.parse(savedSeals));
    }
  }, []);

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

  const materiaisVenda = [
    { nome: 'Pitch Deck', arquivo: 'pitch-deck-v3.pdf', tamanho: '2.3 MB' },
    { nome: 'One-Pager', arquivo: 'one-pager-certus.pdf', tamanho: '450 KB' },
    { nome: 'Whitepaper Técnico v3.1.0', arquivo: 'whitepaper-v3.pdf', tamanho: '1.8 MB' },
    { nome: 'Calculadora de ROI', arquivo: 'roi-calculator.xlsx', tamanho: '120 KB' },
    { nome: 'Template de Proposta', arquivo: 'proposal-template.docx', tamanho: '85 KB' },
    { nome: 'Vídeo de Demo (5 min)', arquivo: 'demo-certus.mp4', tamanho: '45 MB' }
  ];

  const milestones = [
    { threshold: 20, name: 'Explorador', seal: '🥉', benefits: ['Acesso a materiais básicos'] },
    { threshold: 50, name: 'Investigador', seal: '🥈', benefits: ['Acesso a casos de uso'] },
    { threshold: 80, name: 'Especialista', seal: '🥇', benefits: ['Link de afiliado ativado'] },
    { threshold: 120, name: 'Mestre', seal: '💎', benefits: ['Comissão +5%', '(vendas do próximo mês, não recorrente)'] },
    { threshold: 150, name: 'Soberano', seal: '👑', benefits: ['Mentoria direta + 10% extra', '(vendas do próximo mês, não recorrente)'] }
  ];

  // Ajusta o nível de exibição no MetricCard com base no contador
  let currentLevel = t('nivel_bronze');
  if (questionsCount >= 150) currentLevel = "👑 Soberano";
  else if (questionsCount >= 120) currentLevel = "💎 Mestre";
  else if (questionsCount >= 80) currentLevel = "🥇 Especialista";
  else if (questionsCount >= 50) currentLevel = "🥈 Investigador";
  else if (questionsCount >= 20) currentLevel = "🥉 Explorador";

  // Próximo nível progressivo
  let progressTrend = "20 " + t('perguntas_para') + " Explorador";
  if (questionsCount >= 150) progressTrend = t('nivel_maximo');
  else if (questionsCount >= 120) progressTrend = `${150 - questionsCount} ${t('perguntas_para')} Soberano`;
  else if (questionsCount >= 80) progressTrend = `${120 - questionsCount} ${t('perguntas_para')} Mestre`;
  else if (questionsCount >= 50) progressTrend = `${80 - questionsCount} ${t('perguntas_para')} Especialista`;
  else if (questionsCount >= 20) progressTrend = `${50 - questionsCount} ${t('perguntas_para')} Investigador`;

  return (
    <div className="space-y-8">
      {/* Top Banner & Bot Link */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-1">{t('ambassador_title')}</h2>
          <p className="text-gray-400 text-sm">{t('ambassador_desc')}</p>
        </div>
        <Link 
          href="/dashboard/academy"
          className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
        >
          <MessageSquare size={20} />
          <span>{t('btn_academy')}</span>
        </Link>
      </div>

      {/* Link de Afiliado & Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-200 font-semibold mb-4">🔗 {t('affiliate_link')}</h3>
            
            {questionsCount >= 80 ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                <input 
                  type="text" 
                  value={referralUrl} 
                  readOnly 
                  className="bg-navy-900 border border-navy-700 px-4 py-3 rounded-lg font-mono text-emerald-400 text-sm flex-1 focus:outline-none w-full"
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-5 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shrink-0 w-full sm:w-auto"
                >
                  <Copy size={18} />
                  <span>{copied ? t('copied') : t('copy')}</span>
                </button>
              </div>
            ) : (
              <div className="bg-navy-900 border border-amber-500/20 rounded-xl p-5 mb-6 text-center">
                <p className="text-amber-400 text-sm font-semibold mb-2">🔒 {t('affiliate_locked')}</p>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  {t('affiliate_locked_desc')}
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-navy-700 pt-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">{t('cliques')}</p>
              <p className="text-xl font-bold text-gray-100 font-mono">{questionsCount >= 80 ? "127" : "0"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Cadastros</p>
              <p className="text-xl font-bold text-gray-100 font-mono">{questionsCount >= 80 ? "23" : "0"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Conversões</p>
              <p className="text-xl font-bold text-gray-100 font-mono">{questionsCount >= 80 ? "3" : "0"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Taxa de Conversão</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">{questionsCount >= 80 ? "13.0%" : "0.0%"}</p>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-white rounded-lg p-3 flex items-center justify-center shadow-lg mb-3">
            {questionsCount >= 80 ? (
              <svg viewBox="0 0 100 100" className="w-full h-full text-navy-900">
                <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                <rect x="10" y="10" width="5" height="5" fill="white" />
                <rect x="10" y="85" width="5" height="5" fill="white" />
                <rect x="85" y="10" width="5" height="5" fill="white" />
                <rect x="35" y="10" width="10" height="15" fill="currentColor" />
                <rect x="55" y="5" width="5" height="20" fill="currentColor" />
                <rect x="30" y="40" width="20" height="10" fill="currentColor" />
                <rect x="60" y="35" width="15" height="15" fill="currentColor" />
                <rect x="10" y="45" width="15" height="10" fill="currentColor" />
                <rect x="40" y="65" width="25" height="15" fill="currentColor" />
                <rect x="15" y="60" width="10" height="5" fill="currentColor" />
                <rect x="70" y="60" width="25" height="25" fill="currentColor" />
              </svg>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-bold text-[10px]">BLOQUEADO</div>
            )}
          </div>
          <p className="text-gray-300 text-xs font-semibold">QR Code para Divulgação Rápida</p>
          <p className="text-gray-500 text-[10px] mt-1 font-mono">AMB_12345 • VERCEL_LIVE</p>
        </div>
      </div>

      {/* 🏆 Sua Jornada de Conhecimento */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-100">🏆 {t('progresso_trilha')}</h3>
            <p className="text-xs text-gray-400">Faça perguntas no Bot da Academy para desbloquear selos e benefícios imutáveis.</p>
          </div>
          <div className="bg-navy-900 border border-navy-700 px-4 py-2 rounded-xl text-center shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-400">{questionsCount} / 150 {t('perguntas_feitas')}</span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="relative w-full h-3 bg-navy-900 rounded-full overflow-hidden border border-navy-700">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-emerald-500 transition-all duration-500" 
            style={{ width: `${Math.min((questionsCount / 150) * 100, 100)}%` }}
          />
        </div>

        {/* Grid de Selos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {milestones.map(m => {
            const achieved = questionsCount >= m.threshold;
            return (
              <div 
                key={m.name} 
                className={`p-4 rounded-xl border transition-all flex flex-col items-center text-center justify-between space-y-3 ${
                  achieved 
                    ? "bg-navy-900/60 border-emerald-500/30 shadow-lg shadow-emerald-500/5" 
                    : "bg-navy-900/20 border-navy-700 opacity-40"
                }`}
              >
                <span className="text-4xl">{m.seal}</span>
                <div>
                  <h4 className="font-bold text-sm text-white">{m.name}</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">{m.threshold} perguntas</p>
                </div>
                <div className="bg-black/20 rounded-lg p-2 w-full text-[10px] text-gray-400 min-h-[40px] flex items-center justify-center">
                  <div>
                    {m.benefits.map((b, idx) => (
                      <p key={idx} className="leading-tight">{b}</p>
                    ))}
                  </div>
                </div>
                {achieved ? (
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    ✓ Liberado
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Bloqueado
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title={t('comissao_receber')} 
          value={questionsCount >= 120 ? (questionsCount >= 150 ? "R$ 1.650,00" : "R$ 1.575,00") : "R$ 1.500,00"} 
          trend={questionsCount >= 120 ? (questionsCount >= 150 ? "+10% Bônus Soberano" : "+5% Bônus Mestre") : "+15% este mês"} 
          icon={<TrendingUp size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title={t('leads_indicados')} 
          value="42" 
          trend="+3 esta semana" 
          icon={<Users size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title={t('cliques')} 
          value="1.240" 
          trend="3.4% conv. rate" 
          icon={<MousePointerClick size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title={t('nivel_atual')} 
          value={currentLevel} 
          trend={progressTrend} 
          icon={<Award size={24} className="text-emerald-500" />} 
        />
      </div>

      {/* Gráfico & Atividades & Treinamento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-100">Desempenho Semanal (Cliques vs. Conversões)</h3>
            <span className="text-xs text-gray-400">Últimos 7 dias</span>
          </div>
          <div className="h-64 flex items-end justify-between px-4 pb-2 border-b border-navy-700 relative">
            <div className="absolute left-0 right-0 top-1/4 border-t border-navy-700/40"></div>
            <div className="absolute left-0 right-0 top-2/4 border-t border-navy-700/40"></div>
            <div className="absolute left-0 right-0 top-3/4 border-t border-navy-700/40"></div>
            
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
            <h3 className="font-semibold text-gray-100 mb-4">🎓 {t('status_onboarding')}</h3>
            {questionsCount >= 20 ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <span className="text-emerald-400 font-bold text-sm block mb-1">✓ CAPACITAÇÃO INICIADA</span>
                  <p className="text-xs text-gray-400">Você já desbloqueou o selo Explorador e está ativamente aprendendo.</p>
                </div>
                <div className="text-xs text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Selo Atual:</span>
                    <span className="font-semibold text-gray-200">{currentLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status LAZARUS:</span>
                    <span className="font-semibold text-emerald-400">Bloco de Selo Registrado</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                  <span className="text-yellow-400 font-bold text-sm block mb-1">⏳ PENDENTE</span>
                  <p className="text-xs text-gray-400">Complete o desafio de treinamento ou faça pelo menos 20 perguntas no bot para validar seu perfil.</p>
                </div>
              </div>
            )}
          </div>
          <Link 
            href="/dashboard/academy"
            className="w-full mt-6 bg-navy-900 hover:bg-navy-950 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <span>🤖 Consultar Bot Treinador</span>
          </Link>
        </div>
      </div>

      {/* Materiais de Venda & Suporte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700">
          <h3 className="font-semibold text-gray-100 mb-4">{t('materiais_prospeccao')}</h3>
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
