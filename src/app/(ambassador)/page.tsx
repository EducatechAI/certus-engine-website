import { Copy, TrendingUp, Users, MousePointerClick, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      {/* Link Afiliado */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-gray-400 text-sm font-medium mb-1">Seu Link Exclusivo de Embaixador</h2>
              <div className="flex items-center space-x-3">
                <code className="bg-navy-900 px-4 py-2 rounded-lg font-mono text-emerald-400 text-lg">
                  https://certus.link/ref/AMB_12345
                </code>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 p-2 rounded-lg transition-colors flex items-center space-x-2 font-medium">
                  <Copy size={20} />
                  <span>Copiar</span>
                </button>
              </div>
            </div>
            {/* Aqui entraria o QRCode dinâmico */}
            <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xs">QR Code</span>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Receita Estimada" 
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

          {/* Gráfico e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-700 h-96 flex items-center justify-center">
              <p className="text-gray-400">Gráfico de Desempenho Mensal (Recharts)</p>
            </div>
            <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
              <h3 className="font-semibold text-gray-100 mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                <ActivityItem title="Novo Lead (Prefeitura de ***)" time="Há 2 horas" type="lead" />
                <ActivityItem title="Comissão Maturada (R$ 500)" time="Ontem" type="wallet" />
                <ActivityItem title="Conversão IDE (R$ 1000)" time="Há 3 dias" type="conversion" />
              </div>
            </div>
      </div>
    </>
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

function ActivityItem({ title, time, type }: any) {
  return (
    <div className="flex items-center space-x-3 pb-4 border-b border-navy-700 last:border-0 last:pb-0">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      <div>
        <p className="text-sm font-medium text-gray-200">{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}
