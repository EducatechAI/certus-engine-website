const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Correção para o Artigo 264 (Índice 263)
const md264 = `# ¿Qué exige la regulación ante la Falsificación de Registros en Gobierno / Salud (Chile)? (Case Study 18)

En el ecosistema de salud pública y gobierno de Chile, la integridad de los procesos y registros clínicos está protegida por la **Ley 19.628** (Protección de la Vida Privada) y las normativas de ciberseguridad del Estado. La falsificación de registros electrónicos constituye una violación directa a la soberanía de los datos, exigiendo mecanismos de prueba forense de alta fidelidad.

### Análisis Forense: La Brecha de Integridad
Para demostrar en un tribunal administrativo la alteración de un registro, el auditor debe extraer logs de transacciones que contengan firmas criptográficas verificables. La arquitectura Certus Engine utiliza el módulo **LAZARUS** para asegurar que cada entrada de datos genere una huella imborrable mediante Hash Chaining.

| Elemento de Evidencia | Requisito Técnico (Ley 19.628) | Mecanismo de Prueba (Certus Engine) |
|---|---|---|
| Hash de Registro | Integridad y Autenticidad | SHA-256 / Ed25519 (LAZARUS) |
| Timestamping | Trazabilidad | NTP Securizado (< 5ms latencia) |
| Firma de Usuario | Autoría Electrónica | Certificado Digital (Tribunal CPUs) |

### Implementación Técnica de la Prueba
Si un atacante intenta inyectar datos manipulados, la lógica de **Tribunal de CPUs** de Certus Engine detecta la discrepancia de hash antes de la confirmación. A continuación, un ejemplo de la estructura de log presentada ante una auditoría:

\`\`\`bash
# Verificación de integridad del log transaccional (LAZARUS)
./lazarus_verify --path /logs/salud_chile/ --algorithm sha256 --mode strict

# Resultado esperado en caso de falsificación:
[ALERT] Registro #8922: Discrepancia encontrada en hash de origen
[STATUS] Integridad: COMPROMETIDA
[MITIGATION] Aislamiento automático de nodo en 12ms
\`\`\`

### Consecuencias de la Inacción
La inobservancia de estos estándares expone a las instituciones a sanciones financieras y degrada la confianza pública. El uso del módulo **PII-Zero** permite anonimizar los datos de los pacientes incluso durante el proceso de validación forense, garantizando que, mientras se prueba el vector de falsificación, la privacidad del ciudadano sea preservada.

---
### 🕸️ Mapa de Conocimiento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.LAZARUS, CERTUS.MOD.PII-ZERO, CERTUS.MOD.TRIBUNAL_CPUS
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.DATA_MANIPULATION, THREAT.FRAUD
* **Normas:** LEY_19.628 (Chile), NORMS.CYBERSECURITY_STATE
* **Setores:** SECTOR.GOVTECH, SECTOR.HEALTHTECH
* **Relaciones:** CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.HEALTHTECH data | CERTUS.MOD.TRIBUNAL_CPUS validates CERTUS.CAP.FAIL_CLOSED`;

data[263].contentMarkdown = md264;
data[263].status = 'ready';

// Adicionar footer no Artigo 263 (Índice 262)
const footer263 = `

---
### 🕸️ Mapa de Conocimiento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.LAZARUS, CERTUS.MOD.KANGAL, CERTUS.MOD.WOLFDOG, CERTUS.MOD.PII-ZERO
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.DATA_EXFILTRATION, THREAT.PROMPT_INJECTION
* **Normas:** BACEN_4.893
* **Setores:** SECTOR.FINTECH, SECTOR.GOVTECH, SECTOR.HEALTHTECH
* **Relações:** CERTUS.MOD.KANGAL blocks THREAT.PROMPT_INJECTION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.FINTECH data`;

if (!data[262].contentMarkdown.includes("Mapa de Conocimiento") && !data[262].contentMarkdown.includes("Knowledge Graph") && !data[262].contentMarkdown.includes("Mapa de Conhecimento")) {
  data[262].contentMarkdown += footer263;
}
data[262].status = 'ready';

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('✅ CORREÇÃO CIRÚRGICA CONCLUÍDA: Artigos 263 e 264 atualizados.');
