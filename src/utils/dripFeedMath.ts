/**
 * Motor Matemático do Drip-Feed Soberano
 * Orquestra a liberação de 4.680 páginas com precisão de milissegundos
 * Fase 1: 48/dia (30 dias) -> 16 PT, 16 EN, 16 ES (Temas Únicos)
 * Fase 2: 24/dia (90 dias) -> 8 PT, 8 EN, 8 ES (Temas Únicos)
 * Fase 3: 12/dia (90 dias) -> 4 PT, 4 EN, 4 ES (Temas Únicos)
 */

export const ZERO_DAY = '2026-07-20T00:00:00.000Z'; // Data base de início oficial

export function calculateReleaseDate(index: number, startDateStr: string = ZERO_DAY): string {
  const startDate = new Date(startDateStr);
  const startMs = startDate.getTime();
  
  let addedMs = 0;
  
  if (index < 1440) {
    // Fase 1: 48 por dia (1 a cada 30 minutos = 1.800.000 ms)
    addedMs = index * 1800000;
  } else if (index < 3600) {
    // Fase 2: 24 por dia (1 a cada 60 minutos = 3.600.000 ms)
    const msFase1 = 1440 * 1800000; // 30 dias completos
    const indexFase2 = index - 1440;
    addedMs = msFase1 + (indexFase2 * 3600000);
  } else {
    // Fase 3: 12 por dia (1 a cada 120 minutos = 7.200.000 ms)
    const msFase1 = 1440 * 1800000;
    const msFase2 = 2160 * 3600000; // 90 dias completos
    const indexFase3 = index - 3600;
    addedMs = msFase1 + msFase2 + (indexFase3 * 7200000);
  }
  
  return new Date(startMs + addedMs).toISOString();
}

export function getDripFeedStats(startDateStr: string = ZERO_DAY, totalPages: number = 4680) {
  const now = Date.now();
  let releasedCount = 0;
  let nextReleaseDate = '';
  
  for (let i = 0; i < totalPages; i++) {
    const d = new Date(calculateReleaseDate(i, startDateStr)).getTime();
    if (d <= now) {
      releasedCount++;
    } else {
      nextReleaseDate = new Date(d).toISOString();
      break;
    }
  }
  
  return {
    released: releasedCount,
    total: totalPages,
    nextRelease: nextReleaseDate
  };
}
