# API Reference: Certus Engine Core

## Autenticação
Todas as requisições devem incluir o header:
`x-certus-api-key: <SUA_CHAVE_DE_EMBASSADOR_OU_CLIENTE>`

## Endpoints Principais

### 1. `/api/v1/wolfdog/sanitize` (PII-Zero + ZK)
- **Método:** POST
- **Descrição:** Mascara dados sensíveis e gera prova ZK antes do processamento.
- **Body:** `{ "data": { "cpf": "123...", "nome": "João" }, "rules": ["AGE_GTE_18"] }`
- **Resposta (200 OK):** 
  ```json
  {
    "masked_data": { "cpf": "***.***.***-00", "nome": "***" },
    "zk_proof_hash": "sha256:a1b2c3...",
    "lazarus_block_id": "blk_998877"
  }
  ```

### 2. `/api/v1/lazarus/verify` (Auditoria)
- **Método:** GET
- **Descrição:** Verifica a integridade de um bloco de auditoria.
- **Query Params:** `?block_id=blk_998877`
- **Resposta (200 OK):** `{ "status": "IMMUTABLE", "chain_valid": true }`

## Códigos de Erro Soberanos
- `403 Immutable`: Tentativa de modificar ou acessar um recurso protegido por política de Drop (Kangal/Pitbull).
- `429 Rate Limit`: Limite de requisições excedido. O Sentinel ativou a proteção.
- `451 ZK Proof Failed`: Os dados de entrada não satisfazem as regras de negócio definidas. O Prover se recusou a gerar a prova (Soundness).
- `503 Circuit Breaker Open`: O Sentinel detectou anomalia de custo/latência e isolou o serviço para proteção.
