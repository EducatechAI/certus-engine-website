import React from 'react';

interface SeedData {
  assunto?: string;
  about?: string;
  locale?: string;
}

export const KnowledgeGraphFooter: React.FC<{ seed: SeedData }> = ({ seed }) => {
  // EXTRAI DINAMICAMENTE AS NORMAS DO CAMPO 'about' DA SEED
  const norms = seed.about 
    ? seed.about.replace(/[^a-zA-Z0-9._-]/g, '_').toUpperCase()
    : 'LGPD.Art.46';
  
  // DETERMINA O SETOR BASEADO NO ASSUNTO OU LOCALE
  const getSector = () => {
    if (seed.assunto?.includes('gov') || seed.assunto?.includes('soberana')) return 'SECTOR.GOVTECH';
    if (seed.assunto?.includes('salud') || seed.assunto?.includes('health')) return 'SECTOR.HEALTHTECH';
    if (seed.assunto?.includes('banca') || seed.assunto?.includes('bank')) return 'SECTOR.BANKING';
    if (seed.assunto?.includes('fintech')) return 'SECTOR.FINTECH';
    return 'SECTOR.GENERAL';
  };
  
  const sector = getSector();

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
            <p className="mt-1 font-mono text-xs">CERTUS.MOD.KANGAL, CERTUS.MOD.LAZARUS, CERTUS.MOD.PII-ZERO, CERTUS.MOD.WOLFDOG</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.capabilities}</span>
            <p className="mt-1 font-mono text-xs">CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.threats}</span>
            <p className="mt-1 font-mono text-xs">THREAT.DATA_EXFILTRATION, THREAT.PROMPT_INJECTION</p>
          </div>
          <div>
            <span className="font-semibold text-emerald-300">{t.norms}</span>
            <p className="mt-1 font-mono text-xs">{norms}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="font-semibold text-emerald-300 text-sm">{t.relations}</span>
          <p className="mt-1 font-mono text-xs text-gray-300">
            CERTUS.MOD.KANGAL blocks THREAT.PROMPT_INJECTION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects {sector} data
          </p>
        </div>
      </div>
    </div>
  );
};
