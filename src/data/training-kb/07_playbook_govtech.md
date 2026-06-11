# Playbook de Vendas: GovTech e Setor Público

## O Contexto
Prefeituras e órgãos públicos querem inovar com IA, mas travam em três objeções: 
1. Medo de vazamento de dados de cidadãos (LGPD).
2. Exigência de transparência total pelo TCE/TCU.
3. Burocracia de licitações longas.

## A Arma Secreta: CPSI (Lei das Startups - LC 182/2021)
O Certus se encaixa perfeitamente no **Contrato Público para Solução Inovadora (CPSI)**. Isso permite que o município contrate um PoC de até R$ 115.000,00 **sem licitação tradicional**, com risco zero e validação rápida (30-90 dias).

## Respostas a Objeções Comuns
- **Objeção:** *"A IA vai vazar os dados dos alunos/pacientes."*
  **Resposta:** "Não com o Certus. Nosso agente **Wolfdog** aplica PII-Zero na borda. O dado sensível é mascarado criptograficamente *antes* de tocar a IA. Além disso, geramos uma **ZK-Proof** que prova ao TCE que os dados eram válidos, sem nunca revelar o CPF ou nome no log de auditoria."

- **Objeção:** *"Como vamos auditar isso?"*
  **Resposta:** "O **Lazarus** registra cada ação em uma cadeia de hashes imutável. O auditor não precisa confiar em nós; ele verifica o hash matematicamente. É transparência com privacidade absoluta."

## Mapeamento de Dores por Secretaria
- **Saúde (SESA):** Proteção de Prontuários (CID-10, CNS) + Auditoria de TFD.
- **Educação (SEDU):** Proteção de dados de menores (ECA) + Transporte Escolar rastreável.
- **Controladoria (SECONT):** Portal da Transparência com IA, mas sem expor dados pessoais em respostas de linguagem natural.
