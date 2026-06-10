"use server"

import { cookies } from 'next/headers';

const BACKEND_URL = process.env.CERTUS_BACKEND_INTERNAL_URL || 'http://localhost:3001'; 
const API_SECRET = process.env.CERTUS_INTERNAL_API_KEY || 'default_secret';

export async function executeZKProver(rawPayload: any, rule: string) {
  // 1. Executado APENAS no servidor. Zero exposição ao cliente.
  if (!rawPayload || !rule) throw new Error("INVALID_INPUT");

  try {
    // Em modo local para a demo, caso o backend não esteja ativo, nós simulamos 
    // a resposta do WolfdogEngine para manter o Zero Leakage e evitar erros 500 na Demo.
    // Na vida real, a chamada fetch() abaixo estaria descomentada e validada.
    
    // const response = await fetch(`${BACKEND_URL}/api/v1/zk-prove`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-internal-auth': API_SECRET
    //   },
    //   body: JSON.stringify({ payload: rawPayload, rule })
    // });
    // if (!response.ok) throw new Error("ZK_PROVER_SERVICE_UNAVAILABLE");
    // const result = await response.json();
    
    // Simulação Segura Server-Side (mesmo fluxo do Guardian, nunca devolvendo rawData)
    const crypto = require('crypto');
    const secretSalt = 'certus-sovereign-salt';
    const dataString = JSON.stringify(rawPayload);
    const proofHash = crypto.createHash('sha256').update(`${dataString}|${rule}|${secretSalt}`).digest('hex');

    const maskedData = JSON.parse(JSON.stringify(rawPayload));
    if (maskedData.cpf) maskedData.cpf = '***.***.***-00';
    if (maskedData.name) maskedData.name = maskedData.name.split(' ')[0] + ' ***';
    if (maskedData.idade) maskedData.idade = '**'; // Exigência da demo de não mostrar a idade clara

    // 2. O backend retorna APENAS: { maskedData, proofHash, ruleApplied }
    // O dado bruto (rawPayload) é descartado aqui e NUNCA volta ao frontend.
    return {
      maskedData,
      zkProofs: [{
        isValid: true,
        proofHash,
        ruleApplied: rule,
        simulatorMode: true
      }],
      auditHashes: [
         crypto.createHash('sha256').update(`LAZARUS_LOG_${proofHash}`).digest('hex')
      ]
    };
  } catch (error) {
    // Log de erro seguro no servidor (NUNCA exibir stack trace ao cliente)
    console.error("[SERVER] ZK-Prover failed:", error);
    throw new Error("CONFORMITY_PROOF_GENERATION_FAILED");
  }
}
