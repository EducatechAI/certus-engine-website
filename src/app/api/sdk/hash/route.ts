import { NextResponse } from 'next/server';

/**
 * Endpoint de Validação de Integridade (Hash Check)
 * Permite que usuários e scripts verifiquem o hash SHA-256 da versão atual do SDK Command.
 */
export async function GET() {
  const version = process.env.SDK_COMMAND_VERSION || '1.0.0';
  const hash = process.env.SDK_COMMAND_HASH || 'hash_nao_disponivel';
  
  return NextResponse.json({
    version,
    hash,
    released_at: new Date().toISOString()
  });
}
