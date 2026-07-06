import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, rules } = await req.json();

    const DIAMANTE_API_URL = process.env.DIAMANTE_API_URL;
    const DIAMANTE_API_KEY = process.env.DIAMANTE_API_KEY;

    if (!DIAMANTE_API_URL || !DIAMANTE_API_KEY) {
      return NextResponse.json(
        { error: 'Configuração do Gateway ausente no servidor.' },
        { status: 500 }
      );
    }

    const payload = {
      request_id: crypto.randomUUID(),
      institution_id: "STUDIO-DOJO-FRONTEND",
      context_mode: "strict",
      target_chain: "cardano",
      raw_llm_output: code,
      compliance_rules: rules || [
        "Strict LGPD: No personal data or PII in clear text allowed",
        "Must encrypt all personal data"
      ],
      metadata: {
        user_id: "frontend_user",
        session_id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      }
    };

    const response = await fetch(`${DIAMANTE_API_URL}/api/v1/gateway/process_contract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIAMANTE_API_KEY}`
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Diamante Proxy Error:', error);
    return NextResponse.json(
      { error: 'Falha na comunicação com o Gateway Diamante.' },
      { status: 500 }
    );
  }
}
