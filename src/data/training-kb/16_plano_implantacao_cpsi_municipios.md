# 🤝 PLANO DE IMPLANTAÇÃO TECNOLÓGICA E GOVERNANÇA DIGITAL (CPSI)

O plano de implantação sob o amparo da **Lei Complementar nº 182/2021 (Marco Legal das Startups)** por meio do **Contrato Público para Solução Inovadora (CPSI)** permite que prefeituras e órgãos públicos adquiram e testem o Certus Engine.

## 🎯 RESUMO EXECUTIVO
*   **Segurança Criptográfica e LGPD:** O sistema blinda a prefeitura contra apontamentos e multas da ANPD ou Tribunal de Contas do Estado (TCE) através de processos matematicamente auditáveis (PII-Zero e ZK-Proofs na borda).
*   **Soberania On-Premise:** O Certus roda diretamente nos servidores físicos da prefeitura (On-Premise), garantindo que dados de cidadãos permaneçam sob controle e jurisdição física municipal.
*   **Defesa Cibernética Ativa:** O *APEX Guardian* detecta comportamentos de ransomware e bloqueia exfiltração ou alteração de dados em menos de 50 milissegundos.

---

## 💡 DETALHAMENTO DO PACOTE GOV DIAMANTE

| Característica | Soluções Genéricas (Wrappers de IA) | Certus Engine (Infraestrutura de Estado) |
| :--- | :--- | :--- |
| **Privacidade (LGPD)** | Dados do cidadão vão para servidores fora do país. | **PII-Zero na borda.** O dado real nunca sai da prefeitura. |
| **Execução e Lógica** | Probabilística ("A IA sugere, o humano decide"). | **Determinística.** Tribunal de CPUs exige consenso e aplica *Fail-Closed*. |
| **Auditoria para TCE/MP** | Inexistente ou baseada em logs de texto editáveis. | **Provas Matemáticas.** Logs imutáveis assinados (SHA-256/Ed25519) prontos para o TCE. |
| **Defesa Cibernética** | Reativa (depende de antivírus de terceiros). | **Proativa.** Defesa comportamental isola ransomware em <50ms. |
| **Controle Orçamentário** | Fatura imprevisível baseada em uso indiscriminado. | **Circuit Breaker.** Teto financeiro travado via disjuntor algorítmico. |

---

## 🤝 MODELO DE CONTRATAÇÃO E CONTRAPARTIDAS (CPSI)
O CPSI permite contratação direta de PoCs inovadoras de até **R$ 1,6 milhão** por um período de até 24 meses.
*   **Contrapartida do Município:** dotação orçamentária para fomento inicial do piloto, cessão de servidores locais para o deploy on-premise, e comissão municipal de validação.
*   **Contrapartida da Educatech:** implantação do sistema, treinamento dos servidores e suporte de missão crítica com SLA de 99.9%.

### Conversão para Contrato Definitivo (Art. 14 da LC 182/2021)
Comprovado o sucesso da PoC no final do piloto, a prefeitura pode migrar diretamente para o Contrato de Fornecimento Definitivo por até 24 meses (prorrogáveis por mais 24), com valor limitado a até 5 vezes o valor do CPSI original, dispensando nova licitação.
