const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Modificando artigo 269 (index 268)
if (data[268] && data[268].contentMarkdown) {
  let md = data[268].contentMarkdown;
  md = md.replace(/Presa module/gi, 'WOLFDOG module');
  md = md.replace(/PII-Zero isolando memória/gi, 'PITBULL isolando nós e aplicando quarentena');
  md = md.replace(/Kangal timestamping/gi, 'LAZARUS executando timestamp chain');
  md = md.replace(/Safe Harbor/gi, 'Forensic logs satisfy Business Records exception under California Evidence Code § 1271');
  data[268].contentMarkdown = md;
  console.log('Artigo 269 atualizado.');
}

// Modificando artigo 270 (index 269)
if (data[269] && data[269].contentMarkdown) {
  let md = data[269].contentMarkdown;
  md = md.replace(/Lazarus varredura estatística/gi, 'Wolfdog executando varredura estatística');
  md = md.replace(/PII-Zero mascarando intenção/gi, 'Ghost Recon mapeando lateralmente a intenção de tráfego');
  md = md.replace(/Tribunal de CPUs análise comportamental/gi, 'Tribunal de CPUs garantindo consenso criptográfico de hardware');
  data[269].contentMarkdown = md;
  console.log('Artigo 270 atualizado.');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Patch concluído.');
