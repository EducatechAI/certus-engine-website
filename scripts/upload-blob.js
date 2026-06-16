const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
// Usa o fetch nativo do Node 18+

async function uploadToBlob() {
  const filePath = process.argv[2];
  const version = process.argv[3] || '1.2.0';
  
  if (!filePath) {
    console.error('Uso: npm run upload-sdk <caminho/para/arquivo.zip> [versão]');
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Arquivo não encontrado: ${absolutePath}`);
    process.exit(1);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('Erro: BLOB_READ_WRITE_TOKEN não encontrado nas variáveis de ambiente.');
    console.error('Exporte a variável antes de rodar o script. Ex: $env:BLOB_READ_WRITE_TOKEN="..." (no PowerShell)');
    process.exit(1);
  }

  console.log('📦 Preparando arquivo:', absolutePath);
  
  const fileBuffer = fs.readFileSync(absolutePath);
  const sizeBytes = fileBuffer.length;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2) + 'MB';

  console.log(`📏 Tamanho: ${sizeMB}`);
  console.log('🔐 Calculando Hash SHA-256...');
  
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const hexHash = hashSum.digest('hex');
  const fullHash = `sha256:${hexHash}`;
  
  console.log(`✅ Hash: ${fullHash}`);
  
  const fileName = path.basename(absolutePath);
  
  console.log(`☁️ Iniciando upload para Vercel Blob: ${fileName}...`);
  
  try {
    const response = await fetch(`https://blob.vercel-storage.com/${encodeURIComponent(fileName)}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'x-api-version': '7',
        'content-type': 'application/zip'
      },
      body: fileBuffer
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ Falha no upload:', response.status, response.statusText);
      console.error(errText);
      process.exit(1);
    }

    const result = await response.json();
    console.log('\n🚀 UPLOAD CONCLUÍDO COM SUCESSO!');
    console.log('--------------------------------------------------');
    console.log(`URL do Arquivo: ${result.url}`);
    
    // Log de auditoria
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    
    const logFile = path.join(logsDir, 'sdk-uploads.log');
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify({
      timestamp,
      filename: fileName,
      version,
      hash: fullHash,
      url: result.url,
      size: sizeBytes
    }) + '\n';
    
    fs.appendFileSync(logFile, logEntry);
    console.log(`📝 Registro adicionado ao log de auditoria: logs/sdk-uploads.log`);
    
    console.log('\n🔧 PRÓXIMOS PASSOS:');
    console.log('Copie e cole as seguintes variáveis no painel da Vercel (Project Settings > Environment Variables) e no seu .env.local:');
    console.log(`\nSDK_COMMAND_LINK=${result.url}`);
    console.log(`SDK_COMMAND_VERSION=${version}`);
    console.log(`SDK_COMMAND_HASH=${fullHash}`);
    console.log('--------------------------------------------------\n');

  } catch (error) {
    console.error('❌ Erro na requisição:', error);
    process.exit(1);
  }
}

uploadToBlob();
