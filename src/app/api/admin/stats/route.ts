import { NextResponse } from 'next/server';
import { getStats } from '@/lib/stats-store';

const ADMIN_PIN = process.env.ADMIN_SECRET_PIN;

export async function GET(request: Request) {
  // VULN-003 fix: PIN lido do header Authorization (não da URL).
  // Query params ficam em logs de servidor, histórico do browser e proxies.
  // Headers de autorização são tratados como dados sensíveis por toda a cadeia de infra.
  const authHeader = request.headers.get('Authorization');
  const pin = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!ADMIN_PIN || pin !== ADMIN_PIN) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 401 });
  }

  const stats = await getStats();
  return NextResponse.json({
    ...stats,
    status: 'Soberano',
    version: '1.6.1'
  });
}
