import { NextResponse } from 'next/server';
import { FAQ_ITEMS } from '@/data/faq';
import { WHITE_PAPER_CONTENT } from '@/data/TechnicalDossierContent';
import fs from 'fs';
import path from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL_NAME = process.env.CHAT_MODEL_NAME || "google/gemini-2.5-flash"; // Um modelo bom e rápido no OpenRouter, ou "openai/gpt-4o-mini"

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "O campo 'message' é obrigatório." }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      console.warn("[Certus-API] Chave OPENROUTER_API_KEY não encontrada. Abortando IA.");
      return NextResponse.json({ error: "API Key não configurada no servidor." }, { status: 500 });
    }

    // Montando a Base de Conhecimento Fixa
    const faqText = FAQ_ITEMS.map((item: any) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n");
    const dossierText = WHITE_PAPER_CONTENT.pt.sections.map((sec: any) => `## ${sec.title}\n${sec.content}`).join("\n\n");

    // Lendo os Dossiês Dinâmicos da pasta src/data/dossiers
    let dynamicDossiersText = "";
    try {
      const dossiersPath = path.join(process.cwd(), 'src', 'data', 'dossiers');
      if (fs.existsSync(dossiersPath)) {
        const files = fs.readdirSync(dossiersPath).filter(file => file.endsWith('.md') || file.endsWith('.txt'));
        for (const file of files) {
          const content = fs.readFileSync(path.join(dossiersPath, file), 'utf-8');
          dynamicDossiersText += `\n### Dossiê: ${file}\n${content}\n`;
        }
      }
    } catch (err) {
      console.error("[Certus-API] Erro ao ler dossiês dinâmicos:", err);
    }

    const SYSTEM_PROMPT = `
Você é o Certus Bot, a voz oficial e a Inteligência Artificial Soberana do Certus Engine.
Sua única missão é sanar dúvidas de desenvolvedores, empresas, órgãos governamentais e instituições de ensino sobre a tecnologia Certus Engine, baseando-se ESTRITAMENTE na base de conhecimento oficial fornecida abaixo.

### 🛡️ Regras de Comportamento e Resposta:
1. **Veracidade Estrita:** Responda apenas com fatos contidos na base de conhecimento abaixo. Nunca invente capacidades técnicas ou preços que não estejam descritos aqui.
2. **Identidade:** Comporte-se como um assistente técnico-operacional. Valorize a integridade, a resiliência e a privacidade (PII-Zero).
3. **Seja Conciso e Inteligente:** Formule respostas naturais e educadas, mas diretas ao ponto. Se o usuário fizer perguntas genéricas, direcione-o para os diferenciais do Certus.
4. **Fechamento e CTA da Academy:** Ao finalizar a explicação, sempre pergunte sutilmente "O que mais deseja saber?". De forma sutil e natural, convide o usuário a conhecer nossa Academy onde ele pode aprender explorando livremente e ganhar selos de conquista: "Gostou? Na Academy você pode ganhar selos explorando mais! Acesse certusengine.vercel.app/login".
5. **Alinhamento de Órgãos Públicos:** Se o usuário se identificar como Prefeitura, Consórcio, Governo ou Universidade, direcione o foco para o **Pacote GOV Diamante (CPSI - Lei 182/2021)**, destacando a dispensa de licitação e indique o e-mail: enterprise@certus.engine.

---
### 📚 BASE DE CONHECIMENTO OFICIAL

#### Dossiê Técnico Principal:
${dossierText}

#### Dossiês Extras (Carregados Dinamicamente):
${dynamicDossiersText}

#### Perguntas Frequentes (FAQ):
${faqText}
    `;

    // Formata o histórico para o padrão OpenRouter (OpenAI-compatible)
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.sender === 'outgoing' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://certusengine.vercel.app", // Requisito do OpenRouter
        "X-Title": "Certus Engine Bot"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        temperature: 0.2 // Baixa criatividade para garantir precisão técnica
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Certus-API] Falha no OpenRouter:", errorText);
      throw new Error(`Erro na API externa: Status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar a resposta.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("[Certus-API] Erro interno:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
