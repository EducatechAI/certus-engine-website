import fs from 'fs';
import path from 'path';

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));

const slug226 = 'o-que-acontece-quando-ransom-ataca-bancos-sob-decreto-gov-dig-cs6-g01';
const seed = seeds.find((s: any) => s.slug === slug226);

if (seed && seed.contentMarkdown) {
    const anomaliaStart = seed.contentMarkdown.indexOf('{"@context"');
    if (anomaliaStart > -1) {
        // Encontra o fim procurando o titulo seguinte
        const anomaliaEnd = seed.contentMarkdown.indexOf('# O que acontece', anomaliaStart);
        if (anomaliaEnd > -1) {
            seed.contentMarkdown = seed.contentMarkdown.substring(0, anomaliaStart - 1) + '\n\n' + seed.contentMarkdown.substring(anomaliaEnd);
            fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
            console.log('Fixed Artigo 226 leaked JSON explicitly!');
        } else {
            console.log('Fim da anomalia nao encontrado');
        }
    } else {
        console.log('Anomalia string nao encontrada');
    }
} else {
    console.error('Seed not found or no contentMarkdown.');
}
