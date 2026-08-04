const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Inject Article 269 (index 268)
const md269 = `
## The Challenge: Smart Contract Exploits and CCPA Compliance

When dealing with Web3 infrastructure, the extraction of sensitive data through smart contract vulnerabilities poses a catastrophic threat. Under the CCPA (California Consumer Privacy Act), standard logs are often insufficient for forensic audits.

The primary issue is that conventional systems fail to isolate malicious payloads in real-time while maintaining immutable records.

## The Certus Engine Paradigm

Certus Engine deploys a multi-layered cryptographic shield to neutralize these exploits seamlessly.

### 1. WOLFDOG: Heuristic Depth Analysis
Unlike basic pattern matching, the WOLFDOG module performs deep heuristic analysis on transaction payloads.

\`\`\`rust
// [CERTUS ENGINE DEFENSE BLOCK - SMART CONTRACT EXECUTION]

// WOLFDOG: Heurística e monitoramento de profundidade (Substitui o alucinado "Presa")
fn analyze_contract_depth(transaction_payload: &str) -> Result<(), CertusError> {
    wolfdog::heuristic_scan(transaction_payload, SecurityLevel::Maximum)
}
\`\`\`

### 2. PITBULL: Tactical Node Isolation
When a threat is detected, the PITBULL module actively isolates the compromised node.

\`\`\`rust
// PITBULL: Isolamento ativo em caso de anomalia (PII-Zero foca apenas em dados)
fn enforce_isolation(node_id: &str) {
    pitbull::quarantine_node(node_id);
}
\`\`\`

### 3. LAZARUS: Immutable Forensic Auditing
Finally, the LAZARUS module guarantees that all events are hashed and chained immutably.

\`\`\`rust
// LAZARUS: Auditoria imutável (NUNCA bloqueia, NUNCA faz heurística)
fn register_immutable_audit(event_hash: &str) {
    lazarus::timestamp_chain(event_hash);
}
\`\`\`

## Legal Convergence
Through this architecture, the forensic logs generated satisfy the "Business Records" exception under California Evidence Code § 1271, ensuring court-admissible proof without exposing the underlying PII.
`;

// Inject Article 270 (index 269)
const md270 = `
## A Ameaça Silenciosa: Roubo de Chaves de API em Bancos

Ataques avançados contra infraestruturas financeiras não utilizam força bruta, mas sim movimentação lateral furtiva e vazamento de chaves de API. A Lei CSPI 182/2021 exige proteção absoluta e registros inalteráveis para essas chaves.

## Como o Certus Engine Atua

A Frota APEX intercepta, mapeia e audita cada fluxo sem comprometer o WAF alvo.

### 1. GHOST RECON: Mapeamento Lateral Silencioso
O mapeamento da intenção do tráfego não envolve mascaramento de dados, mas rastreamento ativo pelo Ghost Recon.

\`\`\`rust
// [CERTUS ENGINE DEFENSE BLOCK - API GATEWAY]

// GHOST RECON: Mapeamento silencioso de tráfego lateral (Substitui "PII-Zero mascarando intenção")
fn map_lateral_movement(request_origin: &str) {
    ghost_recon::trace_origin(request_origin);
}
\`\`\`

### 2. WOLFDOG: Varredura Estatística de Ruído
A análise de padrões de ruído é vitalícia para deter anomalias.

\`\`\`rust
// WOLFDOG: Varredura estatística e timing side-channels (Substitui LAZARUS varredura)
fn detect_statistical_anomaly(api_stream: &Stream) -> bool {
    wolfdog::analyze_noise_and_timing(api_stream)
}
\`\`\`

### 3. TRIBUNAL DE CPUs: Validação Determinística
O consenso criptográfico garante que o hardware que processa as chaves é confiável.

\`\`\`rust
// TRIBUNAL DE CPUs: Validação determinística de ambiente (Sem análise comportamental)
fn enforce_hardware_consensus(cpu_signatures: Vec<Signature>) -> bool {
    tribunal_cpus::verify_bft_consensus(cpu_signatures)
}
\`\`\`

## Convergência Legal e Técnica
A arquitetura atende rigorosamente aos requisitos de proteção de chaves e logs inalteráveis da CSPI 182/2021 (Art. 14).
`;

if (data[268]) {
  data[268].contentMarkdown = md269.trim();
  data[268].status = 'ready';
  console.log('268 injetado');
}
if (data[269]) {
  data[269].contentMarkdown = md270.trim();
  data[269].status = 'ready';
  console.log('269 injetado');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Injeção manual concluída.');
