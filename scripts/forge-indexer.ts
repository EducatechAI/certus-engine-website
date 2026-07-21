import fs from 'fs';
import path from 'path';

// --- CONFIGURAÇÃO DOS CLUSTERS ---
const clusters: any = {
  pt: {
    niches: ['Prefeituras', 'Bancos', 'Fintechs', 'Hospitais (SUS)', 'Universidades Federais', 'Logística', 'E-commerce', 'Adquirência (Maquininhas)', 'Governos Estaduais', 'Indústria (EMBRAPII)'],
    laws: ['LGPD (Art. 46)', 'Resolução BACEN 4.893', 'Lei CSPI 182/2021', 'Marco Civil da Internet', 'Decreto Governança Digital'],
    pains: ['Vazamento de CPF e PII', 'Ransomware bloqueando servidores', 'Roubo de Chaves de API', 'Manipulação de Logs Eleitorais', 'Fraude em Licitações via IA', 'Deepfakes Governamentais', 'Ataque DDoS na Camada 7', 'Injeção de Prompts (AI Poisoning)'],
  },
  en: {
    niches: ['Enterprise Healthcare', 'Defense Contractors', 'DeFi Protocols', 'Global Banks', 'Cloud Providers', 'SaaS Platforms', 'E-voting Systems', 'Telecom Networks'],
    laws: ['GDPR (Europe)', 'HIPAA (US Healthcare)', 'CCPA (California)', 'SEC AI Washing Rules', 'Cloud Act', 'EU AI Act'],
    pains: ['Corporate Espionage', 'Cross-Border Data Leaks', 'Smart Contract Exploits', 'Zero-Day AI Vulnerabilities', 'Insider Threats', 'Supply Chain Ransomware', 'Quantum Decryption Risks'],
  }
};

// MAPEAMENTO JURÍDICO LATAM ESPECÍFICO (ES)
const esMappings = [
  { country: 'México', niche: 'Gobierno Digital', law: 'LGPDGSO (Art. 19, 63)' },
  { country: 'México', niche: 'Banca / Enterprise', law: 'LFPDPPP (Art. 16, 21)' },
  { country: 'Chile', niche: 'Gobierno / Salud', law: 'Ley 21.719 (Art. 4, 12)' },
  { country: 'Argentina', niche: 'Estado / Fintech', law: 'Ley 25.326 + Ley 27.741 (Art. 9)' },
  { country: 'Colômbia', niche: 'GovTech / Salud', law: 'Ley 1581 + Decreto 1377 (Art. 17, 24)' },
  { country: 'Peru', niche: 'Banca / Gobierno', law: 'Ley 29733 (Art. 9)' },
  { country: 'Uruguai', niche: 'Enterprise', law: 'Ley 18.331 (Art. 16)' }
];
const esPains = [
  'Secuestro de Datos (Ransomware)', 
  'Robo de Identidad Ciudadana', 
  'Falsificación de Votos', 
  'Vulnerabilidad en APIs Abiertas', 
  'Ataques a Infraestructura Crítica', 
  'Fuga de Datos Masiva'
];

const SEEDS_PER_LOCALE = 1560;

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function generateSeeds() {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
  let existingSeeds: any[] = [];
  
  // 1. Lógica de Preservação: ler sementes existentes
  if (fs.existsSync(outputPath)) {
    try {
      existingSeeds = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      console.log(`[Preservação] Encontradas ${existingSeeds.length} sementes existentes.`);
    } catch (e) {
      console.warn(`[Aviso] Falha ao ler seeds.json. Iniciando do zero.`);
    }
  }

  // Mapa de sementes forjadas por ID para manter slug, contentMarkdown e releaseDate
  const forgedMap = new Map();
  for (const seed of existingSeeds) {
    if (seed.contentMarkdown) {
      forgedMap.set(seed.id, seed);
    }
  }
  
  const seeds: any[] = [];
  let idCounter = 1;

  // Processar PT e EN normalmente
  for (const locale of ['pt', 'en']) {
    const { niches, laws, pains } = clusters[locale];
    let localeCount = 0;

    for (let i = 0; i < niches.length && localeCount < SEEDS_PER_LOCALE; i++) {
      for (let j = 0; j < laws.length && localeCount < SEEDS_PER_LOCALE; j++) {
        for (let k = 0; k < pains.length && localeCount < SEEDS_PER_LOCALE; k++) {
          for (let v = 1; v <= 10 && localeCount < SEEDS_PER_LOCALE; v++) {
            const seedId = `omni-${locale}-${idCounter.toString().padStart(5, '0')}`;
            
            if (forgedMap.has(seedId)) {
              seeds.push(forgedMap.get(seedId));
            } else {
              const variationText = v > 1 ? ` (Case Study ${v})` : '';
              const title = locale === 'pt' 
                ? `Como o Certus Engine Mitiga ${pains[k]} em ${niches[i]} sob a ${laws[j]}${variationText}`
                : `Certus Engine: Mitigating ${pains[k]} for ${niches[i]} under ${laws[j]}${variationText}`;
              
              seeds.push({
                id: seedId,
                locale,
                assunto: locale === 'pt' ? 'soberana' : 'global',
                slug: slugify(title),
                title,
                niche: niches[i],
                law: laws[j],
                painPoint: pains[k]
              });
            }
            idCounter++;
            localeCount++;
          }
        }
      }
    }
  }

  // Processar ES com Matriz LATAM Específica
  const locale = 'es';
  let localeCount = 0;
  
  for (let m = 0; m < esMappings.length && localeCount < SEEDS_PER_LOCALE; m++) {
    for (let p = 0; p < esPains.length && localeCount < SEEDS_PER_LOCALE; p++) {
      for (let v = 1; v <= 40 && localeCount < SEEDS_PER_LOCALE; v++) {
        const seedId = `omni-${locale}-${idCounter.toString().padStart(5, '0')}`;
        
        if (forgedMap.has(seedId)) {
          // Mantém a semente exata que já foi forjada e tem SEO indexado
          seeds.push(forgedMap.get(seedId));
        } else {
          const mapping = esMappings[m];
          const pain = esPains[p];
          const variationText = v > 1 ? ` (Case Study ${v})` : '';
          
          const nicheCombined = `${mapping.niche} (${mapping.country})`;
          const title = `Cómo Certus Engine Mitiga ${pain} en ${nicheCombined} bajo la ${mapping.law}${variationText}`;
          
          seeds.push({
            id: seedId,
            locale,
            assunto: 'latam',
            slug: slugify(title),
            title,
            niche: nicheCombined,
            law: mapping.law,
            painPoint: pain
          });
        }
        idCounter++;
        localeCount++;
      }
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(seeds, null, 2));
  console.log(`[Fase A Concluída] -> ${seeds.length} Sementes geradas em ${outputPath}`);
  console.log(`[Preservação] ${forgedMap.size} sementes forjadas foram preservadas intocadas.`);
}

generateSeeds();
