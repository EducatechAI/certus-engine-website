import fs from 'fs';
import path from 'path';
import { normalizeHeaders, type Lang, type Assunto } from '../src/lib/canonical';

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));

const slug = 'how-does-sec-ai-washing-rules-handle-critical-data-leakage-in-cs3-g15';
const seed = seeds.find((s: any) => s.slug === slug);

if (seed && seed.contentMarkdown) {
    const { content } = normalizeHeaders(
        seed.contentMarkdown,
        seed.locale as Lang,
        seed.assunto as Assunto,
        seed.slug
    );
    
    seed.contentMarkdown = content;
    fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
    console.log('Fixed Artigo 223 successfully.');
} else {
    console.error('Seed not found or no contentMarkdown.');
}
