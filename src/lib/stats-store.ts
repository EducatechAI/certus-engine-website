import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const COUNT_FILE = path.join(process.cwd(), 'keys_count.json');
const MAX_KEYS = 50;

// Centralized state-store and persistence
export async function getStats() {
  let count = 0;

  // 1. Tentar Vercel KV (Produção)
  if (process.env.KV_REST_API_URL) {
    try {
      const kvCount = await kv.get<number>('keys_count');
      count = kvCount || 0;
    } catch (e) {
      console.warn('Vercel KV não disponível, tentando fallback local.');
    }
  } else {
    // 2. Tentar Arquivo Local (Desenvolvimento)
    try {
      if (fs.existsSync(COUNT_FILE)) {
        const data = JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
        count = data.count || 0;
      }
    } catch (e) {
      count = 0;
    }
  }

  return {
    count,
    limit: MAX_KEYS,
    remaining: MAX_KEYS - count
  };
}

export async function incrementStats() {
  // 1. Tentar Vercel KV (Produção)
  if (process.env.KV_REST_API_URL) {
    try {
      const newCount = await kv.incr('keys_count');
      return newCount <= MAX_KEYS;
    } catch (e) {
      console.warn('Erro ao incrementar no Vercel KV.');
    }
  } else {
    // 2. Tentar Arquivo Local (Desenvolvimento)
    const stats = await getStats();
    if (stats.count < MAX_KEYS) {
      const newCount = stats.count + 1;
      try {
        fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: newCount }), 'utf8');
      } catch (e) {
        // Fallback local em memória se arquivo for RO
      }
      return true;
    }
  }
  return false;
}
