const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Artigo 266 está no índice 265 (0-based)
const article266 = data[265];

if (article266 && article266.contentMarkdown) {
  article266.contentMarkdown = article266.contentMarkdown.replace(
    /La aplicación de la tecnología Kangal permite aislar procesos críticos en contenedores de memoria efímera.*/,
    "La aplicación de la tecnología **PITBULL** permite aislar procesos críticos y purgar la memoria efímera, mientras **KANGAL** bloquea el tráfico DGA en el borde, reduciendo la exposición de datos sensibles a solo 0.05ms antes de la purga."
  );
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('✅ ARTIGO 266 CORRIGIDO: Kangal -> Pitbull');
} else {
  console.log('⚠️ Artigo 266 não encontrado ou sem contentMarkdown.');
}
