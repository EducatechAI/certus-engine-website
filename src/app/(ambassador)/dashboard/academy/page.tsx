import { PlayCircle, CheckCircle2 } from "lucide-react";

export default function AcademyPage() {
  const modules = [
    { title: "Módulo 1: O Que é a Certus Engine?", duration: "45 min", status: "completed" },
    { title: "Módulo 2: Técnicas Avançadas de Vendas em Órgãos Públicos", duration: "1h 20m", status: "in-progress" },
    { title: "Módulo 3: Lidando com Objeções Técnicas de Licitação", duration: "55 min", status: "locked" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Certus Academy</h2>
          <p className="text-gray-400">Treinamentos exclusivos para blindar seus argumentos de venda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden mb-6 aspect-video flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
            <PlayCircle size={64} className="text-emerald-500 relative z-20 group-hover:scale-110 transition-transform" />
            {/* Imagem de placeholder representativa */}
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 to-navy-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">Módulo 2: Técnicas Avançadas de Vendas em Órgãos Públicos</h3>
          <p className="text-gray-400 leading-relaxed">
            Aprenda como abordar prefeitos e secretários de TI utilizando o conceito de Soberania Digital. 
            Neste módulo, exploramos a diferença entre sistemas comuns e o modelo Hardened da Certus Engine.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-100 px-2">Trilha de Formação</h3>
          {modules.map((mod, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border flex items-start space-x-4 ${mod.status === 'in-progress' ? 'bg-navy-800 border-emerald-500/50' : 'bg-navy-800/50 border-navy-700'}`}
            >
              <div className="mt-1">
                {mod.status === 'completed' && <CheckCircle2 size={20} className="text-emerald-500" />}
                {mod.status === 'in-progress' && <PlayCircle size={20} className="text-emerald-400" />}
                {mod.status === 'locked' && <div className="w-5 h-5 rounded-full border-2 border-navy-600" />}
              </div>
              <div>
                <p className={`font-medium text-sm ${mod.status === 'locked' ? 'text-gray-500' : 'text-gray-200'}`}>
                  {mod.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{mod.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
