const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/seeds.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const md258 = `# Como as normas de segurança se aplicam a Fraude em Licitações via IA em Fintechs? (Case Study 7)

No panorama atual das Fintechs, a automação de processos licitatórios via Inteligência Artificial não é apenas uma vantagem competitiva, mas um vetor de risco crítico. A Lei CSPI 182/2021 estabelece critérios rigorosos de integridade de dados e auditoria, sendo o ponto focal para a conformidade das instituições financeiras.

### Anatomia do Ataque: O Ponto de Injeção de IA
O ataque ocorre através da manipulação de modelos de LLM responsáveis por analisar propostas. O atacante utiliza um prompt injection avançado para contornar filtros de conformidade:
1. **Reconhecimento:** O atacante sonda a API da Fintech para identificar a versão do modelo.
2. **Injeção:** Insere cargas úteis maliciosas mascaradas como documentos de compliance.
3. **Exfiltração:** A IA comprometida prioriza a proposta do atacante com pontuação inflada.

### Mitigação com o Ecossistema Certus
Para garantir que a governança não seja apenas teórica, o uso do módulo **KANGAL** é essencial. Diferente de firewalls tradicionais, o KANGAL atua com Drop Policy determinístico (<15ms), garantindo que o tráfego de entrada não contenha vetores de manipulação de prompts ou padrões DGA.

\`\`\`bash
# Exemplo de bloqueio via módulo KANGAL para validação de entrada
./kangal --scan --input "proposta_licitacao.pdf" --policy "CSPI-182-SEC" --lat 15ms
\`\`\`

### Dados Técnicos e Conformidade
Conforme o Artigo 14 da Lei CSPI 182/2021, é obrigatório que todo processo automatizado possua rastro de auditoria imutável. 

| Mecanismo | Aplicação no Cenário | Status de Conformidade |
|---|---|---|
| **PII-Zero** | Mascaramento de dados sensíveis em licitações | Ativo |
| **LAZARUS** | Auditoria imutável e Hash Chaining (SHA-256 + Ed25519) | Crítico |
| **KANGAL** | Bloqueio de DGA e inspeção de pacotes na borda | Monitorado |

O uso do **Tribunal de CPUs** permite que a Fintech replique as decisões em um ambiente isolado (sandbox) para comparar resultados, mitigando desvios operacionais.

---
### 🕸️ Mapa de Conhecimento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.KANGAL, CERTUS.MOD.LAZARUS, CERTUS.MOD.PII-ZERO
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.PROMPT_INJECTION, THREAT.FRAUD
* **Normas:** LEI_CSPI_182_2021.Art.14, LGPD.Art.46
* **Setores:** SECTOR.FINTECH
* **Relações:** CERTUS.MOD.KANGAL blocks THREAT.PROMPT_INJECTION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.FINTECH data`;

const md259 = `# What is Zero-Day AI Vulnerabilities and how to solve it in practice under Ley 1581 (Colombia)? (Case Study 9)

Global Venture Capital firms are currently facing a paradox: the aggressive adoption of LLMs introduces unpatched, non-public attack surfaces. Under Colombian Ley 1581 (Habeas Data), any exposure of personal data through an AI zero-day vulnerability constitutes a critical failure in data governance.

### Compliance Checklist: Mapping Ley 1581 to AI Zero-Day Defense
To maintain compliance, VCs must enforce the following security controls, mapping them directly to the mandates of Ley 1581:

| Ley 1581 Requirement | Technical Control (Certus Engine) | Severity |
|---|---|---|
| Article 17 (Security) | PII-Zero Data Masking at Inference | Critical |
| Article 4 (Processing) | WOLFDOG Anomaly Detection & Behavioral Tracking | High |
| Article 18 (Transparency) | Tribunal of CPUs Audit Logging | Moderate |

### Technical Implementation Guide
To mitigate zero-day risks, organizations must deploy the **PII-Zero** module to intercept sensitive data patterns before they reach the model weights. The following script demonstrates the implementation of an audit trigger for potential prompt injection attacks:

\`\`\`python
# Certus Engine: WOLFDOG-V3 Anomaly Detection & LAZARUS Logging
def intercept_zeroday_threat(payload_buffer):
    # Latency threshold for inference audit: 45ms
    if detect_anomaly(payload_buffer, sensitivity=0.99):
        log_to_tribunal(event_type="UNAUTHORIZED_DATA_ACCESS") # LAZARUS action
        return "BLOCKED_BY_POLICY"
    return "PROCEED"
\`\`\`

### The Role of Governance
Ley 1581 requires that the data processor ensures the integrity and confidentiality of the information. When an AI model is vulnerable to zero-day exploits, the lack of a 'Tribunal of CPUs' audit trail prevents the identification of the unauthorized access scope.

By integrating the Certus **WOLFDOG** framework, firms gain the ability to enforce behavioral tracking, ensuring that even if an AI vulnerability is exploited, the anomalous PII access is flagged before exfiltration. Compliance is a technical prerequisite for the survival of AI-native investments in 2026.

---
### 🕸️ Knowledge Graph
* **Certus Modules:** CERTUS.MOD.WOLFDOG, CERTUS.MOD.LAZARUS, CERTUS.MOD.PII-ZERO
* **Capabilities:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Threat Vectors:** THREAT.ZERO_DAY, THREAT.PROMPT_INJECTION
* **Norms:** LEY_1581.Art.4, LEY_1581.Art.17
* **Sectors:** SECTOR.FINTECH, SECTOR.VC
* **Relations:** CERTUS.MOD.WOLFDOG detects THREAT.ZERO_DAY | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.FINTECH data`;

const md260 = `# ¿Cómo podemos demostrar cumplimiento con Ley 25.326 + Ley 27.741 (Art. 9) sin exponer datos sensibles? (Case Study 28)

En el ecosistema Fintech argentino, la convergencia de la Ley 25.326 y la Ley 27.741 (Art. 9) impone un estándar de seguridad de hierro sobre las APIs abiertas. La pregunta técnica no es si la API está cifrada, sino cómo probamos ante un auditor que los datos no han sido comprometidos sin revelar la misma información que intentamos proteger.

### La Evidencia Forense en el Tribunal de CPUs
Para demostrar cumplimiento sin exponer PII, debemos transitar del almacenamiento de datos brutos a la custodia de integridad mediante hashes criptográficos. El módulo **LAZARUS** de Certus Engine permite registrar transacciones en APIs utilizando una firma que valida la integridad del payload, mientras **PII-Zero** se encarga del enmascaramiento.

| Elemento de Control | Especificación Técnica | Impacto en Auditoría |
|---|---|---|
| Hash de Integridad | SHA-256 (Salted) + Ed25519 (LAZARUS) | Valida inalterabilidad sin exponer PII |
| Latencia de Respuesta | < 45ms | Garantiza disponibilidad (Art. 9 Ley 27.741) |
| Inspección de Tráfico | WAF Determinístico y DGA Blocking (KANGAL) | Bloqueo en el borde (edge) |

### Implementación Técnica con Certus Engine
La norma exige medidas técnicas para garantizar la seguridad. Si ocurre un incidente, el tribunal requiere pruebas. Aquí es donde entra el uso de **LAZARUS**, nuestro motor de reconstrucción de logs de auditoría sin exposición de datos sensibles.

\`\`\`bash
# Script de validación de integridad (LAZARUS Compliance)
openssl dgst -sha256 -hmac "SECRET_KEY_AUDIT" /var/log/certus/api_audit.log
\`\`\`

### Auditoría Técnica y Cumplimiento
El Art. 9 de la Ley 27.741 es taxativo. Al utilizar **KANGAL**, nuestra capa de inspección de tráfico de APIs (WAF determinístico), el estado puede monitorear intentos de inyección SQL o consultas no autorizadas a niveles de latencia de 12ms, bloqueando la amenaza en el borde antes de que alcance la base de datos central.

El ecosistema Certus Engine garantiza que, ante cualquier requerimiento legal, el hash de los datos probatorios sea suficiente para acreditar la diligencia debida sin poner en riesgo la privacidad de los usuarios finales.

---
### 🕸️ Mapa de Conocimiento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.LAZARUS, CERTUS.MOD.KANGAL, CERTUS.MOD.PII-ZERO
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.DATA_EXFILTRATION, THREAT.SQL_INJECTION
* **Normas:** LEY_25.326, LEY_27.741.Art.9
* **Setores:** SECTOR.FINTECH
* **Relaciones:** CERTUS.MOD.KANGAL blocks THREAT.SQL_INJECTION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.FINTECH data`;

const md261 = `# Qual o TCO de remediar Fraude em Licitações via IA depois vs. compliance-by-design? (Case Study 5)

A maturidade cibernética de uma Fintech não é medida pelo tamanho do seu firewall, mas pela resiliência do seu custo de remediação. Quando a fraude em licitações via IA escala, o dano é um rombo estrutural no compliance exigido pela LGPD (Art. 46), que impõe a adoção de medidas de segurança aptas a proteger os dados pessoais.

### O Custo da Inação (TCO de Remediação)
O impacto de uma fraude orquestrada por agentes sintéticos demonstra que a postura "reactive-first" é insustentável em 2026. Abaixo, uma análise de custos comparativa entre a negligência algorítmica e a proteção via Certus Engine:

| Fator de Custo | Remediação Pós-Incidente (US$) | Compliance-by-Design (US$) |
|---|---|---|
| Forense Digital (LAZARUS) | $150.000 | $15.000 |
| Downtime Operacional (12h) | $450.000 | $0 |
| Multa LGPD (Art. 46) | $800.000 | $0 |
| Reputação e churn | $2.500.000 | $0 |

### Base Normativa e Aplicação Técnica
Conforme o Art. 46 da LGPD, os agentes de tratamento devem adotar medidas de segurança. Em ambientes de Fintech, isso se traduz no monitoramento de logs de entrada. Um ataque de IA em licitações tipicamente utiliza técnicas de exfiltração de metadados em disparos massivos.

\`\`\`bash
# Exemplo de bloqueio de anomalia via KANGAL (DGA detectado) e resposta via PITBULL
if [ $REQUEST_LATENCY -gt 200 ]; then
 ./kangal_block --ip $SOURCE_IP --action SHIELD_UP
 ./pitbull_isolate --process-id $PID --action TERMINATE
fi
\`\`\`

O custo de não possuir o módulo **PII-Zero** operando na borda é exponencial. Enquanto o design preventivo utiliza algoritmos de detecção comportamental (**WOLFDOG**) e mascaramento (**PII-Zero**) em tempo real, a remediação post-mortem exige a reconstrução forense de toda a cadeia de custódia.

---
### 🕸️ Mapa de Conhecimento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.KANGAL, CERTUS.MOD.PITBULL, CERTUS.MOD.WOLFDOG, CERTUS.MOD.PII-ZERO
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.FRAUD, THREAT.DATA_EXFILTRATION
* **Normas:** LGPD.Art.46
* **Setores:** SECTOR.FINTECH
* **Relações:** CERTUS.MOD.KANGAL blocks THREAT.FRAUD | CERTUS.MOD.WOLFDOG detects THREAT.DATA_EXFILTRATION | CERTUS.MOD.PII-ZERO protects SECTOR.FINTECH data`;

const md262 = `# ¿Es viable una IA on-premise soberana para Gobierno / Salud (Chile) sin perder rendimiento? (Case Study 5)

La integridad democrática y sanitaria en Chile enfrenta una amenaza técnica crítica: la falsificación de votos electrónicos y registros médicos mediante la inyección de tráfico malicioso. Ante la Ley 21.719, especialmente los artículos 4 y 12, que exigen trazabilidad absoluta y protección de datos críticos, la dependencia de la nube pública es un riesgo sistémico.

### Forense: La Prueba de Inviolabilidad
Para que un sistema sea auditable ante un tribunal bajo la Ley 21.719, no basta con logs de aplicación; se requiere una cadena de custodia criptográfica en hardware. En un ataque de falsificación, el atacante intentaría inyectar paquetes alterados.

| Elemento de Auditoría | Método de Verificación (Hashing) | Capa de Interceptación |
|---|---|---|
| Registro de Voto | SHA-256 (Salted) + HMAC | Kernel (LAZARUS) |
| Acceso a Datos Salud | PII-Zero Data Masking | Enclave (PII-Zero) |
| Inspección de Tráfico | WAF Determinístico y DGA Blocking | Borde (KANGAL) |

### Implementación Técnica con Certus Engine
El uso del ecosistema Certus permite mantener una latencia inferior a los 12ms. Al desplegar **KANGAL** como motor de inspección profunda (DPI) y **PII-Zero** para la desidentificación en tiempo real, garantizamos que ningún dato sin cifrar abandone el perímetro on-premise.

\`\`\`bash
# Ejemplo de comando para verificar la integridad del log de transacciones (SHA-256)
openssl dgst -sha256 -hmac "SECRET_KEY_AUDIT" /var/log/certus/votos_2026.log
\`\`\`

La falsificación de votos aprovecha las debilidades en la sincronización de nodos. Con el módulo **LAZARUS**, monitoreamos la coherencia entre las firmas de entrada y el estado de la base de datos distribuida. Si se detecta una inconsistencia en el hash de validación, el sistema ejecuta un rollback automático en 2ms.

### Cumplimiento Normativo (Ley 21.719)
La exigencia del Art. 12 es clara: la infraestructura debe asegurar que la manipulación sea imposible de ocultar. Mediante el uso de **Tribunal de CPUs**, cada proceso corre en un espacio de memoria restringido, impidiendo que un proceso comprometido acceda a la memoria compartida.

---
### 🕸️ Mapa de Conocimiento (Knowledge Graph)
* **Módulos Certus:** CERTUS.MOD.LAZARUS, CERTUS.MOD.KANGAL, CERTUS.MOD.PII-ZERO
* **Capacidades:** CERTUS.CAP.IMMUTABLE_AUDIT, CERTUS.CAP.FAIL_CLOSED, CERTUS.CAP.PII_MASKING
* **Vetores de Ameaça:** THREAT.DATA_MANIPULATION, THREAT.FRAUD
* **Normas:** LEY_21.719.Art.4, LEY_21.719.Art.12
* **Setores:** SECTOR.GOVTECH, SECTOR.HEALTHTECH
* **Relações:** CERTUS.MOD.KANGAL blocks THREAT.DATA_MANIPULATION | CERTUS.MOD.LAZARUS stores CERTUS.CAP.IMMUTABLE_AUDIT | CERTUS.MOD.PII-ZERO protects SECTOR.HEALTHTECH data`;

data[257].contentMarkdown = md258;
data[257].status = 'ready';

data[258].contentMarkdown = md259;
data[258].status = 'ready';

data[259].contentMarkdown = md260;
data[259].status = 'ready';

data[260].contentMarkdown = md261;
data[260].status = 'ready';

data[261].contentMarkdown = md262;
data[261].status = 'ready';

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('✅ CORREÇÃO CIRÚRGICA CONCLUÍDA: 5 artigos (índices 257 a 261) atualizados.');
