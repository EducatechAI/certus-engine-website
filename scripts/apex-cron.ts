import fs from 'fs';
import path from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

// Paths
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const SEEDS_FILE = path.join(DATA_DIR, 'seeds.json');
const LOG_SUCCESS_FILE = path.join(DATA_DIR, 'forge-success.json');
const LOG_ERROR_FILE = path.join(DATA_DIR, 'forge-errors.json');
const DOSSIERS_DIR = path.join(__dirname, '..', '..', 'Docs', 'Certus_SDK_Internal', 'dossiês'); 

const TOP_DOSSIERS = [
  'WHITEPAPER_TECNICO_v3_3_0.md',
  'BASE_CONHECIMENTO_245_QA.md',
  'PLANO_IMPLANTACAO_CPSI_MUNICIPIOS.md',
  'DOSSIE_ESTRATEGICO_LATAM.md',
  'DOSSIE_SMART_CONTRACTS_TESTS_v1.0.md',
  'DOSSIE_FORENSE_REGRA_001.md',
  'WHITEPAPER_EN_v3_0_0.md',
  'CAPACIDADES_SOBERANAS.md'
];

// Utilitário de Log
function appendLog(file: string, logEntry: any) {
  let logs = [];
  if (fs.existsSync(file)) {
    logs = JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  logs.push({ timestamp: new Date().toISOString(), ...logEntry });
  fs.writeFileSync(file, JSON.stringify(logs, null, 2));
}

async function loadRAGContext(): Promise<string> {
  let context = '';
  for (const doc of TOP_DOSSIERS) {
    const docPath = path.join(DOSSIERS_DIR, doc);
    if (fs.existsSync(docPath)) {
      context += `\n\n--- DOCUMENTO: ${doc} ---\n`;
      context += fs.readFileSync(docPath, 'utf-8').substring(0, 3000); 
    }
  }
  return context;
}

async function performWebRAG(niche: string, law: string, pain: string): Promise<string> {
  if (!SERPER_API_KEY) return 'Sem contexto web atualizado.';
  try {
    const query = `latest news penalties ${law} ${niche} ${pain}`;
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query })
    });
    const data = await response.json();
    return JSON.stringify(data.organic?.slice(0, 3) || 'Nenhum resultado recente.');
  } catch (error) {
    return 'Falha ao recuperar Web RAG.';
  }
}

async function generateContent(seed: any, localRAG: string, webRAG: string): Promise<{model: string, content: string}> {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');

  const prompt = `
  Você é o Mestre Soberano do Certus Engine, a IA letal de defesa cibernética.
  Escreva um Dossiê Técnico de altíssima densidade (3000 a 4000 caracteres) no idioma '${seed.locale}'.
  
  TÍTULO DO DOSSIÊ: ${seed.title}
  ALVO (NICHO): ${seed.niche}
  LEI / COMPLIANCE: ${seed.law}
  DOR: ${seed.painPoint}

  DIRETRIZES:
  1. Prove matematicamente como o Certus Engine mitiga esse ataque usando Provas de Conhecimento Zero (ZK-SNARKs).
  2. Use tom autoritário e determinístico (Regra #001: Desconfiança Zero).
  3. Não cite "achismos". Use os fatos recentes do Web RAG: ${webRAG}
  4. Baseie-se nas capacidades técnicas (Kangal, Wolfdog): ${localRAG}
  5. Formate estritamente em Markdown avançado (use tabelas, blocos de código e blockquotes).
  `;

  const MODELS_ROULETTE = [
    "deepseek/deepseek-r1",
    "qwen/qwen-2.5-72b-instruct",
    "meta-llama/llama-3.1-70b-instruct",
    "google/gemini-2.5-flash",
    "anthropic/claude-3.5-sonnet"
  ];

  let lastError = null;

  for (const model of MODELS_ROULETTE) {
    try {
      console.log(`  -> Tentando forjar com: ${model}...`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error.message);
      
      const content = data.choices[0].message.content;

      // QUALITY GATE (Mínimo de caracteres exigidos pelo Mestre)
      if (content.length < 1500) {
        throw new Error(`Quality Gate Reprovado: Texto gerado muito curto (${content.length} caracteres). Exigido ~3000.`);
      }
      
      console.log(`  -> [SUCESSO] Texto forjado pelo modelo: ${model} (${content.length} chars)`);
      return { model, content };

    } catch (error: any) {
      console.warn(`  ⚠️ [FALHA] no modelo ${model}: ${error.message}. Puxando fallback...`);
      lastError = error;
    }
  }

  // CIRCUIT BREAKER ACIONADO
  throw new Error(`Circuit Breaker: Todos os LLMs falharam. Último Erro: ${lastError?.message}`);
}

async function runCron() {
  console.log('[APEX Cron] Booting JIT Engine com Quality Gate...');
  if (!fs.existsSync(SEEDS_FILE)) {
    console.error('ERRO: seeds.json não encontrado.');
    return;
  }

  const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));
  const now = Date.now();
  
  const targetSeed = seeds.find((s: any) => !s.contentMarkdown && new Date(s.releaseDate).getTime() <= now);
  
  if (!targetSeed) {
    console.log('[APEX Cron] Nenhuma semente madura pendente. Hibernando.');
    return;
  }
  
  console.log(`[APEX Cron] Target Adquirido: ${targetSeed.slug} (Release: ${targetSeed.releaseDate})`);
  
  try {
    const localRAG = await loadRAGContext();
    const webRAG = await performWebRAG(targetSeed.niche, targetSeed.law, targetSeed.painPoint);
    
    // Roda a Forja (com Circuit Breaker e Quality Gate embargados)
    const result = await generateContent(targetSeed, localRAG, webRAG);
    
    // Atualiza o JSON
    const seedIndex = seeds.findIndex((s: any) => s.id === targetSeed.id);
    seeds[seedIndex].contentMarkdown = result.content;
    fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
    
    // Log de Sucesso
    appendLog(LOG_SUCCESS_FILE, {
      seedId: targetSeed.id,
      slug: targetSeed.slug,
      modelUsed: result.model,
      length: result.content.length,
      status: 'SUCCESS'
    });
    
    console.log(`[APEX Cron] Sucesso Máximo. Semente ${targetSeed.slug} forjada e auditada.`);
  } catch (error: any) {
    console.error(`[APEX Cron] 🛑 FALHA CRÍTICA: ${error.message}`);
    
    // Log de Falha
    appendLog(LOG_ERROR_FILE, {
      seedId: targetSeed.id,
      slug: targetSeed.slug,
      error: error.message,
      status: 'FAILED'
    });
    
    process.exit(1); // Aciona alerta vermelho no GitHub Actions
  }
}

runCron();
