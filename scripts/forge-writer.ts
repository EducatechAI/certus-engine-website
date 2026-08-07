import * as fs from 'fs';
import * as path from 'path';
import { normalizeHeaders, type Lang, type Assunto } from '../src/lib/canonical';

// Interfaces
interface Seed {
  id: string;
  locale: string;
  assunto: string;
  slug: string;
  title: string;
  niche: string;
  law: string;
  painPoint: string;
  releaseDate: string;
  contentMarkdown?: string;
}

// Configurações e Chaves API
try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env.local'));
} catch (e) {
  console.warn('[FORGE] Falha ao carregar .env.local via loadEnvFile:', e.message);
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const BATCH_SIZE = 1;

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const DOSSIERS_DIR = path.join(__dirname, '..', '..', 'Docs', 'Certus_SDK_Internal', 'dossiês');

const TOP_DOSSIERS = [
  'WHITEPAPER_TECNICO_v3_3_0.md',
  'BASE_CONHECIMENTO_245_QA.md',
  'PLANO_IMPLANTACAO_CPSI_MUNICIPIOS.md',
  'DOSSIE_ESTRATEGICO_LATAM.md',
  'DOSSIE_SMART_CONTRACTS_TESTS_v1.0.md',
  'DOSSIE_FORENSE_REGRA_001.md',
  'WHITEPAPER_EN_v3_0_0.md',
  'CAPACIDADES_SOBERANAS.md',
  'DOSSIE_RECALIBRAR_V3_0.md'
];

const CONSTITUTIONAL_PROMPT = `
Você é o Motor de Geração de Conhecimento do Certus Engine, a infraestrutura de Soberania Digital Determinística. Sua missão é gerar artigos técnicos e jurídicos de altíssima densidade (Tier A+) que demonstrem como o Certus Engine e sua Frota APEX aplicam matemática pura, criptografia avançada e determinismo para garantir o cumprimento estrito das leis de proteção de dados e cibersegurança globais.

[A FROTA APEX E O CERTUS ENGINE]
A Frota APEX não é um conjunto de agentes isolados; é uma entidade coesa e indivisível. 
- NÃO invente ou rigidifique nomenclaturas de agentes internos. 
- SEMPRE descreva as ações de defesa, interceptação, auditoria e mascaramento como capacidades integradas do "Certus Engine", da "Frota APEX" ou do "Módulo de Soberania". A Frota age como um organismo único.

[TECNOLOGIAS INEGOCIÁVEIS (O STACK SOBERANO)]
1. PII-Zero: Camada de mascaramento, sanitização e tokenização dinâmica de dados sensíveis.
2. ZK-SNARKs / ZK-Proofs: Matemática de Conhecimento Zero que prova a validade sem expor o dado.
3. Midnight: Protocolo de privacidade e rastreamento de ativos que garante confidencialidade por design.
4. Rust / WASM: Base de engenharia determinística que garante ausência de alucinações ou latências probabilísticas.

[REGRAS DE OURO DE GERAÇÃO]
1. Foco na Capacidade: Diga "A Frota APEX intercepta e ancora o hash..." em vez de nomear agentes específicos.
2. Rigor Jurídico: Cite os artigos de lei corretos. Nunca alucine leis ou jurisdições.
3. Rigor Tecnológico: O PII-Zero mascara; os ZK-SNARKs provam. O Certus usa lógica determinística em Rust, NUNCA IA generativa para decisões de bloqueio.
4. Completude: O artigo DEVE ser gerado por completo, do título ao banner final, sem truncamentos.
`;

const QWEN_MODELS = [
  { 
    id: 'qwen/qwen3.7-plus', 
    name: 'Qwen 3.7 Plus (Primary - Deep Reasoning & Rule Adherence)',
    temperature: 0.2 // Determinismo máximo para evitar alucinações e Role Bleeding
  },
  { 
    id: 'qwen/qwen3.7-flash', 
    name: 'Qwen 3.7 Flash (Fallback - High Speed / Graceful Degradation)',
    temperature: 0.2 // Mantido baixo para consistência mesmo no fallback
  }
];

export interface GatekeeperRule {
  id: string;
  pattern: RegExp;
  violation: string;
  correctionPrompt: string;
}

export const GATEKEEPER_RULES: GatekeeperRule[] = [
  {
    id: "RULE_01_TECH_HALLUCINATION_PII_ZK",
    pattern: /(?:PII-Zero|PII_Zero)[^.?!]{0,150}?(?:gera|generates|cria|creates|produz).*?(?:ZK-SNARK|ZK-Proof|nullifier|prova de conhecimento zero)/i,
    violation: "Alucinação Tecnológica: PII-Zero atribuído a funções de ZK-Proofs.",
    correctionPrompt: "ERRO CRÍTICO DE ARQUITETURA: O PII-Zero é estritamente uma camada de mascaramento e tokenização. Ele NUNCA gera ZK-SNARKs. Reescreva atribuindo a geração de provas ZK ao protocolo Midnight ou ao motor criptográfico do Certus Engine."
  },
  {
    id: "RULE_02_PROBABILISTIC_DENIAL",
    pattern: /(?:Certus Engine|Frota APEX|Certus)[^.?!]{0,150}?(?:alucina|hallucinates|probabilístico|probabilistic|IA generativa).*?(?:para decidir|para bloquear|para interceptar)/i,
    violation: "Negação do Determinismo: Certus atribuído a comportamentos probabilísticos.",
    correctionPrompt: "ERRO CRÍTICO DE ONTOLOGIA: O Certus Engine e a Frota APEX são estritamente DETERMINÍSTICOS, construídos em Rust. Eles NUNCA usam IA generativa para tomar decisões de segurança. Reescreva enfatizando a lógica determinística."
  },
  {
    id: "RULE_03_JURIDICAL_HALLUCINATION",
    pattern: /(?:LGPD|Lei Geral de Proteção de Dados)[^.?!]{0,150}?(?:na Europa|GDPR|Europa|United States|Estados Unidos)/i,
    violation: "Alucinação Jurídica: Confusão de jurisdições de leis.",
    correctionPrompt: "ERRO CRÍTICO JURÍDICO: A LGPD é estritamente a lei do Brasil. Reescreva o parágrafo corrigindo a jurisdição da lei citada."
  },
  {
    id: "RULE_04_TRUNCATION_CHECK",
    pattern: /(?:\*\*\*|🛡️|Ecossistema Educatech AI)(?:\s|\n)*$/i,
    violation: "Truncamento de Conteúdo: O artigo foi cortado antes da conclusão.",
    correctionPrompt: "ERRO DE COMPLETUDE: O artigo foi truncado. Reescreva o artigo COMPLETO, garantindo que todas as seções (Contexto, Anatomia da Prova, Mapeamento Forense e Conclusão) estejam presentes antes do banner final."
  }
];

export function validateArticleContent(content: string): { isValid: boolean; violation?: GatekeeperRule, reason?: string } {
  for (const rule of GATEKEEPER_RULES) {
    if (rule.pattern.test(content)) {
      return { isValid: false, violation: rule };
    }
  }
  return { isValid: true };
}

const PT_MARKERS = ['ção', 'ções', 'ão', 'ões', 'nh', 'lh', 'ç', 'não', 'ê', 'â'];

function hasPortugueseBleed(text: string, locale: string): boolean {
  if (locale === 'pt') return false;
  const lower = text.toLowerCase();
  return PT_MARKERS.some(m => lower.includes(m));
}

async function loadRAGContext(locale: string): Promise<string> {
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
  if (!SERPER_API_KEY) {
    console.warn('⚠️ SERPER_API_KEY não encontrada. Pulando Web RAG.');
    return 'Sem contexto web atualizado.';
  }

  try {
    const query = `latest news penalties ${law} ${niche} ${pain}`;
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: query })
    });
    const data = await response.json();
    return JSON.stringify(data.organic?.slice(0, 3) || 'Nenhum resultado recente.');
  } catch (error) {
    console.error('Erro no Web RAG:', error);
    return 'Falha ao recuperar Web RAG.';
  }
}

async function generateArticleWithFallback(seed: Seed, localRAG: string, webRAG: string): Promise<string> {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');

  const templateIndex = (seed.id || seed.slug).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3;
  const templates = [
    "Formato A (O Padrão): Estudo de Caso / Cenário de Ameaça.",
    "Formato B (Especificação Técnica): Focado em 'Como o Módulo X funciona'. Mais técnico, com mais código, menos narrativa jurídica. Estilo 'Documentação de API'.",
    "Formato C (Matriz de Decisão / FAQ): Estruturado como 'Pergunta: [Dor do CISO] -> Resposta: [Solução Certus] -> Prova: [Comando/Hash]'."
  ];
  const selectedTemplate = templates[templateIndex];

  const userPrompt = `
  TÍTULO DO DOSSIÊ: ${seed.title}
  ALVO (NICHO): ${seed.niche}
  LEI / COMPLIANCE: ${seed.law}
  DOR: ${seed.painPoint}
  IDIOMA: ${seed.locale}

  DIRETRIZES TÁTICAS:
  1. Prove matematicamente como o Certus Engine mitiga esse ataque usando Provas de Conhecimento Zero (ZK-SNARKs).
  2. Use tom autoritário e determinístico (Regra #001: Desconfiança Zero).
  3. Não cite "achismos". Use os fatos recentes do Web RAG: ${webRAG}
  4. Baseie-se nas capacidades técnicas (Kangal, Wolfdog): ${localRAG}
  5. Formate estritamente em Markdown avançado (use tabelas, blocos de código com JSON/Rust, e blockquotes).
  6. ESTRUTURA OBRIGATÓRIA (Rotação Anti-Spam): Siga EXATAMENTE este formato para este artigo: ${selectedTemplate}
  `;

  for (const model of QWEN_MODELS) {
    try {
      console.log(`[FORGE] Iniciando inferência com ${model.name}...`);
      const MAX_RETRIES = 3;
      let attempt = 0;
      let currentMessages: any[] = [
        { role: 'system', content: CONSTITUTIONAL_PROMPT },
        { role: 'user', content: userPrompt }
      ];
      let lastDraft = '';
      let lastViolation: any = null;

      while (attempt < MAX_RETRIES) {
        attempt++;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://certusengine.ia.br',
            'X-Title': 'Certus Engine Forge'
          },
          body: JSON.stringify({
            model: model.id,
            messages: currentMessages,
            temperature: model.temperature,
            max_tokens: 8192
          })
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        const content = data.choices[0].message.content;
        lastDraft = content;
        
        // --- 🔐 LAZARUS SANITY CHECK (Validação Determinística Pré-Salvamento) ---
        const validation = validateArticleContent(content);
        if (!validation.isValid) {
          console.warn(`[GATEKEEPER] Violação ontológica detectada na tentativa ${attempt}/${MAX_RETRIES}: ${validation.violation ? validation.violation.id : validation.reason}`);
          if (attempt < MAX_RETRIES) {
            currentMessages.push({ role: 'assistant', content: content });
            currentMessages.push({ 
              role: 'user', 
              content: validation.violation ? validation.violation.correctionPrompt : `ERRO: ${validation.reason} Corrija e retorne o documento inteiro mantendo a estrutura original.`
            });
            console.log(`[GATEKEEPER] Solicitando correção completa do texto...`);
            continue;
          } else {
             lastViolation = validation.violation || { correctionPrompt: validation.reason };
             break;
          }
        }
        
        console.log(`[FORGE] Sucesso. Artigo forjado e validado com ${model.name}.`);
        return content; 
      }
      
      const error: any = new Error('QUARANTINE_ERROR');
      error.details = {
         violation: lastViolation,
         lastDraft: lastDraft
      };
      throw error;
      
    } catch (error: any) {
      if (error.message === 'QUARANTINE_ERROR') throw error;
      console.error(`[FORGE] Falha crítica com ${model.name}:`, error.message);
      if (model === QWEN_MODELS[QWEN_MODELS.length - 1]) {
        throw new Error(`Falha total na geração. Todos os modelos Qwen 3.7 falharam ou violaram a Constituição APEX.`);
      }
      console.warn(`[FORGE] Ativando degradação graciosa: fallback para ${QWEN_MODELS[1].name}...`);
    }
  }
  
  throw new Error("Erro desconhecido na geração do artigo.");
}

async function runPhaseC() {
  if (!fs.existsSync(SEEDS_FILE)) {
    console.error('ERRO: seeds.json não encontrado.');
    return;
  }

  const seeds: Seed[] = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));
  let pendingSeeds = seeds.filter(s => !s.contentMarkdown);
  
  const priorityKeywords = ['2026', 'AI Act', 'ANPD', 'Marco Civil', '27001', '37001', '21.719'];
  const prioritySeeds = pendingSeeds.filter(s => 
    priorityKeywords.some(kw => s.law.includes(kw) || s.painPoint.includes(kw))
  );
  const legacySeeds = pendingSeeds.filter(s => 
    !priorityKeywords.some(kw => s.law.includes(kw) || s.painPoint.includes(kw))
  );
  
  pendingSeeds = [...prioritySeeds, ...legacySeeds];
  
  // CONTA-GOTAS: Limita a execução atual para não esgotar o tempo do GitHub Actions
  const MAX_BATCHES_PER_RUN = process.env.MAX_BATCHES_PER_RUN ? parseInt(process.env.MAX_BATCHES_PER_RUN) : 1;
  const totalToProcess = Math.min(pendingSeeds.length, BATCH_SIZE * MAX_BATCHES_PER_RUN);
  
  console.log(`[Fase C] Iniciando Forja APEX com Stack Qwen 3.7. Conta-gotas ativo: Processando ${totalToProcess} de ${pendingSeeds.length} dossiês pendentes.`);
  
  pendingSeeds = pendingSeeds.slice(0, totalToProcess);

  const localRAG = await loadRAGContext('pt');
  
  for (let i = 0; i < pendingSeeds.length; i += BATCH_SIZE) {
    const batch = pendingSeeds.slice(i, i + BATCH_SIZE);
    console.log(`Processando Lote ${Math.floor(i/BATCH_SIZE) + 1}...`);
    
    await Promise.all(batch.map(async (seed) => {
      try {
        console.log(`  -> Pesquisando Web (RAG) para: ${seed.slug}`);
        const webRAG = await performWebRAG(seed.niche, seed.law, seed.painPoint);
        
        console.log(`  -> Forjando Texto (Stack Qwen 3.7) para: ${seed.slug}`);
        let markdown = await generateArticleWithFallback(seed, localRAG, webRAG);
        
        if (hasPortugueseBleed(markdown, seed.locale)) {
          throw new Error('LANGUAGE GUARD BLOCKED: Bleed-over de Português detectado na geração. Dossiê rejeitado e mantido pendente para regeneração.');
        }

        const { content: safeMarkdown, prependedCanonical } = normalizeHeaders(
          markdown,
          seed.locale as Lang,
          seed.assunto as Assunto,
          seed.slug,
        );
        if (prependedCanonical) {
          console.warn(`[forge-writer] canonical ausente no output do LLM — injetado para ${seed.slug}`);
        }

        const seedIndex = seeds.findIndex(s => s.id === seed.id);
        seeds[seedIndex].contentMarkdown = safeMarkdown;
        fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
        
        console.log(`  ✅ [SUCESSO] Dossiê blindado: ${seed.slug}`);
      } catch (err: any) {
        if (err.message === 'QUARANTINE_ERROR') {
          console.error(`[GATEKEEPER] Artigo ${seed.id} falhou após 3 tentativas. Enviado para a Quarentena.`);
          const QUARANTINE_PATH = path.join(__dirname, '..', 'src', 'data', 'quarantine_bay.json');
          const quarantineRecord = {
            timestamp: new Date().toISOString(),
            seed_id: seed.id,
            slug: seed.slug,
            failure_reason: err.details?.violation?.correctionPrompt || 'Erro desconhecido',
            last_generated_content: err.details?.lastDraft
          };
          let quarantineBay = [];
          if (fs.existsSync(QUARANTINE_PATH)) {
            quarantineBay = JSON.parse(fs.readFileSync(QUARANTINE_PATH, 'utf8'));
          }
          quarantineBay.push(quarantineRecord);
          fs.writeFileSync(QUARANTINE_PATH, JSON.stringify(quarantineBay, null, 2), 'utf8');
        } else {
          console.error(`  ❌ [FALHA] ${seed.slug}: ${err.message}`);
        }
      }
    }));
    
    console.log(`Lote finalizado. Resfriando motores (5 segundos)...`);
    await new Promise(r => setTimeout(r, 5000));
  }
}

if (require.main === module) {
  runPhaseC().catch(console.error);
}
