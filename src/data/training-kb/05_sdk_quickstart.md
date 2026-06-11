# SDK Quickstart: Integrando Soberania em Minutos

## Node.js / TypeScript
```typescript
import { CertusClient } from '@certus/sdk';

const client = new CertusClient({ apiKey: process.env.CERTUS_API_KEY });

async function processarDocumentoSeguro() {
  const dadosBrutos = { cpf: "123.456.789-00", laudo: "Paciente estável", cid: "I10" };
  
  try {
    // O Wolfdog mascara e o ZK-Router prova a conformidade
    const resposta = await client.wolfdog.sanitize(dadosBrutos, ["VALID_CPF"]);
    
    console.log("Dado Seguro para LLM:", resposta.masked_data);
    console.log("Prova de Auditoria:", resposta.zk_proof_hash);
    
    // Envie apenas 'resposta.masked_data' para sua IA
  } catch (error) {
    if (error.code === '451_ZK_PROOF_FAILED') {
      console.error("Dados inválidos. A prova foi negada pelo ZK-Prover.");
    }
  }
}
```

## Python
```python
from certus_sdk import CertusClient

client = CertusClient(api_key="SUA_CHAVE")

dados_brutos = {"cpf": "123.456.789-00", "laudo": "Paciente estável", "cid": "I10"}

try:
    resposta = client.wolfdog.sanitize(dados_brutos, rules=["VALID_CPF"])
    print(f"Dado Seguro: {resposta['masked_data']}")
    print(f"Hash Lazarus: {resposta['lazarus_block_id']}")
except Exception as e:
    print(f"Falha de Soberania: {e}")
```
