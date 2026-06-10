import { NextResponse } from 'next/server';
import { RagIngestor } from '@/bot/trainer/ragIngestor';
import { TRAINER_SYSTEM_PROMPT } from '@/bot/trainer/trainerSystemPrompt';
import { ChallengeValidator } from '@/bot/trainer/challengeValidator';
import { LazarusVault } from '@/shared/LazarusVault';

export async function POST(req: Request) {
  try {
    const { action, payload, ambassadorId } = await req.json();

    if (!ambassadorId) {
      return NextResponse.json({ error: 'Soberania Comprometida: ambassadorId obrigatório.' }, { status: 400 });
    }

    switch (action) {
      case '/ask':
        // Simula o LLM isolado do Trainer buscando no RAG
        const rag = new RagIngestor();
        const kb = await rag.ingestKnowledgeBase();
        
        // Simulação estúpida de RAG match para efeito de PoC
        const docMatch = kb.find(c => c.content.toLowerCase().includes(payload.toLowerCase().split(' ')[0]));
        const source = docMatch ? docMatch.source : 'Desconhecida';
        
        return NextResponse.json({
          reply: `[ISOLATED SANDBOX LLM]\nBaseado na doutrina Certus: Encontrei referência sobre isso no arquivo ${source}.\n\nDeseja testar isso em um desafio prático agora? Digite '/challenge start'.`
        });

      case '/challenge start':
        // Retorna o payload de um desafio
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
        // O payload vem como string JSON a ser validado
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
          // Geração forense da certificação
          const hash = await LazarusVault.logTrainingCertification(ambassadorId, ['CHALLENGE_01_WOLFDOG_ZK']);
          
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

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno no Trainer Bot Sandbox.' }, { status: 500 });
  }
}
