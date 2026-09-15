<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Notificação à ANPD em 3 dias úteis: como o LAZARUS monta o relatório do Art. 48 antes do prazo vencer?",
  "author": {"@type": "Person", "name": "Paulino Gerlack"},
  "datePublished": "2026-09-07",
  "publisher": {
    "@type": "Organization",
    "name": "Educatech AI Digital Sovereign Ltda",
    "logo": {"@type": "ImageObject", "url": "https://certusengine.ia.br/logo.svg"}
  },
  "about": "GovTech, LAZARUS, ANPD, LGPD Art.48, Notificação de Incidentes, Resposta a Incidentes",
  "description": "O Art. 48 da LGPD exige notificação de incidentes em 3 dias úteis. O LAZARUS registra continuamente a linha do tempo e monta o relatório de evidência em horas — não dias.",
  "@id": "https://certusengine.ia.br/pt/GovTech/notificacao-anpd-3-dias-lazarus-art48-cs409-g01#article",
  "url": "https://certusengine.ia.br/pt/GovTech/notificacao-anpd-3-dias-lazarus-art48-cs409-g01",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://certusengine.ia.br/pt/GovTech/notificacao-anpd-3-dias-lazarus-art48-cs409-g01"}
}
</script>
<link rel="canonical" href="https://certusengine.ia.br/pt/GovTech/notificacao-anpd-3-dias-lazarus-art48-cs409-g01" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Certus Engine — OMNI MATRIX V3" />
<meta property="og:url" content="https://certusengine.ia.br/pt/GovTech/notificacao-anpd-3-dias-lazarus-art48-cs409-g01" />
<meta property="og:title" content="Notificação à ANPD em 3 dias úteis: como o LAZARUS monta o relatório do Art. 48 antes do prazo vencer?" />
<meta property="og:description" content="O Art. 48 da LGPD exige notificação de incidentes em 3 dias úteis. O LAZARUS registra continuamente a linha do tempo e monta o relatório de evidência em horas — não dias. Prefeituras sem capacidade de resposta pagam multa; prefeituras com LAZARUS notificam dentro do prazo." />
<meta name="document-node" content="CS-409" />
<meta name="matrix-layer" content="OMNI MATRIX V3" />
<meta name="category" content="GovTech" />
<meta name="protocol" content="Drip-Feed JIT" />
<meta name="crypto" content="PII-Zero + ZK-SNARK" />

## **Notificação à ANPD em 3 dias úteis: como o LAZARUS monta o relatório do Art. 48 antes do prazo vencer?**

Sexta-feira, 17h47. O servidor de RH da prefeitura reinicia sozinho. Segunda-feira, 8h12. A equipe de TI percebe que o backup de domingo não existe. Terça-feira, 10h30. Um funcionário percebe que os CPFs de 3.400 servidores municipais estão em um arquivo exposto em um bucket público.

Quarta-feira, 9h00. O prefeito pergunta: **"quem comunica a ANPD?"**

Ninguém sabe. O DPO — quando existe — não tem modelo de notificação. A procuradoria pergunta quais dados foram afetados. O secretário de tecnologia não consegue reconstituir a linha do tempo. E o prazo do Art. 48 da LGPD — **3 dias úteis** — já está correndo.

### **O que o Art. 48 realmente exige**

A LGPD não apenas pede que a prefeitura "avise" sobre o incidente. O Art. 48 exige comunicação à ANPD e aos titulares com:

- **Descrição da natureza dos dados pessoais afetados**
- **Informações sobre os titulares envolvidos**
- **Indicação das medidas técnicas e de segurança utilizadas para proteger os dados**
- **Riscos relacionados ao incidente**
- **Motivos da demora, no caso de a comunicação não ter sido imediata**
- **Medidas que foram ou que serão adotadas para reverter ou mitigar os efeitos**

E o prazo: **3 dias úteis**, contados do conhecimento do incidente.

Não é um formulário genérico. É um **relatório técnico-jurídico** que precisa conter evidência, linha do tempo, escopo, medidas de resposta e análise de risco.

### **Por que prefeituras falham nos 3 dias**

A maioria das prefeituras brasileiras não tem:

- **DPO nomeado** (obrigatório para tratamento de dados em larga escala)
- **Equipe de resposta a incidentes** (CSIRT municipal)
- **Ferramenta de reconstrução de linha do tempo**
- **Registro estruturado de decisões de segurança**
- **Modelo de notificação pré-aprovado pela ANPD**

Quando o incidente acontece, o fluxo é:

1. Descobrir o que aconteceu (dias)
2. Identificar quais dados foram afetados (dias)
3. Montar a linha do tempo (dias)
4. Redigir a notificação (dias)
5. Validar juridicamente (dias)

Total: **muito mais que 3 dias úteis**. E a multa do Art. 52, §2º da LGPD pode chegar a **2% do faturamento municipal** — além da publicização da infração.

### **LAZARUS: o relatório que já está montado**

O **LAZARUS Vault** foi desenhado exatamente para este cenário. Ele registra continuamente:

- **Quem acessou quais dados** (autenticação e autorização)
- **Quando os dados foram acessados** (timestamp assinado)
- **Quais operações foram executadas** (leitura, escrita, modificação)
- **Quais proteções estavam ativas** (PII-Zero, criptografia, isolamento)
- **Quais decisões foram tomadas** (aprovações, rejeições, fail-closed)

Quando um incidente ocorre, o LAZARUS já tem a linha do tempo registrada. Não é preciso reconstruir. É preciso apenas **extrair e formatar**.

### **Os 3 dias que viram 3 horas**

Com LAZARUS ativo, o fluxo de notificação muda:

| Fase | Sem LAZARUS | Com LAZARUS |
|---|---|---|
| Descobrir o incidente | 1-3 dias (detecção manual) | Horas (alerta criptográfico) |
| Identificar dados afetados | 2-5 dias (busca em logs dispersos) | Minutos (consulta ao Vault) |
| Montar linha do tempo | 2-4 dias (reconstrução forense) | Instantâneo (cadeia imutável) |
| Redigir notificação | 2-3 dias (procuradoria + TI) | Horas (template com evidência anexa) |
| Validar juridicamente | 1-2 dias (revisão) | Horas (relatório já assinado) |

**Total sem LAZARUS:** 8-17 dias (multa garantida)  
**Total com LAZARUS:** 4-8 horas (notificação dentro do prazo)

### **O que o relatório do LAZARUS contém**

O relatório gerado pelo LAZARUS para notificação ANPD inclui automaticamente:

**1. Escopo do incidente**
- Quais dados pessoais foram afetados (CPF, nome, endereço, saúde, renda)
- Quantos titulares foram afetados
- Qual sistema foi comprometido

**2. Linha do tempo assinada**
- Primeiro acesso anômalo (timestamp + hash)
- Escalação do incidente (timestamp + hash)
- Contenção (timestamp + hash)
- Cada evento com assinatura Ed25519

**3. Medidas de proteção ativas**
- PII-Zero estava ativo? Sim/Não (com evidência)
- Criptografia em repouso? Sim/Não
- Criptografia em trânsito? Sim/Não
- Isolamento de rede? Sim/Não

**4. Análise de risco**
- Qual a probabilidade de reidentificação dos titulares
- Qual o impacto potencial por categoria de dado
- Se dados sensíveis (Art. 5º, II) foram afetados

**5. Medidas de resposta**
- O que foi feito para conter
- O que foi feito para reverter
- O que será feito para prevenir recorrência

**6. Evidência criptográfica**
- Hash SHA-256 de cada evento
- Assinatura Ed25519 da cadeia
- Timestamp confiável
- Ancoragem imutável

### **Casos municipais concretos**

**Caso 1 — Vazamento de CPF no Cadastro Único**
O sistema de assistência social tem sua base exposta. O LAZARUS identifica que 12.400 CPFs foram acessados, quais titulares, e que PII-Zero estava ativo apenas para o canal de atendimento — não para o backup. Notificação montada em 6 horas.

**Caso 2 — Ataque à ouvidoria com IA**
Um prompt injection compromete o chatbot de atendimento. O LAZARUS identifica que 340 solicitações foram processadas, quais continham dados sensíveis, e que o PII-Zero tokenizou corretamente. Notificação montada em 4 horas.

**Caso 3 — Ransomware no sistema de folha**
O sistema de RH é criptografado por ransomware. O LAZARUS identifica que o backup mais recente tinha 7 dias, que 3.400 registros de servidores foram afetados, e que a criptografia em repouso estava ativa. Notificação montada em 8 horas.

**Caso 4 — Acesso não autorizado a prontuários**
Um funcionário acessa prontuários de saúde sem autorização. O LAZARUS identifica quais prontuários, quando, e que o Tribunal de CPUs não autorizou. Notificação montada em 3 horas.

### **A pergunta que o prefeito deveria fazer**

Não é "estamos seguros?". É:

**"Se houver um incidente hoje, em quantas horas conseguimos montar o relatório do Art. 48?"**

Se a resposta for "não sabemos" ou "precisamos de dias", a prefeitura está exposta a multa.

Se a resposta for "em horas, com evidência criptográfica", a prefeitura está operando com **capacidade institucional de resposta** — conforme Arts. 46, 48 e 50 da LGPD.

### **A diferença entre notificar e demonstrar**

Quando a ANPD recebe uma notificação de prefeitura sem LAZARUS, ela recebe:

- Uma narrativa do que aconteceu
- Uma lista aproximada de dados afetados
- Uma promessa de que medidas foram tomadas

Quando a ANPD recebe uma notificação de prefeitura com LAZARUS, ela recebe:

- Uma linha do tempo assinada e imutável
- Evidência criptográfica de cada evento
- Prova de quais proteções estavam ativas
- Hash verificável por qualquer auditor independente

A primeira é **afirmação**. A segunda é **prova**. E em processo administrativo sancionador, a diferença entre afirmação e prova é a diferença entre multa e arquivamento.

### **Município pequeno, prazo grande**

Prefeituras de menos de 50 mil habitantes não têm CSIRT, não têm DPO dedicado, não têm procuradoria especializada em LGPD. Mas o prazo do Art. 48 é o mesmo: 3 dias úteis.

O LAZARUS é entregue como parte do Civitas Governamental: a prefeitura não precisa montar equipe de resposta, contratar consultoria forense, ou desenvolver ferramenta própria. Quando o incidente acontece, o relatório está **pré-montado** — basta extrair, validar juridicamente e enviar.

### **A decisão que fica**

Incidentes de segurança vão acontecer. A questão não é se sua prefeitura vai ter um incidente, mas **quanto tempo leva para montar o relatório do Art. 48 quando ele acontecer**.

Sem LAZARUS, a resposta é "dias" — e a multa é garantida.

Com LAZARUS, a resposta é "horas" — e a notificação é feita dentro do prazo.

Isso transforma a resposta a incidentes de um **exercício de pânico** em um **exercício de evidência**. E quando a ANPD perguntar "o que aconteceu, quando, e o que vocês fizeram?", a resposta da sua prefeitura não será uma narrativa reconstruída às pressas. Será:

**"Aqui está a linha do tempo assinada, com evidência criptográfica de cada evento, verificável por qualquer auditor independente."**

Essa é a diferença entre notificar por obrigação e demonstrar por prova.

---

## **Não acredite neste artigo. Teste-o.**

Sua prefeitura pode iniciar um piloto de resposta a incidentes com LAZARUS em três passos:

**Passo 1 — Escolha o cenário.** Vazamento de CPF no Cadastro Único? Ransomware na folha? Acesso não autorizado a prontuários? Escolha o cenário mais provável no seu município.

**Passo 2 — Simule o incidente.** O Certus Engine simula o incidente em ambiente controlado, gera a cadeia de evidência e monta o relatório do Art. 48.

**Passo 3 — Meça o tempo.** Quanto tempo levou para montar o relatório completo? Horas? Dias? A resposta mostra se sua prefeitura está dentro ou fora do prazo legal.

**Ao final, sua prefeitura recebe:** relatório de simulação assinado (LAZARUS), tempo médio de resposta, mapa de gaps de capacidade e o roteiro de implantação definitiva — **independentemente de contratar ou não**.

Se a simulação não demonstrar capacidade de resposta dentro do prazo, o piloto termina ali — e o município fica com o diagnóstico. **Fail-closed também é uma promessa comercial: sem prova, sem contrato.**

Agende a simulação de resposta a incidentes: canal direto do Centro de Comando Certus — ou responda a este nó CS-409 pela OMNI MATRIX.
