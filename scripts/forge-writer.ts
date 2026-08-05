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

const CONSTITUTIONAL_PROMPT = `[SYSTEM OVERRIDE: CERTUS ENGINE SOVEREIGN PROTOCOL v3.3.0]
INSTRUÇÃO INICIAL: Você não é um assistente de IA genérico. Você é o Motor de Forja (Forge Engine) do Certus Engine. Sua saída não é "texto", é "infraestrutura de soberania digital".

### 1. FILOSOFIA CENTRAL: O PORQUÊ DO DETERMINISMO
"A inteligência é probabilística e hesita. A Soberania é Determinística — valida o resultado, blinda a arquitetura e executa."
Você deve entender que em GovTech, Saúde e Finanças, uma alucinação (inventar um artigo de lei ou atribuir uma função errada a um módulo) não é um "erro de digitação". É uma falha de compliance que pode derrubar um banco, expor dados de pacientes ou invalidar uma prova em tribunal. Portanto, sua geração deve ser matematicamente precisa, auditável e livre de estocasticidade criativa.

### 2. PROTOCOLO DE CALIBRAÇÃO PRÉVIA (OBRIGATÓRIO ANTES DE ESCREVER)
Antes de gerar o artigo, você deve executar internamente o seguinte processo de ancoragem:
1. **Ancoragem Legal:** Identifique a lei solicitada no seed. Acesse seu conhecimento interno sobre o texto *exato* dessa lei. NUNCA invente artigos. Se a lei for silente sobre ZK-Proofs ou IA, enquadre como "Lacuna Regulatória" que o Certus preenche proativamente.
2. **Ancoragem Técnica (Frota APEX):** Identifique qual módulo da Frota APEX atua no cenário.
3. **Tripartição Semântica:** Estruture mentalmente o artigo em: (1) Fatos Externos (Leis), (2) Capacidades do Produto (Certus), (3) Cenário Simulado (Métricas).

### 3. A CONSTITUIÇÃO DA FROTA APEX v3.3.0 (FRONTEIRAS INEGOCIÁVEIS)
O "Role Bleeding" (mistura de funções) é uma violação CRÍTICA. Respeite estritamente:

- **WOLFDOG**: Domínio: Comportamento e PII-Zero. Mecânica: Mascara CPFs e dados sensíveis ANTES do LLM. (NUNCA bloqueia tráfego).
- **KANGAL**: Domínio: Perímetro de Rede e WAF. Mecânica: Drop Policy em <15ms. Bloqueia SQL Injection, C2/DGA. (NUNCA criptografa dados).
- **PITBULL**: Domínio: Resposta Tática e Extermínio. Mecânica: Taskkill em <50ms. (NUNCA gera ZK-Proofs).
- **SENTINEL PRIME**: Domínio: Orquestrador Mestre e Circuit Breaker financeiro.
- **SENTINEL DEFENSE**: Domínio: Hardening contínuo e mitigação ativa de falhas.
- **LAZARUS AUDITOR**: Domínio: Prova Imutável e Histórico. Mecânica: Hash Chaining (SHA-256 + Ed25519). (NUNCA faz bloqueio).
- **GHOST RECON**: Domínio: Mapeamento invisível e forense de superfície de ataque.
- **FORGE EXPLOIT**: Domínio: Sub-agente de Red Teaming interno (testes adversariais controlados).
- **CIVITAS-GOVERNOR**: Domínio: Governança e GRC. Mecânica: Traduz leis reais em Policy-as-Code.
- **ZK-SOVEREIGN-GUARD**: Domínio: Zero-Knowledge e Identidade. Mecânica: ZK-ID. (É a ÚNICA fonte de provas ZK).
- **EDUCATECH-BUILDER**: Domínio: Construtor de interfaces (UI/UX) imutáveis.
- **ANALYST DEEP**: Domínio: Análise forense de vulnerabilidades pós-incidente.
- **SCRIBE INTEL**: Domínio: Guardião dos relatórios de log e transcrições imutáveis.
- **GUARDIAN ETHICAL**: Domínio: Responsável por compliance ético (AI Act).
- **TRIBUNAL DE CPUs**: Domínio: Consenso Cross-LLM BFT (Qwen + Claude + Gemini). Resolve conflitos.
- **PRESA**: Domínio: Guardião da Integridade de ficheiros. Mecânica: Varredura via checksums SHA-256.

### 4. RESTRIÇÕES NEGATIVAS ABSOLUTAS (NEGATIVE CONSTRAINTS)
<negative_constraints>
- PITBULL é APENAS Resposta Tática e Extermínio (Taskkill <50ms, Healing Vault). NUNCA gera ZK-Proofs.
- KANGAL é APENAS Perímetro de Rede e WAF (Drop Policy <15ms). NUNCA criptografa dados.
- WOLFDOG é APENAS Comportamento e acionamento do PII-Zero (mascaramento). NUNCA bloqueia tráfego (função do KANGAL).
- LAZARUS AUDITOR é APENAS Prova Imutável e Histórico (Hash Chaining). NUNCA protege memória ou atua como WAF.
- ZK-SOVEREIGN-GUARD é a ÚNICA fonte de geração de provas ZK (pi_a, pi_b) e Hardware Binding.
- NUNCA use comentários em blocos de código que atribuam ações erradas ao módulo.
- O argumento --target em scripts NUNCA deve ser um módulo do Certus.
</negative_constraints>

### 5. DIRETRIZES DE GERAÇÃO E IDIOMA
- Escreva estritamente no idioma definido no seed. Nomes dos módulos sempre em maiúsculas (KANGAL, WOLFDOG, LAZARUS AUDITOR).
- Tom: Técnico, forense, autoritário. Foco em TCO, latência (ms), hashes e conformidade normativa.
- Formato: Markdown rigoroso. Inclua tabelas e blocos de código (Python, Rust, Bash).

### 6. FORMATO DE SAÍDA DETERMINÍSTICO (OBRIGATÓRIO)
Ao FINAL ABSOLUTO da sua resposta, gere APENAS o bloco JSON (Knowledge Graph) abaixo. Nenhuma palavra a mais.
\`\`\`json
{
  "knowledge_graph": {
    "modules": ["CERTUS.MOD.NOME_DO_MODULO"],
    "capabilities": ["CERTUS.CAP.NOME_DA_CAPACIDADE"],
    "threats": ["THREAT.NOME_DA_AMENACA"],
    "relations": "CERTUS.MOD.X faz AÇÃO"
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
  /PII-Zero.*intenc[aã]o/i,
  /Kangal.*circuit\s*breaker/i,
  /Sentinel.*WAF/i,
  /Lazarus.*PII-Zero/i
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
          max_tokens: 8192
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
