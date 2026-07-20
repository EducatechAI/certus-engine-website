import fs from 'fs';
import path from 'path';

// --- CONFIGURAÇÃO DOS CLUSTERS (PERMUTAÇÃO DETERMINÍSTICA) ---
const clusters = {
  pt: {
    niches: ['Prefeituras', 'Bancos', 'Fintechs', 'Hospitais (SUS)', 'Universidades Federais', 'Logística', 'E-commerce', 'Adquirência (Maquininhas)', 'Governos Estaduais', 'Indústria (EMBRAPII)'],
    laws: ['LGPD (Art. 46)', 'Resolução BACEN 4.893', 'Lei CSPI 182/2021', 'Marco Civil da Internet', 'Decreto Governança Digital'],
    pains: ['Vazamento de CPF e PII', 'Ransomware bloqueando servidores', 'Roubo de Chaves de API', 'Manipulação de Logs Eleitorais', 'Fraude em Licitações via IA', 'Deepfakes Governamentais', 'Ataque DDoS na Camada 7', 'Injeção de Prompts (AI Poisoning)'],
  },
  en: {
    niches: ['Enterprise Healthcare', 'Defense Contractors', 'DeFi Protocols', 'Global Banks', 'Cloud Providers', 'SaaS Platforms', 'E-voting Systems', 'Telecom Networks'],
    laws: ['GDPR (Europe)', 'HIPAA (US Healthcare)', 'CCPA (California)', 'SEC AI Washing Rules', 'Cloud Act', 'EU AI Act'],
    pains: ['Corporate Espionage', 'Cross-Border Data Leaks', 'Smart Contract Exploits', 'Zero-Day AI Vulnerabilities', 'Insider Threats', 'Supply Chain Ransomware', 'Quantum Decryption Risks'],
  },
  es: {
    niches: ['Gobiernos Digitales', 'Bancos Centrales', 'Fintechs LATAM', 'Hospitales Públicos', 'Sistemas Electorales', 'Telecomunicaciones', 'Retailers', 'Startups'],
    laws: ['Ley Federal de Protección de Datos (México)', 'Ley 1581 (Colombia)', 'Ley 25.326 (Argentina)', 'Normativas de Ciberseguridad LATAM'],
    pains: ['Secuestro de Datos (Ransomware)', 'Robo de Identidad Ciudadana', 'Falsificación de Votos', 'Vulnerabilidad en APIs Abiertas', 'Ataques a Infraestructura Crítica', 'Fuga de Datos Masiva'],
  }
};

const SEEDS_PER_LOCALE = 1560;

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function generateSeeds() {
  const seeds: any[] = [];
  let idCounter = 1;

  for (const [locale, data] of Object.entries(clusters)) {
    const { niches, laws, pains } = data;
    let localeCount = 0;

    // Permutação até atingir 1560
    for (let i = 0; i < niches.length && localeCount < SEEDS_PER_LOCALE; i++) {
      for (let j = 0; j < laws.length && localeCount < SEEDS_PER_LOCALE; j++) {
        for (let k = 0; k < pains.length && localeCount < SEEDS_PER_LOCALE; k++) {
          
          // Adiciona variações numéricas se faltar volume (Pigeonhole principle fallback)
          for (let v = 1; v <= 10 && localeCount < SEEDS_PER_LOCALE; v++) {
            const variationText = v > 1 ? ` (Case Study ${v})` : '';
            
            const title = locale === 'pt' 
              ? `Como o Certus Engine Mitiga ${pains[k]} em ${niches[i]} sob a ${laws[j]}${variationText}`
              : locale === 'en'
              ? `Certus Engine: Mitigating ${pains[k]} for ${niches[i]} under ${laws[j]}${variationText}`
              : `Cómo Certus Engine Mitiga ${pains[k]} en ${niches[i]} bajo la ${laws[j]}${variationText}`;
            
            seeds.push({
              id: `omni-${locale}-${idCounter.toString().padStart(5, '0')}`,
              locale,
              assunto: locale === 'pt' ? 'soberana' : locale === 'en' ? 'global' : 'latam',
              slug: slugify(title),
              title,
              niche: niches[i],
              law: laws[j],
              painPoint: pains[k]
            });
            
            idCounter++;
            localeCount++;
          }
        }
      }
    }
  }

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
  fs.writeFileSync(outputPath, JSON.stringify(seeds, null, 2));
  console.log(`[Fase A Concluída] -> ${seeds.length} Sementes geradas em ${outputPath}`);
}

generateSeeds();
