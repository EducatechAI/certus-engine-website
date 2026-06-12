import { NextResponse } from 'next/server';
import { LazarusVault } from '@/shared/LazarusVault';
import { TRAINER_SYSTEM_PROMPTS } from '@/bot/trainer/trainerSystemPrompt';
import { ChallengeValidator } from '@/bot/trainer/challengeValidator';
import fs from 'fs';
import path from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL_NAME = process.env.CHAT_MODEL_NAME || "google/gemini-2.5-flash";

function protectSovereignTerms(text: string): string {
  if (!text) return text;
  return text
    .replace(/Fail-Cerrado/gi, 'Fail-Closed')
    .replace(/Fail cerrado/gi, 'Fail-Closed')
    .replace(/PII-Cero/gi, 'PII-Zero')
    .replace(/PII cero/gi, 'PII-Zero')
    .replace(/Pii-Zero/gi, 'PII-Zero');
}

interface Milestone {
  threshold: number;
  name: string;
  seal: string;
  benefits: string[];
}

function checkMilestone(count: number): Milestone | null {
  const milestones = [
    { threshold: 20, name: 'Explorador', seal: '🥉', benefits: ['Acesso a materiais básicos'] },
    { threshold: 50, name: 'Investigador', seal: '🥈', benefits: ['Acesso a casos de uso'] },
    { threshold: 80, name: 'Especialista', seal: '🥇', benefits: ['Link de afiliado ativado'] },
    { threshold: 120, name: 'Mestre', seal: '💎', benefits: ['Comissão +5%', '(vendas do próximo mês, não recorrente)'] },
    { threshold: 150, name: 'Soberano', seal: '👑', benefits: ['Mentoria direta + 10% extra', '(vendas do próximo mês, não recorrente)'] }
  ];
  return milestones.find(m => m.threshold === count) || null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload, ambassadorId, message, currentCount, history = [], locale = 'pt-BR' } = body;

    const activeAmbassadorId = ambassadorId || "amb_demo_123";

    // Se for um comando estruturado (/challenge ou /verify)
    if (action) {
      switch (action) {
        case '/challenge start':
          return NextResponse.json({
            challenge_id: 'CHALLENGE_01_WOLFDOG_ZK',
            task: 'Mascare os dados sensíveis deste paciente preservando o cid10, e gere o proof hash.',
            input: {
              paciente: "Maria Oliveira",
              cpf: "987.654.321-00",
              cid10: "I10",
              observacao: "Hipertensão arterial controlada."
            }
          });

        case '/verify':
          const config = {
            id: 'CHALLENGE_01_WOLFDOG_ZK',
            title: 'Roteamento ZK e PII-Zero na Borda',
            validation_logic: {
              cpf_must_match: "^\\*\\*\\*\\.\\*\\*\\*\\.\\*\\*\\*-\\d{2}$",
              paciente_must_be_masked: true,
              cid10_must_remain: "I10",
              zk_proof_hash_generated: true
            }
          };

          const isValid = ChallengeValidator.validate(payload, config);

          if (isValid) {
            const hash = await LazarusVault.logTrainingCertification(activeAmbassadorId, ['CHALLENGE_01_WOLFDOG_ZK']);
            return NextResponse.json({
              status: 'success',
              message: '✅ Sucesso: Wolfdog aplicou PII-Zero e o ZK-Router gerou a prova. O dado sensível não deixou a borda.',
              certification_hash: hash,
              lazarus_block: 'Aprovado e Selado'
            });
          } else {
            return NextResponse.json({
              status: 'failed',
              message: '❌ Falha: Dados PII expostos ou falha na geração do hash ZK. O sistema está vulnerável a vazamento.',
            }, { status: 400 });
          }

        default:
          return NextResponse.json({ error: 'Ação desconhecida no sandbox.' }, { status: 400 });
      }
    }

    // Se for uma pergunta livre (mensagem normal de chat)
    const userQuery = message || payload || "";
    if (!userQuery) {
      return NextResponse.json({ error: "Mensagem ou Ação é obrigatória." }, { status: 400 });
    }

    // 1. Processar pergunta normalmente (RAG + LLM)
    let trainingKbText = "";
    try {
      const kbPath = path.join(process.cwd(), 'src', 'data', 'training-kb');
      if (fs.existsSync(kbPath)) {
        const files = fs.readdirSync(kbPath).filter(file => file.endsWith('.md') || file.endsWith('.json'));
        for (const file of files) {
          const content = fs.readFileSync(path.join(kbPath, file), 'utf-8');
          trainingKbText += `\n### Documento: ${file}\n${content}\n`;
        }
      }
    } catch (err) {
      console.error("[Trainer-API] Erro ao ler base de conhecimento de treino:", err);
    }

    const promptSelected = TRAINER_SYSTEM_PROMPTS[locale as keyof typeof TRAINER_SYSTEM_PROMPTS] || TRAINER_SYSTEM_PROMPTS['pt-BR'];

    const systemPromptCombined = `
${promptSelected}

### BASE DE CONHECIMENTO DE TREINAMENTO (docs/training-kb):
${trainingKbText}
    `;

    let reply = "";
    if (OPENROUTER_API_KEY) {
      try {
        const messages = [
          { role: "system", content: systemPromptCombined },
          ...history.map((msg: any) => ({
            role: msg.sender === 'outgoing' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: "user", content: userQuery }
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://certusengine.vercel.app",
            "X-Title": "Certus Engine Trainer Bot"
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.3
          })
        });

        if (response.ok) {
          const data = await response.json();
          reply = data.choices?.[0]?.message?.content || "";
        }
      } catch (err) {
        console.error("[Trainer-API] Erro na chamada do OpenRouter:", err);
      }
    }

    // Fallback local se a chamada à API falhar ou não estiver configurada
    if (!reply) {
      const lowerQuery = userQuery.toLowerCase();
      if (locale.startsWith('en')) {
        if (lowerQuery.includes('cpsi') || lowerQuery.includes('182/2021')) {
          reply = "As detailed in playbook_govtech.md, direct contracting via CPSI (Public Contract for Innovative Solution) is authorized under the Startups Legal Framework (Complementary Law 182/2021). This allows testing and purchasing technology without traditional bidding.";
        } else if (lowerQuery.includes('agent') || lowerQuery.includes('wolfdog')) {
          reply = "In the Certus architecture (arquitetura_frota_apex.md), we have 12 sub-agents. Wolfdog is the watchdog for resilience and persistence (anti-kill), while Pitbull handles defense against Ransomwares at the file layer.";
        } else {
          reply = "This information is not in my current base, but I can help you find it on the certusengine.com.br website. If you need more details, you can also ask the Certus IDE directly or download it if you haven't already.";
        }
        reply += "\n\nWant to explore more? Keep asking!";
      } else if (locale.startsWith('es')) {
        if (lowerQuery.includes('cpsi') || lowerQuery.includes('182/2021')) {
          reply = "Como se detalla en playbook_govtech.md, la contratación directa vía CPSI (Contrato Público para Solución Innovadora) está respaldada por el Marco Legal de Startups (Ley Complementaria 182/2021). Esto permite probar y adquirir tecnología sin licitación tradicional.";
        } else if (lowerQuery.includes('agente') || lowerQuery.includes('wolfdog')) {
          reply = "En la arquitectura de Certus (arquitetura_frota_apex.md), tenemos 12 subagentes. Wolfdog es el perro guardián de resiliencia y persistencia (anti-kill), mientras que Pitbull se encarga de la defensa contra Ransomwares en la capa de archivos.";
        } else {
          reply = "Esta información no está en mi base actual, pero puedo ayudarte a encontrarla en el sitio web certusengine.com.br. Si necesitas más detalles, también puedes preguntar directamente a la IDE Certus o descargarla si aún no lo has hecho.";
        }
        reply += "\n\n¿Quieres explorar más? ¡Sigue preguntando!";
      } else {
        if (lowerQuery.includes('cpsi') || lowerQuery.includes('182/2021')) {
          reply = "Conforme detalhado no playbook_govtech.md, a contratação direta via CPSI (Contrato Público para Solução Inovadora) tem amparo no Marco Legal das Startups (Lei Complementar 182/2021). Isso permite testar e adquirir tecnologia sem licitação tradicional.";
        } else if (lowerQuery.includes('agente') || lowerQuery.includes('wolfdog')) {
          reply = "Na arquitetura Certus (arquitetura_frota_apex.md), temos 12 sub-agentes. O Wolfdog é o watchdog de resiliência e persistência (anti-kill), enquanto o Pitbull cuida da defesa contra Ransomwares na camada de arquivos.";
        } else {
          reply = "Essa informação não está na minha base atual, mas posso ajudá-lo a encontrar no site certusengine.com.br. Caso precise de mais detalhes, você também pode perguntar diretamente para a IDE Certus ou fazer o download dela se ainda não o fez.";
        }
        reply += "\n\nQuer explorar mais? Continue perguntando!";
      }
    }

    // Protect sovereign terms in the generated reply
    reply = protectSovereignTerms(reply);

    // 2. Incrementar contador de perguntas
    const prevCount = typeof currentCount === 'number' ? currentCount : 0;
    const newCount = prevCount + 1;

    // 3. Verificar se atingiu marco
    const milestone = checkMilestone(newCount);
    let milestoneResponse = null;

    if (milestone) {
      // 4. Gerar selo no LAZARUS
      const sealHash = await LazarusVault.logEvent({
        actor: activeAmbassadorId,
        action: 'MILESTONE_ACHIEVED',
        metadata: {
          milestone: milestone.name,
          questions_count: newCount,
          timestamp: new Date().toISOString()
        }
      });

      milestoneResponse = {
        achieved: true,
        name: milestone.name,
        seal: milestone.seal,
        benefits: milestone.benefits,
        hash: sealHash
      };
    }

    return NextResponse.json({
      reply,
      questions_count: newCount,
      milestone: milestoneResponse
    });

  } catch (error: any) {
    console.error("[Trainer-API] Erro interno no Trainer:", error);
    return NextResponse.json({ error: 'Erro interno no Trainer Bot Sandbox.' }, { status: 500 });
  }
}
