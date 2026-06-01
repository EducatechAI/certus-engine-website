import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getStats, incrementStats } from '@/lib/stats-store';
import { kv } from '@vercel/kv';

// A chave mestra é validada EXCLUSIVAMENTE no servidor via variável de ambiente.
// Nunca hardcode este valor no código-fonte.
const MASTER_KEY = process.env.MASTER_KEY;

export async function POST(request: Request) {
  try {
    // 0. Validar a chave mestra (VULN-001 fix — movida do cliente para o servidor)
    const body = await request.json().catch(() => ({}));
    const { masterKey } = body as { masterKey?: string };

    if (!MASTER_KEY) {
      console.error('[Certus] MASTER_KEY não configurada nas variáveis de ambiente.');
      return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 503 });
    }

    if (!masterKey || masterKey !== MASTER_KEY) {
      return NextResponse.json({ error: 'Credenciais inválidas. Acesso negado.' }, { status: 401 });
    }

    // 1. Rate Limiting por IP (Anti-Bot)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    if (process.env.KV_REST_API_URL) {
       const rateLimitKey = `rate_limit_${ip}`;
       const requests = await kv.incr(rateLimitKey);
       if (requests === 1) {
           await kv.expire(rateLimitKey, 86400); // 1 key por dia
       }
       if (requests > 1) {
           return NextResponse.json({ error: 'Múltiplas requisições. Tente novamente em 24 horas.' }, { status: 429 });
       }
    }
    const stats = await getStats();

    // 2. Verificar limite
    if (stats.count >= stats.limit) {
      return NextResponse.json({ error: 'Limite atingido' }, { status: 403 });
    }

    // 3. Gerar a chave
    const entropy = crypto.randomBytes(32).toString('base64url');
    const newKey = `certus_sk_test_${entropy}`;

    // 4. Incrementar estatística central (Persistência Real)
    await incrementStats();

    return NextResponse.json({ key: newKey });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
