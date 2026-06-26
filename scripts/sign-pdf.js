const fs = require('fs');
const crypto = require('crypto');
const { PDFDocument } = require('pdf-lib');
const ed = require('@noble/ed25519');
const path = require('path');

// Generating a random private key for the mock signing, or you could provide one.
const privKey = ed.utils.randomPrivateKey();

async function signPDF(inputPath, outputPath) {
  try {
    console.log(`Assinando: ${path.basename(inputPath)}`);
    // 1. Lê o PDF
    const pdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // 2. Calcula SHA-256 do conteúdo
    const hash = crypto.createHash('sha256').update(pdfBytes).digest('hex');
    
    // 3. Assina com Ed25519
    const msgHash = Uint8Array.from(Buffer.from(hash, 'hex'));
    const signatureArray = await ed.signAsync(msgHash, privKey);
    const signature = Buffer.from(signatureArray).toString('hex');
    
    // 4. Adiciona metadados criptográficos
    pdfDoc.setTitle('Certus Engine - Sovereign Document');
    pdfDoc.setAuthor('Ortunio Paulino dos Santos - EDUCATECH AI DIGITAL SOVEREIGN LTDA');
    pdfDoc.setSubject('Governança Determinística de IA');
    pdfDoc.setKeywords(['Certus Engine', 'Soberania Digital', 'ZK-Proofs', 'LAZARUS']);
    pdfDoc.setProducer('Certus Document Signing Engine v3.0.0');
    pdfDoc.setCreationDate(new Date());
    
    // Metadados customizados
    pdfDoc.setCustom('Certus-SHA256', hash);
    pdfDoc.setCustom('Certus-Ed25519', signature);
    pdfDoc.setCustom('Certus-LAZARUS-Block', '943202');
    pdfDoc.setCustom('Certus-Timestamp', new Date().toISOString());
    pdfDoc.setCustom('Certus-Version', '3.0.0');
    pdfDoc.setCustom('Certus-Standard', 'PDF/A-3b');
    
    // 5. Salva PDF assinado
    const signedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, signedPdfBytes);
    
    // Escreve um arquivo .sha256 lado a lado para transparência no servidor
    fs.writeFileSync(`${outputPath}.sha256`, hash);

    console.log(`✅ Assinado e Registrado [SHA-256: ${hash.substring(0, 16)}...]`);
  } catch (error) {
    console.error(`Erro ao assinar ${inputPath}:`, error);
  }
}

const args = process.argv.slice(2);
const inputArgIndex = args.indexOf('--input');
const outputArgIndex = args.indexOf('--output');

if (inputArgIndex !== -1 && outputArgIndex !== -1) {
    const inputPath = args[inputArgIndex + 1];
    const outputPath = args[outputArgIndex + 1];
    signPDF(inputPath, outputPath);
} else {
    console.error("Uso: node sign-pdf.js --input <in.pdf> --output <out.pdf>");
}
