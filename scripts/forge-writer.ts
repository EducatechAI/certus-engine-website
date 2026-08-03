import fs from 'fs';
import path from 'path';
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
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY; // Usado para o Web RAG (Ambassador Network)
const BATCH_SIZE = 5; // Evitar rate limits

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const DOSSIERS_DIR = path.join(__dirname, '..', '..', 'Docs', 'Certus_SDK_Internal', 'dossiês');

// Dossiês Top 8 (Alta Densidade)
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

const SEMANTIC_TRIPARTITION_RULE = `
[CRITICAL RULE: STRUCTURAL CLARITY]
When generating the article, you MUST clearly distinguish between three layers:
1. EXTERNAL FACTS: Laws, regulations, and public standards (e.g., "Art. 9 of Ley 25.326 states...").
2. PRODUCT CAPABILITIES: What the Certus Engine modules objectively do (e.g., "The Kangal module monitors...").
3. SIMULATED SCENARIOS: Hypothetical examples, metrics, or benchmarks (e.g., "In a simulated breach of 50GB/day...").
NEVER blur the lines. Do not present a simulated metric as a legal requirement, and do not present a product feature as an external law.
`;

const LEGAL_FACT_GUARD = `
[CRITICAL RULE: ZERO LEGAL HALLUCINATION]
1. NEVER invent, modify, or paraphrase the text of a law, article, decree, or its official acronym. Use ONLY official names (e.g., "Lei 18.430/2021", "LGPD", "Decreto 10.332/2020").
2. If the provided legal text (from RAG) does NOT explicitly mention a technical requirement (e.g., 'hash', 'ZK-Proof', 'signed log'), DO NOT attribute that requirement to the law.
3. INSTEAD, frame it as a REGULATORY GAP: "While Law X focuses on [real topic], it remains silent on cryptographic proofs. The Certus Engine fills this gap proactively by..."
4. NEVER invent article numbers. If unsure, refer to the law generally.
5. [EXPLICIT BAN]: The acronym "CSPI" is a known hallucination artifact and is STRICTLY FORBIDDEN. NEVER use it in any context. If the RAG or prompt mentions it, ignore it entirely and default to the correct legal framework (e.g., Marco Civil, LGPD, Decreto de Governança Digital).
${SEMANTIC_TRIPARTITION_RULE}
`;

const SEMANTIC_CONTRACT = `
[CRITICAL RULE: ONTOLOGICAL RIGIDITY - ZERO SEMANTIC DRIFT]
You are generating content for the Certus Engine. Each module has a STRICT, IMMUTABLE identity. You MUST adhere to these definitions. NEVER cross the boundaries.

1. CERTUS.MOD.LAZARUS
   - ALWAYS describe as: Forensic evidence, immutable audit, digital signatures, chain of custody, non-repudiation.
   - NEVER describe as: Firewall, antivirus, WAF, tokenization, or real-time blocking.

2. CERTUS.MOD.KANGAL
   - ALWAYS describe as: Regulatory compliance, network filtering, blocking C2 servers/exfiltration, LGPD enforcement.
   - NEVER describe as: Evidence storage, cryptographic signing, or telemetry.

3. CERTUS.MOD.PII-ZERO
   - ALWAYS describe as: Data masking, tokenization, privacy preservation, PII sanitization at the edge.
   - NEVER describe as: Network routing, log storage, or consensus validation.

4. CERTUS.MOD.WOLFDOG
   - ALWAYS describe as: PII detection, behavioral tracking, ransomware hunting, 847 regex patterns, BERTimbau, CNN.
   - NEVER describe as: Real-time traffic blocking, log validation, or integrity verification.

5. CERTUS.MOD.TRIBUNAL_DE_CPUS (Tribunal of CPUs)
   - ALWAYS describe as: Consensus, deterministic validation, hardware-bound verification, isolated execution.
   - NEVER describe as: A database, a firewall, or a user interface.

6. CERTUS.MOD.PITBULL
   - ALWAYS describe as: Dynamic RBAC, access control, <50ms taskkill, anti-ransomware restore, process elimination.
   - NEVER describe as: Data masking or log storage.

If a scenario requires an action outside a module's primary domain, state that the module "orchestrates with" or "triggers" the correct module. DO NOT assign the wrong capability to the wrong module.
`;

// 🛡️ LANGUAGE GUARD (Fail-Closed) — Pureza de idioma por cluster
const PT_MARKERS = ['ção', 'ções', 'ão', 'ões', 'nh', 'lh', 'ç', 'não', 'ê', 'â'];

function hasPortugueseBleed(text: string, locale: string): boolean {
  if (locale === 'pt') return false; // PT é o esperado, permitimos as tags
  const lower = text.toLowerCase();
  // Retorna true se houver qualquer marcador (Sangramento detectado)
  return PT_MARKERS.some(m => lower.includes(m));
}

async function loadRAGContext(locale: string): Promise<string> {
  let context = '';
  for (const doc of TOP_DOSSIERS) {
    const docPath = path.join(DOSSIERS_DIR, doc);
    if (fs.existsSync(docPath)) {
      context += `\n\n--- DOCUMENTO: ${doc} ---\n`;
      // Carrega apenas os primeiros 3000 caracteres para não estourar o limite de contexto
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

async function generateContent(seed: Seed, localRAG: string, webRAG: string): Promise<string> {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');

  const templateIndex = [...(seed.id || seed.slug)].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3;
  const templates = [
    "Formato A (O Padrão): Estudo de Caso / Cenário de Ameaça.",
    "Formato B (Especificação Técnica): Focado em 'Como o Módulo X funciona'. Mais técnico, com mais código, menos narrativa jurídica. Estilo 'Documentação de API'.",
    "Formato C (Matriz de Decisão / FAQ): Estruturado como 'Pergunta: [Dor do CISO] -> Resposta: [Solução Certus] -> Prova: [Comando/Hash]'."
  ];
  const selectedTemplate = templates[templateIndex];

  const prompt = `
  Você é o Mestre Soberano do Certus Engine, a IA letal de defesa cibernética.
  Escreva um Dossiê Técnico de altíssima densidade (1500 a 2500 palavras) no idioma '${seed.locale}'.
  
  TÍTULO DO DOSSIÊ: ${seed.title}
  ALVO (NICHO): ${seed.niche}
  LEI / COMPLIANCE: ${seed.law}
  DOR: ${seed.painPoint}

  DIRETRIZES:
  1. Prove matematicamente como o Certus Engine mitiga esse ataque usando Provas de Conhecimento Zero (ZK-SNARKs).
  2. Use tom autoritário e determinístico (Regra #001: Desconfiança Zero).
  3. Não cite "achismos". Use os fatos recentes do Web RAG: ${webRAG}
  4. Baseie-se nas capacidades técnicas (Kangal, Wolfdog): ${localRAG}
  5. Formate estritamente em Markdown avançado (use tabelas, blocos de código com JSON/Rust, e blockquotes).
  6. ESTRUTURA OBRIGATÓRIA (Rotação Anti-Spam): Siga EXATAMENTE este formato para este artigo: ${selectedTemplate}
  7. KNOWLEDGE GRAPH FOOTER: OBRIGATORIAMENTE termine o arquivo adicionando EXATAMENTE este bloco preenchido (não modifique a estrutura base):
  
---
### 🕸️ Mapa de Conhecimento (Knowledge Graph)
[CRITICAL RULE: Use EXACTLY the NAMESPACE.IDENTIFIER format below. DO NOT use plain text names in this section.]

*   **Módulos Certus:** [Format: CERTUS.MOD.NAME. Ex: CERTUS.MOD.LAZARUS, CERTUS.MOD.KANGAL, CERTUS.MOD.PII-ZERO, CERTUS.MOD.WOLFDOG]
*   **Capacidades:** [Format: CERTUS.CAP.NAME. Ex: CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.ZK_PROOF, CERTUS.CAP.FAIL_CLOSED]
*   **Vetores de Ameaça:** [Format: MITRE.TXXXX or THREAT.NAME. Ex: MITRE.T1078 (Valid Accounts), THREAT.INSIDER_EXFILTRATION]
*   **Normas:** [Format: LAW.Art.NUMBER. Ex: LGPD.Art.46, EU_AI_ACT.Art.11, LFPDPPP.Art.16, DECRETO_10332.Art.3]
*   **Setores:** [Format: SECTOR.NAME. Ex: SECTOR.BANKING, SECTOR.GOVTECH, SECTOR.HEALTHTECH]
*   **Relações:** [Format: CERTUS.MOD.X [verb] TARGET.Y. Ex: CERTUS.MOD.KANGAL detects THREAT.INSIDER | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT]

  ${LEGAL_FACT_GUARD}
  ${SEMANTIC_CONTRACT}
  `;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "anthropic/claude-3.5-sonnet", // Modelo recomendado para alta densidade
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}

async function runPhaseC() {
  if (!fs.existsSync(SEEDS_FILE)) {
    console.error('ERRO: seeds.json não encontrado.');
    return;
  }

  const seeds: Seed[] = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));
  let pendingSeeds = seeds.filter(s => !s.contentMarkdown);
  
  // [Fase 14C] Protocolo de Prioridade Tática 2026 (Opção B)
  const priorityKeywords = ['2026', 'AI Act', 'ANPD', 'Marco Civil', '27001', '37001', '21.719'];
  const prioritySeeds = pendingSeeds.filter(s => 
    priorityKeywords.some(kw => s.law.includes(kw) || s.painPoint.includes(kw))
  );
  const legacySeeds = pendingSeeds.filter(s => 
    !priorityKeywords.some(kw => s.law.includes(kw) || s.painPoint.includes(kw))
  );
  
  // As sementes prioritárias assumem a vanguarda. O legado fica como reserva.
  pendingSeeds = [...prioritySeeds, ...legacySeeds];
  
  console.log(`[Fase C] Iniciando Forja APEX. Restam: ${pendingSeeds.length} / ${seeds.length} dossiês.`);

  const localRAG = await loadRAGContext('pt'); // Carga inicial
  
  // Processamento em Bote (Batch) para proteger a API
  for (let i = 0; i < pendingSeeds.length; i += BATCH_SIZE) {
    const batch = pendingSeeds.slice(i, i + BATCH_SIZE);
    console.log(`Processando Lote ${Math.floor(i/BATCH_SIZE) + 1}...`);
    
    await Promise.all(batch.map(async (seed) => {
      try {
        console.log(`  -> Pesquisando Web (RAG) para: ${seed.slug}`);
        const webRAG = await performWebRAG(seed.niche, seed.law, seed.painPoint);
        
        console.log(`  -> Forjando Texto (Claude-3.5-Sonnet) para: ${seed.slug}`);
        const markdown = await generateContent(seed, localRAG, webRAG);
        
        // 🛡️ LANGUAGE GUARD INTERCEPTOR
        if (hasPortugueseBleed(markdown, seed.locale)) {
          throw new Error('LANGUAGE GUARD BLOCKED: Bleed-over de Português detectado na geração. Dossiê rejeitado e mantido pendente para regeneração.');
        }
        
        // --- NORMALIZAÇÃO CANONICAL (Fase 14) ---
        const { content: safeMarkdown, prependedCanonical } = normalizeHeaders(
          markdown,
          seed.locale as Lang,
          seed.assunto as Assunto,
          seed.slug,
        );
        if (prependedCanonical) {
          console.warn(`[forge-writer] canonical ausente no output do LLM — injetado para ${seed.slug}`);
        }

        // Atualiza a semente na memória e salva no disco imediatamente (Resume capability)
        const seedIndex = seeds.findIndex(s => s.id === seed.id);
        seeds[seedIndex].contentMarkdown = safeMarkdown;
        fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
        
        console.log(`  ✅ [SUCESSO] Dossiê blindado: ${seed.slug}`);
      } catch (err: any) {
        console.error(`  ❌ [FALHA] ${seed.slug}: ${err.message}`);
      }
    }));
    
    // Pequeno cooldown entre lotes para evitar Rate Limit 429
    console.log(`Lote finalizado. Resfriando motores (5 segundos)...`);
    await new Promise(r => setTimeout(r, 5000));
  }
}

// Verifica se está rodando diretamente (permitindo execução via CLI)
if (require.main === module) {
  runPhaseC().catch(console.error);
}
