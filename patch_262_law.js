const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Artigo 262 está no índice 261 (0-based)
const article262 = data[261];

if (article262 && article262.title && article262.title.includes('Gobierno / Salud (Chile)')) {
  // Substitui todas as menções de Ley 21.719 por Ley 19.628
  article262.contentMarkdown = article262.contentMarkdown
    .replace(/Ley 21\.719/g, 'Ley 19.628')
    .replace(/LEY_21\.719/g, 'LEY_19.628');
  
  // Atualiza também o campo 'about' se existir
  if (article262.about) {
    article262.about = article262.about.replace(/Ley 21\.719/g, 'Ley 19.628');
  }
  if (article262.law) {
    article262.law = article262.law.replace(/Ley 21\.719/g, 'Ley 19.628');
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('✅ ARTIGO 262 CORRIGIDO: Ley 21.719 → Ley 19.628 (proteção de dados chilena)');
} else {
  console.log('⚠️ Artigo 262 não encontrado no índice esperado.');
}
