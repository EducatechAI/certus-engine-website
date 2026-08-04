import React from 'react';

interface SeedData {
  assunto?: string;
  about?: string;
  locale?: string;
  headline?: string;
  contentMarkdown?: string;
}

export const KnowledgeGraphFooter: React.FC<{ seed: SeedData }> = ({ seed }) => {
  const getNorms = () => {
    // Busca agressiva em headline, about e assunto
    const searchStr = `${seed.headline || ''} ${seed.about || ''} ${seed.assunto || ''}`.toUpperCase();
    
    // BLINDAGEM: CSPI é ignorado ou mapeado para a lei real (Marco Legal das Startups)
    if (searchStr.includes('STARTUP') || searchStr.includes('CSPI')) return 'LEI_18.430/2021 (Marco Legal das Startups)';
    
    if (searchStr.includes('CCPA') || searchStr.includes('CALIFORNIA')) return 'CCPA.Sec.1798.150';
    if (searchStr.includes('GDPR') || searchStr.includes('EUROPE')) return 'GDPR.Art.32';
    if (searchStr.includes('LEY 1581') || searchStr.includes('COLOMBIA')) return 'LEY_1581.Art.17';
    if (searchStr.includes('LEY 25.326') || searchStr.includes('ARGENTINA')) return 'LEY_25.326';
    if (searchStr.includes('BACEN') || searchStr.includes('RESOLUÇÃO')) return 'BACEN.Res.4893';
    if (searchStr.includes('HIPAA')) return 'HIPAA.Sec.164.308';
    
    return 'LGPD.Art.46'; // Fallback padrão para Brasil
  };

  // 2. Extração Inteligente de Setor
  const getSector = () => {
    const textToSearch = `${seed.headline || ''} ${seed.assunto || ''} ${seed.about || ''}`.toLowerCase();
    if (textToSearch.includes('banco') || textToSearch.includes('bank') || textToSearch.includes('fintech') || textToSearch.includes('banca')) return 'SECTOR.BANKING';
    if (textToSearch.includes('saúde') || textToSearch.includes('salud') || textToSearch.includes('health') || textToSearch.includes('hospital')) return 'SECTOR.HEALTHTECH';
    if (textToSearch.includes('gov') || textToSearch.includes('prefeitura') || textToSearch.includes('gobierno')) return 'SECTOR.GOVTECH';
    if (textToSearch.includes('vc') || textToSearch.includes('venture')) return 'SECTOR.VC';
    return 'SECTOR.ENTERPRISE'; // Fallback melhor que GENERAL
  };

  let graphData = {
    modules: ['CERTUS.MOD.KANGAL', 'CERTUS.MOD.LAZARUS', 'CERTUS.MOD.PII-ZERO', 'CERTUS.MOD.WOLFDOG'],
    capabilities: ['CERTUS.CAP.IMMUTABLE_AUDIT', 'CERTUS.CAP.FAIL_CLOSED', 'CERTUS.CAP.PII_MASKING'],
    threats: ['THREAT.DATA_EXFILTRATION', 'THREAT.PROMPT_INJECTION'],
    norms: [getNorms()],
    sector: getSector(),
    relations: `CERTUS.MOD.KANGAL blocks THREAT.PROMPT_INJECTION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects ${getSector()} data`
  };

  if (seed.contentMarkdown) {
    try {
      const jsonMatch = seed.contentMarkdown.match(/```json\s*([\s\S]*?)\s*```/g);
      if (jsonMatch && jsonMatch.length > 0) {
        // Tenta pegar o último bloco JSON (caso haja outros no meio do texto)
        const lastJsonBlock = jsonMatch[jsonMatch.length - 1];
        const rawJson = lastJsonBlock.replace(/```json\s*/, '').replace(/\s*```/, '');
        const parsed = JSON.parse(rawJson);
        if (parsed.knowledge_graph) {
          graphData = {
            modules: parsed.knowledge_graph.modules || graphData.modules,
            capabilities: parsed.knowledge_graph.capabilities || graphData.capabilities,
            threats: parsed.knowledge_graph.threats || graphData.threats,
            norms: parsed.knowledge_graph.norms || graphData.norms,
            sector: parsed.knowledge_graph.sector || graphData.sector,
            relations: parsed.knowledge_graph.relations || graphData.relations
          };
        }
      }
    } catch (e) {
      console.warn("JSON do Knowledge Graph não encontrado ou inválido, usando fallback.");
    }
  }

  // TRADUÇÃO DOS TÍTULOS BASEADO NO LOCALE
  const labels = {
    pt: {
      title: 'Mapa de Conhecimento (Knowledge Graph)',
      modules: 'Módulos Certus:',
      capabilities: 'Capacidades:',
      threats: 'Vetores de Ameaça:',
      norms: 'Normas:',
      relations: 'Relações Ontológicas:'
    },
    es: {
      title: 'Mapa de Conocimiento (Knowledge Graph)',
      modules: 'Módulos Certus:',
      capabilities: 'Capacidades:',
      threats: 'Vectores de Amenaza:',
      norms: 'Normas:',
      relations: 'Relaciones Ontológicas:'
    },
    en: {
      title: 'Knowledge Graph',
      modules: 'Certus Modules:',
      capabilities: 'Capabilities:',
      threats: 'Threat Vectors:',
      norms: 'Norms:',
      relations: 'Ontological Relations:'
    }
  };

  const lang = seed.locale || 'pt';
  const t = labels[lang as keyof typeof labels] || labels.pt;

  return (
    <div className="w-full mt-12 mb-8 px-4">
      <div className="max-w-4xl mx-auto p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <span className="text-xl">🕸️</span> {t.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-200">
          <div>
            <span className="font-semibold text-emerald-300">{t.modules}</span>
            <p className="mt-1 font-mono text-xs">{graphData.modules.join(', ')}</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.capabilities}</span>
            <p className="mt-1 font-mono text-xs">{graphData.capabilities.join(', ')}</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.threats}</span>
            <p className="mt-1 font-mono text-xs">{graphData.threats.join(', ')}</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.norms}</span>
            <p className="mt-1 font-mono text-xs">{graphData.norms.join(', ')}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="font-semibold text-emerald-300 text-sm">{t.relations}</span>
          <p className="mt-1 font-mono text-xs text-gray-300">
            {graphData.relations}
          </p>
        </div>
      </div>
    </div>
  );
};
