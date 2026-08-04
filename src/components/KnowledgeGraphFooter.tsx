import React from 'react';

interface SeedData {
  assunto?: string;
  about?: string;
  locale?: string;
  headline?: string;
  contentMarkdown?: string;
}

export const KnowledgeGraphFooter: React.FC<{ seed: SeedData }> = ({ seed }) => {
  const getNorms = (): string[] => {
    const norms = [];
    // Busca agressiva em headline, about e assunto
    const searchStr = `${seed.headline || ''} ${seed.about || ''} ${seed.assunto || ''}`.toUpperCase();
    
    // BLINDAGEM: CSPI é ignorado ou mapeado para a lei real (Marco Legal das Startups)
    if (searchStr.includes('STARTUP') || searchStr.includes('CSPI')) norms.push('LEI_18.430/2021 (Marco Legal das Startups)');
    
    if (searchStr.includes('CCPA') || searchStr.includes('CALIFORNIA')) norms.push('CCPA.Sec.1798.150');
    if (searchStr.includes('GDPR') || searchStr.includes('EUROPE')) norms.push('GDPR.Art.32');
    if (searchStr.includes('LEY 1581') || searchStr.includes('COLOMBIA')) norms.push('LEY_1581.Art.17');
    if (searchStr.includes('LEY 25.326') || searchStr.includes('ARGENTINA')) norms.push('LEY_25.326');
    if (searchStr.match(/BACEN|RESOLU[AÇC][AÃO].*4\.893/i)) norms.push('BACEN.RES_4893');
    else if (searchStr.includes('HIPAA')) norms.push('HIPAA.Sec.164.308');
    if (searchStr.match(/DECRETO.*GOVERNAN[AÇC]A DIGITAL|DECRETO 10\.332/i)) norms.push('DECRETO_10332_2020');
    if (searchStr.match(/EU AI ACT|REGULATION.*2024\/1689/i)) norms.push('EU_AI_ACT');
    
    return norms.length > 0 ? norms : ['LGPD.Art.46']; // Fallback padrão para Brasil
  };

  // 2. Extração Inteligente de Setor
  const getSector = () => {
    const textToSearch = `${seed.headline || ''} ${seed.assunto || ''} ${seed.about || ''}`.toLowerCase();
    if (textToSearch.includes('banco') || textToSearch.includes('bank') || textToSearch.match(/fintech|fintechs/i) || textToSearch.includes('banca')) return 'SECTOR.BANKING';
    if (textToSearch.match(/sa[uú]de|hospitalar|healthcare/i)) return 'SECTOR.HEALTHCARE';
    if (textToSearch.match(/civic|municipal|governo|government/i)) return 'SECTOR.GOVTECH';
    if (textToSearch.includes('vc') || textToSearch.includes('venture')) return 'SECTOR.VC';
    return 'SECTOR.ENTERPRISE'; // Fallback melhor que GENERAL
  };

  let graphData = {
    modules: ['CERTUS.MOD.KANGAL', 'CERTUS.MOD.LAZARUS', 'CERTUS.MOD.PII-ZERO', 'CERTUS.MOD.WOLFDOG'],
    capabilities: ['CERTUS.CAP.IMMUTABLE_AUDIT', 'CERTUS.CAP.FAIL_CLOSED', 'CERTUS.CAP.PII_MASKING'],
    threats: ['THREAT.DATA_EXFILTRATION', 'THREAT.PROMPT_INJECTION'],
    norms: getNorms(),
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
