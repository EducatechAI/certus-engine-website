# Matriz de Competidores: Por Que o Certus?

O mercado está cheio de "wrappers" de IA que adicionam uma camada fina de segurança. O Certus é uma arquitetura de soberania de ponta a ponta.

| Recurso / Capacidade | Wrappers Genéricos (Ex: LangChain básico) | Firewalls de IA de 3ºs (Ex: Guardrails AI) | **Certus Engine (Frota Apex)** |
| :--- | :--- | :--- | :--- |
| **PII-Zero na Borda** | Frequentemente pós-processamento (risco de vazamento) | Regex básico, fácil de burlar | **Wolfdog**: NER avançado + mascaramento criptográfico pré-LLM |
| **Defesa contra Jailbreak** | Baseada em listas de palavras-chave (alto falso positivo) | Heurística simples | **Pitbull**: Análise semântica + escalonamento progressivo (Rate Limit → Ban) |
| **Auditoria** | Logs de texto editáveis no servidor do cliente | Logs centralizados no SaaS do fornecedor | **Lazarus**: Hash Chaining imutável (SHA-256 + Ed25519) |
| **Prova de Conformidade** | Nenhuma (apenas "confie em nós") | Relatórios PDF estáticos | **ZK-Router**: Provas de Conhecimento Zero (matemática, não confiança) |
| **Resiliência Financeira** | Nenhuma (você paga por cada token, mesmo em ataques) | Nenhuma | **Sentinel**: Circuit Breaker nativo que corta o fluxo e protege o orçamento |
| **Arquitetura** | Monolítica ou dependente de um único provedor | SaaS externo (seus dados passam por outro servidor) | **Soberana**: Pode rodar On-Premise, VPC isolada ou Edge |

**Conclusão para o Embaixador:** Não venda "mais uma ferramenta de IA". Venda o **sistema imunológico** que permite que a empresa use IA sem medo de processos, vazamentos ou falências por custos de nuvem.
