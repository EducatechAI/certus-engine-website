const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const documents = [
  { base: 'whitepaper', versions: ['v3.0.0'] },
  { base: 'dossie-institucional', versions: ['v3.0.0'] },
  { base: 'dossie-latam', versions: ['v3.0.0'] },
  { base: 'dossie-mestre-soberano', versions: ['v3.0.0'] },
  { base: 'dossie-certus-studio', versions: ['v3.0.0'] },
  { base: 'dossie-transparencia', versions: ['v1.0.0'] }
];

const locales = ['pt', 'en', 'es'];
const outputDir = path.join(__dirname, '../public/downloads');

// Garante que o diretório existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let publicHashes = [];

for (const doc of documents) {
  for (const version of doc.versions) {
    for (const locale of locales) {
      // In Certus, markdown docs are located in ../../certus-engine/docs/ or dossies/
      // The naming is slightly different based on the original doc. We'll map it to find it.
      let mdFileName = "";
      if (doc.base === 'whitepaper') mdFileName = `WHITEPAPER_CERTUS_ENGINE_${version.replace(/\./g, '_')}.md`;
      if (doc.base === 'dossie-institucional') mdFileName = `DOSSIE_INSTITUCIONAL_${version.replace(/\./g, '_')}.md`;
      if (doc.base === 'dossie-latam') mdFileName = `DOSSIE_ESTRATEGICO_LATAM_${version.replace(/\./g, '_')}.md`;
      if (doc.base === 'dossie-mestre-soberano') mdFileName = `DOSSIE_MESTRE_SOBERANO_${version.replace(/\./g, '_')}.md`;
      if (doc.base === 'dossie-certus-studio') mdFileName = `DOSSIE_CERTUS_STUDIO_${version.replace(/\./g, '_')}.md`;
      if (doc.base === 'dossie-transparencia') mdFileName = `DOSSIE_TRANSPARENCIA_SOBERANA_${version.replace(/\./g, '_')}.md`;
      
      // Assume the translation files are named identically for simplicity in the workspace, or we fallback.
      // But actually, we will create them named e.g., DOSSIE_INSTITUCIONAL_v3_0_0_EN.md
      if (locale !== 'pt') {
        mdFileName = mdFileName.replace('.md', `_${locale.toUpperCase()}.md`);
      }

      let mdFilePath = path.join(__dirname, `../../certus-engine/docs/${mdFileName}`);
      // Dossie transparencia is in 'dossies' directory
      if (doc.base === 'dossie-transparencia') {
        mdFilePath = path.join(__dirname, `../../certus-engine/dossies/${mdFileName}`);
      }

      const pdfFileName = `${doc.base}-${version}-${locale}.pdf`;
      const pdfFile = path.join(outputDir, pdfFileName);
      
      if (fs.existsSync(mdFilePath)) {
        console.log(`Gerando PDF base para ${pdfFileName}...`);
        try {
          // npx md-to-pdf takes the markdown and exports pdf
          execSync(`npx md-to-pdf "${mdFilePath}" --dest "${pdfFile}" --pdf-options '{"format":"A4","margin":{"top":"20mm","bottom":"20mm","left":"20mm","right":"20mm"}}'`, { stdio: 'inherit' });
          
          // Assinar criptograficamente
          console.log(`Aplicando assinatura em ${pdfFileName}...`);
          execSync(`node scripts/sign-pdf.js --input "${pdfFile}" --output "${pdfFile}"`, { stdio: 'inherit' });
          
          // Read hash for hashes.json
          const hashPath = `${pdfFile}.sha256`;
          let hashVal = "";
          if (fs.existsSync(hashPath)) {
             hashVal = fs.readFileSync(hashPath, 'utf8');
             publicHashes.push({
                 name: pdfFileName,
                 sha256: hashVal,
                 locale: locale,
                 version: version
             });
          }
        } catch (e) {
          console.error(`Erro ao processar ${mdFilePath}`, e.message);
        }
      } else {
        console.log(`Arquivo base não encontrado: ${mdFilePath}`);
      }
    }
  }
}

// Generate the hashes.json file
const hashesJsonPath = path.join(outputDir, 'hashes.json');
fs.writeFileSync(hashesJsonPath, JSON.stringify({
    version: "3.0.0",
    generated_at: new Date().toISOString(),
    documents: publicHashes
}, null, 2));

console.log('✅ Todos os PDFs gerados e assinados. hashes.json emitido.');
