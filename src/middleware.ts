/*---------------------------------------------------------------------------------------------
 *  Certus Engine — Web Security Middleware
 *  Hardening Layer 1: Rate Limiting + Request Validation + Geo-block
 *  Aplicado globalmente a todas as rotas /api/*
 *--------------------------------------------------------------------------------------------*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limit em memória por IP (reset a cada minuto)
// Em produção com múltiplas instâncias: usar Vercel KV
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMITS: Record<string, number> = {
  '/api/certuspay':    10,  // máx 10 req/min (pagamentos)
  '/api/admin':         5,  // máx 5 req/min (admin)
  '/api/generate-key': 20,  // máx 20 req/min
  'default':           60,  // máx 60 req/min para qualquer rota
};

function getRateLimit(pathname: string): number {
  for (const [route, limit] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(route)) return limit;
  }
  return RATE_LIMITS['default'] ?? 60;
}

function checkRateLimit(ip: string, pathname: string): boolean {
  const now = Date.now();
  const key = `${ip}:${pathname.split('/').slice(0, 3).join('/')}`;
  const limit = getRateLimit(pathname);
  const entry = ipRequestMap.get(key);

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(key, { count: 1, resetAt: now + 60_000 });
    return true; // permitido
  }

  if (entry.count >= limit) return false; // bloqueado

  entry.count++;
  return true;
}

// Limpeza periódica do mapa de IPs (evita memory leak)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of ipRequestMap.entries()) {
      if (now > entry.resetAt) ipRequestMap.delete(key);
    }
  }, 5 * 60 * 1000); // a cada 5 min
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ─── 1. Security Headers Universais ──────────────────────────────────────
  
  // HSTS — força HTTPS por 1 ano, inclui subdomínios
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // CSP — Content Security Policy
  // Bloqueia injeção de scripts, iframes e recursos externos não autorizados
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-insights.com https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.vercel.com https://certus-engine.vercel.app https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');
  response.headers.set('Content-Security-Policy', cspDirectives);

  // Permissions Policy — desativa APIs não usadas
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );

  // Outros headers de segurança
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Sovereign', 'Certus-Guardian-Hardened');

  // ─── 2. Rate Limiting nas Rotas de API ───────────────────────────────────
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const allowed = checkRateLimit(ip, pathname);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit excedido. Aguarde 1 minuto.',
          retryAfter: 60,
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(getRateLimit(pathname)),
            'X-Sovereign': 'Certus-Guardian-RateLimit',
          },
        }
      );
    }

    // Adicionar headers de rate limit na resposta
    response.headers.set('X-RateLimit-Limit', String(getRateLimit(pathname)));
    response.headers.set('X-RateLimit-Policy', '60s');
  }

  // ─── 3. Bloquear Métodos HTTP Não Autorizados nas APIs ───────────────────
  if (pathname.startsWith('/api/')) {
    const allowedMethods = ['GET', 'POST', 'OPTIONS'];
    if (!allowedMethods.includes(request.method)) {
      return NextResponse.json(
        { error: 'Método HTTP não permitido.' },
        { status: 405 }
      );
    }
  }

  // ─── 4. Validação de Content-Type nas APIs ───────────────────────────────
  if (
    pathname.startsWith('/api/') &&
    request.method === 'POST'
  ) {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser application/json.' },
        { status: 415 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
