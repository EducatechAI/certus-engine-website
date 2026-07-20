import fs from 'fs';
import path from 'path';
import { calculateReleaseDate } from '../src/utils/dripFeedMath';

function runPhaseB() {
  const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
  
  if (!fs.existsSync(seedsPath)) {
    console.error('ERRO: seeds.json não encontrado. Rode a Fase A primeiro.');
    return;
  }

  const rawData = fs.readFileSync(seedsPath, 'utf-8');
  let seeds: any[] = JSON.parse(rawData);

  // 1. Separar por locale para entrelaçamento (Interleaving)
  const ptSeeds = seeds.filter(s => s.locale === 'pt');
  const enSeeds = seeds.filter(s => s.locale === 'en');
  const esSeeds = seeds.filter(s => s.locale === 'es');

  // 2. Entrelaçar: PT, EN, ES, PT, EN, ES...
  const interleavedSeeds: any[] = [];
  const maxLen = Math.max(ptSeeds.length, enSeeds.length, esSeeds.length);
  
  for (let i = 0; i < maxLen; i++) {
    if (i < ptSeeds.length) interleavedSeeds.push(ptSeeds[i]);
    if (i < enSeeds.length) interleavedSeeds.push(enSeeds[i]);
    if (i < esSeeds.length) interleavedSeeds.push(esSeeds[i]);
  }

  // 3. Aplicar Matemática de Gotejamento
  // O motor calcula a data exata com base no index do loop
  const injectedSeeds = interleavedSeeds.map((seed, index) => {
    return {
      ...seed,
      releaseDate: calculateReleaseDate(index)
    };
  });

  // 4. Salvar de volta
  fs.writeFileSync(seedsPath, JSON.stringify(injectedSeeds, null, 2));
  
  console.log(`[Fase B Concluída] -> Matemática aplicada em ${injectedSeeds.length} nós.`);
  console.log(`Primeiro Nó (0): ${injectedSeeds[0].releaseDate} (${injectedSeeds[0].locale})`);
  console.log(`Segundo Nó (1): ${injectedSeeds[1].releaseDate} (${injectedSeeds[1].locale})`);
  console.log(`Terceiro Nó (2): ${injectedSeeds[2].releaseDate} (${injectedSeeds[2].locale})`);
  console.log(`Último Nó (${injectedSeeds.length - 1}): ${injectedSeeds[injectedSeeds.length - 1].releaseDate}`);
}

runPhaseB();
