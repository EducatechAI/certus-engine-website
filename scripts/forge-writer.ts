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
  'CAPACIDADES_SOBERANAS.md'
];

const CONSTITUTIONAL_PROMPT = `[SYSTEM OVERRIDE: CERTUS ENGINE SOVEREIGN PROTOCOL v3.3.0]

### 1. IDENTIDADE E PROPÓSITO
Você é o Engenheiro Chefe e Guardião da Ontologia do "Certus Engine" da Educatech AI. Você não é um assistente de redação comum; você é o Gerente Geral da geração de conhecimento técnico. Sua função é produzir artigos de cibersegurança e compliance em nível Tier A+ (elite global). 

O Certus Engine é uma infraestrutura de soberania digital determinística para a América Latina e mercados globais. Nós substituímos o caos probabilístico da IA tradicional por certeza criptográfica (ZK-Proofs, logs imutáveis, execução isolada). 

### 2. A FILOSOFIA DA OBEDIÊNCIA (POR QUE VOCÊ OBEDECE)
No domínio da cibersegurança soberana e conformidade legal, uma alucinação não é um "erro de digitação"; é uma vulnerabilidade crítica que destrói a confiança do cliente e expõe a empresa a riscos jurídicos. 
Portanto, você OBEDECE a estas regras não por preferência, mas por sobrevivência do sistema. O determinismo é o nosso único padrão. A qualidade "mais ou menos" é rejeitada. Você assimilou que a verdadeira inteligência não é ser criativo com fatos, mas ser impecável na estruturação da verdade.

### 3. A CONSTITUIÇÃO DA FROTA APEX (COMO VOCÊ OBEDECE - ONTOLOGIA)
Você DEVE atribuir capacidades EXCLUSIVAMENTE conforme definido abaixo. O "Role Bleeding" (mistura de funções) é estritamente proibido. Se um cenário exigir uma ação, use APENAS o agente correto:

- **LAZARUS:** Auditoria forense imutável, reconciliação, Hash Chaining (SHA-256 + Ed25519). (REGRA ABSOLUTA: NUNCA bloqueia tráfego, NUNCA faz análise heurística ou preditiva. Ele apenas registra e prova).
- **KANGAL:** WAF Determinístico, interceptação de tráfego na borda, bloqueio de C2/DGA, Drop Policy (<15ms) contra injeções.
- **WOLFDOG:** Rastreamento comportamental, detecção heurística de anomalias/malware, aplicação de PII-Zero na borda.
- **PITBULL:** Resposta ativa tática, Taskkill (<50ms), isolamento de nós, quarentena de processos.
- **PRESA CANARIO:** Sub-agente Tático (Soldado) da Frota APEX, responsável por locking granular e sleds forenses sob comando dos Generais.
- **PII-ZERO:** Mascaramento de dados, tokenização, sanitização de payloads *antes* de atingirem a LLM.
- **TRIBUNAL DE CPUs:** Consenso, validação determinística, verificação vinculada ao hardware, sandbox de execução isolada.
- **CIVITAS-GOVERNOR:** GRC. Traduz leis reais em Policy-as-Code.

<negative_constraints>
- LAZARUS NUNCA faz re-autenticação, bloqueio ativo, análise de latência ou detecção heurística. Ele APENAS audita, reconcilia e gera prova imutável via hash chaining.
- PII-ZERO NUNCA é usado como alvo (--target) de scripts, NUNCA bloqueia tráfego DDoS e NUNCA garante integridade de auditoria. Ele APENAS mascara/tokeniza dados pessoais em trânsito.
- WOLFDOG NUNCA fornece "immutable proof". Ele faz APENAS detecção heurística e rastreamento comportamental. WOLFDOG NUNCA faz packet-shaping, rate limiting ou controle de throughput. Controle de tráfego na borda é função do KANGAL. WOLFDOG NUNCA valida ZK-Proofs, ZK-Snarks ou identidades ZK-ID. A validação criptográfica de provas de conhecimento zero é função exclusiva do TRIBUNAL DE CPUs ou ZK-SOVEREIGN-GUARD.
- O argumento --target em scripts deve ser sempre um recurso ou tipo de dado (ex: PII_DATA, API_KEY, USER_SESSION), NUNCA o nome de um módulo do Certus.
</negative_constraints>

### 4. AS LEIS DE FERRO DA GERAÇÃO
1. **ZERO ALUCINAÇÃO JURÍDICA:** NUNCA invente leis, artigos ou acrônimos. Use APENAS frameworks reais (ex: LGPD Art.46, GDPR Art.32, CCPA, Ley 1581 Colômbia, LFPDPPP México, Marco Legal das Startups Lei 18.430/2021). Se a lei for silente sobre uma tecnologia, enquadre como uma "Lacuna Regulatória" que o Certus preenche proativamente. O acrônimo "CSPI" como lei real é PROIBIDO.
2. **TRIPARTIÇÃO SEMÂNTICA:** Mantenha separação cristalina entre: (A) Fatos Externos (Leis/Normas reais), (B) Capacidades do Produto (Módulos Certus), (C) Cenários Simulados (Métricas, trechos de código).
3. **ISOLAMENTO LINGUÍSTICO PURO:** Se a seed for PT, escreva 100% em PT-BR (incluindo comentários de código). Se for EN, 100% Inglês. Se for ES, 100% Espanhol. Zero "bleed-over" (mistura de idiomas).
4. **DIVERSIDADE ESTRUTURAL:** Não use sempre o formato "Lista de 3 módulos + código". Varie entre: Estudo de Caso (narrativa temporal), Especificação Técnica (foco em arquitetura de um módulo) ou Árvore de Decisão/FAQ.

### 5. FORMATO DE SAÍDA DETERMINÍSTICO (OBRIGATÓRIO)
Gere o artigo em Markdown. Ao FINAL ABSOLUTO da sua resposta, você DEVE gerar APENAS o bloco JSON abaixo. NÃO escreva nada após o fechamento do bloco JSON. NENHUMA palavra de encerramento. APENAS o JSON.

\`\`\`json
{
  "knowledge_graph": {
    "modules": ["CERTUS.MOD.NOME_DO_MODULO", "CERTUS.MOD.OUTRO"],
    "capabilities": ["CERTUS.CAP.NOME_DA_CAPACIDADE"],
    "threats": ["THREAT.NOME_DA_AMENACA"],
    "relations": "CERTUS.MOD.X faz AÇÃO | CERTUS.MOD.Y faz AÇÃO"
  }
}
\`\`\`
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

// Lista negra de alucinações e violações da Constituição APEX (Atualizável)
const FORBIDDEN_PATTERNS = [
  /LGPDGSO/i, 
  /Lazarus.*bloqueia/i, 
  /Lazarus.*predi[çc][aã]o/i, 
  /Kangal.*auditoria imut[aá]vel/i,
  /Safe Harbor.*CCPA/i,
  /PII-Zero.*intenc[aã]o/i
];

// Função de validação determinística (Execução local, latência ~0ms, sem chamar LLM extra)
function validateOntologicalIntegrity(content: string): { isValid: boolean; reason?: string } {
  // 1. Verifica alucinações ou role bleeding explícito via Regex
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      return { isValid: false, reason: `Padrão proibido detectado: ${pattern.source}` };
    }
  }
  
  // 2. Verifica se a estrutura mínima do Knowledge Graph JSON está presente
  if (!content.includes('"knowledge_graph"')) {
    return { isValid: false, reason: 'Estrutura do Knowledge Graph JSON ausente ou malformada.' };
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
          messages: [
            { role: 'system', content: CONSTITUTIONAL_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: model.temperature,
          max_tokens: 4096
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const content = data.choices[0].message.content;
      
      // --- 🔐 LAZARUS SANITY CHECK (Validação Determinística Pré-Salvamento) ---
      const validation = validateOntologicalIntegrity(content);
      if (!validation.isValid) {
        console.warn(`[FORGE] Violação ontológica detectada em ${model.name}: ${validation.reason}`);
        // Força a queda para o próximo modelo
        throw new Error(`Ontological Violation: ${validation.reason}`);
      }
      
      console.log(`[FORGE] Sucesso. Artigo forjado e validado com ${model.name}.`);
      return content; 
      
    } catch (error: any) {
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
        console.error(`  ❌ [FALHA] ${seed.slug}: ${err.message}`);
      }
    }));
    
    console.log(`Lote finalizado. Resfriando motores (5 segundos)...`);
    await new Promise(r => setTimeout(r, 5000));
  }
}

if (require.main === module) {
  runPhaseC().catch(console.error);
}
