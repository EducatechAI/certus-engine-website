import fs from 'fs';
import path from 'path';
import { normalizeHeaders, type Lang, type Assunto } from '../src/lib/canonical';
import { validateArticleContent } from './forge-writer';

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

// Parser tolerante (Fail-Closed)
function extrairSaidaForge(raw: string): any {
  const tentativas = [
    () => JSON.parse(raw),
    () => JSON.parse(raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? ""),
    () => JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1)),
  ];
  for (const t of tentativas) {
    try {
      const o = t();
      if (o && typeof o === "object" && o.url && o.score_unicidade != null
          && ["VIVO","QUARENTENA"].includes(o.status)) {
        return o; 
      }
    } catch { /* tenta o próximo */ }
  }
  return null; 
}

// Similaridade Jaccard (Anti Near-Duplicate)
function similaridade(a: string, b: string): number {
  if (!a || !b) return 0;
  const sh = (t: string) => new Set(
    t.toLowerCase().split(/\W+/).filter(Boolean)
     .map((_, i, arr) => arr.slice(i, i + 5).join(" "))
     .filter(w => w.split(" ").length === 5));
  const A = sh(a), B = sh(b);
  const inter = [...A].filter(x => B.has(x)).length;
  return inter / (A.size + B.size - inter || 1);
}

export async function loadRAGContext(): Promise<string> {
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

export async function generateContent(seed: any, localRAG: string, webRAG: string, ultimaDoMesmoSetorLei: string = "", esqueletoAnterior: string = "", limitS3Exceeded: boolean = false): Promise<{model: string, content: string, rawOutput: any}> {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');

  const currentYear = new Date().getFullYear();
  const isMock = process.env.MOCK_MODE === 'true';
  
  // Dicionário Tático de Localização (Para evitar Language Bleed)
  const dict = {
    pt: { rule: "Regra #001 do Certus Engine", target: "Alvo Tático", compliance: "Compliance", mitigation: "Mitigação Focada" },
    en: { rule: "Rule #001 of Certus Engine", target: "Tactical Target", compliance: "Compliance", mitigation: "Focused Mitigation" },
    es: { rule: "Regla #001 del Certus Engine", target: "Objetivo Táctico", compliance: "Cumplimiento", mitigation: "Mitigación Enfocada" }
  };
  
  // 🛡️ [OE-14] Dicionário de Rótulos por Idioma
  const labels = {
    pt: {
      real: "🟢 CASO REAL AUTORIZADO",
      scenario: "🟡 CENÁRIO SIMULADO / THREAT MODEL",
      normative: "🔵 REFERÊNCIA NORMATIVA"
    },
    es: {
      real: "🟢 CASO REAL AUTORIZADO",
      scenario: "🟡 ESCENARIO SIMULADO / THREAT MODEL",
      normative: "🔵 REFERENCIA NORMATIVA"
    },
    en: {
      real: "🟢 AUTHORIZED REAL CASE",
      scenario: "🟡 SIMULATED SCENARIO / THREAT MODEL",
      normative: "🔵 NORMATIVE REFERENCE"
    }
  };

  const locale = (seed.locale as 'pt' | 'en' | 'es') || 'pt';
  const loc = dict[locale];
  const locLabels = labels[locale];

  let rulesForLabels = "";
  if (isMock) {
    rulesForLabels = "ATENÇÃO: MOCK_MODE está ativo. O rótulo DEVE ser APENAS 🟡 ou 🔵 (NUNCA 🟢).";
  } else {
    if (seed.autorizacaoEscrita) {
      rulesForLabels = "Este caso POSSUI autorização escrita confirmada. O rótulo 🟢 PODE ser utilizado se for um caso real da nossa empresa.";
    } else {
      rulesForLabels = "ATENÇÃO: Este caso NÃO possui autorização escrita. O rótulo DEVE ser APENAS 🟡 ou 🔵 (NUNCA 🟢).";
    }
  }

  const prompt = `
# ============================================================
# FORJA SOBERANA v2 — PROMPT MATRIZ DE GERAÇÃO (ANTI-SPAM)
# Motor: OMNI MATRIX V3 | Regime: DETERMINÍSTICO | Fail-Closed
# ============================================================

Você é o MÓDULO DE GERAÇÃO da Forja do Certus Engine (Educatech AI).
Sua missão: produzir páginas de autoridade técnica trilíngues (PT/ES/EN)
que sejam INDEXÁVEIS pelo Google e CITÁVEIS por LLMs, sem jamais
disparar os filtros de "scaled content abuse" ou "thin/duplicate content".

ALVO (NICHO): ${seed.niche}
LEI / COMPLIANCE: ${seed.law}
DOR (VETOR): ${seed.painPoint}
GANCHO OBRIGATÓRIO (H1): ${seed.title}
IDIOMA: '${seed.locale}'
ANO: ${currentYear}

## LEI ZERO (inviolável)
Nenhuma página é publicada se violar qualquer regra abaixo.
Em caso de dúvida → QUARENTENA CRIPTOGRÁFICA (não publica).

## REGRA 1 — PROIBIÇÃO DE TEMPLATE NO TÍTULO/H1
- É PROIBIDO exibir "Case Study N", "Estudo de Caso N" ou numeração sequencial no H1, no <title> ou no meta description visível.
- O H1 (Título) já foi fornecido acima no campo GANCHO OBRIGATÓRIO (H1). Use-o EXATAMENTE como fornecido.

## REGRA 3 — VARIAÇÃO DE CORPO (esqueleto E5, rotação obrigatória)
Força a rotação de esqueletos (S1-S6) em cada lote. 
ATENÇÃO: É ESTABELECIDO QUE O ESQUELETO ANTERIOR FOI O [ ${esqueletoAnterior || 'nenhum'} ]. PORTANTO, É ESTRITAMENTE PROIBIDO USAR O ESQUELETO [ ${esqueletoAnterior || 'nenhum'} ] NESTE ARTIGO. SE VOCÊ O UTILIZAR, SEU TEXTO SERÁ REJEITADO PELO QUALITY GATE. ESCOLHA OBRIGATORIAMENTE QUALQUER UM DOS OUTROS DISPONÍVEIS.
Máximo 30% dos artigos podem usar esqueleto S3. Priorize ativamente S1, S2, S4, S5, S6 para garantir diversidade.
Rotacione aleatoriamente escolhendo UM dos 6 esqueletos abaixo para o corpo do texto:
  S1 Anatomia do Ataque (passo a passo + ponto de interceptação)
  S2 Checklist de Conformidade (cláusula-por-cláusula, mapeado)
  S3 Cenário "E se" / Threat Model (timeline de incidente SIMULADO)
  S4 Comparativo antes/depois (tabela: sem vs. com governança)
  S5 Forense / Prova (qual log/hash provaria o fato em tribunal)
  S6 Custo da Inação (multa + downtime + TCO de remediação)

## REGRA 4 — DENSIDADE ÚNICA (anti near-duplicate)
Cada página DEVE conter, no mínimo, 3 elementos VERIFICÁVEIS e ÚNICOS:
  (a) ≥1 trecho REAL de lei/norma com link oficial (planalto.gov.br / eur-lex / ABNT / ISO público / bacen),
  (b) ≥1 dado técnico específico (cláusula, artigo, porta, CVSS, latência, extensão de ransomware, padrão de DGA, etc.),
  (c) ≥1 elemento do ecossistema Certus aplicado ao caso concreto (Wolfdog/Kangal/Pitbull/Presa/LAZARUS/PII-Zero/Tribunal de CPUs).

## REGRA 4.5 — ANTI-JACCARD (VARIAÇÃO OBRIGATÓRIA)
Quando setor+lei são idênticos, o corpo DEVE usar vocabulário técnico diferente (sinônimos, ângulos de análise diferentes). Ex: um artigo foca em multa, outro em downtime, outro em TCO, outro em reputação. NÃO repetir a mesma estrutura de mitigação com palavras diferentes.

## REGRA 5 — E-E-A-T + SCHEMA (INSERIR NO TOPO DO ARTIGO)
Você deve gerar o código HTML do JSON-LD schema.org/Article com: headline (= H1 variado), author (Paulino Gerlack / Educatech AI Digital Sovereign Ltda), datePublished, dateModified, publisher, e "about" com a lei/norma citada.
Você deve gerar a tag <link rel="canonical" href="https://certusengine.ia.br/article/${seed.slug}" />
Você deve gerar as tags Open Graph + Twitter Card.
ATENÇÃO CRÍTICA: TODAS ESSAS TAGS HTML DEVEM SER INSERIDAS OBRIGATORIAMENTE NO EXATO INÍCIO DO ARTIGO (NO TOPO), ANTES MESMO DO TÍTULO (H1) OU DO RÓTULO DE INTEGRIDADE. NUNCA NO FINAL.

## REGRA 6 — INTEGRIDADE / ROTULAGEM (anti-claim fraudulento)
Todo exemplo de incidente DEVE ser rotulado no topo do bloco:
  ${locLabels.real} | ${locLabels.scenario} | ${locLabels.normative}
É PROIBIDO inventar hashes/logs que pareçam reais sem marcar como ilustrativos. Determinismo = não mentir com dados.
${rulesForLabels}

## REGRA 7 — FORMATAÇÃO OBRIGATÓRIA (MARKDOWN & RENDERING)
// 🛡️ [OE-12] REGRAS NEGATIVAS PARA BLOCOS DE CÓDIGO
// É ESTRITAMENTE PROIBIDO gerar blocos de código com crases vazias (\`\`\`). 
// Se você gerar um bloco sem a linguagem especificada (ex: \`\`\`bash), 
// o sistema descartará sua resposta e você receberá penalidade de pontuação.
// SEMPRE use \`\`\`bash, \`\`\`powershell ou \`\`\`python.
// REGRA DE OURO: Qualquer bloco de código, mesmo que seja de 1 linha, 
// DEVE começar com a tag da linguagem.
2. Todas as tabelas devem seguir estritamente a sintaxe Markdown com a linha separadora de cabeçalho. Exemplo obrigatório:
| Coluna 1 | Coluna 2 |
|---|---|
| Dado A | Dado B |
3. Conclua sempre o artigo com uma frase de fechamento completa e pontuada. Não corte o texto no meio de uma palavra ou frase.


## REGRA 8 — SCORE DE UNICIDADE
Calcule o Score de Unicidade:
  Score = (unicidade de gancho 0..30) + (unicidade de corpo 0..30) + (densidade verificável 0..20) + (schema completo 0..10) + (rotulagem de integridade 0..10). Máx = 100.
  Se Score < 85, defina status = "QUARENTENA". Se >= 85, defina status = "VIVO".

## CONTEXTO RAG
Web RAG: ${webRAG}
Local RAG: ${localRAG}

## SAÍDA OBRIGATÓRIA (FORMATO JSON ESTRITO)
Você DEVE retornar APENAS UM OBJETO JSON VÁLIDO. Não adicione texto antes ou depois do JSON. O objeto JSON deve seguir EXATAMENTE esta estrutura:

{
  "url": "https://certusengine.ia.br/article/${seed.slug}",
  "idioma": "${seed.locale}",
  "gancho_usado": "INFORME O H1 AQUI",
  "esqueleto_usado": "S1..S6",
  "eixos": {
    "setor": "${seed.niche}",
    "lei": "${seed.law}",
    "vetor": "${seed.painPoint}"
  },
  "score_unicidade": 95,
  "rotulo_integridade": "🟡 CENÁRIO SIMULADO / THREAT MODEL",
  "json_ld": "<script type=\\"application/ld+json\\">...</script>",
  "canonical": "<link rel=\\"canonical\\" href=\\"...\\" />",
  "status": "VIVO",
  "motivo_se_quarentena": "",
  "contentMarkdown": "TEXTO COMPLETO DO ARTIGO EM MARKDOWN (INCLUINDO AS TAGS HTML SCHEMA/CANONICAL NO TOPO). ATENÇÃO CRÍTICA: COMO ISSO É UM VALOR JSON, VOCÊ DEVE ESCAPAR OBRIGATORIAMENTE TODAS AS ASPAS DUPLAS COM \\\". PARA QUEBRAS DE LINHA (COMO EM TABELAS E PARÁGRAFOS), VOCÊ DEVE USAR O CARACTERE \\n. NUNCA PULE LINHAS FISICAMENTE NO MEIO DA STRING (NÃO APERTE ENTER), MAS USE \\n ABUNDANTEMENTE PARA PRESERVAR A FORMATAÇÃO DO MARKDOWN. O TEXTO DEVE TER ENTRE 2500 E 4000 CARACTERES. USE TOM AUTORITÁRIO (${loc.rule}). NUNCA USE TB/s, APENAS GB/s OU TB/dia. LATÊNCIA EM MILISSEGUNDOS."
}
  `;

  const MODELS_ROULETTE = [
    "qwen/qwen3.7-plus",
    "qwen/qwen3.7-flash"
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
          messages: [{ role: "user", content: prompt }],
          max_tokens: 8192
        }),
        signal: AbortSignal.timeout(600000) // 🛡️ TIMEOUT SOBERANO: 10m máximo por LLM
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error.message);
      
      const rawContent = data.choices[0].message.content;
      const parsedOutput = extrairSaidaForge(rawContent);

      if (!parsedOutput) {
         throw new Error(`Quality Gate Reprovado: Falha no Parse JSON (Fail-Closed). O modelo não retornou o JSON estruturado válido.`);
      }

      if (parsedOutput.status === 'QUARENTENA' || (parsedOutput.score_unicidade && parsedOutput.score_unicidade < 85)) {
         throw new Error(`Quality Gate Reprovado: Score de Unicidade < 85 ou status QUARENTENA. Score: ${parsedOutput.score_unicidade}. Motivo: ${parsedOutput.motivo_se_quarentena}`);
      }

      const content = parsedOutput.contentMarkdown || "";
      if (content.length < 2000) {
        throw new Error(`Quality Gate Reprovado: Texto gerado muito curto (${content.length} caracteres). O ponto de corte é de 2000 caracteres, recomendado entre 2500 e 4000.`);
      }
      
      let finalContent = content;
      const lastChar = finalContent.trim().slice(-1);
      if (!['.', '!', '?', '}'].includes(lastChar)) {
        console.log(`  -> ⚠️ Truncamento detectado no último caractere '${lastChar}'. Acionando Completion Prompt...`);
        const compResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "user", content: prompt },
              { role: "assistant", content: rawContent },
              { role: "user", content: "O texto foi truncado. Continue EXATAMENTE de onde parou e complete a string 'contentMarkdown'. Não repita o JSON inteiro, apenas gere a continuação do texto Markdown." }
            ],
            max_tokens: 8192
          }),
          signal: AbortSignal.timeout(600000)
        });
        const compData = await compResponse.json();
        if (compData.error) throw new Error(compData.error.message);
        
        let compText = compData.choices[0].message.content;
        compText = compText.replace(/```(json|markdown)?/gi, '').trim();
        if(compText.startsWith('"')) compText = compText.substring(1);
        if(compText.endsWith('"')) compText = compText.slice(0, -1);
        if(compText.endsWith('}')) compText = compText.slice(0, -1);
        if(compText.endsWith('"')) compText = compText.slice(0, -1);
        
        finalContent += compText;
      }

      if (ultimaDoMesmoSetorLei && similaridade(content, ultimaDoMesmoSetorLei) >= 0.30) {
        throw new Error(`Quality Gate Reprovado: Similaridade >= 30% com artigo anterior do mesmo setor/lei (Template Detection / Anti Near-Duplicate).`);
      }
      
      const esqueletoRaw = parsedOutput.esqueleto_usado || "";
      const matches = esqueletoRaw.match(/S[1-6]/g);
      const esqueletoNormalizado = matches && matches.length > 0 ? matches[0] : "S3";
      parsedOutput.esqueleto_usado = esqueletoNormalizado;

      if (esqueletoAnterior && esqueletoNormalizado === esqueletoAnterior) {
        throw new Error(`Quality Gate Reprovado: Esqueleto ${esqueletoNormalizado} repetido do artigo anterior.`);
      }

      if (esqueletoNormalizado === 'S3' && limitS3Exceeded) {
        throw new Error("Quality Gate Reprovado: Limite S3 atingido (30%) no banco de dados.");
      }

      const validation = validateArticleContent(finalContent, seed.id?.toString());
      if (!validation.isValid) {
        throw new Error(`Quality Gate Reprovado (Gatekeeper v2.2): ${validation.reason || (validation.violation ? validation.violation.id : "Falha na estrutura (Markdown truncado ou falta de banner)")}`);
      }

      console.log(`  -> [SUCESSO] Texto forjado pelo modelo: ${model} (${finalContent.length} chars, Score: ${parsedOutput.score_unicidade}, Jaccard < 30%)`);
      return { model, content: finalContent, rawOutput: parsedOutput };

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
  
  // 🧹 [JANITOR] Expurgo Automático de Conteúdo Defeituoso (< 2000 chars)
  let purgedCount = 0;
  seeds.forEach((s: any) => {
    if (s.contentMarkdown && s.contentMarkdown.length < 2000) {
      console.warn(`[Janitor] Expurgo ativado: Semente ${s.slug} possui apenas ${s.contentMarkdown.length} caracteres. Conteúdo deletado para reforja.`);
      delete s.contentMarkdown;
      delete s.forgeMeta;
      purgedCount++;
    }
  });
  if (purgedCount > 0) {
    fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
  }

  // Protocolo Berserker: Captura até 3 sementes maduras atrasadas (agora inclui as recém-expurgadas)

  const targetSeeds = seeds.filter((s: any) => !s.contentMarkdown && new Date(s.releaseDate).getTime() <= now).slice(0, 3);
  
  if (targetSeeds.length === 0) {
    console.log('[APEX Cron] Nenhuma semente madura pendente. Hibernando.');
    return;
  }
  
  console.log(`[APEX Cron] PROTOCOLO BERSERKER: ${targetSeeds.length} sementes atrasadas. Iniciando caça tática...`);
  
  for (let i = 0; i < targetSeeds.length; i++) {
    const targetSeed = targetSeeds[i];
    console.log(`\n--- [Alvo ${i + 1}/${targetSeeds.length}] ${targetSeed.slug} ---`);
    
    try {
      const localRAG = await loadRAGContext();
      const webRAG = await performWebRAG(targetSeed.niche, targetSeed.law, targetSeed.painPoint);
      
      let ultimaDoMesmoSetorLei = "";
      // Busca o último forjado do mesmo nicho e lei para Jaccard similarity test
      const lastForged = seeds.slice().reverse().find((s: any) => s.contentMarkdown && s.niche === targetSeed.niche && s.law === targetSeed.law);
      if (lastForged) {
        ultimaDoMesmoSetorLei = lastForged.contentMarkdown;
      }

      // Verifica contagem de S3 para o limite de 30% em produção
      const approvedSeeds = seeds.filter((s: any) => s.contentMarkdown);
      const prevEsqueleto = approvedSeeds.length > 0 ? approvedSeeds[approvedSeeds.length - 1].forgeMeta?.esqueleto_usado : "";
      const countS3 = approvedSeeds.filter((s: any) => s.forgeMeta?.esqueleto_usado === 'S3').length;
      const limitS3Exceeded = countS3 >= Math.ceil(seeds.length * 0.3);

      // Roda a Forja
      const result = await generateContent(targetSeed, localRAG, webRAG, ultimaDoMesmoSetorLei, prevEsqueleto, limitS3Exceeded);

      // Atualiza na memória
      const seedIndex = seeds.findIndex((s: any) => s.id === targetSeed.id);
      
      // 🛡️ [OE-17] MARTELO DETERMINÍSTICO: LIMPEZA POR DESTRUIÇÃO GLOBAL
      let textoLimpo = result.content;

      // 1. ANIQUILAR qualquer tag HTML de metadados (aberta ou fechada, mesmo malformada)
      textoLimpo = textoLimpo.replace(/<\s*(meta|link|script|style)\b[^>]*>/gi, '');
      textoLimpo = textoLimpo.replace(/<\/\s*(script|style)\s*>/gi, ''); // Pega </script> órfão

      // 2. ANIQUILAR qualquer bloco JSON-LD solto no corpo do texto (mesmo sem tag <script>)
      // O Qwen injeta JSON sem tags HTML e com quebras de linha escapadas literais (\n). Usamos lookahead para fechar a captura com segurança.
      textoLimpo = textoLimpo.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi, '');

      // 3. ANIQUILAR TODAS as ocorrências dos rótulos em QUALQUER lugar do texto (Global, não só início de linha)
      // Isso elimina duplicatas, variações com espaços estranhos ou quebras de linha
      // Removemos o '.*' para impedir que devore o artigo inteiro caso a LLM retorne tudo na mesma linha com '\n' literais.
      textoLimpo = textoLimpo.replace(/🟡\s*[a-zA-ZÁ-ú \/_-]+(?:\s*(?:\\n|\n))*/gi, '');
      textoLimpo = textoLimpo.replace(/🔵\s*[a-zA-ZÁ-ú \/_-]+(?:\s*(?:\\n|\n))*/gi, '');
      textoLimpo = textoLimpo.replace(/🟢\s*[a-zA-ZÁ-ú \/_-]+(?:\s*(?:\\n|\n))*/gi, '');

      // 4. Limpar linhas vazias excessivas deixadas pela remoção agressiva
      textoLimpo = textoLimpo.replace(/\n{3,}/g, '\n\n').trim();


      // 7. MONTAGEM FINAL SAGRADA (Imutável)
      const schemaForcado = `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": targetSeed.title,
        "author": { "@type": "Person", "name": "Paulino Gerlack" },
        "datePublished": new Date().toISOString().split('T')[0],
        "publisher": { "@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda", "logo": { "@type": "ImageObject", "url": "https://certusengine.ia.br/logo.svg" } },
        "about": targetSeed.law || "LGPD (Europe)",
        "description": result.rawOutput.gancho_usado || targetSeed.title.substring(0, 150)
      })}</script>`;

      const rotulos: any = {
        PT: "🟡 CENÁRIO SIMULADO / THREAT MODEL\n\n",
        ES: "🟡 ESCENARIO SIMULADO / THREAT MODEL\n\n",
        EN: "🟡 SIMULATED SCENARIO / THREAT MODEL\n\n"
      };

      const locIdioma = (targetSeed.locale as string || 'pt').toUpperCase();
      const outputParcial = schemaForcado + "\n\n" + (rotulos[locIdioma] || rotulos.PT) + textoLimpo;
      
      // Passa pela normalização para garantir as rotas de cauda longa e injeção do url no JSON-LD
      const { content: outputFinal } = normalizeHeaders(
        outputParcial,
        targetSeed.locale as Lang,
        targetSeed.assunto as Assunto,
        targetSeed.slug
      );
      
      seeds[seedIndex].contentMarkdown = outputFinal;
      // Injeta também as metainformações da Forja V2
      seeds[seedIndex].forgeMeta = {
        gancho_usado: result.rawOutput.gancho_usado,
        esqueleto_usado: result.rawOutput.esqueleto_usado,
        score_unicidade: result.rawOutput.score_unicidade,
        rotulo_integridade: result.rawOutput.rotulo_integridade
      };
      
      // Log de Sucesso
      appendLog(LOG_SUCCESS_FILE, {
        seedId: targetSeed.id,
        slug: targetSeed.slug,
        modelUsed: result.model,
        length: result.content.length,
        status: 'SUCCESS'
      });
      
      console.log(`[APEX Cron] Sucesso Máximo. Semente ${targetSeed.slug} forjada e auditada.`);
      
      // Descanso tático (5s) anti-Rate Limit, se não for o último
      if (i < targetSeeds.length - 1) {
        console.log('[APEX Cron] Descanso tático (5s) anti-Rate Limit...');
        await new Promise(r => setTimeout(r, 5000));
      }
      
    } catch (error: any) {
      console.error(`[APEX Cron] 🛑 FALHA CRÍTICA na semente ${targetSeed.slug}: ${error.message}`);
      
      // Log de Falha
      appendLog(LOG_ERROR_FILE, {
        seedId: targetSeed.id,
        slug: targetSeed.slug,
        error: error.message,
        status: 'FAILED'
      });
      
      // Se der erro, salva o que já forjou e marca erro no código de saída, mas NÃO aborta o processo imediatamente (permite commitar as que passaram)
      fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
      process.exitCode = 1; 
      continue; // Vai para a próxima semente do lote, se houver
    }
  }
  
  // Salva o JSON no disco com todo o lote
  fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
  console.log(`\n[APEX Cron] PROTOCOLO BERSERKER concluído. Arquivos selados.`);
}

if (process.env.NO_CRON !== 'true') {
  runCron();
}
