import fs from 'fs';
import path from 'path';
import { GANCHOS, embaralharDeterministico } from './ganchos';

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

function createShortSlug(title: string, v: number, hookId: string) {
  let s = slugify(title);
  s = s.replace(/prefeituras/g, 'pref')
       .replace(/lgpd-art-46/g, 'lgpd46')
       .replace(/resolucao-bacen-4-893/g, 'bacen4893')
       .replace(/ransomware-bloqueando-servidores/g, 'ransom')
       .replace(/roubo-de-chaves-de-api/g, 'api-keys')
       .replace(/vazamento-de-cpf-e-pii/g, 'cpf-pii')
       .replace(/como-podemos-provar-conformidade/g, 'provar-conformidade')
       .replace(/como-funciona-por-dentro/g, 'como-funciona')
       .replace(/infraestrutura/g, 'infra')
       .replace(/probabilistica/g, 'prob')
       .replace(/governanca/g, 'gov')
       .replace(/possivel/g, 'possiv');
       
  // Remover "case-study-N" se existir no meio, pois vamos colocar no final
  s = s.replace(/-case-study-\d+/g, '');
  
  const vSuffix = v > 1 ? `-cs${v}` : '';
  const hookSuffix = `-${hookId.toLowerCase()}`;
  const totalSuffix = vSuffix + hookSuffix;
  
  const maxPrefixLen = 69 - totalSuffix.length;
  if (s.length > maxPrefixLen) {
    s = s.substring(0, maxPrefixLen).replace(/-$/, '');
  }
  
  const slugFinal = s + totalSuffix;
  if (slugFinal.length >= 70) {
    console.warn(`[WARNING] Slug excede 70 caracteres: ${slugFinal} (Length: ${slugFinal.length})`);
  }
  
  return slugFinal;
}

function generateSeeds() {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
  let existingSeeds: any[] = [];
  
  if (fs.existsSync(outputPath)) {
    try {
      existingSeeds = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      console.log(`[Preservação] Encontradas ${existingSeeds.length} sementes existentes.`);
    } catch (e) {
      console.warn(`[Aviso] Falha ao ler seeds.json. Iniciando do zero.`);
    }
  }

  const forgedMap = new Map();
  for (const seed of existingSeeds) {
    if (seed.contentMarkdown) {
      // forgedMap.set(seed.id, seed); // PURGED: Limpando a base antiga para aplicar os ganchos 100%
    }
  }
  
  const seeds: any[] = [];
  let idCounter = 1;

  const hooksArrPT = embaralharDeterministico(GANCHOS.pt);
  const hooksArrEN = embaralharDeterministico(GANCHOS.en);
  const hooksArrES = embaralharDeterministico(GANCHOS.es);
  
  let hookIndexPT = 0, lastHookPT = '';
  let hookIndexEN = 0, lastHookEN = '';
  let hookIndexES = 0, lastHookES = '';

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
              
              const hooksArr = locale === 'pt' ? hooksArrPT : hooksArrEN;
              let hookIndex = locale === 'pt' ? hookIndexPT : hookIndexEN;
              let lastHook = locale === 'pt' ? lastHookPT : lastHookEN;

              if (hooksArr[hookIndex % 25].id === lastHook) { hookIndex++; }
              const chosenHook = hooksArr[hookIndex % 25];
              
              if (locale === 'pt') { hookIndexPT = hookIndex + 1; lastHookPT = chosenHook.id; }
              else { hookIndexEN = hookIndex + 1; lastHookEN = chosenHook.id; }

              let title = chosenHook.text
                .replace('{vetor}', pains[k])
                .replace('{setor}', niches[i])
                .replace('{lei}', laws[j]);
              
              title += variationText;
              
              if (title.includes('{vetor}') || title.includes('{setor}') || title.includes('{lei}')) {
                 console.error(`[FALHA] Token não substituído no título: ${title}`);
              }

              const slugFinal = createShortSlug(title, v, chosenHook.id);

              seeds.push({
                id: seedId,
                locale,
                assunto: locale === 'pt' ? 'soberana' : 'global',
                slug: slugFinal,
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

  const localeES = 'es';
  let localeCountES = 0;
  
  for (let m = 0; m < esMappings.length && localeCountES < SEEDS_PER_LOCALE; m++) {
    for (let p = 0; p < esPains.length && localeCountES < SEEDS_PER_LOCALE; p++) {
      for (let v = 1; v <= 40 && localeCountES < SEEDS_PER_LOCALE; v++) {
        const seedId = `omni-${localeES}-${idCounter.toString().padStart(5, '0')}`;
        
        if (forgedMap.has(seedId)) {
          seeds.push(forgedMap.get(seedId));
        } else {
          const mapping = esMappings[m];
          const pain = esPains[p];
          const variationText = v > 1 ? ` (Case Study ${v})` : '';
          
          const nicheCombined = `${mapping.niche} (${mapping.country})`;

          if (hooksArrES[hookIndexES % 25].id === lastHookES) { hookIndexES++; }
          const chosenHook = hooksArrES[hookIndexES % 25];
          lastHookES = chosenHook.id;
          hookIndexES++;

          let title = chosenHook.text
            .replace('{vetor}', pain)
            .replace('{setor}', nicheCombined)
            .replace('{lei}', mapping.law);
          
          title += variationText;

          if (title.includes('{vetor}') || title.includes('{setor}') || title.includes('{lei}')) {
             console.error(`[FALHA] Token não substituído no título: ${title}`);
          }

          const slugFinal = createShortSlug(title, v, chosenHook.id);

          seeds.push({
            id: seedId,
            locale: localeES,
            assunto: 'latam',
            slug: slugFinal,
            title,
            niche: nicheCombined,
            law: mapping.law,
            painPoint: pain
          });
        }
        idCounter++;
        localeCountES++;
      }
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(seeds, null, 2));
  console.log(`[Fase A Concluída] -> ${seeds.length} Sementes geradas em ${outputPath}`);
  console.log(`[Preservação] ${forgedMap.size} sementes forjadas foram preservadas intocadas.`);
}

generateSeeds();
