const { execSync } = require('child_process');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf16le');
const tokenMatch = envContent.match(/BLOB_READ_WRITE_TOKEN=(.+)/);
if (tokenMatch) {
  process.env.BLOB_READ_WRITE_TOKEN = tokenMatch[1].trim();
  console.log("Token carregado. Executando script para Command...");
  execSync('node scripts/upload-blob.js "C:\\Users\\pauli\\OneDrive\\Documentos\\Google Antigravity\\Certus_Studio_Command_SDK_v1.3.4_LIMPA.zip" "1.3.4"', { stdio: 'inherit' });

  console.log("Token carregado. Executando script para Sovereign...");
  execSync('node scripts/upload-blob.js "C:\\Users\\pauli\\OneDrive\\Documentos\\Google Antigravity\\Certus_Studio_Sovereign_SDK_v1.3.4_LIMPA.zip" "1.3.4"', { stdio: 'inherit' });
} else {
  console.log("Token nao encontrado no utf16le, tentando utf8...");
  const envContent8 = fs.readFileSync('.env.local', 'utf8');
  const tokenMatch8 = envContent8.match(/BLOB_READ_WRITE_TOKEN=(.+)/);
  if (tokenMatch8) {
      process.env.BLOB_READ_WRITE_TOKEN = tokenMatch8[1].trim();
      console.log("Token carregado (utf8). Executando script para Command...");
      execSync('node scripts/upload-blob.js "C:\\Users\\pauli\\OneDrive\\Documentos\\Google Antigravity\\Certus_Studio_Command_SDK_v1.3.4_LIMPA.zip" "1.3.4"', { stdio: 'inherit' });
      
      console.log("Token carregado (utf8). Executando script para Sovereign...");
      execSync('node scripts/upload-blob.js "C:\\Users\\pauli\\OneDrive\\Documentos\\Google Antigravity\\Certus_Studio_Sovereign_SDK_v1.3.4_LIMPA.zip" "1.3.4"', { stdio: 'inherit' });
  } else {
      console.log("Nao encontrado de jeito nenhum");
  }
}
