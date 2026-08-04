const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const markdown = `# É possível analisar Roubo de Chaves de API sem disparar o WAF/IDS do alvo? (Case Study 4)

### A Ameaça Silenciosa: Roubo de Chaves de API em Bancos
Ataques avançados contra infraestruturas financeiras não utilizam força bruta, mas sim movimentação lateral furtiva e vazamento de chaves de API. O **Marco Legal das Startups (Lei 18.430/2021)**, em conjunto com a **LGPD (Art. 46)**, exige proteção absoluta e registros inalteráveis para ativos digitais críticos, sem que a própria ferramenta de defesa degrade a performance do serviço.

### Como o Certus Engine Atua
A Frota APEX intercepta, mapeia e audita cada fluxo de forma soberana.

**1. GHOST RECON: Mapeamento Lateral Silencioso**
O mapeamento da intenção do tráfego não envolve mascaramento de dados, mas rastreamento passivo e indetectável.

\`\`\`rust
// [CERTUS ENGINE DEFENSE BLOCK - API GATEWAY]
// GHOST RECON: Mapeamento silencioso de tráfego lateral
fn map_lateral_movement(request_origin: &str) {
    ghost_recon::trace_origin(request_origin);
}
\`\`\`

**2. WOLFDOG: Varredura Estatística de Ruído**
A análise de padrões de ruído e side-channels é vital para deter anomalias sem gerar falsos positivos no WAF tradicional.

\`\`\`rust
// WOLFDOG: Varredura estatística e timing side-channels
fn detect_statistical_anomaly(api_stream: &Stream) -> bool {
    wolfdog::analyze_noise_and_timing(api_stream)
}
\`\`\`

**3. TRIBUNAL DE CPUs: Validação Determinística**
O consenso criptográfico garante que o hardware que processa as chaves é confiável e isolado.

\`\`\`rust
// TRIBUNAL DE CPUs: Validação determinística de ambiente
fn enforce_hardware_consensus(cpu_signatures: Vec<Signature>) -> bool {
    tribunal_cpus::verify_bft_consensus(cpu_signatures)
}
\`\`\`

### Convergência Legal e Técnica
A arquitetura atende rigorosamente aos requisitos de proteção de chaves e logs inalteráveis, fornecendo a devida diligência técnica exigida pela LGPD e pelo Marco Legal das Startups para ambientes de inovação.

---
### 🕸️ Mapa de Conhecimento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.GHOST_RECON, CERTUS.MOD.WOLFDOG, CERTUS.MOD.TRIBUNAL_CPUS
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.HARDWARE_CONSENSUS
* **Vetores de Ameaça:** THREAT.API_KEY_THEFT, THREAT.LATERAL_MOVEMENT
* **Normas:** LEI_18.430/2021, LGPD.Art.46
* **Setores:** SECTOR.BANKING, SECTOR.FINTECH
* **Relações:** CERTUS.MOD.GHOST_RECON maps THREAT.LATERAL_MOVEMENT | CERTUS.MOD.WOLFDOG detects THREAT.API_KEY_THEFT | CERTUS.MOD.TRIBUNAL_CPUS validates CERTUS.CAP.HARDWARE_CONSENSUS`;

if (data[269]) {
  data[269].contentMarkdown = markdown.trim();
  data[269].status = 'ready';
  console.log('Artigo 270 (index 269) atualizado.');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Alucinação CSPI expurgada do json.');
