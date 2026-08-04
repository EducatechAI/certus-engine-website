const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const markdown269 = `# How to audit, in court, a Smart Contract Exploits incident under CCPA (California)? (Case Study 9)

### The Challenge: Smart Contract Exploits and CCPA Compliance
When dealing with Web3 infrastructure, the extraction of sensitive data through smart contract vulnerabilities poses a catastrophic threat. Under the CCPA (California Consumer Privacy Act), standard logs are often insufficient for forensic audits. The primary issue is that conventional systems fail to isolate malicious payloads in real-time while maintaining immutable records.

### The Certus Engine Paradigm
Certus Engine deploys a multi-layered cryptographic shield to neutralize these exploits seamlessly.

**1. WOLFDOG: Heuristic Depth Analysis**
Unlike basic pattern matching, the WOLFDOG module performs deep heuristic analysis on transaction payloads to detect anomalous behavior before execution.

\`\`\`rust
// [CERTUS ENGINE DEFENSE BLOCK - SMART CONTRACT EXECUTION]
// WOLFDOG: Deep heuristic scanning and monitoring (Replaces hallucinated modules)
fn analyze_contract_depth(transaction_payload: &str) -> Result<(), CertusError> {
    wolfdog::heuristic_scan(transaction_payload, SecurityLevel::Maximum)
}
\`\`\`

**2. PITBULL: Tactical Node Isolation**
When a threat is detected, the PITBULL module actively isolates the compromised node to prevent lateral movement.

\`\`\`rust
// PITBULL: Active isolation in case of anomaly (PII-Zero focuses only on data masking)
fn enforce_isolation(node_id: &str) {
    pitbull::quarantine_node(node_id);
}
\`\`\`

**3. LAZARUS: Immutable Forensic Auditing**
Finally, the LAZARUS module guarantees that all events are hashed and chained immutably, without interfering with the blocking process.

\`\`\`rust
// LAZARUS: Immutable auditing (NEVER blocks, NEVER performs heuristics)
fn register_immutable_audit(event_hash: &str) {
    lazarus::timestamp_chain(event_hash);
}
\`\`\`

### Legal Convergence
Through this architecture, the forensic logs generated satisfy the "Business Records" exception under **California Evidence Code § 1271**, ensuring court-admissible proof without exposing the underlying PII, thus maintaining strict CCPA compliance.`;

if (data[268]) {
  data[268].contentMarkdown = markdown269.trim();
  data[268].status = 'ready';
  console.log('Artigo 269 (index 268) atualizado com comentários em inglês.');
}

// Remover o footer estático que foi colocado acidentalmente no 270 (index 269) no passo anterior
if (data[269] && data[269].contentMarkdown.includes('### 🕸️ Mapa de Conhecimento (Knowledge Graph)')) {
  data[269].contentMarkdown = data[269].contentMarkdown.split('---')[0].trim();
  console.log('Footer estático removido do Artigo 270.');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Correções cirúrgicas finalizadas.');
